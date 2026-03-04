import AiProductSection from "@/components/ai-products";
import ClientMarquee from "@/components/client-marquee";
import CoreServices from "@/components/core-services";
import CTA from "@/components/CTA";
import Hero from "@/components/hero";
import LatestInsights from "@/components/latest-insights";
import OurClients from "@/components/our-clients";
import { SeparatorSection } from "@/components/separator-section";
import Vision from "@/components/vision";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <SeparatorSection/>
      <OurClients/>
      <ClientMarquee/>
      <Vision/>
      <AiProductSection/>
      <CoreServices/>
      <LatestInsights/>
      <CTA isDialog/>
    </main>
  );
}
