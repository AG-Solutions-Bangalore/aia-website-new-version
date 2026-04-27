import React from "react";
import { Target, Eye } from "lucide-react";
import SectionHeading from "../SectionHeading/SectionHeading";

const AboutMissionSection = () => {
  return (
    <div className="py-16 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-340 mx-auto ">
        <div className="text-center mb-12">
          <SectionHeading
            title="Building Capable Professionals."
            highlight="Creating Global Impact."
            align="center"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#0F3652] relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#0F3652] rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F3652] pt-3">
                Our Mission
              </h2>
            </div>

            <p className="text-[#0F3652] leading-relaxed text-justify">
              At AIA, we empower professionals to move beyond credentials and
              build real capability. We exist to prepare audit, risk, and
              compliance professionals for the realities of the profession,
              while supporting them to achieve certification goals on their
              first attempt. Through structured learning, practical insights,
              and expert-led mentorship, we focus on building skills that
              translate into real-world impact. Our commitment is to walk with
              you at every stage of your journey, ensuring you gain clarity,
              competence, and the professional mindset needed to succeed in
              global roles and evolving business environments.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#0F3652] relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#0F3652] rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F3652] pt-3">
                Our Vision
              </h2>
            </div>

            <div className="text-[#0F3652] leading-relaxed space-y-4 text-justify">
              <p>
                Our vision is to shape a global community of audit, fraud, and
                compliance professionals who have respected credentials,
                practical judgment, integrity, and the ability to lead. We aim
                to redefine professional education by moving beyond rote
                learning and creating an ecosystem where analytical thinking,
                continuous growth, and real-world readiness are the standard. As
                AIA continues to grow across borders, our goal is to become the
                most trusted partner for professionals who aspire to build
                meaningful, long-term careers with global relevance and impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMissionSection;
