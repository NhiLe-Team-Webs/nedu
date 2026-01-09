"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";



const Courses: React.FC = () => {
  const { t } = useLanguage();

  const slides = React.useMemo(() => [
    {
      id: 2,
      slug: "la-chinh-minh",
      image: "/picture/la_chinh_minh.jpg",
      date: "5/3-8/3/2025",
      title: t("courses.slides.lcm.title"),
      label: t("courses.upcoming"),
      content: t("courses.slides.lcm.content"),
      type: "offline"
    },
    {
      id: 1,
      slug: "suc-manh-vo-han",
      image: "/picture/suc_manh_vo_han.jpg",
      date: "01/04/2026",
      title: t("courses.slides.smvh.title"),
      label: t("courses.intro"),
      content: t("courses.slides.smvh.content"),
      type: "offline"
    },
    {
      id: 4,
      slug: "thuong-hieu-cua-ban",
      image: "/picture/thuong_hieu_cua_ban.png",
      date: "01/11/2025",
      title: t("courses.slides.thcb.title"),
      label: t("courses.online"),
      content: t("courses.slides.thcb.content"),
      type: "online"
    },
    {
      id: 5,
      slug: "cuoc-song-cua-ban",
      image: "/picture/cuoc_song_cua_ban.png",
      date: "01/11/2025",
      title: t("courses.slides.cscb.title"),
      label: t("courses.online"),
      content: t("courses.slides.cscb.content"),
      type: "online"
    },
    {
      id: 8,
      slug: "thu-thach-30-ngay",
      image: "/picture/thuthach30day_desktop.png",
      date: "28/12/2025 – 28/01/2026",
      title: t("courses.slides.tt30n.title"),
      label: t("courses.online"),
      content: t("courses.slides.tt30n.content"),
      type: "online"
    }
  ], [t]);
  const [currentIndex, setCurrentIndex] = React.useState(1); // Start with "Sức Mạnh Vô Hạn" in center
  const totalCourses = slides.length;
  const [viewportWidth, setViewportWidth] = React.useState(0); // Start with 0 to avoid SSR/client mismatch
  const [isClient, setIsClient] = React.useState(false); // Track if we're on client

  React.useEffect(() => {
    // Set client flag and initial viewport width
    setIsClient(true);
    if (typeof window !== "undefined") {
      setViewportWidth(window.innerWidth);
    }

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isClient) return; // Only run on client

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCourses);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isClient, totalCourses]);

  const isMobile = isClient && viewportWidth < 640;
  const isTablet = isClient && viewportWidth >= 640 && viewportWidth < 1024;
  const cardWidth = React.useMemo(() => {
    if (!isClient) return 300; // Default width for SSR
    if (isMobile) {
      return Math.max(240, Math.min(viewportWidth - 40, 300));
    }
    if (isTablet) {
      return 320;
    }
    return 400;
  }, [viewportWidth, isMobile, isTablet, isClient]);

  const cardHeight = React.useMemo(() => {
    if (!isClient) return 350; // Default height for SSR
    if (isMobile) return 350;
    if (isTablet) return 400;
    return 450;
  }, [isMobile, isTablet, isClient]);

  const trackHeight = React.useMemo(() => {
    if (!isClient) return 380; // Default height for SSR
    if (isMobile) return 380;
    if (isTablet) return 450;
    return 550;
  }, [isMobile, isTablet, isClient]);

  const getPositionClass = (index: number) => {
    let relativeIndex = index - currentIndex;

    // Adjust for circular carousel
    if (relativeIndex > 3) {
      relativeIndex -= totalCourses;
    } else if (relativeIndex < -3) {
      relativeIndex += totalCourses;
    }

    // Map to position classes
    const positionMap: { [key: number]: string } = {
      '-3': 'pos-0', // HiddenLeft
      '-2': 'pos-1', // Left2
      '-1': 'pos-2', // Left1
      '0': 'pos-3',  // Center
      '1': 'pos-4',  // Right1
      '2': 'pos-5',  // Right2
      '3': 'pos-6'   // HiddenRight
    };

    return positionMap[relativeIndex] || 'pos-0';
  };

  const handleItemClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const navigate = (direction: number) => {
    setCurrentIndex((prev) => (prev + direction + totalCourses) % totalCourses);
  };

  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    setTouchStart(touch.clientX);
    setTouchEnd(touch.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.changedTouches[0];
    setTouchEnd(touch.clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        navigate(1); // Swipe Left - Next
      } else {
        navigate(-1); // Swipe Right - Previous
      }
    }

    setIsDragging(false);
  };

  // Mouse drag support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        navigate(1); // Drag Left - Next
      } else {
        navigate(-1); // Drag Right - Previous
      }
    }

    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen bg-gray-100 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="relative flex flex-col justify-center items-center h-[90%] w-full max-w-7xl px-3 sm:px-4">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#f7b50c] uppercase mb-8 sm:mb-12 px-2">
          {t("courses.heading")}
        </h2>

        {/* Carousel Container */}
        <div
          className={`relative w-full max-w-6xl flex items-center justify-center px-2 sm:px-0 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ height: isClient ? trackHeight : 380 }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {slides.map((slide, index) => {
            const isCenter = index === currentIndex;
            const positionClass = getPositionClass(index);

            return (
              <div
                key={slide.id}
                className={`carousel-item ${positionClass} rounded-ios-lg shadow-ios-card cursor-pointer transition-all duration-500 ease-in-out overflow-hidden bg-white hover:shadow-ios-float`}
                onClick={() => handleItemClick(index)}
                style={{
                  width: isClient ? `${cardWidth}px` : '300px',
                  height: isClient ? `${cardHeight}px` : '350px',
                  position: 'absolute',
                  willChange: 'transform, opacity, z-index, box-shadow',
                  ...(positionClass === 'pos-0' && {
                    transform: isClient ? `translateX(-${cardWidth * 1.7}px) scale(0.5)` : 'translateX(-510px) scale(0.5)',
                    opacity: 0,
                    zIndex: 10,
                    pointerEvents: 'none'
                  }),
                  ...(positionClass === 'pos-1' && {
                    transform: isClient ? `translateX(-${cardWidth * 1.1}px) scale(0.7)` : 'translateX(-330px) scale(0.7)',
                    opacity: 0.6,
                    zIndex: 20,
                    filter: 'brightness(0.8)'
                  }),
                  ...(positionClass === 'pos-2' && {
                    transform: isClient ? `translateX(-${cardWidth * 0.55}px) scale(0.9)` : 'translateX(-165px) scale(0.9)',
                    opacity: 0.9,
                    zIndex: 30,
                    filter: 'brightness(0.95)'
                  }),
                  ...(positionClass === 'pos-3' && {
                    transform: isClient ? 'translateX(0) scale(1.05)' : 'translateX(0px) scale(1.05)',
                    opacity: 1,
                    zIndex: 40,
                    backgroundColor: '#10B981',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    border: '2px solid rgba(16, 185, 129, 0.2)'
                  }),
                  ...(positionClass === 'pos-4' && {
                    transform: isClient ? `translateX(${cardWidth * 0.55}px) scale(0.9)` : 'translateX(165px) scale(0.9)',
                    opacity: 0.9,
                    zIndex: 30,
                    filter: 'brightness(0.95)'
                  }),
                  ...(positionClass === 'pos-5' && {
                    transform: isClient ? `translateX(${cardWidth * 1.1}px) scale(0.7)` : 'translateX(330px) scale(0.7)',
                    opacity: 0.6,
                    zIndex: 20,
                    filter: 'brightness(0.8)'
                  }),
                  ...(positionClass === 'pos-6' && {
                    transform: isClient ? `translateX(${cardWidth * 1.7}px) scale(0.5)` : 'translateX(510px) scale(0.5)',
                    opacity: 0,
                    zIndex: 10,
                    pointerEvents: 'none'
                  })
                }}
              >
                {/* Top Part - Full Size Image */}
                <div className="relative h-3/5 overflow-hidden rounded-t-ios-lg">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover transition-all duration-300 hover:scale-110"
                  />
                </div>

                {/* Bottom Part - Text and Cart */}
                <div className="flex flex-col justify-between h-2/5 p-3 sm:p-4 pb-4 sm:pb-6 bg-white">

                  {isCenter ? (
                    <div className="text-center">
                      <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 line-clamp-2">{slide.title.toUpperCase()}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2 sm:line-clamp-3">{slide.content}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-xs text-gray-600 line-clamp-2">{slide.content}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-end relative z-50 mt-2">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1.5 sm:px-3 sm:py-2 rounded-full transition-all duration-200 hover:bg-white hover:shadow-md">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-600 flex-shrink-0 transition-all duration-200" />
                      <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">{slide.date}</span>
                    </div>
                    <Link href={`/program-${slide.type}/${slide.slug}`}>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 sm:p-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transform"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-all duration-200" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



        {/* Navigation Buttons */}
        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 sm:p-4 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transform"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180 transition-all duration-200" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="p-3 sm:p-4 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transform"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200" />
          </button>
        </div>

      </div>

    </section>
  );
};

export default Courses;
