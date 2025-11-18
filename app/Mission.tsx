

"use client";

import * as React from "react";
import Image from "next/image";

const Mission = () => {
  return (
    <section id="mission" className="relative bg-white min-h-screen flex items-center pt-16 sm:pt-20">
      {/* big faded background text */}
      <p className="absolute inset-x-0 top-8 sm:top-12 text-center text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[290px] font-extrabold text-gray-100 leading-[0.9] select-none pointer-events-none" aria-hidden>
        Mission
      </p>

      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1200px] mx-auto gap-6 lg:gap-0">
          {/* left column */}
          <div className="flex flex-col items-start lg:mr-8 w-full lg:w-auto mb-6 lg:mb-0">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[68px] font-black text-[#f7b50c] uppercase mb-4">Sứ mệnh</p>

            <div className="flex flex-col sm:flex-row items-start">
              <div className="mr-0 sm:mr-4 mb-4 sm:mb-0" aria-hidden>
                {/* quote icon responsive */}
                <Image
                  src="/picture/quote.svg"
                  alt="Quote icon"
                  width={40}
                  height={40}
                  className="w-[60px] h-[60px] sm:w-[90px] sm:h-[90px]"
                />
              </div>

              <div className="w-full">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] font-bold text-[#484848] text-justify max-w-full lg:max-w-[640px]">
                  Mang kiến thức, giáo dục chất lượng trên toàn thế giới về Việt Nam
                  và hòa hợp với văn hóa người Việt
                </p>

                <a
                  href="https://www.nhi.sg/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center mt-4 sm:mt-6 bg-[#f7b50c] hover:bg-amber-500 text-white font-medium px-3 sm:px-5 py-2 sm:py-3 rounded-[40px]"
                >
                  <span className="uppercase text-xs sm:text-sm">xem thêm</span>
                  <svg className="ml-2 sm:ml-3 w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 relative">
              <Image
                src="/picture/nhile.png"
                alt="Nhi Le"
                fill
                className="object-cover rounded-full"
              />
            </div>

            <div className="flex flex-row justify-between items-end w-full max-w-[280px] sm:max-w-[320px]">
              <div className="flex flex-col">
                <p className="text-lg sm:text-xl lg:text-[24px] font-bold text-[#484848]">Nhi Le</p>
                <p className="text-xs sm:text-sm lg:text-[16px] font-semibold text-[#f7b50c]">Doanh nhân</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a href="https://www.linkedin.com/in/nhisg/" target="_blank" rel="noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                  <svg width="12" height="12" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6h-4v-12h4v2a4 4 0 0 1 4-2zM6 9H2v12h4V9zm-2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="currentColor"/></svg>
                </a>

                <a href="https://www.facebook.com/neducation.sg" target="_blank" rel="noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                  <svg width="12" height="12" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07C2 17.09 5.66 21.26 10.44 22V14.89h-2.8v-2.82h2.8V9.83c0-2.77 1.64-4.29 4.15-4.29 1.2 0 2.46.22 2.46.22v2.7h-1.38c-1.36 0-1.79.85-1.79 1.73v2.06h3.05l-.49 2.82h-2.56V22C18.34 21.26 22 17.09 22 12.07z" fill="currentColor"/></svg>
                </a>

                <a href="https://www.tiktok.com/@nedu.sg?fbclid=IwY2xjawOIwlVleHRuA2FlbQIxMABicmlkETFiQ2hiUklGRmxzVXNBYnVIc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHgR-eqTuQEp25Djq8zv4ityYmFBovfAZYoWz6vQ0_-LDXChKpFFwtzRAU3mW_aem_aFo5_CTFMFbsTdaAXituwQ" target="_blank" rel="noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                  <svg width="12" height="12" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.36-4.08-1.1-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>

                <a href="https://www.youtube.com/@neducationsg" target="_blank" rel="noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                  <svg width="12" height="12" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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