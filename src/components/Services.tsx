"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/content";
import { Diamond } from "./icons";

/**
 * Services as a horizontal rail rather than a 3x2 grid.
 *
 * Six equal cards stacked in a grid read as a spreadsheet and ran over 1,100px
 * tall. A rail keeps them one row, gives each card a fixed measure, and lets
 * the next one peek past the edge so there is an obvious reason to scroll.
 *
 * Discoverability is the usual failure of this pattern, so it has three
 * affordances rather than none: a visible peek, arrow buttons that disable at
 * the ends, and a focusable region so keyboard users can reach it and scroll
 * with the arrow keys. Native overflow scrolling means it still works with
 * JavaScript off; the buttons are enhancement only.
 */
export function Services() {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
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
    <section id="services" className="bg-surface">
      <div className="shell section-y">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="min-w-0">
            <p className="eyebrow eyebrow-gap text-violet">Services</p>
            <h2 className="h2-display text-plum">
              Investments, protection, and borrowing.
            </h2>
          </div>

          <div className="flex flex-none items-center gap-2">
            <RailButton
              label="Previous services"
              disabled={atStart}
              onClick={() => page(-1)}
              rotate
            />
            <RailButton
              label="Next services"
              disabled={atEnd}
              onClick={() => page(1)}
            />
          </div>
        </div>

        {/* Breaks out of the shell's side padding so cards run to the edge. */}
        <div className="-mx-[clamp(20px,4vw,32px)] mt-[clamp(32px,4vw,44px)]">
          <ul
            ref={railRef}
            onScroll={sync}
            tabIndex={0}
            role="region"
            aria-label="Services, scrollable"
            className="flex snap-x snap-mandatory list-none overflow-x-auto scroll-pl-[clamp(20px,4vw,32px)] px-[clamp(20px,4vw,32px)] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-accent [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((service) => (
              <li
                key={service.name}
                className="flex w-[min(78vw,330px)] flex-none snap-start flex-col border-l border-hair-2 bg-white px-[clamp(22px,2.6vw,28px)] py-[clamp(26px,3vw,32px)] first:border-l-0"
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
        </div>

        <p className="mt-[clamp(24px,3vw,32px)] max-w-[1000px] text-[11px] leading-[1.8] text-muted">
          Disclaimer : Investments are subject to market risks. Products and
          services are subject to applicable eligibility, regulatory, risk,
          liquidity, and other conditions. No investment outcome is guaranteed.
        </p>
      </div>
    </section>
  );
}

function RailButton({
  label,
  disabled,
  onClick,
  rotate = false,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  rotate?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-field text-plum transition-colors duration-150 not-disabled:cursor-pointer not-disabled:hover:border-purple not-disabled:hover:text-purple disabled:border-hair-2 disabled:text-muted-3"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={rotate ? "rotate-180" : undefined}
      >
        <path d="M6 3l5 5-5 5" />
      </svg>
    </button>
  );
}
