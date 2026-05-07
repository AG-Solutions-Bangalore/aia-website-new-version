import { Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import SectionHeadingH1 from "@/components/SectionHeading/SectionHeadingH1";

const CfeJoinDialog = lazy(() => import("../cfe-curriculam/join-prep"));

const CourseAboutH1 = ({
  badgeText,
  heading,
  description,
  aboutStats,
  buttonText,
  buttonLink,
  formtitle,
  formsubtitle,
  formcourse,
  formbuttonlabel,
  lineBreak = "lg",
  preheading,
  customButton,
}) => {
  const location = useLocation();

  return (
    <section className="py-12 md:py-16 lg:py-18 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeadingH1
          title={heading}
          preheading={preheading}
          align="center"
          titleClass="!text-[1.1rem] md:!text-3xl"
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div>
            {badgeText && (
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <span className="text-xs sm:text-sm font-medium text-[#F3831C] tracking-wider">
                  {badgeText}
                </span>
              </div>
            )}

            {description && (
              <div className="text-sm sm:text-base text-[#0F3652] leading-relaxed space-y-3 md:space-y-4 mb-6 md:mb-8 text-justify">
                {description.split("\n").map((line, i) => (
                  <p key={i} className="break-words">
                    {line}
                  </p>
                ))}
              </div>
            )}

            {customButton ? (
              <div className="flex justify-center md:justify-start">
                {customButton}
              </div>
            ) : (
              buttonText && (
                <Link
                  to={buttonLink}
                  className="flex justify-center md:justify-start"
                >
                  <span className="text-xs sm:text-sm font-semibold cursor-pointer px-4 py-2.5 sm:px-5 sm:py-2.5 bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300">
                    {buttonText}
                  </span>
                </Link>
              )
            )}
          </div>

          {/* Right Content - Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {aboutStats?.map((stat, index) => (
              <div
                key={index}
                className="relative border-2 hover:border-[#0F3652] hover:bg-linear-to-br
  from-[#F3831C]/20 via-[#F3831C]/10 to-[#F3831C]/30
  min-h-[100px] sm:min-h-[110px] md:min-h-[120px] lg:h-26.5
  py-4 sm:py-6 md:py-7 lg:py-9 px-2 sm:px-3 rounded-lg flex flex-col
  items-center justify-center text-center transition-all duration-300
  border-[#0F3652] cursor-pointer"
              >
                {stat.badge && (
                  <div className="absolute -top-1 -left-4 ">
                    <div className="relative inline-block">
                      <svg
                        className="absolute top-1 -left-[12px] w-5 h-5 text-[#F3831C]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <line x1="12" y1="5" x2="9" y2="2" />
                        <line x1="8" y1="8" x2="4" y2="6" />
                        <line x1="10" y1="12" x2="6" y2="14" />
                      </svg>

                      <div className="bg-[#F3831C] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rotate-[-28deg] rounded shadow">
                        {stat.badge}
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`text-base sm:text-lg md:text-xl font-bold mb-1 text-[#0F3652]
      ${stat.lineBreak === "sm"
                      ? "whitespace-pre-line md:whitespace-normal"
                      : "whitespace-normal lg:whitespace-pre-line"
                    }`}
                >
                  {stat.display}
                </div>

                {stat.show == "true" && (
                  <h4 className="text-xs sm:text-sm md:text-base font-normal text-[#0F3652] leading-tight">
                    {stat.title}
                  </h4>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-linear-to-r from-[#F3831C] via-[#F3831C]/80 to-[#F3831C]/60 rounded-b-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {location.pathname != "/" && (
        <div className="mt-8 md:mt-10 lg:mt-12 px-4">
          <Suspense fallback={null}>
            <CfeJoinDialog
              title={formtitle}
              subtitle={formsubtitle}
              course={formcourse}
              buttonlabel={formbuttonlabel}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default CourseAboutH1;
