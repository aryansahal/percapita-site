"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/content";
import { Diamond } from "./icons";

/** Pixels per second. Slow enough to read a card without stopping it. */
const SPEED = 34;

/**
 * Services as an infinitely looping rail.
 *
 * The set is rendered twice and the scroll position wraps at the halfway mark,
 * so there is no start or end and no arrows are needed.
 *
 * Motion and readability pull against each other here: unlike the logo
 * marquee, each card carries about forty-five words, and moving text is hard
 * to read. Three things resolve that, and removing any of them breaks it:
 *
 * - it **pauses on hover and on focus**, so a card holds still exactly when
 *   someone is reading it;
 * - it **pauses while you drag or scroll it**, and resumes after;
 * - there is an **explicit pause control**, which is what makes the section
 *   pass WCAG 2.2.2 - auto-moving content lasting over five seconds needs a
 *   mechanism to stop it, and hover alone does not serve keyboard or touch.
 *
 * Scrolling stays native, so the rail is still usable with JavaScript off; it
 * simply does not advance on its own.
 *
 * Every card carries `border-r`, including the last. The track has to be
 * exactly periodic or the wrap point jumps by the width of one border.
 */
export function Services() {
  const railRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    pausedRef.current = !playing || hovered;
  }, [playing, hovered]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    let frame = 0;
    let last = performance.now();
    // The position is accumulated here rather than read back from scrollLeft.
    // scrollLeft rounds to whole pixels, so `scrollLeft += 0.57` loses the
    // fraction every frame and the rail creeps at 1px/frame - 60px/s instead
    // of the 34 asked for, and at whatever the refresh rate happens to be.
    let position = el.scrollLeft;
    let applied = el.scrollLeft;

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      const half = el.scrollWidth / 2;

      if (half > 0) {
        // Something other than us moved it - a drag, a wheel, a keypress.
        if (Math.abs(el.scrollLeft - applied) > 1.5) position = el.scrollLeft;

        if (!pausedRef.current) position += (SPEED * delta) / 1000;

        // Wrap both ways so manual scrolling loops as well.
        if (position >= half) position -= half;
        else if (position < 0) position += half;

        el.scrollLeft = position;
        applied = el.scrollLeft;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const track = [...SERVICES, ...SERVICES];

  return (
    <section id="services" className="bg-surface section-pt section-pb">
      <div className="shell">
        <p className="eyebrow eyebrow-gap text-violet">Services</p>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 className="h2-display min-w-0 text-plum">
            Investments, protection, and borrowing.
          </h2>
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-pressed={!playing}
            className="flex h-10 flex-none cursor-pointer items-center gap-2.5 rounded-[2px] border border-field px-4 text-[12px] font-semibold text-ink-3 transition-colors duration-150 hover:border-purple hover:text-purple"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
        </div>
      </div>

      <div
        className="mt-[clamp(28px,3.5vw,40px)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
      >
        <ul
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="Services, scrollable"
          className="rail-pad flex list-none overflow-x-auto [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-accent [&::-webkit-scrollbar]:hidden"
        >
          {track.map((service, i) => (
            <li
              key={`${service.name}-${i}`}
              aria-hidden={i >= SERVICES.length}
              className="flex w-[min(78vw,340px)] flex-none flex-col border-r border-hair-2 bg-white px-[clamp(22px,2.6vw,28px)] py-[clamp(26px,3vw,32px)]"
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

      <div className="shell">
        <p className="mt-[clamp(26px,3.5vw,38px)] max-w-[1000px] text-[11px] leading-[1.8] text-muted">
          Disclaimer : Investments are subject to market risks. Products and
          services are subject to applicable eligibility, regulatory, risk,
          liquidity, and other conditions. No investment outcome is guaranteed.
        </p>
      </div>
    </section>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="3" height="9" rx="0.5" />
      <rect x="7" y="1.5" width="3" height="9" rx="0.5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M3 1.8v8.4a.5.5 0 0 0 .77.42l6.3-4.2a.5.5 0 0 0 0-.84l-6.3-4.2A.5.5 0 0 0 3 1.8Z" />
    </svg>
  );
}
