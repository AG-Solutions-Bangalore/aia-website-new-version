import React from "react";
import { Zap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CourseUnique({
  badgeText,
  heading,
  highlight,
  description,
  services,
  lastText = "",
  button = true,
}) {
  return (
    <section
      id="unique-section"
      className="w-full  pt-14 px-4 text-gray-800 relative"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center mb-4 md:mb-6">
          <span className="text-[#F3831C] font-medium mb-2 flex items-center gap-2 text-sm md:text-base">
            <Zap className="w-3 h-3 md:w-4 md:h-4" /> {badgeText}
          </span>

          <SectionHeading
            title={heading}
            highlight1={highlight}
            align="center"
          />
        </div>

        <p className="text-center max-w-2xl mx-auto mb-8 md:mb-12 lg:mb-16 text-sm md:text-base text-[#0F3652] px-2">
          {description}
        </p>

        {/* Mobile: Single column, Tablet/Desktop: Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-8 relative">
          {/* Left Column - All services will stack on mobile, split on desktop */}
          <div className="space-y-8 md:space-y-12 lg:space-y-16">
            {services
              .filter((s) => s.position === "left")
              .map((service, index) => (
                <ServiceItem key={`left-${index}`} {...service} />
              ))}
          </div>

          <div className="space-y-8 md:space-y-12 lg:space-y-16 mt-0 lg:mt-0">
            {services
              .filter((s) => s.position === "right")
              .map((service, index) => (
                <ServiceItem key={`right-${index}`} {...service} />
              ))}
          </div>

          {lastText && (
            <div className="font-bold w-full col-span-1 lg:col-span-2 text-center text-base md:text-lg lg:text-xl mt-4 md:mt-6 px-2">
              {lastText}
            </div>
          )}
        </div>
      </div>
      {button && (
        <div className="flex justify-center mt-6 md:mt-8">
          <Button
            className="relative cursor-pointer overflow-hidden group px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300"
            variant="ghost"
            aria-label="Visit Our YouTube Channel"
          >
            <Link to="/contact">
              <span className="relative z-10 text-white">
                <span>Get in Touch</span>
              </span>
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}

function ServiceItem({ icon, secondaryIcon, title, description }) {
  return (
    <div className="flex flex-col group">
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
        <div className="text-[#F3831C] bg-[#F3831C]/10 p-2 md:p-3 rounded-lg relative transition-colors duration-300 group-hover:bg-[#F3831C]/20 group-hover:rotate-6 flex-shrink-0">
          <div className="w-5 h-5 md:w-6 md:h-6">{icon}</div>
          {secondaryIcon && (
            <div className="absolute -top-1 -right-1">{secondaryIcon}</div>
          )}
        </div>
        <h3 className="text-base md:text-lg lg:text-xl font-medium text-[#0F3652] group-hover:text-[#F3831C] transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p
        className="text-xs md:text-sm text-[#0F3652] leading-relaxed pl-10 md:pl-12 pr-2 text-justify"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      >
        {/* {description} */}
      </p>
    </div>
  );
}
