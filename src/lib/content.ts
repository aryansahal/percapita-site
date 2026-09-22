/**
 * Site copy and content lists.
 *
 * Legal copy (the footer disclaimer, the advisory-only footnotes) is
 * client-supplied and must be reproduced verbatim — do not reword.
 */

export const CONTACT = {
  whatsappHref: "https://wa.me/919920666628",
  /** Displayed everywhere the number appears. The grouping is the client's,
   *  from the design handoff; only the country code was added. */
  whatsappLabel: "+91 9920 6666 28",
  email: "contact@percapita.in",
  emailHref: "mailto:contact@percapita.in",
  arn: "ARN 142346",
} as const;

export const NAV_LINKS = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Services", href: "#services" },
  { label: "Calculators", href: "#calculators" },
  { label: "Contact Us", href: "#contact" },
] as const;

/** Client-supplied, Sept 2026 copy. `accent` renders in violet beside the value. */
export const HERO_STATS = [
  { value: "2015", accent: null, label: "Independent Since" },
  { value: "40", accent: "+ Years", label: "Collective Team Expertise" },
  { value: "450", accent: "+", label: "Clients" },
] as const;

/**
 * The Percapita wordmark's intrinsic pixel size, used to keep next/image's
 * aspect ratio honest wherever it is rendered at a different width.
 */
export const WORDMARK = { src: "/logos/percapita-mark.png", w: 949, h: 285 };

/**
 * Fund houses, in the marquee's display order. `file` maps to /public/logos;
 * `w`/`h` are each PNG's intrinsic size. They differ wildly (ratios run from
 * 1.45 to 6.79), so they cannot be approximated with one shared value —
 * next/image warns when the rendered ratio disagrees with the declared one.
 *
 * OPEN ITEM: third-party trademarks — confirm usage rights before launch.
 */
export const FUND_HOUSES = [
  { file: "8.png", name: "SBI Mutual Fund", w: 863, h: 167 },
  { file: "9.png", name: "Kotak Mahindra Mutual Fund", w: 797, h: 224 },
  { file: "14.png", name: "Nippon India Mutual Fund", w: 700, h: 291 },
  { file: "15.png", name: "PGIM India Mutual Fund", w: 588, h: 289 },
  { file: "16.png", name: "Bandhan Mutual Fund", w: 679, h: 253 },
  { file: "12.png", name: "Motilal Oswal Mutual Fund", w: 505, h: 294 },
  { file: "13.png", name: "PPFAS Mutual Fund", w: 602, h: 207 },
  { file: "11.png", name: "Aditya Birla Capital Mutual Funds", w: 621, h: 274 },
  { file: "10.png", name: "Mirae Asset Mutual Fund", w: 829, h: 260 },
  { file: "4.png", name: "Canara Robeco Mutual Fund", w: 971, h: 143 },
  { file: "5.png", name: "HDFC Mutual Fund", w: 512, h: 208 },
  { file: "7.png", name: "Invesco Mutual Fund", w: 466, h: 321 },
  { file: "6.png", name: "ICICI Prudential Mutual Fund", w: 494, h: 221 },
  { file: "2.png", name: "Edelweiss Mutual Fund", w: 752, h: 149 },
  { file: "3.png", name: "Baroda BNP Paribas Mutual Fund", w: 752, h: 267 },
  { file: "1.png", name: "DSP Mutual Fund", w: 733, h: 147 },
] as const;

/** Rendered height of every logo in the marquee. */
export const MARQUEE_LOGO_HEIGHT = 38;

/** Horizontal space after each logo. Applied per item, not as a flex gap —
 *  see the note in LogoMarquee about why that distinction matters. */
export const MARQUEE_LOGO_SPACING = 64;

/** The four numbered points in the Who We Are band (Sept 2026 copy). */
export const WHO_WE_ARE_POINTS = [
  {
    title: "Integrity and Transparency",
    body: "We keep it real, building genuine relationships through trust, clear communication, and honest guidance.",
  },
  {
    title: "Professional Excellence",
    body: "Every detail matters. Our team brings decades of expertise, delivering smart, research driven solutions with care and precision.",
  },
  {
    title: "Solution Oriented Mindset",
    body: "Challenges don’t scare us. We focus on practical, outcome driven strategies that help you make smarter money moves.",
  },
  {
    title: "Future Ready Finance",
    body: "We don’t just plan for today, we help you stay ahead. With clarity, confidence, and modern tools, Percapita empowers you to build lasting value for tomorrow.",
  },
] as const;

/**
 * Values (Sept 2026 copy). `lead` is the memorable line and carries the
 * visual weight; `title` labels it and `body` explains it.
 */
export const VALUES = [
  {
    title: "People First",
    lead: "Numbers matter. You matter more.",
    body: "Finance starts with understanding the person behind the numbers.",
  },
  {
    title: "Keep It Clear",
    lead: "No jargon. No noise. Just clarity.",
    body: "We make finance easier to understand and easier to act on.",
  },
  {
    title: "Own Your Journey",
    lead: "Your money. Your goals. Your way.",
    body: "Because financial success looks different for everyone.",
  },
  {
    title: "Build For Tomorrow",
    lead: "Think ahead. Move smarter.",
    body: "We help turn today’s financial choices into tomorrow’s possibilities.",
  },
] as const;

