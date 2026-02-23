import { cn } from "@/lib/utils";
import Image from "next/image";

interface PartnerCardProps {
  blackLogo: string;
  whiteLogo: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  darkImageClassName?: string;
  whiteImageClassName?: string;
}

const PartnerCard = ({ blackLogo, whiteLogo, alt , className, imageClassName, darkImageClassName, whiteImageClassName }: PartnerCardProps) => {
  return (
    <div className={cn("group relative bg-[#F9FAFB] hover:bg-black transition-all duration-500 flex justify-center items-center py-8 px-4 rounded-4xl cursor-pointer  lg:min-w-64", className)}>

      {/* Logo Wrapper */}
      <div className="relative overflow-hidden h-9 w-30 flex items-center justify-center">

        <Image
          src={blackLogo}
          alt={alt}
          width={120}
          height={24}
          className={cn("absolute transition-transform duration-500 ease-in-out group-hover:-translate-y-full", imageClassName, darkImageClassName)}
        />

        <Image
          src={whiteLogo}
          alt={alt}
          width={120}
          height={24}
          className={cn("absolute translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0", imageClassName,whiteImageClassName)}
        />

      </div>
    </div>
  );
};

export default PartnerCard;