"use client";

import InsightsCard from "@/components/insight-card";
import InsightsHeroStreams from "@/components/InsightsHeroStreams";
import SectionHeader from "@/components/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { insightsData } from "@/constant/home";
import Link from "next/link";

const InsightsPage = () => {
  return (
    <section className="w-full">
      <div className="relative w-full py-10 overflow-hidden">
        <InsightsHeroStreams />

        {/* CENTERED CONTENT */}
        <div className="relative z-10 max-w-340 mx-auto px-4">
          <div className="flex flex-col pt-3 gap-4 text-center items-center">
            <div className="text-xs flex gap-2 items-center px-3 py-2 bg-[#6c5ce714] rounded-full w-fit">
              <span className="block w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>What We Build</span>
            </div>

            <h1 className="flex flex-col gap-2 text-5xl xl:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-(--navy">
              <span>Engineering Insights from the</span>
              <span className="bg-[linear-gradient(135deg,var(--coral),var(--magenta),var(--purple),var(--blue))] bg-size-[300%_300%] bg-clip-text text-transparent animate-[gradient-shift-text_6s_ease_infinite]">
                Front Lines
              </span>
            </h1>

            <p className="max-w-2xl text-sm lg:text-lg leading-7 text-gray-600">
              Case studies, white papers and technical deep-dives from engineers
              deploying AI, 5G and cloud at global telecom scale.
            </p>

            <Link
              href="/insights"
              className="bg-[linear-gradient(135deg,#FF6B6B_0%,#E84393_33%,#6C5CE7_66%,#4A90E2_100%)]
              relative inline-flex items-center gap-2 px-4 py-2 rounded-xl
              font-semibold text-white tracking-wide
              transition-all duration-300 hover:-translate-y-0.5
              hover:shadow-[0_8px_24px_rgba(108,92,231,0.4)]
              w-fit"
            >
              <span className="text-md">Browse Insights</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex py-16 lg:px-4 px-2 flex-col gap-12 max-w-7xl mx-auto">
        <SectionHeader
          highlight="Insights"
          titleEnd=" & Thought Leadership"
          description="Expert perspectives on telecom transformation, AI innovation, and industry trends."
        />

        <Tabs
          defaultValue="all"
          className="w-full flex flex-col items-center gap-4 lg:gap-8"
        >
          {/* Tabs */}
          <TabsList className="grid lg:w-full max-w-2xl grid-cols-4 bg-neutral-100 p-1 rounded-xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="usecases">Use Cases</TabsTrigger>
            <TabsTrigger value="casestudies">Case Studies</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          {/* ALL */}
          <TabsContent value="all" className="w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insightsData.map((item, index) => (
                <InsightsCard
                  key={item.id}
                  category={item.category}
                  title={item.title}
                  image={item.image}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          {/* USE CASES */}
          <TabsContent value="usecases" className="w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insightsData
                .filter((item) => item.type === "usecases")
                .map((item, index) => (
                  <InsightsCard
                    key={item.id}
                    category={item.category}
                    title={item.title}
                    image={item.image}
                    index={index}
                  />
                ))}
            </div>
          </TabsContent>

          {/* CASE STUDIES */}
          <TabsContent value="casestudies" className="w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insightsData
                .filter((item) => item.type === "casestudies")
                .map((item, index) => (
                  <InsightsCard
                    key={item.id}
                    category={item.category}
                    title={item.title}
                    image={item.image}
                    index={index}
                  />
                ))}
            </div>
          </TabsContent>

          {/* BLOG */}
          <TabsContent value="blog" className="w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insightsData
                .filter((item) => item.type === "blog")
                .map((item, index) => (
                  <InsightsCard
                    key={item.id}
                    category={item.category}
                    title={item.title}
                    image={item.image}
                    index={index}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InsightsPage;
