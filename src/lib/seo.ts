import { CONTACT, FAQS, OFFICES, SERVICES } from "./content";

/**
 * Canonical origin. Every absolute URL in metadata, the sitemap, robots.txt
 * and the structured data derives from this one value, so a domain change is
 * a single edit (or an env var at build time).
 *
 * OPEN ITEM: confirm the live domain before launch. A wrong canonical is worse
 * than none - it tells search engines the real pages are somewhere else.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://percapita.in"
).replace(/\/$/, "");

export const SITE_NAME = "Percapita Advisors";

export const SITE_DESCRIPTION =
  "Independent, AMFI-registered financial advisory in Mumbai and Pune. Financial planning and investment guidance across mutual funds, SIFs, PMS, AIFs, insurance and loans. ARN 142346, independent since 2015.";

/** Digits only, E.164. The display label carries the spacing. */
const PHONE_E164 = "+919920666628";

/**
 * Structured data as a single @graph.
 *
 * Two things it is doing beyond generic SEO:
 *
 * - **Local presence.** Each office is its own `FinancialService` node with a
 *   full postal address, linked from the parent as a department. That is what
 *   lets Percapita surface for "financial advisor in Malad" or "mutual fund
 *   distributor Kharadi" rather than only for its own name.
 * - **Answerable facts.** The FAQ block is emitted as a real `FAQPage`, which
 *   is what both rich results and generative answer engines read to quote a
 *   direct answer. The fee and commission answers are the ones people search
 *   for, and they are already written plainly.
 *
 * No geo coordinates, opening hours or price range: those are not stated
 * anywhere on the site and inventing them would be worse than omitting them.
 */
export function structuredData() {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;

  const branches = OFFICES.map((office, i) => ({
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#office-${office.city.toLowerCase()}`,
    name: `${SITE_NAME} — ${office.city}`,
    parentOrganization: { "@id": orgId },
    url: SITE_URL,
    telephone: PHONE_E164,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.lines.join(", "),
      addressLocality: office.city,
      addressRegion: "Maharashtra",
      postalCode: i === 0 ? "400064" : "411014",
      addressCountry: "IN",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": orgId,
        name: SITE_NAME,
        alternateName: "Percapita",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: `${SITE_URL}/logos/percapita-mark.png`,
        image: `${SITE_URL}/photos/commitment.jpg`,
        telephone: PHONE_E164,
        email: CONTACT.email,
        foundingDate: "2015",
        slogan: "Finance that feels personal.",
        // AMFI registration. The identifier is the trust signal for this
        // industry and appears verbatim in the footer.
        identifier: {
          "@type": "PropertyValue",
          propertyID: "AMFI ARN",
          value: "142346",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: OFFICES[0].lines.join(", "),
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400064",
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "India" },
        department: branches.map((b) => ({ "@id": b["@id"] })),
        knowsAbout: SERVICES.map((s) =>
          s.expansion ? `${s.name} (${s.expansion})` : s.name,
        ),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.expansion ?? s.name,
              description: s.body,
            },
          })),
        },
      },
      ...branches,
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faqs`,
        inLanguage: "en-IN",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a.join(" ") },
        })),
      },
    ],
  };
}
