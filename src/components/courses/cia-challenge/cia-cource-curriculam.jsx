import { Button } from "@/components/ui/button";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import CourseCurriculum from "../common/course-curriculam";
import { Link } from "react-router-dom";
import { ENROLL_URL } from "@/api/base-url";

const curriculumData = [
  {
    id: 1,
    title: "Internal Audit Professionalism and Quality (20%)",
    content: [
      "This section focuses on the foundational professionalism of the internal audit function. Candidates examine the internal audit mandate, governance responsibilities of the board and chief audit executive, and situations that may impair independence or objectivity. It emphasizes ethical conduct, confidentiality, and appropriate use of information. The section also covers the Quality Assurance and Improvement Program (QAIP), disclosure of nonconformance with IIA Global Internal Audit Standards, and the use of performance metrics and scorecards to demonstrate internal audit value to senior management and the board.",
    ],
  },
  {
    id: 2,
    title: "Internal Audit Operations and Audit Plan (15%)",
    content: [
      "This section addresses the strategic and operational management of the internal audit function. It covers planning, organizing, directing, and monitoring audit activities, along with effective management of financial, human, and technology resources. Candidates evaluate how internal audit strategies align with stakeholder expectations and the chief audit executive’s role in communication and relationship management. The section also focuses on identifying audit engagements, developing risk-based audit plans, and coordinating with other assurance providers to enhance coverage and efficiency.",
    ],
  },
  {
    id: 3,
    title: "Engagement Planning (20%)",
    content: [
      "This section emphasizes structured and risk-focused engagement planning. Candidates learn to define engagement objectives and scope, establish evaluation criteria, and assess key risks and controls. It covers selecting appropriate engagement approaches, performing detailed risk assessments, and developing audit procedures and work programs. The section also addresses determining the required level of resources and competencies, ensuring engagements are planned efficiently and aligned with organizational risk priorities.",
    ],
  },
  {
    id: 4,
    title: "Engagement Performance (25%)",
    content: [
      "This section focuses on executing audit engagements effectively and professionally. It includes identifying reliable information sources, evaluating the sufficiency and relevance of audit evidence, and using technology and data analytics to support findings. Candidates apply analytical techniques, process mapping, and professional judgment to evaluate results against criteria. The section also covers documentation through workpapers, developing conclusions, applying appropriate supervision, and maintaining effective communication with stakeholders throughout the engagement lifecycle.",
    ],
  },
  {
    id: 5,
    title: "Engagement Results and Monitoring (20%)",
    content: [
      "This section addresses communicating results and ensuring audit impact. It covers effective communication of engagement outcomes, developing recommendations, and agreeing on management action plans. Candidates examine reporting and closing processes, assessment of residual risk, and escalation when risk acceptance is inappropriate. The section also focuses on monitoring implementation of action plans and confirming corrective actions, reinforcing the internal audit function’s role in strengthening governance and risk management.",
    ],
  },
];
const eligibilityContent = `
<p class="mb-2">
<span class="text-[#F3831C] font-bold">Curious about who can apply for the CIA Challenge Exam ? </span>This pathway is designed for experienced professionals seeking to fast-track their CIA certification.</br> You are eligible if you:</p>

<ul class="list-disc pl-5 mt-2 md:ml-10">
  <li>Hold a recognized professional qualification such as: CA, CPA, ACCA, CMA, CISA, or other approved accounting bodies by the <span class="font-bold">IIA </span></li>
  <li><span class="font-bold">OR</span> any individual having 10+ years of experience in internal audit or related fields</li>
</ul>


<p class="mt-2"><em>Not sure if this course fits your background? Don’t worry, we’ll guide you!</em></p>
`;
const CiaCourseCurriculum = () => {
  return (
    <>
      <CourseCurriculum
        title="CIA Challenge Curriculum"
        description={` The CIA Challenge Exam is a fast-track pathway offered by The Institute of Internal Auditors (IIA) for qualified professionals to earn the Certified Internal Auditor (CIA) designation through a single comprehensive exam. It focuses on internal audit fundamentals, risk management, governance, internal controls, information technology, data analytics, ethics, and business acumen. <br/> \nThis program is designed for qualified professionals & for individuals seeking to advance their careers in internal auditing and related fields. The updated framework reflects current global practices and prepares candidates to address complex organisational risks and assurance responsibilities. Professionals holding this certification are recognised and respected worldwide.
`}
        curriculumData={curriculumData}
        eligibilityContent={eligibilityContent}
      />

      <div className="flex justify-center gap-2">
        <CfeJoinDialog
          title="Join AiA CIA LMS"
          subtitle="Online Training and Certification Course"
          course="CIAC"
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

export default CiaCourseCurriculum;
