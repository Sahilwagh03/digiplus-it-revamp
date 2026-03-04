"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 6,        // 🔥 reduced from 17.5
  translateDepth = 6,     // 🔥 reduced from 20
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 🔥 smoother + slower spring
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`],
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`],
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`],
  );

  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${translateDepth}px`, `-${translateDepth}px`],
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [40, 60]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [40, 60]);

  // 🔥 softer glare
  const glareBackground = useMotionTemplate`
    radial-gradient(circle at ${glareX}% ${glareY}%, 
    rgba(255, 255, 255, 0.4) 0%, 
    rgba(255, 255, 255, 0.15) 25%, 
    rgba(255, 255, 255, 0) 60%)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          // 🔥 softer shadow
          boxShadow:
            "0px 20px 40px rgba(0,0,0,0.08)",
        }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.02, // 🔥 subtle scale
          transition: { duration: 0.25 },
        }}
        className="relative rounded-2xl"
      >
        {children}

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[16px] mix-blend-overlay"
          style={{
            background: glareBackground,
            opacity: 0.4, // 🔥 reduced
          }}
        />
      </motion.div>
    </div>
  );
};