import React from "react";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { TextAnimate } from "./ui/text-animate";

interface SectionHeaderProps {
  badge?: string;
  titleStart?: string;
  highlight?: string;
  titleEnd?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader = ({
  badge,
  titleStart,
  highlight,
  titleEnd,
  description,
  centered = true,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={clsx(
        "max-w-5xl",
        centered ? "text-center mx-auto" : "text-left",
        className,
      )}
    >
      {/* Badge */}
      {badge && (
        <div
          className={clsx(
            "flex items-center gap-2 mb-4",
            centered ? "justify-center" : "justify-start",
          )}
        >
          <span className="w-5 h-0.5 bg-(--purple)" />
          <TextAnimate
            animation="fadeIn"
            as="span"
            once={true}
            className="text-sm font-bold tracking-[0.12rem] text-(--purple) uppercase"
          >
            {badge}
          </TextAnimate>
        </div>
      )}

      {/* Heading */}
      <h2 className="text-[clamp(36px,4vw,56px)] font-semibold leading-[1.15] tracking-[-0.02em]">
        { titleStart &&
          <TextAnimate animation="blurIn" as="span" delay={0.1} once={true}>
            {titleStart}
          </TextAnimate>
        }

        {highlight && (
          <>
            {" "}
            <TextAnimate
              animation="blurIn"
              as="span"
              delay={0.2}
              once={true}
              segmentClassName="gradient-text"
            >
              {highlight}
            </TextAnimate>
          </>
        )}

        {titleEnd && (
          <>
            {" "}
            <TextAnimate animation="blurIn" as="span" delay={0.3} once={true}>
              {titleEnd}
            </TextAnimate>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <TextAnimate
          animation="slideUp"
          as="p"
          delay={0.4}
          once={true}
          className={cn(
            "mt-4 text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl",
            centered ? "mx-auto" : "",
          )}
        >
          {description}
        </TextAnimate>
      )}
    </div>
  );
};

export default SectionHeader;
