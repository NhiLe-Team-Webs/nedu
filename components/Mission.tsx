import React from "react";
import { cn } from "@/lib/utils";

interface MissionProps {
  title: string;
  subtitle: string;
  description: string;
  imgUrl?: string;
  theme?: "light" | "dark";
}

const Mission: React.FC<MissionProps> = ({ title, subtitle, description, imgUrl, theme = "dark" }) => {
  const background = imgUrl || "/images/programs/suc-manh-vo-han.jpg";
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full overflow-hidden",
        isLight ? "bg-white" : "min-h-screen bg-cover bg-center"
      )}
      style={isLight ? undefined : { backgroundImage: `url(${background})` }}
    >
      <div className="relative flex flex-col items-center gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
        {title && (
          <h1 className={cn(
            "hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-center uppercase leading-tight break-words",
            isLight ? "text-gray-600" : "text-white/90"
          )}>
            {title}
          </h1>
        )}
        <h2 className={cn(
          "z-10 mx-auto font-extrabold text-center uppercase break-words",
          isLight 
            ? "text-3xl sm:text-4xl lg:text-[60px] text-yellow-500 mb-6 sm:mb-8 lg:mb-12 leading-[1.2]" 
            : "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-tight pb-4 sm:pb-6"
        )}>
          {subtitle}
        </h2>
        <p className={cn(
          "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal text-center leading-relaxed max-w-full sm:max-w-3xl px-4 sm:px-0",
          isLight ? "text-gray-800" : "text-white"
        )}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Mission;
