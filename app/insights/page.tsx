"use client";

import InsightsCard from "@/components/insight-card";
import SectionHeader from "@/components/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { insightsData } from "@/constant/home"; 

const InsightsPage = () => {
  return (
    <section className="w-full">
      <div className="flex py-16 lg:px-4 px-2 flex-col gap-12 max-w-7xl mx-auto">
        <SectionHeader
          highlight="Insights"
          titleEnd=" & Thought Leadership"
          description="Expert perspectives on telecom transformation, AI innovation, and industry trends."
        />

        <Tabs defaultValue="all" className="w-full flex flex-col items-center gap-4 lg:gap-8">

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