/**
 * What We Do, Sept 2026 copy, restructured as three beats.
 *
 * An `ol` here, unlike the `ul` in Who We Are: these are numbered on screen
 * and read as a sequence, so the ordered semantics match what is shown.
 *
 * The numerals and their labels are separate elements rather than the literal
 * "01 - IT STARTS SIMPLE" string, so the separation is done with colour and
 * spacing instead of a dash character.
 *
 * Note: this rewrite dropped the clause naming cash flow, tax, risk,
 * retirement, diversification and succession, which was the last trace of the
 * fourteen capability bullets. Those lists are still kept as `WHAT_WE_DO` in
 * content.ts, unused. See OPEN-ITEMS.md.
 */
const BEATS = [
  {
    label: "It starts simple",
    body: "A first salary. A business. Your first investment. A home. A family. A future.",
  },
  {
    label: "Then life gets real",
    body: "Income changes. Goals shift. Markets move. Opportunities appear. And suddenly, every money decision connects to another.",
  },
  {
    label: "That’s where Percapita comes in",
    body: "We connect the dots, build the strategy, and evolve it with you.",
  },
] as const;

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-plum-dark text-white">
      <div className="shell section-y">
        <p className="eyebrow eyebrow-gap text-lilac">What We Do</p>
        <h2 className="max-w-[920px] h2-display">
          Your money has a story. It just doesn&rsquo;t come with a table of
          contents.
        </h2>

        <ol className="mt-[clamp(34px,4.5vw,52px)] grid list-none grid-cols-1 gap-x-[clamp(28px,4vw,56px)] gap-y-9 border-t border-white/10 pt-[clamp(30px,4vw,44px)] sm:grid-cols-2 lg:grid-cols-3">
          {BEATS.map((beat, i) => (
            <li key={beat.label} className="min-w-0">
              <h3 className="flex items-baseline gap-2.5 text-[11.5px] font-bold tracking-[0.15em] uppercase">
                <span className="flex-none text-lilac">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white">{beat.label}</span>
              </h3>
              <p className="mt-3.5 text-[15px] leading-[1.8] text-on-dark-3">
                {beat.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-[clamp(34px,4.5vw,50px)] max-w-[860px] text-[clamp(18px,2.3vw,23px)] leading-[1.5] font-bold tracking-[-0.02em] text-balance text-white">
          Because the goal isn&rsquo;t just to have money. It&rsquo;s to know
          what you&rsquo;re building with it.
        </p>

        <p className="mt-[clamp(40px,5vw,56px)] max-w-[1000px] text-[11px] leading-[1.85] text-on-dark-muted-5">
          Disclaimer : All investments are subject to market risks. Financial
          planning and investment recommendations are based on individual
          circumstances and applicable regulations; no investment outcome is
          guaranteed.
        </p>
      </div>
    </section>
  );
}
