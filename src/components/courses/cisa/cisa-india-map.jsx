import React from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { IMAGE_PATH } from "@/api/base-url";

const CisaIndiaMap = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8 md:mb-10 text-left">
          <SectionHeading
            title="India by AIA"
            description="Empowering Professionals From Every Corner of India."
            align="left"
          />
        </div>

        {/* Center-aligned Unified Map Image */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden">
            <img
              src={`${IMAGE_PATH}/india_map.webp`}
              alt="India by AIA map and locations"
              className="w-full h-auto object-contain drop-shadow-md"
              onError={(e) => {
                e.target.src = `${IMAGE_PATH}/map.webp`; // fallback
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CisaIndiaMap;
