import { BASE_URL } from "@/api/base-url";
import FaqSection from "@/components/common/faq-section";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AiaTimesFaq() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-times-faq"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getFAQbySlug/aia-times`);
      return res.data;
    },
  });

  const faqItems =
    data?.data?.map((item, index) => ({
      id: `aia-times-faq-${index + 1}`,
      question: item.faq_que,
      answer: item.faq_ans,
      heading: item.faq_heading,
      sort: item.faq_sort,
    })) || [];

  if (isLoading || isError || !faqItems.length) return null;

  return <FaqSection faqs={faqItems} />;
}
