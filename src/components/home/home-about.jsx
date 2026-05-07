import { lazy, Suspense } from "react";
import CourseAboutH1 from "../courses/common/course-aboutH1";

const PdfJoinDialog = lazy(() => import("../common/PdfForm"));


const HomeAbout = () => {

  return (
    <>
      <CourseAboutH1
        badgeText="Empowering Professionals Through Global Certifications & Structured Approach"
        heading="Excellence in Professional Education"
        description={`
The Academy of Internal Audit (AIA) is a leading professional training institute dedicated to helping aspirants succeed in international certification programs. Beyond clearing exams, AIA focuses on building real-world competence in learners for audit, risk, and compliance roles.
\n
Guided by industry experts with hands-on experience, our practical training ensures learners understand concept & apply them effectively in professional scenarios. Today, AIA has expanded its reach across 36+ countries within 5 years of its journey, along with a 99.6% success rate & high learner satisfaction, guiding professionals toward respected international certifications with confidence and clarity.


`}
        customButton={
          <Suspense fallback={null}>
            <PdfJoinDialog
              course="AIA Profile"
              buttonlabel="Download AIA Profile"
              triggerClassName="w-auto"
              buttonClassName="text-xs sm:text-sm font-semibold cursor-pointer px-4 py-2.5 sm:px-5 sm:py-2.5 bg-[#F3831C] text-white rounded-none hover:bg-[#0F3652] transition-colors duration-300"
            />
          </Suspense>
        }
        aboutStats={[
          {
            display: "10,000+ Hours",
            title: "Expert Mentoring Sessions",
            show: "true",
          },
          { display: "99.6% Success", title: "Success Rate", show: "true" },
          {
            display: "2000+ Professionals",
            title: "Trained & Certified",
            show: "true",
          },
          { display: "36+ Countries", title: "Served", show: "true" },
        ]}
      />
    </>
  );
};

export default HomeAbout;
