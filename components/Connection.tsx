"use client";
const images = [
  { src: '/p2.jpg', alt: "post-1", cls: "col-span-1 row-span-1" },
  { src: '/nhile.jpg', alt: "post-2", cls: "col-span-1 row-span-1 md:row-span-2" },
  { src: '/mel.jpg', alt: "post-3", cls: "col-span-2 row-span-1 md:col-span-1 md:row-span-1" },
  { src: '/pauline.jpg', alt: "post-4", cls: "col-span-1 row-span-2" },
  { src: '/p1.jpg', alt: "post-5", cls: "col-span-1 row-span-1" },
  { src: '/p3.jpg', alt: "post-6", cls: "col-span-1 row-span-1" }
];

const Connection = () => {
  return (
    <section className="py-12 bg-background" id="connection">
      <div className="relative max-w-[1280px] mx-auto px-[32px]"> 

        <h3 className="relative z-10 text-2xl md:text-[36px] font-bold text-center text-[#F7B50C] mb-1">
          KẾT NỐI CÙNG N-EDU
        </h3>
        <p className="relative z-10 text-xs md:text-[28px] font-bold text-center text-[#484848] mb-[68px]">
          ĐỂ CẬP NHẬT THÔNG TIN MỚI NHẤT TỪ CÁC KHÓA HỌC
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              className={`${img.cls} overflow-hidden rounded-md relative bg-white/30 shadow-sm`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover block" />
              <div className="absolute left-3 top-3 w-7 h-7 rounded-full flex items-center justify-center text-sm">
                <img src='/ig.svg'></img>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-400 text-amber-400 hover:bg-amber-400/10 transition" href="#">
            <img className="w-6 h-6" src='/facebook.svg'></img>
            <span className="font-semibold text-[20px]">MsNhiSG</span>
          </a>
          <a className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-400 text-amber-400 hover:bg-amber-400/10 transition" href="#">
            <img className="w-6 h-6" src='/instagram_1.svg'></img>
            <span className="font-semibold text-[20px]">msnhi_podcast</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Connection;
