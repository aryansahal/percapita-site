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
            Tailored Financial Planning &amp;{" "}
            <span className="text-purple-accent">Investment</span> Solutions.
          </h1>

          <p className="mt-[26px] max-w-[470px] text-[15.5px] leading-[1.75] text-ink-3">
            We provide clear, research driven financial planning and advisory
            services, designed to help clients make informed decisions about
            their financial future. Our approach is collaborative, professional,
            and focused on long term value.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-[14px]">
            <a
              href="#contact"
              className="rounded-[2px] bg-purple px-[26px] py-[15px] text-[13.5px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
            >
              Get in Touch
            </a>
            <a
              href="#what-we-do"
              className="rounded-[2px] border border-outline px-[26px] py-[15px] text-[13.5px] font-semibold text-purple transition-colors duration-150 hover:border-purple"
            >
              What We Do
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-6 border-t border-hair pt-[34px]">
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
            credit={PHOTOS.hero.credit}
            creditHref={PHOTOS.hero.creditHref}
            creditAlign="right"
            priority
            sizes="(max-width: 700px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute bottom-[26px] left-6 z-10 max-w-[290px] bg-surface px-5 py-[18px]">
            <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-violet">
              AMFI Registered Mutual Fund Distributor
            </p>
            <p className="mt-2 text-[13px] leading-[1.55] text-ink-6">
              ARN 142346. Independent guidance with transparency, security, and
              personalised support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
