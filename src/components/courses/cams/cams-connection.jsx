import { IMAGE_PATH } from "@/api/base-url";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getLinkTitle } from "@/utils/seoTitles";
import {
  BadgeDollarSign,
  ClipboardCheck,
  FileCheck2,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
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
    badgeBg: "#8cd9eb",
    badgePos: "left-[80.6%] top-[49.8%] w-[17.2%]",
    accentColor: "#0284c7",
    Icon: SearchCheck,
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
    badgeBg: "#f5cba5",
    badgePos: "left-[80.6%] top-[49.8%] w-[17.2%]",
    accentColor: "#ea580c",
    Icon: ClipboardCheck,
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
    badgeBg: "#c5f5bc",
    badgePos: "left-[80.6%] top-[47.1%] w-[17.4%]",
    accentColor: "#16a34a",
    Icon: FileCheck2,
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
    badgeBg: "#f7d265",
    badgePos: "left-[80.6%] top-[49.8%] w-[17.2%]",
    accentColor: "#ca8a04",
    Icon: BadgeDollarSign,
  },
  cisa: {
    title: "CISA",
    subtitle: "(Certified Information Systems Auditor)",
    lead: "Looking to advance your career in IT audit or risk?",
    description:
      "CISA is a globally recognized credential that validates your expertise in information systems auditing, IT controls, governance, risk, and security, helping you strengthen your professional credibility and advance in technology-focused roles.",
    link: "/cisa",
    bgImage: "/images/course-choice-cards/bg_hiw_cisa.webp",
    themeColor: "#e2d5f8",
    badgeBg: "#cbb8f0",
    badgePos: "left-[80.6%] top-[49.8%] w-[17.2%]",
    accentColor: "#9333ea",
    Icon: ShieldCheck,
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
            } gap-4 md:gap-6 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 justify-items-center`}
          >
            {images.map((item, index) => {
              const isLast = index === images.length - 1;
              const isOdd = images.length % 2 !== 0;
              const courseKey = getCourseKey(item);
              const course = courseKey ? COURSE_DETAILS[courseKey] : null;
              const targetLink = (item.link || (course ? course.link : "#")).replace(/\/+$/, "");

              // If course metadata is available, render original card design with crawlable HTML text, links & crisp SVG icon
              if (course) {
                const linkTitle = getLinkTitle(targetLink) || `Learn more about ${course.title}`;
                const CourseIcon = course.Icon;
                return (
                  <article
                    key={index}
                    className={`
                      relative overflow-hidden rounded-2xl group flex flex-col w-full max-w-[380px] lg:max-w-none shadow-[0_4px_20px_rgba(15,54,82,0.07)] hover:shadow-[0_10px_28px_rgba(15,54,82,0.12)] transition-all duration-300
                      ${isLast && isOdd ? "sm:col-span-2 lg:col-span-1" : ""}
                    `}
                  >
                    {/* Original clean background design image */}
                    <img
                      src={course.bgImage}
                      alt={`${course.title} ${course.subtitle} certification card`}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01] pointer-events-none select-none"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Crisp vector icon badge aligned to each card's exact baked-in circle coordinates */}
                    <div
                      className={`absolute ${course.badgePos} -translate-y-1/2 aspect-square rounded-full border-[4px] border-white shadow-sm flex items-center justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105`}
                      style={{ backgroundColor: course.badgeBg }}
                      aria-hidden="true"
                    >
                      <CourseIcon
                        className="w-[52%] h-[52%] text-white"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Real HTML Content Layer inside White Card boundaries */}
                    <div className="absolute top-[22%] left-[7.5%] w-[69.5%] h-[52.5%] flex flex-col justify-start overflow-hidden pointer-events-auto">
                      {/* Course Name Title with Internal Link (padded away from top-left dog-ear fold) */}
                      <h3 className="text-center pl-4 pr-1 font-bold text-[15px] sm:text-[17px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-[#0F3652] tracking-tight leading-tight">
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
                      <p className="text-center pl-4 pr-1 text-[9.5px] sm:text-[10.5px] lg:text-[8.5px] xl:text-[9.5px] 2xl:text-[10.5px] text-gray-600 font-medium mt-0.5 leading-tight">
                        {course.subtitle}
                      </p>

                      {/* Styled Divider with Ring matching course accent color */}
                      <div className="flex items-center w-full my-1.5 lg:my-1 xl:my-1.5 shrink-0" aria-hidden="true">
                        <span
                          className="w-2 h-2 rounded-full border-2 shrink-0 bg-white"
                          style={{ borderColor: course.accentColor || course.themeColor }}
                        />
                        <div
                          className="h-[1.5px] flex-1 rounded-full"
                          style={{ backgroundColor: course.accentColor || course.themeColor }}
                        />
                      </div>

                      {/* Lead Prompt Hook in Bold Italic */}
                      <p className="text-[10px] sm:text-[11.5px] lg:text-[9.5px] xl:text-[10.5px] 2xl:text-[11.5px] font-semibold italic text-gray-900 leading-[1.28]">
                        {course.lead}
                      </p>

                      {/* Full Descriptive Content — sized cleanly so all lines fit without truncation */}
                      <p className="text-[9px] sm:text-[10px] lg:text-[8.5px] xl:text-[9.5px] 2xl:text-[10.5px] text-gray-600 leading-[1.3] mt-1">
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
                        className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-full shadow-sm text-gray-900 transition-all duration-300 hover:shadow-md hover:opacity-90 whitespace-nowrap cursor-pointer group-hover:scale-105"
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
