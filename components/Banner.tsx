"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/lib/LanguageContext";

export default function Banner() {
  const { t } = useLanguage();
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

  return null;
}
