import OptimizedImage from "@/components/common/optmized-image";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import ArticleContentBlock, { ArticleInlineContent } from "./article-content-block";
import { ASSET_BASE } from "./aia-times.constants";

export default function IssueDetailsSection({ selectedIssue }) {
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
                    {item.label === "01" ? (
                      <>
                        Decoding the Mindset Behind
                        <br />
                        <span className="text-blue-600">Every Financial Crime</span>
                      </>
                    ) : item.label === "02" ? (
                      <>
                        The Toshiba Fraud Story:{" "}
                        <span className="text-blue-600">Corporate Fraud</span>
                      </>
                    ) : (
                      item.heading
                    )}
                  </h2>
                ) : (
                  <div className="mb-5 text-right">
                    <p className="text-lg font-extrabold italic text-[#f36f21]">
                      {item.label} {item.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black md:text-3xl">
                      {item.label === "01" ? (
                        <>
                          Decoding the Mindset Behind
                          <br />
                          <span className="text-blue-600">Every Financial Crime</span>
                        </>
                      ) : item.label === "02" ? (
                        <>
                          The Toshiba Fraud Story:{" "}
                          <span className="text-blue-600">Corporate Fraud</span>
                        </>
                      ) : (
                        item.heading
                      )}
                    </h2>
                    {item.subheading && (
                      <p className="mt-1 text-lg font-extrabold leading-snug text-black">
                        {item.label === "03" ? (
                          <>
                            Numbers Don't Lie - But They Do
                            <br />
                            <span className="text-blue-600">Reveal</span>
                          </>
                        ) : (
                          item.subheading
                        )}
                      </p>
                    )}
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
                {index % 2 === 0 && item.subheading && (
                  <p className="text-lg font-extrabold italic leading-snug text-black">
                    {item.label === "03" ? (
                      <>
                        Numbers Don't Lie - But They Do
                        <br />
                        <span className="text-blue-600">Reveal</span>
                      </>
                    ) : (
                      item.subheading
                    )}
                  </p>
                )}
                <p className="mt-3 text-base leading-7 text-black">
                  {item.bodyLabel && (
                    <strong className="font-extrabold italic">
                      {item.bodyLabel}{" "}
                    </strong>
                  )}
                  <ArticleInlineContent
                    content={item.descriptionContent || item.description}
                    keyPrefix={`${item.title}-description`}
                  />
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
      >
        <DrawerContent className="flex max-h-[75vh] flex-col">
          <DrawerHeader className="flex flex-row items-start justify-between gap-4 bg-[#0F3652] text-left text-white">
            <div>
              <DrawerTitle className="text-xl font-bold text-white sm:text-2xl">
                {openArticle?.label === "01" ? (
                  <>
                    Decoding the Mindset Behind
                    <br />
                    <span className="text-blue-400">Every Financial Crime</span>
                  </>
                ) : openArticle?.label === "02" ? (
                  <>
                    The Toshiba Fraud Story:{" "}
                    <span className="text-blue-400">Corporate Fraud</span>
                  </>
                ) : (
                  openArticle?.heading
                )}
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
              <div className="mx-auto flex max-w-4xl flex-col gap-6 pb-28">
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
                  {openArticle.subheading && (
                    <p className="text-xl font-extrabold italic leading-snug text-black">
                      {openArticle.label === "03" ? (
                        <>
                          Numbers Don't Lie - But They Do
                          <br />
                          <span className="text-blue-600">Reveal</span>
                        </>
                      ) : (
                        openArticle.subheading
                      )}
                    </p>
                  )}
                  <div className="mt-4 space-y-4 text-base leading-8 text-slate-800">
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
    </section>
  );
}
