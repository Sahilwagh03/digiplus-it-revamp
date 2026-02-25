import CTA from "@/components/CTA";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

const AboutPage = () => {
  return (
    <section className="w-full">
      <div className="flex py-16 lg:px-4 px-2 flex-col min-h-[50svh] justify-center items-center gap-6 bg-neutral-100">
        <div className="flex flex-row gap-6 justify-center items-center">
          <SectionHeader
            titleStart="Built on Purposeful"
            highlight="Action, Shared Success, Culture"
            titleEnd="That Enjoys the Journey"
            description="At DigiPlus, we turn focused intent into measurable results. We act with clarity, collaborate closely, and build lasting impact—while enjoying the process that drives sustainable success."
            centered={false}
          />
          <div>
            <Image
              src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/"
              alt="About Us Image"
              width={1200}
              height={800}
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </div>
      <CTA
        description="Our telecom experts are ready to understand your challenges and design a solution that delivers measurable results."
        buttonText="Schedule Free Consultation"
        isDialog
      />
    </section>
  );
};

export default AboutPage;
