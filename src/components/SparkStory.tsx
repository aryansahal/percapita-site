/**
 * The origin story on its own tinted band.
 *
 * Two columns, not one: the story runs ~250 words, and setting it as a single
 * centred measure made the band over 1,000px tall on its own. Anchoring the
 * headline, question and tagline in a left column lets the narrative use the
 * height beside them instead of below them.
 */
export function SparkStory() {
  return (
    <section className="bg-surface">
      <div className="shell section-y grid gap-x-[clamp(32px,5vw,72px)] gap-y-[clamp(28px,4vw,40px)] lg:grid-cols-[0.85fr_1.15fr]">
        <header className="min-w-0">
          <p className="eyebrow eyebrow-gap text-violet">
            The Spark Behind Percapita
          </p>
          <h2 className="h2-display text-plum">
            Every big idea starts with a question.
          </h2>
          <p className="mt-[18px] max-w-[420px] text-[clamp(16px,2vw,19px)] leading-[1.5] font-semibold text-purple-accent">
            Why does money feel so complicated when it&rsquo;s such a personal
            part of our lives?
          </p>
          <p className="mt-[clamp(24px,3vw,32px)] max-w-[420px] border-t border-hair-2 pt-[clamp(20px,2.5vw,26px)] text-[clamp(16px,2vw,20px)] leading-[1.4] font-bold tracking-[-0.02em] text-purple italic">
            Percapita. Finance that feels personal.
          </p>
        </header>

        <div className="flex min-w-0 flex-col gap-4 text-[15px] leading-[1.8] text-ink-2">
          <p>
            Finance has always spoken in numbers: charts, averages, markets,
            percentages. But numbers don&rsquo;t dream.{" "}
            <strong className="font-semibold text-plum">People do.</strong>
          </p>
          <p>
            And behind every number is a person figuring it out. A first salary.
            A growing business. A big ambition. A family to build. A future to
            plan. That&rsquo;s where{" "}
            <strong className="font-semibold text-plum">Percapita</strong> comes
            in.
          </p>
          <p>
            &ldquo;Per capita&rdquo; means <em>per person</em>. A phrase usually
            used to describe populations and statistics. We saw a different
            meaning.
          </p>

          <ul className="my-1 grid list-none grid-cols-1 divide-y divide-hair-2 border-y border-hair-2 text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {["Per person.", "Per journey.", "Per dream."].map((line) => (
              <li
                key={line}
                className="px-3 py-[15px] text-[clamp(16px,2vw,19px)] font-bold tracking-[-0.02em] text-plum"
              >
                {line}
              </li>
            ))}
          </ul>

          <p>
            So we built Percapita to make finance feel less like a spreadsheet
            and more like something that actually understands you.
          </p>
          <p>
            No unnecessary complexity. No cold, one size fits all thinking. Just
            a clearer way to look at your money, your choices, and what comes
            next. Because wealth isn&rsquo;t just about the numbers.{" "}
            <strong className="font-semibold text-plum">
              It&rsquo;s about what those numbers make possible.
            </strong>
          </p>
          <p>
            Your story is personal.{" "}
            <strong className="font-semibold text-plum">
              Your finances should be too.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