export const PERCAPITA_MINDSET = {
  label: "The Percapita mindset",
  line: "Human at heart. Clear by design. Personal by default.",
} as const;

/**
 * RETAINED, CURRENTLY UNUSED. The Sept 2026 copy replaced these two capability
 * lists with a narrative in `WhatWeDo.tsx`. Kept so the fourteen specific
 * capabilities are recoverable if the client wants them back; delete once that
 * is settled. See OPEN-ITEMS.md.
 */
export const WHAT_WE_DO = [
  {
    heading: "Financial Planning Expertise",
    items: [
      "Cash flow and liquidity planning",
      "Tax efficiency and asset structuring",
      "Capital gains and income tax guidance",
      "Retirement and pension planning",
      "Legacy and succession planning",
      "Diversification and portfolio alignment",
      "Risk assessment and contingency planning",
    ],
  },
  {
    heading: "Investment Advisory Strategy",
    items: [
      "Portfolio design aligned with your risk profile and objectives",
      "Access to diverse investment opportunities",
      "Research driven recommendations",
      "Ongoing monitoring and rebalancing",
      "Tax efficient portfolio construction",
      "ESG considerations with emphasis on governance",
      "Diversification across asset classes and regions",
    ],
  },
] as const;

/**
 * Services (Sept 2026 copy). `name` is the label; `expansion` spells out the
 * abbreviation where there is one and is joined to the name with a middle dot,
 * matching the eyebrow style used elsewhere.
 */
export const SERVICES = [
  {
    name: "Mutual Funds",
    expansion: null,
    tagline: "Investing, minus the noise.",
    body: "Access a wide range of professionally managed funds across asset classes and strategies. We help you explore options based on your goals, risk profile, and investment horizon.",
    points: [
      "Goal based fund selection",
      "Diversified investment options",
      "Risk & portfolio assessment",
      "Ongoing portfolio review",
    ],
  },
  {
    name: "SIFs",
    expansion: "Specialized Investment Funds",
    tagline: "More strategy. More possibilities.",
    body: "SIFs offer access to specialised investment strategies within a regulated framework. We help you understand the strategy, risks, liquidity, and suitability before you invest.",
    points: [
      "Specialised investment strategies",
      "Strategy & risk assessment",
      "Portfolio diversification",
      "Suitability led selection",
    ],
  },
  {
    name: "PMS",
    expansion: "Portfolio Management Services",
    tagline: "A portfolio built around you.",
    body: "A more customised approach to portfolio management, aligned with your objectives, risk profile, and investment horizon.",
    points: [
      "Customised portfolio strategies",
      "Direct portfolio exposure",
      "Ongoing monitoring",
      "Periodic portfolio review",
    ],
  },
  {
    name: "AIF",
    expansion: "Alternative Investment Funds",
    tagline: "Beyond the usual.",
    body: "Explore alternative investment strategies that can sit alongside traditional investments, with a focus on understanding the fund, structure, risks, and liquidity.",
    points: [
      "Alternative investment strategies",
      "Fund & strategy evaluation",
      "Portfolio diversification",
      "Risk & liquidity assessment",
    ],
  },
  {
    name: "Insurance Advisory",
    expansion: null,
    tagline: "Protect the plan, not just the premium.",
    body: "We look at your existing coverage, responsibilities, and financial priorities to assess where insurance fits into your overall financial picture.",
    points: [
      "Coverage assessment",
      "Protection needs analysis",
      "Policy review",
      "Gap & overlap identification",
    ],
  },
  {
    name: "Loan Advisory",
    expansion: null,
    tagline: "Borrow smart. Think beyond the EMI.",
    body: "We help evaluate borrowing options beyond just the EMI: considering affordability, repayment structure, existing commitments, and overall financial impact.",
    points: [
      "Loan requirement assessment",
      "Affordability analysis",
      "Cost & structure review",
      "Repayment planning",
    ],
  },
] as const;

/** How We Work stages (Sept 2026 copy). */
export const PROCESS_STAGES = [
  {
    stage: "01",
    title: "Let’s Talk",
    body: "First, we get on the same page. A no pressure conversation to understand your financial world, priorities, and what you’re looking for.",
  },
  {
    stage: "02",
    title: "Get Real About Goals",
    body: "What actually matters to you? We dig into your goals, timelines, priorities, risk profile, and the financial decisions around them.",
  },
  {
    stage: "03",
    title: "See If We Fit",
    body: "No hard sell. Just clarity. We explain where Percapita can add value, what the engagement involves, and whether our approach makes sense for your needs.",
  },
  {
    stage: "04",
    title: "Build & Revisit",
    body: "Because life doesn’t stay on read. Where you choose to work with us, we develop the relevant financial and investment strategy and review it periodically as your circumstances and priorities change.",
  },
] as const;

