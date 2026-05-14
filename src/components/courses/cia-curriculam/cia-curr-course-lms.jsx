import React from "react";
import CourseLms from "../common/course-lms";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENROLL_URL, IMAGE_PATH } from "@/api/base-url";

const CiaCurrCourseLms = ({ image }) => {
  const courseFeatures = [
    {
      title: "Customized Study Material",
      description:
        "AIA provides updated Becker CIA study material (2026), aligned with the latest IIA syllabus to support structured and exam-focused preparation across all three CIA parts.",
    },
    {
      title: "Practice Questions",
      description:
        "Candidates receive access to Becker’s CIA practice software, featuring exam-style questions that strengthen conceptual understanding and application-based thinking.",
    },
    {
      title: "Training Sessions",
      description:
        "Get 60+ hours of detailed recorded video lectures by Puneet Sir, enabling flexible, self-paced learning while simplifying complex concepts through clear, structured explanations.",
    },
    {
      title: "Live Query Session",
      description:
        "Attend weekly live query sessions with experienced industry faculty to clarify doubts, interact with peers, and gain practical insights that strengthen conceptual clarity and real-world understanding.",
    },
    {
      title: "Time Frame",
      description:
        "Each CIA part typically requires 2–3 months of focused preparation depending on prior knowledge and time commitment. Faster progress is possible with consistent study.",
    },
    {
      title: "Mock Test",
      description:
        "Comprehensive CIA mock tests are conducted after syllabus completion to assess readiness and improve exam confidence.",
    },
    {
      title: "Exam Registration Support",
      description:
        "We offer complete support throughout the exam registration process, guiding you step by step from application review to final exam scheduling, ensuring a smooth and stress-free experience.",
    },
    {
      title: "Regular Updates",
      description:
        "All study resources are regularly reviewed and updated in line with the latest IIA CIA syllabus and exam expectations to ensure relevant preparation.",
    },
  ];

  return (
    <>
      <CourseLms
        cardTitle="AIA CIA Prep Course - What you will get"
        description={
          <span>
            We provide globally trusted Official <b> Becker </b>
            <b> Gleim </b>
            study materials for CIA prep to ensure exam-focused learning
            experience for professionals.
          </span>
        }
        courseFeatures={courseFeatures}
        image={image}
      />

      <div className="flex justify-center gap-2">
        <CfeJoinDialog
          title="Join AiA CIA LMS"
          subtitle="Online Training and Certification Course"
          course="CIA"
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

export default CiaCurrCourseLms;
