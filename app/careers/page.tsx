import CTA from "@/components/CTA";
import PrimaryButton from "@/components/primary-button";
import SectionHeader from "@/components/SectionHeader";
import WhyJoinSection from "@/components/why-join-us";

const CareersPage = () => {
  return (
    <section className="w-full">
      <div className="flex py-16 lg:px-4 px-2 flex-col min-h-[50svh] justify-center items-center gap-6 bg-neutral-100">
        <div className="flex flex-col gap-6 justify-center items-center">
          <SectionHeader
            titleStart="Build Future of "
            highlight="Telecom"
            titleEnd="With DigiPlus"
            description="Join a team solving the hardest problems in telecom with AI, cloud, and cutting-edge tech."
          />
          <PrimaryButton>View Open Position</PrimaryButton>
        </div>
      </div>
      <div className="flex py-6 lg:py-12 px-4 flex-col gap-12 max-w-340 mx-auto">
        <SectionHeader
          titleStart="Why"
          highlight="DigiPlus?"
          centered={false}
        />
        <WhyJoinSection/>
      </div>
      <CTA title="Don't See a Perfect Fit?" description="We're always interested in exceptional talent. Send us your resume and  let's talk about opportunities." buttonText="Send Resume" email="hr@digiplusit.com"/>
    </section>
  );
};

export default CareersPage;
