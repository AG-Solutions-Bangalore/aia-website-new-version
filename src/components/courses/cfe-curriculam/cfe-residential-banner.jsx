import React from "react";
import { IMAGE_PATH } from "@/api/base-url";
import { Button } from "@/components/ui/button";

const CFE_BROCHURE_URL =
  "https://aia.in.net/webapi/public/assets/pdf/CFE_Training_detailed_guide.pdf";

const CfeResidentialBanner = () => {
  return (
    <section className="bg-white px-4 md:px-8 lg:px-12 pb-8 md:pb-10">
      <div className="max-w-7xl mx-auto">
        <img
          src={`${IMAGE_PATH}/AIA_LMS.webp`}
          alt="4-Day CFE Residential Training Program"
          className="w-full aspect-[16/7] object-cover"
          loading="lazy"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5 px-1 md:px-2">
          <p className="text-[#0F3652] text-base md:text-lg uppercase font- font-semibold">
            Get Complete Details About the Residential Program
          </p>

          <Button
            asChild
            className="bg-[#F3831C] text-white px-6 py-2.5 text-center flex items-center justify-center rounded-none font-semibold hover:bg-[#F3831C]/90 transition-all cursor-pointer md:w-auto w-[50%] sm:w-auto mx-auto sm:mx-0"
          >
            <a
              href={CFE_BROCHURE_URL}
              download="CFE_Training_detailed_guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Brochure
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CfeResidentialBanner;
