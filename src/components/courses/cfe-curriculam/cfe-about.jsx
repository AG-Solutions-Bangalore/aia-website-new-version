import CourseAboutH1 from "../common/course-aboutH1";
import CfeRoadmapDialog from "@/components/common/CfeRoadmapDialog";

const CfeAbout = () => {
  return (
    <>
      <CourseAboutH1
        badgeText="Prepare for the CFE Exam with Confidence - Guided by AIA"
        preheading="2026"
        heading="CFE Preparation That Builds Real Fraud Expertise in You"
        description={`
Certified Fraud Examiner (CFE) is a globally respected credential awarded by the ACFE,USA.\n At AIA, we help you understand fraud by learning how fraud schemes are planned, executed, detected, and investigated in real organisational settings. Our  Certified Fraud Examiner (CFE) preparation program combines structured learning, exam-focused practice, and expert guidance to help you build a practical fraud examiner’s mindset. \n This course is ideal for professionals from audit, finance, compliance, risk, or consulting who aim to clear the CFE exam and strengthen their credibility in fraud examination.`}
        aboutStats={[
          {
            display: "Recorded Video Sessions",
            title: "(60+ hours of structured learning)",
            show: "true",
          },
          {
            display: "400+ Flash Cards",
            title: "(Designed for quick revision)",
            show: "true",
            lineBreak: "sm",
          },
          // {
          //   display: "Practice \n Questions",
          //   title: "(1,500+ expert curated questions)",
          //   show: "true",
          //   lineBreak: "sm",
          // },
          {
            display: "Updated Study Material",
            title: "(250 pages of concise notes)",
            show: "true",
            badge: "2026",
          },
          {
            display: "400+ Exam Distractors",
            title: "(To identify traps in the CFE exam)",
            show: "true",
          },
          // {
          //   display: "CFE-Qualified Faculty",
          //   title: "(22+ years of industry experience)",
          //   show: "true",
          // },
        ]}
        customBottomButton={
          <CfeRoadmapDialog
            buttonlabel="Grab the FREE Roadmap"
            buttonClassName="bg-[#F3831C] text-white px-6 py-2.5 rounded-none font-semibold hover:bg-[#D16E27] active:bg-[#AE5B1D] transition-all cursor-pointer"
          />
        }
      />
    </>
  );
};

export default CfeAbout;
