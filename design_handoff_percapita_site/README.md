# Handoff: Percapita Advisors — Marketing Site (Home)

## Overview
A single-page marketing site for **Percapita Advisors**, an AMFI-registered independent financial advisory and mutual fund distributor based in Mumbai and Pune (ARN 142346, independent since 2015). The page introduces the firm, explains its integrated financial planning and investment advisory service, lists product services (mutual funds, fixed deposits, general insurance), provides four interactive wealth calculators, explains the four-stage planning process, and captures leads via a consultation form plus direct WhatsApp/email contact.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior, **not production code to copy directly**. The task is to **recreate these designs in the target codebase's existing environment** (React, Next.js, Vue, etc.) using its established patterns, component library, and styling approach. If no environment exists yet, choose the most appropriate framework (Next.js + Tailwind is a reasonable default for a marketing site) and implement there.

Two implementation notes about the prototype specifically:
- All styling is **inline** on elements (a constraint of the prototyping environment). In production, move these to the codebase's normal styling layer — CSS modules, Tailwind classes, styled-components, etc.
- Layout is responsive **without media queries**, using `clamp()` for type/spacing and `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` for grids. This is intentional and works well, but feel free to replace it with the codebase's standard breakpoint system if that is more idiomatic — just preserve the collapse behavior described below.

## Fidelity
**High fidelity.** Colors, typography, spacing, copy, and interactions are final. Recreate pixel-for-pixel using the codebase's libraries. The only deliberately unresolved items are listed under *Open Items* at the end.

---

## Page Structure

The page is one continuous scroll. Sections in order:

1. Sticky header
2. Hero
3. Fund-house logo marquee
4. Positioning statement band (dark)
5. Who We Are
6. Full-bleed quote image band
7. What We Do (dark)
8. Services
9. Calculators
10. How We Work (process + initial consultation)
11. Get in Touch (dark, with form)
12. Footer (dark)

All content sections are constrained to `max-width: 1200px`, horizontally centered, with horizontal padding `clamp(20px, 4vw, 32px)` and vertical padding `clamp(56px, 7vw, 96px)` unless noted.

---

## Screens / Views

### 1. Header (sticky)

- **Purpose**: Persistent navigation and the Client Login entry point.
- **Layout**: `position: sticky; top: 0; z-index: 50`. Background `#ffffff`, bottom border `1px solid #EBE4F2`. Inner row: `max-width: 1200px`, fixed `height: 76px`, `display: flex; flex-wrap: nowrap; align-items: center; justify-content: space-between; gap: 16px`.
- **Components**:
  - **Logo** — `logos/percapita-mark.png`, `width: clamp(118px, 15vw, 168px)`, `height: auto`, `flex: none`.
  - **Spacer** — an empty `<div style="flex:1 1 auto; min-width:0">` between the logo and the nav. This is what right-aligns the nav; an `auto` margin on the nav did not hold once the nav itself was a shrinkable scroll container.
  - **Nav** — `display: flex; flex-wrap: nowrap; gap: clamp(18px,2.4vw,30px); flex: 0 1 auto; min-width: 0; overflow-x: auto; white-space: nowrap; scrollbar-width: none`. Links: 13.5px / weight 500 / `#463F4E`, each `flex: none`.
    ⚠️ **Do not use `justify-content: flex-end` here.** With `overflow-x: auto`, flex-end pushes overflow past the *start* edge, which is unreachable by scrolling and causes links to paint on top of the logo. Use `margin-left: auto` on the nav instead. (This was a real bug found in review.)
    Items: Who We Are (`#who-we-are`), What We Do (`#what-we-do`), Services (`#services`), Calculators (`#calculators`), Contact Us (`#contact`).
  - **Client Login button** — `flex: none`, background `#4B2478`, text `#ffffff` 13px/600, padding `12px 22px`, radius `2px`, `white-space: nowrap`. Hover: background `#5E2F94`.
- **Responsive**: header must stay **one 76px row at every width**; the nav scrolls horizontally instead of wrapping. Consider replacing with a hamburger/drawer below ~768px in production — that is the nicer answer, the scroll is the minimum correct one.

