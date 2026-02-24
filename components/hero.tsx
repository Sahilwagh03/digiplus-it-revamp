import Link from "next/link";
import HeroSphere from "./HeroSphere";
import { CircleArrowDown, MoveRight } from "lucide-react";

type Props = {};

function Hero({}: Props) {
  return (
    <section className="relative h-screen w-full overflow-hidden cursor-pointer">
      <HeroSphere
        sphereSizeFactor={0.5}
        nodeCount={1200}
        connectionDistance={70}
        className="absolute inset-0 z-0"
      />
      <div className="relative pointer-events-none z-10 flex flex-col text-center items-center justify-center h-full">
        <h1 className="text-[clamp(52px,7vw,96px)] font-normal leading-[1.05] tracking-[-0.03em] text-(--navy)">
          Enterprise
        </h1>

        <h1 className="text-[clamp(52px,7vw,96px)] font-bold tracking-[-0.03em] bg-[linear-gradient(135deg,var(--coral),var(--magenta),var(--purple),var(--blue))] bg-size-[300%_300%] bg-clip-text text-transparent animate-[gradient-shift-text_6s_ease_infinite]">
          Digital Transformation
        </h1>

        <Link
          href="/contact"
          className={[
            "bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]",
            "relative inline-flex items-center gap-2",
            "px-12 py-5 rounded-3xl",
            "text-sm font-semibold text-white tracking-wide",
            "overflow-hidden no-underline",
            "transition-all duration-300",
            "hover:-translate-y-0.5",
            "hover:shadow-[0_8px_24px_rgba(108,92,231,0.4)]",
            "group w-fit",
          ].join(" ")}
        >
          <span className="relative text-lg z-10">Explore Solutions</span>
          <MoveRight />
        </Link>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounceSlow">
          <span className="text-[0.575rem] font-medium tracking-[0.3em] uppercase text-(--navy)/70">
            Scroll Down
          </span>
          <CircleArrowDown className="w-4 h-4 text-(--navy)/70" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
