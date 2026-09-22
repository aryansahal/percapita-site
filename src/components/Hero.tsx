import { HERO_STATS, PHOTOS } from "@/lib/content";
import { Photo } from "./Photo";

export function Hero() {
  return (
    <section className="shell">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] items-stretch gap-[clamp(36px,5vw,64px)] pt-[clamp(48px,6vw,76px)] pb-[clamp(48px,6vw,64px)]">
        <div className="flex min-w-0 flex-col justify-center">
          <p className="eyebrow mb-[26px] text-violet">
            Independent Financial Advisory · Since 2015
          </p>

          <h1 className="text-[clamp(32px,5.2vw,52px)] leading-[1.1] font-bold tracking-[-0.032em] text-plum">
            Don&rsquo;t just invest.{" "}
            <span className="text-purple-accent">Understand.</span>
          </h1>

          <p className="mt-[26px] max-w-[470px] text-[15.5px] leading-[1.75] text-ink-3">
            At Percapita, we deliver research driven financial planning that
            helps you make smarter money moves. Our independent guidance is
            transparent, secure, and designed for long term value. With clear
            insights and safe communication, we help you navigate your financial
            journey confidently.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-[14px]">
            <a
              href="#contact"
              className="rounded-[2px] bg-purple px-[26px] py-[15px] text-[13.5px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
            >
              Talk to an Advisor
            </a>
            <a
              href="#what-we-do"
              className="rounded-[2px] border border-outline px-[26px] py-[15px] text-[13.5px] font-semibold text-purple transition-colors duration-150 hover:border-purple"
            >
              What We Do
            </a>
          </div>

          {/* Explicit 1 -> 3 rather than auto-fit: with three stats and a
              ~536px column, an auto-fit floor wide enough to keep the labels
              readable only ever fits two, orphaning the third on its own row. */}
          <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-hair pt-[34px] sm:grid-cols-3">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dd className="text-[30px] font-bold tracking-[-0.02em] text-plum">
                  {stat.value}
                  {stat.accent ? (
                    <span className="text-violet">{stat.accent}</span>
                  ) : null}
                </dd>
                <dt className="mt-1.5 text-[12px] font-medium text-muted-4">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-[4/5] max-h-[640px] min-h-[380px] w-full min-w-0 self-center">
          <Photo
            src={PHOTOS.hero.src}
            alt={PHOTOS.hero.alt}
            priority
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
