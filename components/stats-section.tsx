type StatItem = {
  value: string;
  label: string;
};

const STATS: StatItem[] = [
  { value: "10+", label: "Enterprise Clients" },
  { value: "9+", label: "Telecom Clients" },
  { value: "9+", label: "Years of Trust" },
  { value: "50+", label: "Years of Domain Expertise" },
];

type Props = {};

function StatsSection({}: Props) {
  return (
    <section className="w-full pt-10 bg-white">
      <div className="lg:max-w-6xl mx-auto w-full lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 lg:gap-y-12 gap-x-4 lg:gap-x-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-[clamp(40px,5vw,72px)] font-semibold tracking-[-0.03em] gradient-text">
                {stat.value}
              </div>
              <div className="text-[0.8rem] lg:text-sm uppercase font-semibold tracking-widest text-neutral-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;