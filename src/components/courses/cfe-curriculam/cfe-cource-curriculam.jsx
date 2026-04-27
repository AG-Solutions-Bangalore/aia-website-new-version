import { Button } from "@/components/ui/button";
import CourseCurriculum from "../common/course-curriculam";
import CfeJoinDialog from "./join-prep";
import { Link } from "react-router-dom";
import { ENROLL_URL } from "@/api/base-url";

const curriculumData = [
  {
    id: 1,
    title: "Fraud Schemes and Financial Crimes",
    content: [
      `This <strong>module focuses on the different ways fraud and financial crimes occur within organizations and against individuals.</strong>It introduces learners to <strong>common fraud schemes</strong>across industries and  <strong> explains how they are typically executed .</strong>`,
      `The section further explores financial statement manipulation, asset misappropriation, and other occupational fraud risks. Through these topics,<strong>learners develop the ability to recognise warning signs, understand how fraud schemes operate in practice, and apply practical approaches to detect and prevent fraudulent activities.</strong>`,
    ],
  },
  {
    id: 2,
    title: "Fraud Investigation and Law",
    content: [
      `This module <strong> concentrates on the practical process of conducting a fraud investigation while staying within appropriate legal boundaries .</strong> It covers the key stages involved in examining suspected fraud, including planning an investigation, gathering information, and evaluating evidence. Learners also <strong>study proper methods for collecting and preserving documentation and digital data,</strong> as well as techniques for analysing findings .
       The curriculum also addresses interview approaches used during investigations and how to present results in a clear and professional investigative report. In addition, this section introduces the basic functioning of legal systems in different jurisdictions, explains <strong>how fraud cases are pursued through criminal or civil actions,</strong> and outlines the <strong>responsibilities involved when presenting professional opinions </strong> or expert testimony.`,
    ],
  },
  {
    id: 3,
    title: "Fraud Prevention and Deterrence ",
    content: [
      `This area<strong> focuses on understanding the underlying factors that lead individuals to commit fraud and the strategies organisations can implement to reduce such risks.</strong>It discusses the importance of strong governance, ethical culture, and effective oversight in minimising fraudulent behaviour .<strong> Learners explore the responsibilities of management, auditors, and compliance professionals</strong>in maintaining an environment that discourages misconduct. 
      The section also explains <strong> how to perform a structured fraud risk assessment, implement appropriate control measures, and design a proactive fraud prevention framework </strong> Ethical decision-making and professional responsibility are also emphasised as key elements in maintaining integrity within organisations.`,
    ],
  },
];
const eligibilityContent = `
<p class="text-[#F3831C] font-bold mb-2">
  CFE Certification is the best career path for those who - :
</p>

<ul class="list-disc pl-5 mt-2 md:ml-10">
  <li>Hold a bachelor’s degree (or equivalent)</li>
  <li>Have at least 2 years of professional experience in fields like Accounting, Auditing, Fraud Investigation, Law, Compliance, or Risk</li>
</ul>

<p class="my-2">If you’re still building your experience, you can begin preparing early and complete the certification once you meet the requirements.</p>

<p><em>Check your eligibility in minutes - speak with an expert.</em></p>
`;
const CfeCourseCurriculum = () => {
  return (
    <>
      <CourseCurriculum
        title="2026 Updated CFE Curriculum"
        description={`The Certified Fraud Examiner (CFE) credential is globally recognized as a benchmark for professionals in fraud detection, investigation, and prevention. The certification<strong> validates a professional’s ability to understand & identify fraud schemes, conduct </strong> structured investigations, and design effective fraud prevention frameworks across organizations. The<strong> CFE exam is divided into four core modules that</strong> cover financial fraud schemes, legal aspects, investigation techniques, and fraud prevention and deterrence. <br/> \nAt AIA, we design our <strong>CFE training program to ensure that aspirants develop a clear organizational understanding and an investigator mindset.</strong>The course structure helps learners view transactions through a fraud-risk framework, understand how controls fail, and analyze fraud from the perspective of how it occurs. `}
        curriculumData={curriculumData}
        eligibilityContent={eligibilityContent}
      />

      <div className="flex justify-center gap-2">
        <CfeJoinDialog
          // title="dd"
          // subtitle="dd"
          course="CFE"
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

export default CfeCourseCurriculum;
