import React from 'react';

const Organizers: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-[32px] font-bold text-center text-amber-400 uppercase mb-12">
          Đơn vị tổ chức và vận hành
        </h2>
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
          {/* Organizer 1 */}
          <div className="flex flex-col justify-center items-center bg-white/20 shadow-md rounded-lg p-4 backdrop-blur-md">
            <img
              src="https://nedu.nhi.sg/images/nedu.svg?_wwcv=130"
              alt="Nedu"
              className="w-4/5 object-contain"
              loading="lazy"
            />
          </div>

          {/* Organizer 2 */}
          <div className="flex flex-col justify-center items-center bg-white/20 shadow-md rounded-lg p-4 backdrop-blur-md">
            <img
              src="https://nedu.nhi.sg/images/nlt.png?_wwcv=130"
              alt="NLT"
              className="w-4/5 object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          {/* Facebook Link */}
          <a
            href="https://nedu.nhi.sg/images/facebook.svg?_wwcv=130"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-amber-400 rounded-full text-amber-400 font-semibold"
          >
            <img
              src="https://nedu.nhi.sg/images/facebook.svg?_wwcv=130"
              alt="Facebook"
              className="w-6 h-6"
              loading="lazy"
            />
            <span className="font-semibold text-[20px]">MsNhiSG</span>
          </a>

          {/* Instagram Link */}
          <a
            href="https://nedu.nhi.sg/images/instagram_1.svg?_wwcv=130"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-amber-400 rounded-full text-amber-400 font-semibold"
          >
            <img
              src="https://nedu.nhi.sg/images/instagram_1.svg?_wwcv=130"
              alt="Instagram"
              className="w-6 h-6"
              loading="lazy"
            />
            <span className="font-semibold text-[20px]">msnhi_podcast</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Organizers;