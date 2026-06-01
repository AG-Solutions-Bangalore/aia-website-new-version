import React from "react";
import { IMAGE_PATH } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";

const BannerLogos = () => {
  const logos = [
    {
      src: `${IMAGE_PATH}/mix.webp`,
      alt: "IIA Learning Partner and Becker Authorized Distributor Logos",
      title: "IIA Learning Partner and Authorized Becker Distributor",
    },
  ];

  return (
    <section
      className="bg-white py-6 md:py-8 border-gray-100"
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
                  width={420}
                  height={100}
                  className="h-full w-auto object-contain"
                  priority={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(BannerLogos);
