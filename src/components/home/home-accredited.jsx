import { IMAGE_PATH } from "@/api/base-url";
import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import OptimizedImage from "../common/optmized-image";

const HomeAccredited = () => {
  return (
    <div className="py-8 max-w-340 mx-auto">
      <div className="px-6">
        <SectionHeading
          title="Recognized & Accredited by Leading Global Bodies"
          description="Our programs are recognized by international accreditation and professional bodies, reinforcing our commitment to quality education and global relevance."
          align="center"
        />
      </div>

      <div className="w-full py-10 bg-cover bg-center">
        {/* Desktop view  */}
        <div className="hidden lg:flex justify-center gap-20 px-6">
          <div className="grayscale hover:grayscale-0 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <a
              href="https://www.iao.org/India-Haryana/Academy-of-Internal-Audit"
              target="_blank" rel="noreferrer"
            >
              <OptimizedImage
                src={`${IMAGE_PATH}/IAO.webp`}
                alt="IAO logo"
                className="w-40 h-40 object-contain"
                width={160}
                height={160}
              />
            </a>
          </div>

          <div className="grayscale hover:grayscale-0 flex items-center justify-center transition-transform duration-300  scale-150 hover:scale-175">
            <a
              href="https://iiaindia.co/GlobalCertification/LearningPartner"
              target="_blank" rel="noreferrer"
            >
              <OptimizedImage
                src={`${IMAGE_PATH}/IIA.webp`}
                alt="IIA logo"
                className="w-48 h-48 object-contain"
                width={160}
                height={160}
              />
            </a>
          </div>

          <div className="grayscale hover:grayscale-0 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <OptimizedImage
              src={`${IMAGE_PATH}/ISO.webp`}
              alt="ISO logo"
              className="w-40 h-40 object-contain"
              width={160}
              height={160}
            />
          </div>

          <div className="grayscale hover:grayscale-0 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <OptimizedImage
              src={`${IMAGE_PATH}/Gleim.webp`}
              alt="Gleim logo"
              className="w-40 h-40 object-contain"
              width={160}
              height={160}
            />
          </div>

          <div className="grayscale hover:grayscale-0 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <a
              href="https://www.gsaaa.org/india/academy-of-internal-audit"
              target="_blank" rel="noreferrer"
            >
              <OptimizedImage
                src={`${IMAGE_PATH}/GSAAA.webp`}
                alt="GSAAA logo"
                className="w-40 h-40 object-contain"
                width={160}
                height={160}
              />
            </a>
          </div>
        </div>

        {/* Mobile view  */}
        <div className="lg:hidden grid grid-cols-2 gap-8 px-6 place-items-center">
          <div className=" flex items-center justify-center">
            <a
              href="https://www.iao.org/India-Haryana/Academy-of-Internal-Audit"
              target="_blank" rel="noreferrer"
            >
              <OptimizedImage
                src={`${IMAGE_PATH}/IAO.webp`}
                alt="IAO logo"
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          <div className="flex items-center justify-center">
            <a
              href="https://iiaindia.co/GlobalCertification/LearningPartner"
              target="_blank" rel="noreferrer"
            >
              <OptimizedImage
                src={`${IMAGE_PATH}/IIA.webp`}
                alt="IIA logo"
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          <div className="flex items-center justify-center">
            <OptimizedImage
              src={`${IMAGE_PATH}/ISO.webp`}
              alt="ISO logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center justify-center">
            <OptimizedImage
              src={`${IMAGE_PATH}/Gleim.webp`}
              alt="Gleim logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <a
              href="https://www.gsaaa.org/india/academy-of-internal-audit"
              target="_blank" rel="noreferrer"
            >
              <OptimizedImage
                src={`${IMAGE_PATH}/GSAAA.webp`}
                alt="GSAAA logo"
                className="w-[180px] h-[180px] object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAccredited;
