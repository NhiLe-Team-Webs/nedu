"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getCourseBySlug } from "@/data/courses";

interface TestimonialsProps {
  courseSlug?: string;
  buttonText?: string;
  buttonType?: 'link' | 'cart';
  buttonLink?: string;
}

const Testimonials = ({
  courseSlug,
  buttonText = "Tìm hiểu thêm",
  buttonType = 'link',
  buttonLink = "/program/"
}: TestimonialsProps) => {
  const { addToCart } = useCart();
  const course = courseSlug ? getCourseBySlug(courseSlug) : undefined;

  const handleButtonClick = () => {
    if (buttonType === 'cart' && course) {
      addToCart(course);
    } else {
      window.location.href = buttonLink;
    }
  };
  
  const videos = [
    "https://www.youtube.com/embed/Dm6gg-LHGqs?si=ZiBHEK0dZHJdsxUI",
    "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fneducation.sg%2Fvideos%2F1346108480515481%2F&show_text=false",
    "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fneducation.sg%2Fvideos%2F778445208105529%2F&show_text=false",
  ];

  const captions = [
    "Lần đầu Trang tham gia một chương trình của người Việt mà ấn tượng đến vậy. Cường độ học tập áp lực như môi trường doanh nhân thật sự.",
    "Sau 6 tháng tham gia chương trình, mình đã học cách nhận diện và quản lý sự trì hoãn và tạo nên sự thay đổi rõ rệt.",
    "Cần ít nhất 3 năm đi vô đi ra lại cái lớp như vậy để các bạn có thể bắt đầu hiểu vấn đề và bạn thay đổi học phát triển bản thân",
  ];

  return (
    <section className="relative flex flex-col items-center py-12 sm:py-16 lg:py-20 bg-white" id="testimonials">
      {/* large faded background label */}
      <p className="pointer-events-none absolute inset-x-0 top-0 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px] font-bold text-amber-50 uppercase select-none">
        TESTIMONIALS
      </p>

      <div className="max-w-[1280px] w-full px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[68px] font-black text-center text-amber-400 uppercase relative z-10 mb-8 sm:mb-10 md:mb-12">Cảm nhận từ học viên</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 place-items-center">
          {videos.map((src, i) => {
            return (
              <div key={i} className="w-full max-w-[420px] transition-all duration-300">
                <div className="rounded-2xl max-w-[240px] overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 m-auto">
                  <div className="w-full aspect-[9/16] relative bg-black">
                    <iframe
                      className="absolute inset-0 w-full h-full transition-all duration-300"
                      src={src}
                      title={`testimonial-${i}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>

                <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base lg:text-lg text-gray-600 transition-all duration-200 hover:text-gray-800 px-2">{captions[i]}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <Button
            onClick={handleButtonClick}
            variant="apple-primary"
            className="px-4 sm:px-6 py-2 sm:py-3"
          >
            <span className="inline-flex items-center text-white uppercase text-sm sm:text-base">
              {buttonText}
              {buttonType === 'cart' ? (
                <ShoppingCart className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200" />
              ) : (
                <ChevronRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200" />
              )}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;