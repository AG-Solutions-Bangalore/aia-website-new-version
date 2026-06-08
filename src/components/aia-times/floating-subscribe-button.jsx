import PdfJoinDialog from "@/components/common/PdfForm";

import { MAGAZINE_COURSE } from "./aia-times.constants";

export default function FloatingSubscribeButton() {
  return (
    <div className="fixed bottom-28 cursor-pointer! right-4 z-40 md:right-6">
      <PdfJoinDialog
        course={MAGAZINE_COURSE}
        buttonlabel="Subscribe"
        buttonClassName="min-h-11 cursor-pointer! rounded-full bg-[#F3831C] px-6 py-2.5 text-sm font-extrabold text-white shadow-lg hover:bg-[#d96f10]"
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
  );
}
