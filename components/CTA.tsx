import { MoveRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] py-36 px-6 m-6 rounded-3xl">
      
      {/* Top Left Blob */}
      <div
        className="absolute -top-40 -left-40 w-162.5 h-162.5 rounded-full blur-[180px]"
        style={{
          background:
            "linear-gradient(135deg, #ffbdbd 0%, #f4b6d9 30%, #cfc6ff 65%, #bfe3ff 100%)",
        }}
      />

      {/* Bottom Right Blob */}
      <div
        className="absolute -bottom-52 -right-40 w-175 h-175 rounded-full blur-[200px]"
        style={{
          background:
            "linear-gradient(135deg, #ffcaca 0%, #e9c6ff 40%, #c7dcff 75%, #d6f0ff 100%)",
        }}
      />

      {/* Center Soft Accent Blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-150 h-150 rounded-full blur-[220px]"
        style={{
          background:
            "linear-gradient(135deg, #ffdede 0%, #efd8ff 50%, #d4e7ff 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-[clamp(38px,4vw,66px)] font-semibold tracking-[-0.025em] leading-[1.08] text-[#111]">
          Ready to Transform Your Operations?
        </h2>

        <p className="mt-6 text-lg md:text-xl text-black/65 max-w-3xl mx-auto leading-relaxed">
          Let’s discuss how DigiPlus can accelerate your digital
          transformation journey.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            className="group relative px-12 py-5 rounded-3xl 
            bg-black text-white font-medium text-lg
            transition-all duration-500 
            hover:scale-105 
            hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              Get Started
              <MoveRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;