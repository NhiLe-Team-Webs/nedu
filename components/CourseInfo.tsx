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
  buttonText?: string;
  buttonLink?: string;
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
    <div className="flex flex-col items-center justify-center w-full max-w-[1280px] mx-auto my-6 sm:my-8 lg:my-[48px]">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-[40px]">
        <h1 className="text-3xl sm:text-4xl lg:text-[60px] font-extrabold text-center text-yellow-500 uppercase mb-6 sm:mb-8 lg:mb-12">
          {title}
        </h1>
        <div className="flex flex-col w-full p-4 sm:p-6 lg:p-10 bg-white shadow-md rounded-lg">
          <h2 className="mb-4 sm:mb-6 lg:mb-[24px] text-lg sm:text-xl lg:text-[24px] font-bold">THÔNG TIN KHÓA HỌC</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-y-6 lg:gap-y-8 gap-x-4">
            {details.map((detail, index) => {
              const IconComponent = Icon[detail.icon] as React.ElementType;
              return (
                <div key={index} className="flex items-start mb-4 sm:mb-6">
                  <div className="text-yellow-500 text-lg sm:text-xl mr-3 sm:mr-4">
                    {IconComponent && <IconComponent />}
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-normal">{detail.label}</p>
                    <p className="text-sm sm:text-base font-semibold">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {courseSlug && buttonText && buttonLink && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition text-sm sm:text-lg w-full sm:w-auto justify-center"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              Thêm vào giỏ hàng
            </button>
            <a
              href={buttonLink}
              className="inline-block bg-primary hover:bg-primary-dark text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition text-sm sm:text-lg w-full sm:w-auto text-center"
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
