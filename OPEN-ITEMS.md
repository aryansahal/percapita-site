# Open items

Carried over from the design handoff, plus what surfaced during the build.
Nothing here is blocked on engineering — each needs a decision or an asset.

## Blocking launch

| # | Item | Where | Needs |
|---|------|-------|-------|
| 1 | **Form goes nowhere.** `submitEnquiry()` resolves locally and shows the thank-you panel. | `src/lib/enquiry.ts` | Endpoint or CRM, server-side validation, spam protection. The client-side check is a UX gate, not a security boundary. |
| 2 | **Error state undesigned.** There is a plain text fallback in existing tokens. | `ContactForm.tsx` | Design sign-off. |
| 3 | **Photography is unlicensed.** Three Unsplash placeholders, hotlinked, with credit chips. | `src/lib/content.ts` → `PHOTOS` | Licensed or client photography. Drop them in `public/`, remove the `remotePatterns` block in `next.config.ts`, and pass `credit={null}` — the credit chips disappear with the placeholders. |
| 4 | **Fund-house logos are third-party trademarks.** 16 AMC marks used to indicate distribution relationships. | `public/logos/` | Trademark clearance. |
| 5 | **App Store and Google Play links point at `#contact`.** | `SiteFooter.tsx` | Real store URLs, or drop the block. |
| 5b | **Client Login has no destination.** Until one is set, the launcher shows a "not live yet" panel with contact details rather than a link to nowhere. | `src/lib/clientLogin.ts` | The sign-in URL — ideally a white-label subdomain, see below. |

### Client Login: ask the platform vendor for a white-label subdomain

Client accounts live on a third-party transaction platform, so Percapita must
never render a password field for it, proxy a sign-in, or iframe the vendor's
login page. Collecting someone else's credentials is credential interception
however well intentioned — it breaks the vendor's terms, defeats password
managers (which key on origin), stops clients verifying the TLS certificate,
and makes Percapita liable for passwords it has no reason to hold.

The way to genuinely keep clients on `percapita.in` is a **white-label
subdomain**: ask the vendor to serve their login at `invest.percapita.in` via
CNAME, with a certificate on your domain and your branding. Same look, honest
URL, and they still handle every credential. Most vendors support this — ask
before launch, because retrofitting it changes the URL clients have bookmarked.

Until then the in-page launcher keeps clients in context and names the
destination before handing over. Set `CLIENT_LOGIN.url` and it switches on.

**Compliance check before launch.** The principles that clearly bear on this
are SEBI's cybersecurity and cyber-resilience expectations, AMFI's rules on
MFD digital platforms and ARN disclosure, the MFD-versus-advice boundary
(already reflected in the site copy), and the DPDP Act for personal data. The
specific obligations should be confirmed with your compliance contact and the
vendor's compliance team — the vendor will usually have a pre-approved
integration pattern, which is the shortest path.

## Needs client confirmation

| # | Item | Where | Note |
|---|------|-------|------|
| 6 | **Hero stat values** — 2015 / 16+ Fund Houses / One fee | `content.ts` → `HERO_STATS` | Invented during design. Nobody has confirmed these. |
| 7 | **Retirement assumptions** — 6% inflation, 8% post-retirement, 12% pre-retirement, 20-year retirement | `calculators.ts` → `RETIREMENT_ASSUMPTIONS` | Chosen during design. They drive a number people may act on. |

## Design decisions still open

**0. The marquee ignores `prefers-reduced-motion`.** It was honouring it, but
that stops the strip dead on any machine with OS animation effects switched
off — which reads as a broken component, not a considered fallback. It now
animates unconditionally, with hover-pause as the escape hatch.

This is a real accessibility trade-off, not a settled question: hover-pause
does nothing for keyboard or touch users, and continuous motion in the
viewport is exactly what the setting exists to prevent. The better answer is
probably a visible pause/play control, which would also serve everyone else.
The guard is a four-line revert — see the comment in `globals.css`.

**8. Mobile nav.** The header stays one row at every width and the nav scrolls
horizontally. The handoff called this "the minimum correct one" and suggested a
hamburger or drawer below ~768px would be nicer. Implemented as specified,
because the pattern is the client's call, not ours.

**9. Hero stat row: 2 columns or 3?** The handoff prose says "Stat row: 3
columns", but the prototype's own CSS
(`minmax(min(100%, 250px), 1fr)` inside a ~536px column) can only ever produce
two, leaving "One fee" orphaned on a second row. This build matches the
prototype, since that is the artifact the pixels come from. If three across was
the intent, lower the floor in `Hero.tsx`:

```diff
- grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]
+ grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))]
```

Note the trade-off: that also puts two stats per row at 390px instead of
stacking them cleanly. Worth one look from the designer.

## Handoff drift

Small places where the written spec and the prototype disagree. The prototype
was followed unless noted.

| Spec says | Prototype does | This build |
|---|---|---|
| Header height 76px, padding `clamp(20px,4vw,32px)` | 78px, `clamp(16px,3vw,32px)` | Prototype |
| Calculator tabs `padding: 0 0 14px` | `0 0 16px` | Prototype |
| Footer *Company* column: 5 links incl. What We Do | 4 links, no What We Do | **Spec** — the anchor exists and the omission looks accidental |
| "Zero horizontal overflow at 390px" | Journey photo overflows ~58px | **Fixed** — see README, "Things that will bite you" |

## Deliberately not built

`image-slot.js` from the handoff is prototyping tooling, not production code.
Every slot became a `next/image`. The `support.js` the prototype references was
not included in the bundle, so the `.dc.html` file cannot be opened standalone
in a browser — the screenshots in `screenshots/` are the visual reference.
