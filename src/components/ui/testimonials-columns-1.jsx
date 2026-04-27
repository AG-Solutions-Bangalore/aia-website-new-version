import React from "react";
import { motion } from "framer-motion";
import OptimizedImage from "../common/optmized-image";

export const TestimonialsColumn = (props, className) => {
  const getCourseName = (course) => {
    switch (course) {
      case "CFE":
        return "CFE";
      case "CIAC":
        return "CIA";
      case "CAMS":
        return "CAMS";
      default:
        return course;
    }
  };
  const getCourseStyles = (course) => {
    switch (course) {
      case "CFE":
        return "bg-[#F3831C]/15 text-[#F3831C]";
      case "CIAC":
        return "bg-[#0F3652]/15 text-[#0F3652]";
      case "CAMS":
        return "bg-[#16A34A]/15 text-[#16A34A]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(
                (
                  {
                    name,
                    image,
                    alt,
                    student_designation,
                    comapany_image,
                    company_alt,
                    course,
                  },
                  i,
                ) => (
                  <div
                    className="rounded-md border border-[#F3831C]/20 bg-white overflow-hidden w-[28vw] sm:w-[28vw] md:w-[200px] lg:w-full"
                    key={i}
                  >
                    <div
                      className={`h-[28vw] sm:h-[18vw] md:h-44 lg:h-56  w-full relative ${className}`}
                    >
                      <OptimizedImage
                        src={image}
                        alt={alt}
                        className="h-full w-full object-top object-cover"
                      />
                      <div
                        className={`absolute top-1 right-1 sm:top-2 sm:right-2 backdrop-blur-sm px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md text-[8px] sm:text-[10px] md:text-xs font-semibold ${getCourseStyles(course)}`}
                      >
                        {getCourseName(course)}
                      </div>
                    </div>

                    <div className="p-1.5 sm:p-2 md:p-3 lg:p-4 flex flex-col gap-1 sm:gap-2 md:gap-3">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-semibold tracking-tight text-[#0F3652] truncate">
                            {name}
                          </span>
                          <span className="text-[8px] sm:text-[10px] md:text-xs opacity-60 text-[#0F3652] truncate">
                            {student_designation}
                          </span>
                        </div>
                        <OptimizedImage
                          src={comapany_image}
                          alt={company_alt}
                          className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 object-contain flex-shrink-0"
                          sizes="32px"
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
