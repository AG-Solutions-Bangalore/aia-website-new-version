import OptimizedImage from "@/components/common/optmized-image";

import { ASSET_BASE, conversationItems } from "./aia-times.constants";

export default function ConversationsSection() {
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
                className="h-auto w-full object-contain"
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
