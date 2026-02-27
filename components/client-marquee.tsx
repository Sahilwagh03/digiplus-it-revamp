"use client";

type TickerItem = {
  client: string;
  domain: string;
};

const TICKER_ITEMS: TickerItem[] = [
  { client: "Ericsson", domain: "Communications Technology & Services" },
  { client: "T-Mobile", domain: "Telecommunications" },
  { client: "ODIDO", domain: "Largest Telecommunication Company In The Netherlands" },
  { client: "Telia Group", domain: "Swedish Multinational Telecommunication Provider" },
  { client: "Proximus", domain: "Belgian Telecommunications & ICT Company" },
  { client: "Tele2", domain: "Telecommunications" },
  { client: "Windtre", domain: "Italian Telecommunication Company" },
  { client: "Lenovo", domain: "Enterprise Technology" },
  { client: "Intel", domain: "Enterprise & AI Technology" },
  { client: "Epic Company - IN10 Media", domain: "Infotainment" },
  { client: "Hungama", domain: "Music & Infotainment" },
  { client: "Nazara", domain: "India's Largest Game Publishing House" },
  { client: "MPL", domain: "Gamification" },
  { client: "ONDC", domain: "Open Network Digital Commerce Tech Partner" },
  { client: "Postcard.Travel", domain: "Digital Enablement" },
  { client: "OAKS", domain: "EdTech" },
  { client: "CommuTree", domain: "Community Management" },
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
              <strong className="font-medium">{item.client}</strong> — {item.domain}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}