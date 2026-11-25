import { IMAGE_PATH } from "@/api/base-url";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getLinkTitle } from "@/utils/seoTitles";
import React from "react";
import { Link } from "react-router-dom";

// Structured course details dictionary for semantic SEO rendering and crawlability
const COURSE_DETAILS = {
  cfe: {
    title: "CFE",
    subtitle: "(Certified Fraud Examiner)",
    lead: "If uncovering fraud and financial crime excites you.",
    description:
      "Then CFE certification is for YOU, which builds deep expertise in fraud detection, investigation, and prevention, making you the professional organisations rely on to protect their business.",
    link: "/cfe-curriculum",
    bgImage: "/images/course-choice-cards/bg_hiw_cfe.webp",
    themeColor: "#a8e6f3",
    accentColor: "#0284c7",
  },
  cia: {
    title: "CIA",
    subtitle: "(Certified Internal Auditor)",
    lead: "Already an experienced audit or risk professional?",
    description:
      "The CIA 3-Part Program is your pathway to earning the world's most respected internal audit credential, strengthening your expertise across audit, risk, and governance with global recognition.",
    link: "/cia-curriculum",
    bgImage: "/images/course-choice-cards/bg_hiw_cia.webp",
    themeColor: "#fee1c6",
    accentColor: "#ea580c",
  },
  ciac: {
    title: "CIA Challenge",
    subtitle: "(Certified Internal Auditor Challenge)",
    lead: "Already CA, CMA, or any qualified professional, or any individual with 10+ years of experience?",
    description:
      "Then, you are eligible for the CIA Challenge Exam, designed for professionals who want to earn the CIA designation through a single, focused exam without going through all three parts.",
    link: "/cia-challenge-curriculum",
    bgImage: "/images/course-choice-cards/bg_hiw_ciac.webp",
    themeColor: "#e2ffdc",
    accentColor: "#16a34a",
  },
  cams: {
    title: "CAMS",
    subtitle: "(Certified Anti-Money Laundering Specialist)",
    lead: "Working in AML or compliance roles?",
    description:
      "CAMS is the global benchmark certification that validates your expertise in anti-money laundering, financial crime prevention & regulatory compliance across institutions.",
    link: "/cams",
    bgImage: "/images/course-choice-cards/bg_hiw_cams.webp",
    themeColor: "#ffe38f",
    accentColor: "#ca8a04",
  },
  cisa: {
    title: "CISA",
    subtitle: "Certified Information Systems Auditor",
    lead: "Looking to advance your career in IT audit or risk?",
    description:
      "CISA is a globally recognized credential that validates your expertise in information systems auditing, IT controls, governance, risk, and security, helping you strengthen your professional credibility and advance in technology-focused roles.",
    link: "/cisa",
    bgImage: "/images/course-choice-cards/bg_hiw_cisa.webp",
    themeColor: "#e2d5f8",
    accentColor: "#9333ea",
  },
};

const getCourseKey = (item) => {
  const link = (item.link || "").toLowerCase();
  const img = (item.image || "").toLowerCase();
  if (link.includes("cfe") || img.includes("cfe")) return "cfe";
  if (link.includes("challenge") || img.includes("ciac")) return "ciac";
  if (link.includes("cia") || img.includes("cia")) return "cia";
  if (link.includes("cams") || img.includes("cams")) return "cams";
  if (link.includes("cisa") || img.includes("cisa")) return "cisa";
  return null;
};

