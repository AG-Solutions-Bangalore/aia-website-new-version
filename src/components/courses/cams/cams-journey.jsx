import React from "react";
import CourseJourney from "../common/course-journey";
import { IMAGE_PATH } from "@/api/base-url";

const CamsJourney = () => {
  return (
    <CourseJourney
      heading="Your Complete Guide to CAMS Mastery –"
      highlight="Value, Learning, Format"
      connectorImage={`${IMAGE_PATH}/step-line.webp`}
      steps={[
        {
          number: 1,
          title: "MOST VALUED FOR",
          items: [
            "AML Officers",
            "Bank Auditors",
            "KYC Executives",
            "NBFC’s Professionals",
            "Banking Professionals",
            "Compliance Professionals",
          ],
        },
        {
          number: 2,
          title: "WHAT YOU WILL LEARN",
          items: [
            "AML / CFT Controls",
            "Global Standards",
            "Best Due Diligence",
            "AML Compliance Programs",
            "Financial Crime Investigation",
            "Anti Financial Crimes Techniques",
          ],
        },
        {
          number: 3,
          title: "CAMS EXAM FORMAT",
          items: [
            "Single Exam",
            "No Negative Marking",
            "3.5 Hours (Exam Time)",
            "Passing Score (75 Marks)",
            "Multiple Choice Questions",
            "Total 120 Questions (One Mark Each)",
          ],
        },
      ]}
    />
  );
};

export default CamsJourney;
