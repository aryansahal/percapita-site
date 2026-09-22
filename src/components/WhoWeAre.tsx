import { VALUES, WHO_WE_ARE_POINTS } from "@/lib/content";

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

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="bg-white">
      <div className="shell section-y grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] items-start gap-[clamp(40px,5vw,72px)]">
        <div className="min-w-0">
          <p className="eyebrow mb-[22px] text-violet">Who We Are</p>
          <h2 className="text-[clamp(25px,3.3vw,33px)] leading-[1.24] font-bold tracking-[-0.025em] text-plum">
            Money moves, made clear.
          </h2>

          {/* Numbered because the copy numbers them; the ordinals are the
              client's, not decoration. */}
          <ol className="mt-8 flex list-none flex-col">
            {WHO_WE_ARE_POINTS.map((point, i) => (
              <li
                key={point.title}
                className="border-t border-hair py-[22px] first:border-t-0 first:pt-0"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-violet">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-[15px] font-bold text-plum">
                  {point.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.8] text-ink-3">
                  {point.body}
                </p>
              </li>
            ))}
          </ol>

          <a
            href="#contact"
            className="mt-8 inline-block rounded-[2px] bg-purple px-6 py-[14px] text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
          >
            Start a Conversation
          </a>
        </div>

        <div className="min-w-0">
          <div className="bg-surface px-[clamp(22px,3vw,36px)] py-[clamp(26px,3.5vw,34px)]">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-violet">
              Our Background
            </p>
            <p className="mt-[14px] text-[14.5px] leading-[1.8] text-ink-2">
              Since 2015, Percapita has provided independent financial advisory
              services for individuals and families. We design strategies that
              integrate financial planning and investment guidance, helping
              clients prepare for the future responsibly.
            </p>
            <p className="mt-[14px] text-[14.5px] leading-[1.8] text-ink-2">
              Our name, drawn from the Latin &ldquo;per capita&rdquo;, meaning
              for each person, reflects our belief that effective advice begins
              with understanding what matters most to you. Every plan we build
              is personalized to reflect your ambitions and priorities.
            </p>
          </div>

          {/* 1px gap over a tinted container draws the hairline dividers. */}
          <ul className="mt-7 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-px bg-hair">
            {VALUES.map((value) => (
              <li key={value.title} className="bg-white px-6 py-[26px]">
                <h3 className="text-[12.5px] font-bold text-plum">
                  {value.title}
                </h3>
                <p className="mt-[9px] text-[13px] leading-[1.7] text-ink-5">
                  {value.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
