import PdfJoinDialog from "@/components/common/PdfForm";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { MAGAZINE_COURSE } from "./aia-times.constants";

export default function AiaTimesSubscribeSection() {
  return (
    <section className="bg-white py-9 md:py-12">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-56 overflow-hidden bg-[#efefef] px-7 py-8 sm:px-10 md:px-14 md:py-10">
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-4">
              <p className="text-base font-medium tracking-[0.42em] text-[#1d213b]">
                AIA TIMES
              </p>
              <span className="h-0.5 w-10 bg-[#1d213b]" />
            </div>

            <h2 className="mt-8 text-3xl font-medium leading-tight tracking-normal text-[#1d213b] md:text-4xl">
              Insights. Updates. Inspiration.
            </h2>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.38em] text-[#6d7084]">
              Delivered to your inbox.
            </p>

            <PdfJoinDialog
              course={MAGAZINE_COURSE}
              buttonlabel={
                <>
                  <span>SUBSCRIBE</span>
                  <ArrowRight size={18} />
                </>
              }
              buttonClassName="mt-7 min-h-12 rounded-sm bg-[#20233d] px-7 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white shadow-sm hover:bg-[#15172b]"
              extraFormData={{
                userType: MAGAZINE_COURSE,
                userCourse: "AIA Times Subscription",
                userMessage: "AIA Times newsletter subscription request.",
              }}
              hideLocation
              fieldOrder="phoneFirst"
              submitLabel="Subscribe"
              successMessage="Subscription request submitted successfully."
            />
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block">
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={0.9}
              className="absolute right-[14%] top-2 h-48 w-48 text-[#1d213b]"
            />
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={0.8}
              className="absolute -right-8 top-9 h-44 w-44 text-[#8f92a1]"
            />
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={0.9}
              className="absolute right-[34%] bottom-3 h-44 w-44 text-[#1d213b]"
            />
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={0.75}
              className="absolute right-[3%] -bottom-3 h-44 w-44 text-[#aeb0bd]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
