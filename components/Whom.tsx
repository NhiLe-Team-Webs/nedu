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
    <section className="py-20 flex flex-col items-center bg-white">
      <h2 className="text-5xl font-extrabold text-yellow-500 uppercase text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {items.map((item, index) => {
          const IconComponent = Icon[item.icon] as React.ElementType;
          return (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                {IconComponent && (
                  <IconComponent className="text-yellow-500 text-4xl" />
                )}
              </div>
              <h3 className="text-lg font-bold text-center uppercase mb-2">
                {item.heading}
              </h3>
              <p className="text-sm text-gray-600 text-center">
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
