import { Button } from "@/components/ui/button";
import CfeJoinDialog from "../cfe-curriculam/join-prep";
import CourseCurriculum from "../common/course-curriculam";
import { Link } from "react-router-dom";
import { ENROLL_URL } from "@/api/base-url";

const curriculumData = [
  {
    id: 1,
    title: "Domain 1 - Information System Auditing Process - 18%",
    content: [
      `This domain focuses on the standards, guidelines, and ethics that govern IS audit practice. It introduces learners to risk-based audit planning, audit execution techniques, and evidence collection, building the foundation of a structured, professional audit approach.
      <br/><br/>
      <strong>Sub-topics covered:</strong>
      <ul class="list-disc pl-5 mt-2 space-y-1">
        <li>IS Audit Standards, Guidelines and Codes of Ethics</li>
        <li>Types of Audits, Assessments and Reviews</li>
        <li>Risk-Based Audit Planning & Types of Controls</li>
        <li>Audit Project Management & Sampling Methodology</li>
        <li>Audit Evidence Collection & Data Analytics</li>
        <li>Reporting, Communication & Quality Assurance</li>
      </ul>`
    ]
  },
  {
    id: 2,
    title: "Domain 2 - Governance & Management of IT - 18%",
    content: [
      `This domain examines how organisations govern and manage their IT environments. Learners develop the ability to evaluate IT strategy, assess enterprise risk, and review data governance and privacy frameworks in line with regulatory requirements.
      <br/><br/>
      <strong>Sub-topics covered:</strong>
      <ul class="list-disc pl-5 mt-2 space-y-1">
        <li>Laws, Regulations and Industry Standards</li>
        <li>IT Governance, Strategy and Organisational Structure</li>
        <li>IT Policies, Standards and Enterprise Architecture</li>
        <li>Enterprise Risk Management & Privacy Principles</li>
        <li>Data Governance, IT Resource & Vendor Management</li>
        <li>IT Performance Monitoring & Quality Management</li>
      </ul>`
    ]
  },
  {
    id: 3,
    title: "Domain 3 - IS Acquisition, Development & Implementation - 12%",
    content: [
      `This domain covers the audit of IT project lifecycles, from feasibility through post-implementation. Learners gain the ability to assess system development controls, evaluate implementation readiness, and review project governance at every stage.
      <br/><br/>
      <strong>Sub-topics covered:</strong>
      <ul class="list-disc pl-5 mt-2 space-y-1">
        <li>Project Governance, Business Case & Feasibility Analysis</li>
        <li>System Development Methodologies & Control Design</li>
        <li>Implementation Testing & Configuration Management</li>
        <li>System Migration, Data Conversion & Post-Implementation Review</li>
      </ul>`
    ]
  },
  {
    id: 4,
    title: "Domain 4 - IS Operations & Business Resilience - 26%",
    content: [
      `This domain addresses the day-to-day operational integrity of IT systems and an organisation's ability to withstand disruption. Learners build expertise in IT operations management, incident handling, and business continuity planning - among the most heavily tested areas in the CISA exam.
      <br/><br/>
      <strong>Sub-topics covered:</strong>
      <ul class="list-disc pl-5 mt-2 space-y-1">
        <li>IT Components, Asset Management & Job Scheduling</li>
        <li>Systems Availability, Capacity & Incident Management</li>
        <li>IT Change, Configuration & Patch Management</li>
        <li>Database Management & IT Service Level Management</li>
        <li>Business Impact Analysis & Operational Resilience</li>
        <li>Data Backup, Business Continuity & Disaster Recovery Plans</li>
      </ul>`
    ]
  },
  {
    id: 5,
    title: "Domain 5 - Protection of Information Assets - 26%",
    content: [
      `This domain covers the security frameworks, controls, and techniques used to protect information assets across physical, network, and cloud environments. Learners develop the ability to evaluate security architectures, assess access controls, and respond to security incidents with confidence.
      <br/><br/>
      <strong>Sub-topics covered:</strong>
      <ul class="list-disc pl-5 mt-2 space-y-1">
        <li>Security Frameworks, Standards and Physical Controls</li>
        <li>Identity & Access Management, Network & Endpoint Security</li>
        <li>Data Loss Prevention, Encryption & PKI</li>
        <li>Cloud, Virtualised & IoT Environments</li>
        <li>Security Testing, Monitoring & Incident Response</li>
        <li>Evidence Collection and Digital Forensics</li>
      </ul>`
    ]
  }
];

const CisaCourseCurriculum = () => {
  return (
    <>
      <CourseCurriculum
        title="CISA Certification Curriculum"
        description={`The Certified Information Systems Auditor (CISA) credential is globally recognised as the benchmark for professionals in IT auditing, information systems control, and cybersecurity governance. The certification validates a professional's ability to audit, control, monitor, and assess an organisation's information technology and business systems.

At AIA, we design our CISA preparation programme to ensure that candidates develop both exam readiness and real-world audit judgement. The course structure helps learners understand IT governance frameworks, assess system vulnerabilities, evaluate business resilience, and apply audit standards the way they are tested and practised, in the field.`}
        curriculumData={curriculumData}
      />

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 px-4">
        <CfeJoinDialog
          title="Know more about AIA CISA prep course"
          subtitle="Online Training and Certification Course"
          course="CISA"
          buttonlabel="Know More"
        />
        <Button
          className="
              bg-[#F3831C] text-white
              px-6 py-2.5 rounded-none
              font-semibold
              hover:bg-[#F3831C]/90
              transition-all
              cursor-pointer
              w-full sm:w-auto
            "
        >
          <Link to={`${ENROLL_URL}`} target="_blank" rel="noopener noreferrer" className="w-full text-center">
            Enroll Now
          </Link>
        </Button>
      </div>
    </>
  );
};

export default CisaCourseCurriculum;
