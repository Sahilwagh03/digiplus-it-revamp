import { partners } from "@/constant/home";
import PartnerCard from "./partner-card";

type Props = {};

const OurClients = (props: Props) => {
  return (
    <section className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-5 h-0.5 bg-(--purple)" />
          <span className="text-sm font-bold tracking-[0.12rem] text-(--purple) uppercase">
            Our Clients
          </span>
        </div>

        <h2 className="text-[clamp(36px,4vw,56px)] font-semibold leading-[1.15] tracking-[-0.02em]">
          <span>Trusted by</span>{" "}
          <span className="gradient-text">
            Industry Leaders
          </span>{" "}
          <span>Worldwide</span>
        </h2>

        {/* Description */}
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
          From tier-1 telecom operators to global technology giants — the
          world's most innovative companies trust DigiPlus to deliver.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-center mt-6">
        <h3 className="text-sm font-bold tracking-[0.12rem] text-gray-400 uppercase">Telecom Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {partners.map((partner, index) => (
            <PartnerCard
              key={index}
              blackLogo={partner.blackLogo}
              whiteLogo={partner.whiteLogo}
              alt={partner.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
