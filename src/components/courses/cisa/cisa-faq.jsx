/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BASE_URL } from "@/api/base-url";
import FaqSection from "@/components/common/faq-section";

const CisaFaq = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-faq-cisa"],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getFAQbySlug/CISA`
      );
      return res.data;
    },
    retry: 1,
  });

  const apiFaqItems =
    data?.data?.map((item, index) => ({
      id: `item-${index + 1}`,
      question: item.faq_que,
      answer: item.faq_ans,
      heading: item.faq_heading,
      sort: item.faq_sort,
    })) || [];

  const defaultFaqItems = [
    {
      id: "item-1",
      question: "What is the CISA Certification?",
      answer: "The Certified Information Systems Auditor (CISA) is a globally recognized standard certification for professionals who audit, control, monitor, and assess an organization's information technology and business systems. It is awarded by ISACA and recognized in over 180 countries.",
    },
    {
      id: "item-2",
      question: "What is the CISA exam format?",
      answer: "The CISA exam consists of 150 multiple-choice questions (MCQs) that must be completed within 4 hours. The passing score is 450 out of 800. There is no negative marking, and the exam can be taken in-person or online via computer-based testing (CBT).",
    },
    {
      id: "item-3",
      question: "What are the eligibility requirements for CISA certification?",
      answer: "ISACA requires a minimum of 5 years of professional work experience in information systems auditing, control, or security. However, substitution waivers of up to 3 years are available for qualifications such as a Bachelor's Degree (2-year waiver), a Master's Degree in IT/Security (3-year waiver), or ACCA/CIMA certifications (2-year waiver).",
    },
    {
      id: "item-4",
      question: "Who is the trainer for AIA's CISA Prep Course?",
      answer: "Our prep course is mentored and trained by Puneet Garg, a globally certified audit leader with over 22 years of experience. He is an APMG Authorised Trainer and has trained 2,000+ aspirants across the country.",
    },
    {
      id: "item-5",
      question: "What study resources are included in AIA's CISA Prep Course?",
      answer: "AIA's preparation program includes 200 pages of exclusive Short Study Notes (hard copy), 6 months of LMS access, 50+ hours of video lectures, instant doubt solving support on WhatsApp, registration/enrollment assistance, and 500+ exam-oriented distractors to practice tricky exam questions.",
    },
  ];

  const faqItems = apiFaqItems.length > 0 ? apiFaqItems : defaultFaqItems;
  const faqHeading = data?.data?.[0]?.faq_heading || "CISA Certification FAQs";

  useEffect(() => {
    if (faqItems.length > 0) {
      const existingScript = document.querySelector(
        'script[type="application/ld+json"][data-faq-schema]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-faq-schema", "true");
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);

      return () => {
        if (script && document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [faqItems]);

  if (isLoading && apiFaqItems.length === 0) return null;

  return (
    <FaqSection
      title={faqHeading}        
      faqs={faqItems} 
    />
  );
};

export default CisaFaq;
