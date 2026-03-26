"use client";

import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Courses from "./Courses";
import Mission from "./Mission";
// import Supports from "./Support";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import Connection from "./Connection";
import Privilege from "./Privilege";

import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  const texts = [
    t("home.hero_text_1"),
    t("home.hero_text_2"),
    t("home.hero_text_3")
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTransitioning(false);
      }, 500); // Wait for fade out before changing text
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Google Drive Video */}
      <section className="bg-white pt-2 md:pt-0 pb-8 md:pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="w-full">
            {/* Mobile: Taller aspect ratio + iOS styling */}
            <div className="relative pb-[75%] md:pb-[56.25%] h-0 overflow-hidden rounded-[24px] md:rounded-lg shadow-ios-md md:shadow-none transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-full">
                <iframe
                  src="https://www.youtube.com/embed/7QJKkxXCpGY?autoplay=1&mute=1&loop=1&playlist=7QJKkxXCpGY&controls=1&playsinline=1&rel=0"
                  title="N-EDU introduction video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
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
                {t("home.hero_subtitle_start")}
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
                {t("home.hero_subtitle_end")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Courses />
      <Mission />

      <Testimonials />
      <Privilege />
      <Partners />
      <Connection />
    </div>
  );
}
