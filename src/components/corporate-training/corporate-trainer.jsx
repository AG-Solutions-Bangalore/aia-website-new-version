import { IMAGE_PATH } from "@/api/base-url";
import React from "react";

const CorporateTrainer = () => {
  return (
    <div className="bg-linear-to-r from-slate-700 via-slate-600 to-blue-950 mb-14">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-x-12 items-center">
          <div className="relative px-4 shadow-[4px_0_15px_rgba(0,0,0,0.15)]">
            <img
              src={`${IMAGE_PATH}/faculty_cfe.webp`}
              alt="Puneet Garg - Trainer"
              className="w-full h-auto relative z-0"
              loading="lazy"
            />
          </div>

          <div className="text-white">
            <div className="text-center">
              <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-[#F3831C] to-[#F3831C] italic block mt-2">
                Know Your Trainer
              </h2>
              <p className="text-xl md:text-2xl mb-4 font-medium">
                Not Just a Trainer, But Your Success Coach
              </p>
            </div>

            <div className="space-y-2 text-base leading-relaxed">
              <p>
                <span className="font-bold text-3xl italic text-justify">
                  Puneet Garg
                </span>{" "}
                is a distinguished professional with
                <strong> over 22 years of leadership experience</strong> in
                internal audit, risk management, compliance, forensics, and
                financial advisory.
                <strong>
                  A Chartered Accountant (CA), Company Secretary (CS), and
                  globally certified expert holding the CIA, CFE, and CAMS
                  credentials.
                </strong>
              </p>

              <p className="text-justify">
                Puneet represents a rare blend of technical depth and strategic
                insight in the governance and assurance domain.
                <strong>
                  {" "}
                  He has worked with leading multinational organizations,
                </strong>{" "}
                including Samsung, Hyundai, Panasonic, and Alchemist, while
                serving as Head of Internal Audit at DCM Shriram Industries Ltd.
              </p>
              <p className="text-justify">
                His strong foundation in corporate governance, risk controls,
                and fraud investigation has established him as a trusted
                authority in the audit and compliance landscape.
              </p>
              <p className="text-justify">
                As the
                <strong>
                  {" "}
                  CEO and Lead Faculty at the Academy of Internal Audit (AIA),
                </strong>
                he has designed and delivered specialized training programs for
                both public and private sector organizations—including
                regulatory and investigative bodies
              </p>
              <p className="text-justify">
                <strong>
                  His programs go beyond certification, equipping professionals
                  with practical forensic insights,
                </strong>
                robust control frameworks, and global compliance standards that
                directly strengthen an organization’s internal audit
                effectiveness, risk management maturity, and fraud resilience.
              </p>
              <p className="text-justify">
                Puneet’s initiatives to train corporate teams are not limited to
                helping them earn global credentials but also to ensure they
                acquire real-world analytical and auditing skills that enable
                them to demonstrate excellence while performing their
                professional responsibilities.
              </p>
              <strong className="text-justify">
                He has trained professionals from prestigious institutions such
                as CBI, NIA, CAG, NFSU, SPG, and Indian security forces, among
                others.
              </strong>
              <p className="text-justify">
                He has also served as an
                <strong>authorized trainer with the NSE Academy,</strong>
                contributing to the professional development of finance and
                audit professionals across India.
              </p>
              <p className="text-justify mb-6">
                In recognition of his impact on ethical leadership and
                capability building in the profession,
                {/* <strong>CEO Insights India featured him </strong> */}
                <a
                  href="https://www.ceoinsightsindia.com/leader/puneet-garg-equipping-audit-compliance-professionals-to-lead-with-integrity-impact-cid-9846.html"
                  target="_blank"
                  className="font-bold text-[#F3831C]" rel="noreferrer"
                >
                  {" "}
                  CEO Insights India
                </a>{" "}
                featured him among the
                <strong>Top 10 Impactful Business Leaders in India.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateTrainer;
