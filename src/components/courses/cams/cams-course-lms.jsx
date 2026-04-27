import React from "react";
import CourseLms from "../common/course-lms";
import { Button } from "@/components/ui/button";
import { ENROLL_URL } from "@/api/base-url";
import { Link } from "react-router-dom";
import CfeJoinDialog from "../cfe-curriculam/join-prep";

const CamsCourseLms = ({ title, subtitle, course, buttonlabel, image }) => {
  const courseFeatures = [
    {
      title: "CAMS Version 7 Concise Study Notes",
      description:
        "At AIA, we provide carefully curated study notes that simplify your preparation, keeping it well-structured and helping you quickly understand key concepts without feeling overwhelmed.",
    },
    {
      title: "Practice Questions",
      description:
        "Get access to 1,000+ CAMS practice questions with correct answers and clear explanations. These questions help you test your understanding and prepare confidently for the actual exam format.",
    },
    {
      title: "Recorded Video Lectures",
      description:
        "Access 40+ hours of detailed video lectures covering the complete updated CAMS syllabus. Each session explains concepts clearly and helps make your learning more effective and easier to follow.",
    },
    {
      title: "Full-Length Mock Test",
      description:
        "Once you complete your preparation, attempt full-length mock tests designed to reflect the real CAMS exam pattern. This helps you assess your readiness and fine-tune your exam strategy.",
    },
    {
      title: "End-to-End CAMS Exam Registration Support",
      description:
        "The ACAMS registration process can be confusing. Our team supports you at every step, from application to exam registration, so you can focus fully on your preparation.",
    },
    {
      title: "Updated Study Material",
      description:
        "All study materials are regularly reviewed and updated to match the latest CAMS Version 7 syllabus and regulatory guidelines, ensuring your preparation stays current and relevant.",
    },
    {
      title: "Course Fee",
      description:
        "The CAMS program is offered under a single, consolidated course fee. This includes comprehensive study notes, practice questions, recorded lectures, live doubt sessions, and full-length mock tests.",
    },
    {
      title: "Study Timeframe",
      description:
        "The CAMS Exam typically requires 3-4 months of focused preparation, depending on professional background and time commitment. Faster completion is possible with disciplined study.",
    },
  ];
  return (
    <>
      <CourseLms
        cardTitle="What’s Included in the AIA CAMS Prep Course ?"
        courseFeatures={courseFeatures}
        image={image}
      />

      <div className="flex justify-center gap-2">
        <CfeJoinDialog
          title={title}
          subtitle={subtitle}
          course={course || "CFE"}
          buttonlabel={buttonlabel || "Talk to Us"}
        />

        <Button
          className="
              bg-[#F3831C] text-white
              px-6 py-2.5 rounded-none
              font-semibold
              hover:bg-[#F3831C]/90
              transition-all
          cursor-pointer
            "
        >
          <Link to={`${ENROLL_URL}`} target="_blank" rel="noopener noreferrer">
            Enroll Now
          </Link>
        </Button>
      </div>
    </>
  );
};

export default CamsCourseLms;
