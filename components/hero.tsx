"use client";
import Link from "next/link";
import { CircleArrowDown, MoveRight } from "lucide-react";
import NetworkSphere from "./network-sphere";
import HeroSphere from "./HeroSphere";

type Props = {};

function Hero({}: Props) {
  return (
    <section className="relative h-auto lg:h-[96.5vh] w-full px-4 lg:px-8 overflow-x-hidden">
      <div className="pointer-events-none relative w-full h-full grid lg:grid-cols-2 lg:gap-12 justify-between items-center max-w-340 mx-auto">
        <div className="relative flex flex-col 2xl:justify-center pt-3 gap-4 h-full">
          <div className="text-xs flex gap-2 items-center px-3 py-2 bg-[#6c5ce714] rounded-full w-fit">
            <span className="block w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>AI-Driven Enterprise Transformation</span>
          </div>
          <h1 className="flex flex-col gap-2 text-5xl xl:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-(--navy">
            <span>Enterprise</span>
            <span className="bg-[linear-gradient(135deg,var(--coral),var(--magenta),var(--purple),var(--blue))] bg-size-[300%_300%] bg-clip-text text-transparent animate-[gradient-shift-text_6s_ease_infinite]">
              Digital Transformation
            </span>
            <span>Partners</span>
          </h1>
          <p className="text-sm lg:text-lg leading-7 text-gray-600">
            We bridge legacy systems to autonomous futures with AI-first
            architecture, TM Forum expertise, and engineering teams trusted by
            tier-1 telecom and enterprise leaders worldwide.
          </p>
          <Link
            href="/services"
            className={[
              "bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]",
              "relative inline-flex items-center justify-center lg:justify-start gap-2",
              "px-4 py-2 rounded-xl",
              "font-semibold text-white tracking-wide",
              "overflow-hidden no-underline",
              "transition-all duration-300",
              "hover:-translate-y-0.5",
              "hover:shadow-[0_8px_24px_rgba(108,92,231,0.4)]",
              "group w-full lg:w-fit pointer-events-auto",
            ].join(" ")}
          >
            <span className="relative text-md z-10">Explore Solutions</span>
            <MoveRight size={16} />
          </Link>

          <div className="flex w-fit flex-col gap-4 items-center rounded-2xl sm:flex-row">
            <div className="flex -space-x-3">
              {["E", "T", "O"].map((letter) => (
                <div
                  key={letter}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white gradient-bg-brand text-sm font-semibold text-white shadow-md"
                >
                  {letter}
                </div>
              ))}

              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white text-sm font-semibold text-gray-700 shadow-md">
                +
              </div>
            </div>

            <p className="text-sm font-medium text-gray-700 sm:text-left">
              Trusted by{" "}
              <span className="font-semibold text-gray-900">Ericsson</span>,{" "}
              <span className="font-semibold text-gray-900">T-Mobile</span>,{" "}
              <span className="font-semibold text-gray-900">ODIDO</span>,{" "}
              <span className="font-semibold text-gray-900">Intel</span> &amp;
              15+ more
            </p>
          </div>
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
      <div className="absolute right-0 top-0 z-0 h-full hidden lg:flex overflow-hidden cursor-pointer">
        <div className="w-[140%] h-full translate-x-[35%]">
          <HeroSphere
            sphereSizeFactor={0.6}
            nodeCount={1200}
            connectionDistance={70}
            mobileNodeCount={500}
            mobileConnectionDistance={100}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
