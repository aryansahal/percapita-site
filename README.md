# Percapita Advisors — marketing site

Single-page marketing site for Percapita Advisors, an AMFI-registered
independent financial advisory and mutual fund distributor (ARN 142346).
Built from the design handoff in `../design_handoff_percapita_site`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npx eslint src   # lint
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

The handoff did not target an existing codebase and suggested "Next.js +
Tailwind is a reasonable default for a marketing site", so that is what this
is. Tailwind v4 has no `tailwind.config.js` — the theme lives in CSS.

## Layout of the code

```
src/app/globals.css    design tokens (@theme), shell/section utilities,
                       marquee keyframes, range-slider styling
src/app/layout.tsx     fonts + metadata
src/app/page.tsx       section composition, top to bottom
src/components/        one file per section, plus Photo and icons
src/lib/content.ts     all copy and content lists
src/lib/calculators.ts calculator maths, framework-free and unit-testable
src/lib/enquiry.ts     form shape, validation gate, submit stub
public/logos/          Percapita wordmark + 16 fund-house logos
```

Only `Calculators.tsx` and `ContactForm.tsx` are client components. Everything
else renders on the server.

## Design system notes

Colours are defined once as tokens in `globals.css` and referenced by name
(`bg-plum`, `text-violet`, `border-hair`). **Do not introduce new hues** — the
palette is derived from the logo's purple gradient. One-off sizes stay as
Tailwind arbitrary values (`text-[13.5px]`) because the design specifies exact
pixel values rather than a step scale.

Three conventions carry most of the visual weight:

- **`gap: 1px` over a tinted container** draws the hairline dividers between
  cards. There are no borders on the cards themselves.
- **No shadows anywhere.** Separation is hairlines and background tints only.
- **No media queries.** Layout responds through `clamp()` for type and spacing
  and `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` for grids. Verified at
  390 / 600 / 768 / 900 / 1280px with zero horizontal page overflow.

## Things that will bite you

Three pieces of CSS here look redundant and are not. All three were real bugs.

1. **The header nav must not use `justify-content: flex-end`.** With
   `overflow-x: auto`, flex-end pushes the overflow past the *start* edge where
   scrolling cannot reach it, and the links paint on top of the logo. The
   flexible spacer before the nav is what right-aligns it. This applies to the
   inline nav shown at 768px and up; below that the links live in `MobileNav`.

2. **The marquee band background must stay `#ffffff`.** The logo PNGs have
   opaque white backgrounds baked in. `mix-blend-mode: multiply` cannot drop
   them — the animated track and the masked wrapper each create an isolated
   group, so the blend resolves against transparency and does nothing. If
   transparent PNGs or SVGs arrive, any band colour becomes possible.

3. **The journey photo in "How We Work" needs `w-full`.** It has
   `aspect-ratio: 4/3` and `height: 100%` so it matches the panel beside it.
   Without a definite width, `aspect-ratio` derives the width *from* that
   stretched height and the photo overflows the page on narrow screens. This
   one was not in the handoff — the prototype has the same bug.

## Client Login

Client accounts live on a third-party transaction platform, not here. The
header and footer triggers open an in-page launcher that names the destination
and hands over; nothing on this site collects, proxies or frames a platform
credential, and it must stay that way. Destination lives in
`src/lib/clientLogin.ts`. See OPEN-ITEMS.md for the white-label subdomain
recommendation.

## One heading scale, one section rhythm

Adding the Sept 2026 copy drifted the type: three near-identical H2 clamps
across nine sections, five different eyebrow gaps, three section paddings, and
a section whose headline was a `<p>` so it had no heading at all.

Two utilities in `globals.css` now hold it: **`h2-display`** is the only
section-heading scale, and **`eyebrow-gap`** the only gap between an eyebrow
and its heading. Every full-width section uses **`section-y`**. Use them rather
than writing a new clamp; a one-off "just slightly bigger" heading is what
caused the drift.

Backgrounds alternate deliberately and no two adjacent sections share one:

```
white -> tint -> white -> photo -> dark -> tint -> white -> tint -> dark -> tint
```

How We Work is tinted for this reason alone. On white it sat directly against
the white Calculators band above it and the two read as one block.

## Who We Are is three bands, not one section

`WhoWeAre`, `SparkStory` and `Values` are separate full-width sections that
read as one area of the page. They started as a single two-column section and
it did not work: the left column ran out after four points while the right
carried a 250-word story plus a value grid, so the section hit ~1,400px with a
large void down one side.

Two things keep the current version in proportion, and undoing either brings
the problem back:

