"use client";

import { useEffect, useRef } from "react";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

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

export default function InsightsHeroStreams() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;

    class Stream {
      x!: number;
      y!: number;
      vy!: number;
      len!: number;
      chars!: string[];
      color!: string;
      interval!: number;
      tick!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = rand(0, W);
        this.y = rand(-H, 0);
        this.vy = rand(1, 3.5);
        this.len = Math.floor(rand(8, 20));

        this.chars = Array.from({ length: this.len }, () =>
          String.fromCharCode(Math.floor(rand(0x30, 0x7e))),
        );

        this.color = ["#6C5CE7", "#4A90E2", "#E84393", "#10B981"][
          Math.floor(rand(0, 4))
        ];

        this.interval = Math.floor(rand(3, 8));
        this.tick = 0;
      }

      update() {
        this.y += this.vy;
        this.tick++;

        if (this.tick % this.interval === 0) {
          this.chars.shift();
          this.chars.push(String.fromCharCode(Math.floor(rand(0x30, 0x7e))));
        }

        if (this.y > H + this.len * 14) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        const rgb = hexToRgb(this.color);

        ctx.font = `500 12px 'JetBrains Mono', monospace`;

        this.chars.forEach((c, i) => {
          const alpha = ((i + 1) / this.len) * 0.12;
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.fillText(c, this.x, this.y - i * 14);
        });
      }
    }

    let streams: Stream[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;

      W = canvas.offsetWidth;
      H = canvas.offsetHeight;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function build() {
      streams = Array.from(
        { length: window.innerWidth < 768 ? 25 : 60 },
        () => new Stream(),
      );
    }

    function tick() {
      if (!ctx) return;
      // Soft fade trail
      ctx.fillStyle = "rgba(255,255,255,.04)";
      ctx.fillRect(0, 0, W, H);

      streams.forEach((s) => {
        s.update();
        s.draw();
      });

      raf = requestAnimationFrame(tick);
    }

    resize();
    build();
    tick();

    let timeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, W, H);
        resize();
        build();
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
