import React from "react";
import CourseHighLight from "../courses/common/course-highlight";
import { IMAGE_PATH } from "@/api/base-url";
import { partnerLogos } from "@/utils/partnerLogos";

const AboutHighlight = () => {
  return (
    <CourseHighLight
      badgeText="Accreditation & Highlights"
      title=" Trusted & Authorized by Leading Global Bodies"
      description="With globally recognized certifications, authorized partnerships, and a proven track record of success. We empower professionals and organizations across various industries with audit, risk, and compliance excellence."
    />
  );
};

export default AboutHighlight;
