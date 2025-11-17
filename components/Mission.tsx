

const Mission = () => {
  return (
    <section id="mission" className="relative bg-white min-h-screen flex items-center">
      {/* big faded background text */}
      <p className="absolute inset-x-0 top-0 text-center text-[290px] font-extrabold text-gray-100 leading-[0.9] select-none pointer-events-none" aria-hidden>
        Mission
      </p>

      <div className="container mx-auto max-w-[1280px] px-6 relative z-10">
        <div className="flex flex-row justify-between items-center w-full max-w-[1200px] mx-auto">
          {/* left column */}
          <div className="flex flex-col items-start mr-8">
            <p className="text-[68px] font-black text-[#f7b50c] uppercase mb-4">Sứ mệnh</p>

            <div className="flex items-start">
              <div className="mr-4" aria-hidden>
                {/* quote icon approx 90px */}
                <img src='/quote.svg' alt="Quote icon" />
              </div>

              <div>
                <p className="text-[28px] font-bold text-[#484848] text-justify max-w-[640px]">
                  Mang kiến thức, giáo dục chất lượng trên toàn thế giới về Việt Nam
                  và hòa hợp với văn hóa người Việt
                </p>

                <a
                  href="https://www.nhi.sg/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center mt-6 bg-[#f7b50c] hover:bg-amber-500 text-white font-medium px-5 py-3 rounded-[40px]"
                >
                  <span className="uppercase">xem thêm</span>
                  <svg className="ml-3 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="flex flex-col items-start">
            <img src='/nhile.png' alt="Nhi Le" className="w-[320px] mb-4" />

            <div className="flex flex-row justify-between items-end w-full max-w-[320px]">
              <div className="flex flex-col">
                <p className="text-[24px] font-bold text-[#484848]">Nhi Le</p>
                <p className="text-[16px] font-semibold text-[#f7b50c]">Doanh nhân</p>
              </div>

              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/in/nhisg/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6h-4v-12h4v2a4 4 0 0 1 4-2zM6 9H2v12h4V9zm-2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="currentColor"/></svg>
                </a>

                <a href="https://www.facebook.com/nhile.sg" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07C2 17.09 5.66 21.26 10.44 22V14.89h-2.8v-2.82h2.8V9.83c0-2.77 1.64-4.29 4.15-4.29 1.2 0 2.46.22 2.46.22v2.7h-1.38c-1.36 0-1.79.85-1.79 1.73v2.06h3.05l-.49 2.82h-2.56V22C18.34 21.26 22 17.09 22 12.07z" fill="currentColor"/></svg>
                </a>

                <a href="https://www.instagram.com/nhile.sg/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm5.5-3.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" fill="currentColor"/></svg>
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