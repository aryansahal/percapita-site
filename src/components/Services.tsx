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
      <div className="shell py-[clamp(52px,6.5vw,88px)]">
        <p className="eyebrow mb-5 text-violet">Services</p>
        <h2 className="max-w-[820px] text-[clamp(26px,3.6vw,36px)] leading-[1.2] font-bold tracking-[-0.03em] text-plum">
          Investments, protection, and borrowing.
        </h2>

        <ul className="mt-11 grid list-none grid-cols-1 gap-px bg-hair-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li
              key={service.name}
              className="flex flex-col bg-white px-[clamp(22px,2.6vw,30px)] py-[clamp(26px,3vw,34px)]"
            >
              <h3 className="text-[11px] font-bold tracking-[0.16em] uppercase text-violet">
                {service.name}
                {service.expansion ? (
                  <>
                    {" · "}
                    <span className="text-muted-2">{service.expansion}</span>
                  </>
                ) : null}
              </h3>

              <p className="mt-3 text-[16px] leading-[1.35] font-bold tracking-[-0.02em] text-plum">
                {service.tagline}
              </p>

              <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-3">
                {service.body}
              </p>

              {/* mt-auto pins the list to the bottom so the bullet blocks line
                  up across a row; the wrapper's padding guarantees space above
                  the rule even when the description already fills the card. */}
              <div className="mt-auto pt-[22px]">
                <ul className="flex list-none flex-col gap-2.5 border-t border-hair pt-[18px] text-[13px] leading-[1.6] text-ink-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-baseline gap-2.5">
                      <Diamond className="flex-none text-[8px] text-violet" />
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
