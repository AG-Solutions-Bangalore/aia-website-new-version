import { BASE_URL, IMAGE_PATH } from "@/api/base-url";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PopUp = ({ slug = "home" }) => {
  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showPopupAfterLoad, setShowPopupAfterLoad] = useState(false);
  const imageRef = useRef(null);
  const storageKey = `popup_hidden_${slug}`;

  useEffect(() => {
    const popupHidden = sessionStorage.getItem("popup_hidden_globally");
    if (popupHidden === "true") {
      setDontShowAgain(true);
    }
  }, []);

  const fetchPopupData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/getPopupbySlug/${slug}`,
      );

      if (response.data?.data) {
        setPopupData(response.data.data);

        const popupImageConfig = response.data.image_url?.find(
          (item) => item.image_for === "Popup",
        );
        if (popupImageConfig) {
          setImageBaseUrl(popupImageConfig.image_url);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching popup data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopupData();
  }, [slug]);
  useEffect(() => {
    if (!popupData || popupData.popup_required !== "Yes") {
      return;
    }

    const url = popupData.popup_image
      ? `${imageBaseUrl}${popupData.popup_image}`
      : `${IMAGE_PATH}/no_image.jpg`;

    setImageUrl(url);
  }, [popupData, imageBaseUrl]);

  useEffect(() => {
    if (imageUrl && !imageLoaded) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setImageLoaded(true);

        if (!loading && popupData?.popup_required === "Yes") {
          const popupHidden = sessionStorage.getItem(storageKey);
          if (popupHidden !== "true") {
            setOpen(true);
          }
        }
      };

      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.src = `${IMAGE_PATH}/no_image.jpg`;
        fallbackImg.onload = () => {
          setImageUrl(`${IMAGE_PATH}/no_image.jpg`);
          setImageLoaded(true);

          const popupHidden = sessionStorage.getItem(storageKey);
          if (popupHidden !== "true") {
            setShowPopupAfterLoad(true);
          }
        };
      };
    }
  }, [imageUrl, loading, popupData]);

  useEffect(() => {
    if (showPopupAfterLoad) {
      setOpen(true);
    }
  }, [showPopupAfterLoad]);

  const handleClose = () => {
    if (dontShowAgain) {
      sessionStorage.setItem(storageKey, "true");
    }
    setOpen(false);
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      if (dontShowAgain) {
        sessionStorage.setItem(storageKey, "true");
      }
    }
    setOpen(isOpen);
  };

  const handleCheckboxChange = (checked) => {
    setDontShowAgain(checked);

    if (!checked) {
      sessionStorage.removeItem(storageKey);
    }
  };

  if (loading || !popupData || popupData.popup_required !== "Yes") {
    return null;
  }

  const popupHidden = sessionStorage.getItem(storageKey);

  if (popupHidden === "true") {
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
                alt={popupData.popup_image_alt}
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
