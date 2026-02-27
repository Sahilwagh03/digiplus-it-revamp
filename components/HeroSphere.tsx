"use client";

import React, { useEffect, useRef } from "react";

export interface HeroSphereProps {
  nodeCount?: number;
  mobileNodeCount?: number;
  connectionDistance?: number;
  mobileConnectionDistance?: number;
  rotationDuration?: number;
  sphereSizeFactor?: number;
  deformStrength?: number;
  clusterStrength?: number;
  recoverySpeed?: number;
  damping?: number;
  className?: string;
}

const HeroSphere: React.FC<HeroSphereProps> = ({
  nodeCount = 500,
  mobileNodeCount = 150,
  connectionDistance = 55,
  mobileConnectionDistance = 40,
  rotationDuration = 30,
  sphereSizeFactor = 0.28,
  deformStrength = 90,
  clusterStrength = 0.5,
  recoverySpeed = 0.02,
  damping = 0.95,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0, centerX = 0, centerY = 0, sphereRadius = 0;
    let rafId = 0;

    const resize = () => {
      W = canvas.clientWidth * dpr;
      H = canvas.clientHeight * dpr;
      canvas.width = W;
      canvas.height = H;
      centerX = W / 2;
      centerY = H / 2;
      sphereRadius = Math.min(W, H) * sphereSizeFactor;
    };

    resize();

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize);

    const N = isMobile ? mobileNodeCount : nodeCount;
    const CONN_DIST = isMobile ? mobileConnectionDistance : connectionDistance;
    const CONN_DIST_SQ = CONN_DIST * CONN_DIST;
    const FOV = 500;
    const ROT_SPEED = (Math.PI * 2) / (rotationDuration * 120);

    type Node = {
      bx: number; by: number; bz: number;
      x: number; y: number; z: number;
      dx: number; dy: number; dz: number;
      size: number;
    };

    // ── Nodes — original values, untouched ───────────────────────────────────
    const nodes: Node[] = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const r = sphereRadius * (0.7 + Math.random() * 0.3);
      nodes.push({
        bx: r * Math.sin(theta) * Math.cos(phi),
        by: r * Math.sin(theta) * Math.sin(phi),
        bz: r * Math.cos(theta),
        x: 0, y: 0, z: 0,
        dx: 0, dy: 0, dz: 0,
        size: 0.8 + Math.random() * 1.5,
      });
    }

    const mouse = { x: 0, y: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      mouse.active = true;
    };
    const handleMouseLeave = () => { mouse.active = false; };

    if (!isMobile) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    // ── Color — original, untouched ──────────────────────────────────────────
    function getNodeColor(zNorm: number, alpha: number): string {
      const t = (zNorm + 1) / 2;
      let r: number, g: number, b: number;
      if (t < 0.33) {
        const s = t / 0.33;
        r = 74 + (108 - 74) * s; g = 144 + (92 - 144) * s; b = 226 + (231 - 226) * s;
      } else if (t < 0.66) {
        const s = (t - 0.33) / 0.33;
        r = 108 + (232 - 108) * s; g = 92 + (67 - 92) * s; b = 231 + (147 - 231) * s;
      } else {
        const s = (t - 0.66) / 0.34;
        r = 232 + (255 - 232) * s; g = 67 + (107 - 67) * s; b = 147 + (107 - 147) * s;
      }
      return `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`;
    }

    // ── Pre-allocated projected array — no per-frame allocations ─────────────
    type Projected = { px: number; py: number; scale: number; z: number; zNorm: number };
    const projected: Projected[] = Array.from({ length: N }, () => ({
      px: 0, py: 0, scale: 1, z: 0, zNorm: 0,
    }));

    /**
     * Spatial grid — O(n) connection checks instead of O(n²).
     *
     * KEY FIX: large GRID_OFFSET ensures projected coords (which can be
     * negative for a large sphere like sphereSizeFactor=0.7) always map
     * to positive cell indices, preventing hash key collisions that would
     * cause connections to be silently missed.
     */
    const GRID_OFFSET = 32768; // safely larger than any projected coordinate

    const buildGrid = (pts: Projected[], cellSize: number) => {
      const grid = new Map<number, number[]>();
      // cellW must cover the full shifted coordinate range
      const cellW = Math.ceil((W + GRID_OFFSET * 2) / cellSize) + 2;

      const key = (cx: number, cy: number) => cx + cy * cellW;

      for (let i = 0; i < pts.length; i++) {
        const cx = Math.floor((pts[i].px + GRID_OFFSET) / cellSize);
        const cy = Math.floor((pts[i].py + GRID_OFFSET) / cellSize);
        const k = key(cx, cy);
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k)!.push(i);
      }
      return { grid, key };
    };

    let rotY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // cos/sin computed once per frame, not once per node
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      rotY += ROT_SPEED;

      for (let i = 0; i < N; i++) {
        const n = nodes[i];

        // Inline rotateY — eliminates one {x,y,z} object allocation per node
        const rx = n.bx * cosY + n.bz * sinY;
        const ry = n.by;
        const rz = -n.bx * sinY + n.bz * cosY;

        const tpScale = FOV / (FOV + rz);
        const tpx = rx * tpScale + centerX;
        const tpy = ry * tpScale + centerY;

        if (mouse.active && !isMobile) {
          const ddx = tpx - mouse.x;
          const ddy = tpy - mouse.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          const DEFORM_RADIUS = sphereRadius * 1.2;

          if (dist < DEFORM_RADIUS) {
            const influence = Math.pow(1 - dist / DEFORM_RADIUS, 2);
            n.dx += (mouse.x - tpx) * clusterStrength * influence * 0.1;
            n.dy += (mouse.y - tpy) * clusterStrength * influence * 0.1;
            n.dz += -influence * deformStrength * 0.05;
          }
        }

        // Original two-pass damping + recovery, preserved exactly
        n.dx *= damping;
        n.dy *= damping;
        n.dz *= damping;
        n.dx += -n.dx * recoverySpeed;
        n.dy += -n.dy * recoverySpeed;
        n.dz += -n.dz * recoverySpeed;

        n.x = rx + n.dx;
        n.y = ry + n.dy;
        n.z = rz + n.dz;

        const scale = FOV / (FOV + n.z);
        projected[i].px    = n.x * scale + centerX;
        projected[i].py    = n.y * scale + centerY;
        projected[i].scale = scale;
        projected[i].z     = n.z;
        projected[i].zNorm = Math.max(-1, Math.min(1, n.z / (sphereRadius * 1.3)));
      }

      // ── Draw connections via spatial grid ────────────────────────────────────
      const { grid, key } = buildGrid(projected, CONN_DIST);

      for (let i = 0; i < N; i++) {
        const pi = projected[i];
        const cx = Math.floor((pi.px + GRID_OFFSET) / CONN_DIST);
        const cy = Math.floor((pi.py + GRID_OFFSET) / CONN_DIST);

        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const neighbors = grid.get(key(cx + ox, cy + oy));
            if (!neighbors) continue;

            for (const j of neighbors) {
              if (j <= i) continue; // each pair drawn once only

              const pj = projected[j];
              const dx = pi.px - pj.px;
              const dy = pi.py - pj.py;
              const dist2 = dx * dx + dy * dy;

              if (dist2 < CONN_DIST_SQ) {
                // original alpha formula, untouched
                const alpha =
                  (1 - dist2 / CONN_DIST_SQ) * 0.2 * Math.min(pi.scale, pj.scale);

                ctx.strokeStyle = getNodeColor((pi.zNorm + pj.zNorm) / 2, alpha);
                ctx.lineWidth = 0.6 * dpr; // original value
                ctx.beginPath();
                ctx.moveTo(pi.px, pi.py);
                ctx.lineTo(pj.px, pj.py);
                ctx.stroke();
              }
            }
          }
        }
      }

      // ── Draw nodes — original radius formula, untouched ─────────────────────
      for (let i = 0; i < N; i++) {
        const p = projected[i];
        const alpha =
          0.15 +
          0.75 * Math.max(0, Math.min(1, (p.z + sphereRadius) / (sphereRadius * 2)));

        const r = Math.max(0.5, 1.2 * p.scale * dpr); // original value

        ctx.fillStyle = getNodeColor(p.zNorm, alpha);
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId); // critical: was missing in original
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    nodeCount, mobileNodeCount, connectionDistance, mobileConnectionDistance,
    rotationDuration, sphereSizeFactor, deformStrength, clusterStrength,
    recoverySpeed, damping,
  ]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};

export default HeroSphere;