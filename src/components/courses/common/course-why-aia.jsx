import SectionHeading from "@/components/SectionHeading/SectionHeading";
import React from "react";

const CourseWhyAia = ({ heading, items }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
      <div className="w-full py-10">
        <div className="pb-6">
          <SectionHeading title={heading} align="center" />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center items-start lg:place-items-center">
          {" "}
          {items.map((item, i) => (
            <DiamondCard key={i} img={item.img} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseWhyAia;

const DiamondCard = ({ img, title }) => (
  // <div className="group w-full max-w-[160px]  lg:w-60 mx-auto flex flex-col items-center justify-center">
  <div className="group w-full max-w-[160px]  lg:max-w-[200px] mx-auto flex flex-col items-center justify-center">
    {/* Perfect square container */}
    <div className="relative w-full aspect-square">
      {/* Diamond */}
      <div
        className="
        absolute inset-0 rotate-45 rounded-2xl
        border border-[#0F3652]/30
        transition-all duration-300 ease-out
        group-hover:-translate-y-2
        group-hover:border-[#0F3652]
        group-hover:shadow-xl
        group-hover:bg-gradient-to-br
        group-hover:from-[#0F3652]/5
        group-hover:via-white
        group-hover:to-[#0F3652]/5
      "
      >
        {/* Inner Content */}
        <div className="absolute inset-0 -rotate-45 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#0F3652]/10 rounded-full flex items-center justify-center mb-3">
            <img
              src={img}
              alt={title}
              className="w-8 md:w-10 object-contain"
              loading="lazy"
            />
          </div>

          <h3 className="text-xs md:text-sm font-semibold text-[#0F3652] leading-tight">
            {title}
          </h3>
        </div>
      </div>
    </div>
  </div>
);
