import React from "react";
import CourseWhyAia from "../common/course-why-aia";
import { ENROLL_URL, IMAGE_PATH } from "@/api/base-url";
import CfeJoinDialog from "./join-prep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CfeWhyAia = () => {
  return (
    <div className="md:mb-18">
      <CourseWhyAia
        heading="Key Advantages of AIA CFE Prep Course"
        items={[
          {
            img: `${IMAGE_PATH}/flash_card.webp`,
            title: "400+ Flash Cards",
          },
          {
            img: `${IMAGE_PATH}/support-svgrepo-com.webp`,
            title: "Complete Prep Support",
          },
          {
            img: `${IMAGE_PATH}/video-record-device-svgrepo-com.webp`,
            title: "Recorded Detailed Video Sessions",
          },
          {
            img: `${IMAGE_PATH}/exam_distractors.webp`,
            title: "Exclusive Exam Distractors",
          },
          {
            img: `${IMAGE_PATH}/books-svgrepo-com.webp`,
            title: "2026 Updated CFE Material",
          },
        ]}
      />

      <div className="flex justify-center gap-2 mt-8">
        <CfeJoinDialog course="CFE" buttonlabel="Let's Connect" />

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

export default CfeWhyAia;
