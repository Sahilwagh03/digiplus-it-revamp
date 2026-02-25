"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface InsightsCardProps {
  category: string;
  title: string;
  image: string;
  index: number;
}

const brandColors = [
  "bg-[var(--coral)]",
  "bg-[var(--magenta)]",
  "bg-[var(--purple)]",
  "bg-[var(--blue)]",
];

const InsightsCard = ({
  category,
  title,
  image,
  index,
}: InsightsCardProps) => {
  const bgColor = brandColors[index % brandColors.length];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500">
      
      <div
        className={`relative px-6 py-6 h-47.5 flex flex-col justify-between text-white ${bgColor}`}
      >
        <div>
          <p className="text-xs tracking-[0.2em] uppercase opacity-80">
            {category}
          </p>

          <h3 className="mt-4 text-2xl font-semibold leading-snug line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="mt-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300">
            <ArrowUpRight className="text-white" size={18} />
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-55 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-700 ease-out"
        />
      </div>
    </div>
  );
};

export default InsightsCard;