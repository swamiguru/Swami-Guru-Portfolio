/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Horizontal scroll-snap carousel: native swipe on touch,
 * arrow buttons on pointer devices. Children set their own widths.
 */
export default function Carousel({ children, ariaLabel }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={trackRef}
        role="list"
        aria-label={ariaLabel}
        className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-m3-surface border border-m3-outline/15 text-m3-on-surface items-center justify-center shadow-md hover:bg-m3-primary hover:text-m3-on-primary hover:border-m3-primary transition-all opacity-0 group-hover/carousel:opacity-100 active:scale-95 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-m3-surface border border-m3-outline/15 text-m3-on-surface items-center justify-center shadow-md hover:bg-m3-primary hover:text-m3-on-primary hover:border-m3-primary transition-all opacity-0 group-hover/carousel:opacity-100 active:scale-95 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
