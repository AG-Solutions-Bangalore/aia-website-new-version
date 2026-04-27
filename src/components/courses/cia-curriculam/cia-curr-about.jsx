import CourseAbout from "../common/course-about";

const CiaCurrAbout = () => {
  return (
    <>
      <CourseAbout
        badgeText="Best Prep Course for CIA Certification"
        heading="Join the AIA Prep Course and Get 100% Success in the CIA Exam "
        description={`The Certified Internal Auditor (CIA) is a globally recognized professional certification awarded by the Institute of Internal Auditors (IIA). It validates expertise in internal audit,risk management, governance, and assurance across industries. 
\nAIA’s CIA Prep Course is designed to help professionals confidently prepare for all three parts of the CIA exam through structured learning, concept clarity, and exam-oriented practice, aligned with the latest IIA syllabus for 2026. Whether you are starting your audit career or strengthening your role in risk, compliance, or governance, this program focuses on understanding concepts, applying standards, and clearing exams ethically and efficiently.
`}
        aboutStats={[
          {
            display: "Recorded Video Sessions",
            title: "(60+ hours of structured learning)",
            show: "true",
          },
          {
            display: "Live-Doubt \n Sessions",
            title: "(With expert faculty)",
            show: "true",
            lineBreak:"sm",
          },
          {
            display: "Updated Gliem Resources",
            title: "(Get access to Gleim software)",
            show: "true",
          },
          {
            display: "CIA-Qualified Faculty",
            title: "(22+ years of industry experience)",
            show: "true",
          },
        ]}
        formtitle="Join AiA CIA LMS"
        formsubtitle="Online Training and Certification Course"
        formcourse="CIA"
        formbuttonlabel="More Info"
      />
    </>
  );
};

export default CiaCurrAbout;
