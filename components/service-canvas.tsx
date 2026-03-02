"use client";

import { useEffect, useRef } from "react";

const PI2 = Math.PI * 2;

const KEYWORDS = [
  "LangChain",
  "PyTorch",
  "Kubernetes",
  "Terraform",
  "React",
  "Node.js",
  "Docker",
  "CI/CD",
  "MLOps",
  "FastAPI",
  "GraphQL",
  "Redis",
  "Kafka",
  "Spark",
  "Postgres",
  "Neo4j",
  "AWS",
  "Azure",
  "GCP",
  "ServiceNow",
  "TM Forum",
  "ODA",
  "5G NR",
  "SNMP",
];

const COLORS = [
  "#FF6B6B",
  "#E84393",
  "#6C5CE7",
  "#4A90E2",
  "#00B4D8",
  "#10B981",
];

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

export default function ServicesHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;

    let blocks: Block[] = [];
    let particles: Particle[] = [];

    class Block {
      word!: string;
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      alpha!: number;
      size!: number;
      color!: string;

      constructor() {
        this.init();
      }

      init() {
        this.word = KEYWORDS[Math.floor(rand(0, KEYWORDS.length))];
        this.x = rand(-150, W + 150);
        this.y = rand(H * 0.1, H * 0.9);
        this.vy = rand(-0.2, 0.2);
        this.vx = rand(0.3, 0.9);

        this.alpha = rand(0.45, 0.75);
        this.size = rand(16, 20);
        this.color = COLORS[Math.floor(rand(0, COLORS.length))];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > W + 200) {
          this.init();
          this.x = -200;
        }
      }

      draw() {
        if(!ctx) return
        ctx.font = `600 ${this.size}px 'JetBrains Mono', monospace`;
        ctx.textBaseline = "middle";

        const rgb = hexToRgb(this.color);

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;

        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${this.alpha})`;
        ctx.fillText(this.word, this.x, this.y);

        ctx.shadowBlur = 3;
        ctx.fillStyle = `rgba(108,92,231,${this.alpha * 0.6})`;
        ctx.fillText("</", this.x - 22, this.y);
        ctx.fillText(
          ">",
          this.x + ctx.measureText(this.word).width + 4,
          this.y,
        );
      }
    }

    class Particle {
      x = rand(0, W);
      y = rand(0, H);
      r = rand(0.8, 2.2);
      a = rand(0.18, 0.35);
      vx = rand(-0.4, 0.4);
      vy = rand(-0.4, 0.4);

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }

      draw() {
        if(!ctx) return
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, PI2);
        ctx.fillStyle = `rgba(108,92,231,${this.a})`;
        ctx.fill();
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      if (!canvas || !ctx) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function build() {
      blocks = Array.from(
        { length: window.innerWidth < 768 ? 8 : 16 },
        () => new Block(),
      );

      particles = Array.from({ length: 80 }, () => new Particle());
    }

    function tick() {
        if(!ctx) return
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(108,92,231,0.08)";
      ctx.lineWidth = 1;

      for (let x = 0; x < W; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      for (let y = 0; y < H; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      blocks.forEach((b) => {
        b.update();
        b.draw();
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
