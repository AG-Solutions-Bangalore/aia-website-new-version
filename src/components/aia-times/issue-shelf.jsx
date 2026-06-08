import OptimizedImage from "@/components/common/optmized-image";
import PdfJoinDialog from "@/components/common/PdfForm";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BookOpen, X } from "lucide-react";
import { useEffect, useState } from "react";

import ArticleContentBlock from "./article-content-block";
import FlipbookSection from "./flipbook-section";
import {
  ASSET_BASE,
  MAGAZINE_COURSE,
  magazineIssues,
} from "./aia-times.constants";

function getMagazineDownloadCourse(issue) {
  return `${MAGAZINE_COURSE} - ${issue.title}`;
}

function getMagazineDownloadData(issue) {
  return {
    userType: MAGAZINE_COURSE,
    userCourse: getMagazineDownloadCourse(issue),
    userMessage: `AIA Times magazine PDF request: ${issue.title} (${issue.issueDate})`,
  };
}

function getCardDescription(article) {
  const description = (article.description || "").trim();
  const lead = article.subheading?.trim();

  if (!description || !lead) {
    return description;
  }

  return description.toLowerCase().startsWith(lead.toLowerCase())
    ? description.slice(lead.length).trim()
    : description;
}

export default function IssueShelf({ selectedIssue, onSelectIssue }) {
  const [openArticleId, setOpenArticleId] = useState(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const articles = selectedIssue?.highlights || [];
  const openArticle =
    articles.find((article) => article.title === openArticleId) || null;

  useEffect(() => {
    setOpenArticleId(null);
  }, [selectedIssue?.id]);

  const closeArticle = () => {
    setOpenArticleId(null);
  };

  const readIssue = (issueId) => {
    onSelectIssue(issueId);
    window.setTimeout(() => {
      document
        .getElementById("aia-times-selected-issue")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const openEMagazine = (issueId) => {
    onSelectIssue(issueId);
    setIsFlipbookOpen(true);
  };

  const issueDetails =
    selectedIssue.isAvailable && articles.length > 0 ? (
      <div className="mt-16 flex w-full flex-col divide-y divide-[#EAEAEA] bg-white">
        {articles.map((item, index) => {
          const imageFirst = index % 2 === 0;
          const cardDescription = getCardDescription(item);
          const prefixText = item.bodyLabel || (!item.bodyLabel && item.subheading ? item.subheading : "");
          let cleanPrefixText = prefixText.trim();
          if (cleanPrefixText.endsWith(":")) {
            cleanPrefixText = cleanPrefixText.slice(0, -1).trim();
          }
          const isLongPrefix = cleanPrefixText.length > 30;

          const imageBlock = (
            <div className="w-full aspect-[1.6] flex items-center justify-center rounded-[20px] bg-[#F2F2F2] p-4">
              <div className="h-full w-full overflow-hidden rounded-[14px]">
                <OptimizedImage
                  src={`${ASSET_BASE}/${item.image}`}
                  alt={item.heading}
                  width={520}
                  height={430}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          );

          const textBlock = (
            <div className="flex min-w-0 flex-col text-left">
              {isLongPrefix ? (
                <>
                  <p className="text-[15px] md:text-[16px] font-extrabold italic leading-relaxed text-black mb-3">
                    {cleanPrefixText}
                  </p>
                  <p className="text-[15px] md:text-[16px] font-medium leading-relaxed text-[#333333] [text-align:justify]">
                    {cardDescription}
                  </p>
                </>
              ) : (
                <p className="text-[15px] md:text-[16px] font-medium leading-relaxed text-[#333333] [text-align:justify]">
                  {cleanPrefixText && (
                    <span className="font-extrabold italic text-black mr-2">
                      {cleanPrefixText}
                    </span>
                  )}
                  {cardDescription}
                </p>
              )}
              <button
                type="button"
                onClick={() => setOpenArticleId(item.title)}
                className={cn(
                  "mt-5 inline-flex w-fit cursor-pointer text-sm font-extrabold italic text-[#f36f21] transition-colors hover:text-[#0F3652]",
                  imageFirst ? "self-start" : "self-end",
                )}
              >
                Read More
              </button>
            </div>
          );

          const headingBlock = (
            <div className={cn("flex flex-col text-black", imageFirst ? "text-left" : "text-right")}>
              <p className="text-[13px] sm:text-sm font-extrabold italic tracking-wider text-[#f36f21]">
                {item.label} {item.title}
              </p>
              <h3 className="mt-2.5 text-xl sm:text-[22px] md:text-2xl font-extrabold leading-[1.2] text-black">
                {item.heading}
              </h3>
              {item.subheading && (
                <p className="mt-1 text-xl sm:text-[22px] md:text-2xl font-extrabold leading-[1.2] text-black">
                  {item.subheading}
                </p>
              )}
            </div>
          );

          return (
            <article
              key={item.title}
              className="bg-white py-10 md:py-14"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                  className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-y-4 lg:gap-x-16 items-start"
                >
                  {/* Heading */}
                  <div
                    className={cn(
                      "order-1 w-full mx-auto",
                      imageFirst
                        ? "lg:col-start-1 lg:col-end-6 lg:row-start-1 lg:ml-0 lg:mr-auto"
                        : "lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mr-0 lg:ml-auto",
                    )}
                    style={{ maxWidth: item.imageWidth || "470px" }}
                  >
                    {headingBlock}
                  </div>

                  {/* Image */}
                  <div
                    className={cn(
                      "order-2 w-full mx-auto",
                      imageFirst
                        ? "lg:col-start-1 lg:col-end-6 lg:row-start-2 lg:ml-0 lg:mr-auto"
                        : "lg:col-start-8 lg:col-end-13 lg:row-start-2 lg:mr-0 lg:ml-auto",
                    )}
                    style={{ maxWidth: item.imageWidth || "470px" }}
                  >
                    {imageBlock}
                  </div>

                  {/* Text */}
                  <div
                    className={cn(
                      "order-3",
                      imageFirst
                        ? "lg:col-start-6 lg:col-end-13 lg:row-start-2"
                        : "lg:col-start-1 lg:col-end-8 lg:row-start-2",
                    )}
                  >
                    {textBlock}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    ) : null;

  return (
    <section className="bg-[#F7F7F7] py-10 md:py-14">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-black md:text-7xl">
            AIA Times <span className="text-[#ea6b2a]">Magazine</span>
          </h1>
          <p className="mx-auto mt-5 max-w-5xl text-base leading-7 text-black md:text-lg">
            Explore the latest insights, industry trends, expert opinions, and
            success stories from the world of audit, risk, and finance.
          </p>
        </div>

        <div
          id="aia-times-selected-issue"
          className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start"
        >
          <div className="min-w-0 ">
            <p className="text-lg font-extrabold italic text-[#f36f21]">
              Latest Issue
            </p>

            <div className="mt-4 grid gap-6 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="bg-white shadow-sm">
                <OptimizedImage
                  src={`${ASSET_BASE}/${selectedIssue.cover}`}
                  alt={selectedIssue.coverAlt}
                  width={1585}
                  height={2000}
                  className="h-full max-h-[430px] w-full object-contain object-top"
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-sm italic text-black">
                  {selectedIssue.category}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight text-black md:text-3xl">
                  {selectedIssue.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base italic leading-7 text-black">
                  {selectedIssue.displayDate}
                  {selectedIssue.isAvailable && " - "}
                  {selectedIssue.description}
                </p>

                {selectedIssue.isAvailable ? (
                  <div className="mt-7 flex flex-wrap gap-5">
                    <PdfJoinDialog
                      course={getMagazineDownloadCourse(selectedIssue)}
                      buttonlabel="Download Magazine"
                      buttonClassName="min-h-11 rounded-md bg-[#f36f21] px-7 py-2.5 text-sm font-semibold text-white hover:bg-[#d85f18]"
                      extraFormData={getMagazineDownloadData(selectedIssue)}
                      hideLocation
                      submitLabel="Send Magazine"
                      successMessage="Magazine PDF request submitted. Please check your email."
                    />
                    <button
                      type="button"
                      onClick={() => openEMagazine(selectedIssue.id)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#f36f21] px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d85f18]"
                    >
                      <BookOpen size={17} />
                      View E-Magazine
                    </button>
                  </div>
                ) : (
                  <div className="mt-7">
                    <PdfJoinDialog
                      course={MAGAZINE_COURSE}
                      buttonlabel="Get Notified"
                      buttonClassName="min-h-11 rounded-md bg-[#f36f21] px-7 py-2.5 text-sm font-semibold text-white hover:bg-[#d85f18]"
                    />
                  </div>
                )}

                {articles.length > 0 && (
                  <div className="mt-7">
                    <p className="text-sm font-extrabold italic text-[#f36f21]">
                      In This Issue
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {articles.map((item) => (
                        <div key={item.title} className="text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center">
                            <OptimizedImage
                              src={`${ASSET_BASE}/${item.icon}`}
                              alt={item.title}
                              width={56}
                              height={56}
                              className="h-12 w-12 object-contain"
                            />
                          </div>
                          <p className="mt-2 text-xs font-extrabold text-black">
                            {item.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="rounded-md bg-[#eeeeee] p-4 shadow-none">
            <p className="text-lg font-extrabold italic text-[#f36f21]">
              All Issue
            </p>
            <div className="mt-4 space-y-4">
              {magazineIssues.map((issue) => (
                <article
                  key={issue.id}
                  className={cn(
                    "grid gap-4 rounded-md bg-white p-3 shadow-sm transition-shadow sm:grid-cols-[110px_1fr]",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center overflow-hidden bg-slate-100",
                      !issue.isAvailable && "bg-[#0F3652]",
                    )}
                  >
                    <OptimizedImage
                      src={`${ASSET_BASE}/${issue.cover}`}
                      alt={issue.coverAlt}
                      width={180}
                      height={140}
                      className={cn(
                        "h-full w-full object-contain object-top",
                        !issue.isAvailable && "h-20 w-auto object-contain",
                      )}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold italic text-black">
                      {issue.issueDate}
                    </p>
                    <p className="text-[11px] font-bold text-black">
                      {issue.volume}
                    </p>
                    <h3 className="mt-2 text-sm font-extrabold leading-tight text-black">
                      {issue.title}
                    </h3>
                    {issue.isAvailable ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => readIssue(issue.id)}
                          className="inline-flex min-h-8 items-center justify-center rounded-sm border border-[#f36f21] bg-white px-3 py-1.5 text-[11px] font-semibold text-black transition-colors hover:bg-[#f36f21] hover:text-white"
                        >
                          Read Issue
                        </button>
                      </div>
                    ) : (
                      <PdfJoinDialog
                        course={MAGAZINE_COURSE}
                        buttonlabel="Get Notified"
                        buttonClassName="mt-3 min-h-8 rounded-sm border border-[#f36f21] bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#f36f21] hover:text-white"
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {magazineIssues.map((issue) => (
                <span
                  key={issue.id}
                  className={cn(
                    "h-3 w-3 rounded-full",
                    issue.id === selectedIssue.id ? "bg-[#f36f21]" : "bg-white",
                  )}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>

      {issueDetails}

      <Drawer
        open={openArticle !== null}
        onOpenChange={(open) => {
          if (!open) closeArticle();
        }}
      >
        <DrawerContent className="flex max-h-[75vh] flex-col">
          <DrawerHeader className="flex flex-row items-start justify-between gap-4 bg-[#0F3652] text-left text-white">
            <div>
              <DrawerTitle className="text-xl font-bold text-white sm:text-2xl">
                {openArticle?.heading}
              </DrawerTitle>
              <DrawerDescription className="mt-1.5 text-xs sm:text-sm font-semibold text-[#F3831C]">
                {openArticle?.label} {openArticle?.title}
                {openArticle?.subheading ? ` - ${openArticle.subheading}` : ""}
              </DrawerDescription>
            </div>
            <button
              type="button"
              aria-label="Close article"
              onClick={closeArticle}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm bg-[#F3831C] text-white transition-colors hover:bg-[#d96f10]"
            >
              <X size={18} />
            </button>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7">
            {openArticle && (
              <div className="mx-auto flex max-w-4xl flex-col gap-6 pb-28">
                <div className="flex min-h-[200px] sm:min-h-[260px] items-center justify-center rounded-xl bg-slate-100 p-3">
                  <div
                    className="flex w-full items-center justify-center overflow-hidden rounded-xl"
                    style={{ maxWidth: openArticle.imageWidth || "520px" }}
                  >
                    <OptimizedImage
                      src={`${ASSET_BASE}/${openArticle.image}`}
                      alt={openArticle.heading}
                      width={900}
                      height={520}
                      className="max-h-[420px] w-full rounded-xl object-contain"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold italic leading-snug text-black">
                    {openArticle.subheading}
                  </p>
                  <div className="mt-4 space-y-4 text-[15px] sm:text-base leading-7 sm:leading-8 text-slate-800">
                    {openArticle.fullContent.map((block, index) => (
                      <ArticleContentBlock
                        key={`${openArticle.title}-${index}`}
                        article={openArticle}
                        block={block}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>

      <Dialog open={isFlipbookOpen} onOpenChange={setIsFlipbookOpen}>
        <DialogContent className="max-h-[78vh] w-[92vw] mt-16 max-w-5xl overflow-hidden border-0 bg-[#0F3652] p-0 shadow-2xl sm:rounded-md">
          <DialogHeader className="sr-only">
            <DialogTitle>AIA Times E-Magazine</DialogTitle>
            <DialogDescription>
              Read the complete AIA Times magazine in flipbook format.
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-3 top-3 z-10 inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm bg-[#F3831C] text-white transition-colors hover:bg-[#d96f10]">
            <X size={18} />
            <span className="sr-only">Close e-magazine</span>
          </DialogClose>
          <FlipbookSection isPopup />
        </DialogContent>
      </Dialog>
    </section>
  );
}
