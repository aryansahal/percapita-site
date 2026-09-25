import Link from "next/link";
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
            <Link
              href="/#contact"
              className="rounded-[2px] bg-purple px-[26px] py-[15px] text-[13.5px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
            >
              Talk to an Advisor
            </Link>
            <Link
              href="/#what-we-do"
              className="rounded-[2px] border border-outline px-[26px] py-[15px] text-[13.5px] font-semibold text-purple transition-colors duration-150 hover:border-purple"
            >
              What We Do
            </Link>
          </div>

          {/* Explicit 1 -> 3 rather than auto-fit: with three stats and a
              ~536px column, an auto-fit floor wide enough to keep the labels
              readable only ever fits two, orphaning the third on its own row. */}
          {/* Hairline dividers, not gaps. The three labels differ a lot in
              width ("Collective Team Expertise" against "Clients"), so equal
              columns with only whitespace between them produced visibly uneven
              gaps and a row that trailed off into space. A rule per column
              makes the rhythm read off the dividers rather than off where each
              label happens to end. */}
          <dl className="mt-12 grid grid-cols-1 divide-y divide-hair border-t border-hair sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="py-[18px] first:pt-[26px] last:pb-0 sm:py-0 sm:pt-[26px] sm:pr-[clamp(12px,1.6vw,20px)] sm:pl-[clamp(14px,1.8vw,22px)] sm:first:pl-0 sm:last:pr-0"
              >
                <dd className="text-[30px] leading-none font-bold tracking-[-0.02em] text-plum">
                  {stat.value}
                  {stat.accent ? (
                    <span className="text-violet">{stat.accent}</span>
                  ) : null}
                </dd>
                <dt className="mt-2.5 text-[12px] leading-[1.4] font-medium text-muted-4">
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
            /* The photo is wider than this 4:5 box, so something is always
               cropped. Centring clipped the man's head; 70% keeps both
               faces and stays off the window frame on the right. */
            objectPosition="70% 50%"
          />
        </div>
      </div>
    </section>
  );
}
