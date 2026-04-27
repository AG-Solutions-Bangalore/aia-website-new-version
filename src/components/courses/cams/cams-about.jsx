import CourseAbout from "../common/course-about";

const CamsAbout = () => {
  return (
    <>
      <CourseAbout
        badgeText="BEST PREP COURSE FOR CAMS CERTIFICATION "
        heading="Join AIA's CAMS Prep Course and Crack Your Exam on Your 1st Attempt"
        description={`The Certified Anti-Money Laundering Specialist (CAMS) certification by ACAMS is widely recognized as the leading global credential in anti-money laundering and financial crime compliance. With 50,000+ CAMS-certified professionals worldwide, it is the preferred qualification for AML, compliance, risk, and audit professionals across banks, fintechs, consulting firms, and regulators.
         \nAt the AIA, we design our CAMS prep program in the best manner to provide comprehensive, end-to-end training to master all exam concepts. Whether you are preparing alongside a full-time job or returning to AML after a break, AIA’s CAMS prep course offers the structure, guidance, and flexibility required to clear the exam on your first serious attempt.`}
        aboutStats={[
          {
            display: "Recorded Video Sessions",
            title: "(40+ hours of structured learning)",
            show: "true",
          },
          {
            display: "Live-Doubt \n Sessions",
            title: "(With expert faculty)",
            show: "true",
            lineBreak: "sm",
          },
          {
            display: "CAMS V7 Study Material",
            title: "(100 pages of concise notes)",
            show: "true",
          },
          {
            display: "CAMS Qualified Trainer",
            title: "(22+ years of Industry experience)",
            show: "true",
          },
        ]}
        formtitle="Join AiA CAMS LMS"
        formsubtitle="Online Training and Certification Course"
        formcourse="CAMS"
        formbuttonlabel="More Info"
      />
    </>
  );
};

export default CamsAbout;
