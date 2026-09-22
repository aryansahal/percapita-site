"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/content";
import { Diamond } from "./icons";

/**
 * Services as a full-bleed horizontal rail.
 *
 * Six equal cards in a 3x2 grid read as a spreadsheet and ran past 1,100px.
 * The rail spans the viewport rather than the 1200px shell, so more of the set
 * is visible at once and the cut-off card sits at the screen edge where it
 * plainly continues.
 *
 * Discoverability is how this pattern normally fails, so it carries four
 * signals: the next card peeks, a fade covers the right edge until the end is
 * reached, a progress bar shows how much is left, and the forward button is a
 * filled primary while there is more to see. The rail is also a focusable
 * labelled region, which is what lets a keyboard user scroll it at all.
 *
 * Scrolling is native overflow-x, so it works with JavaScript off. The buttons
 * and progress bar are enhancement.
 */
export function Services() {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState({ width: 100, left: 0 });

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(scrollable <= 2 || el.scrollLeft >= scrollable - 2);

    const width = Math.min(100, (el.clientWidth / el.scrollWidth) * 100);
    const ratio = scrollable > 0 ? el.scrollLeft / scrollable : 0;
    setProgress({ width, left: ratio * (100 - width) });
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width : el.clientWidth * 0.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * step,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section id="services" className="bg-surface section-pt section-pb">
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="min-w-0">
          <p className="eyebrow eyebrow-gap text-violet">Services</p>
          <h2 className="h2-display text-plum">
            Investments, protection, and borrowing.
          </h2>
        </div>

        <div className="flex flex-none items-center gap-2.5">
          <button
            type="button"
            aria-label="Previous services"
            disabled={atStart}
            onClick={() => page(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-field text-plum transition-colors duration-150 not-disabled:cursor-pointer not-disabled:hover:border-purple not-disabled:hover:text-purple disabled:border-hair-2 disabled:text-muted-3"
          >
            <Chevron className="rotate-180" />
          </button>
          {/* Filled while there is more to see: the forward move is the one
              worth pointing at, and an outline pair reads as decoration. */}
          <button
            type="button"
            aria-label="Next services"
            disabled={atEnd}
            onClick={() => page(1)}
            className="flex h-11 items-center gap-2 rounded-[2px] bg-purple px-[18px] text-[12.5px] font-semibold text-white transition-colors duration-150 not-disabled:cursor-pointer not-disabled:hover:bg-purple-hover disabled:bg-transparent disabled:px-0 disabled:text-muted-3 disabled:w-11 disabled:justify-center disabled:border disabled:border-hair-2"
          >
            <span className={atEnd ? "hidden" : undefined}>Next</span>
            <Chevron />
          </button>
        </div>
      </div>

      {/* Full width, but the first card still lines up with shell content. */}
      <div className="relative mt-[clamp(28px,3.5vw,40px)]">
        <ul
          ref={railRef}
          onScroll={sync}
          tabIndex={0}
          role="region"
          aria-label="Services, scrollable"
          className="rail-pad flex snap-x snap-mandatory list-none overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-accent [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((service) => (
            <li
              key={service.name}
              className="flex w-[min(78vw,340px)] flex-none snap-start flex-col border-l border-hair-2 bg-white px-[clamp(22px,2.6vw,28px)] py-[clamp(26px,3vw,32px)] first:border-l-0"
            >
              <h3 className="text-[clamp(18px,2.2vw,21px)] leading-[1.2] font-bold tracking-[-0.025em] text-plum">
                {service.name}
              </h3>
              <p className="mt-[7px] min-h-[13px] text-[10px] font-bold tracking-[0.14em] uppercase text-muted-2">
                {service.expansion ?? ""}
              </p>

              <p className="mt-[14px] text-[14px] leading-[1.45] font-semibold text-purple-accent">
                {service.tagline}
              </p>

              <p className="mt-2.5 text-[13.5px] leading-[1.75] text-ink-3">
                {service.body}
              </p>

              <div className="mt-auto pt-[22px]">
                <ul className="flex list-none flex-col gap-[9px] border-t border-hair pt-[16px] text-[12.5px] leading-[1.5] text-ink-5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-baseline gap-2.5">
                      <Diamond className="flex-none text-[7px] text-lilac" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Fades the cut-off card into the band, and clears once you reach
            the end so it never implies content that is not there. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-[clamp(40px,7vw,110px)] bg-gradient-to-l from-surface to-transparent transition-opacity duration-300 ${
            atEnd ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="shell mt-[clamp(20px,2.5vw,28px)]">
        <div
          aria-hidden="true"
          className="h-[3px] w-full max-w-[380px] bg-hair-2"
        >
          <div
            className="h-full bg-purple transition-[margin-left] duration-150"
            style={{
              width: `${progress.width}%`,
              marginLeft: `${progress.left}%`,
            }}
          />
        </div>

        <p className="mt-[clamp(22px,3vw,30px)] max-w-[1000px] text-[11px] leading-[1.8] text-muted">
          Disclaimer : Investments are subject to market risks. Products and
          services are subject to applicable eligibility, regulatory, risk,
          liquidity, and other conditions. No investment outcome is guaranteed.
        </p>
      </div>
    </section>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}
