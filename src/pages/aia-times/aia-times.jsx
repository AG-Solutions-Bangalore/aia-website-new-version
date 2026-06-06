import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";
import PdfJoinDialog from "@/components/common/PdfForm";
import FaqSection from "@/components/common/faq-section";
import TextCaptcha from "@/components/custom-captcha/text-captcha";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Mail,
  Newspaper,
  Phone,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const ASSET_BASE = IMAGE_PATH;
const LOCAL_ASSET_BASE = "/images/AIATimes";
const MAGAZINE_COURSE = "AIA Times Magazine";

const whatsNewItems = [
  {
    title: "Becker Authorized Distributor",
    description:
      "AIA is now India's authorized Becker distributor for CIA preparation.",
    image: "time_becker.webp",
  },
  {
    title: "Partnership with ISACA",
    description:
      "AIA announces its strategic partnership with ISACA for professional learning initiatives.",
    image: "time_isaca.webp",
  },
  {
    title: "CIA Short Notes Launched",
    description:
      "Exclusive CIA short study notes launched by AIA for smart and strategic CIA prep.",
    image: "time_cia_short_notes.webp",
  },
  {
    title: "CFE 4-Day Residential Program",
    description:
      "Admissions open for AIA's exclusive 4-day CFE residential training program.",
    image: "time_cfe_resident_al_program.webp",
  },
];

const issueSections = [
  {
    label: "01",
    title: "Cover Story",
    heading: "Decoding the Mindset Behind Every Financial Crime",
    subheading:
      "The biggest risk in financial crime isn't what is hidden. It's what looks normal.",
    description:
      "Most financial crimes don't break the system. They quietly work within it. And that's exactly why they're getting harder to catch. Fraudsters today are strategic. They understand how systems work, and more importantly, how people expect those systems to behave. Instead of forcing their way through controls, they design transactions that fit perfectly within them. The result? Fraud that doesn't look like fraud.",
    image: "cover_story.webp",
    icon: "Icon1.webp",
    bodyLabel: "",
    fullContent: [
      "Most financial crimes don't break the system. They quietly work within it. And that's exactly why they're getting harder to catch. Fraudsters today are strategic. They understand how systems work, and more importantly, how people expect those systems to behave.",
      "Instead of forcing their way through controls, they design transactions that fit perfectly within them. The result is fraud that doesn't look like fraud, and that is what makes modern financial crime so difficult to detect through routine checks alone.",
    ],
  },
  {
    label: "02",
    title: "Case Study",
    heading: "The Toshiba Fraud Story:",
    subheading: "When Corporate Pressure Becomes Corporate Fraud",
    description:
      "For decades, Toshiba was regarded as a symbol of corporate reliability. Known for its engineering excellence and disciplined operations, the company enjoyed strong investor confidence and global credibility. That reputation suffered a major blow in 2015 when an independent investigation revealed that Toshiba had overstated its profits by nearly USD 1.2 billion over several years. What made the scandal particularly significant was not the complexity of the fraud, but the culture behind it. The Toshiba case remains one of the strongest examples of how organizational pressure and weak challenge culture can gradually distort financial reporting without obvious signs of traditional fraud.",
    image: "case_study.webp",
    icon: "Icon2.webp",
    bodyLabel: "Case Overview",
    fullContent: [
      "For decades, Toshiba was regarded as a symbol of corporate reliability. Known for its engineering excellence and disciplined operations, the company enjoyed strong investor confidence and global credibility.",
      "That reputation suffered a major blow in 2015 when an independent investigation revealed that Toshiba had overstated its profits by nearly USD 1.2 billion over several years. What made the scandal particularly significant was not the complexity of the fraud, but the culture behind it.",
      "The Toshiba case remains one of the strongest examples of how organizational pressure and weak challenge culture can gradually distort financial reporting without obvious signs of traditional fraud.",
    ],
  },
  {
    label: "03",
    title: "Learning Topic",
    heading: "Benford's Law",
    subheading: "When Numbers Stop Looking Natural",
    description:
      "Benford's Law helps investigators identify unusual number patterns in large data sets. It does not prove fraud by itself, but it can point auditors toward transactions, invoices, claims, or reports that deserve a closer look.",
    image: "learning_topic.webp",
    icon: "Icon3.webp",
    bodyLabel: "Learning Overview",
    fullContent: [
      "Benford's Law is a practical analytical concept used to understand how digits naturally appear in many real-world data sets. In genuine data, smaller leading digits often appear more frequently than larger ones.",
      "For auditors and investigators, this pattern can become a useful screening tool. When a data set behaves very differently from the expected distribution, it may indicate manipulation, rounding, fabricated entries, or a need for deeper review.",
      "The law is not a standalone conclusion. It is a signal that supports professional judgment, targeted testing, and stronger investigative focus.",
    ],
  },
  {
    label: "04",
    title: "Expert Talk",
    heading: "Truth Behind the Transactions",
    subheading: "Expert Perspectives on Fraud Risk and Controls",
    description:
      "Expert perspectives help connect technical controls with real-world behavior. Strong investigation work depends on understanding people, processes, pressure, and the small inconsistencies that often sit behind clean-looking transactions.",
    image: "expert_talk.webp",
    icon: "Icon4.webp",
    bodyLabel: "Expert Insight",
    fullContent: [
      "Behind every transaction is a process, and behind every process are people making decisions under deadlines, pressure, incentives, and expectations.",
      "Expert insight helps professionals look beyond surface-level compliance and ask sharper questions about behavior, approval patterns, documentation, and accountability.",
      "That mindset is essential for internal audit, compliance, fraud examination, AML, and corporate intelligence teams that need to identify risk before it becomes a larger failure.",
    ],
  },
];

