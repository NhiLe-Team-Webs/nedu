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
import { getCourseDetailBySlug } from "@/lib/services/courseService";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CourseSlide {
  id: number;
  slug: string;
  href: string;
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
  const isThirtyDayChallenge = slide.slug === "thu-thach-30-ngay";

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isThirtyDayChallenge) {
      router.push(slide.href);
      return;
    }
    const courseData = courses.find(c => c.slug === slide.slug);
    if (courseData) {
      buyNow(courseData);
      router.push('/checkout');
    }
  };

  return (
    <Link href={slide.href} className="relative w-full h-full overflow-hidden block brightness-100 hover:translate-y-0 translate-y-0">
      {/* Background Images */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-contain w-full h-full hidden md:block bg-white hover:scale-100"
      />
      <Image
        src={slide.imageMobile || slide.image}
        alt={slide.title}
        fill
        className="object-contain w-full h-full md:hidden bg-white hover:scale-100"
      />

      {/* Subtle Bottom Gradient for Readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Mobile Layout (Centered & Bottom-Aligned) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-white text-center md:hidden pb-12">
        <div className="space-y-4 w-full max-w-sm">
          <h3 className="text-2xl font-black leading-[1.2] tracking-tight drop-shadow-lg text-white">{slide.type}</h3>
          <p className="text-sm font-medium text-white/90 line-clamp-2 px-4 drop-shadow-md">
            {slide.content}
          </p>
          <Button
            className="rounded-full bg-white text-black hover:bg-[#F7B50C] hover:text-white px-10 py-6 text-base font-black leading-[1.35] transition-all duration-300 shadow-2xl active:scale-95"
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
            className="rounded-full bg-white text-black hover:bg-white/90 px-6 py-2.5 text-sm font-bold leading-[1.35] h-auto shrink-0 shadow-lg"
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
    </Link>
  );
};

const Courses: React.FC = () => {
  const { t } = useLanguage();
  const swiperRef = React.useRef<SwiperType | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [thirtyDayPreview, setThirtyDayPreview] = React.useState<{ desktop?: string; mobile?: string }>({});

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    async function fetchThirtyDayPreview() {
      try {
        const dynamicData = await getCourseDetailBySlug("thu-thach-30-ngay");
        if (dynamicData?.program) {
          setThirtyDayPreview({
            desktop: dynamicData.program.image || undefined,
            mobile: dynamicData.program.banner || dynamicData.program.image || undefined,
          });
        }
      } catch (error) {
        console.error("Error fetching 30-day preview:", error);
      }
    }

    fetchThirtyDayPreview();
  }, []);

  const thirtyDayCourse = React.useMemo(() => courses.find(c => c.slug === "thu-thach-30-ngay"), []);

  const slides: CourseSlide[] = React.useMemo(() => [
    {
      id: 2,
      slug: "la-chinh-minh",
      href: "/program-offline/la-chinh-minh",
      image: "/picture/la_chinh_minh.jpg",
      imageMobile: "/picture/la_chinh_minh.jpg",
      date: "5/3-8/3/2026",
      title: t("courses.slides.lcm.title"),
      label: t("courses.upcoming"),
      content: t("courses.slides.lcm.content"),
      type: "Offline"
    },
    {
      id: 5,
      slug: "cuoc-song-cua-ban",
      href: "/program-online/cuoc-song-cua-ban",
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
      href: "/program-online/thu-thach-30-ngay",
      image: thirtyDayPreview.desktop || thirtyDayCourse?.heroImage || "/picture/thuthach30day_desktop.png",
      imageMobile: thirtyDayPreview.mobile || thirtyDayCourse?.mobileImage || "/picture/thuthach30day_mobile.png",
      date: "28/12/2025 – 28/01/2026",
      title: t("courses.slides.tt30n.title"),
      label: t("courses.online"),
      content: t("courses.slides.tt30n.content"),
      type: "Membership"
    }
  ], [t, thirtyDayCourse, thirtyDayPreview.desktop, thirtyDayPreview.mobile]);

  const coursesHeading = t("courses.heading");
  const secondLineMatch = coursesHeading.match(/,\s*cho người việt/i);
  const coursesHeadingLine1 = secondLineMatch
    ? `${coursesHeading.slice(0, secondLineMatch.index).trim()},`
    : coursesHeading;
  const coursesHeadingLine2 = secondLineMatch ? secondLineMatch[0].replace(/^,\s*/, "") : "";

  if (!isMounted) return null;

  return (
    <section
      id="courses-section"
      className="relative py-16 lg:py-24 bg-white overflow-x-hidden"
    >
      <div className="container px-4 mx-auto">
        {/* Header Section */}
        <div className="text-center mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[68px] font-black leading-[1.15] text-center text-amber-400 uppercase relative z-10 mb-8 sm:mb-10 md:mb-12 pt-[0.08em]">
            <span className="block whitespace-nowrap">{coursesHeadingLine1}</span>
            {coursesHeadingLine2 && <span className="block whitespace-nowrap">{coursesHeadingLine2}</span>}
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
            speed={600}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              stopOnLastSlide: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination]}
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
            {[...slides, ...slides, ...slides].map((slide, index) => (
              <SwiperSlide
                key={`${slide.id}-${index}`}
                className={cn(
                  "overflow-hidden md:aspect-video aspect-[9/16] bg-white",
                  "cursor-pointer hover:scale-100 active:scale-100"
                )}
              >
                <SlideContent slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons - Visible on all devices */}
          <button onClick={() => { swiperRef.current?.slidePrev(); swiperRef.current?.autoplay.start(); }} className="swiper-btn-prev absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full text-[#F7B50C] transition-all duration-300 hover:scale-110 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="currentColor" className="rotate-180 scale-75 md:scale-100">
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
          <button onClick={() => { swiperRef.current?.slideNext(); swiperRef.current?.autoplay.start(); }} className="swiper-btn-next absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full text-[#F7B50C] transition-all duration-300 hover:scale-110 active:scale-95">
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
                .swiper-slide {
                    transform: scale(1) !important;
                }
                .swiper-slide:hover,
                .swiper-slide:active {
                    transform: none !important;
                    filter: none !important;
                    brightness: 1 !important;
                    scale: 1 !important;
                    translate: 0 !important;
                }
                .swiper-slide:hover img,
                .swiper-slide:active img {
                    filter: none !important;
                    brightness: 1 !important;
                }
                a.swiper-slide:hover {
                    filter: none !important;
                    brightness: 1 !important;
                    transform: none !important;
                    translate: 0 !important;
                    translateY: 0 !important;
                }
                .swiper-slide img:hover {
                    filter: none !important;
                    brightness: 1 !important;
                    opacity: 1 !important;
                    transform: scale(1) !important;
                    translate: 0 !important;
                }
                .swiper-slide img {
                    transform: scale(1) !important;
                    translate: 0 !important;
                }
            `}</style>
    </section>
  );
};

export default Courses;
