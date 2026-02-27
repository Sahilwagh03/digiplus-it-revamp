import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { aiProducts } from "@/constant/home";

const AiProductSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 lg:py-24 px-4 lg:px-6">
      <div className="flex flex-col gap-16">
        <SectionHeader
          badge="AI Products"
          titleStart="Accelerating Telecom's Evolution with"
          highlight="AI-Driven Innovation"
          description="Enterprise-grade digital transformation partner trusted by global telecom leaders. We bridge legacy systems to autonomous futures."
          centered={false}
        />

        {aiProducts.map((product, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={product.id}
              className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center"
            >
              <div
                className={`space-y-6 ${isReversed ? "order-1 lg:order-2" : ""}`}
              >
                <div className="text-xs uppercase tracking-widest text-(--purple) font-medium">
                  {product.badge}
                </div>

                <h3 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-neutral-900">
                  {product.title.titleStart && (
                    <span>{product.title.titleStart} </span>
                  )}
                  {product.title.highlight && (
                    <span className="gradient-text">
                      {" "}
                      {product.title.highlight}{" "}
                    </span>
                  )}
                  {product.title.titleEnd && (
                    <span>{product.title.titleEnd}</span>
                  )}
                </h3>

                <p className="text-neutral-500 text-lg leading-relaxed">
                  {product.description}
                </p>

                <ul className="space-y-3 text-neutral-700">
                  {product.features.map((feature, i) => (
                    <div className="flex items-center gap-2" key={i}>
                      <div className="gradient-bg-brand w-2 h-2 rounded-full"></div>
                      <li className="font-normal"> {feature}</li>
                    </div>
                  ))}
                </ul>
              </div>

              {/* IMAGE SIDE */}
              <div className={isReversed ? "order-2 lg:order-1" : ""}>
                <div className="relative rounded-xl  overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                  {product.component}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AiProductSection;
