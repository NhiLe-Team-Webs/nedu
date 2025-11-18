import React from "react";
import Image from "next/image";

interface MissionProps {
  title: string;
  subtitle: string;
  description: string;
}

const Mission: React.FC<MissionProps> = ({ title, subtitle, description }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen relative">
      <Image
        src="/coming-bg.jpg"
        alt="bg"
        fill
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative flex flex-col items-start gap-8 max-w-3xl">
        <p className="absolute top-[-68px] left-0 right-0 text-[110px] font-bold text-center text-white/20 uppercase">
          {title}
        </p>
        <p className="z-10 text-[68px] mx-auto font-extrabold text-center text-white uppercase">
          {subtitle}
        </p>
        <p className="text-[24px] font-bold text-center text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Mission;