const CamsConnection = ({
  title,
  highlight1,
  images = [],
  description,
  description1,
  buttonText = "Know More",
  buttonColors = [],
}) => {
  return (
    <section className="py-12 md:py-16 my-4 md:my-8">
      {images.length > 0 && (
        <>
          <div className="px-4">
            <SectionHeading
              title={title || ""}
              highlight1={highlight1 || ""}
              align="center"
              description={description || ""}
              description1={description1 || ""}
            />
          </div>

          <div
            className={`mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 ${
              images.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            } gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center`}
          >
            {images.map((item, index) => {
              const isLast = index === images.length - 1;
              const isOdd = images.length % 2 !== 0;
              const courseKey = getCourseKey(item);
              const course = courseKey ? COURSE_DETAILS[courseKey] : null;
              const targetLink = (item.link || (course ? course.link : "#")).replace(/\/+$/, "");

              // If course metadata is available, render hybrid card with real crawlable HTML text & links
              if (course) {
                const linkTitle = getLinkTitle(targetLink) || `Learn more about ${course.title}`;
                return (
                  <article
                    key={index}
                    className={`
                      relative overflow-hidden rounded-xl group flex flex-col w-full max-w-[340px] shadow-sm hover:shadow-md transition-all duration-300
                      ${isLast && isOdd ? "md:col-span-2 lg:col-span-1" : ""}
                    `}
                  >
                    {/* Clean background design image */}
                    <img
                      src={course.bgImage}
                      alt={`${course.title} ${course.subtitle} certification card`}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01] pointer-events-none select-none"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Real HTML Content Layer inside White Card boundaries */}
                    <div className="absolute top-[20.5%] left-[7.5%] w-[68%] h-[54.5%] flex flex-col justify-start overflow-hidden pointer-events-auto">
                      {/* Course Name Title with Internal Link */}
                      <h3 className="text-center font-bold text-[13px] sm:text-[15px] lg:text-[13px] xl:text-[15px] text-gray-900 tracking-tight leading-tight">
                        <Link
                          to={targetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                          title={linkTitle}
                        >
                          {course.title}
                        </Link>
                      </h3>

                      {/* Subtitle */}
                      <p className="text-center text-[8.5px] sm:text-[9.5px] lg:text-[8.5px] xl:text-[9.5px] text-gray-600 font-medium mt-0.5 leading-tight">
                        {course.subtitle}
                      </p>

                      {/* Styled Divider with Ring matching course accent color */}
                      <div className="flex items-center w-full my-1 flex-shrink-0" aria-hidden="true">
                        <span
                          className="w-2 h-2 rounded-full border-2 flex-shrink-0"
                          style={{
                            borderColor: course.accentColor || course.themeColor,
                            backgroundColor: "#ffffff",
                          }}
                        />
                        <div
                          className="h-[1.5px] flex-1 rounded-full"
                          style={{
                            backgroundColor: course.accentColor || course.themeColor,
                          }}
                        />
                      </div>

                      {/* Lead Prompt Hook in Bold Italic */}
                      <p className="text-[9px] sm:text-[10.5px] lg:text-[9px] xl:text-[10px] font-semibold italic text-gray-900 leading-tight">
                        {course.lead}
                      </p>

                      {/* Full Descriptive Content */}
                      <p className="text-[8px] sm:text-[9px] lg:text-[8px] xl:text-[9px] text-gray-600 leading-[1.25] mt-0.5">
                        {course.description}
                      </p>
                    </div>

                    {/* "Know More" Action Button on the bottom-left flap */}
                    <div className="absolute bottom-[9%] left-[7.5%]">
                      <Link
                        to={targetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={linkTitle}
                        aria-label={`Know more about ${course.title} ${course.subtitle}`}
                        style={{
                          backgroundColor:
                            item.buttonColor || buttonColors[index] || course.themeColor,
                        }}
                        className="inline-flex items-center justify-center px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full shadow-sm text-gray-900 transition-all duration-300 hover:shadow-md hover:opacity-90 whitespace-nowrap cursor-pointer group-hover:scale-105"
                      >
                        {buttonText}
                      </Link>
                    </div>
                  </article>
                );
              }

              // Fallback for generic images without predefined course metadata
              return (
                <article
                  key={index}
                  className={`
                    relative overflow-hidden rounded-xl group flex flex-col w-full max-w-[340px]
                    ${isLast && isOdd ? "md:col-span-2 lg:col-span-1" : ""}
                  `}
                >
                  <img
                    src={`${IMAGE_PATH}/${item.image}`}
                    alt={`Course Card ${index + 1}`}
                    title={`Course Card ${index + 1}`}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  <Link
                    to={targetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={getLinkTitle(targetLink)}
                    style={{
                      backgroundColor:
                        item.buttonColor || buttonColors[index] || "#fee1c6",
                    }}
                    className="absolute bottom-[13%] left-[8%] px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all duration-300 hover:opacity-90 cursor-pointer group-hover:scale-105 whitespace-nowrap"
                  >
                    {buttonText}
                  </Link>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default CamsConnection;
