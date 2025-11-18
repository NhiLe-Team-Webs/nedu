"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isActive = (path: string) => pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm flex justify-center">
      <div className="w-full flex justify-between gap-2 sm:gap-4 px-4 sm:px-8 lg:px-12 items-center h-16 sm:h-20 bg-white/95 shadow-lg">
        {/* left column: logo */}
        <div className="flex items-center">
          <Image
            src="/250317_MsNhi_N-Edu_Logo Nedu.png"
            alt="N-Edu Logo"
            width={120}
            height={30}
            className="w-20 sm:w-32 lg:w-48 h-auto object-contain"
          />
        </div>

        {/* center column: nav centered by grid */}
        <nav className="hidden lg:flex justify-between items-center gap-6 xl:gap-10 w-auto font-semibold text-sm xl:text-base">
          <Link
            href="/"
            className={
              isActive("/")
                ? "text-amber-400 font-semibold uppercase tracking-wide"
                : "text-gray-600 hover:text-amber-400 uppercase tracking-wide"
            }
          >
            TRANG CHỦ
          </Link>

          <a href="#about" className="text-gray-600 hover:text-amber-400 uppercase tracking-wide">
            VỀ CHÚNG TÔI
          </a>

          <Link
            href="/program"
            className={
              isActive("/program")
                ? "text-amber-400 font-semibold uppercase tracking-wide"
                : "text-gray-600 hover:text-amber-400 uppercase tracking-wide"
            }
          >
            KHÓA HỌC
          </Link>

          <a href="/thu-thach-30-ngay" className={
              isActive("/thu-thach-30-ngay")
                ? "text-amber-400 font-semibold uppercase tracking-wide"
                : "text-gray-600 hover:text-amber-400 uppercase tracking-wide"
            }>
            THỬ THÁCH 30N
          </a>

          <a href="/contact" className={
              isActive("/contact")
                ? "text-amber-400 font-semibold uppercase tracking-wide"
                : "text-gray-600 hover:text-amber-400 uppercase tracking-wide"
            }>
            LIÊN HỆ
          </a>
        </nav>

        {/* right column: actions aligned to the end */}
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex items-center justify-center gap-2 h-8 w-8 xl:h-10 xl:w-10 text-text-secondary hover:text-primary relative"
            onClick={() => router.push('/cart')}
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-4 w-4 xl:h-5 xl:w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-4 w-4 xl:h-5 xl:w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden py-3 sm:py-4 border-t bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col space-y-3 sm:space-y-4 px-4 sm:px-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm sm:text-base py-2"
            >
              TRANG CHỦ
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm sm:text-base py-2"
            >
              VỀ CHÚNG TÔI
            </a>
            <Link
              href="/program"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm sm:text-base py-2"
            >
              KHÓA HỌC
            </Link>
            <a
              href="/thu-thach-30-ngay"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm sm:text-base py-2"
            >
              THỬ THÁCH 30N
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm sm:text-base py-2"
            >
              LIÊN HỆ
            </a>
            <div className="flex items-center gap-3 pt-2 border-t">
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-primary relative h-10 w-10"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
