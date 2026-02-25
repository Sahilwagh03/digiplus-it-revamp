import ReasonCard from "./reason-card";
import { Rocket, Brain, Globe, Zap } from "lucide-react";

const WhyJoinSection = () => {
  return (
    <div className="max-w-340 mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ReasonCard
        icon={<Rocket size={22} strokeWidth={1.5} />}
        title="Cutting-Edge Technology"
        description="Build advanced AI and telecom solutions using modern cloud-native and intelligent platforms."
        highlight="We engineer what’s next."
      />

      <ReasonCard
        icon={<Brain size={22} strokeWidth={1.5} />}
        title="Deep Domain Expertise"
        description="Gain hands-on experience backed by 8+ years of telecom and AI delivery at scale."
        highlight="Learn from industry specialists."
      />

      <ReasonCard
        icon={<Globe size={22} strokeWidth={1.5} />}
        title="Global-Scale Impact"
        description="Develop systems powering telecom networks serving 50M+ subscribers worldwide."
        highlight="Operate at real-world scale."
      />

      <ReasonCard
        icon={<Zap size={22} strokeWidth={1.5} />}
        title="High-Velocity Execution"
        description="Work in focused two-week sprints with continuous delivery and rapid production releases."
        highlight="Ship faster. See impact sooner."
      />
    </div>
  );
};

export default WhyJoinSection;