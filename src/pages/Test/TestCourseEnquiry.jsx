import React, { useState } from "react";
import HomeAlumniWork from "@/components/home/home-alumini-work";
import CourseEnquiryForm from "@/components/courses/common/course-enquiry-form";
import CourseEnquiryPopup from "@/components/common/course-enquiry-popup";
import CiaCurrFaq from "@/components/courses/cia-curriculam/cia-curr-faq";
import CfeFaq from "@/components/courses/cfe-curriculam/cfe-faq";
import CiaFaq from "@/components/courses/cia-challenge/cia-faq";
import CisaFaq from "@/components/courses/cisa/cisa-faq";
import CamsFaq from "@/components/courses/cams/cams-faq";

const COURSES = [
  { id: "CIA", label: "CIA" },
  { id: "CFE", label: "CFE" },
  { id: "CIA Challenge", label: "CIA Challenge" },
  { id: "CISA", label: "CISA" },
  { id: "CAMS", label: "CAMS" },
];

export default function TestCourseEnquiry() {
  const [selectedCourse, setSelectedCourse] = useState("CIA");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const renderFaq = () => {
    switch (selectedCourse) {
      case "CFE":
        return <CfeFaq />;
      case "CIA Challenge":
        return <CiaFaq />;
      case "CISA":
        return <CisaFaq />;
      case "CAMS":
        return <CamsFaq />;
      case "CIA":
      default:
        return <CiaCurrFaq />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Test Preview Control Bar */}
      <div className="sticky top-0 z-40 bg-[#0F3652] text-white py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-semibold text-sm sm:text-base">
              Course Enquiry Preview (Test Mode)
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm">
            <span className="text-gray-300 mr-1 hidden sm:inline">Preview Course:</span>
            {COURSES.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedCourse(course.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  selectedCourse === course.id
                    ? "bg-[#F07F17] text-white shadow"
                    : "bg-white/15 text-gray-200 hover:bg-white/25"
                }`}
              >
                {course.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              className="ml-2 px-3.5 py-1.5 rounded-full font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span>✨ Open Pop-up Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Alumni Logos Section (HomeAlumniWork) */}
      <HomeAlumniWork />

      {/* 2. New Contact Enquiry Form Section */}
      <CourseEnquiryForm course={selectedCourse} />

      {/* 3. FAQ Section */}
      {renderFaq()}

      {/* 4. New Course Enquiry Pop-up (automatically comes after 3 seconds) */}
      <CourseEnquiryPopup
        key={selectedCourse}
        course={selectedCourse}
        open={isPopupOpen}
        onOpenChange={setIsPopupOpen}
        autoTrigger={true}
        delayMs={3000}
      />
    </div>
  );
}
