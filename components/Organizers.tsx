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
            href="https://www.facebook.com/neducation.sg"
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
            <span className="font-semibold text-sm sm:text-[16px] md:text-[20px]">neducation</span>
          </a>

          {/* TikTok Link */}
          <a
            href="https://www.tiktok.com/@nedu.sg?fbclid=IwY2xjawOIwlVleHRuA2FlbQIxMABicmlkETFiQ2hiUklGRmxzVXNBYnVIc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHgR-eqTuQEp25Djq8zv4ityYmFBovfAZYoWz6vQ0_-LDXChKpFFwtzRAU3mW_aem_aFo5_CTFMFbsTdaAXituwQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-amber-400 rounded-full text-amber-400 font-semibold text-sm sm:text-base"
          >
            <img
              src="/tiktok-footer.svg"
              alt="TikTok"
              className="w-5 h-5 sm:w-6 sm:h-6"
              loading="lazy"
            />
            <span className="font-semibold text-sm sm:text-[16px] md:text-[20px]">@nedu.sg</span>
          </a>

          {/* YouTube Link */}
          <a
            href="https://www.youtube.com/@neducationsg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-amber-400 rounded-full text-amber-400 font-semibold text-sm sm:text-base"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="font-semibold text-sm sm:text-[16px] md:text-[20px]">@neducationsg</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Organizers;