import Link from "next/link";
import PrimaryButton from "./primary-button";
import SectionHeader from "./SectionHeader";

const LatestInsights = () => {
  return (
    <section className="w-full bg-neutral-100 py-8 lg:py-12 px-6 lg:px-12">
      <div className="max-w-360 mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:items-end">
        <SectionHeader
          titleStart="Latest"
          highlight="Insights"
          badge="Knowledge Hub"
          centered={false}
        />
        <Link href="/insights">
          <PrimaryButton className="justify-center lg:justify-start h-fit">
            All Insights
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
};

export default LatestInsights;
