import { PHOTOS } from "@/lib/content";
import { Photo } from "./Photo";

/**
 * Our Commitment, set over the full-bleed photograph.
 *
 * The height is content-driven with a floor, not a fixed `aspect-ratio`. The
 * copy here runs to four paragraphs; against a locked 16:6 box it overflowed
 * the frame at narrow widths, where the band is barely 300px tall.
 */
export function QuoteBand() {
  return (
    <section className="shell pb-[clamp(56px,7vw,96px)]">
      <div className="relative min-h-[clamp(320px,34vw,430px)] w-full overflow-hidden">
        <Photo
          src={PHOTOS.quote.src}
          alt={PHOTOS.quote.alt}
          sizes="(max-width: 1264px) 100vw, 1200px"
        />

        {/* Horizontal reveal: the photograph stays legible on the right. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(28,10,45,0.9) 0%, rgba(28,10,45,0.74) 42%, rgba(28,10,45,0.15) 100%)",
          }}
        />
        {/* Below sm the text spans nearly the full width, where that gradient
            has already faded out. An even scrim keeps it readable. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[rgba(28,10,45,0.62)] sm:hidden"
        />

        <div className="relative flex max-w-[600px] flex-col justify-center px-[clamp(20px,4vw,52px)] py-[clamp(34px,4.5vw,52px)]">
          <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-lilac">
            Our Commitment
          </p>
          <p className="mt-[14px] text-[clamp(19px,2.6vw,27px)] leading-[1.25] font-bold tracking-[-0.025em] text-white">
            We&rsquo;re in this for the long game.
          </p>

          <div className="mt-[18px] flex flex-col gap-3 text-[14px] leading-[1.7] text-on-dark-2">
            <p>
              Money doesn&rsquo;t come with a playbook. Life changes, goals
              evolve, and plans rarely go exactly as planned.
            </p>
            <p>
              We&rsquo;re committed to building finance that keeps up: simple,
              honest, and built around real life.
            </p>
            <p>
              No pretending. No one size fits all answers. Just better ways to
              navigate your money, today and for what&rsquo;s next.
            </p>
          </div>

          <p className="mt-5 text-[clamp(15px,1.9vw,18px)] leading-[1.4] font-bold tracking-[-0.015em] text-white">
            Your journey. We&rsquo;re here for it.
          </p>
        </div>
      </div>
    </section>
  );
}
