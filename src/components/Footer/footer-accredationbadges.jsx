import { IMAGE_PATH } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";

const AccreditationBadges = () => {
  const badges = [
    {
      img: `${IMAGE_PATH}/IAO.webp`,
      alt: "IAO",
      title: "Academy of Internal Audit – IAO Profile",
      href: "https://www.iao.org/India-Haryana/Academy-of-Internal-Audit",
    },
    // {
    //   img: `${IMAGE_PATH}/IIA.webp`,
    //   alt: "IIA",
    //   href: "https://iiaindia.co/GlobalCertification/LearningPartner",
    // },
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
    // {
    //   img: `${IMAGE_PATH}/Gleim.webp`,
    //   alt: "Gleim",
    // },
    {
      img: `${IMAGE_PATH}/GSAAA.webp`,
      alt: "GSAAA",
      title: "Academy of Internal Audit – GSAAA Accreditation Profile",
      href: "https://www.gsaaa.org/india/academy-of-internal-audit",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 items-center w-full max-w-full pb-3 overflow-hidden">
      {badges.map(({ img, alt, title, href }) => {
        const inner = (
          <div className="bg-white border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] rounded-lg sm:rounded-xl p-1.5 sm:p-2 w-full aspect-square sm:aspect-[4/3] lg:aspect-[5/4] max-w-16 sm:max-w-20 lg:max-w-24 mx-auto flex items-center justify-center transition-all duration-500 group-hover:border-[#fa8017] group-hover:shadow-lg group-hover:shadow-orange-500/10">
            <OptimizedImage
              src={img}
              alt={alt}
              title={title || alt}
              className="max-w-full max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
              imageKind="badge"
              width={96}
              height={96}
              sizes="96px"
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
            title={title || alt}
            aria-label={alt}
          >
            {inner}
          </a>
        ) : (
          <div
            key={alt}
            className="group min-w-0 transition-transform"
            title={alt}
          >
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
          <OptimizedImage
            src={`${IMAGE_PATH}/payment.webp`}
            alt="Payment methods"
            title="Payment methods"
            className="w-full h-20 object-contain"
            width={320}
            height={80}
            sizes="(min-width: 768px) 280px, 100vw"
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
