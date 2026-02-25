import CTA from "@/components/CTA";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/service-card";
import { services } from "@/constant/home";

const ServicesPage = () => {
  return (
    <section>
      <div className="flex py-8 px-4 flex-col gap-12 max-w-340 mx-auto">
        <SectionHeader
          badge="Services"
          titleStart="Digital Enterprise"
          highlight="Transformation"
          description="We translate strategy into execution with a focus on speed, efficiency, and dependable operational performance. "
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
      <CTA description="Our telecom experts are ready to understand your challenges and  design a solution that delivers measurable results."  buttonText="Schedule Free Consultation" isDialog/>
    </section>
  );
};

export default ServicesPage;
