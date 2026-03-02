"use client";

import CTA from "@/components/CTA";
import SectionHeader from "@/components/SectionHeader";
import ServicesHeroCanvas from "@/components/service-canvas";
import ServiceCard from "@/components/service-card";
import { services } from "@/constant/home";
import Link from "next/link";
import { motion } from "framer-motion";

const ServicesPage = () => {
  return (
    <section>
      <div className="relative w-full py-10 overflow-hidden">
        <ServicesHeroCanvas />
        
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />

        <div className="relative z-10 max-w-340 mx-auto px-4">
          <div className="flex flex-col pt-3 gap-4 text-center items-center">
            <div className="text-xs flex gap-2 items-center px-3 py-2 bg-[#6c5ce714] rounded-full w-fit">
              <span className="block w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>What We Build</span>
            </div>

            <h1 className="flex flex-col gap-2 text-5xl xl:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-(--navy">
              <span>End-to-End</span>
              <span className="bg-[linear-gradient(135deg,var(--coral),var(--magenta),var(--purple),var(--blue))] bg-size-[300%_300%] bg-clip-text text-transparent animate-[gradient-shift-text_6s_ease_infinite]">
                Digital Services
              </span>
            </h1>

            <p className="max-w-2xl text-sm lg:text-lg leading-7 text-gray-600">
              From AI strategy to cloud infrastructure, application engineering
              to QA we deliver measurable outcomes at every layer of the stack.
            </p>

            <Link
              href="/services"
              className="bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]
              relative inline-flex items-center gap-2 px-4 py-2 rounded-xl
              font-semibold text-white tracking-wide
              transition-all duration-300 hover:-translate-y-0.5
              hover:shadow-[0_8px_24px_rgba(108,92,231,0.4)]
              w-fit"
            >
              <span className="text-md">AI Products</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex py-16 px-4 flex-col gap-12 max-w-340 mx-auto">
        <SectionHeader
          badge="Services"
          titleStart="Digital Enterprise"
          highlight="Transformation"
          description="We translate strategy into execution with a focus on speed, efficiency, and dependable operational performance."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{
                once: true,
                amount: 0.2,
                margin: "-60px 0px",
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08, // clean stagger
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <CTA
        description="Our telecom experts are ready to understand your challenges and design a solution that delivers measurable results."
        buttonText="Schedule Free Consultation"
        isDialog
      />
    </section>
  );
};

export default ServicesPage;