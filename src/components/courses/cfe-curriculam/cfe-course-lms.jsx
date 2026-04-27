import React from "react";
import CourseLms from "../common/course-lms";
import CfeJoinDialog from "./join-prep";
import { Button } from "@/components/ui/button";
import { ENROLL_URL } from "@/api/base-url";
import { Link } from "react-router-dom";

const CfeCourseLms = ({ title, subtitle, course, buttonlabel, image }) => {
  const courseFeatures = [
    {
      title: "CFE Personalised Study Material",
      description:
        "AIA provides concise, exam-focused study notes distilled from the extensive 2000 pages manual into 250 pages. This will help you cover key concepts efficiently & 10x advance your prep from others.",
    },
    {
      title: "Practice Questions",
      description:
        "Access 1,500+ CFE practice questions on AIA LMS with answers and detailed explanations. This will test your understanding and build confidence by closely matching the actual exam format.",
    },
    {
      title: "Recorded Video Lectures",
      description:
        "Get 60+ hours of detailed recorded video lectures by Puneet Sir, enabling flexible, self-paced learning while simplifying complex concepts through clear, structured explanations.",
    },
    {
      title: "Live Query Sessions",
      description:
        "Attend weekly live query sessions with experienced industry faculty to clarify doubts, interact with peers, and gain practical insights that strengthen conceptual clarity and real-world fraud understanding.",
    },
    {
      title: "Expert-curated Flash Cards.",
      description:
        "We’ve created 400+ easy-to-use flashcards to help learners revise key fraud concepts and definitions faster, making last-minute revision more focused, effective, and easier to retain.",
    },
    // {
    //   title: "Time Frame",
    //   description:
    //     "With a structured study plan and focused preparation, you can complete all four CFE modules in approximately 30 days by dedicating one week per module, subject to study time availability.",
    // },
    {
      title: "6 Full-Length Mock Tests",
      description:
        "Attempt six full-length mock tests, two per module, designed to simulate the real CFE exam environment, which helps to improve time management and refine exam strategy.",
    },
    {
      title: "CFE Exam Registration Support",
      description:
        "We offer complete support throughout the CFE exam registration process, guiding you step by step from application review to final exam scheduling, ensuring a smooth and stress-free experience.",
    },
    {
      title: "CFE Exam Distractors",
      description:
        "Get access to exclusively designed exam distractors, which help you to identify and eliminate exam traps in CFE exam, improving accuracy, & train your mind for better decision-making.",
    },
    // {
    //   title: "Updated Study Material",
    //   description:
    //     "All study content is regularly reviewed and updated to reflect the <strong> 2026 CFE exam structure and syllabus updates,</strong>  ensuring your preparation remains relevant and aligned with exam expectations.",
    // },
  ];
  return (
    <>
      <CourseLms
        cardTitle="What's Included in the AIA CFE Prep Course ?"
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

export default CfeCourseLms;
