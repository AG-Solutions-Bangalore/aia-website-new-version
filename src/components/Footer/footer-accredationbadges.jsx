import { IMAGE_PATH } from "@/api/base-url";
import { href } from "react-router-dom";

const AccreditationBadges = () => {
  const badges = [
    {
      img: `${IMAGE_PATH}/iao-seal.webp`,
      alt: "IAO",
      href: "https://www.iao.org/India-Haryana/Academy-of-Internal-Audit",
    },
    {
      img: `${IMAGE_PATH}/IIA.webp`,
      alt: "IIA",
      href: "https://iiaindia.co/GlobalCertification/LearningPartner",
    },
    { img: `${IMAGE_PATH}/ISO.webp`, alt: "ISO" },
    { img: `${IMAGE_PATH}/Gleim.webp`, alt: "Gleim" },
    {
      img: `${IMAGE_PATH}/GSAAA.webp`,
      alt: "GSAAA",
      href: "https://www.gsaaa.org/india/academy-of-internal-audit",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center">
      {badges.map(({ img, alt, href }, index) => {
        const isLast = index === badges.length - 1;
        const inner = (
          <div className="bg-white border border-gray-700 rounded-lg p-2 w-full h-20 flex items-center justify-center transition-all duration-200 group-hover:border-[#fa8017] group-hover:scale-105">
            <img
              src={img}
              alt={alt}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        );

        const wrapper = href ? (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            title={alt}
          >
            {inner}
          </a>
        ) : (
          <div key={alt} className="group" title={alt}>
            {inner}
          </div>
        );

        return (
          <div
            key={alt}
            className={
              isLast ? "col-span-2 md:col-span-1 flex justify-center" : ""
            }
          >
            <div className={isLast ? "w-1/2 md:w-full" : "w-full"}>
              {wrapper}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <h4 className="text-[#fa8017] font-bold text-xl mb-6 relative inline-block">
    {children}
    <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#fa8017] -mb-2"></span>
  </h4>
);

export const PaymentAccreditation = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
    <div>
      <SectionLabel>Payment</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 flex items-center justify-center hover:border-[#fa8017]/40 transition-all duration-200">
          <img
            src={`${IMAGE_PATH}/payment.webp`}
            alt="Payment methods"
            className="w-full h-20 object-contain"
            loading="lazy"
          />
        </div>

        <a
          href="tel:+18001200255"
          className="grouprounded-xl p-3 flex items-center justify-center hover:border-[#fa8017]/40 transition-all duration-200"
        >
          <img
            src={`${IMAGE_PATH}/toll free.webp`}
            alt="Toll Free"
            className="w-full h-20 object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </a>
      </div>
    </div>

    <div>
      <SectionLabel>Accreditations</SectionLabel>
      <AccreditationBadges />
    </div>
  </div>
);
