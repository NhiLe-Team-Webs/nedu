

"use client";

import * as React from "react";
import Image from "next/image";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const Mission = () => {
  const { t } = useLanguage();

  return (
    <section id="mission" className="relative bg-white min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
      {/* big faded background text - reduced size on mobile to prevent layout shift */}
      <p className="absolute inset-x-0 top-8 sm:top-12 text-center text-[50px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[290px] font-extrabold text-gray-100 leading-[0.9] select-none pointer-events-none whitespace-nowrap" aria-hidden>
        {t("mission.heading")}
      </p>

      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1200px] mx-auto gap-8 lg:gap-0">
          {/* left column */}
          <div className="flex flex-col items-start lg:mr-8 w-full lg:w-auto mb-6 lg:mb-0">
            <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[68px] font-black text-[#f7b50c] uppercase mb-4">{t("mission.heading")}</p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0" aria-hidden>
                {/* quote icon responsive */}
                <Image
                  src="/picture/quote.svg"
                  alt="Quote icon"
                  width={40}
                  height={40}
                  className="w-[50px] h-[50px] sm:w-[90px] sm:h-[90px]"
                />
              </div>

              <div className="w-full">
                <p className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] font-bold text-[#484848] text-justify max-w-full lg:max-w-[640px] leading-relaxed">
                  {t("mission.quote")}
                </p>

                <a
                  href="https://www.nhi.sg/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center mt-6 sm:mt-6 bg-white text-black font-medium px-6 py-3 rounded-ios-btn border border-black/10 shadow-ios-sm hover:shadow-ios-md hover:scale-105 active:scale-95 transition-all duration-300 min-h-[44px]"
                >
                  <span className="uppercase text-xs sm:text-sm tracking-wide">{t("mission.learn_more")}</span>
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="flex flex-col items-center lg:items-start w-full sm:w-auto">
            <div className="mb-6 w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 relative shadow-ios-float rounded-full">
              <Image
                src="/picture/nhile.png"
                alt="Nhi Le"
                fill
                className="object-cover rounded-full"
              />
            </div>

            <div className="flex flex-row justify-between items-end w-full max-w-[280px] sm:max-w-[320px]">
              <div className="flex flex-col">
                <p className="text-xl sm:text-xl lg:text-[24px] font-bold text-[#484848]">Nhi Le</p>
                <p className="text-sm sm:text-sm lg:text-[16px] font-semibold text-[#f7b50c]">{t("mission.role")}</p>
              </div>

              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/in/nhisg/" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0">
                  <svg width="16" height="16" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6h-4v-12h4v2a4 4 0 0 1 4-2zM6 9H2v12h4V9zm-2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="currentColor" /></svg>
                </a>

                <a href="https://www.facebook.com/nhile.sg" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0">
                  <svg width="16" height="16" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07C2 17.09 5.66 21.26 10.44 22V14.89h-2.8v-2.82h2.8V9.83c0-2.77 1.64-4.29 4.15-4.29 1.2 0 2.46.22 2.46.22v2.7h-1.38c-1.36 0-1.79.85-1.79 1.73v2.06h3.05l-.49 2.82h-2.56V22C18.34 21.26 22 17.09 22 12.07z" fill="currentColor" /></svg>
                </a>

                <a href="https://www.instagram.com/nhile.sg/" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0">
                  <svg width="16" height="16" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-2zm5 6.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm5.5-3.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" fill="currentColor" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;