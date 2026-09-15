import { BASE_URL } from "@/api/base-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
