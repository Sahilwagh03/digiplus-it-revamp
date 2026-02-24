import { ServiceCardProps } from "@/types/service";
import React from "react";

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  deliverables,
  technologies,
  className,
}) => {
  return (
    <div
      className={`relative h-full flex flex-col 
      rounded-xl border border-neutral-200 
      bg-white overflow-hidden
      shadow-sm hover:shadow-xl
      transition-all duration-500
      hover:-translate-y-1 ${className}`}
    >
      {/* Top Gradient Accent */}
      <div
        className="h-1.5 w-full"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="flex flex-col flex-1 p-8">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
          {title}
        </h2>

        {/* Description */}
        <p className="text-neutral-600 leading-relaxed text-[15px] mb-8">
          {description}
        </p>

        {/* Deliverables */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">
            What We Deliver
          </h3>

          <ul className="space-y-3 text-neutral-700 text-sm">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="mt-2 h-2 w-2 rounded-full shrink-0"
                  style={{ background: "var(--gradient-brand)" }}
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Section */}
        <div className="pt-6 border-t border-neutral-100">
          <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">
            Technology Stack
          </h3>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs font-medium rounded-full
                           bg-neutral-50 text-neutral-700
                           border border-neutral-200
                           transition-all duration-300
                           hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;