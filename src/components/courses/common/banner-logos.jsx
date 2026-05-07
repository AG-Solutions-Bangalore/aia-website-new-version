import React from "react";
import { IMAGE_PATH } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";

const BannerLogos = () => {
  const logos = [
    {
      src: `${IMAGE_PATH}/IIA.webp`,
      alt: "IIA - Institute of Internal Auditors Logo",
      title: "IIA Learning Partner",
    },
    {
      src: `${IMAGE_PATH}/BECKER.webp`,
      alt: "Becker Logo",
      title: "Authorized Becker Distributor",
    },
  ];

  return (
    <section 
      className="bg-white py-6 md:py-8 border-b border-gray-100" 
      aria-label="Accreditations and Partners"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center gap-2 group transition-transform duration-300 hover:-translate-y-1"
              title={logo.title}
            >
              <div className="relative h-12 sm:h-16 md:h-20 w-auto flex items-center justify-center">
                <OptimizedImage
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain"
                  priority={true}
                />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#0F3652]/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {logo.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(BannerLogos);
