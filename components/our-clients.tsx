import { EnterprisePartners, partners } from "@/constant/home";
import PartnerCard from "./partner-card";
import SectionHeader from "./SectionHeader";
import StatsSection from "./stats-section";


const OurClients = () => {
  return (
    <section className="w-full max-w-360 mx-auto pt-16 lg:pt-24 px-2 lg:px-6">
      <SectionHeader
        badge="Our Clients"
        titleStart="Trusted by"
        highlight="Industry Leaders"
        titleEnd="Worldwide"
        description="From tier-1 telecom operators to global technology giants — the world's most innovative companies trust DigiPlus to deliver."
      />
      <div className="flex flex-col gap-2 text-center px-2 lg:px-0 mt-6">
        <h3 className="text-sm font-bold tracking-[0.12rem] text-gray-400 uppercase">
          Telecom Partners
        </h3>
        <div className="lg:flex lg:flex-wrap grid grid-cols-2 justify-center items-center gap-2 lg:gap-8 mt-8">
          {partners.map((partner, index) => (
            <PartnerCard
              key={index}
              blackLogo={partner.blackLogo}
              whiteLogo={partner.whiteLogo}
              alt={partner.alt}
              imageClassName={partner.imageClassName}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 text-center px-2 lg:px-0 mt-6 py-6">
        <h3 className="text-sm font-bold tracking-[0.12rem] text-gray-400 uppercase">
          Enterprise Partners
        </h3>
        <div className="lg:flex lg:flex-wrap grid grid-cols-2 justify-center items-center gap-2 lg:gap-8 mt-8">
          {EnterprisePartners.map((partner, index) => (
            <PartnerCard
              key={index}
              blackLogo={partner.blackLogo}
              whiteLogo={partner.whiteLogo}
              alt={partner.alt}
              imageClassName={partner.imageClassName}
              darkImageClassName={partner.darkImageClassName}
              whiteImageClassName={partner.whiteImageClassName}
            />
          ))}
        </div>
      </div>
      <StatsSection/>
    </section>
  );
};

export default OurClients;
