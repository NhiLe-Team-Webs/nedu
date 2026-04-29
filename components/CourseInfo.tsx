import React from "react";
import * as Icon from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { courses } from "@/data/courses";

interface CourseInfoProps {
  title: string;
  details: {
    label: string;
    value: React.ReactNode;
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
        <div className="flex flex-col w-full p-4 sm:p-6 lg:p-10 bg-white shadow-ios-card rounded-ios-xl border-[3px] border-gray-400">
          <div className="flex flex-wrap justify-center gap-y-10 sm:gap-y-12 gap-x-6 sm:gap-x-10 lg:gap-x-16">
            {details.map((detail, index) => {
              const IconComponent = Icon[detail.icon] as React.ElementType;
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center w-full sm:w-[calc(45%-1rem)] lg:w-[calc(30%-1rem)] min-w-[200px] max-w-[300px]"
                >
                  <div className="text-yellow-500 text-3xl mb-4 bg-yellow-50 p-4 rounded-full flex items-center justify-center">
                    {IconComponent && <IconComponent strokeWidth={2.5} />}
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1.5">{detail.label}</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{detail.value}</p>
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
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-ios-btn font-semibold transition-all duration-200 text-sm sm:text-lg w-full sm:w-auto justify-center min-h-[44px] ios-haptic-active border border-gray-200"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              Thêm vào giỏ hàng
            </button>
            <a
              href={buttonLink}
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-ios-btn font-semibold transition-all duration-200 text-sm sm:text-lg w-full sm:w-auto text-center min-h-[44px] shadow-ios-sm hover:shadow-ios-md ios-haptic-active"
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
