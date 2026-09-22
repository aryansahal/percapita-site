import { FAQ_DISCLAIMER, FAQS } from "@/lib/content";

/**
 * FAQs, Sept 2026 copy.
 *
 * Native <details>/<summary>: keyboard support, find-in-page expansion and
 * correct semantics come free, and it needs no JavaScript. Thirteen questions
 * laid out flat would run well over a thousand pixels.
 *
 * The fee and commission answers are regulatory disclosure. Do not reword.
 */
export function Faqs() {
  return (
    <section id="faqs" className="bg-surface">
      <div className="shell section-y">
        <div className="max-w-[820px]">
          <p className="eyebrow eyebrow-gap text-violet">FAQs</p>
          <h2 className="h2-display text-plum">
            Questions worth asking before you invest.
          </h2>
        </div>

        <div className="mt-[clamp(28px,4vw,40px)] max-w-[820px] border-t border-hair-2">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group border-b border-hair-2">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-[18px] [&::-webkit-details-marker]:hidden">
                <span className="text-[15.5px] leading-[1.45] font-bold text-plum">
                  {faq.q}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-[3px] flex-none text-[18px] leading-none text-violet transition-transform duration-150 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="flex flex-col gap-3 pb-[22px] text-[14px] leading-[1.8] text-ink-3">
                {faq.a.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-[clamp(24px,3vw,32px)] max-w-[1000px] text-[11px] leading-[1.85] text-muted">
          {FAQ_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
