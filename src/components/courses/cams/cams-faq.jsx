/* eslint-disable react-hooks/exhaustive-deps */
 

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BASE_URL } from "@/api/base-url";
import FaqSection from "@/components/common/faq-section";

const CamsFaq = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-faq"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getFAQbySlug/CAMS`);
      return res.data;
    },
  });

  const faqHeading = data?.data?.[0]?.faq_heading || "FAQs";

  const faqItems =
    data?.data?.map((item, index) => ({
      id: `item-${index + 1}`,
      question: item.faq_que,
      answer: item.faq_ans,
      heading: item.faq_heading,
      sort: item.faq_sort,
    })) || [];

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

  if (isLoading || isError) return null;

  return <FaqSection title={faqHeading} faqs={faqItems} />;
};

export default CamsFaq;
