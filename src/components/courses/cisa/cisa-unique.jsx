import React from "react";
import {
  Users,
  Calendar,
  Award,
  BookOpen,
  Handshake,
  Layers,
  Sparkles,
  CheckCircle,
  Star,
  MessageSquare,
  HeartHandshake
} from "lucide-react";
import CourseUnique from "../common/course-unique";

const CisaUnique = () => {
  return (
    <CourseUnique
      badgeText="WHY AIA"
      heading="Why AIA is the Preferred Choice for CISA Prep"
      description="We provide a complete support system to ensure your success in CISA certification."
      services={[
        {
          icon: <Award className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "ISACA Authorised Training Organisation",
          description:
            "AIA is officially recognised by ISACA to deliver CISA preparation. Every session, every resource, and every concept is aligned to ISACA's global exam standards, so you prepare with full confidence.",
          position: "left",
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "ISACA Official Prep Kit",
          description:
            "Get access to ISACA's official practice questions and study guides. AIA provides the complete ISACA resources kit, including exclusive resources for CISA prep. Everything you need to prepare is in one place.",
          position: "left",
        },
        {
          icon: <Layers className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Structured & Exam-Aligned Curriculum",
          description:
            "AIA's CISA prep follows a clear, domain-wise learning path built around what the CISA exam actually tests. Each concept is explained with a real-world IS audit context.",
          position: "left",
        },
        {
          icon: <Users className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Expert-Led Teaching Methodology",
          description:
            "Our preparation is led by Puneet Garg, an APMG Authorised Trainer with deep expertise in IS audit and governance. Every session is designed to build exam readiness and professional judgement.",
          position: "right",
        },
        {
          icon: <MessageSquare className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Instant Doubt Solving Support with Faculty",
          description:
            "AIA provides instant doubt-solving support where learners can actively address their queries on WhatsApp directly with our expert faculty to resolve doubts quickly.",
          position: "right",
        },
        {
          icon: <HeartHandshake className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Mentorship & Enrolment Support",
          description:
            "From CISA Exam registration guidance to final exam readiness, we support learners at every stage. At AIA, we simplify the ISACA enrolment process and ensure a smooth journey.",
          position: "right",
        },
      ]}
      lastText="Join AIA and experience CISA training that's practical, personal, and proven."
    />
  );
};

export default CisaUnique;
