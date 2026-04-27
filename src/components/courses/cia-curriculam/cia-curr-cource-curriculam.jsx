import { Button } from "@/components/ui/button";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import CourseCurriculum from "../common/course-curriculam";
import { Link, useNavigate } from "react-router-dom";
import { ENROLL_URL } from "@/api/base-url";

const curriculumData = [
  {
    id: 1,
    title: "Internal Audit Fundamentals",
    content: [
      "CIA Part 1 - Internal Audit Fundamentals provides comprehensive coverage on the fundamentals of internal auditing, all about ethical norms and professionalism, and core concepts of governance, risk management, and control frameworks. ",
      "Foundation of Internal Auditing (35%)",
      "Ethics & Professionalism (20%)",
      "Governance, Risk Management, and Control (30%)",
      "Fraud Risks (15%)",
    ],
  },
  {
    id: 2,
    title: "Internal Audit Engagement",
    content: [
      "CIA Part 2 – Internal Audit Engagement focuses on key areas such as planning an audit engagement, collecting and analyzing audit evidence, and evaluating findings effectively. The module also explains supervision responsibilities and common mistakes to avoid during audit execution.",
      "Engagement Planning (50%)",
      "Information Gathering, Analysis & Evaluation (40%)",
      "Engagement Supervision & Communication (10%)",
    ],
  },
  {
    id: 3,
    title: "Internal Audit Function",
    content: [
      "CIA Part 3 focuses on understanding how to run an effective internal audit function aligned with organizational goals. The 2025 syllabus update introduces significant changes, making the curriculum more relevant to current industry practices and modern internal audit expectations.",
      "Internal Audit Operations (25%)",
      "Internal Audit Plan (15%)",
      "Quality of Internal Audit Functions (15%)",
      "Engagement Result & Monitoring (45%)",
    ],
  },
];
const eligibilityContent = `
<p class="mb-2">
  <span class="text-[#F3831C] font-bold">
    Are you eligible for the CIA-3 parts?
  </span>
  This certification is the right path for you if you:
</p>

<ul class="list-disc pl-5 mt-2 md:ml-10">
  <li>Hold a bachelor’s degree (or equivalent)</li>
  <li>Are a final-year student planning to enter the audit profession</li>
  <li>Have or are planning to gain relevant work experience in audit, risk, or compliance</li>
</ul>

<p class="mt-3">
  Depending on your educational background, the required work experience may vary, but you can begin your journey even as a student.
</p>

<p class="mt-2">
    <span class="font-bold">Note:</span>
    If you're a beginner, this course may not be a good choice for you. But don't worry, you're still eligible for other courses.
    <a href="/" class="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors duration-200">
      Explore other certifications.
    </a>
  </p>
<p class="mt-2">
  <em>Not sure if you’re eligible? Consult with experts now!</em>
</p>
`;
const CiaCurrCourseCurriculum = () => {
  const navigate = useNavigate();
  return (
    <>
      <CourseCurriculum
        title="CIA Course Curriculum"
        description={`The Certified Internal Auditor (CIA) is a globally recognized professional certification across 170+ countries, awarded by IIA. This program covers key areas such as internal controls, risk assessment, fraud risks, information technology, and professional ethics, equipping candidates with the skills needed to operate in complex business environments.  <br/> \nWith its global standards-based approach, CIA prepares professionals to add value, strengthen governance, and support organizational integrity. AIA’s CIA preparation program supports candidates across all three parts of the CIA exam, aligned with the latest IIA syllabus updates for 2026, with a strong focus on concept clarity, practical application, and exam readiness.
`}
        curriculumData={curriculumData}
        eligibilityContent={eligibilityContent}
      />
      <div className="flex justify-center gap-2">
        <CfeJoinDialog
          title="Join AiA CIA LMS"
          subtitle="Online Training and Certification Course"
          course="CIA"
          buttonlabel="Know More"
        />
        <Button
          className="
              bg-[#F3831C] text-white
              px-6 py-2.5 rounded-none
              font-semibold
              hover:bg-[#F3831C]/90
              transition-all
          cursor-pointer
            "
        >
          <Link to={`${ENROLL_URL}`} target="_blank" rel="noopener noreferrer">
            Enroll Now
          </Link>
        </Button>
      </div>
    </>
  );
};

export default CiaCurrCourseCurriculum;
