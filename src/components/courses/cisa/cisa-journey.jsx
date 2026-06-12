import React from "react";
import CourseJourney from "../common/course-journey";
import { IMAGE_PATH } from "@/api/base-url";

const CisaJourney = () => {
  return (
    <CourseJourney
      heading="Your Complete Guide to CISA Mastery - "
      highlight="Value, Learning, Format"
      connectorImage={`${IMAGE_PATH}/step-line.webp`}
      steps={[
        {
          number: 1,
          title: "VALUED FOR",
          items: [
            "IT Auditors",
            "Cybersecurity Professionals",
            "Risk Professionals",
            "Compliance Professionals",
            "Governance & Control Professionals",
            "IT Consultants & Advisors",
          ],
        },
        {
          number: 2,
          title: "FORMAT OF EXAM",
          items: [
            "Questions - 150 MCQs",
            "Duration - 4 Hours",
            "Passing Score - 450 /800",
            "In-Person & Online Computer-Based Exam",
            "No Negative Marking",
          ],
        },
        {
          number: 3,
          title: "DOMAINS FOR LEARNING",
          items: [
            "IS Audit Standards & Ethics",
            "IT Governance Frameworks",
            "Information Systems Operations",
            "Business Resilience & Recovery",
            "Protection of Information Assets",
            "Exam Strategy & Approach",
          ],
        },
      ]}
    />
  );
};

export default CisaJourney;
