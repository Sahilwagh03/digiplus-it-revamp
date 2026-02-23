"use client";

type TickerItem = {
  client: string;
  service: string;
};

const TICKER_ITEMS: TickerItem[] = [
  { client: "Ericsson", service: "Systems Upgrade" },
  { client: "T-Mobile", service: "Process Orchestration" },
  { client: "ODIDO", service: "OSS/BSS Modernization" },
  { client: "Telia Group", service: "Order and Service Delivery" },
  { client: "Proximus", service: "Service Fulfilment" },
  { client: "Tele2", service: "Designing BPMN" },
  { client: "Windtre", service: "Service Orchestration" },
  { client: "Lenovo", service: "Business Reporting" },
  { client: "Intel", service: "Reporting Applications" },
  { client: "Epic Company", service: "Gamification" },
  { client: "Hungama", service: "User Engagement Systems" },
  { client: "Nazara", service: "Tech Partner" },
  { client: "MPL", service: "Gamification" },
  { client: "ONDC", service: "Tech Partner & Loyalty System Design" },
  { client: "Postcard.Travel", service: "Digital Enablement" },
  { client: "OAKS", service: "Ecosystem Design" },
  { client: "CommuTree", service: "Community Management" },
];

export default function ClientMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-white">
      <div className="flex w-max animate-marquee hover:paused gap-6">

        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div
            key={`${item.client}-${index}`}
            className="flex items-center gap-3 px-5 py-2 bg-neutral-100 rounded-full whitespace-nowrap"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-sm text-neutral-700">
              <strong className="font-medium">{item.client}</strong> — {item.service}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}