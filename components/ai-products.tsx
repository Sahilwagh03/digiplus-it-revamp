import Image from "next/image";
import SectionHeader from "./SectionHeader";

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


        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-widest text-(--purple) font-medium">
              AI Assistant
            </span>

            <h3 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-neutral-900">
              Natural Language Chatbot for Inventory & Network Intelligence
            </h3>

            <p className="text-neutral-600 text-lg leading-relaxed">
              Empower operations teams with an AI-powered assistant capable of
              extracting real-time inventory and network data through simple
              natural language queries.
            </p>

            <ul className="space-y-3 text-neutral-700">
              <li>• Query live network inventory instantly</li>
              <li>• Extract OSS/BSS data conversationally</li>
              <li>• Reduce manual reporting & dependency on SQL</li>
              <li>• Context-aware telecom domain intelligence</li>
            </ul>
          </div>

          <div>
            <Image
              src="/ai-product-1.webp"
              className="rounded-3xl object-cover w-full h-125"
              alt="AI Chatbot Product"
              width={1200}
              height={800}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="/ai-product-2.webp"
              className="rounded-3xl object-cover w-full h-125"
              alt="AI Dashboard Product"
              width={1200}
              height={800}
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-sm uppercase tracking-widest text-(--purple) font-medium">
              Intelligence Dashboard
            </span>

            <h3 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-neutral-900">
              Unified Data Dashboard for Operational Visibility
            </h3>

            <p className="text-neutral-600 text-lg leading-relaxed">
              A centralized analytics platform enabling users to monitor
              network performance, service delivery metrics, and operational
              KPIs in real time.
            </p>

            <ul className="space-y-3 text-neutral-700">
              <li>• Real-time KPI monitoring</li>
              <li>• Custom telecom analytics views</li>
              <li>• Service fulfilment tracking</li>
              <li>• Intelligent alerting & insights</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AiProductSection;