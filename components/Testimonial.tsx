"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Course } from "@/data/courses";
import { ChevronRight, ShoppingBag, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface TestimonialsProps {
  videos: string[];
  captions: string[];
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  course?: Course;
  buttonType?: 'link' | 'cart';
}

const Testimonials: React.FC<TestimonialsProps> = ({
  videos,
  captions,
  title,
  subtitle,
  buttonText,
  buttonLink,
  course,
  buttonType = 'link',
}) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const { t } = useLanguage();

  const handleButtonClick = () => {
    if (buttonType === 'cart' && course) {
      addToCart(course);
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 3000);
    } else if (buttonLink) {
      window.location.href = buttonLink;
    }
  };
  return (
    <section
      className="relative flex flex-col items-center py-12 sm:py-16 lg:py-20 bg-white"
      id="testimonials"
    >
      {/* large faded background label */}
      <p className="pointer-events-none absolute inset-x-0 top-0 text-center text-[60px] sm:text-[80px] lg:text-[110px] font-bold text-amber-50 uppercase select-none">
        {title}
      </p>

      <div className="max-w-[1280px] w-full px-4 sm:px-6">
        <h3 className="text-2xl sm:text-3xl lg:text-[68px] font-black text-center text-amber-400 uppercase relative z-10">
          {subtitle}
        </h3>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 place-items-center">
          {videos.map((src, i) => (
            <div key={i} className="max-w-[280px] sm:max-w-[360px] w-full">
              <div className="rounded-ios-lg overflow-hidden shadow-ios-card transition-all duration-300 hover:shadow-ios-float">
                <div className="w-full aspect-video" style={{ height: 'auto' }}>
                  <iframe
                    className="w-full h-full"
                    src={src}
                    title={`testimonial-${i}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <p className="mt-2 sm:mt-3 text-sm sm:text-base font-medium text-center text-gray-600">{captions[i]}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={handleButtonClick}
            disabled={justAdded}
            className={`inline-flex items-center px-6 py-3 rounded-ios-btn font-semibold uppercase transition-all duration-300 text-sm sm:text-base min-h-[44px] ${justAdded
              ? 'bg-transparent border-2 border-green-500 text-green-500 cursor-default'
              : 'bg-primary hover:bg-yellow-600 text-white shadow-ios-sm hover:shadow-ios-md ios-haptic-active'
              }`}
          >
            {justAdded ? (
              <>
                {t("cart_popup.added")}
                <CheckCircle className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
              </>
            ) : (
              <>
                {buttonText}
                {buttonType === 'cart' ? (
                  <ShoppingBag className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <ChevronRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;