/** The one-line summary of the process, rendered with arrows between steps. */
export const PROCESS_FLOW = ["Talk", "Understand", "Plan", "Review"] as const;

/** FAQs (Sept 2026 copy). Answers are paragraph arrays; several run to more
 *  than one. The fee and commission wording is regulatory disclosure and must
 *  be reproduced verbatim. */
export const FAQS = [
  {
    q: "What does Percapita do?",
    a: ["We help you navigate investments and financial decisions across Mutual Funds, SIFs, PMS, AIFs, Insurance, and Loans, depending on your needs and eligibility."],
  },
  {
    q: "Do I need to be a finance expert?",
    a: ["Not at all. You bring the goals and questions. We help simplify the options and explain the important stuff."],
  },
  {
    q: "How do you choose investments?",
    a: ["We consider your goals, financial situation, risk profile, time horizon, and priorities when discussing relevant investment options."],
  },
  {
    q: "What can I invest in through Percapita?",
    a: ["Our offerings include Mutual Funds, SIFs, PMS, and AIFs, subject to product eligibility and applicable regulations."],
  },
  {
    q: "Do you guarantee returns?",
    a: ["No. Investments are subject to market risks, and returns are never guaranteed."],
  },
  {
    q: "What happens if Percapita shuts down?",
    a: [
      "Your investments don’t belong to Percapita.",
      "For mutual funds, your investments are held through the relevant mutual fund and registrar infrastructure. If Percapita stops operating, your underlying investments remain subject to the terms and processes of the respective fund and applicable regulations.",
    ],
  },
  {
    q: "What are your fees?",
    a: [
      "For Regular Plan mutual funds, we do not charge you a separate platform or advisory fee. As an MFD, we receive distribution commission from the mutual fund scheme as permitted under the applicable regulations.",
      "There are no additional charges from us specifically for our guidance, portfolio reviews, or ongoing support under this arrangement.",
      "For other products, applicable fees and charges may vary and are communicated separately.",
    ],
  },
  {
    q: "How does Percapita earn?",
    a: ["For Regular Plan mutual funds, we receive distribution commission from the respective mutual fund schemes. We believe you should know how we’re compensated."],
  },
  {
    q: "What happens in the first meeting?",
    a: [
      "We talk. No complicated homework.",
      "We understand where you are financially, what you’re working towards, and what you’re looking for.",
    ],
  },
  {
    q: "Is Percapita only about investments?",
    a: ["Nope. We also help clients think through areas such as insurance, borrowing, retirement, tax considerations, and broader financial planning."],
  },
  {
    q: "Can I ask questions before investing?",
    a: ["Absolutely. Understanding the product, risks, costs, and how we’re compensated should come before any investment decision."],
  },
  {
    q: "What’s the Percapita approach?",
    a: [
      "Less noise. More context.",
      "We keep things simple, explain the relevant options, and help you make informed financial decisions.",
    ],
  },
] as const;

export const FAQ_DISCLAIMER =
  "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Product availability, eligibility, fees, commissions, and terms are subject to applicable regulations and product-specific conditions.";

export const OFFICES = [
  {
    city: "Mumbai",
    lines: ["75, Regal, Rustomjee Adarsh", "Malad West, Mumbai 400064"],
    note: null,
  },
  {
    city: "Pune",
    lines: ["C 01, Wing A, 7th Floor, City Vista", "Kharadi, Pune 411014"],
    note: "(by appointment)",
  },
] as const;

/** Mirrors the six services actually on the page. */
export const FOOTER_SERVICES = [
  { label: "Mutual Funds", href: "#services" },
  { label: "SIFs", href: "#services" },
  { label: "PMS", href: "#services" },
  { label: "AIF", href: "#services" },
  { label: "Insurance Advisory", href: "#services" },
  { label: "Loan Advisory", href: "#services" },
] as const;

export const FOOTER_COMPANY = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Calculator", href: "#calculators" },
  { label: "FAQs", href: "#faqs" },
  { label: "Policy", href: "#contact" },
  { label: "Contact Us", href: "#contact" },
] as const;

/**
 * Placeholder photography. OPEN ITEM: replace with the client's own or
 * properly licensed images.
 *
 * These are Unsplash images. Attribution is not rendered because the Unsplash
 * Licence does not require it, but for the record the photographers are:
 * hero — Ratul Puri; quote — Vitaly Gariev; journey — Sortter.
 */
export const PHOTOS = {
  hero: {
    src: "https://images.unsplash.com/photo-1742981365880-698cfb84492d?fm=jpg&q=80&w=1200&h=1500&auto=format&fit=crop&crop=faces",
    alt: "An advisor in conversation with a client",
  },
  quote: {
    src: "https://images.unsplash.com/photo-1714974528718-b3b52f91c334?fm=jpg&q=80&w=1800&auto=format&fit=crop",
    alt: "An advisory meeting in progress",
  },
  journey: {
    src: "https://images.unsplash.com/photo-1647510284152-473953f84acc?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    alt: "A client meeting at Percapita",
  },
} as const;
