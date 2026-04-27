import { IMAGE_PATH } from "@/api/base-url";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PhoneIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const ContactCard = ({ country, contacts }) => {
  const [copied, setCopied] = useState(null);

  const handleCopy = async (number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(number);
      toast.success("Phone number copied!");
      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (error) {
      console.error("Copy failed");
    }
  };

  return (
    <div className="group bg-gray-900/60 border border-gray-700/60 rounded-xl p-3.5 hover:border-[#fa8017]/60 transition-all duration-200 hover:bg-gray-900/80">
      <p className="text-[12px] font-semibold tracking-[0.12em] text-[#fa8017] uppercase mb-2.5">
        {country}
      </p>

      <div className="space-y-2">
        {contacts.map(({ number, tel, wa, zalo }) => (
          <div key={number} className="flex items-center justify-between gap-2">
            <div className="group/number flex items-center gap-2">
              <a
                href={`tel:${tel}`}
                className="text-[12px] text-gray-300 hover:text-[#fa8017] leading-none"
              >
                {number}
              </a>

              <button
                onClick={() => handleCopy(number)}
                className="opacity-0 cursor-pointer group-hover/number:opacity-100 transition-all duration-200 text-gray-400 hover:text-[#fa8017]"
                title="Copy number"
              >
                {copied == number ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {zalo && (
                <div className="w-6 h-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center cursor-pointer">
                  <img
                    src={zalo}
                    alt="Zalo"
                    className="w-3.5 h-3.5 rounded-sm"
                    loading="lazy"
                  />
                </div>
              )}

              {tel && (
                <a
                  href={`tel:${tel}`}
                  className="w-6 h-6 bg-[#fa8017]/15 border border-[#fa8017]/20 rounded-md flex items-center justify-center text-[#fa8017] hover:bg-[#fa8017] hover:text-white transition-all duration-150"
                >
                  <PhoneIcon />
                </a>
              )}

              {wa && (
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-[#25D366]/15 border border-[#25D366]/20 rounded-md flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-150"
                >
                  <WhatsAppIcon />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export const ContactGrid = () => {
  const regions = [
    {
      country: "India",
      contacts: [
        {
          number: "+91-93113-20114",
          tel: "+919311320114",
          wa: "+919311320114",
        },
        {
          number: "+91-97175-97197",
          tel: "+919717597197",
          wa: "+919717597197",
        },
      ],
    },
    {
      country: "Indonesia",
      contacts: [{ number: "+62-8117991185", tel: "", wa: "+628117991185" }],
    },
    {
      country: "Vietnam",
      contacts: [
        {
          number: "+84-911677672",
          tel: "+84911677672",
          wa: "+84911677672",
          zalo: `${IMAGE_PATH}/Zalo.webp`,
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      <h4 className="text-[#fa8017] font-bold text-xl mb-6 relative inline-block">
        Global Contact
        <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#fa8017] -mb-2"></span>
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {regions.map((region) => (
          <ContactCard key={region.country} {...region} />
        ))}
      </div>
    </div>
  );
};
