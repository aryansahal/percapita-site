import type { Metadata } from "next";
import { ClientLoginProvider } from "@/components/ClientLogin";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SiteHeader } from "@/components/SiteHeader";
import { CONTACT } from "@/lib/content";
import { POLICY_SECTIONS, POLICY_UPDATED } from "@/lib/policy";

/**
 * Policy: terms, disclosures, privacy and grievance redressal on one page.
 *
 * One page rather than four, because a visitor looking for any of this is
 * looking for "the legal bit", and a set of near-identical pages makes them
 * guess which one holds the answer. The contents list at the top is what
 * makes a single long page navigable.
 *
 * Indexable on purpose: a grievance redressal route that search cannot find
 * is not much of a route.
 */
export const metadata: Metadata = {
  title: "Policy",
  description: `Terms of use, investment disclosures, privacy policy and grievance redressal for Percapita Advisors, AMFI registered mutual fund distributor ${CONTACT.arn}.`,
  alternates: { canonical: "/policy" },
};

export default function Policy() {
  return (
    <ClientLoginProvider>
      <SiteHeader />
      <main>
        <section className="bg-surface">
          <div className="shell section-y">
            <div className="max-w-[780px]">
              <p className="eyebrow eyebrow-gap text-violet">Policy</p>
              <h1 className="h2-display text-plum">
                Terms, disclosures, and how we handle your data.
              </h1>
              <p className="mt-5 text-[15.5px] leading-[1.8] text-ink-3">
                What we do, how we are paid, what happens to anything you send
                us, and what to do if something goes wrong.
              </p>
              <p className="mt-6 text-[11.5px] tracking-[0.04em] text-muted">
                Last updated {POLICY_UPDATED} &middot; {CONTACT.arn}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="shell section-y">
            <div className="max-w-[780px]">
              <nav aria-label="On this page">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-muted">
                  On this page
                </p>
                <ol className="mt-4 grid list-none grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  {POLICY_SECTIONS.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-[13.5px] leading-[1.6] text-purple transition-colors duration-150 hover:text-purple-accent"
                      >
                        <span className="text-muted-3 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {POLICY_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mt-[clamp(38px,4.5vw,54px)] scroll-mt-[96px] border-t border-hair pt-[clamp(26px,3vw,34px)]"
                >
                  <h2 className="text-[clamp(19px,2.3vw,23px)] leading-[1.3] font-bold tracking-[-0.02em] text-plum">
                    {section.title}
                  </h2>

                  {section.blocks.map((block, i) => {
                    if (block.subheading) {
                      return (
                        <h3
                          key={i}
                          className="mt-[26px] text-[10px] font-bold tracking-[0.16em] uppercase text-violet"
                        >
                          {block.subheading}
                        </h3>
                      );
                    }
                    if (block.list) {
                      return (
                        <ul
                          key={i}
                          className="mt-3.5 flex list-none flex-col gap-2.5"
                        >
                          {block.list.map((item) => (
                            <li
                              key={item}
                              className="border-l-2 border-hair-2 pl-4 text-[14.5px] leading-[1.8] text-ink-3"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className="mt-3.5 text-[14.5px] leading-[1.85] text-ink-3"
                      >
                        {block.text}
                      </p>
                    );
                  })}
                </section>
              ))}

              <p className="mt-[clamp(38px,4.5vw,54px)] border-t border-hair pt-[clamp(22px,2.6vw,28px)] text-[13.5px] leading-[1.8] text-ink-3">
                Questions about anything on this page? Write to{" "}
                <a
                  href={CONTACT.emailHref}
                  className="font-semibold text-purple hover:text-purple-accent"
                >
                  {CONTACT.email}
                </a>
                .
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
