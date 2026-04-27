import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const BlogFaq = ({ title = "FAQs", faqs }) => {
  if (!faqs?.length) return null;

  return (
    <section className="py-2">
      <div className="mx-auto max-w-7xl ">
        <div className="grid gap-8 ">
          <div className="md:col-span-2">
            <h2 className="text-[#0F3652] text-4xl font-semibold">{title}</h2>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible>
              {faqs.map((item) => (
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

export default BlogFaq;
