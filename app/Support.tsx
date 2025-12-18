"use client";

import * as React from "react";

const Supports = () => {
  return (
    <section className="flex justify-center py-20 bg-white">
      <form
        className="w-full max-w-3xl bg-amber-400 rounded-ios-xl p-6 sm:p-10 text-white relative shadow-ios-lg transition-all duration-300 hover:shadow-ios-xl transform hover:scale-[1.01]"
        aria-label="Support form"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:flex-5">
            <p className="text-sm font-semibold text-white/90 transition-all duration-200">Bạn đang cần tư vấn thêm gì?</p>
            <p className="text-2xl md:text-xl font-bold uppercase mt-1 text-white transition-all duration-200 tracking-tight">Hãy để n-edu hỗ trợ cho bạn</p>
          </div>

          <div className="md:flex-1 relative w-full">
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn..."
              className="w-full bg-white/10 border border-white/30 rounded-ios-md text-white px-4 py-3 h-[44px] placeholder-white/70 transition-all duration-200 focus:bg-white/20 focus:border-white focus:outline-none ios-haptic-active"
              required
            />

            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-[36px] w-[36px] flex items-center justify-center bg-white text-amber-500 rounded-ios-sm shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-90 shrink-0"
              aria-label="Send"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Supports;