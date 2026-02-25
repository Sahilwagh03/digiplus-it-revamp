import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { aiProducts } from "@/constant/home";

const AiProductSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 lg:py-24 px-4 lg:px-6">
      <div className="flex flex-col gap-16">
        <SectionHeader
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
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* TEXT SIDE */}
              <div
                className={`space-y-6 ${isReversed ? "order-1 lg:order-2" : ""}`}
              >
                <span className="text-sm uppercase tracking-widest text-(--purple) font-medium">
                  {product.badge}
                </span>

                <h3 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-neutral-900">
                  {product.title}
                </h3>

                <p className="text-neutral-600 text-lg leading-relaxed">
                  {product.description}
                </p>

                <ul className="space-y-3 text-neutral-700">
                  {product.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>

              {/* IMAGE SIDE */}
              <div className={isReversed ? "order-2 lg:order-1" : ""}>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="rounded-xl"
                  />
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
