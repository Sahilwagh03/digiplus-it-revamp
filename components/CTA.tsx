"use client";

import PrimaryButton from "./primary-button";
import ContactDialog from "./ContactDialog";
import { useRouter } from "next/navigation";

interface CTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  isDialog?: boolean;
  email?: string;
  href?: string;
}

const CTA = ({
  title = "Ready to Transform Your Operations?",
  description = "Let’s discuss how DigiPlus can accelerate your digital transformation journey.",
  buttonText = "Get Started",
  isDialog = false,
  email,
  href,
}: CTAProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
      return;
    }

    if (href) {
      router.push(href);
      return;
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] py-36 px-6 mx-4 lg:m-6 rounded-3xl">
      
      {/* Decorative Blobs */}
      <div
        className="absolute -top-40 -left-40 w-162.5 h-162.5 rounded-full blur-[180px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #ffbdbd 0%, #f4b6d9 30%, #cfc6ff 65%, #bfe3ff 100%)",
        }}
      />

      <div
        className="absolute -bottom-52 -right-40 w-175 h-175 rounded-full blur-[200px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #ffcaca 0%, #e9c6ff 40%, #c7dcff 75%, #d6f0ff 100%)",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-150 h-150 rounded-full blur-[220px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #ffdede 0%, #efd8ff 50%, #d4e7ff 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-[clamp(38px,4vw,66px)] font-semibold tracking-[-0.025em] leading-[1.08] text-[#111]">
          {title}
        </h2>

        <p className="mt-6 text-lg md:text-xl text-black/65 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex justify-center">
          {isDialog ? (
            <ContactDialog>
              <PrimaryButton className="px-8 py-3 rounded-xl">
                {buttonText}
              </PrimaryButton>
            </ContactDialog>
          ) : (
            <PrimaryButton
              onClick={handleClick}
              className="px-8 py-3 rounded-xl"
            >
              {buttonText}
            </PrimaryButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;