import React from "react";

interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  className?: string;
}

const ReasonCard: React.FC<ReasonCardProps> = ({
  icon,
  title,
  description,
  highlight,
  className,
}) => {
  return (
    <div
      className={`relative h-full flex flex-col
      rounded-xl border border-neutral-200
      bg-white overflow-hidden
      shadow-sm hover:shadow-lg
      transition-all duration-300
      hover:-translate-y-1 ${className}`}
    >
      {/* Top Gradient Accent */}
      <div
        className="h-1 w-full"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="flex flex-col flex-1 p-6">

        <div>
          <div className="mb-4 w-9 h-9 flex items-center justify-center rounded-md bg-neutral-100 text-neutral-900">
            {icon}
          </div>

          <h3 className="text-2xl font-semibold text-neutral-900 mb-2 max-w-[12ch] leading-tight">
            {title}
          </h3>

          <p className="text-neutral-600 leading-relaxed text-sm min-h-15">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-100">
          <p className="text-sm font-medium text-neutral-900">{highlight}</p>
        </div>
      </div>
    </div>
  );
};

export default ReasonCard;
