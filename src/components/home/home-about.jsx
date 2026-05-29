import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import CourseAboutH1 from "../courses/common/course-aboutH1";

const PdfJoinDialog = lazy(() => import("../common/PdfForm"));

const HomeAbout = () => {
  return (
    <>
      <CourseAboutH1
        badgeText="Empowering Professionals Through Global Certifications & Structured Approach"
        heading="Excellence in Professional Education"
        description={`
<strong>The Academy of Internal Audit (AIA) is a leading professional training institute dedicated to helping aspirants succeed in Global certification programs.</strong> Beyond clearing exams, AIA focuses on building real-world competence in learners for audit, risk, and compliance roles.
\n
Guided by industry experts with hands-on experience, our practical training ensures learners understand concepts & apply them effectively in professional scenarios. Today, AIA has expanded its reach across <strong>40+ countries</strong> within <strong>6 years of its journey</strong>, along with a <strong>99.6% success rate & high learner satisfaction</strong>, guiding professionals toward respected global certifications with confidence and clarity.


`}
        customButton={
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <Suspense fallback={null}>
              <PdfJoinDialog
                course="AIA Profile"
                buttonlabel="Download AIA Profile"
                triggerClassName="w-auto"
                buttonClassName="text-xs sm:text-sm font-semibold cursor-pointer px-4 py-2.5 sm:px-5 sm:py-2.5 bg-[#F3831C] text-white rounded-none hover:bg-[#D16E27] active:bg-[#AE5B1D] transition-colors duration-300"
              />
            </Suspense>
            <Link
              to="/about-aia/"
              className="text-xs sm:text-sm font-semibold cursor-pointer px-4 py-2.5 sm:px-5 sm:py-2 bg-[#F3831C] text-white rounded-none hover:bg-[#D16E27] active:bg-[#AE5B1D] transition-colors duration-300"
            >
              Know More
            </Link>
          </div>
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
          { display: "40+ Countries", title: "Served", show: "true" },
        ]}
      />
    </>
  );
};

export default HomeAbout;
