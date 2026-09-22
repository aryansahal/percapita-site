import { CONTACT, FAQ_DISCLAIMER, FAQS } from "@/lib/content";
import { MailIcon, WhatsAppIcon } from "./icons";

/**
 * FAQs, Sept 2026 copy.
 *
 * Two columns: the heading and CTA stick in the left column while the
 * accordion scrolls past. Twelve collapsed rows in a single 820px measure
 * read as a wall of hairlines with a dead gutter beside them, and the left
 * column is far shorter than the list, so pinning it keeps the CTA in view
 * instead of stranding it at the top.
 *
 * Native <details>/<summary>: keyboard support, find-in-page expansion and
 * correct semantics, with no JavaScript. The first answer is open so the
 * section shows content at rest rather than twelve closed lines.
 *
 * The fee and commission answers are regulatory disclosure. Do not reword.
 */
export function Faqs() {
  return (
    <section id="faqs" className="bg-surface">
      <div className="shell section-y">
        <div className="grid grid-cols-1 items-start gap-x-[clamp(32px,5vw,72px)] gap-y-[clamp(28px,4vw,40px)] lg:grid-cols-[0.78fr_1.22fr]">
          <header className="min-w-0 lg:sticky lg:top-[100px]">
            <p className="eyebrow eyebrow-gap text-violet">FAQs</p>
            <h2 className="h2-display text-plum">
              Questions worth asking before you invest.
            </h2>
            <a
              href="#contact"
              className="mt-[clamp(22px,3vw,30px)] inline-block rounded-[2px] bg-purple px-6 py-[14px] text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
            >
              Talk to an Advisor
            </a>

            {/* An FAQ that answers everything is rare; give the exits a home
                rather than leaving this column empty beside a long list. */}
            <div className="mt-[clamp(26px,3.5vw,36px)] max-w-[360px] border-t border-hair-2 pt-[clamp(20px,2.5vw,26px)]">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-muted">
                Not covered here
              </p>
              <ul className="mt-3 flex list-none flex-col gap-2.5">
                <li>
                  <a
                    href={CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-[13.5px] font-medium text-purple transition-colors duration-150 hover:text-purple-accent"
                  >
                    <WhatsAppIcon size={15} className="flex-none" />
                    <span>{CONTACT.whatsappLabel}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.emailHref}
                    className="flex items-center gap-2.5 text-[13.5px] font-medium text-purple transition-colors duration-150 hover:text-purple-accent"
                  >
                    <MailIcon size={15} className="flex-none" />
                    <span>{CONTACT.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </header>

          <div className="min-w-0 border-t border-hair-2">
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                open={i === 0}
                className="group border-b border-hair-2"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-[15.5px] leading-[1.45] font-bold text-plum transition-colors duration-150 group-hover:text-purple-accent">
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-[5px] flex h-[18px] w-[18px] flex-none items-center justify-center text-[19px] leading-none text-violet transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="flex flex-col gap-3 pr-8 pb-[22px] text-[14px] leading-[1.8] text-ink-3">
                  {faq.a.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-[clamp(28px,3.5vw,40px)] max-w-[1000px] text-[11px] leading-[1.85] text-muted">
          {FAQ_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
