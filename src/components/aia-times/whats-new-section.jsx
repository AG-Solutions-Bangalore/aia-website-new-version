import OptimizedImage from "@/components/common/optmized-image";
import { cn } from "@/lib/utils";

import { ASSET_BASE, whatsNewItems } from "./aia-times.constants";

export default function WhatsNewSection() {
  return (
    <section className="bg-[#0F3652] py-9 md:py-10">
      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
          <div className="text-white">
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
              What&apos;s New at AIA
            </h2>
            <p className="mt-2 max-w-xs text-base font-medium leading-6 text-white/90">
              Recent Launches, Strategic Partnerships & Key Professional
              Updates
            </p>
          </div>

          <div className="min-w-0">
            <div className="overflow-x-auto pb-6 [scrollbar-color:#F3831C_#efe3d6] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#F3831C] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#efe3d6]">
              <div className="flex w-max min-w-full gap-5">
                {whatsNewItems.map((item, index) => (
                  <article
                    key={item.title}
                    className={cn(
                      "w-60 shrink-0 pl-5 text-center",
                      index > 0 && "border-l border-white/70",
                    )}
                  >
                    <div className="flex h-36 w-full items-center justify-center bg-white p-4">
                      <OptimizedImage
                        src={`${ASSET_BASE}/${item.image}`}
                        alt={item.title}
                        width={240}
                        height={150}
                        className="max-h-full w-full object-contain"
                      />
                    </div>
                    <h3 className="mt-4 text-xs font-extrabold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mx-auto mt-1 max-w-52 text-[10px] font-medium leading-4 text-white/85">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
