import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PrimaryButton from "./primary-button";
import SectionHeader from "./SectionHeader";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Artificial Intelligence",
    description:
      "Embedding intelligence into products and platforms through AI, ML, and enterprise automation.",
    highlights: [
      "LLM & AI Agents",
      "Predictive Analytics",
      "NLP & Computer Vision",
    ],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable multi-cloud and DevOps ecosystems built for speed and resilience.",
    highlights: [
      "Kubernetes & Containers",
      "Terraform (IaC)",
      "CI/CD Automation",
    ],
  },
  {
    title: "Application Development",
    description:
      "Secure, scalable web and enterprise applications engineered for growth.",
    highlights: [
      "Full-Stack Development",
      "Microservices",
      "Cloud-Native Apps",
    ],
  },
  {
    title: "Low-Code Platforms",
    description:
      "Accelerating enterprise delivery with governed low-code platforms.",
    highlights: [
      "Rapid App Development",
      "Workflow Automation",
      "Platform Governance",
    ],
  },
  {
    title: "QA & Automation",
    description:
      "Automation-first quality engineering across the SDLC lifecycle.",
    highlights: ["Test Automation", "Performance Testing", "Security Testing"],
  },
];

const CoreServices = () => {
  return (
    <section className="w-full max-w-360 mx-auto py-8 lg:py-12 px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-end">
        <SectionHeader
          titleStart="Core"
          highlight="Services"
          badge="WHAT WE BUILD"
          centered={false}
        />
        <Link href="/services">
          <PrimaryButton className="justify-center lg:justify-start h-fit">
            View All Services
          </PrimaryButton>
        </Link>
      </div>

      <div className="mt-6 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {services.map((service, index) => {
          const layoutClass =
            index === 0 || index === 1 ? "lg:col-span-6" : "lg:col-span-4";

          return (
            <Link
              key={index}
              href="/services"
              className={cn(
                "group relative rounded-3xl p-8",
                "border border-black/5",
                "hover:shadow-[0_25px_60px_rgba(0,0,0,0.05)]",
                "transition-all duration-300",
                "min-h-65",
                layoutClass,
              )}
            >
              <div className="flex flex-col justify-between h-full">
                {/* Top */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="gradient-text text-2xl font-semibold tracking-tight">
                      {service.title}
                    </h3>

                    {/* Arrow */}
                    <ArrowUpRight
                      className="w-5 h-5 text-black/40 
                      transition-transform duration-300 
                      group-hover:translate-x-1 group-hover:-translate-y-1 
                      group-hover:text-black"
                    />
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="space-y-2">
                  {service.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="text-sm text-gray-500 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black/40"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CoreServices;
