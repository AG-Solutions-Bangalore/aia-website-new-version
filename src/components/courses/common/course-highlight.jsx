import CountUp from "@/components/common/count-up";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { partnerLogos } from "@/utils/partnerLogos";
import React from "react";

const CourseHighLight = ({
  badgeText,
  title,
  description,
  stats = [
    { value: 10000, suffix: "+ Hours", subtitle: "Expert Mentoring Sessions" },
    { value: 99.6, suffix: "%", subtitle: "Success Rate" },
    { value: 2000, suffix: "+ Professionals", subtitle: "Trained & Certified" },
    { value: 36, suffix: "+ Countries", subtitle: "Served" },
  ],
  logos = partnerLogos,
}) => {
  return (
    <div className=" mt-10 py-2">
      <div className="relative">
        <div className=" text-center mb-16 max-w-full ">
          <div className="max-w-5xl mx-auto">
            {badgeText && (
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#F3831C]"></div>
                <span className="text-[#F3831C] text-sm font-semibold uppercase tracking-[0.2em] px-4 py-2 bg-gradient-to-r from-orange-50 to-transparent rounded-full">
                  {badgeText}
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#F3831C]"></div>
              </div>
            )}

            {/* <SectionHeading
              title={title}
              description={description}
              align="center"
            /> */}
            <div className="px-4">
              <SectionHeading
                title={title}
                description={description}
                align="center"
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Mobile only (< 768px) */}
          <svg
            className="w-full h-full block md:hidden"
            viewBox="0 -60 400 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200 L1440,900 L0,900 Z"
              fill="url(#waveGradientMobile)"
              fillOpacity="0.1"
            />
            <path
              d="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200"
              stroke="#0F3652"
              strokeWidth="2"
              strokeOpacity="0.3"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,220 C200,150 400,250 600,220 C800,180 1000,250 1200,220 L1440,220"
              stroke="#F3831C"
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,180 C250,80 450,280 700,180 C950,80 1150,280 1440,180"
              stroke="#0F3652"
              strokeWidth="3"
              strokeOpacity="0.2"
              fill="none"
              strokeDasharray="5,5"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="0" cy="200" r="4" fill="#F3831C">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200"
              />
            </circle>
            <circle cx="0" cy="220" r="3" fill="#0F3652" opacity="0.6">
              <animateMotion
                dur="15s"
                repeatCount="indefinite"
                begin="2s"
                path="M0,220 C200,150 400,250 600,220 C800,180 1000,250 1200,220 L1440,220"
              />
            </circle>
            <circle cx="0" cy="180" r="2" fill="#F3831C" opacity="0.4">
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
                begin="5s"
                path="M0,180 C250,80 450,280 700,180 C950,80 1150,280 1440,180"
              />
            </circle>
            <defs>
              <linearGradient
                id="waveGradientMobile"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#F3831C" />
                <stop offset="50%" stopColor="#0F3652" />
                <stop offset="100%" stopColor="#F3831C" />
              </linearGradient>
            </defs>
          </svg>

          {/* MD only (768px – 1023px) */}
          <svg
            className="w-full h-full hidden md:block lg:hidden"
            viewBox="0 -60 1440 850"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200 L1440,850 L0,850 Z"
              fill="url(#waveGradientMd)"
              fillOpacity="0.1"
            />
            <path
              d="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200"
              stroke="#0F3652"
              strokeWidth="2"
              strokeOpacity="0.3"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,220 C200,150 400,250 600,220 C800,180 1000,250 1200,220 L1440,220"
              stroke="#F3831C"
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,180 C250,80 450,280 700,180 C950,80 1150,280 1440,180"
              stroke="#0F3652"
              strokeWidth="3"
              strokeOpacity="0.2"
              fill="none"
              strokeDasharray="5,5"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="0" cy="200" r="4" fill="#F3831C">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200"
              />
            </circle>
            <circle cx="0" cy="220" r="3" fill="#0F3652" opacity="0.6">
              <animateMotion
                dur="15s"
                repeatCount="indefinite"
                begin="2s"
                path="M0,220 C200,150 400,250 600,220 C800,180 1000,250 1200,220 L1440,220"
              />
            </circle>
            <circle cx="0" cy="180" r="2" fill="#F3831C" opacity="0.4">
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
                begin="5s"
                path="M0,180 C250,80 450,280 700,180 C950,80 1150,280 1440,180"
              />
            </circle>
            <defs>
              <linearGradient
                id="waveGradientMd"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#F3831C" />
                <stop offset="50%" stopColor="#0F3652" />
                <stop offset="100%" stopColor="#F3831C" />
              </linearGradient>
            </defs>
          </svg>

          {/* LG+ only (1024px+) */}
          <svg
            className="w-full h-full hidden lg:block"
            viewBox="0 -60 1440 600"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200 L1440,600 L0,600 Z"
              fill="url(#waveGradientLg)"
              fillOpacity="0.1"
            />
            <path
              d="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200"
              stroke="#0F3652"
              strokeWidth="2"
              strokeOpacity="0.3"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,220 C200,150 400,250 600,220 C800,180 1000,250 1200,220 L1440,220"
              stroke="#F3831C"
              strokeWidth="2"
              strokeOpacity="0.4"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0,180 C250,80 450,280 700,180 C950,80 1150,280 1440,180"
              stroke="#0F3652"
              strokeWidth="3"
              strokeOpacity="0.2"
              fill="none"
              strokeDasharray="5,5"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="0" cy="200" r="4" fill="#F3831C">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M0,200 C300,100 500,300 800,200 C1100,100 1200,300 1440,200"
              />
            </circle>
            <circle cx="0" cy="220" r="3" fill="#0F3652" opacity="0.6">
              <animateMotion
                dur="15s"
                repeatCount="indefinite"
                begin="2s"
                path="M0,220 C200,150 400,250 600,220 C800,180 1000,250 1200,220 L1440,220"
              />
            </circle>
            <circle cx="0" cy="180" r="2" fill="#F3831C" opacity="0.4">
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
                begin="5s"
                path="M0,180 C250,80 450,280 700,180 C950,80 1150,280 1440,180"
              />
            </circle>
            <defs>
              <linearGradient
                id="waveGradientLg"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#F3831C" />
                <stop offset="50%" stopColor="#0F3652" />
                <stop offset="100%" stopColor="#F3831C" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1  mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center px-6 py-4  last:border-r-0 mt-12"
            >
              <h3 className="text-2xl md:text-[25px] font-bold mb-1 text-[#0F3652]">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm text-[#0F3652]">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {logos.length > 0 && (
          <div className="max-w-340 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 px-2 mx-auto">
            {logos.map((logo, index) => {
              const Wrapper = logo.link ? "a" : "div";
              const isLast = index == logos.length - 1;

              return (
                <Wrapper
                  key={index}
                  {...(logo.link && {
                    href: logo.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={`rounded-xl p-8 text-center transition-all duration-300 
          flex items-center justify-center hover:scale-125 cursor-pointer
          ${isLast ? "col-span-2 lg:col-span-1" : "lg:col-span-1"}`}
                >
                  <img
                    src={logo.img}
                    alt="Brand logo"
                    className="max-w-full max-h-32 object-contain"
                    loading="lazy"
                  />
                </Wrapper>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHighLight;
