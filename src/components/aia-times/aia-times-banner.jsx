import { BASE_URL } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ASSET_BASE, getImageBase } from "./aia-times.constants";

export default function AiaTimesBanner() {
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
    <section className="relative aspect-[1007/452] w-full overflow-hidden bg-white">
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
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-700",
              index === activeBanner ? "opacity-100" : "opacity-0",
            )}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = `${ASSET_BASE}/subscribe.webp`;
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
