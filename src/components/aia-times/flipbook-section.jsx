import OptimizedImage from "@/components/common/optmized-image";
import PdfJoinDialog from "@/components/common/PdfForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ASSET_BASE,
  MAGAZINE_COURSE,
  flipbookPageSources,
} from "./aia-times.constants";
import SourceFallbackImage from "./source-fallback-image";

// export default function FlipbookSection({ isPopup = false }) {
//   const [activePage, setActivePage] = useState(0);
//   const [missingPages, setMissingPages] = useState(() => new Set());

//   const visiblePages = useMemo(
//     () =>
//       flipbookPageSources
//         .map((sources, index) => ({ sources, index }))
//         .filter((page) => !missingPages.has(page.index)),
//     [missingPages],
//   );

//   const currentPage = visiblePages[activePage] || visiblePages[0];

//   const markMissing = (index) => {
//     setMissingPages((previous) => {
//       if (previous.has(index)) return previous;
//       const next = new Set(previous);
//       next.add(index);
//       return next;
//     });
//     setActivePage((current) => Math.max(0, current - 1));
//   };

//   const goToPrevious = () => {
//     setActivePage((current) =>
//       current === 0 ? Math.max(visiblePages.length - 1, 0) : current - 1,
//     );
//   };

//   const goToNext = () => {
//     setActivePage((current) =>
//       visiblePages.length ? (current + 1) % visiblePages.length : 0,
//     );
//   };

//   const content = (
//     <div
//       className={cn(
//         isPopup ? "p-3 md:p-4" : "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8",
//       )}
//     >
//       <div className={cn("text-center", isPopup ? "mb-3" : "mb-8")}>
//         <p className="text-xs font-bold uppercase tracking-wider text-[#F3831C]">
//           E-Magazine
//         </p>
//         <h2
//           className={cn(
//             "mt-1 font-extrabold text-white",
//             isPopup ? "text-xl sm:text-2xl" : "text-2xl sm:text-4xl",
//           )}
//         >
//           Flip Through AIA Times
//         </h2>
//         {currentPage && (
//           <p className="mt-1 text-xs font-semibold text-slate-300">
//             Page {currentPage.index + 1} of {visiblePages.length}
//           </p>
//         )}
//       </div>

//       <div
//         className={cn(
//           "flex flex-col items-center",
//           isPopup ? "gap-3" : "gap-6",
//         )}
//       >
//         {/* Main View Area with Left/Right arrows */}
//         <div className="relative flex w-full items-center justify-center gap-4">
//           {/* Left Button */}
//           <Button
//             type="button"
//             aria-label="Previous magazine page"
//             onClick={goToPrevious}
//             disabled={visiblePages.length <= 1}
//             className="hidden sm:inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-[#F3831C] hover:text-white border border-white/20 transition-all cursor-pointer"
//           >
//             <ChevronLeft size={22} />
//           </Button>

//           {/* Active Page Container */}
//           <div
//             className={cn(
//               "flex flex-1 max-w-2xl items-center justify-center rounded-2xl bg-[#071d2e]/60 border border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden",
//               isPopup ? "min-h-[34vh] p-3 md:p-4" : "min-h-[280px] p-4 md:p-6",
//             )}
//           >
//             {currentPage ? (
//               <div className="relative max-w-full transition-transform duration-300 hover:scale-[1.01]">
//                 <SourceFallbackImage
//                   sources={currentPage.sources}
//                   alt={`AIA Times magazine page ${currentPage.index + 1}`}
//                   className={cn(
//                     "rounded-lg bg-white object-contain shadow-xl border border-white/10",
//                     isPopup ? "max-h-[38vh]" : "max-h-[350px]",
//                   )}
//                   onExhausted={() => markMissing(currentPage.index)}
//                 />
//               </div>
//             ) : (
//               <div className="flex flex-col items-center text-center max-w-md p-6">
//                 <OptimizedImage
//                   src={`${ASSET_BASE}/aia_times_magazine.webp`}
//                   alt="AIA Times Magazine"
//                   width={1585}
//                   height={2000}
//                   className="max-h-56 w-auto object-contain mb-4"
//                 />
//                 <h3 className="text-xl font-bold text-white">
//                   AIA Times Magazine
//                 </h3>
//                 <p className="mt-2 text-xs text-slate-300 leading-relaxed">
//                   Read the latest AIA Times issue or download the magazine to
//                   keep the edition with you.
//                 </p>
//                 <div className="mt-4">
//                   <PdfJoinDialog
//                     course={MAGAZINE_COURSE}
//                     buttonlabel="Download Magazine"
//                     buttonClassName="min-h-10 rounded-md bg-[#F3831C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#d96f10]"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Button */}
//           <Button
//             type="button"
//             aria-label="Next magazine page"
//             onClick={goToNext}
//             disabled={visiblePages.length <= 1}
//             className="hidden sm:inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-[#F3831C] hover:text-white border border-white/20 transition-all cursor-pointer"
//           >
//             <ChevronRight size={22} />
//           </Button>
//         </div>

