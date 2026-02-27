import CTA from "@/components/CTA";
import ExpertiseSection from "@/components/expertise-section";
import ExpertiseHeroCircuit from "@/components/ExpertiseHeroCircuit";
import SectionHeader from "@/components/SectionHeader";
import StandardsCard from "@/components/standards-card";
import { standardsData } from "@/constant/home";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ExpertisePage = () => {
  return (
    <section className="w-full">
      {/* FULL WIDTH HERO WRAPPER */}
      <div className="relative w-full py-10 overflow-hidden">
        {/* FULL WIDTH CANVAS */}
        <ExpertiseHeroCircuit />

        {/* CENTERED CONTENT */}
        <div className="relative z-10 max-w-340 mx-auto px-4 text-center">
          <div className="flex flex-col justify-center items-center pt-3 gap-4">
            <div className="text-xs flex gap-2 items-center px-3 py-2 bg-[#6c5ce714] rounded-full w-fit">
              <span className="block w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Standards & Depth</span>
            </div>

            <h1 className="flex flex-col gap-2 text-5xl xl:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-(--navy">
              <span>Built on</span>
              <span className="bg-[linear-gradient(135deg,var(--coral),var(--magenta),var(--purple),var(--blue))] bg-size-[300%_300%] bg-clip-text text-transparent animate-[gradient-shift-text_6s_ease_infinite]">
                Deep Expertise
              </span>
            </h1>

            <p className="max-w-2xl text-sm lg:text-lg leading-7 text-gray-600">
              From AI strategy to cloud infrastructure, application engineering
              to QA we deliver measurable outcomes at every layer of the stack.
            </p>

            <Link
              href="/services"
              className="bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]
                        relative inline-flex items-center gap-2 px-4 py-2 rounded-xl
                        font-semibold text-white tracking-wide
                        transition-all duration-300 hover:-translate-y-0.5
                        hover:shadow-[0_8px_24px_rgba(108,92,231,0.4)]
                        w-fit"
            >
              <span className="text-md">Our Services</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="py-20 px-4">
        <div className="max-w-340 mx-auto flex flex-col gap-12">
          <SectionHeader
            badge="Compliance & Standards"
            titleStart="Built on"
            highlight="Open Standards"
            description="Interoperability isn't optional in multi-vendor ecosystems. We implement the standards that ensure plug-and-play integration."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
            {standardsData.map((standard) => (
              <StandardsCard
                key={standard.title}
                badge={standard.badge}
                title={standard.title}
                description={standard.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pb-12 lg:py-20 px-4">
        <ExpertiseSection />
      </div>

      <CTA
        title="Ready to Discuss Your Project?"
        description="Our telecom experts are ready to understand your challenges and design a solution that delivers measurable results. "
        buttonText="Schedule Free Consultation"
        isDialog
      />
    </section>
  );
};

export default ExpertisePage;
