import Image from "next/image";
import { FUND_HOUSES } from "@/lib/content";

/**
 * Fund-house marquee.
 *
 * The band background must stay #ffffff: the logo PNGs have opaque white
 * backgrounds baked in. `mix-blend-mode: multiply` is not an option here —
 * the animated track and the masked wrapper each create an isolated group, so
 * the blend resolves against transparency and does nothing. If transparent
 * PNGs or SVGs arrive later, any band colour becomes possible.
 *
 * The list is rendered twice, in the same order, so the -50% translate loops
 * seamlessly.
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
        <ul className="pc-marquee-track flex w-max list-none items-center gap-16">
          {track.map((house, i) => (
            <li key={`${house.file}-${i}`} className="flex-none">
              <Image
                src={`/logos/${house.file}`}
                alt={i < FUND_HOUSES.length ? house.name : ""}
                aria-hidden={i >= FUND_HOUSES.length}
                width={160}
                height={38}
                className="h-[38px] w-auto object-contain opacity-[0.72] saturate-[0.25]"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
