"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import TopBanner from "./TopBanner";
import NotificationModal from "./NotificationModal";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isActive = (path: string) => pathname === path;
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [showNotification, setShowNotification] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
      <div className="w-full flex justify-between gap-2 sm:gap-4 px-3 sm:px-6 items-center h-14 sm:h-16 md:h-20 bg-white/95 shadow-lg transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center transform transition-all duration-200 hover:scale-105 active:scale-95">
            <Image
              src="/picture/nedu.svg"
              alt="N-Edu Logo"
              width={227}
              height={57}
              className="w-20 sm:w-28 md:w-36 h-6 sm:h-8 md:h-10 object-contain cursor-pointer transition-all duration-200 hover:drop-shadow-lg"
            />
          </Link>
        </div>

        {/* center column: nav centered by grid */}
        <nav className="hidden md:flex justify-center items-center gap-6 lg:gap-12 flex-1 font-semibold">
          <Link
            href="/"
            className={`relative transition-all duration-200 transform hover:scale-105 active:scale-95 ${isActive("/")
              ? "text-amber-400 font-semibold uppercase tracking-wide text-sm lg:text-base"
              : "text-gray-600 hover:text-amber-400 uppercase tracking-wide text-sm lg:text-base"
              }`}
          >
            {t("header.home")}
            {isActive("/") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-100 transition-transform duration-200"></span>
            )}
          </Link>

          <a
            href="https://nhi.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-amber-400 uppercase tracking-wide text-sm lg:text-base transition-all duration-200 transform hover:scale-105 active:scale-95 relative"
          >
            {t("header.about")}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
          </a>

          <Link
            href="/program"
            className={`relative transition-all duration-200 transform hover:scale-105 active:scale-95 ${isActive("/program")
              ? "text-amber-400 font-semibold uppercase tracking-wide text-sm lg:text-base"
              : "text-gray-600 hover:text-amber-400 uppercase tracking-wide text-sm lg:text-base"
              }`}
          >
            {t("header.courses")}
            {isActive("/program") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-100 transition-transform duration-200"></span>
            )}
          </Link>

          <a
            href="/thu-thach-30-ngay"
            className={`relative transition-all duration-200 transform hover:scale-105 active:scale-95 ${isActive("/thu-thach-30-ngay")
              ? "text-amber-400 font-semibold uppercase tracking-wide text-sm lg:text-base"
              : "text-gray-600 hover:text-amber-400 uppercase tracking-wide text-sm lg:text-base"
              }`}
          >
            {t("header.challenge30")}
            {isActive("/thu-thach-30-ngay") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-100 transition-transform duration-200"></span>
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
          </a>

          <a
            href="/contact"
            className={`relative transition-all duration-200 transform hover:scale-105 active:scale-95 ${isActive("/contact")
              ? "text-amber-400 font-semibold uppercase tracking-wide text-sm lg:text-base"
              : "text-gray-600 hover:text-amber-400 uppercase tracking-wide text-sm lg:text-base"
              }`}
          >
            {t("header.contact")}
            {isActive("/contact") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-100 transition-transform duration-200"></span>
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
          </a>
        </nav>

        {/* right column: actions aligned to the end */}
        <div className="flex items-center justify-end gap-1 sm:gap-4">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* Notification Bell - Mobile Only */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 text-text-secondary hover:text-primary relative transition-all duration-200 transform hover:scale-110 active:scale-95 overflow-visible"
            onClick={() => setShowNotification(true)}
            aria-label="Thông báo"
          >
            <Bell className="h-5 w-5 transition-all duration-200" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#F8B516] rounded-full animate-pulse"></span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex items-center justify-center gap-2 h-10 w-10 sm:h-10 sm:w-10 text-text-secondary hover:text-primary relative transition-all duration-200 transform hover:scale-110 active:scale-95 overflow-visible"
            onClick={() => router.push('/cart')}
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-5 w-5 sm:h-5 sm:w-5 transition-all duration-200" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
      <TopBanner />

      {/* Notification Modal - Mobile Only */}
      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </header>
  );
};

export default Header;