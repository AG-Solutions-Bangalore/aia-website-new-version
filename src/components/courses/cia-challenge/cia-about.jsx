import CourseAboutH1 from "../common/course-aboutH1";

const CiaAbout = () => {
  return (
    <>
      <CourseAboutH1
        badgeText="Best Prep Course For CIA Challenge Exam"
        heading="Prepare Confidently for the CIA Challenge Exam with AIA's Expert-Led Training "
        description={`<strong>AIA's CIA Challenge Exam Prep Course</strong> is designed to help professionals prepare confidently through structured learning, focused revision, and exam-oriented support aligned with the latest CIA Challenge Exam framework. This program includes <strong>AIA's exclusive Short Notes</strong> for quick revision and better concept clarity, helping candidates simplify key topics and prepare more effectively, along with detailed <strong>50+ hours of recorded video lectures</strong> for a better understanding of key concepts.
\nTo strengthen exam readiness, AIA also provides <strong>500+ exam-oriented distractors</strong> and <strong>300+ flashcards</strong> designed to improve analytical thinking, retention, and concept application for the Challenge Exam. In addition, students benefit from <strong>live doubt-solving sessions, expert guidance, and complete exam registration support</strong>, ensuring a smooth and well-supported preparation journey from start to finish.
\nStudents also receive access to <strong>Becker's official CIA software</strong>, including practice tools and exam-focused resources to strengthen preparation. As <strong>India's one and only authorized Becker distributor</strong>, AIA ensures students receive official, authentic, and globally trusted study material, providing a reliable and high-quality learning experience throughout their CIA Challenge Exam preparation.`}
        aboutStats={[
          {
            display: "Recorded Video Classes",
            title: "(50+ hours of structured learning)",
            show: "true",
          },
          {
            display: "500+ Exam Distractors",
            title: "(Identify traps & improve accuracy)",
            show: "true",
          },
          {
            display: "AIA Short Notes",
            title: "(200 pages of concise notes)",
            show: "true",
          },
          {
            display: "Becker Software Access",
            title: "(Get access of Becker Software)",
            show: "true",
          },
        ]}
        formtitle="Join AiA CIA LMS"
        formsubtitle="Online Training and Certification Course"
        formcourse="CIAC"
        formbuttonlabel="More Info"
      />
    </>
  );
};

export default CiaAbout;
