"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { courses } from "@/data/courses";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CourseSlide {
  id: number;
  slug: string;
  image: string;
  imageMobile?: string;
  date: string;
  title: string;
  label: string;
  content: string;
  type: string;
}

const SlideContent = ({ slide }: { slide: CourseSlide }) => {
  const { t } = useLanguage();
  const { buyNow } = useCart();
  const router = useRouter();

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    const courseData = courses.find(c => c.slug === slide.slug);
    if (courseData) {
      buyNow(courseData);
      router.push('/checkout');
    }
  };

  return (
    <div className="relative w-full h-full group/slide overflow-hidden">
      {/* Background Images */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-contain w-full h-full transition-transform duration-700 hidden md:block bg-white"
      />
      <Image
        src={slide.imageMobile || slide.image}
        alt={slide.title}
        fill
        className="object-contain w-full h-full transition-transform duration-700 md:hidden bg-white"
      />

      {/* Subtle Bottom Gradient for Readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Mobile Layout (Centered & Bottom-Aligned) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-white text-center md:hidden pb-12">
        <div className="space-y-4 w-full max-w-sm">
          <h3 className="text-2xl font-black tracking-tight drop-shadow-lg text-white">{slide.type}</h3>
          <p className="text-sm font-medium text-white/90 line-clamp-2 px-4 drop-shadow-md">
            {slide.content}
          </p>
          <Button
            className="rounded-full bg-white text-black hover:bg-[#F7B50C] hover:text-white px-10 py-6 text-base font-black transition-all duration-300 shadow-2xl active:scale-95"
            onClick={handleRegister}
          >
            Tìm hiểu thêm
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="absolute inset-x-0 bottom-0 px-8 py-6 hidden md:flex flex-col justify-end text-white">
        <div className="info-bottom slide-bottom flex items-center gap-4">
          <Button
            className="rounded-full bg-white text-black hover:bg-white/90 px-6 py-2.5 text-sm font-bold h-auto shrink-0 shadow-lg"
            onClick={handleRegister}
          >
            Đăng ký ngay
          </Button>
          <p className="text-lg font-medium truncate drop-shadow-md mb-0 flex items-center h-full translate-y-[2px]">
            <span className="font-bold text-white">{slide.type}</span>
            <span className="mx-2 text-white/50">•</span>
            <span className="text-white/80">{slide.content}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const { t } = useLanguage();
  const swiperRef = React.useRef<SwiperType | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const slides: CourseSlide[] = React.useMemo(() => [
    {
      id: 2,
      slug: "la-chinh-minh",
      image: "/picture/la_chinh_minh.jpg",
      imageMobile: "/picture/la_chinh_minh.jpg",
      date: "5/3-8/3/2026",
      title: t("courses.slides.lcm.title"),
      label: t("courses.upcoming"),
      content: t("courses.slides.lcm.content"),
      type: "Offline"
    },
    {
      id: 1,
      slug: "suc-manh-vo-han",
      image: "/picture/suc_manh_vo_han.jpg",
      imageMobile: "/picture/suc_manh_vo_han.jpg",
      date: "01/04/2026",
      title: t("courses.slides.smvh.title"),
      label: t("courses.intro"),
      content: t("courses.slides.smvh.content"),
      type: "Offline"
    },
    {
      id: 4,
      slug: "thuong-hieu-cua-ban",
      image: "/picture/thuong_hieu_cua_ban.png",
      imageMobile: "/picture/thuong_hieu_cua_ban.png",
      date: "01/11/2025",
      title: t("courses.slides.thcb.title"),
      label: t("courses.online"),
      content: t("courses.slides.thcb.content"),
      type: "Online"
    },
    {
      id: 5,
      slug: "cuoc-song-cua-ban",
      image: "/picture/cuoc_song_cua_ban.png",
      imageMobile: "/picture/cuoc_song_cua_ban.png",
      date: "01/11/2025",
      title: t("courses.slides.cscb.title"),
      label: t("courses.online"),
      content: t("courses.slides.cscb.content"),
      type: "Online"
    },
    {
      id: 8,
      slug: "thu-thach-30-ngay",
      image: "/picture/thuthach30day_desktop.png",
      imageMobile: "/picture/thuthach30day_mobile.png",
      date: "28/12/2025 – 28/01/2026",
      title: t("courses.slides.tt30n.title"),
      label: t("courses.online"),
      content: t("courses.slides.tt30n.content"),
      type: "Membership"
    }
  ], [t]);

  if (!isMounted) return null;

  return (
    <section
      id="courses-section"
      className="relative py-16 lg:py-24 bg-[#F3F4F6] overflow-x-hidden"
    >
      <div className="container px-4 mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F7B50C] uppercase leading-tight">
            {t("courses.heading")}
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="relative group/carousel">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            centeredSlides={true}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-btn-prev',
              nextEl: '.swiper-btn-next',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="!overflow-visible"
            breakpoints={{
              320: {
                slidesPerView: 1.15,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1.1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 1.2,
                spaceBetween: 32,
              }
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide
                key={slide.id}
                className={cn(
                  "overflow-hidden md:aspect-video aspect-[9/16] bg-white",
                  "cursor-pointer transition-all duration-500"
                )}
              >
                <SlideContent slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons - Visible on all devices */}
          <button className="swiper-btn-prev absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full text-[#F7B50C] transition-all duration-300 hover:scale-110 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="currentColor" className="rotate-180 scale-75 md:scale-100">
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
          <button className="swiper-btn-next absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full text-[#F7B50C] transition-all duration-300 hover:scale-110 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="currentColor" className="scale-75 md:scale-100">
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
                .swiper-pagination {
                    bottom: -40px !important;
                }
                .swiper-pagination-bullet {
                    background: #aaa !important;
                    opacity: 1 !important;
                    width: 8px;
                    height: 8px;
                    transition: all 0.3s;
                }
                .swiper-pagination-bullet-active {
                    background: #FDB913 !important;
                    width: 24px;
                    border-radius: 4px;
                }
            `}</style>
    </section>
  );
};

export default Courses;