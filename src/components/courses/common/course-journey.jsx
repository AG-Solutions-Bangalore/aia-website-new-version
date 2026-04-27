import SectionHeading from "@/components/SectionHeading/SectionHeading";
import React from "react";

const CourseJourney = ({ heading, highlight, steps, connectorImage }) => {
  console.log(heading, "heading");

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10 lg:mb-14 px-2">
          <h3>
            <SectionHeading
              title={heading}
              highlight={highlight}
              align="center"
              titleClass="text-[1rem] md:text-3xl"
              highlightClass="text-[1rem] md:text-3xl"
            />
          </h3>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 relative z-10 justify-items-center">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const isOdd = steps.length % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`
          relative bg-[#E7EBEE] hover:bg-[#0F3652] text-[#0F3652] hover:text-white 
          rounded-xl w-full min-h-[240px] md:min-h-[260px] lg:min-h-65 max-w-[380px] 
          transition-colors duration-300
          ${isLast && isOdd ? "md:col-span-2 lg:col-span-1" : ""}
        `}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-[#F3831C] text-white rounded-full flex items-center justify-center text-base md:text-lg lg:text-xl font-bold italic shadow-lg">
                    {step.number}
                  </div>

                  <div className="p-4 md:p-6 lg:p-8 pt-6 md:pt-8">
                    <h4 className="text-base md:text-lg font-semibold mb-3 text-center px-2">
                      {step.title}
                    </h4>

                    <ul className="text-xs md:text-sm leading-relaxed pl-2 md:pl-6 lg:pl-8 space-y-1 list-disc list-inside">
                      {step.items.map((item, i) => (
                        <li key={i} className="break-words">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {connectorImage && (
            <div className="hidden lg:block absolute top-0 left-0 right-0 z-0 scale-110 opacity-30 lg:opacity-100">
              <img
                src={connectorImage}
                alt="Step Connector"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseJourney;
