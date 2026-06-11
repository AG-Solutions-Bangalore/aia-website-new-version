import CourseAboutH1 from "../common/course-aboutH1";

const CisaAbout = () => {
  return (
    <>
      <CourseAboutH1
        badgeText="Best Prep Course For CISA Exam"
        heading="Prepare Confidently for the CISA Exam with AIA's Expert-Led Training"
        description={`<strong>CISA</strong> is the global standard certification for professionals who audit, control, and secure information systems. Awarded by ISACA and recognised in 180+ countries - trusted by the world's leading organisations, CISA validates the expertise that modern IT audit and governance roles demand.
<br/><br/>
<strong>AIA</strong> designed the CISA Prep Course for working professionals who need structured, exam-aligned preparation. Guided by <strong>Puneet Garg</strong>, an APMG Authorised Trainer. This course combines recorded video lectures, expert-created short study materials, and the official ISACA study resource kit to fully prepare you.`}
        aboutStats={[
          {
            display: "Video Lectures",
            title: "(Structured concept-based learning)",
            show: "true",
          },
          {
            display: "Instant Doubt-Solving",
            title: "(Guided mentor interaction sessions)",
            show: "true",
          },
          {
            display: "AIA + ISACA Prep Resources",
            title: "(AIA + ISACA Study Resources)",
            show: "true",
          },
          {
            display: "Short Study Notes",
            title: "(Condensed Short Notes)",
            show: "true",
          },
        ]}
        formtitle="Join AIA CISA LMS"
        formsubtitle="Online Training and Certification Course"
        formcourse="CISA"
        formbuttonlabel="More Info"
      />
    </>
  );
};

export default CisaAbout;
