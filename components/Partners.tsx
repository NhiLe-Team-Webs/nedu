"use client";
import React from 'react';
const partners = [
  { name: "NLF", logo: '/nlf.png' },
  { name: "Family Cloud", logo: '/familycloud.jpg' },
  { name: "S&W", logo: '/S&W_avatar-1.jpg' },
  { name: "Nhi's House", logo: '/photo_6073197126956990329_y.jpg' },
  { name: "This is home", logo: '/thisishome.jpg' },
  { name: "Factor Method", logo: '/XFactor_Method_Logo_-_Blue.png' },
  { name: "Nhile Team", logo: '/nlt.png' },
  { name: "Soniche", logo: '/Soniche.png' },
  { name: "Hush", logo: '/hush.jpg' },
  { name: "MsNhi", logo: '/MsNhi_Logo.png' },
  { name: "Meta", logo: '/meta.jpg' }
];

const Partners = () => {
  return (
    <section id="partners" className="bg-background overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto py-[80px] z-10">
        <p className="pointer-events-none absolute inset-x-0 top-0 text-center text-[110px] font-bold text-amber-50 h-auto uppercase select-none">
          PARTNERS
        </p>

        <h2 className="relative z-20 md:text-[68px] font-extrabold text-center mb-4">
            <span className="text-[#F7B50C]">30+ ĐỐI TÁC</span>
        </h2>

        {/* First row (6 cols) */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-6xl mx-auto px-4">
          {partners.slice(0, 6).map((partner, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center p-0 rounded-2xl bg-[rgba(255,255,255,0.3)] shadow-sm border border-[rgba(0,0,0,0.05)] backdrop-blur-md max-h-[120px] h-full"
              title={partner.name}
            >
              <div className="ww-image-basic block w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="h-[80%] w-[90%] object-contain"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent && !parent.querySelector("span")) {
                      const span = document.createElement("span");
                      span.className = "font-bold text-2xl text-muted-foreground";
                      span.textContent = partner.name
                        .split(" ")
                        .map((s) => s[0])
                        .join("")
                        .slice(0, 3);
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second row (5 cols) similar to the original HTML layout */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-6xl mx-auto px-8 mt-6">
          {partners.slice(6).map((partner, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center p-0 rounded-2xl bg-[rgba(255,255,255,0.3)] shadow-sm border border-[rgba(0,0,0,0.05)] backdrop-blur-md max-h-[120px] h-full"
              title={partner.name}
            >
              <div className="ww-image-basic block w-full h-full flex items-center justify-center p-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="max-h-[80%] max-w-[90%] object-contain"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    const parent = el.parentElement;
                    if (parent && !parent.querySelector("span")) {
                      const span = document.createElement("span");
                      span.className = "font-bold text-2xl text-muted-foreground";
                      span.textContent = partner.name
                        .split(" ")
                        .map((s) => s[0])
                        .join("")
                        .slice(0, 3);
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
