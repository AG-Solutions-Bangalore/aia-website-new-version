import CourseAboutH1 from "../common/course-aboutH1";

const CiaCurrAbout = () => {
  return (
    <>
      <CourseAboutH1
        badgeText="Best Prep Course for CIA Certification"
        heading="Join the AIA Prep Course and Get 100% Success in the CIA Exam "
        description={`<strong>AIA's CIA Prep Course</strong> is designed to help professionals prepare confidently for all three parts of the CIA exam through structured learning, expert guidance, and exam-focused resources aligned with the latest IIA syllabus. What makes <strong>AIA stand apart is our exclusive CIA Short Notes and authorization with Becker - a globally trusted study resource for CIA</strong>, designed to simplify complex concepts and support faster, smarter revision, <strong>available only with AIA.</strong>
\nAs part of the AIA's program, learners receive access to <strong>Becker's globally trusted CIA software, including practice questions, mock exams, flashcards</strong>, performance tracking, and exam-oriented study tools to strengthen preparation. <strong>AIA is proudly the one and only authorized Becker distributor in India</strong>, ensuring students receive authentic and high-quality study resources.
\nTo further enhance exam readiness, <strong>the AIA CIA program includes recorded lectures, distractor-based concept explanations, live doubt-solving sessions, exam registration support</strong>, and practical exam strategies - helping candidates build conceptual clarity and prepare ethically and efficiently for CIA success.`}
        aboutStats={[
          {
            display: "Recorded Video Sessions",
            title: "(60+ hours of structured learning)",
            show: "true",
          },
          {
            display: "AIA Short Notes",
            title: "(250 pages of concise notes)",
            show: "true",
          },
          {
            display: "Updated Becker Resources",
            title: "(Get access to Becker software)",
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
