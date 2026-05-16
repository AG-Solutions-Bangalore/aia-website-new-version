import { IMAGE_PATH } from "@/api/base-url";

const AccreditationBadges = () => {
  const badges = [
    {
      img: `${IMAGE_PATH}/IAO.webp`,
      alt: "IAO",
      href: "https://www.iao.org/India-Haryana/Academy-of-Internal-Audit",
    },
    {
      img: `${IMAGE_PATH}/IIA.webp`,
      alt: "IIA",
      href: "https://iiaindia.co/GlobalCertification/LearningPartner",
    },
    {
      img: `${IMAGE_PATH}/BECKER.webp`,
      alt: "Becker",
    },
    {
      img: `${IMAGE_PATH}/ISO.webp`,
      alt: "ISO",
    },
    {
      img: `${IMAGE_PATH}/ISACA.webp`,
      alt: "ISACA",
    },
    {
      img: `${IMAGE_PATH}/Gleim.webp`,
      alt: "Gleim",
    },
    {
      img: `${IMAGE_PATH}/GSAAA.webp`,
      alt: "GSAAA",
      href: "https://www.gsaaa.org/india/academy-of-internal-audit",
    },
  ];

  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 items-center w-full max-w-full pb-3 overflow-hidden">
      {badges.map(({ img, alt, href }) => {
        const inner = (
          <div className="bg-white border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] rounded-lg sm:rounded-xl p-1.5 sm:p-2 w-full aspect-square sm:aspect-[4/3] lg:aspect-[5/4] max-w-16 sm:max-w-20 lg:max-w-24 mx-auto flex items-center justify-center transition-all duration-500 group-hover:border-[#fa8017] group-hover:shadow-lg group-hover:shadow-orange-500/10">
            <img
              src={img}
              alt={alt}
              className="max-w-full max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        );

        return href ? (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group min-w-0 transition-transform"
            title={alt}
            aria-label={alt}
          >
            {inner}
          </a>
        ) : (
          <div key={alt} className="group min-w-0 transition-transform" title={alt}>
            {inner}
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
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start w-full max-w-full overflow-hidden">
    <div className="min-w-0">
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
      </div>
    </div>

    <div className="min-w-0">
      <SectionLabel>Accreditations</SectionLabel>
      <AccreditationBadges />
    </div>
  </div>
);
