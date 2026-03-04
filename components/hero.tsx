"use client";
import Link from "next/link";
import { CircleArrowDown, MoveRight } from "lucide-react";
import NetworkSphere from "./network-sphere";
import HeroSphere from "./HeroSphere";
import { useEffect, useState } from "react";

function Hero() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkDevice(); // initial check
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <section className="relative h-auto lg:h-[96.5vh] w-full px-4 lg:px-8 overflow-x-hidden">
      <div className="pointer-events-none relative w-full h-full justify-between items-center max-w-340 mx-auto">
        <div className="relative flex flex-col text-center items-center justify-center pt-3 gap-4 h-full">
          <h1 className="flex flex-col gap-2 text-5xl xl:text-8xl font-extrabold leading-[1.05] tracking-[-0.03em] text-(--navy">
            <span className="font-medium">AI-Driven</span>
            <span className="bg-[linear-gradient(135deg,var(--coral),var(--magenta),var(--purple),var(--blue))] bg-size-[300%_300%] bg-clip-text text-transparent animate-[gradient-shift-text_6s_ease_infinite]">
              Digital
            </span>
            <span className="bg-[linear-gradient(135deg,var(--coral),var(--magenta),var(--purple),var(--blue))] bg-size-[300%_300%] bg-clip-text text-transparent animate-[gradient-shift-text_6s_ease_infinite]">Transformation</span>
            <span>Enabler</span>
          </h1>
        </div>
        <div
          className="pointer-events-auto absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 animate-bounceSlow"
          onClick={() => {
            const el = document.getElementById("clients");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="cursor-pointer text-[0.575rem] font-medium tracking-[0.3em] uppercase text-(--navy)/70">
            Scroll Down
          </span>
          <CircleArrowDown className="cursor-pointer w-4 h-4 text-(--navy)/70" />
        </div>
      </div>
      {!isMobile && (
        <div className="absolute right-0 top-0 z-0 h-full hidden lg:flex overflow-hidden">
          <div className="w-full h-full">
            <HeroSphere
              sphereSizeFactor={0.5}
              nodeCount={600}
              connectionDistance={70}
              mobileNodeCount={500}
              mobileConnectionDistance={100}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
