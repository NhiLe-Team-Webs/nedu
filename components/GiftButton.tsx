import React from 'react';
import Image from 'next/image';

interface GiftButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export default function GiftButton({ onClick, isVisible }: GiftButtonProps) {
  if (!isVisible) return null;

  return (
    <div id="gift-btn-wrapper" className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-[90] transition-transform duration-300 ease-in-out group">
      <button 
        id="gift-btn" 
        onClick={onClick}
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-[0_8px_25px_rgba(245,183,22,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border border-yellow-100 animate-float z-10 p-0"
      >
        <div className="w-full h-full p-0 group-hover:rotate-12 transition-transform duration-300 rounded-full overflow-hidden">
          <Image 
            src="/gift-box-logo-yellow.png" 
            alt="Gift Logo" 
            width={64} 
            height={64} 
            className="w-[120%] h-[120%] -m-[10%] max-w-none object-cover rounded-full" 
            unoptimized
          />
        </div>
        
        <div className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6">
          <span id="gift-badge" className="relative inline-flex bg-[#ef4444] text-white text-[11px] sm:text-[13px] font-bold w-full h-full rounded-full items-center justify-center ring-[3px] sm:ring-4 ring-white shadow-sm">
            1
          </span>
        </div>
      </button>
    </div>
  );
}
