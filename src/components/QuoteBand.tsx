import { PHOTOS } from "@/lib/content";
import { Photo } from "./Photo";

export function QuoteBand() {
  return (
    <section className="shell pb-[clamp(56px,7vw,96px)]">
      <figure className="relative m-0 aspect-[16/6] min-h-[300px] w-full">
        <Photo
          src={PHOTOS.quote.src}
          alt={PHOTOS.quote.alt}
          sizes="(max-width: 1264px) 100vw, 1200px"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(28,10,45,0.9) 0%, rgba(28,10,45,0.74) 42%, rgba(28,10,45,0.15) 100%)",
          }}
        />
        <figcaption className="pointer-events-none absolute inset-y-0 right-[clamp(20px,4vw,52px)] left-[clamp(20px,4vw,52px)] flex max-w-[580px] flex-col justify-center">
          <p className="mb-4 text-[10.5px] font-bold tracking-[0.18em] uppercase text-lilac">
            Our Commitment
          </p>
          <blockquote className="m-0 text-[clamp(16px,2.1vw,22px)] leading-[1.5] font-semibold tracking-[-0.015em] text-white">
            &ldquo;There are times when objective guidance is essential.
            That&rsquo;s why we prioritise transparent, enduring relationships
            with our clients.&rdquo;
          </blockquote>
        </figcaption>
      </figure>
    </section>
  );
}
