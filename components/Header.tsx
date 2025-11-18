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
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
      <div className="w-full flex justify-between gap-2 sm:gap-4 px-4 sm:px-6 items-center h-16 sm:h-20 bg-white/95 shadow-lg">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/picture/nedu.svg"
            alt="N-Edu Logo"
            width={227}
            height={57}
            className="w-24 sm:w-36 h-8 sm:h-10 object-contain"
          />
        </div>
        
        {/* center column: nav centered by grid */}
        <nav className="hidden md:flex justify-center items-center gap-12 flex-1 font-semibold">
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
          <Button className="btn-primary hidden sm:inline-flex px-3 sm:px-4 py-1 text-xs sm:text-sm">
            ĐĂNG KÝ NGAY
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex items-center justify-center gap-2 h-8 w-8 sm:h-10 sm:w-10 hidden sm:inline-flex text-text-secondary hover:text-primary relative"
            onClick={() => router.push('/cart')}
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
          
          {/* Mobile: Cart icon */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:hidden text-text-secondary hover:text-primary relative"
            onClick={() => router.push('/cart')}
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
          
          {/* Mobile: Hamburger menu */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:hidden flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="sm:hidden py-3 px-4 border-t bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-xs py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TRANG CHỦ
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-xs py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              VỀ CHÚNG TÔI
            </a>
            <Link
              href="/program"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-xs py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              KHÓA HỌC
            </Link>
            <Link
              href="/thu-thach-30-ngay"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-xs py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              THỬ THÁCH 30N
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-xs py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              LIÊN HỆ
            </Link>
            <div className="flex items-center gap-3 pt-2 border-t">
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-primary relative h-8 w-8"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Button className="btn-primary text-xs px-3 py-1">
                ĐĂNG KÝ NGAY
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;