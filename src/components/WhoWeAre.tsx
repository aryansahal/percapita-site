import { WHO_WE_ARE_POINTS } from "@/lib/content";

export function PositioningBand() {
  return (
    <section className="bg-plum text-white">
      <div className="shell py-[clamp(40px,5vw,60px)]">
        <p className="max-w-[900px] text-[clamp(16px,1.9vw,19px)] leading-[1.65] font-medium text-on-dark-4">
          Percapita offers independent financial guidance with the
          professionalism and standards you expect from experienced advisors. We
          prioritize transparency, security, and personalized support to help
          you navigate your financial journey responsibly.
        </p>
      </div>
    </section>
  );
}

/**
 * Who We Are: heading and CTA on one row, the four points spread across the
 * full width beneath.
 *
 * Deliberately unboxed columns. The How We Work stages further down the page
 * are bordered cards on a hairline grid, and repeating that treatment here
 * made the two sections read as the same component twice.
 */
export function WhoWeAre() {
  return (
    <section id="who-we-are" className="bg-white">
      <div className="shell section-y">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="min-w-0">
            <p className="eyebrow eyebrow-gap text-violet">Who We Are</p>
            <h2 className="h2-display text-plum">
              Money moves, made clear.
            </h2>
          </div>
          <a
            href="#contact"
            className="flex-none rounded-[2px] bg-purple px-6 py-[14px] text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
          >
            Start a Conversation
          </a>
        </div>

        <ol className="mt-[clamp(36px,5vw,56px)] grid list-none grid-cols-1 gap-x-[clamp(24px,3vw,40px)] gap-y-9 border-t border-hair pt-[clamp(32px,4vw,44px)] sm:grid-cols-2 lg:grid-cols-4">
          {WHO_WE_ARE_POINTS.map((point, i) => (
            <li key={point.title} className="min-w-0">
              <p className="text-[22px] leading-none font-bold tracking-[-0.02em] text-violet">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-[14px] text-[15px] leading-[1.35] font-bold text-plum">
                {point.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.75] text-ink-3">
                {point.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
