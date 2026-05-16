import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import FaqSection from "../common/faq-section";

const CorporateFaq = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["aia-faq-corporate"],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/getFAQbySlug/Corporate-Training`,
      );
      return res.data;
    },
  });

  const faqHeading = data?.data?.[0]?.faq_heading || "FAQs";

  const faqItems =
    data?.data?.map((item, index) => ({
      id: `item-${index + 1}`,
      question: item.faq_que,
      answer: item.faq_ans,
    })) || [];

  useEffect(() => {
    if (faqItems.length > 0) {
      const existingScript = document.querySelector(
        'script[type="application/ld+json"][data-faq-schema]',
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

  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading FAQs...</div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">Error loading FAQs</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <FaqSection title={faqHeading} faqs={faqItems} />
    </section>
  );
};

export default CorporateFaq;
