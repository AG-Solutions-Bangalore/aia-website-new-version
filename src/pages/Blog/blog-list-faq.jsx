import { BASE_URL } from "@/api/base-url";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const BlogListFaq = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["aia-faq"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getFAQbySlug/blog`);
      return res.data;
    },
  });

  const faqHeading = data?.data?.[0]?.faq_heading;

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
      <div className="mx-auto max-w-340 px-4 ">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-foreground text-4xl font-semibold">{"FAQs"}</h2>
            <h2 className="text-foreground text-4xl font-semibold">
              {faqHeading || ""}
            </h2>
            <h2 className="text-foreground text-lg font-medium">
              {faqHeading}
            </h2>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-[#F3831C]/20"
                >
                  <AccordionTrigger className="cursor-pointer text-[#0F3652] font-medium hover:no-underline hover:text-[#F3831C] text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[#0F3652] text-base whitespace-pre-line">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogListFaq;
