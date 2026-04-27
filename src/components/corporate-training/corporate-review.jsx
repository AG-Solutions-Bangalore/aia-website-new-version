import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";

const CorporateReview = () => {
  const reviews = [
    {
      text: "Thank you, AIA; it wouldn't be possible without your support & guidance",
      author: "HET BARBHAIYA, CFE, KPMG",
    },
    {
      text: "Puneet Sir's CFE classes are outstanding—clear, focused, and incredibly helpful for exam prep. Highly recommended! Thank you, ThankyouSir... ",
      author: "Nathasha D, CFE, Bahrain",
    },
    {
      text: "Best Institute for CAMS Prep.",
      author: "Karan Wahi, CAMS, Investcorp",
    },
    {
      text: "Nice faculty and staff. Recommended for the CFE course.",
      author: "Ankit Dhyani, Audit Associate, PwC",
    },
    {
      text: "I truly appreciate the professionalism, dedication, and personalized support provided by team AIA, which helped me clear the certification with confidence. I would highly recommend AIA to all professionals aspiring to build a career in fraud examination, audit, and risk management. ",
      author: "Prithvi Raj Chauhan, Subject Matter Expert, GLA University",
    },
    {
      text: "Ever grateful to Mr. Garg for founding AIA. The coaching is immaculate & indeed helpful enough to score amazingly. I would choose AIA again for my future courses. Thank you, AIA team! ",
      author: "Lakshmi Chandana, Forensic Associate Consultant, EY",
    },
    {
      text: "AIA delivered a high-quality CAMS training program that met my expectations in every aspect. Well-structured and aligned with current industry standards. Highly recommend to any organization looking to enhance their AML compliance capabilities.",
      author: "Kamal Mahmoud, Head of Regulatory & Compliance, MEC Gulf",
    },
  ];

  return (
    <div className="py-1">
      <div className="max-w-340 mx-auto">
        <div className="grid md:grid-cols-2">
          <div className="p-2 rounded-lg px-4">
            <div className="md:hidden">
              <SectionHeading
                title="Real Experience Shared by Professionals"
                align="center"
              />
            </div>
            <div className="hidden md:block">
              <SectionHeading title="Real Experience Shared by Professionals" />
            </div>
            <div className="space-y-4 text-[#0F3652]">
              <p className="font-semibold text-justify">
                AIA is a trusted partner for organizations seeking measurable
                growth and long-term talent development
              </p>

              <p className="text-justify">
                Our tailored programs are designed to align with your business
                objectives - helping teams strengthen core competencies, improve
                productivity, and foster leadership that's ready for the future.
              </p>
            </div>
          </div>

          <div className="relative h-96 bg-[#0F3652]  overflow-y-auto overflow-hidden rounded-md w-full">
            <div className="flex flex-col gap-4 p-4 ">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-md py-2 px-4 shadow-lg shrink-0 text-balck"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(230, 246, 251, 1) 0%, rgba(253, 242, 255, 1) 50%, rgba(254, 249, 233, 1) 100%)",
                  }}
                >
                  <p className="mb-1 leading-relaxed text-sm">{review.text}</p>
                  <p className="font-semibold text-md">- {review.author}</p>
                </div>
              ))}
            </div>

            {/* <div
              className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(230,246,251,1) 0%, rgba(253,242,255,0.9) 40%, rgba(254,249,233,0) 100%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(230,246,251,1) 0%, rgba(253,242,255,0.9) 40%, rgba(254,249,233,0) 100%)",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateReview;
