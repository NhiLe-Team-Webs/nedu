"use client";

import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Courses from "./Courses";
import Mission from "./Mission";
import Supports from "./Support";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import Connection from "./Connection";
import Privilege from "./Privilege";

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const texts = ["LÀ CHÍNH MÌNH", "THẤU HIỂU BẢN THÂN", "QUẢN TRỊ CẢM XÚC"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTransitioning(false);
      }, 500); // Wait for fade out before changing text
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Google Drive Video */}
      <section className="bg-white pt-2 md:pt-0 pb-8 md:pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="w-full">
            {/* Mobile: Taller aspect ratio + iOS styling */}
            <div className="relative pb-[75%] md:pb-[56.25%] h-0 overflow-hidden rounded-[24px] md:rounded-lg shadow-ios-md md:shadow-none transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-full">
                <video
                  src="/videos/IMG_6784.MP4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  playsInline
                  controls
                  muted
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Hero Text Section */}
      <section className="bg-white py-8 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="transition-all duration-1000 ease-out transform opacity-100 translate-y-0" style={{ transitionDelay: '100ms' }}>
            <div className="text-center">
              <p className="text-lg md:text-3xl font-medium text-gray-500 mb-2 md:mb-4 italic">
                "Hành trình vạn dặm bắt đầu từ một bước chân được...
              </p>
              <div className="my-4 md:my-6 min-h-[4rem] md:min-h-[7rem] lg:min-h-[9rem] flex items-center justify-center relative">
                <h1
                  className={`text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold text-[#FFA500] uppercase tracking-wide leading-tight transition-all duration-500 ease-in-out ${isTransitioning
                    ? "opacity-0 translate-y-8 md:translate-y-12"
                    : "opacity-100 translate-y-0"
                    }`}
                >
                  {texts[currentTextIndex]}
                </h1>
              </div>
              <p className="text-xl md:text-4xl font-bold text-[#4A4A4A] mt-2 md:mt-4">
                ...cùng N-Education"
              </p>
            </div>
          </div>
        </div>
      </section>

      <Courses />
      <Mission />
      <Supports />
      <Testimonials />
      <Privilege />
      <Partners />
      <Connection />
    </div>
  );
}
