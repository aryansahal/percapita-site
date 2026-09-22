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

/**
 * The numbered points in the Who We Are column (Sept 2026 copy).
 *
 * NOTE: three of these overlap heavily with `VALUES` below, which still feeds
 * the 2x2 grid on the right of the same section. See OPEN-ITEMS.md.
 */
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
