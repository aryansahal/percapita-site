/**
 * Site copy and content lists.
 *
 * Legal copy (the footer disclaimer, the advisory-only footnotes) is
 * client-supplied and must be reproduced verbatim — do not reword.
 */

export const CONTACT = {
  whatsappHref: "https://wa.me/919920666628",
  whatsappLabel: "9920 6666 28",
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

/** OPEN ITEM: invented during design. Confirm with the client before shipping. */
export const HERO_STATS = [
  { value: "2015", accent: null, label: "Independent Since" },
  { value: "16", accent: "+", label: "Fund Houses Accessed" },
  { value: "One", accent: " fee", label: "Transparent Advisory Fee" },
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

export const VALUES = [
  {
    title: "Integrity and Transparency",
    body: "We build genuine relationships based on trust and clear communication.",
  },
  {
    title: "Professional Excellence",
    body: "Our approach is methodical and focused, ensuring every detail is managed with care.",
  },
  {
    title: "Solution Oriented",
    body: "We approach challenges with determination, offering guidance that supports better outcomes.",
  },
  {
    title: "Clear Fee Structure",
    body: "One transparent advisory fee, with no initial setup fees and no hidden costs.",
  },
] as const;

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

export const PROCESS_STAGES = [
  {
    stage: "Stage 01",
    title: "Discovery Meeting",
    body: "An introduction to the planning process and its long term value.",
  },
  {
    stage: "Stage 02",
    title: "Understanding Your Goals",
    body: "We take time to understand your personal and financial goals.",
  },
  {
    stage: "Stage 03",
    title: "Initial Discussion",
    body: "How Percapita can support your journey, and whether we are the right fit.",
  },
  {
    stage: "Stage 04",
    title: "Strategy and Review",
    body: "Strategy development and ongoing review as circumstances and markets evolve.",
  },
] as const;

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

export const FOOTER_SERVICES = [
  { label: "Mutual Funds", href: "#services" },
  { label: "Fixed Deposits", href: "#services" },
  { label: "General Insurance", href: "#services" },
  { label: "Financial Planning", href: "#what-we-do" },
  { label: "Investment Advisory", href: "#what-we-do" },
] as const;

export const FOOTER_COMPANY = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Calculator", href: "#calculators" },
  { label: "Policy", href: "#contact" },
  { label: "Contact Us", href: "#contact" },
] as const;

/**
 * Placeholder photography — Unsplash, NOT licensed for production.
 * OPEN ITEM: replace with the client's own or properly licensed images, at
 * which point the credit lines come out too.
 */
export const PHOTOS = {
  hero: {
    src: "https://images.unsplash.com/photo-1742981365880-698cfb84492d?fm=jpg&q=80&w=1200&h=1500&auto=format&fit=crop&crop=faces",
    alt: "An advisor in conversation with a client",
    credit: "Photo by Ratul Puri on Unsplash",
    creditHref: "https://unsplash.com/@ratulpuri",
  },
  quote: {
    src: "https://images.unsplash.com/photo-1714974528718-b3b52f91c334?fm=jpg&q=80&w=1800&auto=format&fit=crop",
    alt: "An advisory meeting in progress",
    credit: "Photo by Vitaly Gariev on Unsplash",
    creditHref: "https://unsplash.com/@silverkblack",
  },
  journey: {
    src: "https://images.unsplash.com/photo-1647510284152-473953f84acc?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    alt: "A client meeting at Percapita",
    credit: "Photo by Sortter on Unsplash",
    creditHref: "https://unsplash.com/@sortter",
  },
} as const;
