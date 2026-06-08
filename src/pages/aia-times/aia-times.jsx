import { useState } from "react";

import {
  AiaTimesBanner,
  AiaTimesBlogSection,
  AiaTimesContactSection,
  AiaTimesFaq,
  AiaTimesSubscribeSection,
  ConversationsSection,
  FloatingSubscribeButton,
  IntroSection,
  IssueShelf,
  PrMediaSection,
  TeamSection,
  WhatsNewSection,
  magazineIssues,
} from "@/components/aia-times";

export default function AiaTimes() {
  const [selectedIssueId, setSelectedIssueId] = useState(magazineIssues[0].id);
  const selectedIssue =
    magazineIssues.find((issue) => issue.id === selectedIssueId) ||
    magazineIssues[0];

  return (
    <div className="bg-white font-sans text-gray-800">
      <AiaTimesBanner />

      <FloatingSubscribeButton />
      <IntroSection />
      <IssueShelf
        selectedIssue={selectedIssue}
        onSelectIssue={setSelectedIssueId}
      />
      <WhatsNewSection />

      <AiaTimesSubscribeSection />
      <PrMediaSection />
      <AiaTimesBlogSection />
      <ConversationsSection />
      <TeamSection />
      <AiaTimesContactSection />
      <AiaTimesFaq />
    </div>
  );
}