const magazineIssues = [
  {
    id: "june-2026",
    issueDate: "June 2026",
    volume: "Vol. 01",
    category: "Magazine",
    title: "The Minds Behind The Money Trail",
    displayDate: "06 June 2026",
    description:
      "Discover expert insights, real-world investigations, and emerging trends shaping the future of forensic accounting and fraud examination.",
    cover: "aia_times_magazine.webp",
    coverAlt: "AIA Times June 2026 cover",
    highlights: issueSections,
    isAvailable: true,
  },
  {
    id: "coming-soon",
    issueDate: "Coming Soon",
    volume: "Vol. 02",
    category: "Magazine",
    title: "Coming Soon",
    displayDate: "Coming Soon",
    description:
      "Future editions with more expert views, events, and industry updates.",
    cover: "coming_soon.webp",
    coverAlt: "AIA Times coming soon issue",
    highlights: [],
    isAvailable: false,
  },
];

const conversationItems = [
  {
    type: "Podcast",
    title: "What worked five years ago won't protect your career today.",
    date: "25 Jan 2026",
    description:
      "Puneet Garg, shares what truly drives stable career growth in today's digital world.",
    image: "podcast.webp",
    imageAlt: "AIA Times podcast conversation",
    href: "https://www.youtube.com/@AcademyofInternalAudit",
  },
  {
    type: "Interview",
    title: "CFE Success Story - Meet Ms. Lakshmi Kolla",
    date: "20 May 2026",
    description:
      "Get inspired by the Ms. Lakshmi Kolla, CFE real-life success story with AIA!",
    image: "interview.webp",
    imageAlt: "CFE Success Story interview",
    href: "https://www.youtube.com/@AcademyofInternalAudit",
  },
];

const localFlipbookPages = Array.from({ length: 8 }, (_, index) => {
  const page = String(index + 1).padStart(2, "0");
  return `${LOCAL_ASSET_BASE}/flipbook/page-${page}.webp`;
});

const flipbookPageSources = localFlipbookPages.map((localPage, index) => {
  const page = index + 1;
  const padded = String(page).padStart(2, "0");
  const paddedThree = String(page).padStart(3, "0");

  return [
    `${IMAGE_PATH}/flipbook/${page}.webp`,
    `${IMAGE_PATH}/flipbook/${padded}.webp`,
    `${IMAGE_PATH}/flipbook/${paddedThree}.webp`,
    `${IMAGE_PATH}/flipbook/page-${page}.webp`,
    `${IMAGE_PATH}/flipbook/page-${padded}.webp`,
    `${IMAGE_PATH}/flipbook/page_${padded}.webp`,
    `${IMAGE_PATH}/flipbook/aia-times-${padded}.webp`,
    `${IMAGE_PATH}/flipbook/aia_times_${padded}.webp`,
    `${IMAGE_PATH}/flipbook/aia-times-magazine-${padded}.webp`,
    `${IMAGE_PATH}/flipbook/aia_times_magazine_${padded}.webp`,
    localPage,
  ];
});

function getImageBase(apiData, imageFor) {
  return (
    apiData?.image_url?.find((item) => item.image_for === imageFor)
      ?.image_url || ""
  );
}

