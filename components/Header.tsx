"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const { getTotalItems, items } = useCart();
  const totalItems = getTotalItems();
  const [showNotification, setShowNotification] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { t } = useLanguage();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Close cart preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCartOpen && !target.closest('[data-cart-container]') && !target.closest('[data-cart-trigger]')) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] backdrop-blur-sm">
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
            className="inline-flex items-center justify-center gap-2 h-10 w-10 sm:h-10 sm:w-10 text-text-secondary hover:text-primary relative transition-all duration-200 transform hover:scale-110 active:scale-95 overflow-visible"
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-label="Giỏ hàng"
            data-cart-trigger
          >
            <ShoppingCart className="h-5 w-5 sm:h-5 sm:w-5 transition-all duration-200" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 text-text-secondary hover:text-primary transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-screen h-[100dvh] z-[1000] bg-white md:hidden"
          >
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col p-8 space-y-6 mt-12 text-lg font-medium text-gray-800 bg-white">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">
                {t("header.home")}
              </Link>
              <a href="https://nhi.sg" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">
                {t("header.about")}
              </a>
              <Link href="/program" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">
                {t("header.courses")}
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">
                {t("header.contact")}
              </Link>
            </div>

            <div className="absolute bottom-8 left-8">
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Preview Dropdown */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/25 backdrop-blur-md z-[100] h-screen"
              style={{ top: '80px' }}
              onClick={() => setIsCartOpen(false)}
            />
            {/* Cart Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute left-0 w-full bg-white z-[100] border-t border-gray-200 shadow-xl"
              data-cart-container
            >
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1">
                  <div className="col-span-1">
                    {items.length > 0 ? (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-2xl font-semibold">{t("cart.title")}</h3>
                          <Link
                            href="/cart"
                            className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-primary hover:bg-primary-dark !text-white transition-all rounded-full px-4 py-2 text-sm font-semibold"
                            onClick={() => setIsCartOpen(false)}
                          >
                            {t("cart.view_cart")}
                          </Link>
                        </div>
                        <div className="max-h-[50vh] overflow-y-auto pr-4 -mr-4 space-y-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-start gap-6 py-4 border-b">
                              <div className="relative rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={item.heroImage}
                                  alt={item.title}
                                  className="object-cover h-16"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-base leading-tight">{t(item.title)}</p>
                                <p className="text-primary font-bold text-lg mt-1">{item.price.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " " + item.price.currency}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <h2 className="text-3xl font-semibold text-gray-900">{t("cart.empty_title")}</h2>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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