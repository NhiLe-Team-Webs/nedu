import React from "react";
import * as Icon from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { courses } from "@/data/courses";

interface CourseInfoProps {
  title: string;
  details: {
    label: string;
    value: string;
    icon: keyof typeof Icon; // Ensures compatibility with lucide-react icons
  }[];
  buttonText: string;
  buttonLink: string;
  courseSlug?: string; // Add optional courseSlug prop
}

const CourseInfo: React.FC<CourseInfoProps> = ({
  title,
  details,
  buttonText,
  buttonLink,
  courseSlug,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (courseSlug) {
      const course = courses.find(c => c.slug === courseSlug);
      if (course) addToCart(course);
    }
  };

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
        {courseSlug && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition text-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>
            <a
              href={buttonLink}
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
