import { brochure } from "@/lib/brochure";
import { CONTACT, OFFICES } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { MailIcon, WhatsAppIcon } from "./icons";

export function GetInTouch() {
  const pdf = brochure();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-plum-dark text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 460px at 80% 6%, rgba(139,92,199,0.45), transparent 70%), linear-gradient(180deg, #331B50 0%, #1B0C2C 100%)",
        }}
      />
      <div className="shell relative section-y">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-[clamp(40px,5vw,64px)]">
          <div className="min-w-0">
            <p className="eyebrow eyebrow-gap text-lilac">Get in Touch</p>
            <h2 className="h2-display">
              Start with a no obligation conversation.
            </h2>
            <p className="mt-5 max-w-[480px] text-[14.5px] leading-[1.8] text-on-dark-2">
              For a conversation with one of our advisors to explore how
              Percapita can support your financial planning needs. We usually
              respond within one working day.
            </p>

            <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[14px]">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[14px] border border-[rgba(37,211,102,0.42)] bg-[rgba(37,211,102,0.12)] px-5 py-[18px] text-white transition-colors duration-150 hover:bg-[rgba(37,211,102,0.2)]"
              >
                <WhatsAppIcon className="flex-none text-whatsapp" />
                <span className="flex flex-col gap-[3px]">
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-on-dark-muted">
                    WhatsApp
                  </span>
                  <span className="text-[15px] font-bold">
                    {CONTACT.whatsappLabel}
                  </span>
                </span>
              </a>

              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-[14px] border border-[rgba(195,160,228,0.42)] bg-[rgba(195,160,228,0.12)] px-5 py-[18px] text-white transition-colors duration-150 hover:bg-[rgba(195,160,228,0.2)]"
              >
                <MailIcon className="flex-none text-lilac" />
                <span className="flex flex-col gap-[3px]">
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-on-dark-muted">
                    Email
                  </span>
                  <span className="text-[15px] font-bold">{CONTACT.email}</span>
                </span>
              </a>
            </div>

            <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(24px,4vw,36px)] border-t border-white/[0.14] pt-[34px]">
              {OFFICES.map((office) => (
                <div key={office.city}>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-on-dark-muted">
                    {office.city}
                  </p>
                  <address className="mt-[9px] text-[14px] leading-[1.7] text-on-dark-5 not-italic">
                    {office.lines.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < office.lines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                    {office.note ? (
                      <span className="text-on-dark-muted"> {office.note}</span>
                    ) : null}
                  </address>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <ContactForm />

            {/* Someone who has read the whole page but is not ready to hand
                over their details currently has nowhere to go. */}
            {pdf ? (
              <p className="mt-5 text-[13px] leading-[1.7] text-on-dark-2">
                Not ready to talk?{" "}
                <a
                  href={pdf.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-lilac underline decoration-white/25 underline-offset-[3px] transition-colors duration-150 hover:text-white"
                >
                  Read our brochure
                </a>{" "}
                <span className="text-on-dark-muted">
                  (PDF, {pdf.size})
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
