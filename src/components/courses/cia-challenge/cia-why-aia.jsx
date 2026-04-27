import React from "react";
import CourseWhyAia from "../common/course-why-aia";
import { ENROLL_URL, IMAGE_PATH } from "@/api/base-url";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CiaWhyAia = () => {
  return (
    <div className="md:mb-18">
      <CourseWhyAia
        heading="Key Advantages of AIA CIA Challenge Prep Course"
        items={[
          {
            img: `${IMAGE_PATH}/teacher-svgrepo-com.webp`,
            title: "Gliem Software Access",
          },
          {
            img: `${IMAGE_PATH}/flash_card.webp`,
            title: "Expert Curated Flash Cards",
          },
          {
            img: `${IMAGE_PATH}/video-record-device-svgrepo-com.webp`,
            title: "Exam Enrolment Support",
          },
          {
            img: `${IMAGE_PATH}/exam_distractors.webp`,
            title: "Exclusive Exam Distractors ",
          },
          {
            img: `${IMAGE_PATH}/books-svgrepo-com.webp`,
            title: "IIA India Authorized Learning Partner",
          },
        ]}
      />

      <div className="flex justify-center gap-2 mt-8">
        <CfeJoinDialog
          title="Join AiA CIA LMS"
          subtitle="Online Training and Certification Course"
          course="CIAC"
          buttonlabel="Let's Connect"
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
    </div>
  );
};

export default CiaWhyAia;
