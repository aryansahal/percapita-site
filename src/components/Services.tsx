import { SERVICES } from "@/lib/content";

/**
 * Services as an editorial directory rather than a card grid.
 *
 * Six boxes on a hairline grid read as a spreadsheet, and the page already
 * uses boxed cards for the How We Work stages and the Values grid. Here each
 * service is a full-width row split three ways: name, description, detail.
 * Hairlines between rows and a rule before the detail column carry the
 * structure, so nothing needs a border of its own.
 */
export function Services() {
  return (
    <section id="services" className="bg-surface">
      <div className="shell section-y">
        <p className="eyebrow eyebrow-gap text-violet">Services</p>
        <h2 className="h2-display text-plum">
          Investments, protection, and borrowing.
        </h2>

        <ul className="mt-[clamp(30px,4vw,46px)] list-none border-t border-hair-2">
          {SERVICES.map((service) => (
            <li
              key={service.name}
              className="grid grid-cols-1 gap-x-[clamp(24px,3vw,48px)] gap-y-[18px] border-b border-hair-2 py-[clamp(24px,3vw,34px)] lg:grid-cols-[0.72fr_1.3fr_1fr]"
            >
              <div className="min-w-0">
                <h3 className="text-[clamp(18px,2.2vw,22px)] leading-[1.2] font-bold tracking-[-0.025em] text-plum">
                  {service.name}
                </h3>
                {service.expansion ? (
                  <p className="mt-2 text-[10px] font-bold tracking-[0.14em] uppercase text-muted-2">
                    {service.expansion}
                  </p>
                ) : null}
              </div>

              <div className="min-w-0">
                <p className="text-[14.5px] leading-[1.45] font-semibold text-purple-accent">
                  {service.tagline}
                </p>
                <p className="mt-2.5 text-[13.5px] leading-[1.75] text-ink-3">
                  {service.body}
                </p>
              </div>

              {/* The rule replaces the card border: it separates detail from
                  description without drawing a box around either. */}
              <ul className="flex min-w-0 list-none flex-col gap-[9px] border-t border-hair-2 pt-[14px] text-[12.5px] leading-[1.5] text-ink-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[clamp(20px,2.5vw,32px)]">
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-[clamp(24px,3vw,32px)] max-w-[1000px] text-[11px] leading-[1.8] text-muted">
          Disclaimer : Investments are subject to market risks. Products and
          services are subject to applicable eligibility, regulatory, risk,
          liquidity, and other conditions. No investment outcome is guaranteed.
        </p>
      </div>
    </section>
  );
}
