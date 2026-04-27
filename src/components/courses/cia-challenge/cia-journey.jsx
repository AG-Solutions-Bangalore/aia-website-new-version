import React from "react";
import CourseJourney from "../common/course-journey";
import { IMAGE_PATH } from "@/api/base-url";

const CiaJourney = () => {
  return (
    <CourseJourney
      heading="Your Complete Guide to CIA Challenge Mastery - "
      highlight="Value, Learning, Format"
      connectorImage={`${IMAGE_PATH}/step-line.webp`}
      steps={[
        {
          number: 1,
          title: "MOST VALUED FOR",
          items: [
            "Internal Auditor",
            "Risk Professional",
            "Statutory Auditor",
            "Business Excellence",
            "Finance Professional",
            "Compliance Professional",
          ],
        },
        {
          number: 2,
          title: "WHAT YOU WILL LEARN",
          items: [
            "Report Writing",
            "Managing Audit",
            "Planning Internal Audit",
            "Conducting Internal Audit",
            "Communicating The Results",
            "International Audit Standards",
          ],
        },
        {
          number: 3,
          title: "CIA  CHALLENGE EXAM FORMAT",
          items: [
            "Passing Score 80%",
            "No Negative Marking",
            "Windows-based Exam",
            "One Exam of all 3 parts",
            "Multiple Choice Questions",
            "150 Questions in 3.5 Hours",
          ],
        },
      ]}
    />
  );
};

export default CiaJourney;
