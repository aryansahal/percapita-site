import Link from "next/link";
import { WHO_WE_ARE_POINTS } from "@/lib/content";

export function PositioningBand() {
  return (
    <section className="bg-plum text-white">
      <div className="shell py-[clamp(40px,5vw,60px)]">
        {/* Lilac, not the violet used on light sections: violet is only 3.4:1
            on plum, which fails at this size. */}
        <p className="eyebrow eyebrow-gap text-lilac">Who We Are</p>
        <p className="max-w-[900px] text-[clamp(16px,1.9vw,19px)] leading-[1.65] font-medium text-on-dark-4">
          Percapita offers independent financial guidance with the
          professionalism and standards you expect from experienced advisors. We
          prioritize transparency, security, and personalized support to help
          you navigate your financial journey responsibly.
        </p>
        <p className="mt-[18px] max-w-[900px] text-[clamp(16px,1.9vw,19px)] leading-[1.65] font-medium text-on-dark-4">
          We bring financial planning and investment advisory together to help
          you make smarter, more intentional money moves. From figuring out your
          next big goal to making your investments work harder, we connect the
          dots so your money keeps up with your life, not the other way around.
        </p>
        {/* The section-heading scale rather than a new size, and white rather
            than the muted body colour, so it lands as the band's payoff line
            instead of a third paragraph. */}
        <p className="mt-[clamp(26px,3.2vw,36px)] text-balance h2-display text-white">
          Your money deserves a game plan.
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
            <h2 className="h2-display text-plum">
              Money moves, made clear.
            </h2>
          </div>
          <Link
            href="/#contact"
            className="flex-none rounded-[2px] bg-purple px-6 py-[14px] text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
          >
            Start a Conversation
          </Link>
        </div>

        {/* A ul, not an ol: the numerals are gone and these four are not a
            sequence. Violet on white is 4.72:1, so it clears 4.5 at 15px bold
            - it is carrying the accent the numerals used to. */}
        <ul className="mt-[clamp(36px,5vw,56px)] grid list-none grid-cols-1 gap-x-[clamp(24px,3vw,40px)] gap-y-9 border-t border-hair pt-[clamp(32px,4vw,44px)] sm:grid-cols-2 lg:grid-cols-4">
          {WHO_WE_ARE_POINTS.map((point) => (
            <li key={point.title} className="min-w-0">
              <h3 className="text-[15px] leading-[1.35] font-bold text-violet">
                {point.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.75] text-ink-3">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
