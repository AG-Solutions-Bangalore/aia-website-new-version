import React from "react";
import CourseWhyAia from "../common/course-why-aia";
import { ENROLL_URL, IMAGE_PATH } from "@/api/base-url";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CisaWhyAia = () => {
  return (
    <div className="md:mb-18">
      <CourseWhyAia
        heading="What Makes AIA's CISA Prep Stand Apart"
        items={[
          {
            img: `${IMAGE_PATH}/ISACA.webp`,
            title: "ISACA ATP Logo",
          },
          {
            img: `${IMAGE_PATH}/teacher-svgrepo-com.webp`,
            title: "APMG Authorised Trainer",
          },
          {
            img: `${IMAGE_PATH}/new_logo.webp`,
            title: "AIA Short Notes & Distractors",
          },
          {
            img: `${IMAGE_PATH}/flash_card.webp`,
            title: "Official ISACA Study Resources",
          },
          {
            img: `${IMAGE_PATH}/support-svgrepo-com.webp`,
            title: "Instant Doubt-Solving Support",
          },
        ]}
      />

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4">
        <CfeJoinDialog
          title="Know more about AIA CISA prep course"
          subtitle="Online Training and Certification Course"
          course="CISA"
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
              w-full sm:w-auto
            "
        >
          <Link to={`${ENROLL_URL}`} target="_blank" rel="noopener noreferrer" className="w-full text-center">
            Enroll Now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CisaWhyAia;
