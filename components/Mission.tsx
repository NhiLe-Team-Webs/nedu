import React from "react";

interface MissionProps {
  title: string;
  subtitle: string;
  description: string;
  imgUrl?: string;
}

const Mission: React.FC<MissionProps> = ({ title, subtitle, description, imgUrl }) => {
  const background = imgUrl || "/picture/suc_manh_vo_han.jpg";

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative flex flex-col items-center gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
        <h1 className="hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-center text-white/90 uppercase leading-tight break-words">
          {title}
        </h1>
        <h2 className="z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto font-extrabold text-center text-white uppercase leading-tight break-words pb-4 sm:pb-6">
          {subtitle}
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-center text-white leading-relaxed max-w-full sm:max-w-3xl px-4 sm:px-0">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Mission;
