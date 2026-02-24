import AiProductSection from "@/components/ai-products";
import ClientMarquee from "@/components/client-marquee";
import CTA from "@/components/CTA";
import Hero from "@/components/hero";
import OurClients from "@/components/our-clients";
import Vision from "@/components/vision";

export default function Home() {
  return (
    <main>
      <Hero />
      <OurClients/>
      <ClientMarquee/>
      <Vision/>
      <AiProductSection/>
      <CTA/>
    </main>
  );
}