### 2. Hero

- **Layout**: `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 330px), 1fr)); gap: clamp(36px, 5vw, 64px); align-items: center; padding: 76px 0 64px`.
- **Left column**:
  - Eyebrow: `Independent Financial Advisory · Since 2015`, 11px/700, letter-spacing `.18em`, uppercase, `#8B5CC7`. **Text only — no decorative rule or dash before it.** Every section eyebrow follows this pattern.
  - H1: `Tailored Financial Planning & Investment Solutions.` — `font-size: clamp(32px, 5.2vw, 52px)`, line-height 1.1, weight 700, letter-spacing `-0.032em`, `#2E1547`, `text-wrap: balance`. The word "Investment" is `#7B4CB8`.
  - Body: 15.5px / line-height 1.75 / `#5C5465`, `max-width: 470px`.
    > We provide clear, research driven financial planning and advisory services, designed to help clients make informed decisions about their financial future. Our approach is collaborative, professional, and focused on long term value.
  - Buttons: primary "Get in Touch" (`#4B2478` bg, white, 13.5px/600, padding `15px 26px`, radius 2px, hover `#5E2F94`); secondary "What We Do" (`1px solid #D8CCE5`, text `#4B2478`, hover border `#4B2478`).
  - Stat row: 3 columns, top border `1px solid #EBE4F2`, `padding-top: 34px`. Values 30px/700 `#2E1547` with a `#8B5CC7` accent fragment; labels 12px/500 `#7A7383`. **Current values (2015 / 16+ Fund Houses Accessed / One fee) are placeholders invented during design — confirm with the client before shipping.**
- **Right column**: image, `aspect-ratio: 4/5`, `max-height: 640px`, `min-height: 380px`, `width: 100%`, `align-self: center`, object-fit cover. The hero grid uses `align-items: stretch` with the left column `justify-content: center`, so the copy centres against the photo instead of both columns floating in whitespace. Overlaid card at `left: 24px; bottom: 26px; max-width: 290px`, background `#F6F1FB`, padding `18px 20px`: label "AMFI Registered Mutual Fund Distributor" (10px/700, `.16em`, uppercase, `#8B5CC7`) + body 13px/1.55 `#332B3C`.

### 3. Fund-house logo marquee

