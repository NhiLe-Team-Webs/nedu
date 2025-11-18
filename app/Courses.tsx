"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";

const slides = [
  {
    id: 2,
    slug: "la-chinh-minh",
    image: "/picture/la_chinh_minh.jpg",
    date: "18/03/2026",
    title: "Là Chính Mình 03",
    label: "Khóa học sắp diễn ra",
    content: "Người Việt, làm hàng Việt, cho người Việt.",
    type: "offline"
  },
  {
    id: 1,
    slug: "suc-manh-vo-han",
    image: "/picture/suc_manh_vo_han.jpg",
    date: "01/04/2026",
    title: "Sức Mạnh Vô Hạn",
    label: "Giới thiệu",
    content: "Khám phá bản thân và phát triển cá nhân.",
    type: "offline"
  },
  {
    id: 4,
    slug: "thuong-hieu-cua-ban",
    image: "/picture/thuong_hieu_cua_ban.png",
    date: "01/11/2025",
    title: "Thương Hiệu Của Bạn",
    label: "Các khóa học Online",
    content: "Bắt đầu sự nghiệp với AI từ con số 0.",
    type: "online"
  },
  {
    id: 5,
    slug: "cuoc-song-cua-ban",
    image: "/picture/cuoc_song_cua_ban.png",
    date: "01/11/2025",
    title: "Cuộc Sống Của Bạn",
    label: "Các khóa học Online",
    content: "Xây dựng thương hiệu cá nhân và doanh nghiệp.",
    type: "online"
  },
  {
    id: 6,
    slug: "ai-for-business-communication",
    image: "/picture/ai_for_business.png",
    date: "30/07/2025",
    title: "AI For Business Communication",
    label: "Các khóa học Online",
    content: "Quản lý cảm xúc và cân bằng cuộc sống.",
    type: "online"
  },
  {
    id: 7,
    slug: "ai-in-marketing",
    image: "/picture/ai_in_mkt.png",
    date: "05/08/2025",
    title: "AI In Marketing",
    label: "Các khóa học Online",
    content: "Ứng dụng AI vào vận hành và kinh doanh.",
    type: "online"
  }
];

const Courses: React.FC = () => {
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

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStart = e.changedTouches[0].screenX;
    return touchStart;
  };

  const handleTouchEnd = (e: React.TouchEvent, touchStart: number) => {
    const touchEnd = e.changedTouches[0].screenX;
    if (touchEnd < touchStart - 50) {
      navigate(1); // Swipe Left - Next
    }
    if (touchEnd > touchStart + 50) {
      navigate(-1); // Swipe Right - Previous
    }
  };

  const [touchStart, setTouchStart] = React.useState(0);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen bg-gray-100 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="relative flex flex-col justify-center items-center h-[90%] w-full max-w-7xl px-3 sm:px-4">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#f7b50c] uppercase mb-8 sm:mb-12 px-2">
          Người Việt, làm hàng Việt, cho người Việt
        </h2>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-6xl flex items-center justify-center px-2 sm:px-0"
          style={{ height: isClient ? trackHeight : 380 }}
          onTouchStart={(e) => setTouchStart(handleTouchStart(e))}
          onTouchEnd={(e) => handleTouchEnd(e, touchStart)}
        >
          {slides.map((slide, index) => {
            const isCenter = index === currentIndex;
            const positionClass = getPositionClass(index);
            
            return (
              <div
                key={slide.id}
                className={`carousel-item ${positionClass} rounded-xl shadow-xl cursor-pointer transition-all duration-500 ease-in-out overflow-hidden`}
                onClick={() => handleItemClick(index)}
                style={{
                  width: isClient ? `${cardWidth}px` : '300px',
                  height: isClient ? `${cardHeight}px` : '350px',
                  position: 'absolute',
                  willChange: 'transform, opacity, z-index',
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
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
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
                <div className="relative h-3/5 overflow-hidden rounded-t-xl">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
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
                    <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1.5 sm:px-3 sm:py-2 rounded-full">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">{slide.date}</span>
                    </div>
                    <Link href={`/program-${slide.type}/${slide.slug}`}>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 sm:p-3 rounded-full transition flex items-center justify-center shadow-lg hover:scale-110 transform"
                        style={{
                          minWidth: '32px sm:40px',
                          minHeight: '32px sm:40px'
                        }}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Indicator */}
        <div className="flex mt-6 sm:mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gray-800 scale-125'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 sm:p-4 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition duration-300 shadow-md"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="p-3 sm:p-4 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition duration-300 shadow-md"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

      </div>

    </section>
  );
};

export default Courses;
