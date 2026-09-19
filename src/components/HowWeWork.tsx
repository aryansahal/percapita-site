import { PHOTOS, PROCESS_STAGES } from "@/lib/content";
import { Photo } from "./Photo";

export function HowWeWork() {
  return (
    <section id="process" className="bg-white">
      <div className="shell pb-[clamp(56px,7vw,96px)]">
        <div className="text-center">
          <p className="eyebrow mb-[18px] text-violet">How We Work</p>
          <h2 className="text-[clamp(26px,3.6vw,36px)] leading-[1.2] font-bold tracking-[-0.03em] text-plum">
            Our financial planning process.
          </h2>
          <p className="mx-auto mt-[18px] max-w-[640px] text-[14.5px] leading-[1.8] text-ink-3">
            Everything begins with understanding you. We take the time to
            explore your financial world, where you are today, what matters
            most, and where you want to go.
          </p>
        </div>

        <ol className="mt-14 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,215px),1fr))] gap-px bg-hair">
          {PROCESS_STAGES.map((stage) => (
            <li
              key={stage.stage}
              className="bg-white px-6 pt-[26px] pb-[30px]"
            >
              <p className="border-b border-violet pb-[14px] text-[11px] font-semibold tracking-[0.12em] text-violet">
                {stage.stage}
              </p>
              <h3 className="mt-5 text-[16px] font-bold text-plum">
                {stage.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.72] text-ink-4">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))]">
          {/* h-full so the photo matches the panel beside it rather than
              leaving a gap underneath. w-full is load-bearing: without a
              definite width, aspect-ratio derives width from the stretched
              height and the photo overflows the page on narrow screens. */}
          <div className="relative aspect-[4/3] h-full w-full min-h-[320px] min-w-0">
            <Photo
              src={PHOTOS.journey.src}
              alt={PHOTOS.journey.alt}
              credit={PHOTOS.journey.credit}
              creditHref={PHOTOS.journey.creditHref}
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center bg-surface px-[clamp(26px,4vw,52px)] py-[clamp(34px,4.5vw,56px)]">
            <p className="eyebrow mb-[22px] text-violet">
              Your Initial Consultation
            </p>
            <p className="text-[15px] leading-[1.85] text-ink-2">
              At Percapita, relationships begin with alignment and trust. We
              offer a no obligation initial consultation, an opportunity to
              understand your needs and determine whether our approach is the
              right fit for you.
            </p>
            <p className="mt-[18px] text-[15px] leading-[1.85] text-ink-2">
              We operate on a single, transparent advisory fee that covers our
              integrated financial planning and investment guidance. Our pricing
              is designed to be fair, straightforward, and focused on long term
              value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
