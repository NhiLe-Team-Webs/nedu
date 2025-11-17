'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <img src="https://nedu.nhi.sg/images/logo-mobile.svg" alt="N-Edu Logo" className="h-8" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
              TRANG CHỦ
            </Link>
            <a href="https://www.nhi.sg/" className="text-gray-700 hover:text-primary font-medium uppercase text-sm" target="_blank" rel="noopener noreferrer">
              VỀ CHÚNG TÔI
            </a>
            <Link href="/program" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
              KHÓA HỌC
            </Link>
            <Link href="/thu-thach-30-ngay" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
              THỬ THÁCH 30N
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
              LIÊN HỆ
            </Link>
            <Link href="/program" className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium uppercase text-sm transition">
              ĐĂNG KÝ NGAY
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
                TRANG CHỦ
              </Link>
              <a href="https://www.nhi.sg/" className="text-gray-700 hover:text-primary font-medium uppercase text-sm" target="_blank" rel="noopener noreferrer">
                VỀ CHÚNG TÔI
              </a>
              <Link href="/program" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
                KHÓA HỌC
              </Link>
              <Link href="/thu-thach-30-ngay" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
                THỬ THÁCH 30N
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary font-medium uppercase text-sm">
                LIÊN HỆ
              </Link>
              <Link href="/program" className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium uppercase text-sm text-center transition">
                ĐĂNG KÝ NGAY
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
