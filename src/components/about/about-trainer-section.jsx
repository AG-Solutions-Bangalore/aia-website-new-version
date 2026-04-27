import { IMAGE_PATH } from "@/api/base-url";
import React from "react";

const AboutTrainerSection = ({
  path = "faculty_about.webp",
  messageimage = "message_about.webp",
}) => {
  return (
    <div className="bg-linear-to-r from-slate-700 via-slate-600 to-blue-950 mb-12">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-x-12 items-center">
          <div className="relative px-4 shadow-[4px_0_15px_rgba(0,0,0,0.15)]">
            <img
              src={`${IMAGE_PATH}/${path}`}
              alt="Puneet Garg - Trainer"
              className="w-full h-full relative z-0 "
              loading="lazy"
            />
          </div>

          <div className="text-white py-2">
            <div className="text-center">
              <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-[#F3831C] to-[#F3831C] italic block mt-2">
                Know Your Trainer
              </h2>
              <p className="text-[1rem] md:text-2xl mb-4 font-bold">
                Not Just a Trainer, But Your Success Coach
              </p>
            </div>

            <div className="space-y-2 text-base leading-relaxed text-justify text-sm">
              <p>
                <span className="font-bold">Puneet Garg</span> is a globally
                certified audit leader with{" "}
                <span className="font-bold"> over 22 years of experience </span>{" "}
                across internal audit, risk management, compliance, forensics,
                and finance . Holding prestigious credentials including{" "}
                <span className="font-bold"> CA, CS, CIA, CAMS, and CFE</span>,
                he brings deep technical expertise and practical insight to his
                role as a mentor and industry expert.
              </p>

              <p>
                Over the course of his career, he has worked with leading
                multinational organizations such as{" "}
                <span className="font-bold">
                  {" "}
                  Samsung, Hyundai, Panasonic, and Alchemist and has served as
                  the Head of Internal Audit at DCM Shriram Industries Ltd.
                </span>
                , where he led enterprise-wide audit, risk, and control
                initiatives. His strong foundation in corporate governance,
                internal controls, and fraud investigation has established him
                as a trusted authority within the audit and compliance
                ecosystem.
              </p>

              <p className="mb-5">
                Driven by a genuine passion for teaching, he has{" "}
                <span className="font-bold">
                  {" "}
                  mentored and trained 2,000+ aspirants
                </span>
                , helping them build successful careers and confidently master
                complex certifications themselves first.{" "}
                <span className="font-bold">
                  {" "}
                  At the Academy of Internal Audit (AIA), he is known for
                  simplifying challenging concepts{" "}
                </span>{" "}
                through real-world examples, practical case discussions, and
                engaging teaching methods that learners consistently value. In
                addition to individual mentoring,
                <span className="font-bold">
                  {" "}
                  he has conducted specialized training programs for corporate
                  teams, regulatory bodies, and investigative agencies.
                </span>
              </p>

              <div className="border-2 shadow-lg   backdrop-blur-2xl shadow-[#F3831C]/80 border-white rounded-lg p-2  mb-5">
                <p className="font-bold italic">
                  He has also served as an authorized trainer with the NSE
                  Academy, contributing to the professional development of
                  finance and audit professionals across India.
                </p>
              </div>
              <div className="border-2  shadow-lg shadow-[#F3831C]/80 border-white rounded-lg p-2 ">
                <p className="  italic">
                  In recognition of his impact on ethical leadership and
                  capability building in the profession,{" "}
                  <a
                    href="https://www.ceoinsightsindia.com/leader/puneet-garg-equipping-audit-compliance-professionals-to-lead-with-integrity-impact-cid-9846.html"
                    target="_blank"
                    className="font-bold text-[#F3831C]" rel="noreferrer"
                  >
                    CEO Insights India
                  </a>{" "}
                  <span className="font-bold">featured him</span> among the{" "}
                  <span className="font-bold">
                    Top 10 Impactful Business Leaders in India.
                  </span>
                </p>
              </div>
              <div className="mt-5">
                <img
                  src={`${IMAGE_PATH}/${messageimage}`}
                  alt="Student Testimonials"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Testimonial Image */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTrainerSection;