- **`SparkStory` is two columns.** Headline, question and tagline sit left;
  the narrative runs beside them. Set as a single centred measure the band
  alone was 1,007px; as two columns it is 673px.
- **`WhoWeAre` points are unboxed columns.** The How We Work stages further
  down are bordered cards on a hairline grid. Giving these the same treatment
  made the two sections read as the same component twice.

## Services is an infinite rail

The set is rendered twice and the scroll position wraps at the halfway mark,
so the rail has no start or end and needs no arrows. It advances on its own at
34px/s, about 62 seconds per loop.

Motion and readability pull against each other here. The logo marquee gets
away with it because a logo is recognised at a glance; each service card
carries around forty-five words. Three things resolve that and removing any of
them breaks the section:

- **it pauses on hover and on focus**, so a card holds still exactly when
  someone is reading it;
- **it pauses while being dragged or scrolled**, then resumes;
- **there is an explicit pause button.** Auto-moving content lasting over five
  seconds needs a mechanism to stop it (WCAG 2.2.2), and hover serves neither
  keyboard nor touch.

Two implementation details are load-bearing:

- **The position is accumulated in a local, not read back from `scrollLeft`.**
  `scrollLeft` rounds to whole pixels, so `scrollLeft += 0.57` discards the
  fraction every frame and the rail creeps at 1px/frame - 60px/s regardless of
  the speed asked for, and faster still on a 120Hz screen.
- **Every card carries `border-r`, including the last.** The track has to be
  exactly periodic or the wrap jumps by the width of one border.

Scrolling stays native `overflow-x`, so the rail is usable with JavaScript
off; it just does not advance by itself.

## The NAV band

The scrolling band below the hero shows current NAVs for one flagship scheme
per fund house, from AMFI's published feed
(`amfiindia.com/spages/NAVAll.txt`). Fetched server-side and revalidated
hourly; AMFI publishes once a day.

Two things about it are load-bearing:

- **Regular Plan, Growth only.** Percapita distributes Regular Plans (see the
  footer disclosure), so showing Direct plan NAVs would misrepresent what a
  client actually buys. `isRegularGrowth()` in `src/lib/nav.ts` enforces it.
- **It renders nothing if AMFI is unreachable**, and the page closes up. It
  must not fall back to `LogoMarquee`: that is a separate band already on the
  page above the footer, and falling back would render it twice.

The feed is not internally consistent: Plan and Option are blank on ~5,700 of
~14,400 rows (those carry both inside the scheme name), and Option appears as
`Growth`, `Growth Option`, `GROWTH OPTION` and `Regular Growth` depending on
the house. The parser tolerates all of these. Schemes are keyed by AMFI scheme
code rather than name, because names keep changing — several "Bluechip" funds
became "Large Cap" in recent SEBI-driven renames.

## SEO and local search

Everything derives from `SITE_URL` in `src/lib/seo.ts`, so a domain change is
one edit (or `NEXT_PUBLIC_SITE_URL` at build time). **Confirm that domain
before launch** - a wrong canonical is worse than none, because it tells search
engines the real pages are elsewhere.

`structuredData()` emits one `@graph` covering:

- a parent `FinancialService` carrying the ARN as a `PropertyValue`
  identifier, an offer catalogue built from `SERVICES`, and `knowsAbout`;
- **one node per office**, each with a full postal address, linked from the
  parent as a department. This is the local-search half: it is what lets the
  site rank for "financial advisor in Malad" rather than only for its own name;
- a `FAQPage` built from `FAQS`. Worth keeping accurate - it is what both rich
  results and generative answer engines quote from, and the fee and commission
  answers are the ones people actually search.

The graph is generated from the same constants the page renders, so the markup
cannot drift from what a visitor reads. Add a service or an FAQ and the
structured data follows automatically.

Deliberately omitted: geo coordinates, opening hours, price range. None are
stated anywhere on the site and inventing them is worse than leaving them out.

`lang` is `en-IN`, not `en`. The share card is generated at build by
`opengraph-image.tsx` - typographic rather than a photo crop, because it is
rendered at thumbnail size in feeds where a group photo turns to mush.

## Legal copy

The footer disclaimer and the "Regular Plans only" paragraph are
client-supplied and must be reproduced verbatim. The advisory-only footnotes
under *What We Do* and *Services*, and the assumption notes under each
calculator result, are part of the design rather than decoration — keep them
attached to what they qualify.

Calculator output is illustrative. The 80C figures are an old-regime
illustration including 4% cess and excluding surcharge.

## Before this goes live

See [OPEN-ITEMS.md](OPEN-ITEMS.md). The form does not submit anywhere yet and
the photography is not licensed for production.
