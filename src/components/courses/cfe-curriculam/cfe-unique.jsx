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

const CfeUnique = () => {
  return (
    <>
      <CourseUnique
        badgeText="WHAT MAKES US UNIQUE"
        heading="Why AIA is the Preferred Choice for "
        highlight="Professionals"
        description=""
        services={[
          {
            icon: <Users className="w-6 h-6" />,
            secondaryIcon: (
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
            ),
            title: "Expert-Curated CFE Study Material",
            description:
              "AIA simplifies CFE prep with exam-focused <strong>250-pages concrete notes that cover relevant and up-to-date concepts only,</strong> helping professionals study effectively.",
            position: "left",
          },
          {
            icon: <Building2 className="w-6 h-6" />,
            secondaryIcon: (
              <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
            ),
            title: "Structured & Practical Fraud-Focused Learning",
            description:
              "Our CFE prep follows a clear, structured learning path built around practical fraud scenarios. Each concept is explain learners how fraud actually occurs in depth. about how fraud actually occurs.",
            position: "left",
          },
          {
            icon: <Handshake className="w-6 h-6" />,
            secondaryIcon: (
              <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
            ),
            title: "Live Interactive Sessions with Faculty",
            description:
              "AIA conducts live sessions where learners can actively address their queries and get a chance to gain insights from experienced fellow professionals from different industries.",
            position: "left",
          },
          {
            icon: <ShoppingBag className="w-6 h-6" />,
            secondaryIcon: (
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
            ),
            title: "Mentorship & Enrolment Support",
            description:
              "From CFE registration guidance to final exam readiness, we support learners at every stage. At AIA, we simplify the ACFE enrolment process and ensure a smooth journey.",
            position: "right",
          },
          {
            icon: <Award className="w-6 h-6" />,
            secondaryIcon: (
              <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
            ),
            title: "Proven Exam-Oriented Training Methodology",
            description:
              "<strong>Our training aligns with the latest 2026 CFE exam framework </strong> & fraud risk practices, explaining concepts from a fraudster’s perspective for practical understanding.",
            position: "right",
          },
          {
            icon: <Calendar className="w-6 h-6" />,
            secondaryIcon: (
              <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
            ),
            title: "Trusted by Professionals From Different Domains",
            description:
              "Professionals from different fields trust AIA because we respect their time, understand real-world challenges & consistently deliver clarity, confidence & exam results.",
            position: "right",
          },
        ]}
      />
    </>
  );
};

export default CfeUnique;
