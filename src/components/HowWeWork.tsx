import { PHOTOS, PROCESS_FLOW, PROCESS_STAGES } from "@/lib/content";
import { Photo } from "./Photo";

/**
 * How We Work, Sept 2026 copy.
 *
 * The header sits beside the photograph so the image still has a job now that
 * the "Your Initial Consultation" panel it used to pair with is gone. Stages
 * stay as bordered cards on a hairline grid: the Who We Are points above are
 * unboxed columns, so the two sections no longer read as the same component.
 */
export function HowWeWork() {
  return (
    <section id="process" className="bg-surface">
      <div className="shell section-y">
        <div className="grid grid-cols-1 items-center gap-x-[clamp(32px,5vw,64px)] gap-y-[clamp(28px,4vw,40px)] lg:grid-cols-[1fr_0.9fr]">
          <div className="min-w-0">
            <p className="eyebrow eyebrow-gap text-violet">How We Work</p>
            <h2 className="h2-display text-plum">
              Your Money. Your Context. Your Plan.
            </h2>
            <p className="mt-4 text-[clamp(16px,2vw,19px)] leading-[1.5] font-semibold text-purple-accent">
              No two financial journeys look the same. So why should the
              process?
            </p>
            <p className="mt-[18px] max-w-[540px] text-[15px] leading-[1.8] text-ink-3">
              We start with a conversation, not a checklist. We get to know
              where you are, what you care about, what you&rsquo;re planning
              for, and what your financial picture looks like today.
            </p>
          </div>

          <div className="relative aspect-[4/3] h-full w-full min-h-[280px] min-w-0">
            <Photo
              src={PHOTOS.journey.src}
              alt={PHOTOS.journey.alt}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        <ol className="mt-[clamp(40px,5vw,64px)] grid list-none grid-cols-1 gap-px bg-hair-2 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STAGES.map((stage) => (
            <li
              key={stage.stage}
              className="bg-white px-6 pt-[26px] pb-[30px]"
            >
              <p className="border-b border-violet pb-[14px] text-[11px] font-semibold tracking-[0.12em] text-violet">
                {stage.stage}
              </p>
              <h3 className="mt-5 text-[16px] leading-[1.3] font-bold text-plum">
                {stage.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.72] text-ink-4">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>

        <ol className="mt-[clamp(32px,4vw,44px)] flex list-none flex-wrap items-center justify-center gap-x-3 gap-y-2 border-y border-hair-2 py-[clamp(18px,2.5vw,24px)]">
          {PROCESS_FLOW.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="text-[clamp(15px,2vw,19px)] font-bold tracking-[-0.015em] text-plum">
                {step}
              </span>
              {i < PROCESS_FLOW.length - 1 ? (
                <span aria-hidden="true" className="text-[16px] text-violet">
                  &rarr;
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="mt-[clamp(24px,3vw,32px)] max-w-[1000px] text-[11px] leading-[1.85] text-muted">
          Disclaimer : Financial planning and investment recommendations are
          based on individual circumstances, risk profiling, suitability, and
          applicable regulations. Investments are subject to market risks; no
          investment outcome is guaranteed.
        </p>
      </div>
    </section>
  );
}
