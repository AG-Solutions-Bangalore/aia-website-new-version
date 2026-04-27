import React from "react";
import CourseWhyAia from "../common/course-why-aia";
import { ENROLL_URL, IMAGE_PATH } from "@/api/base-url";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CiaCurrWhyAia = () => {
  return (
    <div className="md:mb-18">
      <CourseWhyAia
        heading="Key Advantages of AIA CIA 3-Part Prep Course"
        items={[
          {
            img: `${IMAGE_PATH}/teacher-svgrepo-com.webp`,
            title: "CIA Qualified Instructor",
          },
          {
            img: `${IMAGE_PATH}/support-svgrepo-com.webp`,
            title: "Training Support",
          },
          {
            img: `${IMAGE_PATH}/video-record-device-svgrepo-com.webp`,
            title: "Access to Recorded Sessions",
          },
          {
            img: `${IMAGE_PATH}/Learning.webp`,
            title: "IIA India Authorized Learning Partner",
          },
          {
            img: `${IMAGE_PATH}/books-svgrepo-com.webp`,
            title: "2025 Gleim Study Material",
          },
        ]}
      />

      <div className="flex justify-center gap-2 mt-8">
        <CfeJoinDialog
          title="Join AiA CIA LMS"
          subtitle="Online Training and Certification Course"
          course="CIA"
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

export default CiaCurrWhyAia;
