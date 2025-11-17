"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const Header = () => {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const isActive = (path: string) => pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm flex justify-center">
      <div className="w-full max-w-[1280px] flex justify-between gap-4 px-12 items-center h-20 bg-white/95 shadow-lg">
        {/* center column: nav centered by grid */}
        <nav className="hidden md:flex justify-between items-center gap-12 w-full font-semibold">
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
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex text-gray-600 hover:text-amber-400 relative"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>
          <Button className="hidden md:inline-flex bg-amber-400 hover:bg-amber-500 text-white rounded-full px-6 py-2" size="lg">
            ĐĂNG KÝ NGAY
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
                className="text-gray-600 hover:text-amber-400 relative"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Button className="bg-amber-400 hover:bg-amber-500 text-white rounded-full px-6 py-2 text-center">
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
