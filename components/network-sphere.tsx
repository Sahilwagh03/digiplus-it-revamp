import { useEffect, useRef } from "react";

const PI2 = Math.PI * 2;
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const rand = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

interface Node3D {
  theta: number;
  phi: number;
  r: number;
  size: number;
  color: string;
  dTheta: number;
  dPhi: number;
  x: number;
  y: number;
  z: number;
  opacity:number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

interface NetworkSphereProps {
  /** Scale multiplier for sphere radius (0.5 – 1.5+). Default: 1 */
  size?: number;
  /** Number of nodes. Defaults to 900 on mobile, 2000 on desktop. */
  nodeCount?: number;
  /** Ripple distortion power. Default: 25 */
  distortionStrength?: number;
  /** Ripple wave-band width in px. Default: 140 */
  rippleWidth?: number;
  /** Ripple expansion speed in px/frame. Default: 6 */
  rippleSpeed?: number;
  /** Alpha fade per frame. Default: 0.02 */
  rippleAlphaDecay?: number;
  /** Rotation speed around X axis. Default: 0.0004 */
  rotationSpeedX?: number;
  /** Rotation speed around Y axis. Default: 0.0006 */
  rotationSpeedY?: number;
  /** CSS class applied to the <canvas> element. Default: "w-full h-full" */
  className?: string;
}

const COLORS = ["#FF6B6B", "#E84393", "#6C5CE7", "#4A90E2", "#00B4D8"] as const;
const CONNECT_DIST = 0.28;

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [108, 92, 231];
}

export default function NetworkSphere({
  size = 1,
  nodeCount,
  distortionStrength = 25,
  rippleWidth = 140,
  rippleSpeed = 6,
  rippleAlphaDecay = 0.02,
  rotationSpeedX = 0.0004,
  rotationSpeedY = 0.0006,
  className = "w-full h-full",
}: NetworkSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resolvedNodeCount =
      nodeCount ?? (window.innerWidth < 768 ? 900 : 2000);

    let W = 0,
      H = 0,
      cx = 0,
      cy = 0,
      R = 0,
      raf = 0;

    let rotX = 0;
    let rotY = 0;
    let lastRippleTime = 0;

    const ripples: Ripple[] = [];
    const nodes: Node3D[] = [];

    // ─── helpers ──────────────────────────────────────────────────────────────

    function buildNodes(): void {
      nodes.length = 0;
      for (let i = 0; i < resolvedNodeCount; i++) {
        nodes.push({
          theta: Math.acos(rand(-1, 1)),
          phi: rand(0, PI2),
          r: rand(0.9, 1),
          size: rand(1.2, 3.2),
          color: COLORS[Math.floor(rand(0, COLORS.length))],
          dTheta: rand(-0.0003, 0.0003),
          dPhi: rand(-0.0003, 0.0003),
          opacity: 0.5,
          x: 0,
          y: 0,
          z: 0,
        });
      }
    }

    function resize(): void {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = W / 2;
      cy = H / 2;
      R = Math.min(W, H) * Math.max(0.3, Math.min(size, 2));
    }

    function projectNode(n: Node3D): void {
      const sX = n.r * R * Math.sin(n.theta) * Math.cos(n.phi);
      const sY = n.r * R * Math.cos(n.theta);
      const sZ = n.r * R * Math.sin(n.theta) * Math.sin(n.phi);

      let ox = sX;
      let oy = sY;

      const screenX = cx + sX;
      const screenY = cy - sY;

      for (const rp of ripples) {
        const dx = screenX - rp.x;
        const dy = screenY - rp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (Math.abs(dist - rp.radius) < rippleWidth) {
          const wave = Math.sin((dist - rp.radius) * 0.07) * distortionStrength;
          const force =
            (1 - Math.abs(dist - rp.radius) / rippleWidth) * rp.alpha;

          if (dist !== 0) {
            ox += (dx / dist) * wave * force;
            oy -= (dy / dist) * wave * force;
          }
        }
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = ox * cosY - sZ * sinY;
      const z1 = ox * sinY + sZ * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = oy * cosX - z1 * sinX;
      const z2 = oy * sinX + z1 * cosX;

      n.x = cx + x1;
      n.y = cy - y2;
      n.z = z2;
    }

    // ─── main loop ────────────────────────────────────────────────────────────

    function tick(): void {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      rotX += rotationSpeedX;
      rotY += rotationSpeedY;

      // advance ripples
      for (const rp of ripples) {
        rp.radius += rippleSpeed;
        rp.alpha -= rippleAlphaDecay;
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (ripples[i].alpha <= 0) ripples.splice(i, 1);
      }

      // update node positions
      for (const n of nodes) {
        n.theta += n.dTheta;
        n.phi += n.dPhi;
        projectNode(n);
      }

      // draw edges
      const connectRadius = CONNECT_DIST * R;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < i + 40 && j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < connectRadius) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(108,92,231,${(1 - d / connectRadius) * 0.25})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        const depth = (n.z + R) / (2 * R);
        const alpha = lerp(0.15, 0.45, depth);
        const sizeScaled = n.size * lerp(0.5, 1.8, depth);
        const [r, g, b] = hexToRgb(n.color);

        ctx.beginPath();
        ctx.arc(n.x, n.y, sizeScaled, 0, PI2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    // ─── events ───────────────────────────────────────────────────────────────

    function handleMove(e: MouseEvent): void {
      if (!canvas) return;
      const now = performance.now();
      if (now - lastRippleTime < 60) return;
      lastRippleTime = now;

      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        alpha: 1,
      });
    }

    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", resize);

    resize();
    buildNodes();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, [
    size,
    nodeCount,
    distortionStrength,
    rippleWidth,
    rippleSpeed,
    rippleAlphaDecay,
    rotationSpeedX,
    rotationSpeedY,
  ]);

  return <canvas ref={canvasRef} className={className} />;
}
