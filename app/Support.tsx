"use client";

import { ChevronRight, ChevronsRight } from "lucide-react";
import * as React from "react";

const Supports = () => {
  return (
    <section className="flex justify-center py-20 bg-white">
      <div
        className="w-full max-w-xl bg-amber-400 rounded-lg p-10 text-white relative shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:flex-3">
            <p className="text-sm font-semibold">Bạn đang cần tư vấn thêm gì?</p>
            <p className="text-2xl md:text-xl font-bold uppercase mt-2">Hãy để n-edu hỗ trợ cho bạn</p>
          </div>

          <div className="md:flex-1 relative w-full flex justify-center">
            <button
              type="submit"
              className="flex items-center bg-white text-amber-400 font-bold py-2 px-4 rounded-md hover:bg-gray-100 transition"
              aria-label="Request Support"
            >
              Liên hệ <ChevronsRight className="inline-block ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Supports;