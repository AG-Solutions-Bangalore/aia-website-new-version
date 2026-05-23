import React from "react";
import CourseLms from "../common/course-lms";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENROLL_URL } from "@/api/base-url";

const CiaCurrCourseLms = ({ image }) => {
  const courseFeatures = [
    {
      title: "Becker Software Access",
      description:
        "Get access to Becker's official software for CIA prep, including practice questions, flashcards, mock tests, and performance tracking tools designed to strengthen exam preparation. As AIA is India's one and only authorized Becker distributor, we ensure students receive official, and reliable study resources for structured CIA learning.",
    },
    {
      title: "AIA CIA Short Notes",
      description:
        "AIA provides exclusive access to CIA Short Notes, a unique learning resource available only with AIA worldwide. These comprehensive 250+ page notes are designed for faster revision and concept clarity and are also delivered as a hard copy directly to your doorstep.",
    },
    {
      title: "60+ Hours of Recorded Video Classes",
      description:
        "AIA's CIA Prep Course includes detailed 60+ hours of recorded video lectures based on AIA Short Notes, where the faculty explains every topic in a clear and structured manner. Students can learn at their own pace while strengthening conceptual understanding for all CIA parts.",
    },
    {
      title: "Live Query Session with Faculty",
      description:
        "Learners can attend weekly live query sessions with experienced faculty to clarify doubts, interact with peers, and gain practical insights. These sessions help strengthen conceptual understanding and improve confidence through guided discussion and expert support.",
    },
    {
      title: "400+ Exam Distractors",
      description:
        "AIA provides 400+ exam-oriented distractors specially designed to strengthen analytical thinking and concept application for CIA exam. These practice-based questions help students understand exam patterns, improve decision-making, and prepare effectively for challenging CIA exam scenarios.",
    },
    {
      title: "Exam Registration Support",
      description:
        "At AIA we provide complete support for CIA exam registration, guiding students step by step through the entire process. From application assistance to exam scheduling, AIA ensures a smooth, hassle-free, and well-supported registration experience.",
    },
    {
      title: "LMS (Learning Management System)",
      description:
        "Get access to AIA's dedicated Learning Management System (LMS), where students can conveniently access study resources, recorded lectures, practice material, and important updates in one place. The platform ensures a smooth and organized learning experience throughout your CIA preparation.",
    },
    {
      title: "Prep Program Duration",
      description:
        "Each CIA part typically requires 2-3 months of focused preparation, depending on prior knowledge and study consistency. AIA provides a structured learning approach to help students effectively manage their preparation and progress confidently toward exam success.",
    },
  ];

  return (
    <>
      <CourseLms
        cardTitle="AIA CIA Prep Course - What you will get"
        description={
          <span>
            We provide globally trusted Official <b> Becker </b> and
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
