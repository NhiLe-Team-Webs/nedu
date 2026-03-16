"use client";

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Youtube, Send } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#4F4F4F] text-white mt-10 pb-32 sm:pb-12 ios-safe-padding-bottom overflow-hidden relative z-0">
      <div className="container mx-auto px-6 lg:px-16 pt-12 pb-8">
        {/* Upper Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-12">
          {/* Mobile: Nav & Socials on top, Desktop: on right */}
          <div className="flex flex-col items-start gap-6 w-full lg:w-auto order-1 lg:order-2 lg:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-3 font-medium text-sm sm:text-base text-gray-300">
              <Link href="/" className="hover:text-primary transition-colors duration-200">{t("footer.home")}</Link>
              <a href="https://www.nhi.sg/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors duration-200">{t("footer.about")}</a>
              <Link href="/program/" className="hover:text-primary transition-colors duration-200">{t("footer.courses")}</Link>
              <Link href="/contact/" className="hover:text-primary transition-colors duration-200">{t("footer.contact")}</Link>
            </nav>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/neducation.sg" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all duration-300 ios-haptic-active">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@neducationsg" target="_blank" rel="noreferrer" aria-label="Youtube" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all duration-300 ios-haptic-active">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@nedu.sg" target="_blank" rel="noreferrer" aria-label="TikTok" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all duration-300 ios-haptic-active">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.36-4.08-1.1-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a href="https://t.me/neducationvn" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition-all duration-300 ios-haptic-active">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile: Logo on bottom right, Desktop: Logo on top left */}
          <div className="space-y-4 w-full lg:w-auto order-2 lg:order-1">
            <div className="flex justify-start">
              <div className="relative w-40 h-12">
                <Image
                  src="/nedu-white.svg"
                  alt="N Education"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm sm:text-base text-white mb-2">{t("footer.company_name")}</p>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>{t("footer.tax_code")}: 0317268736</li>
                <li className="break-words">{t("footer.address")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p className="order-last lg:order-first">© 2024 N-EDU. {t("footer.rights_reserved")}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/guide-payment" className="hover:text-primary transition-colors">{t("footer.payment_guide")}</Link>
            <Link href="/policy" className="hover:text-primary transition-colors">{t("footer.privacy_policy")}</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">{t("footer.terms_of_use")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
