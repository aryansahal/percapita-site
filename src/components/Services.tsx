import { SERVICES } from "@/lib/content";
import { Diamond } from "./icons";

/**
 * Services, Sept 2026 copy: six offerings on a hairline grid.
 *
 * Cards stretch to equal height per row so the hairlines stay continuous;
 * the points list is pushed to the bottom with mt-auto, which keeps the
 * bullet blocks aligned across a row when the descriptions differ in length.
 */
export function Services() {
  return (
    <section id="services" className="bg-surface">
      <div className="shell section-y">
        <p className="eyebrow eyebrow-gap text-violet">Services</p>
        <h2 className="max-w-[820px] h2-display text-plum">
          Investments, protection, and borrowing.
        </h2>

        <ul className="mt-11 grid list-none grid-cols-1 gap-px bg-hair-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li
              key={service.name}
              className="flex flex-col bg-white px-[clamp(22px,2.6vw,30px)] py-[clamp(26px,3vw,34px)]"
            >
              {/* The name carries the weight: people scan this grid for "PMS"
                  or "Insurance", not for the tagline. */}
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

              {/* mt-auto pins the list to the bottom so the bullet blocks line
                  up across a row; the wrapper's padding guarantees space above
                  the rule even when the description already fills the card. */}
              {/* Supporting detail, so set quieter than the description above
                  it: twenty-four bullets across six cards competing at body
                  weight is what made this grid read as a spreadsheet. */}
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

        <p className="mt-[26px] max-w-[1000px] text-[11px] leading-[1.8] text-muted">
          Disclaimer : Investments are subject to market risks. Products and
          services are subject to applicable eligibility, regulatory, risk,
          liquidity, and other conditions. No investment outcome is guaranteed.
        </p>
      </div>
    </section>
  );
}
