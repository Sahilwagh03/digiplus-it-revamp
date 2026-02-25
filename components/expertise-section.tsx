import SectionHeader from "./SectionHeader";
import ServiceCard from "./service-card";

const expertiseCards = [
  {
    title: "Generative Enterprise Transformation",
    description:
      "Helping transform legacy OSS/BSS systems with API-first architecture aligned to TM Forum ODA. We modernize telecom operations using microservices, cloud-native deployment, and AI-driven automation delivering faster time-to-market.",
    deliverables: [
      "TM Forum ODA-compliant architecture",
      "OSS/BSS modernization & integration",
      "Service orchestration & automation",
      "Zero-touch provisioning",
    ],
    technologies: ["Microservices", "Node.js", "Kafka", "Cloud Native", "AI/ML"],
    cta: "/services#enterprise-modernization",
  },
  {
    title: "AI-Driven Product Engineering",
    description:
      "Full-stack digital products built for telecom scale. From web portals to mobile apps to backend APIs, we engineer solutions that handle millions of users with fast response times and 99.99% uptime.",
    deliverables: [
      "React, Angular, Node.js, Python development",
      "Mobile apps (iOS, Android, React Native)",
      "Microservices & API architecture",
      "Real-time systems & WebSockets",
    ],
    technologies: ["React", "Next.js", "Node.js", "React Native", "WebSockets"],
    cta: "/services#digital-engineering",
  },
  {
    title: "Intelligence-First Platforms",
    description:
      "Production-grade AI agents for telecom operations. From LLM-powered analytics to predictive network maintenance, we deliver ML systems that process millions of events daily with measurable ROI.",
    deliverables: [
      "LLM agents (GPT, Claude, fine-tuned models)",
      "Predictive maintenance & anomaly detection",
      "Natural language query interfaces",
      "Real-time data pipelines (Kafka, Spark)",
    ],
    technologies: ["LLMs", "Python", "Kafka", "Spark", "Data Pipelines"],
    cta: "/services#ai-data",
  },
  {
    title: "Operation Automation",
    description:
      "Zero-touch network operations using AI-driven automation, AIOps, and intelligent orchestration. We reduce operational overhead by 70% while improving service quality and reducing MTTR by 85%.",
    deliverables: [
      "AIOps & predictive operations",
      "Network automation & orchestration",
      "Self-healing systems",
      "Continuous optimization",
    ],
    technologies: ["AIOps", "Terraform", "Kubernetes", "Observability"],
    cta: "/services#autonomous-ops",
  },
];

const ExpertiseSection = () => {
  return (
    <div className="max-w-340 mx-auto flex flex-col gap-12">
      <SectionHeader
        titleStart="Our Expertise Drives"
        highlight="Your Success"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {expertiseCards.map((card) => (
          <ServiceCard
            key={card.title}
            title={card.title}
            description={card.description}
            deliverables={card.deliverables}
            technologies={card.technologies}
          >
          </ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseSection;