import { Button } from "@/components/ui/button";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import CourseCurriculum from "../common/course-curriculam";
import { Link } from "react-router-dom";
import { ENROLL_URL } from "@/api/base-url";

const curriculumData = [
  {
    id: 1,
    title: "Understanding the Risks and Methods of Financial Crime",
    content: [
      "This module explains the basics of money laundering and how financial crimes happen in different industries. It covers risks faced by banks, non-banking financial institutions, and high-risk sectors like DNFBPs. Learners understand how criminals misuse financial systems and why certain industries are more vulnerable.",
      "By the end, professionals gain a strong foundation in financial crime risks, helping them recognize suspicious activities early and support stronger prevention measures within their organizations.",
    ],
  },
  {
    id: 2,
    title: "Global AFC Frameworks, Governance, and Regulations",
    content: [
      "This module focuses on global anti-financial crime standards, regulations, and governance structures. It explains how international frameworks guide countries and institutions in fighting financial crime. Learners understand key regulatory expectations, compliance requirements, and the importance of following global best practices.",
      "By completing this module, professionals learn how regulations work in practice and how organizations must align their compliance programs with global standards to avoid penalties and maintain regulatory trust.",
    ],
  },
  {
    id: 3,
    title: "Building an AFC Compliance Program",
    content: [
      "This module teaches how to design and implement an effective anti-financial crime compliance program. It explains key components such as risk assessment, control design, transaction monitoring, and investigation processes. Learners understand how to identify risks specific to their organization and build controls to reduce those risks.",
      "By the end, professionals gain practical knowledge to build, manage, and improve AFC programs that protect organizations from financial crime risks.",
    ],
  },
  {
    id: 4,
    title: "Tools and Technologies to Fight Financial Crimes",
    content: [
      "This module introduces modern technologies for detecting and preventing financial crimes. It explains how technology supports customers' onboarding, transaction monitoring, investigations, and data management. Learners understand how data is collected, prepared, and analyzed to identify suspicious patterns.",
      "By completing this module, professionals learn how technology strengthens financial crime detection, reduces manual errors, and helps organizations respond faster to emerging financial crime threats.",
    ],
  },
];
const eligibilityContent = `
<p class="mb-2">
 <span class="text-[#F3831C] font-bold"> Eligible Candidates for CAMS - </span> <span>This certification is designed for professionals working in or aspiring to enter the anti-money laundering (AML) and compliance domain.</span>
</p>
<p>To apply for this certification, candidates must:</p>
<ul class="list-disc pl-5 my-2 md:ml-10">
  <li>Meet the minimum eligibility criteria set by ACAMS through a credit-based system</li>
  <li>Have relevant education, work experience, or training in AML, compliance, or financial crime</li>
</ul>
<p class="mb-2">Credits can be earned through:</p>
<ul class="list-disc pl-5 mt-2 md:ml-10">
  <li>Education: 10 - 40 credits based on your degree level</li>
  <li>Work Experience: 10 credits for each year of relevant experience</li>
</ul>


<p class="mt-2"><em>Confused about your eligibility? Get a quick profile check with us!</em><strong> Know more</strong></p>
`;
const CamsCourseCurriculum = () => {
  return (
    <>
      <CourseCurriculum
        title="CAMS Course Overview"
        description={`The Certified Anti-Money Laundering Specialist (CAMS) certification is the globally recognised benchmark for professionals working in Anti-Money Laundering (AML), Counter-Terrorist Financing (CTF), and financial crime compliance. It is widely recognised across banks, financial institutions, fintechs, consulting firms, and regulatory environments. CAMS curriculum is designed to equip professionals with a practical, risk-based understanding of AML frameworks, which helps them to evaluate control effectiveness and respond appropriately to suspicious activity within complex institutional environments.<br/> \n<strong> At AIA, we design a CAMS prep program aligning with the latest CAMS Version 7 exam framework,</strong> ensuring coverage of all key knowledge areas tested in the examination, while maintaining a strong focus on practical understanding relevant to today's evolving financial crime landscape.`}
        curriculumData={curriculumData}
        eligibilityContent={eligibilityContent}
      />

      <div className="flex justify-center gap-2">
        <CfeJoinDialog
          title="Join AiA CAMS LMS"
          subtitle="Online Training and Certification Course"
          course="CAMS"
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

export default CamsCourseCurriculum;
