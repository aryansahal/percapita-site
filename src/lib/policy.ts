import { CONTACT } from "./content";

/**
 * Policy page content.
 *
 * DRAFTED, NOT APPROVED. This was written from what the site verifiably does
 * plus the obligations that apply to an AMFI-registered mutual fund
 * distributor in India. It has not been reviewed by a lawyer or a compliance
 * professional, and it must be before launch. See OPEN-ITEMS.md.
 *
 * Every factual claim about data handling below was checked against the
 * running site on 23 September 2026:
 *
 *   - No analytics, tag manager, advertising pixel or session recorder.
 *   - No cookies, localStorage or sessionStorage anywhere in the codebase.
 *   - Fonts are self-hosted by `next/font`, so no request reaches Google.
 *   - The two Unsplash photographs are proxied through `/_next/image`, so
 *     the visitor's browser never contacts Unsplash either.
 *   - The enquiry form holds the submitter's IP in memory for ten minutes
 *     for rate limiting, and stores nothing else anywhere.
 *
 * If any of that changes - an analytics script, a cookie banner, a CRM - this
 * page stops being true and has to change with it.
 */

/** Passages supplied by the client and reproduced verbatim elsewhere on the site. */
const MARKET_RISK =
  "Investments in Mutual Funds are subject to market risks. Please read all scheme-related documents carefully before investing. Mutual Fund schemes do not assure or guarantee returns, and past performance may or may not be sustained in the future. There is no certainty that the investment objective of any suggested scheme will be achieved. Investors are advised to review exit loads, total expense ratios (TER), and other applicable costs before making any investment decisions.";

const COMMISSION =
  "Percapita deals in Regular Plans only for Mutual Fund schemes and earns a trailing commission on client investments. Disclosure of commission earnings is provided to clients at the time of investment. Check your Securities /MF/ Bonds in the consolidated account statement issued by NSDL/CDSL every month.";

export interface PolicyBlock {
  /** Rendered as a paragraph. */
  text?: string;
  /** Rendered as a bulleted list. */
  list?: readonly string[];
  /** Rendered as a sub-heading above the blocks that follow. */
  subheading?: string;
}

export interface PolicySection {
  id: string;
  title: string;
  blocks: readonly PolicyBlock[];
}

export const POLICY_UPDATED = "23 September 2026";

