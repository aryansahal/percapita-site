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
            <p className="eyebrow text-violet">The Spark Behind Percapita</p>

            <p className="mt-[18px] text-[17px] leading-[1.5] font-bold tracking-[-0.015em] text-plum">
              Every big idea starts with a question.
            </p>
            <p className="mt-3 text-[14.5px] leading-[1.8] text-ink-2">
              Ours was simple:{" "}
              <em className="font-semibold text-plum not-italic">
                Why does money feel so complicated when it&rsquo;s such a
                personal part of our lives?
              </em>
            </p>
            <p className="mt-3 text-[14.5px] leading-[1.8] text-ink-2">
              Finance has always spoken in numbers: charts, averages, markets,
              percentages. But numbers don&rsquo;t dream.{" "}
              <strong className="font-semibold text-plum">People do.</strong>
            </p>

            <p className="mt-4 text-[14.5px] leading-[1.8] text-ink-2">
              And behind every number is a person figuring it out. A first
              salary. A growing business. A big ambition. A family to build. A
              future to plan. That&rsquo;s where{" "}
              <strong className="font-semibold text-plum">Percapita</strong>{" "}
              comes in.
            </p>

            <p className="mt-4 text-[14.5px] leading-[1.8] text-ink-2">
              &ldquo;Per capita&rdquo; means <em>per person</em>. A phrase
              usually used to describe populations and statistics. We saw a
              different meaning.
            </p>

            <ul className="mt-4 flex list-none flex-col gap-1 border-l-2 border-violet pl-[18px]">
              <li className="text-[15.5px] font-bold text-plum">Per person.</li>
              <li className="text-[15.5px] font-bold text-plum">Per journey.</li>
              <li className="text-[15.5px] font-bold text-plum">Per dream.</li>
            </ul>

            <p className="mt-5 text-[14.5px] leading-[1.8] text-ink-2">
              So we built Percapita to make finance feel less like a spreadsheet
              and more like something that actually understands you.
            </p>
            <p className="mt-3 text-[14.5px] leading-[1.8] text-ink-2">
              No unnecessary complexity. No cold, one size fits all thinking.
              Just a clearer way to look at your money, your choices, and what
              comes next. Because wealth isn&rsquo;t just about the numbers.{" "}
              <strong className="font-semibold text-plum">
                It&rsquo;s about what those numbers make possible.
              </strong>
            </p>

            <p className="mt-4 text-[14.5px] leading-[1.8] text-ink-2">
              Your story is personal.{" "}
              <strong className="font-semibold text-plum">
                Your finances should be too.
              </strong>
            </p>

            <p className="mt-5 border-t border-hair-2 pt-[18px] text-[15.5px] font-bold text-purple italic">
              Percapita. Finance that feels personal.
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
