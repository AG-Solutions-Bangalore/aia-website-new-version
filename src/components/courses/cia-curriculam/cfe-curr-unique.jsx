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
          title: "Proven Exam-Oriented Training Methodology",
          description:
            "AIA is an officially authorized learning partner of IIA India, supporting a credible and structured CIA learning journey.",
          position: "left",
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Dedicated Support Person",
          description:
            "Get one-on-one guidance throughout your learning journey; we're with you every step of the way.",
          position: "left",
        },
        {
          icon: <Handshake className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Gleim Hard Copy Notes",
          description:
            "Comprehensive and well-structured notes delivered to your doorstep for easy offline study.",
          position: "left",
        },
        {
          icon: <ShoppingBag className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "60+ Hours of Video Lectures",
          description:
            "Learn at your own pace with high-quality, detailed video lectures covering the complete syllabus.",
          position: "right",
        },
        {
          icon: <Award className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Live Sessions with Faculty",
          description:
            "Interact directly with expert faculty members to clarify doubts and deepen your understanding.",
          position: "right",
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "100% Exam Registration Support",
          description:
            "From registration to scheduling your exam, we assist you at every stage of your journey.",
          position: "right",
        },
      ]}
      lastText="Join AIA and experience audit training that’s practical, personal, and proven."
    />
  );
};

export default CfeCurrUnique;
