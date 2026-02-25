import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton = ({
  children,
  className,
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center gap-2",
        "px-8 py-3.5 rounded-xl",
        "text-sm font-medium tracking-wide text-white",
        "bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]",
        "transition-all duration-300 ease-out",
        "hover:shadow-lg",
        "hover:-translate-y-0.5",
        "group overflow-hidden cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <MoveRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>

      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </button>
  );
};

export default PrimaryButton;