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

const CamsUnique = () => {
  return (
    <CourseUnique
      badgeText="WHAT MAKES US UNIQUE"
      heading="Why AIA is the Preferred Choice for CAMS Aspirants"
      description=": At AIA, we go beyond just training we provide a complete support system to ensure your success"
      services={[
        {
          icon: <Users className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Concise & Expert-Curated Study Material",
          description:
            "At AIA, we simplify CAMS prep with sharply curated, concise notes. Focused content helps professionals learn faster, revise smarter, and avoid unnecessary overload.",
          position: "left",
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Structured & Practical Learning Approach",
          description:
            "Our program follows a clear flow with real-world examples. Concepts are explained deeply & efficiently for confident understanding, retention, and recall.",
          position: "left",
        },
        {
          icon: <Handshake className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Live Interactive Faculty-Led Sessions",
          description:
            "Engage in live sessions with expert faculty and peers from top industries. Clarify doubts, discuss concepts, and gain insights while building your professional network.",
          position: "left",
        },
        {
          icon: <ShoppingBag className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "100% Mentorship & Exam Assistance",
          description:
            "From CAMS registration to exam day, we guide every step. Complete mentorship ensures a smooth, stress-free journey so learners can focus entirely on preparation.",
          position: "right",
        },
        {
          icon: <Award className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Proven Training Methods",
          description:
            "Our training aligns with current exam patterns and industry practices. Concepts are taught practically, enabling professionals to apply knowledge confidently in real-world scenarios.",
          position: "right",
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Trusted by Professionals Across Roles & Industries",
          description:
            "Working professionals from different domains trust AIA for training that respects their time, addresses challenges, and delivers clarity, confidence, and results.",
          position: "right",
        },
      ]}
    />
  );
};

export default CamsUnique;
