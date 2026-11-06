import { IMAGE_PATH } from "@/api/base-url";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { prefetchPopup } from "@/lib/popup-cache";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const IMAGE_OPEN_FALLBACK_MS = 1200;

const PopUp = ({ slug = "home" }) => {
  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const storageKey = `popup_hidden_${slug}`;

  useEffect(() => {
    const popupHidden = sessionStorage.getItem("popup_hidden_globally");
    if (popupHidden === "true") {
      setDontShowAgain(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    prefetchPopup(slug)
      .then((response) => {
        if (cancelled) return;

        const data = response?.data;
        if (!data || data.popup_required !== "Yes") return;
        if (sessionStorage.getItem(storageKey) === "true") return;

        const popupImageConfig = response?.image_url?.find(
          (item) => item.image_for === "Popup",
        );
        const imageBaseUrl = popupImageConfig?.image_url || "";
        const url = data.popup_image
          ? `${imageBaseUrl}${data.popup_image}`
          : `${IMAGE_PATH}/no_image.jpg`;

        setPopupData(data);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching popup data:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, storageKey]);

  useEffect(() => {
    if (!popupData || !imageUrl) return;
    if (sessionStorage.getItem(storageKey) === "true") return;

    let cancelled = false;
    let fallbackTimer;

    const openPopup = () => {
      if (cancelled) return;
      window.clearTimeout(fallbackTimer);
      setOpen(true);
    };

    const img = new Image();
    img.onload = openPopup;
    img.onerror = () => {
      if (cancelled) return;
      setImageUrl(`${IMAGE_PATH}/no_image.jpg`);
      openPopup();
    };
    img.src = imageUrl;

    // Do not let a slow/broken image block the popup indefinitely.
    fallbackTimer = window.setTimeout(openPopup, IMAGE_OPEN_FALLBACK_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      img.onload = null;
      img.onerror = null;
    };
  }, [popupData, imageUrl, storageKey]);

  const handleClose = useCallback(() => {
    if (dontShowAgain) {
      sessionStorage.setItem(storageKey, "true");
    }
    setOpen(false);
  }, [dontShowAgain, storageKey]);

  const handleOpenChange = useCallback(
    (isOpen) => {
      if (!isOpen && dontShowAgain) {
        sessionStorage.setItem(storageKey, "true");
      }
      setOpen(isOpen);
    },
    [dontShowAgain, storageKey],
  );

  if (!popupData || popupData.popup_required !== "Yes") {
    return null;
  }

  if (sessionStorage.getItem(storageKey) === "true") {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} className="z-[9999]">
      <DialogContent
        className="p-0 overflow-hidden border-0 bg-transparent max-w-xl z-[9999] animate-in fade-in zoom-in-95"
        aria-describedby={undefined}
      >
        <div className="relative rounded-lg overflow-hidden">
          {popupData.popup_heading ? (
            <DialogHeader className="px-2">
              <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-t-xl ">
                <DialogTitle
                  className={`flex-1 text-md font-bold text-center text-gray-800 ${
                    popupData.popup_heading ? "" : "hidden"
                  }`}
                >
                  {popupData.popup_heading}
                </DialogTitle>

                <button
                  onClick={handleClose}
                  className="h-6 w-6 rounded-lg bg-[#F3831C] cursor-pointer shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#0F3652]/40 shrink-0"
                  aria-label="Close popup"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </DialogHeader>
          ) : (
            <>
              <DialogTitle className="sr-only">Notification Popup</DialogTitle>
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 h-7 w-7 rounded-lg cursor-pointer bg-[#F3831C] shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#0F3652]/40"
                aria-label="Close popup"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </>
          )}

          <div className="px-2 pb-2">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={popupData.popup_image_alt} title={popupData.popup_image_alt}
                width={1200}
                height={400}
                className={`${popupData.popup_heading ? "rounded-b-lg" : "rounded-lg"} w-full h-auto`}
                loading="eager"
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopUp;
