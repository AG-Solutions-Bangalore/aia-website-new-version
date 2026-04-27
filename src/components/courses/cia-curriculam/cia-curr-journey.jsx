import React from "react";
import CourseJourney from "../common/course-journey";
import { IMAGE_PATH } from "@/api/base-url";

const CiaCurrJourney = () => {
  return (
    <CourseJourney
      heading="Your Complete Guide to CIA Mastery –"
      highlight="Value, Learning, Format"
      connectorImage={`${IMAGE_PATH}/step-line.webp`}
      steps={[
        {
          number: 1,
          title: "MOST VALUED FOR",
          items: [
            "Internal Auditor",
            "Finance Professional",
            "Compliance Professional",
            "Business Excellence",
            "Statutory Auditor",
            "Risk Professional",
          ],
        },
        {
          number: 2,
          title: "WHAT YOU WILL LEARN",
          items: [
            "Planning Internal Audit",
            "Conducting Internal Audit",
            "Report Writing",
            "Managing Audit",
            "Communicating the Results",
            "International Audit Standards",
          ],
        },
        {
          number: 3,
          title: "CIA EXAM FORMAT",
          items: [
            "125 Q. (Level 1), 100 Q. (Level 2 & 3)",
            "2.5 Hours (Level 1), 2 Hours (Level 2 & 3)",
            "Passing Score (80%)",
            "Three Exams (One Exam Each Level)",
            "Multiple-Choice Questions",
            "No Negative Marking",
          ],
        },
      ]}
    />
  );
};

export default CiaCurrJourney;
