import type { Metadata } from "next";
import Link from "next/link";
import { ClientLoginProvider } from "@/components/ClientLogin";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SiteHeader } from "@/components/SiteHeader";
import { CheckCircleIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { CONTACT } from "@/lib/content";

/**
 * Confirmation page for the consultation form.
 *
 * A real URL rather than an inline panel, so analytics and ad platforms can
 * count a conversion by destination - a state swap inside a component gives
 * them nothing to fire on.
 *
 * `noindex`: it is a step in a funnel, not a page anyone should reach from
 * search. It is also kept out of the sitemap for the same reason.
 */
export const metadata: Metadata = {
  title: "Thank you",
  description: "Your enquiry has reached Percapita Advisors.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYou() {
  return (
    <ClientLoginProvider>
      <SiteHeader />
      <main>
        <section className="bg-surface">
          <div className="shell section-y">
            <div className="mx-auto max-w-[620px]">
              <CheckCircleIcon size={44} className="text-purple-accent" />

              <h1 className="mt-6 text-[clamp(27px,3.8vw,38px)] leading-[1.18] font-bold tracking-[-0.03em] text-plum">
                Thank you. Your enquiry has reached us.
              </h1>

              <p className="mt-5 text-[15.5px] leading-[1.8] text-ink-3">
                An advisor will be in touch within one working day. There is no
                cost and no obligation, and nothing happens until you decide it
                should.
              </p>

              <div className="mt-[clamp(28px,3.5vw,38px)] border-t border-hair-2 pt-[clamp(22px,3vw,28px)]">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-muted">
                  Need us sooner
                </p>
                <ul className="mt-3 flex list-none flex-col gap-2.5">
                  <li>
                    <a
                      href={CONTACT.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-[14px] font-medium text-purple transition-colors duration-150 hover:text-purple-accent"
                    >
                      <WhatsAppIcon size={16} className="flex-none" />
                      <span>{CONTACT.whatsappLabel}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={CONTACT.emailHref}
                      className="flex items-center gap-2.5 text-[14px] font-medium text-purple transition-colors duration-150 hover:text-purple-accent"
                    >
                      <MailIcon size={16} className="flex-none" />
                      <span>{CONTACT.email}</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-[clamp(28px,3.5vw,38px)] flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-[2px] bg-purple px-6 py-[14px] text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-purple-hover"
                >
                  Back to home
                </Link>
                <Link
                  href="/insights"
                  className="rounded-[2px] border border-outline px-6 py-[14px] text-[13px] font-semibold text-purple transition-colors duration-150 hover:border-purple"
                >
                  Read our insights
                </Link>
              </div>

              <p className="mt-[clamp(28px,3.5vw,38px)] border-t border-hair-2 pt-[clamp(20px,2.5vw,26px)] text-[11px] leading-[1.85] text-muted">
                Percapita provides distribution and guidance services only and
                does not guarantee financial outcomes. Investments are subject
                to market risks. AMFI registered mutual fund distributor,{" "}
                {CONTACT.arn}.
              </p>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppFab />
      <SiteFooter />
    </ClientLoginProvider>
  );
}
