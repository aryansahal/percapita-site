/**
 * Our Commitment.
 *
 * Was a full-bleed photograph with the copy set over it behind two gradient
 * scrims. The photograph is gone, so the scrims went with it - they existed
 * only to keep text legible against the image.
 *
 * Still an inset band rather than full-bleed: What We Do directly below is a
 * full-width dark section, and the white gutter around this card is what keeps
 * the two from reading as one continuous block.
 */
export function QuoteBand() {
  return (
    <section className="shell pb-[clamp(56px,7vw,96px)]">
      <div className="bg-plum px-[clamp(22px,4vw,56px)] py-[clamp(38px,5vw,60px)]">
        <div className="max-w-[680px]">
          <p className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-lilac">
            Our Commitment
          </p>
          <p className="mt-[14px] text-[clamp(20px,2.7vw,28px)] leading-[1.25] font-bold tracking-[-0.025em] text-white">
            We&rsquo;re in this for the long game.
          </p>

          <p className="mt-[18px] text-[15px] leading-[1.75] text-on-dark-2">
            We keep things clear, independent, and grounded in real life so you
            can make informed money decisions without the noise.
          </p>

          <p className="mt-6 text-[clamp(15px,1.9vw,18px)] leading-[1.4] font-bold tracking-[-0.015em] text-white">
            Your journey. We&rsquo;re here for it.
          </p>
        </div>
      </div>
    </section>
  );
}
