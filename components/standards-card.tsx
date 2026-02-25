"use client";

import Link from "next/link";

interface StandardsCardProps {
  badge: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const StandardsCard = ({
  badge,
  title,
  description,
  linkText,
  linkHref,
}: StandardsCardProps) => {
  return (
    <div className="group relative rounded-md border border-neutral-200 bg-white/60 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      <div className="mb-6">
        <span className="inline-block px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-lg bg-indigo-100 text-[--purple]">
          {badge}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-[#0A2540] mb-4">
        {title}
      </h3>

      <p className="text-neutral-600 leading-relaxed mb-6">
        {description}
      </p>

      <Link
        href={linkHref}
        className="inline-flex items-center font-medium text-[--purple]"
      >
        {linkText}
        <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
};

export default StandardsCard;