import { BASE_URL } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

import { SERVER_NO_IMAGE, getImageBase } from "./aia-times.constants";

export default function PrMediaSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-times-pr"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getPrAIATime`);
      return res.data;
    },
  });

  const prItems = useMemo(() => {
    const imageBase = getImageBase(data, "Pr");
    const noImage = getImageBase(data, "No Image") || SERVER_NO_IMAGE;
    return (data?.data || []).map((item) => {
      let title = item.pr_heading;
      const lowerButton = (item.button_title || "").toLowerCase();

      if (lowerButton.includes("apn news")) {
        title = "APN News Featured Academy of Internal Audit";
      } else if (lowerButton.includes("yourstory") || lowerButton.includes("your story")) {
        title = "YourStory Features Puneet Garg’s Views on the Union Budget";
      } else if (lowerButton.includes("hans india")) {
        title = "Puneet Garg Shares Expert Insights in The Hans India";
      }

      return {
        id: item.id,
        title,
        buttonTitle: item.button_title,
        link: item.pr_link,
        image: item.pr_l_image ? `${imageBase}${item.pr_l_image}` : noImage,
        alt: item.pr_image_alt || item.button_title || "AIA media feature",
      };
    });
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

  const preferredBottomTitles = ["Yourstory", "Tycoon", "News18"];
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
    6,
  );

  if (isLoading) {
    return (
      <section className="bg-[#ECECEC] py-12 md:py-16">
        <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
          <div className="h-96 shimmer" />
        </div>
      </section>
    );
  }

  if (isError || !featured) return null;

  return (
    <section className="bg-[#ECECEC] py-10 md:py-14">
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
                  className="w-full h-auto min-h-[360px] object-contain"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = SERVER_NO_IMAGE;
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
                    className="h-auto w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = SERVER_NO_IMAGE;
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
          <div className="mt-10 flex overflow-x-auto gap-5 pb-4 scrollbar-thin scrollbar-thumb-[#F3831C]/20 scrollbar-track-transparent">
            {bottomItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-3 sm:grid-cols-[150px_1fr] sm:items-center w-[280px] sm:w-[360px] md:w-[380px] shrink-0"
              >
                <div className="overflow-hidden border-2 border-[#F3831C] bg-white">
                  <OptimizedImage
                    src={item.image}
                    alt={item.alt}
                    width={260}
                    height={180}
                    className="h-auto w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = SERVER_NO_IMAGE;
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
