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
    mobileImgClass: "w-24 h-24 object-contain",
  },
  {
    id: "iia",
    src: `${IMAGE_PATH}/IIA.webp`,
    alt: "IIA logo",
    link: "https://iiaindia.co/GlobalCertification/LearningPartner",
    containerClass: "scale-150 hover:scale-175",
    desktopImgClass: "w-48 h-48 object-contain",
    mobileImgClass: "w-24 h-24 object-contain",
  },
  {
    id: "becker",
    src: `${IMAGE_PATH}/BECKER.webp`,
    alt: "Becker logo",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-48 h-48 object-contain",
    mobileImgClass: "w-24 h-24 object-contain",
    mobileWrapperClass: "col-span-2 md:col-span-1", // Centers on odd mobile grid
  },
  {
    id: "iso",
    src: `${IMAGE_PATH}/ISO.webp`,
    alt: "ISO logo",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-24 h-24 object-contain",
    mobileImgClass: "w-24 h-24 object-contain",
  },
  {
    id: "isaca",
    src: `${IMAGE_PATH}/ISACA.webp`,
    alt: "ISACA logo",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-52 h-52 object-contain",
    mobileImgClass: "w-24 h-24 object-contain",
  },
  {
    id: "gleim",
    src: `${IMAGE_PATH}/Gleim.webp`,
    alt: "Gleim logo",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-24 h-24 object-contain",
    mobileImgClass: "w-24 h-24 object-contain",
  },
  {
    id: "gsaaa",
    src: `${IMAGE_PATH}/GSAAA.webp`,
    alt: "GSAAA logo",
    link: "https://www.gsaaa.org/india/academy-of-internal-audit",
    containerClass: "hover:scale-110",
    desktopImgClass: "w-24 h-24 object-contain",
    mobileImgClass: "w-24 h-24 object-contain",
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
  return <div className={`w-full py-10 bg-cover bg-center ${className}`}>
    {/* Desktop view  */}
    <div className="hidden lg:flex flex-nowrap pl-36 overflow-y-hidden justify-center gap-10 xl:gap-20 px-6 overflow-x-auto no-scrollbar">
      {ACCREDITATIONS.map((item) => (
        <div
          key={item.id}
          className={`flex-shrink-0 ${grayscale ? "grayscale hover:grayscale-0" : ""} flex items-center justify-center transition-transform duration-300 ${item.containerClass}`}
        >
          {item.link ? (
            <a href={item.link} target="_blank" rel="noreferrer" aria-label={item.alt}>
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
    <div className="lg:hidden flex flex-nowrap items-center gap-8 px-6  overflow-x-auto no-scrollbar pb-4">
      {ACCREDITATIONS.map((item) => (
        <div
          key={`${item.id}-mobile`}
          className={`flex-shrink-0 flex items-center justify-center ${item.mobileWrapperClass || ""}`}
        >
          {item.link ? (
            <a href={item.link} target="_blank" rel="noreferrer" aria-label={item.alt}>
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
}