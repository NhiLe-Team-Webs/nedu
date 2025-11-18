import React from 'react';

const Organizers: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-center text-amber-400 uppercase mb-8 sm:mb-10 lg:mb-12">
          Đơn vị tổ chức và vận hành
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-md sm:max-w-lg mx-auto mb-8 sm:mb-10">
          {/* Organizer 1 */}
          <div className="flex flex-col justify-center items-center bg-white/20 shadow-md rounded-lg p-3 sm:p-4 backdrop-blur-md">
            <img
              src="/picture/nedu.svg"
              alt="Nedu"
              className="w-4/5 sm:w-3/4 object-contain"
              loading="lazy"
            />
          </div>

          {/* Organizer 2 */}
          <div className="flex flex-col justify-center items-center bg-white/20 shadow-md rounded-lg p-3 sm:p-4 backdrop-blur-md">
            <img
              src="/picture/nlt.png"
              alt="NLT"
              className="w-4/5 sm:w-3/4 object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/MsNhiSG"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-amber-400 rounded-full text-amber-400 font-semibold text-sm sm:text-base"
          >
            <img
              src="/picture/facebook.svg"
              alt="Facebook"
              className="w-5 h-5 sm:w-6 sm:h-6"
              loading="lazy"
            />
            <span className="font-semibold text-sm sm:text-[16px] md:text-[20px]">MsNhiSG</span>
          </a>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/msnhi_podcast"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-amber-400 rounded-full text-amber-400 font-semibold text-sm sm:text-base"
          >
            <img
              src="/picture/instagram_1.svg"
              alt="Instagram"
              className="w-5 h-5 sm:w-6 sm:h-6"
              loading="lazy"
            />
            <span className="font-semibold text-sm sm:text-[16px] md:text-[20px]">msnhi_podcast</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Organizers;