import { PERCAPITA_MINDSET, VALUES } from "@/lib/content";

/**
 * Values, spread four across rather than stacked two-up in a side column.
 *
 * The mindset line is promoted to the section heading: it reads as the
 * summary of the four values beneath it, and leaving it as a footer panel
 * buried it. Its label becomes the eyebrow, so no copy is lost.
 */
export function Values() {
  return (
    <section className="bg-white">
      <div className="shell section-y">
        <header className="max-w-[760px]">
          <p className="eyebrow text-violet">{PERCAPITA_MINDSET.label}</p>
          <h2 className="mt-[18px] text-[clamp(25px,3.3vw,33px)] leading-[1.24] font-bold tracking-[-0.025em] text-plum">
            {PERCAPITA_MINDSET.line}
          </h2>
        </header>

        {/* 1px gap over a tinted container draws the hairline dividers. */}
        <ul className="mt-[clamp(32px,4vw,44px)] grid list-none grid-cols-1 gap-px bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <li
              key={value.title}
              className="flex flex-col bg-white px-[clamp(20px,2.4vw,26px)] py-[clamp(24px,3vw,30px)]"
            >
              <h3 className="text-[10px] font-bold tracking-[0.16em] uppercase text-violet">
                {value.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.4] font-bold tracking-[-0.015em] text-plum">
                {value.lead}
              </p>
              <p className="mt-2.5 text-[13px] leading-[1.7] text-ink-5">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
