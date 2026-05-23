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

const CiaUnique = () => {
  return (
    <CourseUnique
      badgeText="WHAT MAKES US UNIQUE"
      heading="Why AIA is the Preferred Choice for CIA Prep"
      description="Because at AIA, we provide a complete support system to ensure your success."
      services={[
        {
          icon: <Users className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Becker Software Access",
          description:
            "Get access to Becker's official software, including practice questions, and exam-focused tools designed to strengthen preparation. As India's one and only authorized Becker distributor, AIA ensures authentic and globally trusted study resources.",
          position: "left",
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "AIA Short Notes",
          description:
            "Receive AIA's exclusive CIA Challenge Short Notes, specially designed for quick revision and concept clarity. These comprehensive notes simplify key concepts and are delivered as a hard copy directly to your doorstep.",
          position: "left",
        },
        {
          icon: <Handshake className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "300+ Flash Cards",
          description:
            "Access 300+ exam-focused flash cards designed for quick recall, better retention, and faster revision of important CIA concepts to strengthen exam preparation.",
          position: "left",
        },
        {
          icon: <ShoppingBag className="w-6 h-6" />,
          secondaryIcon: (
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "500+ Exam Distractors",
          description:
            "Practice with 500+ exam-oriented distractors designed to improve analytical thinking, concept application, and confidence for handling tricky CIA challenge exam questions.",
          position: "right",
        },
        {
          icon: <Award className="w-6 h-6" />,
          secondaryIcon: (
            <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Recorded Video Lectures",
          description:
            "Get access to detailed recorded video lectures covering all CIA challenge exam topics in a clear, structured, and easy-to-understand format for flexible learning anytime, anywhere.",
          position: "right",
        },
        {
          icon: <Calendar className="w-6 h-6" />,
          secondaryIcon: (
            <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />
          ),
          title: "Live Doubt Sessions",
          description:
            "Join live doubt-solving sessions with expert faculty to clarify concepts, ask questions, and strengthen understanding through guided discussions and expert support.",
          position: "right",
        },
      ]}
      lastText="Join AIA and experience audit training that's practical, personal, and proven."
    />
  );
};

export default CiaUnique;
