import CourseAboutH1 from "../common/course-aboutH1";

const CisaAbout = () => {
  return (
    <>
      <CourseAboutH1
        badgeText="Best Prep Course For CISA Exam"
        heading="Become a CISA (Certified Information Systems Auditor) with AIA's Expert-Led Training."
        description={`<span class="text-[#F3831C] font-semibold">CISA is the global standard certification</span> for professionals who audit, control, and secure information systems. <span class="text-[#F3831C] font-semibold">Awarded by ISACA and recognised in 180+ countries</span> trusted by the world's leading organisations, CISA validates the expertise that modern IT audit and governance roles demand.
<strong>AIA</strong> designed the CISA Prep Course for working professionals who need structured, exam-aligned preparation. <span class="text-[#F3831C] font-semibold">Guided by Puneet Garg, an APMG Authorised Trainer.</span> This course combines recorded video lectures, expert-created short study materials, and the official ISACA study resource kit to fully prepare you.`}
        aboutStats={[
          {
            display: "Detailed Video Lectures",
            title: "(Structured learning)",
            show: "true",
          },
          {
            display: "Doubt-Solving Support",
            title: "(Mentor guided sessions)",
            show: "true",
          },
          {
            display: "AIA + ISACA Resources",
            title: "(AIA + ISACA Study Resources)",
            show: "true",
          },
          {
            display: "Short Study Notes",
            title: "(Condensed Short Notes)",
            show: "true",
          },
        ]}
        formtitle="Know more about AIA CISA prep course"
        formsubtitle="Online Training and Certification Course"
        formcourse="CISA"
        formbuttonlabel="More Info"
      />
    </>
  );
};

export default CisaAbout;
