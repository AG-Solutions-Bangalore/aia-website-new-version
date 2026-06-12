import React from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import CfeJoinDialog from "../cfe-curriculam/join-prep";

const CisaEligibility = () => {
  return (
    <section className="py-16 px-4 bg-white border-t border-[#F3831C]/10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="CISA Certification - Eligibility and Requirements"
          description="Understand the requirements and experience waivers available to fast-track your CISA credential."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {/* Left Side: Path & Eligibility */}
          <div className="flex flex-col justify-between text-[#0F3652] bg-slate-50/50 p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#0F3652]">CISA Certification is the right path for those who:</h3>
              <ul className="list-disc pl-6 space-y-3 leading-relaxed text-sm sm:text-base">
                <li>
                  Have a minimum of <strong>5 years of professional experience</strong> in information systems auditing, control, or security.
                </li>
                <li>
                  Work in <strong>IT audit, IS governance, risk, compliance</strong>, or cybersecurity roles.
                </li>
                <li>
                  Candidates with basic knowledge of IT Audit concepts are recommended to obtain the IT Audit Fundamentals certification to better understand the domain.
                </li>
              </ul>
              <p className="text-sm italic text-gray-600">
                If you&apos;re still building your experience, you can begin preparing now and apply for certification once you meet the requirements.
              </p>
            </div>
            
            <div className="pt-6">
              <CfeJoinDialog
                title="Check Your CISA Eligibility"
                subtitle="Check your eligibility in minutes - speak with an expert."
                course="CISA"
                buttonlabel="Check Eligibility with an Expert"
              />
            </div>
          </div>

          {/* Right Side: Experience Waivers Table */}
          <div className="bg-orange-50/30 p-6 sm:p-8 rounded-2xl border border-[#F3831C]/20 shadow-xs">
            <h3 className="text-xl font-bold text-[#0F3652] mb-3">Experience Waivers Available</h3>
            <p className="text-sm text-gray-600 mb-6">
              ISACA allows substitution of up to 3 years of the required experience:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-[#0F3652]/20 text-[#0F3652] font-bold">
                    <th className="py-3 px-4">Qualification / Background</th>
                    <th className="py-3 px-4 text-right">Waiver Duration</th>
                  </tr>
                </thead>
                <tbody className="text-[#0F3652]">
                  <tr className="border-b border-[#0F3652]/10 hover:bg-[#F3831C]/5 transition-colors">
                    <td className="py-3.5 px-4 font-medium">Bachelor&apos;s Degree (any field)</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#F3831C]">2 Years</td>
                  </tr>
                  <tr className="border-b border-[#0F3652]/10 hover:bg-[#F3831C]/5 transition-colors">
                    <td className="py-3.5 px-4 font-medium">Master&apos;s Degree (IT / Security related)</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#F3831C]">3 Years</td>
                  </tr>
                  <tr className="border-b border-[#0F3652]/10 hover:bg-[#F3831C]/5 transition-colors">
                    <td className="py-3.5 px-4 font-medium">CIMA / ACCA (Full Certification)</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#F3831C]">2 Years</td>
                  </tr>
                  <tr className="hover:bg-[#F3831C]/5 transition-colors">
                    <td className="py-3.5 px-4 font-medium">IS or Financial Audit Work Experience</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#F3831C]">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Work Experience Detail Banner */}
        <div className="mt-12 bg-[#0F3652] text-white p-6 sm:p-8 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Work Experience Requirements</h3>
          <p className="text-sm sm:text-base mb-4 text-gray-200 leading-relaxed">
            ISACA requires a minimum of 5 years of professional work experience in information systems auditing, control, or security.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 p-5 rounded-lg border border-white/10">
              <span className="text-[#F3831C] font-bold text-lg block mb-1">Domain Coverage</span>
              <p className="text-xs sm:text-sm text-gray-200">At least 1 of the 5 CISA domains must be covered in your experience.</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg border border-white/10">
              <span className="text-[#F3831C] font-bold text-lg block mb-1">10-Year Timeframe</span>
              <p className="text-xs sm:text-sm text-gray-200">Experience must be earned within 10 years before the certification application date.</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg border border-white/10">
              <span className="text-[#F3831C] font-bold text-lg block mb-1">Exam Timeframe</span>
              <p className="text-xs sm:text-sm text-gray-200">Or within 5 years after passing the CISA exam.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CisaEligibility;
