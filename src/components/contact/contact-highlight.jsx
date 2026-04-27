import { partnerLogos } from "@/utils/partnerLogos";
import CourseHighLight from "../courses/common/course-highlight";

const ContactHighlight = () => {
  return (
    <CourseHighLight
      badgeText="Accreditation & Highlights"
      title=" Trusted & Authorized by Leading Global Bodies"
      description="With globally recognized certifications, authorized partnerships, and a proven track record of success. We empower professionals and organizations across various industries with audit, risk, and compliance excellence."
      logos={partnerLogos}
    />
  );
};

export default ContactHighlight;
