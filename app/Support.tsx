"use client";

import * as React from "react";

const Supports = () => {
  return (
    <section className="flex justify-center py-20 bg-white">
      <form
        className="w-full max-w-3xl bg-amber-400 rounded-lg p-10 text-white relative shadow-lg"
        aria-label="Support form"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:flex-1">
            <p className="text-sm font-semibold">Bạn đang cần tư vấn thêm gì?</p>
            <p className="text-2xl md:text-xl font-bold uppercase mt-2">Hãy để n-edu hỗ trợ cho bạn</p>
          </div>

          <div className="md:flex-1 relative">
            <input
              type="email"
              name="email"
              placeholder="Vui lòng để lại email, chúng tôi sẽ liên lạc sớm nhất"
              className="w-full bg-transparent border-b border-white/40 placeholder-white/80 text-white py-2 pr-12"
              required
            />

            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent p-2 rounded-md text-white"
              aria-label="Send"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Supports;