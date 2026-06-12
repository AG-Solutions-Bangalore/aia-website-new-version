import React, { useState } from "react";
import { IMAGE_PATH } from "@/api/base-url";

const CisaHero = () => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-[#FFF3E3] via-[#EFF4F8] to-[#DCEFF3] py-10 md:py-14 lg:py-16 overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text, Logos & Badges */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-block bg-white border-4 border-[#F3831C] px-6 py-3 rounded-2xl shadow-md">
              <span className="text-[#F3831C] text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-wide block">
                Become a CISA with India&apos;s Leading Institute AIA
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-extrabold leading-tight text-[#0F3652] max-w-2xl">
              Expert-led CISA preparation designed for professionals in IT audit, risk, and compliance.
            </h1>

            {/* Single Unified Logos Box */}
            <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-start bg-white border border-gray-200 p-4 rounded-2xl shadow-sm gap-4 sm:gap-6">
              <div className="flex items-center justify-center h-12 w-32 shrink-0">
                <img
                  src={`${IMAGE_PATH}/new_logo.webp`}
                  alt="AIA Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="flex flex-col items-center justify-center h-12 w-32 shrink-0">
                <img
                  src={`${IMAGE_PATH}/ISACA.webp`}
                  alt="ISACA Logo"
                  className="max-h-[60%] max-w-full object-contain"
                />
                <span className="text-[9px] font-extrabold text-gray-400 mt-0.5 uppercase tracking-wider">
                  Accredited Partner
                </span>
              </div>
            </div>

            {/* Orange Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <span className="bg-[#F3831C] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-lg shadow-sm">
                APMG Accredited Trainer
              </span>
              <span className="bg-[#F3831C] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-lg shadow-sm">
                AIA Prep Course+ISACA Prep Kit
              </span>
            </div>
          </div>

          {/* Right Column: Devices Mockup or Skeleton Fallback */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-end">
            <div className="relative w-full max-w-md md:max-w-lg flex flex-col items-center">
              
              {/* Attempt to load the actual image. If it fails, render our beautiful skeleton. */}
              {!imgError ? (
                <img
                  src={`${IMAGE_PATH}/cisa_hero_banner.webp`}
                  alt="AIA CISA LMS Devices Mockup"
                  className={`w-full h-auto object-contain drop-shadow-2xl transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0 absolute"}`}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                />
              ) : null}

              {/* Styled Devices Skeleton Loader (Visible while loading or if image error) */}
              {(!imgLoaded || imgError) && (
                <div className="w-full aspect-16/11 bg-white/70 border border-white/90 rounded-2xl p-4 sm:p-5 shadow-2xl relative animate-pulse flex flex-col justify-between overflow-hidden border-b-4 border-b-gray-300">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                    </div>
                    <div className="w-3/5 h-3 bg-gray-200 rounded-full" />
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                  </div>
                  
                  {/* Dashboard Content Mock */}
                  <div className="flex-1 grid grid-cols-12 gap-3 py-1 items-stretch">
                    <div className="col-span-3 space-y-2 border-r border-gray-100 pr-2">
                      <div className="h-3.5 bg-[#F3831C]/30 rounded-sm w-full" />
                      <div className="h-3 bg-gray-200 rounded-sm w-4/5" />
                      <div className="h-3 bg-gray-200 rounded-sm w-5/6" />
                      <div className="h-3 bg-gray-200 rounded-sm w-3/4" />
                    </div>
                    
                    <div className="col-span-9 space-y-3 pl-1 flex flex-col justify-between">
                      <div className="flex gap-2">
                        <div className="h-6 bg-slate-200 rounded-md flex-1" />
                        <div className="h-6 bg-slate-200 rounded-md w-16" />
                      </div>
                      <div className="flex-1 bg-[#0F3652]/5 rounded-lg border border-dashed border-[#0F3652]/10 p-2 flex flex-col justify-center items-center gap-1.5">
                        <div className="w-8 h-8 rounded-full bg-[#F3831C]/20 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-[#F3831C]/40 animate-ping" />
                        </div>
                        <span className="text-[10px] font-bold text-[#0F3652]/60 uppercase tracking-widest text-center">
                          CISA Interactive LMS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping Phone Mockup Skeleton */}
                  <div className="absolute bottom-2 right-4 w-[85px] h-[140px] bg-slate-800 rounded-[14px] p-1.5 shadow-2xl border-2 border-slate-700 hidden sm:flex flex-col justify-between z-20 transform translate-y-4">
                    <div className="w-8 h-1 bg-slate-600 rounded-full mx-auto mb-1 shrink-0" />
                    <div className="flex-1 bg-white rounded-[8px] p-1 flex flex-col justify-between gap-1.5">
                      <div className="h-4 bg-[#F3831C]/20 rounded-xs w-full" />
                      <div className="h-2 bg-gray-200 rounded-xs w-5/6" />
                      <div className="h-2 bg-gray-200 rounded-xs w-2/3" />
                      <div className="h-6 bg-slate-100 rounded-xs w-full mt-auto" />
                    </div>
                  </div>
                </div>
              )}

              {/* Launching Soon Badge below mockup */}
              <div className="mt-6">
                <span className="bg-[#0F3652] text-white text-base sm:text-lg font-bold px-8 py-2.5 rounded-lg shadow-lg tracking-wide select-none">
                  Launching Soon
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CisaHero;
