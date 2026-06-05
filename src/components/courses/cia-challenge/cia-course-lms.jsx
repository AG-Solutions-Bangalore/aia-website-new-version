import React from "react";
import CourseLms from "../common/course-lms";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENROLL_URL } from "@/api/base-url";

const CiaCourseLms = ({ image }) => {
  const courseFeatures = [
    {
      title: "Becker Software Access",
      description:
        "Get access to Becker's official CIA Challenge software, including practice questions, mock tests, and exam-focused learning tools designed to strengthen preparation. As India's one and only authorized Becker distributor, AIA ensures students receive official, authentic, and globally trusted study resources.",
    },
    {
      title: "AIA Short Notes",
      description:
        "Receive exclusive AIA CIA Challenge Short Notes, specially designed for quick revision and better concept clarity. These comprehensive notes simplify important topics and are delivered as a hard copy directly to your doorstep for convenient and effective preparation.",
    },
    {
      title: "500+ Distractors",
      description:
        "Practice with 500+ exam-oriented distractors designed to improve analytical thinking, strengthen concept application, and prepare students for tricky Challenge Exam scenarios. These distractors help build confidence and improve decision-making during the exam.",
    },
    {
      title: "300+ Flashcards",
      description:
        "Access 300+ exam-focused flashcards created for quick revision, better concept retention, and faster recall of important topics. These flashcards help students revise efficiently and strengthen preparation anytime, anywhere.",
    },
    {
      title: "Recorded Video Lectures",
      description:
        "Get access to 50+ hours of detailed recorded video lectures covering important CIA Challenge concepts in a clear and structured format. Students can learn at their own pace while building strong conceptual understanding.",
    },
    {
      title: "Exam Registration Support",
      description:
        "Receive complete support throughout the CIA Challenge exam registration process, from application guidance to final scheduling. AIA ensures a smooth, hassle-free experience by supporting students at every important step.",
    },
    {
      title: "Live Doubt Sessions",
      description:
        "Attend live doubt-solving sessions with experienced faculty to clarify concepts, ask questions, and strengthen understanding. These interactive sessions help students stay confident and focused throughout their preparation journey.",
    },
    {
      title: "LMS (Learning Management System)",
      description:
        "Get access to AIA's dedicated Learning Management System (LMS), where students can conveniently access study resources, recorded lectures, practice material, and important updates in one place. The platform ensures a smooth and organized learning experience throughout your CIA Challenge preparation.",
    },
  ];

  return (
    <>
      <CourseLms
        cardTitle="AIA CIA Challenge Prep Course - What you will get"
        description={
          <>
            We provide globally trusted Official <strong>Becker</strong> and{" "}
            study materials for CIA Challenge prep to ensure exam-focused
            learning experience for professionals.
          </>
        }
        courseFeatures={courseFeatures}
        image={image}
      />

      <div className="flex justify-center gap-2">
        <CfeJoinDialog
          title="Join AiA CIA LMS"
          subtitle="Online Training and Certification Course"
          course="CIAC"
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

export default CiaCourseLms;
