import { IMAGE_PATH } from "@/api/base-url";
import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import OptimizedImage from "../common/optmized-image";

const ACCREDITATIONS = [
  {
    id: "iao",
    src: `${IMAGE_PATH}/IAO.webp`,
    alt: "IAO logo",
    link: "https://www.iao.org/India-Haryana/Academy-of-Internal-Audit",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-24 h-24 object-contain",
    mobileImgClass: "w-full h-14 sm:h-16 object-contain",
  },
  // {
  //   id: "iia",
  //   src: `${IMAGE_PATH}/IIA.webp`,
  //   alt: "IIA logo",
  //   link: "https://iiaindia.co/GlobalCertification/LearningPartner",
  //   containerClass: "scale-150 hover:scale-175",
  //   desktopImgClass: "w-32 h-32 object-contain",
  //   mobileImgClass: "w-full h-16 sm:h-20 object-contain scale-[1.6] ml-3",
  // },
  {
    id: "becker",
    src: `${IMAGE_PATH}/BECKER.webp`,
    alt: "Becker logo",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-32 h-32 object-contain",
    mobileImgClass: "w-full h-8 sm:h-20 object-contain",
  },
  {
    id: "iso",
    src: `${IMAGE_PATH}/ISO.webp`,
    alt: "ISO logo",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-24 h-24 object-contain",
    mobileImgClass: "w-full h-14 sm:h-16 object-contain",
  },
  {
    id: "isaca",
    src: `${IMAGE_PATH}/ISACA.webp`,
    alt: "ISACA logo",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-48 h-48 object-contain",
    mobileImgClass: "w-full h-20 sm:h-24 object-contain",
    mobileWrapperClass: "col-start-2 sm:col-start-auto",
  },
  // {
  //   id: "gleim",
  //   src: `${IMAGE_PATH}/Gleim.webp`,
  //   alt: "Gleim logo",
  //   containerClass: "hover:scale-110",
  //   desktopImgClass: "w-32 h-32 object-contain",
  //   mobileImgClass: "w-full h-16 sm:h-20 object-contain",
  // },
  {
    id: "gsaaa",
    src: `${IMAGE_PATH}/GSAAA.webp`,
    alt: "GSAAA logo",
    link: "https://www.gsaaa.org/india/academy-of-internal-audit",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-24 h-24 object-contain",
    mobileImgClass: "w-full h-14 sm:h-16 object-contain",
  },
];

const HomeAccredited = () => {
  return (
    <div className="py-2 max-w-340 mx-auto">
      <div className="px-6">
        <SectionHeading
          title="Recognized & Accredited by Leading Global Bodies"
          description="Our programs are recognized by international accreditation and professional bodies, reinforcing our commitment to quality education and global relevance."
          align="center"
        />
      </div>
      <Partners grayscale={true} />
    </div>
  );
};

export default HomeAccredited;

export const Partners = ({ grayscale = false, className = "" }) => {
  return (
    <div
      className={`w-full py-3 sm:py-5 lg:py-10 bg-cover bg-center ${className}`}
    >
      {/* Desktop view  */}
      <div className="hidden lg:flex flex-nowrap overflow-y-hidden justify-center gap-10 xl:gap-20 px-6 overflow-x-auto no-scrollbar">
        {ACCREDITATIONS.map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 ${grayscale ? "grayscale hover:grayscale-0" : ""} flex items-center justify-center transition-transform duration-300 ${item.containerClass}`}
          >
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                aria-label={item.alt}
              >
                <OptimizedImage
                  src={item.src}
                  alt={item.alt}
                  className={`${item.desktopImgClass} ${grayscale ? "grayscale hover:grayscale-0" : ""}`}
                  width={160}
                  height={160}
                  loading="lazy"
                />
              </a>
            ) : (
              <OptimizedImage
                src={item.src}
                alt={item.alt}
                className={item.desktopImgClass}
                width={160}
                height={160}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile view  */}
      <div className="lg:hidden grid grid-cols-6 sm:grid-cols-5 items-center justify-items-center gap-x-3 sm:gap-x-6 gap-y-3 px-5 sm:px-6 pb-2">
        {ACCREDITATIONS.map((item) => (
          <div
            key={`${item.id}-mobile`}
            className={`col-span-2 sm:col-span-1 flex w-full items-center justify-center ${grayscale ? "grayscale" : ""} ${item.mobileWrapperClass || ""}`}
          >
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                aria-label={item.alt}
                className="flex w-full items-center justify-center"
              >
                <OptimizedImage
                  src={item.src}
                  alt={item.alt}
                  className={item.mobileImgClass}
                  loading="lazy"
                />
              </a>
            ) : (
              <OptimizedImage
                src={item.src}
                alt={item.alt}
                className={item.mobileImgClass}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
