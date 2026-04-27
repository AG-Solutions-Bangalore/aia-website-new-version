import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";

const AboutSection = () => {
  return (
    <div className="py-16 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
          <div>
            {/* <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-[#F3831C] uppercase tracking-wider">
                Academy of Internal Audit
              </span>
            </div> */}

            <SectionHeading
              title="About AIA - Where Certifications Meet Real-World Capability"
              description=""
              align="center"
            />
            <div className="text-[#0F3652] leading-relaxed space-y-4 text-justify">
              <p>
                At the Academy of Internal Audit (AIA), we build certified
                professionals who are prepared to create real impact in audit,
                fraud, and compliance roles globally. We believe international
                certifications are more than just clearing exams, but it's
                actually about developing the confidence, judgment, and
                practical ability required to perform in real-world audit and
                risk environments.
              </p>
              <div className="list-disc md:pl-6 text-[#fa8017] mb-4 text-2xl">
                <span>
                  <strong>
                    <em>
                      “Clearing an exam is an achievement. Applying it defines
                      the profession .”
                    </em>
                  </strong>
                </span>
              </div>

              <p className="text-justify">
                This belief shapes everything we do. Our programs are designed
                and led by an industry expert with over two decades of hands-on
                experience, ensuring every concept is grounded in real-life
                application. At AIA (Academy of Internal Audit), learning goes
                beyond theory. Professionals are trained to apply concepts,
                think critically, and make informed decisions in complex,
                dynamic business situations.
              </p>
              <p className="text-justify">
                Over the last five years, AIA has evolved into a trusted global
                learning ecosystem, having trained 2,000+ professionals across
                36+ countries, with a proven 99.6% success rate. More than
                outcomes, our success is measured by the careers we help shape -
                from aspiring professionals entering audit roles with confidence
                to experienced practitioners advancing into global leadership
                positions. Through structured learning, focused mentorship, and
                continuous guidance, AIA enables professionals to thrive
                throughout their careers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