function AiaTimesBanner() {
  const [activeBanner, setActiveBanner] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["aia-times-banner"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getBanner/aia-times`);
      return res.data;
    },
  });

  const bannerBase = getImageBase(data, "Banner");
  const banners = useMemo(() => {
    const apiBanners =
      data?.data
        ?.slice(0, 3)
        .map((banner, index) => ({
          id: banner.id || `aia-times-banner-${index + 1}`,
          imageUrl: banner?.banner_image
            ? `${bannerBase}${banner.banner_image}`
            : "",
          alt: banner?.banner_image_alt || "AIA Times banner",
        }))
        .filter((banner) => banner.imageUrl) || [];

    return apiBanners.length
      ? apiBanners
      : [
          {
            id: "aia-times-fallback-banner",
            imageUrl: `${ASSET_BASE}/subscribe.webp`,
            alt: "AIA Times",
          },
        ];
  }, [bannerBase, data]);

  useEffect(() => {
    setActiveBanner(0);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  const showControls = banners.length > 1;
  const goToPrevious = () => {
    setActiveBanner((current) =>
      current === 0 ? banners.length - 1 : current - 1,
    );
  };
  const goToNext = () => {
    setActiveBanner((current) => (current + 1) % banners.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {isLoading ? (
        <div className="absolute inset-0 shimmer" />
      ) : (
        banners.map((banner, index) => (
          <OptimizedImage
            key={banner.id}
            src={banner.imageUrl}
            alt={banner.alt}
            width={1920}
            height={1080}
            priority={index === 0}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              index === activeBanner ? "opacity-100" : "opacity-0",
            )}
            onError={(event) => {
              event.currentTarget.src = `${LOCAL_ASSET_BASE}/subscribe.webp`;
            }}
          />
        ))
      )}

      {showControls && !isLoading && (
        <>
          <button
            type="button"
            aria-label="Previous AIA Times banner"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#0F3652] shadow-md transition-colors hover:bg-[#F3831C] hover:text-white md:left-8"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next AIA Times banner"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#0F3652] shadow-md transition-colors hover:bg-[#F3831C] hover:text-white md:right-8"
          >
            <ChevronRight size={22} />
          </button>
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {banners.map((banner, index) => (
              <button
                key={`${banner.id}-dot`}
                type="button"
                aria-label={`Show AIA Times banner ${index + 1}`}
                onClick={() => setActiveBanner(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === activeBanner
                    ? "w-8 bg-[#F3831C]"
                    : "w-2.5 bg-white/80 hover:bg-white",
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function IssueShelf({ selectedIssue, onSelectIssue }) {
  const openEMagazine = (issueId) => {
    onSelectIssue(issueId);
    window.setTimeout(() => {
      document
        .getElementById("aia-times-flipbook")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-14">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-black md:text-6xl">
            AIA Times <span className="text-[#ea6b2a]">Magazine</span>
          </h1>
          <p className="mx-auto mt-5 max-w-5xl text-base leading-7 text-black md:text-lg">
            Explore the latest insights, industry trends, expert opinions, and
            success stories from the world of audit, risk, and finance.
          </p>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <div>
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
                  className="h-full max-h-[430px] w-full object-cover object-top"
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
                      course={MAGAZINE_COURSE}
                      buttonlabel="Download Magazine"
                      buttonClassName="min-h-11 rounded-md bg-[#f36f21] px-7 py-2.5 text-sm font-semibold text-white hover:bg-[#d85f18]"
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

                {selectedIssue.highlights.length > 0 && (
                  <div className="mt-7">
                    <p className="text-sm font-extrabold italic text-[#f36f21]">
                      In This Issue
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {selectedIssue.highlights.map((item) => (
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

          <aside className="rounded-md bg-white/70 p-4 shadow-sm">
            <p className="text-lg font-extrabold italic text-[#f36f21]">
              All Issue
            </p>
            <div className="mt-4 space-y-4">
              {magazineIssues.map((issue) => {
                const isSelected = issue.id === selectedIssue.id;

                return (
                  <article
                    key={issue.id}
                    className={cn(
                      "grid gap-4 rounded-md bg-white p-3 shadow-sm transition-shadow sm:grid-cols-[110px_1fr]",
                      isSelected && "ring-2 ring-[#f36f21]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100",
                        !issue.isAvailable && "bg-[#0F3652]",
                      )}
                    >
                      <OptimizedImage
                        src={`${ASSET_BASE}/${issue.cover}`}
                        alt={issue.coverAlt}
                        width={180}
                        height={140}
                        className={cn(
                          "h-full w-full object-cover object-top",
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
                          <PdfJoinDialog
                            course={MAGAZINE_COURSE}
                            buttonlabel="Download"
                            buttonClassName="min-h-8 rounded-sm border border-[#f36f21] bg-white px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-[#f36f21] hover:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => openEMagazine(issue.id)}
                            className="inline-flex min-h-8 items-center justify-center rounded-sm border border-[#f36f21] bg-white px-3 py-1.5 text-[11px] font-semibold text-black transition-colors hover:bg-[#f36f21] hover:text-white"
                          >
                            E-Magazine
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
                );
              })}
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
    </section>
  );
}

function IssueDetailsSection({ selectedIssue }) {
  const [openArticleId, setOpenArticleId] = useState(null);
  const articles = selectedIssue?.highlights || [];
  const openArticle =
    articles.find((article) => article.title === openArticleId) || null;

  useEffect(() => {
    setOpenArticleId(null);
  }, [selectedIssue?.id]);

  const closeDrawer = () => {
    setOpenArticleId(null);
  };

  if (!selectedIssue?.isAvailable || articles.length === 0) return null;

  return (
    <section className="bg-[#f7f7f7] pb-10 md:pb-14">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-slate-200 bg-white">
          {articles.map((item, index) => {
            const imageBlock = (
              <div>
                {index % 2 === 0 ? (
                  <h2 className="mb-5 text-2xl font-extrabold leading-tight text-black md:text-3xl">
                    {item.heading}
                  </h2>
                ) : (
                  <div className="mb-5 text-right">
                    <p className="text-lg font-extrabold italic text-[#f36f21]">
                      {item.label} {item.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black md:text-3xl">
                      {item.heading}
                    </h2>
                    <p className="mt-1 text-lg font-extrabold leading-snug text-black">
                      {item.subheading}
                    </p>
                  </div>
                )}
                <div className="overflow-hidden rounded-md bg-slate-100 p-3">
                  <OptimizedImage
                    src={`${ASSET_BASE}/${item.image}`}
                    alt={item.heading}
                    width={720}
                    height={420}
                    className="h-full max-h-[320px] w-full rounded-sm object-cover"
                  />
                </div>
              </div>
            );

            const textBlock = (
              <div
                className={cn(
                  "flex h-full flex-col justify-center text-black",
                  index === 0 &&
                    "rounded-lg border-2 border-[#f36f21] bg-white p-5",
                )}
              >
                {index % 2 === 0 && (
                  <p className="text-lg font-extrabold italic leading-snug text-black">
                    {item.subheading}
                  </p>
                )}
                <p className="mt-3 text-base leading-7 text-black">
                  {item.bodyLabel && (
                    <strong className="font-extrabold italic">
                      {item.bodyLabel}{" "}
                    </strong>
                  )}
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenArticleId(item.title)}
                  className="mt-3 inline-flex w-fit items-center text-sm font-extrabold italic text-[#f36f21] transition-colors hover:text-[#0F3652]"
                >
                  Read More
                </button>
              </div>
            );

            return (
              <article
                key={item.title}
                className="grid gap-7 px-4 py-8 md:px-8 md:py-10 lg:grid-cols-2 lg:items-center"
              >
                {index % 2 === 0 ? (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                ) : (
                  <>
                    {textBlock}
                    {imageBlock}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <Drawer
        open={openArticle !== null}
        onOpenChange={(open) => {
          if (!open) closeDrawer();
        }}
        snapPoints={[0.7]}
      >
        <DrawerContent className="flex max-h-[95vh] flex-col">
          <DrawerHeader className="flex flex-row items-start justify-between gap-4 bg-[#0F3652] text-left text-white">
            <div>
              <DrawerTitle className="text-xl font-bold text-white sm:text-2xl">
                {openArticle?.heading}
              </DrawerTitle>
              <DrawerDescription className="mt-2 text-sm font-semibold text-[#F3831C]">
                {openArticle?.label} {openArticle?.title}
                {openArticle?.subheading ? ` - ${openArticle.subheading}` : ""}
              </DrawerDescription>
            </div>
            <button
              type="button"
              aria-label="Close article"
              onClick={closeDrawer}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm bg-[#F3831C] text-white transition-colors hover:bg-[#d96f10]"
            >
              <X size={18} />
            </button>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7">
            {openArticle && (
              <div className="mx-auto grid max-w-6xl gap-6 pb-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="overflow-hidden rounded-md bg-slate-100 p-3">
                  <OptimizedImage
                    src={`${ASSET_BASE}/${openArticle.image}`}
                    alt={openArticle.heading}
                    width={900}
                    height={520}
                    className="max-h-[420px] w-full rounded-sm object-cover"
                  />
                </div>
                <div>
                  <p className="text-xl font-extrabold italic leading-snug text-black">
                    {openArticle.subheading}
                  </p>
                  <div className="mt-4 space-y-4 text-base leading-8 text-slate-800">
                    {openArticle.fullContent.map((paragraph) => (
                      <p key={paragraph}>
                        {openArticle.bodyLabel &&
                        paragraph === openArticle.fullContent[0] ? (
                          <strong className="font-extrabold italic text-black">
                            {openArticle.bodyLabel}{" "}
                          </strong>
                        ) : null}
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
}

function FloatingSubscribeButton() {
  return (
    <div className="fixed bottom-24 right-4 z-40 md:right-6">
      <PdfJoinDialog
        course={MAGAZINE_COURSE}
        buttonlabel="Subscribe"
        buttonClassName="min-h-11 rounded-full bg-[#F3831C] px-6 py-2.5 text-sm font-extrabold text-white shadow-lg hover:bg-[#d96f10]"
      />
    </div>
  );
}

function ConversationsSection() {
  const youtubeUrl = conversationItems[0].href;

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-extrabold leading-tight text-black md:text-6xl">
          Watch the Conversations{" "}
          <span className="text-[#F3831C]">That Matter</span>
        </h2>

        <div className="mx-auto mt-6 max-w-6xl space-y-4">
          {conversationItems.map((item) => (
            <article
              key={item.title}
              className="grid gap-4 md:grid-cols-[230px_1fr] md:items-start"
            >
              <OptimizedImage
                src={`${ASSET_BASE}/${item.image}`}
                alt={item.imageAlt}
                width={320}
                height={180}
                className="h-32 w-full object-cover md:h-[120px]"
              />
              <div className="pt-1">
                <p className="text-xs font-medium italic text-black">
                  {item.type}
                </p>
                <h3 className="mt-2 text-xl font-extrabold leading-tight text-black md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-black">
                  <strong className="font-semibold italic text-black">
                    {item.date} -{" "}
                  </strong>
                  {item.description}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex text-xs font-medium italic text-[#F3831C] underline-offset-2 transition-colors hover:text-[#d96f10] hover:underline"
                >
                  Watch Now
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center bg-[#F3831C] px-7 py-2 text-sm font-bold text-white transition-colors hover:bg-[#d96f10]"
          >
            Visit Our YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
}

function AiaTimesContactSection() {
  const [formData, setFormData] = useState({
    userName: "",
    userMobile: "",
    userEmail: "",
    userMessage: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "userMobile" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.userName.trim())
      nextErrors.userName = "Full name is required";
    if (!formData.userMobile.trim())
      nextErrors.userMobile = "Phone number is required";
    if (!formData.userEmail.trim())
      nextErrors.userEmail = "Email address is required";
    if (!captchaVerified)
      nextErrors.captcha = "Captcha verification is required";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-webenquiry`,
        {
          ...formData,
          userType: MAGAZINE_COURSE,
          userCourse: MAGAZINE_COURSE,
          userLocation: "",
        },
        { headers: { "Content-Type": "application/json" } },
      );

      if (response.data?.code == "200") {
        toast.success(response.data.msg || "Message sent successfully.");
        setFormData({
          userName: "",
          userMobile: "",
          userEmail: "",
          userMessage: "",
        });
        setCaptchaVerified(false);
      } else {
        toast.error(response.data?.msg || "Something went wrong.");
      }
    } catch (error) {
      toast.error(
        error.response?.data || error.message || "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "mt-1.5 min-h-10 w-full border-2 border-black bg-white px-3 text-sm text-black outline-none transition-colors focus:border-[#F3831C]";
  const labelClassName = "text-xs font-medium text-black";

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto grid max-w-340 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8">
        <div className="pt-3 lg:pr-12">
          <p className="max-w-2xl text-xs font-extrabold leading-5 text-[#F3831C]">
            AIA TIMES is committed to creating a platform where professionals
            can learn, share knowledge, exchange perspectives, and stay updated
            with the latest developments.
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#0F3652] md:text-5xl">
            Connect with AIA TIMES
          </h2>
          <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-[#4f7196]">
            If you have any questions, feedback, ideas, or collaboration
            proposals, we&apos;d love to hear from you. Whether you&apos;re
            looking to contribute your expertise, get featured, promote a
            professional initiative, or simply want to connect with our team,
            AIA TIMES welcomes voices that inspire learning and industry
            awareness.
          </p>
          <div className="mt-5 h-1 w-full max-w-2xl bg-[#F3831C]" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white text-black">
          <div className="grid gap-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClassName}>Full Name:</label>
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.userName && (
                  <p className="mt-1 text-xs text-red-600">{errors.userName}</p>
                )}
              </div>
              <div>
                <label className={labelClassName}>Phone Number:</label>
                <input
                  name="userMobile"
                  type="tel"
                  value={formData.userMobile}
                  onChange={handleChange}
                  className={inputClassName}
                  maxLength={10}
                />
                {errors.userMobile && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.userMobile}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className={labelClassName}>Email Address:</label>
              <input
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
                className={inputClassName}
              />
              {errors.userEmail && (
                <p className="mt-1 text-xs text-red-600">{errors.userEmail}</p>
              )}
            </div>
            <div>
              <label className={labelClassName}>Type Your Message:</label>
              <textarea
                name="userMessage"
                value={formData.userMessage}
                onChange={handleChange}
                className={`${inputClassName} min-h-24 resize-y py-3`}
              />
            </div>
            <div className="grid items-start gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <TextCaptcha
                  onVerify={(verified) => {
                    setCaptchaVerified(verified);
                    if (verified) {
                      setErrors((current) => {
                        const next = { ...current };
                        delete next.captcha;
                        return next;
                      });
                    }
                  }}
                  onRefresh={() => setCaptchaVerified(false)}
                  showVerifyButton={false}
                  autoVerify
                />
                {errors.captcha && (
                  <p className="mt-1 text-xs text-red-600">{errors.captcha}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-10 rounded-none bg-[#f3b279] px-6 text-xs font-bold text-white hover:bg-[#F3831C]"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="bg-white py-8 md:py-10">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="space-y-5 text-sm leading-6 text-black md:text-[15px] md:leading-7">
          <p>
            Welcome to{" "}
            <strong>
              <em>AIA Times</em> &mdash; the official hub for the latest
              updates, industry insights, achievements, and thought leadership
              from AIA.
            </strong>{" "}
            This platform is designed to keep students, professionals, and
            industry enthusiasts informed about everything happening within the
            AIA community and the world of financial crime investigation,
            compliance, fraud examination, AML, and corporate intelligence. From
            exclusive magazine editions and expert articles to press releases,
            event highlights, certification updates, webinars, and industry
            news, <em>AIA Times</em> brings together{" "}
            <em>valuable information in one dynamic space.</em>
          </p>
          <p>
            Here, you can{" "}
            <strong>
              explore trending developments, discover professional insights,
              stay updated with upcoming initiatives, and gain access to
              knowledge that supports career growth and industry awareness.
            </strong>{" "}
            <em>AIA Times</em> reflects our commitment to{" "}
            <em>education, innovation, and professional excellence</em> by
            showcasing impactful stories, expert perspectives, student
            achievements, and important updates from across the industry.
            Whether you are looking for the latest edition of our magazine,
            media coverage, or key announcements, this page serves as your
            central destination for staying connected with AIA and the evolving
            world of investigations, compliance, and financial intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatsNewSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          title="What's New at AIA"
          description="Recent launches, strategic partnerships, and key professional updates."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatsNewItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#F3831C]/60 hover:shadow-lg"
            >
              <div className="flex h-36 items-center justify-center bg-[#f8fafc] p-4">
                <OptimizedImage
                  src={`${ASSET_BASE}/${item.image}`}
                  alt={item.title}
                  width={213}
                  height={152}
                  className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0F3652]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrMediaSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-times-pr"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getPrAIATime`);
      return res.data;
    },
  });

  const prItems = useMemo(() => {
    const imageBase = getImageBase(data, "Pr");
    return (data?.data || []).map((item) => ({
      id: item.id,
      title: item.pr_heading,
      buttonTitle: item.button_title,
      link: item.pr_link,
      image: item.pr_l_image
        ? `${imageBase}${item.pr_l_image}`
        : `${data?.image_url?.[0]?.image_url || "/no-image.svg"}`,
      alt: item.pr_image_alt || item.button_title || "AIA media feature",
    }));
  }, [data]);

  const featured =
    prItems.find((item) => item.buttonTitle?.toLowerCase().includes("suger")) ||
    prItems[0];

  const preferredRightTitles = ["CEO Insights", "Hans India", "BW Education"];
  const rightItems = preferredRightTitles
    .map((title) =>
      prItems.find(
        (item) =>
          item.id !== featured?.id &&
          item.buttonTitle?.toLowerCase().includes(title.toLowerCase()),
      ),
    )
    .filter(Boolean);

  const preferredBottomTitles = ["Your Story", "Tycoon", "News18"];
  const bottomPreferredItems = preferredBottomTitles
    .map((title) =>
      prItems.find(
        (item) =>
          item.id !== featured?.id &&
          !rightItems.some((rightItem) => rightItem.id === item.id) &&
          item.buttonTitle?.toLowerCase().includes(title.toLowerCase()),
      ),
    )
    .filter(Boolean);

  const remainingBottomItems = prItems.filter(
    (item) =>
      item.id !== featured?.id &&
      !rightItems.some((rightItem) => rightItem.id === item.id) &&
      !bottomPreferredItems.some((bottomItem) => bottomItem.id === item.id),
  );
  const bottomItems = [...bottomPreferredItems, ...remainingBottomItems].slice(
    0,
    3,
  );

  if (isLoading) {
    return (
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
          <div className="h-96 shimmer" />
        </div>
      </section>
    );
  }

  if (isError || !featured) return null;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-black md:text-6xl">
            News & Media <span className="text-[#F3831C]">Spotlights</span>
          </h2>
          <p className="mt-4 text-base font-medium text-black md:text-lg">
            Explore our latest media features, recognitions, and industry
            mentions.
          </p>
        </div>

        <div className="mt-9 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="overflow-hidden border-2 border-[#F3831C] bg-white">
                <OptimizedImage
                  src={featured.image}
                  alt={featured.alt}
                  width={980}
                  height={620}
                  className="h-full min-h-[360px] w-full object-cover object-top"
                  onError={(event) => {
                    event.currentTarget.src = "/no-image.svg";
                  }}
                />
              </div>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="whitespace-pre-line text-xl font-extrabold italic leading-snug text-black underline decoration-black underline-offset-3">
                  {featured.title}
                </h3>
                <span className="inline-flex min-h-7 w-fit shrink-0 items-center justify-center rounded-full border border-[#F3831C] px-3 py-1 text-[11px] font-bold text-black transition-colors group-hover:bg-[#F3831C] group-hover:text-white">
                  Read More on {featured.buttonTitle}
                </span>
              </div>
            </a>
          </div>

          <div className="grid gap-4">
            {rightItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-3 sm:grid-cols-[190px_1fr] sm:items-center"
              >
                <div className="overflow-hidden border-2 border-[#F3831C] bg-white">
                  <OptimizedImage
                    src={item.image}
                    alt={item.alt}
                    width={320}
                    height={230}
                    className="h-40 w-full object-cover object-top"
                    onError={(event) => {
                      event.currentTarget.src = "/no-image.svg";
                    }}
                  />
                </div>
                <div>
                  <h3 className="whitespace-pre-line text-base font-extrabold italic leading-snug text-black underline decoration-black underline-offset-3">
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex min-h-7 w-fit items-center justify-center rounded-full border border-[#F3831C] px-3 py-1 text-[10px] font-bold text-black transition-colors group-hover:bg-[#F3831C] group-hover:text-white">
                    Read More on {item.buttonTitle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {bottomItems.length > 0 && (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {bottomItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-3 sm:grid-cols-[150px_1fr] sm:items-center"
              >
                <div className="overflow-hidden border-2 border-[#F3831C] bg-white">
                  <OptimizedImage
                    src={item.image}
                    alt={item.alt}
                    width={260}
                    height={180}
                    className="h-28 w-full object-cover object-top"
                    onError={(event) => {
                      event.currentTarget.src = "/no-image.svg";
                    }}
                  />
                </div>
                <div>
                  <h3 className="whitespace-pre-line text-sm font-extrabold italic leading-snug text-black underline decoration-black underline-offset-3">
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex min-h-7 w-fit items-center justify-center rounded-full border border-[#F3831C] px-3 py-1 text-[10px] font-bold text-black transition-colors group-hover:bg-[#F3831C] group-hover:text-white">
                    Read More on {item.buttonTitle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SourceFallbackImage({ sources, alt, className, onExhausted }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];

  useEffect(() => {
    if (src) return;
    onExhausted?.();
  }, [onExhausted, src]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setSourceIndex((current) => current + 1)}
    />
  );
}

function FlipbookSection() {
  const [activePage, setActivePage] = useState(0);
  const [missingPages, setMissingPages] = useState(() => new Set());

  const visiblePages = useMemo(
    () =>
      flipbookPageSources
        .map((sources, index) => ({ sources, index }))
        .filter((page) => !missingPages.has(page.index)),
    [missingPages],
  );

  const currentPage = visiblePages[activePage] || visiblePages[0];

  const markMissing = (index) => {
    setMissingPages((previous) => {
      if (previous.has(index)) return previous;
      const next = new Set(previous);
      next.add(index);
      return next;
    });
    setActivePage((current) => Math.max(0, current - 1));
  };

  const goToPrevious = () => {
    setActivePage((current) =>
      current === 0 ? Math.max(visiblePages.length - 1, 0) : current - 1,
    );
  };

  const goToNext = () => {
    setActivePage((current) =>
      visiblePages.length ? (current + 1) % visiblePages.length : 0,
    );
  };

  return (
    <section
      id="aia-times-flipbook"
      className="scroll-mt-32 bg-[#0F3652] py-12 md:scroll-mt-36 md:py-16"
    >
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#F3831C]">
              E-Magazine
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">
              Flip Through AIA Times
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              aria-label="Previous magazine page"
              onClick={goToPrevious}
              disabled={visiblePages.length <= 1}
              className="min-h-11 min-w-11 rounded-none bg-white text-[#0F3652] hover:bg-[#F3831C] hover:text-white"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              type="button"
              aria-label="Next magazine page"
              onClick={goToNext}
              disabled={visiblePages.length <= 1}
              className="min-h-11 min-w-11 rounded-none bg-white text-[#0F3652] hover:bg-[#F3831C] hover:text-white"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex min-h-[420px] items-center justify-center bg-[#071d2e] p-4 md:p-8">
            {currentPage ? (
              <div className="relative w-full max-w-3xl">
                <div className="absolute inset-0 translate-x-3 translate-y-3 border border-[#F3831C]/70" />
                <SourceFallbackImage
                  sources={currentPage.sources}
                  alt={`AIA Times magazine page ${currentPage.index + 1}`}
                  className="relative max-h-[760px] w-full bg-white object-contain shadow-2xl"
                  onExhausted={() => markMissing(currentPage.index)}
                />
              </div>
            ) : (
              <div className="grid w-full max-w-3xl gap-6 bg-white p-6 md:grid-cols-[220px_1fr] md:items-center">
                <OptimizedImage
                  src={`${ASSET_BASE}/aia_times_magazine.webp`}
                  alt="AIA Times Magazine"
                  width={1585}
                  height={2000}
                  className="mx-auto max-h-80 w-auto object-contain"
                />
                <div>
                  <h3 className="text-2xl font-bold text-[#0F3652]">
                    AIA Times Magazine
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Read the latest AIA Times issue or download the magazine to
                    keep the edition with you.
                  </p>
                  <div className="mt-5">
                    <PdfJoinDialog
                      course={MAGAZINE_COURSE}
                      buttonlabel="Download Magazine"
                      buttonClassName="min-h-11 rounded-none bg-[#F3831C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d96f10]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="bg-white p-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-[#0F3652]">
              <Newspaper size={18} />
              <h3 className="font-bold">Magazine Pages</h3>
            </div>
            <div className="mt-4 grid max-h-[520px] grid-cols-2 gap-3 overflow-y-auto pr-1">
              {visiblePages.slice(0, 12).map((page, index) => (
                <button
                  key={page.index}
                  type="button"
                  onClick={() => setActivePage(index)}
                  className={cn(
                    "min-h-24 border bg-slate-50 p-2 text-left transition-colors",
                    index === activePage
                      ? "border-[#F3831C]"
                      : "border-slate-200 hover:border-[#F3831C]/60",
                  )}
                >
                  <SourceFallbackImage
                    sources={page.sources}
                    alt={`AIA Times thumbnail ${page.index + 1}`}
                    className="h-28 w-full object-cover object-top"
                    onExhausted={() => markMissing(page.index)}
                  />
                  <span className="mt-2 block text-xs font-semibold text-[#0F3652]">
                    Page {page.index + 1}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-times-team"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getTeamAIATime`);
      return res.data;
    },
  });

  const team = useMemo(() => {
    const imageBase = getImageBase(data, "Team");
    const noImage = getImageBase(data, "No Image") || "/no-image.svg";
    return (data?.data || []).map((member) => ({
      id: member.id,
      name: member.team_name,
      type: member.team_type,
      mobile: member.team_mobile,
      email: member.team_email,
      image: member.team_image ? `${imageBase}${member.team_image}` : noImage,
      alt: member.team_image_alt || member.team_name,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
          <div className="h-72 shimmer" />
        </div>
      </section>
    );
  }

  if (isError || !team.length) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-340 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-tight text-black md:text-6xl">
          Team for Your <span className="text-[#F3831C]">Endless Support</span>
        </h2>
        <p className="mt-3 text-base italic text-slate-700 md:text-lg">
          Your support system at AIA - feel free to connect for guidance,
          queries, or assistance.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member) => (
            <article key={member.id} className="text-center">
              <OptimizedImage
                src={member.image}
                alt={member.alt}
                width={180}
                height={180}
                className="mx-auto h-32 w-32 rounded-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/no-image.svg";
                }}
              />
              <h3 className="mt-5 text-xl font-bold text-black">
                {member.name}
              </h3>
              <p className="mt-2 min-h-6 text-sm text-slate-700">
                {member.type}
              </p>
              <div className="mt-4 space-y-3 text-left">
                <a
                  href={`tel:${member.mobile?.replace(/\s+/g, "")}`}
                  className="mx-auto flex min-h-8 w-fit items-center gap-2 text-sm text-black transition-colors hover:text-[#F3831C]"
                >
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#F3831C] text-white">
                    <Phone size={14} />
                  </span>
                  {member.mobile}
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="mx-auto flex min-h-8 w-fit items-center gap-2 break-all text-sm text-black transition-colors hover:text-[#F3831C]"
                >
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#F3831C] text-white">
                    <Mail size={14} />
                  </span>
                  {member.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiaTimesFaq() {
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
      <IssueDetailsSection selectedIssue={selectedIssue} />
      <WhatsNewSection />
      <PrMediaSection />

      <FlipbookSection />
      <ConversationsSection />
      <TeamSection />
      <AiaTimesContactSection />
      <AiaTimesFaq />
    </div>
  );
}
