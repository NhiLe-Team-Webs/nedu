"use client";
import React from 'react';
import Image from 'next/image';

const partners = [
  { name: "NLF", logo: '/picture/nlf.png' },
  { name: "Family Cloud", logo: '/picture/familycloud.jpg' },
  { name: "S&W", logo: '/picture/S&W_avatar-1.jpg' },
  { name: "Nhi's House", logo: '/picture/photo_6073197126956990329_y.jpg' },
  { name: "This is home", logo: '/picture/thisishome.jpg' },
  { name: "Factor Method", logo: '/picture/XFactor_Method_Logo_-_Blue.png' },
  { name: "Nhile Team", logo: '/picture/nlt.png' },
  { name: "Soniche", logo: '/picture/Soniche.png' },
  { name: "Hush", logo: '/picture/hush.jpg' },
  { name: "MsNhi", logo: '/picture/MsNhi_Logo.png' },
  { name: "Meta", logo: '/picture/meta.jpg' }
];

const Partners = () => {
  return (
    <section id="partner" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="ww-section ww-section-d339226d-c645-44c1-b466-0081e70467c7" style={{ height: 'auto', zIndex: 'unset', minHeight: 'unset', maxHeight: 'unset', display: 'flex', background: 'none' }}>
        <div className="hash-anchor" id="partner"></div>
        <div className="ww-layout section-base ww-section-element" style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-start', width: '100%', maxWidth: '1280px', minWidth: 'unset', minHeight: 'unset', maxHeight: 'unset' }}>

          {/* Background "Partners" text */}
          <p className="ww-text-content ww-text ww-element text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px]" style={{
            margin: '0px',
            padding: '0px',
            zIndex: '10',
            alignSelf: 'unset',
            display: 'block',
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            maxWidth: 'unset',
            minWidth: 'unset',
            height: 'auto',
            maxHeight: 'unset',
            minHeight: 'unset',
            background: 'none',
            fontFamily: 'var(--ww-default-font-family)',
            fontWeight: '700',
            textAlign: 'center',
            color: 'rgba(247, 181, 12, 0.08)',
            textTransform: 'uppercase',
            textOverflow: 'initial',
            whiteSpace: 'pre-wrap'
          }}>
            Partners
          </p>

          <div className="ww-layout ww-flexbox ww-element py-10 sm:py-12 md:py-16 lg:py-20" style={{
            display: 'flex',
            flexFlow: 'column',
            margin: '0px',
            padding: '0px',
            zIndex: 'unset',
            alignSelf: 'unset',
            width: '100%',
            maxWidth: '1200px',
            minWidth: 'unset',
            height: 'auto',
            maxHeight: 'unset',
            minHeight: 'unset',
            background: 'none'
          }}>

            {/* Main heading */}
            <p className="ww-text-content ww-text ww-element ww-flexbox__object mb-6 sm:mb-8 md:mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px]" style={{
              margin: '0px',
              padding: '0px',
              zIndex: '10',
              alignSelf: 'unset',
              display: 'block',
              maxWidth: 'unset',
              minWidth: 'unset',
              height: 'auto',
              maxHeight: 'unset',
              minHeight: 'unset',
              background: 'none',
              fontFamily: 'var(--ww-default-font-family)',
              fontWeight: '900',
              textAlign: 'center',
              color: '#F7B50C',
              textTransform: 'uppercase',
              textOverflow: 'initial',
              whiteSpace: 'pre-wrap'
            }}>
              30+ đối tác
            </p>

            {/* First row of partners (6 columns) */}
            <div className="ww-layout ww-flexbox ww-element ww-flexbox__object grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 lg:p-10" style={{
              margin: '0px',
              zIndex: 'unset',
              alignSelf: 'unset',
              width: '100%',
              maxWidth: 'unset',
              minWidth: 'unset',
              height: 'auto',
              maxHeight: 'unset',
              minHeight: 'unset',
              background: 'none'
            }}>
              {partners.slice(0, 6).map((partner, index) => (
                <div
                  key={index}
                  className="ww-layout ww-flexbox ww-element ww-flexbox__object transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0px',
                    padding: '0px',
                    zIndex: 'unset',
                    alignSelf: 'unset',
                    maxWidth: 'unset',
                    minWidth: 'unset',
                    height: 'auto',
                    maxHeight: '100px',
                    minHeight: 'unset',
                    background: 'rgba(255, 255, 255, 0.4)', // Slightly more opaque for better contrast on mobile
                    boxShadow: 'var(--shadow-ios-sm)',
                    borderRadius: 'var(--radius-ios-md)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transform: 'translateZ(0)'
                  }}
                  title={partner.name}
                >
                  <div className="ww-image-basic ww-element ww-flexbox__object transition-all duration-300" style={{
                    margin: '0px',
                    padding: '10px',
                    zIndex: 'unset',
                    alignSelf: 'unset',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    maxWidth: 'unset',
                    minWidth: 'unset',
                    background: 'none'
                  }}>
                    <div className="ww-image-basic-overlay"></div>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={80}
                      className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-contain transition-all duration-300 hover:scale-110"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
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

            {/* Second row of partners (5 columns) */}
            <div className="ww-layout ww-flexbox ww-element ww-flexbox__object grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 lg:px-20 lg:py-10" style={{
              margin: '0px',
              zIndex: 'unset',
              alignSelf: 'unset',
              width: '100%',
              maxWidth: 'unset',
              minWidth: 'unset',
              height: 'auto',
              maxHeight: 'unset',
              minHeight: 'unset',
              background: 'none'
            }}>
              {partners.slice(6).map((partner, index) => (
                <div
                  key={index + 6}
                  className="ww-layout ww-flexbox ww-element ww-flexbox__object transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0px',
                    padding: '0px',
                    zIndex: 'unset',
                    alignSelf: 'unset',
                    maxWidth: 'unset',
                    minWidth: 'unset',
                    height: 'auto',
                    maxHeight: '100px',
                    minHeight: 'unset',
                    background: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: 'var(--shadow-ios-sm)',
                    borderRadius: 'var(--radius-ios-md)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transform: 'translateZ(0)'
                  }}
                  title={partner.name}
                >
                  <div className="ww-image-basic ww-element ww-flexbox__object transition-all duration-300" style={{
                    margin: '0px',
                    padding: '10px',
                    zIndex: 'unset',
                    alignSelf: 'unset',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    maxWidth: 'unset',
                    minWidth: 'unset',
                    background: 'none'
                  }}>
                    <div className="ww-image-basic-overlay"></div>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={80}
                      className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-contain transition-all duration-300 hover:scale-110"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
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
        </div>
      </div>
    </section>
  );
};

export default Partners;
