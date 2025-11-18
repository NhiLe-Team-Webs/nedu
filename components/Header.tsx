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
      <div className="w-full flex justify-between gap-4 px-6 items-center h-20 bg-white/95 shadow-lg">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/picture/nedu.svg"
            alt="N-Edu Logo"
            width={227}
            height={57}
            className="w-36 h-10 object-contain"
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
        <div className="flex items-center justify-end gap-4">
          <Button className="btn-primary hidden md:inline-flex px-4 py-1 text-sm">
            ĐĂNG KÝ NGAY
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex items-center justify-center gap-2 h-10 w-10 hidden md:inline-flex text-text-secondary hover:text-primary relative"
            onClick={() => router.push('/cart')}
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden py-4 border-t">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm"
            >
              TRANG CHỦ
            </Link>
            <a
              href="#about"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm"
            >
              VỀ CHÚNG TÔI
            </a>
            <Link
              href="/khoa-hoc"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm"
            >
              KHÓA HỌC
            </Link>
            <a
              href="#challenge"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm"
            >
              THỬ THÁCH 30N
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-amber-400 font-medium uppercase text-sm"
            >
              LIÊN HỆ
            </a>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-text-secondary hover:text-primary relative"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Button className="btn-primary">
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