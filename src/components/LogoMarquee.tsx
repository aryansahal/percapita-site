import Image from "next/image";
import {
  FUND_HOUSES,
  MARQUEE_LOGO_HEIGHT,
  MARQUEE_LOGO_SPACING,
} from "@/lib/content";

/**
 * Fund-house marquee.
 *
 * The band background must stay #ffffff: the logo PNGs have opaque white
 * backgrounds baked in. `mix-blend-mode: multiply` is not an option here —
 * the animated track and the masked wrapper each create an isolated group, so
 * the blend resolves against transparency and does nothing. If transparent
 * PNGs or SVGs arrive later, any band colour becomes possible.
 *
 * The list is rendered twice so the -50% translate can loop. For that to be
 * *seamless*, half the track has to be exactly one set — which is why the
 * spacing lives on each item rather than in a flex `gap`. A flex gap only sits
 * *between* items, so 32 items carry 31 gaps, half the track lands 32px past
 * the start of the second set, and the loop visibly jumps once per cycle.
 * Trailing padding on every item makes the two halves identical.
 */
export function LogoMarquee() {
  const track = [...FUND_HOUSES, ...FUND_HOUSES];

  return (
    <div className="overflow-hidden border-y border-hair bg-white">
      <p className="shell pt-[26px] pb-[10px] text-[10.5px] font-bold tracking-[0.18em] uppercase text-muted-2">
        Broad market access across leading fund houses
      </p>
      <div
        className="pc-marquee-mask relative pt-[14px] pb-[26px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <ul className="pc-marquee-track flex w-max list-none items-center">
          {track.map((house, i) => {
            const isClone = i >= FUND_HOUSES.length;
            // Declare each logo at 2x its rendered height so the ratio matches
            // the source and next/image serves a retina-sharp file.
            const height = MARQUEE_LOGO_HEIGHT * 2;
            const width = Math.round((house.w / house.h) * height);
            return (
              <li
                key={`${house.file}-${i}`}
                className="flex-none"
                style={{ paddingRight: MARQUEE_LOGO_SPACING }}
              >
                <Image
                  src={`/logos/${house.file}`}
                  alt={isClone ? "" : house.name}
                  aria-hidden={isClone}
                  width={width}
                  height={height}
                  className="w-auto object-contain opacity-[0.72] saturate-[0.25]"
                  style={{ height: MARQUEE_LOGO_HEIGHT }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
