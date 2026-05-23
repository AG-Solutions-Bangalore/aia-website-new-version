import React from "react";
import {
  Users,
  Calendar,
  Award,
  Building2,
  Handshake,
  ShoppingBag,
  Sparkles,
  CheckCircle,
  Star,
} from "lucide-react";
import CourseUnique from "../common/course-unique";

const CfeCurrUnique = () => {
  return (
    <CourseUnique
      badgeText="WHAT MAKES US UNIQUE"
      heading="Why AIA is the Preferred Choice for "
      highlight="Professionals"
      description="Because we go beyond just training - we provide a complete support system to ensure your success."
      services={[
        {
          icon: <Users className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Becker Software Access",
          description:
            "Get access to Becker's official software for CIA Prep with practice questions, flashcards, and mock tests for effective exam preparation. AIA is India's one and only authorized Becker distributor.",
          position: "left",
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "AIA Short Notes",
          description:
            "Receive exclusive access to AIA CIA Short Notes, available only with AIA worldwide. These 250+ page notes are designed for faster revision and delivered as a hard copy to your doorstep.",
          position: "left",
        },
        {
          icon: <Handshake className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "60+ hours Video Lectures",
          description:
            "Access 60+ hours of recorded video lectures covering all CIA topics in a clear and structured format for better conceptual understanding.",
          position: "left",
        },
        {
          icon: <ShoppingBag className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "400+ Exam Distractors",
          description:
            "Practice with 400+ exam-focused distractors designed to improve concept clarity, analytical thinking, and confidence for difficult CIA questions.",
          position: "right",
        },
        {
          icon: <Award className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Exam Registration Support",
          description:
            "Get complete assistance for CIA exam registration, from the application process to final scheduling for a smooth experience.",
          position: "right",
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Live Doubt Session with Faculty",
          description:
            "Join live doubt-solving sessions with expert faculty to clarify concepts, ask questions, and strengthen your preparation.",
          position: "right",
        },
      ]}
      lastText="Join AIA and experience audit training that's practical, personal, and proven."
    />
  );
};

export default CfeCurrUnique;
