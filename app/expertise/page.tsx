import CTA from "@/components/CTA";
import ExpertiseSection from "@/components/expertise-section";
import SectionHeader from "@/components/SectionHeader";
import StandardsCard from "@/components/standards-card";
import { standardsData } from "@/constant/home";
import { Star } from "lucide-react";
import Image from "next/image";

const ExpertisePage = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="min-h-[50svh] pt-6 lg:pt-0 bg-neutral-100 flex items-center">
        <div className="max-w-340 mx-auto px-4 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex-1">
              <SectionHeader
                titleStart="Deep Telecom Expertise Meets"
                highlight="Cutting-Edge Technology"
                description="Domain mastery combined with modern engineering practices. We speak telecom."
                centered={false}
              />
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-lg lg:m-4">
                <Image
                  src="/globe.avif"
                  alt="Expertise Image"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            </div>
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
                linkText={standard.linkText}
                linkHref={standard.linkHref}
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
