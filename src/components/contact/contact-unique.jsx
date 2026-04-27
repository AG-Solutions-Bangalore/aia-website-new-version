



import React from 'react'
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
import CourseUnique from '../courses/common/course-unique';


const ContactUnique = () => {
  return (

<CourseUnique
  badgeText="WHAT MAKES US UNIQUE"
  heading="Enrollment to"
  highlight="Success"
  button={false}
  description="How AIA Supports You at Every Career Stage"
  services={[
    {
      icon: <Users className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Global Certifications",
      description: "Access internationally recognized certifications that strengthen your professional credibility and unlock global career opportunities.",
      position: "left",
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Expert-Led Guidance",
      description: "Learn from experienced industry professionals and engage with them for doubt-clearing sessions and gain practical insights for real-world responsibilities.",
      position: "left",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Flexible Learning Structure",
      description: "Study anytime, anywhere with a structured LMS, recorded sessions, and resources designed specifically for working professionals managing busy schedules.",
      position: "left",
    },
    
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Exam-Focused Materials",
      description: "Get expert curated study content, recorded lectures & live doubt sessions, and revision tools to help you prepare efficiently and confidently.",
      position: "right",
    },
    {
      icon: <Award className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Dedicated Professional Support",
      description: "Receive continuous guidance from enrolment to exam completion, with a quick, responsive support team available to resolve queries and keep you on track.",
      position: "right",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-blue-400" />,
      title: "Career-Aligned Guidance",
      description: "Get clarity on certification that genuinely aligns with your experience, role, and long-term career direction.",
      position: "right",
    },
  ]}
/>

  )
}

export default ContactUnique


