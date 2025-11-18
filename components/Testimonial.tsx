"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Course } from "@/data/courses";

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

  const handleButtonClick = () => {
    if (buttonType === 'cart' && course) {
      addToCart(course);
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
              <div className="rounded-xl overflow-hidden shadow-lg">
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
            className="inline-flex items-center bg-amber-400 hover:bg-amber-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-r-full rounded-l-full font-semibold uppercase transition-colors text-sm sm:text-base"
          >
            {buttonText}
            {buttonType === 'cart' ? (
              <svg
                className="ml-2 sm:ml-3 w-3 h-3 sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2L3 9v13a2 2 0 002 2h14a2 2 0 002-2V9l-6-7H9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 9h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12h6v10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="ml-2 sm:ml-3 w-3 h-3 sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;