- **Purpose**: signal whole-of-market access.
- **Layout**: Full-width band, background **`#ffffff`** (must match the logo PNGs' baked-in white background — see note), top/bottom border `1px solid #EBE4F2`, `overflow: hidden`.
- Label row: `Broad market access across leading fund houses`, 10.5px/700, `.18em`, uppercase, `#9A93A4`.
- Mask wrapper: `padding: 14px 0 26px`, `mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)` (plus `-webkit-mask-image`).
- Track: `display: flex; align-items: center; gap: 64px; width: max-content; animation: pc-marquee 48s linear infinite`.
  ```css
  @keyframes pc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  ```
  The 16 logos are rendered **twice in the same order** so the `-50%` translate loops seamlessly.
- Each logo: `height: 38px; width: auto; flex: none; object-fit: contain; opacity: .72; filter: saturate(.25)`.
- ⚠️ **Do not use `mix-blend-mode: multiply` to drop the logos' white backgrounds.** The animated track (transform) and the masked wrapper each create an isolated group, so the blend resolves against transparency and does nothing. Matching the band background to `#ffffff` is the working fix. If you later get transparent-PNG or SVG logos, you can use any band color.
- Order used: SBI, Kotak, Nippon India, PGIM, Bandhan, Motilal Oswal, PPFAS, Aditya Birla Capital, Mirae Asset, Canara Robeco, HDFC, Invesco, ICICI Prudential, Edelweiss, Baroda BNP Paribas, DSP.

### 4. Positioning band

Background `#2E1547`. Single paragraph, `max-width: 900px`, `font-size: clamp(16px, 1.9vw, 19px)`, line-height 1.65, weight 500, `#EFE7F7`:
> Percapita offers independent financial guidance with the professionalism and standards you expect from experienced advisors. We prioritize transparency, security, and personalized support to help you navigate your financial journey responsibly.

### 5. Who We Are (`#who-we-are`)

- Two-column auto-fit grid, gap `clamp(40px, 5vw, 72px)`.
- **Left**: eyebrow "Who We Are"; H2 `Helping clients plan, manage, and protect their finances with clarity and confidence.` (`clamp(25px, 3.3vw, 33px)`, 700, `-0.025em`, `#2E1547`); two body paragraphs 14.5px/1.85 `#5C5465`; primary button "Start a Conversation".
- **Right**:
  - Card, background `#F6F1FB`, padding `clamp(26px,3.5vw,34px) clamp(22px,3vw,36px)`. Label "Our Background" + two paragraphs 14.5px/1.8 `#463F4E`.
  - Below it, a **2×2 values grid**: `repeat(auto-fit, minmax(min(100%,250px), 1fr))`, `gap: 1px`, container background `#EBE4F2` (so the 1px gap reads as hairline dividers), each cell background `#ffffff`, padding `26px 24px`. Titles 12.5px/700 `#2E1547`; body 13px/1.7 `#6A6374`. Four values: Integrity and Transparency / Professional Excellence / Solution Oriented / Clear Fee Structure. (Four, not three — three leaves a visibly empty fourth cell.)

### 6. Quote band

- Full-width image, `aspect-ratio: 16/6`, `min-height: 300px`.
- Overlay: `linear-gradient(90deg, rgba(28,10,45,0.9) 0%, rgba(28,10,45,0.74) 42%, rgba(28,10,45,0.15) 100%)`, `pointer-events: none`.
- Text block: absolutely positioned, `left/right: clamp(20px, 4vw, 52px)`, vertically centered, `max-width: 580px`. Eyebrow "Our Commitment" (10.5px/700, `.18em`, `#C3A0E4`); quote `clamp(16px, 2.1vw, 22px)`, line-height 1.5, weight 600, `#ffffff`:
  > "There are times when objective guidance is essential. That's why we prioritise transparent, enduring relationships with our clients."

### 7. What We Do (`#what-we-do`)

- Background `#1F0E33`, white text.
- Eyebrow "What We Do" (`#C3A0E4`); H2 `Unified financial planning and investment advisory.` (`clamp(27px, 3.8vw, 38px)`); intro paragraph `max-width: 620px`, 14.5px/1.8, `#B9A9CB`.
- Two columns (`repeat(auto-fit, minmax(min(100%,300px), 1fr))`, gap `clamp(36px,5vw,64px)`), each with a header (11px/700, `.16em`, uppercase, `#C3A0E4`, `padding-bottom: 16px`, `border-bottom: 1px solid rgba(255,255,255,0.18)`) and a list of rows (`display: flex; gap: 12px`, a `◆` bullet in `#C3A0E4`, text 13.5px/1.6 `#DCD2E8`).
  - **Financial Planning Expertise**: Cash flow and liquidity planning / Tax efficiency and asset structuring / Capital gains and income tax guidance / Retirement and pension planning / Legacy and succession planning / Diversification and portfolio alignment / Risk assessment and contingency planning.
  - **Investment Advisory Strategy**: Portfolio design aligned with your risk profile and objectives / Access to diverse investment opportunities / Research driven recommendations / Ongoing monitoring and rebalancing / Tax efficient portfolio construction / ESG considerations with emphasis on governance / Diversification across asset classes and regions.
- Legal footnote, 11px/1.85, `#8B7CA0`, `max-width: 1000px`: "Percapita provides advisory services only. We do not guarantee financial outcomes…"

### 8. Services (`#services`)

- Background `#F6F1FB`. Eyebrow "Services"; H2 `Investments, deposits, and protection.`
- 3-up card grid: `repeat(auto-fit, minmax(min(100%,250px), 1fr))`, `gap: 1px`, container background `#E6DCF0`, cards `#ffffff`, padding `clamp(28px,3.5vw,36px) clamp(22px,3vw,32px)`.
  - Card label: 11px/700, `.16em`, uppercase, `#8B5CC7`. Body 14px/1.8 `#5C5465`. Detail list separated by `border-top: 1px solid #EBE4F2`, 13px/1.65 `#463F4E`, with bolded lead-ins in `#2E1547`.
  - Cards: **Mutual Funds** (Professional Management / Transparency and Regulation / Diversification), **Fixed Deposits** (with a "Where FDs Are Offered" bullet list: Banks, Financial institutions, Housing finance companies, Certain corporates offering deposit schemes), **General Insurance** (Transparency and Regulation / Suitability First).
- Footnote below grid, 11px/1.8 `#8A8394`, about reviewing institution credibility and credit ratings for FDs.

### 9. Calculators (`#calculators`)

- Background `#ffffff`. Eyebrow "Calculators"; H2 `Run the numbers on your future.`
- **Tab bar**: `display: flex; flex-wrap: wrap; gap: 16px 30px`, `border-bottom: 1px solid #E6DCF0`. Tabs are buttons, 11.5px/700, `.14em`, uppercase, `padding: 0 0 14px`, `margin-bottom: -1px`. Active: `#2E1547` + `border-bottom: 2px solid #4B2478`. Inactive: `#9A93A4` + transparent bottom border.
- **Body**: 2-col grid `repeat(auto-fit, minmax(min(100%,320px), 1fr))`, gap `clamp(36px,5vw,56px)`, `align-items: start`.
  - **Left — inputs** (`display: flex; flex-direction: column; gap: 30px`). Each field: label 10.5px/700 `.14em` uppercase `#8A8394`; formatted value 23px/700 `#2E1547`; a range slider; min/max hint row 10.5px `#A39CAD`.
    Slider styling: track `height: 2px`, background `#DCD1E8`, radius 2px; thumb 14px circle `#4B2478` (style both `::-webkit-slider-thumb` and `::-moz-range-thumb`, with `-webkit-appearance: none` on the input).
  - **Right — result panel**: background `#2E1547`, white text, padding `clamp(28px,3.5vw,36px) clamp(22px,3vw,34px) 30px`. Result label 10.5px/700 uppercase `#B9A9CB`; headline value `clamp(32px, 4.4vw, 44px)`/700/`-0.035em`; three breakdown rows (`justify-content: space-between`, `padding: 13px 0`, `border-bottom: 1px solid rgba(255,255,255,0.14)`, label `#B9A9CB`, value weight 600); assumption note 10.5px/1.7 `#9585AB`; CTA button full width, background `#C3A0E4`, text `#2E1547` 13px/700, hover `#D4B8EE`.

  **Calculator logic** (all in INR; format ≥1e7 as `₹X.XX Cr`, ≥1e5 as `₹X.XX L`, else `en-IN` grouped):

  | Tab | Inputs (min–max, step, default) | Output |
  |---|---|---|
  | **SIP Returns** | Monthly SIP 1,000–5,00,000 step 1,000 (25,000); Return 4–20% step 0.5 (12); Tenure 1–40 yrs (15) | `FV = P × ((1+i)^n − 1)/i × (1+i)` where `i = rate/1200`, `n = years×12`. Rows: Amount Invested (`P×n`), Estimated Returns (`FV − invested`), Wealth Multiple (`FV/invested`, 1dp, "×") |
  | **Wealth Goal** | Target 5,00,000–25,00,00,000 step 5,00,000 (1,00,00,000); Return 4–20% (12); Years 1–40 (10) | Required monthly SIP = `target / (((1+i)^n − 1)/i × (1+i))`. Rows: Target Corpus, Total Invested (`sip×n`), Lump Sum Alternative (`target / (1+rate/100)^years`) |
  | **Tax Savings (80C)** | Income 3,00,000–1,00,00,000 step 50,000 (18,00,000); 80C investment 0–1,50,000 step 5,000 (1,50,000) | Eligible = `min(invested, 150000)`. Slab (old regime): >15L→30%, >12L→20%, >9L→15%, >6L→10%, >3L→5%, else 0. Saved = `eligible × slab × 1.04` (4% cess). Rows: Eligible 80C Deduction, Marginal Slab Rate, Unused 80C Headroom |
  | **Retirement Corpus** | Current age 22–60 (36); Retirement age 45–75 (60); Monthly expense 20,000–10,00,000 step 5,000 (1,50,000) | Assumptions: inflation 6%, post-retirement return 8%, pre-retirement return 12%, 20-year retirement. `futureMonthly = expense × 1.06^yrs`; `real = 1.08/1.06 − 1`; `corpus = futureMonthly × 12 × (1 − (1+real)^-20)/real`; required SIP from the corpus at 12%. Rows: Years to Retirement, Inflation Adjusted Monthly Spend, Monthly SIP Needed Today |

  **The retirement assumptions were chosen during design and are not client-confirmed.** Verify before launch.

### 10. How We Work (`#process`)

- Centered header: eyebrow "How We Work"; H2 `Our financial planning process.`; intro `max-width: 640px`.
- Stage grid: `repeat(auto-fit, minmax(min(100%,215px), 1fr))`, `gap: 1px`, container background `#EBE4F2`, cards `#ffffff` padding `26px 24px 30px`. Each: "Stage 0N" (11px/600, `.12em`, `#8B5CC7`, `padding-bottom: 14px`, `border-bottom: 1px solid #8B5CC7`), title 16px/700 `#2E1547`, body 13.5px/1.72 `#63596F`.
  1. Discovery Meeting — an introduction to the planning process and its long term value.
  2. Understanding Your Goals — we take time to understand your personal and financial goals.
  3. Initial Discussion — how Percapita can support your journey, and whether we are the right fit.
  4. Strategy and Review — strategy development and ongoing review as circumstances and markets evolve.
- Below: 2-col auto-fit grid, `gap: 0`. Left = image `aspect-ratio: 4/3`, `height: 100%`, `min-height: 320px` (so it matches the panel beside it rather than leaving a gap under itself). Right = `#F6F1FB` panel, padding `clamp(34px,4.5vw,56px) clamp(26px,4vw,52px)`, vertically centered, eyebrow "Your Initial Consultation" + two paragraphs 15px/1.85 `#463F4E`.

### 11. Get in Touch (`#contact`)

- **Background**: `#1F0E33` with an absolutely-positioned overlay layer: `radial-gradient(1100px 460px at 80% 6%, rgba(139,92,199,0.45), transparent 70%), linear-gradient(180deg, #331B50 0%, #1B0C2C 100%)`. Content sits in a `position: relative` layer above it.
- **Left column**:
  - Eyebrow "Get in Touch"; H2 `Start with a no obligation conversation.`; intro 14.5px/1.8 `#BCACCE`, `max-width: 480px`.
  - Two contact cards, `repeat(auto-fit, minmax(min(100%,230px), 1fr))`, gap 14px, padding `18px 20px`:
    - **WhatsApp** → `https://wa.me/919920666628`. Background `rgba(37,211,102,0.12)`, border `1px solid rgba(37,211,102,0.42)`, WhatsApp glyph filled `#25D366`. Hover background `rgba(37,211,102,0.2)`. Label "WhatsApp" / value "9920 6666 28".
    - **Email** → `mailto:contact@percapita.in`. Background `rgba(195,160,228,0.12)`, border `rgba(195,160,228,0.42)`, envelope icon stroked `#C3A0E4`. Label "Email" / value "contact@percapita.in".
  - Office block, top border `1px solid rgba(255,255,255,0.14)`, 2 columns:
    - **Mumbai** — 75, Regal, Rustomjee Adarsh, Malad West, Mumbai 400064
    - **Pune** — C 01, Wing A, 7th Floor, City Vista, Kharadi, Pune 411014 *(by appointment)*
- **Right column — consultation form**: white card, `#2E1547` text, padding `clamp(26px,3.5vw,38px) clamp(22px,3vw,36px)`.
  - Title "Request a consultation" 19px/700; subcopy 13px/1.7 `#6A6374`.
  - Fields (`gap: 18px`): Full Name (text); Email + Phone side by side (`repeat(auto-fit, minmax(min(100%,230px), 1fr))`); topic chips; Message (textarea, 3 rows, `resize: vertical`).
  - Input style: full width, `box-sizing: border-box`, 14px, `#2E1547` on `#ffffff`, `1px solid #DCD1E8`, radius 2px, padding `13px 14px`, `outline: none`; focus border `#7B4CB8`.
  - Field labels: 10px/700, `.16em`, uppercase, `#8A8394`, `margin-bottom: 7px`, block.
  - **Topic chips** (single select, default "Financial Planning"): Financial Planning, Investment Advisory, Mutual Funds, Retirement, Insurance. 12px/600, padding `9px 14px`, `border-radius: 999px`. Selected: background `#4B2478`, border `#4B2478`, text white. Unselected: white bg, `1px solid #DCD1E8`, text `#5C5465`.
  - **Submit**: 13.5px/700, padding `16px 22px`, radius 2px. Enabled (`#4B2478` bg, white text, pointer cursor) only when name length > 1 **and** email matches `/\S+@\S+\.\S+/`; otherwise background `#EFE8F6`, text `#A39CAD`, `cursor: not-allowed`, and the label reads "Add your name and email" instead of "Request a Consultation".
  - Fine print 11px/1.7 `#8A8394` about being contacted and advisory-only services.
  - **Success state** replaces the form: check-circle icon (40px, stroke `#7B4CB8`), "Thank you, {firstName}." 20px/700, body 14px/1.75 `#5C5465`, and a "Send another enquiry" outline button that resets the form.
  - ⚠️ The prototype's submit is **client-side only** — it sets local state and shows the thank-you panel. Wire it to the real endpoint / CRM in production, with server-side validation, spam protection, and a genuine error state (not designed yet).

### 12. Footer

- Background `#160823`, white text. Top grid: `repeat(auto-fit, minmax(min(100%,190px), 1fr))`, gap `clamp(32px,4vw,48px)`, padding `clamp(48px,6vw,72px) clamp(20px,4vw,32px) 40px`.
  - **Brand column**: logo on a white plate (`width: 186px`, `background: #ffffff`, `padding: 14px 18px` — the asset has a baked-in white background, so the plate is intentional); tagline 13px/1.75 `#9287A0`; registration block 12px/1.7 — "ARN 142346" in `#D8CFE2` bold, then "Initial Date : 20/01/2015", "Valid till : 01/04/2027".
  - **Services** column: Mutual Funds, Fixed Deposits, General Insurance, Financial Planning, Investment Advisory.
  - **Company** column: Who We Are, What We Do (via anchors), Calculator, Policy, Contact Us.
  - **Get In Touch** column: icon links for email (`mailto:`), WhatsApp (`wa.me`), Client Login; then a "Mobile App" sub-block with **App Store** and **Google Play** buttons (`1px solid rgba(255,255,255,0.22)`, radius 6px, padding `8px 14px`, two-line label: 8.5px uppercase `#9287A0` over 13px/700 white; hover border `#C3A0E4`). **Both currently point to `#contact` — real store URLs needed.**
  - Footer link color `#D8CFE2`, hover `#C3A0E4`.
- **Disclaimer block** (top border `rgba(255,255,255,0.1)`), two paragraphs 11.5px/1.85 `#8E8399`. This copy is **client-supplied and must be reproduced verbatim**:
  1. "Disclaimer : Investments in Mutual Funds are subject to market risks. Please read all scheme-related documents carefully before investing. Mutual Fund schemes do not assure or guarantee returns, and past performance may or may not be sustained in the future. There is no certainty that the investment objective of any suggested scheme will be achieved. Investors are advised to review exit loads, total expense ratios (TER), and other applicable costs before making any investment decisions."
  2. "Percapita deals in **Regular Plans only** for Mutual Fund schemes and earns a trailing commission on client investments. Disclosure of commission earnings is provided to clients at the time of investment. Check your Securities /MF/ Bonds in the consolidated account statement issued by NSDL/CDSL every month."
- Bottom bar (top border `rgba(255,255,255,0.1)`, padding `20px`, 11px `#7E7389`): "Copyright © Percapita Services. All rights reserved." and "AMFI Registered Mutual Fund Distributor · ARN 142346".

---

## Interactions & Behavior

- **Navigation**: in-page anchor links only. Because the header is sticky at 76px, apply `scroll-margin-top: 92px` to each section target so headings are not hidden under it. (The prototype does not do this — please add it.)
- **Hover states**: every link and button has one; see per-component specs above. Transitions are not specified — a `150ms ease` on `background-color` / `border-color` / `color` is appropriate.
- **Marquee**: 48s linear infinite, never pauses. Consider pausing on hover and honoring `prefers-reduced-motion: reduce` in production — neither is in the prototype.
- **Calculators**: fully live. Every slider recomputes on `change`; switching tabs preserves each calculator's own values independently.
- **Form**: live validation gates the submit button; submission swaps the card to the success panel; "Send another enquiry" clears all fields back to defaults.
- **Responsive**: no media queries. Grids collapse via `auto-fit` + `minmax(min(100%, Npx), 1fr)`; type and padding scale with `clamp()`. Verified at 390px, 600px, 768px, 900px and desktop with zero horizontal overflow. The header stays one row at all widths (nav scrolls).

## State Management

Component-local state only — no data fetching in the prototype.

```
tab: string | null                  // active calculator; falls back to "SIP Returns"
sip:  { amount, rate, years }
goal: { target, rate, years }
tax:  { income, invested }
ret:  { age, retireAge, expense }
form: { name, email, phone, topic, message }
sent: string | null                 // first name once submitted; drives the success panel
```

Derived per render: `valid` (form gate), `topics` (chips with selected styling), and the active calculator's inputs + results.

In production the form needs a real async submit: `idle → submitting → success | error`.

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| Aubergine (deepest) | `#160823` | Footer background |
| Aubergine dark | `#1B0C2C` | Contact gradient end |
| Plum dark | `#1F0E33` | What We Do / Contact base |
| Plum | `#2E1547` | Headings, dark panels, positioning band |
| Plum mid | `#331B50` | Contact gradient start |
| Purple primary | `#4B2478` | Primary buttons, active tab underline, slider thumb |
| Purple hover | `#5E2F94` | Primary button hover |
| Purple accent | `#7B4CB8` | Hero accent word, input focus, success icon |
| Violet | `#8B5CC7` | Eyebrows, bullets, stat accents (on light) |
| Lilac | `#C3A0E4` | Eyebrows, bullets, CTAs (on dark) |
| Lilac light | `#D4B8EE` | Lilac CTA hover |
| Lilac tint | `#E8D8F5` / `#B48BD9` | Play-store glyph only |
| Surface tint | `#F6F1FB` | Light section + card backgrounds |
| Surface tint 2 | `#FBF8FE` | Alternating rows |
| Border light | `#EBE4F2` | Hairlines on white |
| Border tint | `#E6DCF0` / `#DCD1E8` / `#D8CCE5` | Card dividers, inputs, secondary button |
| Ink | `#1D1B20` | Body base |
| Ink 2 | `#463F4E` | Nav links, body on tint |
| Ink 3 | `#5C5465` | Body copy |
| Ink 4 | `#63596F` / `#6A6374` | Secondary body |
| Muted | `#8A8394` / `#9A93A4` / `#A39CAD` | Labels, hints |
| On-dark body | `#DCD2E8` / `#BCACCE` / `#B9A9CB` | Body on dark |
| On-dark muted | `#9C8CB2` / `#9287A0` / `#8E8399` / `#7E7389` | Labels on dark |
| On-dark link | `#D8CFE2` | Footer links |
| WhatsApp green | `#25D366` (ink `#0B2B16`) | WhatsApp affordances only |

Source: the Percapita logo's purple gradient. Do not introduce new hues.

### Typography
- **Family**: Plus Jakarta Sans (Google Fonts), weights 400/500/600/700/800. Fallback `system-ui, sans-serif`. `-webkit-font-smoothing: antialiased` on body.
- **Scale**: H1 `clamp(32px, 5.2vw, 52px)` /1.1 /700 /`-0.032em`; H2 large `clamp(27px, 3.8vw, 38px)` /1.2 /700 /`-0.03em`; H2 small `clamp(25px, 3.3vw, 33px)` /1.24 /700 /`-0.025em`; stat 30px/700; result value `clamp(32px, 4.4vw, 44px)` /700 /`-0.035em`; pull quote `clamp(16px, 2.1vw, 22px)` /1.5 /600; lead 15.5px/1.75; body 14.5px/1.8–1.85; small body 13.5px/1.7; caption 13px/1.7; eyebrow 11px/700 uppercase `.18em`; field label 10px–10.5px/700 uppercase `.14em–.16em`; legal 11px–11.5px/1.85.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

### Spacing & shape
- Section padding `clamp(56px, 7vw, 96px)` vertical / `clamp(20px, 4vw, 32px)` horizontal; content `max-width: 1200px`.
- Grid gaps `clamp(36px–40px, 5vw, 64px–72px)`; card grids use `gap: 1px` over a tinted container to draw hairlines.
- Radii: **2px** on buttons and inputs, **6px** on store buttons, **999px** on topic chips, **0** on cards and panels. The design is deliberately square.
- No shadows anywhere. Separation is done with hairlines and background tints.

## Assets

Included in `logos/`:
- `percapita-mark.png` — the Percapita wordmark, whitespace-cropped from the supplied JPEG. **Opaque white background** — size by `width`, not `height`, and place on white or an intentional white plate. A transparent-background SVG from the client would be better for production.
- `1.png`–`16.png` — 16 AMC/fund-house logos supplied by the client: 1 DSP, 2 Edelweiss, 3 Baroda BNP Paribas, 4 Canara Robeco, 5 HDFC, 6 ICICI Prudential, 7 Invesco, 8 SBI, 9 Kotak Mahindra, 10 Mirae Asset, 11 Aditya Birla Capital, 12 Motilal Oswal, 13 PPFAS, 14 Nippon India, 15 PGIM India, 16 Bandhan. All have baked-in white backgrounds. These are third-party trademarks used to indicate distribution relationships — confirm usage rights before launch.

Photography — **placeholders, not licensed for production.** Three Unsplash images are hotlinked with attribution; replace with the client's own or properly licensed photography:
- Hero (portrait 4:5) — Ratul Puri / Unsplash (`photo-1742981365880-698cfb84492d`, face-cropped); quote band (16:6) — Vitaly Gariev / Unsplash
- Process/journey (4:3) — Sortter / Unsplash

Icons are inline SVG (envelope, WhatsApp, user, Apple, Play, check-circle). Replace with the codebase's icon set where equivalents exist.

## Files

- `PerCapita Advisors.dc.html` — the full design. Open directly in a browser. Markup and logic live in the file; the logic class holds the calculator math and form state.
- `image-slot.js` — the prototyping environment's drag-and-drop image placeholder component. **Not needed in production** — replace each `<image-slot>` with a normal `<img>` / `next/image` pointing at the final asset. Note the `src`, `credit`, and `credit-href` attributes on each slot for the current placeholder photos.
- `logos/` — all image assets described above.
- `screenshots/01-page.png` … `06-page.png` — sequential desktop captures of the full page, top to bottom, for visual reference.

## Open Items (confirm with the client before launch)

1. Hero stat row values — currently invented placeholders.
0. Photo credit lines are rendered because the placeholders are Unsplash-licensed; they disappear once real client photography is dropped in.
2. Retirement calculator assumptions (6% inflation, 8% post-retirement, 12% pre-retirement, 20-year retirement).
3. Real App Store and Google Play URLs.
4. Form submission endpoint, plus an error state design.
5. Licensed photography to replace the three Unsplash placeholders.
6. A transparent-background (ideally SVG) Percapita logo.
7. Trademark clearance for the 16 fund-house logos.
8. Whether to collapse the nav behind a menu control on mobile rather than horizontal scroll.
