"use client";

import { useEffect } from "react";

const MouseTrail = () => {
  useEffect(() => {
    const isMobile =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isMobile) return;

    const colors = ["#FF6B6B", "#E84393", "#6C5CE7", "#4A90E2"];
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 16) return; // smoother 60fps throttle
      lastTime = now;

      const particle = document.createElement("div");
      particle.className = "mouse-trail-particle";

      const size = 4 + Math.random() * 4;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;

      document.documentElement.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.opacity = "0";
        particle.style.transform = "scale(0.5)";
      });

      setTimeout(() => {
        particle.remove();
      }, 600);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default MouseTrail;