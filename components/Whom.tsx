import React from "react";
import * as Icon from "lucide-react";

type WhomProps = {
  title: string;
  items: Array<{
    icon: keyof typeof Icon;
    heading: string;
    description: string;
  }>;
};

const Whom: React.FC<WhomProps> = ({ title, items }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 flex flex-col items-center bg-white">
      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-yellow-500 uppercase text-center mb-8 sm:mb-10 lg:mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl px-4 sm:px-0">
        {items.map((item, index) => {
          const IconComponent = Icon[item.icon] as React.ElementType;
          return (
            <div
              key={index}
              className="flex flex-col items-center p-4 sm:p-6 bg-white shadow-ios-card rounded-ios-lg border border-gray-100 transition-all duration-300 hover:shadow-ios-float hover:scale-[1.02]"
            >
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full mb-3 sm:mb-4">
                {IconComponent && (
                  <IconComponent className="text-yellow-500 text-2xl sm:text-4xl" />
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-center uppercase mb-2">
                {item.heading}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Whom;
