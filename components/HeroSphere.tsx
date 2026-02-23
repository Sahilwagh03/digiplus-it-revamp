"use client";

import React, { useEffect, useRef } from "react";

export interface HeroSphereProps {
  nodeCount?: number;
  mobileNodeCount?: number;
  connectionDistance?: number;
  mobileConnectionDistance?: number;
  rotationDuration?: number; // seconds for full rotation
  sphereSizeFactor?: number; // % of min(width,height)
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
  rotationDuration = 90,
  sphereSizeFactor = 0.28,
  deformStrength = 50,
  clusterStrength = 0.6,
  recoverySpeed = 0.04,
  damping = 0.92,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0,
      H = 0,
      centerX = 0,
      centerY = 0,
      sphereRadius = 0;

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
    window.addEventListener("resize", resize);

    const NODE_COUNT = isMobile ? mobileNodeCount : nodeCount;
    const CONNECTION_DIST = isMobile
      ? mobileConnectionDistance
      : connectionDistance;

    const FOV = 500;

    const nodes: {
      bx: number;
      by: number;
      bz: number;
      x: number;
      y: number;
      z: number;
      dx: number;
      dy: number;
      dz: number;
      size: number;
    }[] = [];

    // Create sphere nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const r = sphereRadius * (0.7 + Math.random() * 0.3);

      nodes.push({
        bx: r * Math.sin(theta) * Math.cos(phi),
        by: r * Math.sin(theta) * Math.sin(phi),
        bz: r * Math.cos(theta),
        x: 0,
        y: 0,
        z: 0,
        dx: 0,
        dy: 0,
        dz: 0,
        size: 0.8 + Math.random() * 1.5,
      });
    }

    let rotY = 0;
    const ROT_SPEED = (Math.PI * 2) / (rotationDuration * 60);

    const mouse = { x: 0, y: 0, active: false };
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      mouse.active = true;
      prevMouseX = mouse.x;
      prevMouseY = mouse.y;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (!isMobile) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    function rotateY(x: number, y: number, z: number, angle: number) {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return {
        x: x * c + z * s,
        y,
        z: -x * s + z * c,
      };
    }

    function project(x: number, y: number, z: number) {
      const scale = FOV / (FOV + z);
      return {
        px: x * scale + centerX,
        py: y * scale + centerY,
        scale,
      };
    }

    // Original color system
    function getNodeColor(zNorm: number, alpha: number) {
      const t = (zNorm + 1) / 2;
      let r: number, g: number, b: number;

      if (t < 0.33) {
        const s = t / 0.33;
        r = 74 + (108 - 74) * s;
        g = 144 + (92 - 144) * s;
        b = 226 + (231 - 226) * s;
      } else if (t < 0.66) {
        const s = (t - 0.33) / 0.33;
        r = 108 + (232 - 108) * s;
        g = 92 + (67 - 92) * s;
        b = 231 + (147 - 231) * s;
      } else {
        const s = (t - 0.66) / 0.34;
        r = 232 + (255 - 232) * s;
        g = 67 + (107 - 67) * s;
        b = 147 + (107 - 147) * s;
      }

      return `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      rotY += ROT_SPEED;

      const projected: {
        px: number;
        py: number;
        scale: number;
        z: number;
        zNorm: number;
      }[] = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];

        const rotated = rotateY(n.bx, n.by, n.bz, rotY);

        const tx = rotated.x;
        const ty = rotated.y;
        const tz = rotated.z;

        const tp = project(tx, ty, tz);

        // Deformation
        if (mouse.active && !isMobile) {
          const dx = tp.px - mouse.x;
          const dy = tp.py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const DEFORM_RADIUS = sphereRadius * 1.2;

          if (dist < DEFORM_RADIUS) {
            const influence = Math.pow(1 - dist / DEFORM_RADIUS, 2);
            const attractX =
              (mouse.x - tp.px) * clusterStrength * influence;
            const attractY =
              (mouse.y - tp.py) * clusterStrength * influence;

            n.dx += attractX * 0.1;
            n.dy += attractY * 0.1;
            n.dz += -influence * deformStrength * 0.05;
          }
        }

        n.dx *= damping;
        n.dy *= damping;
        n.dz *= damping;

        n.dx += -n.dx * recoverySpeed;
        n.dy += -n.dy * recoverySpeed;
        n.dz += -n.dz * recoverySpeed;

        n.x = tx + n.dx;
        n.y = ty + n.dy;
        n.z = tz + n.dz;

        const p = project(n.x, n.y, n.z);
        const zNorm = n.z / (sphereRadius * 1.3);

        projected.push({
          px: p.px,
          py: p.py,
          scale: p.scale,
          z: n.z,
          zNorm: Math.max(-1, Math.min(1, zNorm)),
        });
      }

      // Draw connections
      const maxDist = CONNECTION_DIST * CONNECTION_DIST;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = dx * dx + dy * dy;

          if (dist < maxDist) {
            const alpha =
              (1 - dist / maxDist) *
              0.2 *
              Math.min(projected[i].scale, projected[j].scale);

            ctx.strokeStyle = getNodeColor(
              (projected[i].zNorm + projected[j].zNorm) / 2,
              alpha
            );

            ctx.lineWidth = 0.6 * dpr;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of projected) {
        const alpha =
          0.15 +
          0.75 *
            Math.max(
              0,
              Math.min(1, (p.z + sphereRadius) / (sphereRadius * 2))
            );

        const r = Math.max(0.5, 1.2 * p.scale * dpr);

        ctx.fillStyle = getNodeColor(p.zNorm, alpha);
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    nodeCount,
    mobileNodeCount,
    connectionDistance,
    mobileConnectionDistance,
    rotationDuration,
    sphereSizeFactor,
    deformStrength,
    clusterStrength,
    recoverySpeed,
    damping,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
    />
  );
};

export default HeroSphere;