"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 23,
    minutes: 52,
    seconds: 37,
  });

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClosedByUser, setIsClosedByUser] = useState(false);

  // Removed sessionStorage persistence to avoid confusion during testing
  // useEffect(() => {
  //   const stored = sessionStorage.getItem('banner_closed');
  //   if (stored === 'true') {
  //     setIsClosedByUser(true);
  //     setIsVisible(false);
  //   }
  // }, []);

  useEffect(() => {
    // Calculate time left until Jan 8, 2026
    const calculateTimeLeft = () => {
      const endDate = new Date("2026-01-08T23:59:59");
      const now = new Date();
      /* ... calculation unchanged ... */
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isClosedByUser) return; // Don't run scroll logic if closed by user

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if near bottom of page (within 500px of footer)
      const distanceFromBottom = documentHeight - (currentScrollY + windowHeight);
      const isNearFooter = distanceFromBottom < 500;

      // Hide if near footer
      if (isNearFooter) {
        setIsVisible(false);
      }
      // Hide when scrolling up, show when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isClosedByUser]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosedByUser(true);
    // sessionStorage.setItem('banner_closed', 'true'); // Temporarily disabled persistence
  };

  // Condition to not render the banner
  if (pathname === '/checkout') {
    return null;
  }

  // Note: We don't return null for isClosedByUser anymore to allow smooth exit animation 
  // and prevent hydration mismatches if possible, though 'hidden' class handles visibility.

  return (
    <div className={`fixed bottom-[84px] md:bottom-0 left-0 right-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out ${isVisible && !isClosedByUser ? "translate-y-0 opacity-100" : "translate-y-[200%] opacity-0 pointer-events-none"
      }`}>

      {/* Marquee Banner */}
      <div className="bg-[#FFA500] text-[#1F1F1F] text-xs font-bold py-1 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>⚡️ EARLY BIRD GIẢM 10.000.000Đ - CHỈ CÒN 20 SUẤT</span>
          <span>⚡️ ƯU ĐÃI TỪ 08/12/2025 ĐẾN 08/01/2026</span>
          <span>⚡️ ĐĂNG KÝ NGAY ĐỂ GIỮ CHỖ</span>
          <span>⚡️ EARLY BIRD GIẢM 10.000.000Đ - CHỈ CÒN 20 SUẤT</span>
          <span>⚡️ ƯU ĐÃI KẾT THÚC SAU {timeLeft.days} NGÀY</span>
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-[#4A4A4A]/90 backdrop-blur-md text-white px-3 py-3 md:px-2 md:py-2 ios-safe-padding-bottom">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-center gap-3 md:gap-8 relative">
          {/* Title with Icon */}
          <div className="flex flex-col md:flex-row items-center shrink-0 md:gap-4">
            <div className="flex items-center gap-2 mb-1 md:mb-0">
              <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-[#FFA500] flex items-center justify-center">
                <CircleAlert className="w-4 h-4 md:w-4 md:h-4 text-white" />
              </div>
              <div className="font-bold text-lg md:text-lg text-white">
                Ưu đãi sắp hết hạn:
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-300">
              08/12/2025 - 08/01/2026
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex gap-2 md:gap-3 justify-center">
            <div className="flex flex-col items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-ios-xl bg-white text-gray-900 shadow-ios-card">
              <span className="font-bold text-xl md:text-lg leading-none animate-digit-tick inline-block">
                {timeLeft.days}
              </span>
              <span className="text-[9px] md:text-[8px] uppercase mt-0.5 font-medium text-gray-500">
                Ngày
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-ios-xl bg-white text-gray-900 shadow-ios-card">
              <span className="font-bold text-xl md:text-lg leading-none animate-digit-tick inline-block">
                {timeLeft.hours}
              </span>
              <span className="text-[9px] md:text-[8px] uppercase mt-0.5 font-medium text-gray-500">
                Giờ
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-ios-xl bg-white text-gray-900 shadow-ios-card">
              <span className="font-bold text-xl md:text-lg leading-none animate-digit-tick inline-block">
                {timeLeft.minutes}
              </span>
              <span className="text-[9px] md:text-[8px] uppercase mt-0.5 font-medium text-gray-500">
                Phút
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-ios-xl bg-white text-gray-900 shadow-ios-card">
              <span className="font-bold text-xl md:text-lg leading-none animate-digit-tick inline-block">
                {timeLeft.seconds}
              </span>
              <span className="text-[9px] md:text-[8px] uppercase mt-0.5 font-medium text-gray-500">
                Giây
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