export const POLICY_SECTIONS: readonly PolicySection[] = [
  {
    id: "about",
    title: "Who this policy covers",
    blocks: [
      {
        text: `This policy governs your use of percapita.in and the services described on it. "Percapita", "we" and "us" refer to Percapita Services, an AMFI-registered mutual fund distributor holding ${CONTACT.arn}, with offices in Mumbai and Pune.`,
      },
      {
        text: "By using this website or submitting an enquiry through it, you agree to the terms set out here. If you do not agree, please do not use the site.",
      },
    ],
  },

  {
    id: "nature-of-services",
    title: "The nature of our services",
    blocks: [
      {
        text: "Percapita is a distributor of mutual funds, not an investment adviser registered under the SEBI (Investment Advisers) Regulations, 2013. We distribute products and offer guidance incidental to that distribution. We are not authorised to provide investment advice for a fee, and nothing on this website should be read as personalised investment advice.",
      },
      {
        text: "We do not manage, hold or have custody of your money. Every investment is made in your own name, directly with the asset management company or product provider, and every payment goes to them rather than to us. We never ask for money to be transferred to Percapita for investment.",
      },
      {
        text: "Products described on this site, including Portfolio Management Services, Alternative Investment Funds and Specialised Investment Funds, are offered by their respective providers under their own registrations. Availability depends on your eligibility and on the provider's own onboarding.",
      },
    ],
  },

  {
    id: "risk",
    title: "Investment risk",
    blocks: [
      { text: MARKET_RISK },
      {
        text: "Nothing on this website is an offer, solicitation or recommendation to buy or sell any security. Any calculator, illustration or projection on this site uses assumptions that are stated alongside it; those assumptions are not forecasts, and actual outcomes will differ. Figures are provided to help you think, not to be relied on.",
      },
      {
        text: "Scheme net asset values shown on this site are sourced from AMFI and may be delayed. They are indicative. The authoritative value for any transaction is the one recorded by the asset management company or its registrar.",
      },
    ],
  },

  {
    id: "commission",
    title: "How we are paid, and our conflicts of interest",
    blocks: [
      { text: COMMISSION },
      {
        text: "Because we are paid by product providers rather than by you, a conflict of interest exists: different products pay different commissions. You should assume this and ask about it. We will tell you what we earn on anything we suggest, and you are entitled to ask before you invest, not only afterwards.",
      },
      {
        text: "Regular Plans carry a higher expense ratio than Direct Plans of the same scheme. The difference is the distribution commission. You may invest in Direct Plans yourself without a distributor.",
      },
    ],
  },

  {
    id: "privacy",
    title: "Privacy and your personal data",
    blocks: [
      {
        text: "This section describes how this website handles personal data. It is written to reflect what the site actually does, and is deliberately specific rather than general.",
      },
      { subheading: "What we collect" },
      {
        text: "The only information this website collects is what you type into the enquiry form and choose to send us:",
      },
      {
        list: [
          "Your name",
          "Your email address",
          "Your phone number, if you provide one",
          "The topic you select",
          "Anything you write in the message field",
        ],
      },
      {
        text: "Our server also records the IP address of anyone submitting the form, and holds it in memory for ten minutes. This is used solely to limit how many enquiries can be sent from one address in quick succession, which is what stops the form being abused to send mail. It is not written to disk, not linked to your enquiry, and is discarded automatically.",
      },
      { subheading: "What we do not collect" },
      {
        text: "This website sets no cookies. It uses no analytics, no tag manager, no advertising pixel and no session recording. It does not track you across other websites, and it does not build a profile of you. Typefaces are served from our own domain, and the photographs on the site are served through our own servers, so browsing these pages does not report your visit to any third party.",
      },
      { subheading: "Why we use it, and on what basis" },
      {
        text: "We use what you send purely to respond to your enquiry and, if you become a client, to provide the services you ask for. We rely on the consent you give by submitting the form. That consent covers being contacted about your enquiry and nothing more: we do not add enquirers to a marketing list, and we do not sell, rent or trade personal data to anyone, ever.",
      },
      { subheading: "Who else sees it" },
      {
        text: "An enquiry becomes an email. That email is carried by Zoho Corporation, which hosts our mailbox, and is stored there. If you go on to invest, the information needed to do so is shared with the relevant asset management companies, their registrars and transfer agents, KYC registration agencies and depositories, because a transaction cannot be processed without it. We share personal data with no one else, except where the law or a regulator requires it.",
      },
      { subheading: "How long we keep it" },
      {
        text: "Enquiries that do not become client relationships are kept only as long as the conversation is live, and are then deleted. Records relating to actual investments are retained for as long as the applicable SEBI, AMFI and anti-money-laundering rules require, which is presently a minimum of five years after the relationship ends, and longer where a specific rule or an ongoing proceeding demands it.",
      },
      { subheading: "Your rights" },
      {
        text: "Under the Digital Personal Data Protection Act, 2023, you may ask us for:",
      },
      {
        list: [
          "A summary of the personal data we hold about you and how we are processing it",
          "Correction of data that is inaccurate, and completion or updating of data that is incomplete",
          "Erasure of your data, where we are not required to keep it by law",
          "The identities of anyone we have shared your data with",
          "Nomination of another person to exercise these rights if you die or become incapacitated",
        ],
      },
      {
        text: `Write to ${CONTACT.email} to exercise any of these. We will respond as promptly as we reasonably can. You may also withdraw your consent at any time, though doing so does not undo processing that has already lawfully happened, and may mean we can no longer act for you.`,
      },
      { subheading: "Security" },
      {
        text: "This website is served over HTTPS, and enquiries are transmitted encrypted. No method of transmission or storage is completely secure, and we do not claim otherwise. We will never ask you for a password, a one-time passcode, your full bank details or your card details by email, phone or through this website. If someone claiming to be from Percapita asks you for any of those, it is not us.",
      },
    ],
  },

  {
    id: "third-parties",
    title: "Third-party platforms",
    blocks: [
      {
        text: "Client Login takes you to InvestWell, the transaction platform where client accounts are held. It is a separate company operating under its own terms and its own privacy policy, and your login credentials belong to that platform, not to us. We never ask for them, never handle them, and would never present a Percapita-branded page asking you to type them in.",
      },
      {
        text: "The mobile app linked from our footer is published by a third party and is governed by its own terms. So are any other external sites we link to. We do not control their content or their data practices, and linking to them is not an endorsement of either.",
      },
    ],
  },

  {
    id: "use-of-site",
    title: "Using this website",
    blocks: [
      {
        text: "The text, design, images and other material on this site belong to Percapita or to the parties who licensed them to us, and may not be reproduced or republished without permission. Fund house names and logos are the trademarks of their respective owners, shown to indicate the schemes we distribute, and their appearance implies no endorsement of Percapita by them.",
      },
      {
        text: "We try to keep the site accurate and available, but we do not guarantee that it is free of errors or that it will be uninterrupted. Content may be updated or removed at any time without notice. To the extent permitted by law, we are not liable for any loss arising from reliance on information published here; decisions about your money should be taken after a conversation about your circumstances, not from a web page.",
      },
      {
        text: "This site is intended for residents of India. We do not offer services in jurisdictions where doing so would require a registration we do not hold.",
      },
    ],
  },

  {
    id: "kyc",
    title: "KYC and anti-money-laundering",
    blocks: [
      {
        text: "Indian law requires identity verification before any investment can be made. You will be asked for KYC documents, and we are obliged to record and verify them, to monitor for suspicious activity and to report it where the Prevention of Money Laundering Act, 2002 requires. We cannot process a transaction for anyone who declines KYC, and this is not a requirement we can waive.",
      },
    ],
  },

  {
    id: "grievances",
    title: "Complaints and grievance redressal",
    blocks: [
      {
        text: "If something has gone wrong, tell us first. Most things are fixed fastest by speaking to us directly.",
      },
      {
        list: [
          `Step 1 - Write to ${CONTACT.email}, or call us on ${CONTACT.whatsappLabel}. We will acknowledge your complaint and work to resolve it within 21 days.`,
          "Step 2 - If you are not satisfied, escalate to AMFI, the industry body that issues our ARN, at amfiindia.com.",
          "Step 3 - You may also lodge a complaint with SEBI through the SCORES platform at scores.sebi.gov.in, or initiate online dispute resolution through the SEBI ODR portal at smartodr.in.",
        ],
      },
      {
        text: "Complaints about a specific scheme or transaction may also be raised directly with the asset management company concerned, which maintains its own investor grievance channel.",
      },
    ],
  },

  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        text: "We may update this page as our services, our obligations or the law change. The date at the top shows when it was last revised. Material changes to how we handle personal data will be notified to clients directly rather than only posted here.",
      },
    ],
  },
];