//         {/* Mobile Navigation Buttons */}
//         <div className="flex sm:hidden gap-4 mt-2">
//           <Button
//             type="button"
//             aria-label="Previous magazine page"
//             onClick={goToPrevious}
//             disabled={visiblePages.length <= 1}
//             className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#F3831C] transition-all cursor-pointer"
//           >
//             <ChevronLeft size={18} />
//           </Button>
//           <Button
//             type="button"
//             aria-label="Next magazine page"
//             onClick={goToNext}
//             disabled={visiblePages.length <= 1}
//             className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#F3831C] transition-all cursor-pointer"
//           >
//             <ChevronRight size={18} />
//           </Button>
//         </div>

//         {/* Horizontal Scrollable Thumbnails */}
//         <div className={cn("w-full max-w-4xl", isPopup ? "mt-0" : "mt-2")}>
//           <div
//             className={cn(
//               "flex items-center justify-between border-b border-white/10 text-slate-300",
//               isPopup ? "mb-2 pb-1" : "mb-3 pb-2",
//             )}
//           >
//             <div className="flex items-center gap-2 text-xs sm:text-sm">
//               <Newspaper size={16} />
//               <span className="font-semibold">Quick Page Select</span>
//             </div>
//           </div>

//           <div
//             className={cn(
//               "flex overflow-x-auto pt-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent",
//               isPopup ? "gap-2 pb-1" : "gap-3 pb-3",
//             )}
//           >
//             {visiblePages.slice(0, 12).map((page, index) => (
//               <button
//                 key={page.index}
//                 type="button"
//                 onClick={() => setActivePage(index)}
//                 className={cn(
//                   "relative flex flex-col items-center shrink-0 w-20 p-1 rounded-lg border bg-white/5 transition-all hover:bg-white/10 cursor-pointer",
//                   index === activePage
//                     ? "border-[#F3831C] ring-1 ring-[#F3831C]"
//                     : "border-white/10",
//                 )}
//               >
//                 <SourceFallbackImage
//                   sources={page.sources}
//                   alt={`AIA Times thumbnail ${page.index + 1}`}
//                   className={cn(
//                     "w-full object-cover object-top rounded",
//                     isPopup ? "h-12" : "h-20",
//                   )}
//                   onExhausted={() => markMissing(page.index)}
//                 />
//                 <span className="mt-1 block text-[10px] font-medium text-slate-300">
//                   Page {page.index + 1}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (isPopup) {
//     return (
//       <div className="max-h-[78vh] overflow-y-auto bg-[#0F3652]">{content}</div>
//     );
//   }

//   return (
//     <section
//       id="aia-times-flipbook"
//       className="scroll-mt-32 bg-[#0F3652] py-12 md:scroll-mt-36 md:py-16"
//     >
//       {content}
//     </section>
//   );
// }

export default function FlipbookSection({ isPopup = false }) {
  return (
    <div className="w-full h-[70vh] sm:h-[75vh] md:h-[78vh] bg-[#0F3652] overflow-hidden relative">
      <iframe
        src="https://heyzine.com/flip-book/8cbaac20de.html"
        title="AIA Times E-Magazine"
        className="w-full h-full border-0 absolute inset-0"
        allowFullScreen
        allow="clipboard-write"
      />
    </div>
  );
}
