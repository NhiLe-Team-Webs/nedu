import React, { useState, useEffect } from 'react';
import { X, Sparkles, Gift, ArrowRight } from 'lucide-react';

interface OfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function OfferPopup({ isOpen, onClose, onAccept }: OfferPopupProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="welcome-modal-wrapper"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Main Modal Container */}
      <div
        className="bg-white w-[88%] sm:w-full max-w-[900px] max-h-[85vh] sm:max-h-[90vh] rounded-[24px] shadow-2xl relative flex flex-col md:flex-row overflow-hidden transform transition-transform duration-300 mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Nút Đóng */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-black z-20 transition-colors p-2"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {/* Nửa Trái: Phần Ảnh Cover */}
        <div className="w-full md:w-[50%] relative shrink-0 bg-[#fffbf0] flex flex-col justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sale/deal0426.png"
            alt="Hình ảnh ưu đãi"
            className="w-full h-auto block relative z-10"
          />
        </div>

        {/* Nửa Phải: Nội dung Text và Nút */}
        <div className="w-full md:w-[50%] p-4 sm:p-6 flex flex-col justify-center text-center h-full relative z-10 bg-white gap-4 sm:gap-6">
          {/* Thanh viền màu vàng bên cạnh phải */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 w-2 h-1/3 bg-[#f5b716] rounded-l-md z-20"></div>

          {/* Icon Hộp Quà */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto text-[#ef4444] shadow-sm p-0 overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gift-box-logo-yellow.png" alt="Gift Logo" className="w-[120%] h-[120%] max-w-none object-cover rounded-full" />
          </div>

          <div className="flex flex-col gap-2">
            {/* Tiêu đề */}
            <h2 className="text-[20px] sm:text-[28px] font-black text-[#1e293b] leading-tight uppercase tracking-tight m-0">
              TẶNG CÔNG THỨC<br />
              <span className="text-[#f5b716]">KIẾM TIỀN</span>
            </h2>

            {/* Mô tả */}
            <p className="text-gray-500 text-[14px] sm:text-[15px] leading-relaxed m-0">
              Đặc quyền dành riêng khi đăng kí<br />khoá học <strong className="text-[#f5b716] font-bold">Là Chính Mình 05</strong>
            </p>
          </div>

          <div className="flex flex-col items-center shrink-0">
            {/* Nút Nhận Ưu Đãi */}
            <button
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="bg-[#ef4444] hover:bg-red-600 text-white font-bold py-3 px-6 sm:py-3.5 rounded-xl w-full text-[14px] sm:text-[15px] transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              NHẬN ƯU ĐÃI NGAY <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
