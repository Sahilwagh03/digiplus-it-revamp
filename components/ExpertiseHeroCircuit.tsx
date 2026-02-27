"use client";

import { useEffect, useRef } from "react";

const PI2 = Math.PI * 2;

const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const lerp = (a: number, b: number, t: number) =>
  a + (b - a) * t;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const hexToRgb = (hex: string) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
      }
    : { r: 108, g: 92, b: 231 };
};

export default function ExpertiseHeroCircuit() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;

    type Line = {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    };

    type Pulse = {
      progress: number;
      speed: number;
      lineIdx: number;
      color: string;
    };

    let lines: Line[] = [];
    let pulses: Pulse[] = [];

    function resize() {
        if(!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;

      W = canvas.offsetWidth;
      H = canvas.offsetHeight;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function buildCircuit() {
      lines = [];
      pulses = [];

      const spacing = 90;
      const cols = Math.floor(W / spacing);
      const rows = Math.floor(H / spacing);

      const nodes: { x: number; y: number }[] = [];

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          if (Math.random() > 0.4) {
            nodes.push({
              x: c * spacing + rand(-10, 10),
              y: r * spacing + rand(-10, 10),
            });
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110 && Math.random() > 0.5) {
            lines.push({
              x1: nodes[i].x,
              y1: nodes[i].y,
              x2: nodes[j].x,
              y2: nodes[j].y,
            });

            if (Math.random() > 0.6) {
              pulses.push({
                progress: 0,
                speed: rand(0.003, 0.008),
                lineIdx: lines.length - 1,
                color: ["#6C5CE7", "#4A90E2", "#E84393", "#00B4D8"][
                  Math.floor(rand(0, 4))
                ],
              });
            }
          }
        }
      }
    }

    function tick() {
        if(!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Draw lines + nodes
      lines.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.strokeStyle = "rgba(108,92,231,.07)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(l.x1, l.y1, 2.5, 0, PI2);
        ctx.fillStyle = "rgba(108,92,231,.15)";
        ctx.fill();
      });

      // Pulses
      pulses.forEach((p) => {
        const l = lines[p.lineIdx];
        if (!l) return;

        p.progress += p.speed;
        if (p.progress > 1.2) p.progress = -0.2;

        const x = lerp(l.x1, l.x2, clamp(p.progress, 0, 1));
        const y = lerp(l.y1, l.y2, clamp(p.progress, 0, 1));

        const rgb = hexToRgb(p.color);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 8);
        grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},.8)`);
        grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, PI2);
        ctx.fillStyle = grad;
        ctx.fill();

        const tx = lerp(l.x1, l.x2, clamp(p.progress - 0.1, 0, 1));
        const ty = lerp(l.y1, l.y2, clamp(p.progress - 0.1, 0, 1));

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},.3)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      raf = requestAnimationFrame(tick);
    }

    resize();
    buildCircuit();
    tick();

    let timeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cancelAnimationFrame(raf);
        resize();
        buildCircuit();
        tick();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}