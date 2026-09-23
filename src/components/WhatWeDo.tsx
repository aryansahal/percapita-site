/**
 * What We Do, Sept 2026 copy.
 *
 * This replaced two columns of capability bullets with a narrative. The old
 * lists are kept as `WHAT_WE_DO` in content.ts, unused, so the fourteen
 * specific capabilities are not lost if they are wanted back. See
 * OPEN-ITEMS.md.
 */
export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-plum-dark text-white">
      <div className="shell section-y">
        <p className="eyebrow eyebrow-gap text-lilac">What We Do</p>
        <h2 className="max-w-[920px] h2-display">
          Your money has a story. It just doesn&rsquo;t come with a table of
          contents.
        </h2>

        <div className="mt-[clamp(32px,4.5vw,52px)] grid grid-cols-1 gap-x-[clamp(32px,5vw,72px)] gap-y-5 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4 text-[15px] leading-[1.8] text-on-dark-3">
            <p>
              It starts with a salary, a business, a first investment, a big
              purchase, a family plan, or maybe just a vague feeling that
              &ldquo;I should probably sort my finances out.&rdquo;
            </p>
            <p>
              Then life happens. Goals change. Priorities shift. Markets move.
              New opportunities show up. And suddenly, all those financial
              decisions start affecting each other.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-4 text-[15px] leading-[1.8] text-on-dark-3">
            <p className="text-[clamp(17px,2.1vw,20px)] leading-[1.4] font-bold tracking-[-0.02em] text-white">
              That&rsquo;s where Percapita comes in.
            </p>
            <p>
              We bring financial planning and investment advisory together to
              connect the dots: from your cash flow and investments to tax,
              risk, retirement, diversification, and succession. We first
              understand the picture. Then we map the pieces, build an approach
              around your circumstances, and revisit it as things evolve.
            </p>
            <p>
              Because money isn&rsquo;t a collection of isolated decisions.{" "}
              <strong className="font-semibold text-white">
                It&rsquo;s one ongoing story.
              </strong>{" "}
              And Percapita is here to help you make sense of the chapters.
            </p>
          </div>
        </div>

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
