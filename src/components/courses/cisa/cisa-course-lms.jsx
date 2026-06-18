import React, { useState } from "react";
import CourseLms from "../common/course-lms";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENROLL_URL, IMAGE_PATH } from "@/api/base-url";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CisaCourseLms = ({ image = "lms_CIA.webp" }) => {
  const [activeKitTab, setActiveKitTab] = useState(0);

  const exclusiveFeatures = [
    {
      title: "Short Study Notes",
      description:
        "You get 200 pages of concise, exam-focused study notes curated by AIA’s expert faculty. These notes are designed with everything you need to crack the CISA exam. Hard books are delivered directly to your doorstep, so you can study comfortably offline as well.",
    },
    {
      title: "LMS (Learning Management System)",
      description:
        "AIA’s LMS makes CISA prep simple and seamless - Study Notes, Video lectures, all in one place. Compatible with all devices. You’ll get full access to the AIA LMS for 6 months, so you can revise at your own pace.",
    },
    {
      title: "Video Lectures",
      description:
        "Online access to the recorded version of live classes will be provided to clear the concepts mentioned in the notes. Total recorded classes of more than 50 hrs will be provided, so you can view them at your own pace.",
    },
    {
      title: "Instant Doubt Sessions",
      description:
        "Got any doubt? Don't wait for the next class. Share your query directly with AIA's expert faculty on WhatsApp and get it resolved - quickly, clearly, and personally. Just real answers from real experts.",
    },
    {
      title: "Examination Enrollment Support",
      description:
        "AIA helps you with complete CISA exam registration support, including ISACA account guidance, exam scheduling assistance, and step-by-step support to make the registration process simple, smooth, and stress-free for aspirants.",
    },
    {
      title: "Exam Distractors",
      description:
        "Practice with 500+ exam-oriented distractors designed to improve analytical thinking, strengthen decision making, and prepare students for tricky CISA Exam scenarios. These will train you to handle the trickiest question types on the actual exam.",
    },
  ];

  const officialPrepKitFeatures = [
    {
      title: "CISA Official Review Manual",
      description:
        "You will get access to 500 pages of ISACA’s official CISA Review Manual covering all exam domains with structured concepts, updated content, and exam-focused explanations to support effective learning, revision, and preparation.",
    },
    {
      title: "Question Answer Explanation (QAE) Database",
      description:
        "Practice with 1000+ CISA-style questions through the QAE Database, designed to improve conceptual understanding, analytical thinking, and familiarity with the actual exam pattern & question approach.",
    },
    {
      title: "Flash Cards",
      description:
        "Strengthen retention with the interactive Game Centre featuring 7 learning games along with 200+ flash cards designed for quick revision, concept reinforcement, and more engaging CISA exam preparation.",
    },
    {
      title: "Exam Registration Fees",
      description:
        "Receive guidance and support for the CISA exam registration process, along with ISACA exam registration fee benefits available through the official learning kit of ISACA.",
    },
    {
      title: "Mock Exams",
      description:
        "Get access to attempt 3 full-length mock exams covering 900 knowledge points with 150 exam-pattern questions within a 4-hour format to help evaluate preparation, identify gaps, and improve time management.",
    },
  ];

  const nextSlide = () => {
    setActiveKitTab((prev) => (prev + 1) % officialPrepKitFeatures.length);
  };

  const prevSlide = () => {
    setActiveKitTab((prev) => (prev - 1 + officialPrepKitFeatures.length) % officialPrepKitFeatures.length);
  };

  const currentFeature = officialPrepKitFeatures[activeKitTab];
  const prevIndex = (activeKitTab - 1 + officialPrepKitFeatures.length) % officialPrepKitFeatures.length;
  const nextIndex = (activeKitTab + 1) % officialPrepKitFeatures.length;

  return (
    <>
      <CourseLms
        cardTitle="What's Included in the AIA CISA Exclusive Study Resources"
        description={
          <>
            AIA provides comprehensive CISA exclusive study resources, combining structured 
            learning materials, expert guidance, and exam practice resources.
          </>
        }
        courseFeatures={exclusiveFeatures}
        image={image}
        gridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:mt-10"
      />

      {/* Official CISA Prep Kit of ISACA Slider Section */}
      <section className="py-16 px-4 bg-slate-50/50 border-t border-b border-[#F3831C]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Official CISA Prep Kit of ISACA"
            description="Prepare with official materials from ISACA. Get full access to the official prep kit and resources to ensure you are learning from the authoritative source."
            align="center"
          />

          <div className="relative mt-12 flex items-center justify-center gap-4 sm:gap-6 md:gap-10">
            {/* Left circular number switch */}
            <button
              onClick={prevSlide}
              className="hidden sm:flex shrink-0 w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full border-2 border-[#56C596] hover:bg-[#56C596]/10 text-[#56C596] font-bold text-lg transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              {prevIndex + 1}
            </button>

            {/* Central Card container */}
            <div className="w-full max-w-4xl bg-white border border-[#0F3652]/10 rounded-[32px] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8 min-h-[360px] transition-all duration-300">
              <div className="flex-1 space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#56C596] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {activeKitTab + 1}
                  </div>
                  <span className="text-[#56C596] font-bold text-sm uppercase tracking-widest">
                    Prep Resource
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F3652] leading-tight">
                  {currentFeature.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  {currentFeature.description}
                </p>
              </div>

              {/* Card Right column (Image Mockup) */}
              <div className="w-full md:w-2/5 flex justify-center">
                <img
                  src={`${IMAGE_PATH}/lms_CIA.webp`}
                  alt={currentFeature.title}
                  className="max-h-56 object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Right circular number switch */}
            <button
              onClick={nextSlide}
              className="hidden sm:flex shrink-0 w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full border-2 border-[#EC709B] hover:bg-[#EC709B]/10 text-[#EC709B] font-bold text-lg transition-all cursor-pointer"
              aria-label="Next slide"
            >
              {nextIndex + 1}
            </button>
          </div>

          {/* Mobile navigation controls */}
          <div className="flex sm:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#0F3652]" />
            </button>
            <span className="flex items-center font-bold text-sm text-[#0F3652]">
              {activeKitTab + 1} / {officialPrepKitFeatures.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#0F3652]" />
            </button>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {officialPrepKitFeatures.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveKitTab(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  idx === activeKitTab ? "bg-[#F3831C] scale-120" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4">
        <CfeJoinDialog
          title="Know more about AIA CISA prep course"
          subtitle="Online Training and Certification Course"
          course="CISA"
          buttonlabel="Talk to Us"
        />
        <Button
          className="
              bg-[#F3831C] text-white
              px-6 py-2.5 rounded-none
              font-semibold
              hover:bg-[#F3831C]/90
              transition-all
              cursor-pointer
              w-full sm:w-auto
            "
        >
          <Link to={`${ENROLL_URL}`} target="_blank" rel="noopener noreferrer" className="w-full text-center">
            Enroll Now
          </Link>
        </Button>
      </div>
    </>
  );
};

export default CisaCourseLms;
