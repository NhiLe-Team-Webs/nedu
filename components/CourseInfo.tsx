import React from "react";
import * as Icon from "lucide-react";

interface CourseInfoProps {
  title: string;
  details: {
    label: string;
    value: string;
    icon: keyof typeof Icon;
  }[];
  buttonText: string;
  buttonLink: string;
}

const CourseInfo: React.FC<CourseInfoProps> = ({
  title,
  details,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1280px] mx-auto my-[48px]">
      <div className="flex flex-col items-center justify-center w-full w-full px-[40px]">
        <h1 className="text-[60px] font-extrabold text-center text-yellow-500 uppercase mb-12">
          {title}
        </h1>
        <div className="flex flex-col w-full p-10 bg-white shadow-md rounded-lg">
          <h2 className="mb-[24px] text-[24px] font-bold">THÔNG TIN KHÓA HỌC</h2>
          <div className="grid grid-cols-3 gap-y-8 ">
            {details.map((detail, index) => {
              const IconComponent = Icon[detail.icon] as React.ElementType;
              return (
                <div key={index} className="flex items-start mb-6">
                  <div className="text-yellow-500 text-xl mr-4">
                    {IconComponent && <IconComponent />}
                  </div>
                  <div>
                    <p className="text-base font-normal">{detail.label}</p>
                    <p className="text-base font-semibold">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <a
          href={buttonLink}
          className="mt-8 px-6 py-3 bg-yellow-500 text-white font-medium uppercase rounded-full hover:bg-yellow-600 transition"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default CourseInfo;
