# Open items

Carried over from the design handoff, plus what surfaced during the build.
Nothing here is blocked on engineering — each needs a decision or an asset.

## Blocking launch

| # | Item | Where | Needs |
|---|------|-------|-------|
| 1 | **Form goes nowhere.** `submitEnquiry()` resolves locally and shows the thank-you panel. | `src/lib/enquiry.ts` | Endpoint or CRM, server-side validation, spam protection. The client-side check is a UX gate, not a security boundary. |
| 2 | **Error state undesigned.** There is a plain text fallback in existing tokens. | `ContactForm.tsx` | Design sign-off. |
| 3 | **Photography is placeholder.** Three Unsplash images, hotlinked. The Unsplash Licence permits commercial use without attribution, so no credit is rendered, but these are still stand-ins. | `src/lib/content.ts` → `PHOTOS` | Client or licensed photography. Drop the files in `public/`, point `PHOTOS` at them, and remove the `remotePatterns` block in `next.config.ts`. |
| 4 | **Fund-house logos are third-party trademarks.** 16 AMC marks used to indicate distribution relationships. | `public/logos/` | Trademark clearance. |
| 5 | **App Store and Google Play links point at `#contact`.** | `SiteFooter.tsx` | Real store URLs, or drop the block. |

### Client Login: embedding is blocked by InvestWell

An in-page embed of the sign-in form is **not possible today**, and not for
want of trying on our side. InvestWell sends:

```
x-frame-options: SAMEORIGIN
```

Framing it from percapita.in fails with `net::ERR_BLOCKED_BY_RESPONSE` and the
frame never loads — verified directly, not inferred from the header. Every
browser enforces this; it is InvestWell's decision, not a limitation of the
site.

Reverse-proxying their login through our own server to strip the header would
work technically and must not be done: it puts Percapita's infrastructure in
the path of every client password, breaching InvestWell's terms and creating
exactly the liability the launcher exists to avoid.

**To enable an embed, InvestWell have to allow it.** The support request is:

> Please allow `percapita.investwell.app` to be embedded from our website by
> replacing `X-Frame-Options: SAMEORIGIN` with:
> `Content-Security-Policy: frame-ancestors 'self' https://percapita.in https://www.percapita.in`
> Please also confirm embedded sign-in is supported — specifically that session
> cookies are set `SameSite=None; Secure` (and ideally `Partitioned`), so
> browser third-party-cookie restrictions do not break the session in a frame.

That second paragraph matters: even with framing permitted, an embedded
cross-site login can fail under Safari ITP, Firefox ETP and Chrome's storage
partitioning. Get InvestWell to confirm they support it before we build it,
otherwise clients hit a login that silently will not hold a session.

Until then the launcher opens InvestWell in a **new tab**, so percapita.in
stays open behind it rather than being replaced. One `target` attribute in
`ClientLogin.tsx` reverts that to same-tab.

### Client Login: ask InvestWell for a custom domain

Client accounts live on InvestWell at `percapita.investwell.app`, so Percapita
must never render a password field for it, proxy a sign-in, or iframe that
login page. Collecting someone else's credentials is credential interception
however well intentioned — it breaks the vendor's terms, defeats password
managers (which key on origin), stops clients verifying the TLS certificate,
and makes Percapita liable for passwords it has no reason to hold. The in-page
launcher names the destination and hands over instead.

**InvestWell advertises "Custom Domain" as a feature.** It appears under the
Security section of their own pricing comparison matrix at
investwellonline.com/pricing, alongside "Single Sign On", "Google Sign In" and
"IP Whitelisting". So `invest.percapita.in` is very likely available on the
existing plan — ask their helpdesk (help.investwellonline.com) to enable it and
tell us the CNAME target. No public setup documentation exists, so it is a
support request rather than a self-serve setting; check the InvestWell admin
panel first in case it is exposed there.

Worth doing before launch rather than after clients have bookmarked the current
URL.

**A custom domain does not enable embedding.** `X-Frame-Options: SAMEORIGIN`
compares the exact origin, and `invest.percapita.in` is still a different origin
from `percapita.in`, so framing stays blocked. The two are separate asks: the
custom domain fixes the address bar, the `frame-ancestors` header above is what
would permit an embed. "Single Sign On" is also listed and may be worth asking
about, but there is no public detail on what it covers — do not assume it means
SSO from our own website.

If that happens, it is a one-line change to `CLIENT_LOGIN.url`; the dialog
reads the host from it and the verification panel updates itself.

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
| 6 | **Hero stat values** — 2015 / 40+ Years / 450+ Clients | `content.ts` → `HERO_STATS` | Client-supplied Sept 2026. The alternative offered was 100+ Crs AUM instead of 450+ Clients; Clients was chosen. |
| 7 | **Retirement assumptions** — 6% inflation, 8% post-retirement, 12% pre-retirement, 20-year retirement | `calculators.ts` → `RETIREMENT_ASSUMPTIONS` | Chosen during design. They drive a number people may act on. |

## Design decisions still open

**10. Which schemes appear in the NAV band.** Currently one flagship
Regular/Growth scheme per fund house already shown on the site — mostly large
cap and flexi cap. This was our selection, not the client's. Percapita may
prefer the schemes they actually recommend most, or a spread across
categories. Codes live in `TICKER_SCHEMES` in `src/lib/nav.ts`.

**11. No daily change figure.** The band shows NAV and the as-on date but no
day-on-day movement, because AMFI's feed carries only the current value.
Showing change would mean storing the previous day's file and diffing it.
Worth asking whether it is wanted before building that.

**A note on the stock-price API that was considered.** The
Indian-Stock-Market-API repo was evaluated and rejected: its only hosted
endpoint is a bare IP over plain HTTP (blocked as mixed content from an HTTPS
site, and unreachable when tested), its data comes from Yahoo Finance whose
terms likely prohibit redistribution, GitHub reports no licence despite the
readme claiming MIT, and the readme itself says "for educational purposes
only. Not for financial decisions" — which does not belong on an
AMFI-registered advisory site. AMFI's own feed is free, official and fit for
this purpose.

**0. The marquee ignores `prefers-reduced-motion`.** It was honouring it, but
that stops the strip dead on any machine with OS animation effects switched
off — which reads as a broken component, not a considered fallback. It now
animates unconditionally, with hover-pause as the escape hatch.

This is a real accessibility trade-off, not a settled question: hover-pause
does nothing for keyboard or touch users, and continuous motion in the
viewport is exactly what the setting exists to prevent. The better answer is
probably a visible pause/play control, which would also serve everyone else.
The guard is a four-line revert — see the comment in `globals.css`.

**8. Mobile nav — done.** The scrolling nav collapsed to a ~65px sliver at
390px, so the links now move into a menu panel below 768px (`MobileNav.tsx`).
The handoff anticipated this: it called the horizontal scroll "the minimum
correct one" and a drawer "the nicer answer". Client Login stays in the bar at
every width — it fits at 390px and is the primary CTA.

**9. Hero stat row — resolved.** It now runs three across from 640px and
stacks below that (`grid-cols-1 sm:grid-cols-3`). The handoff prose said "3
columns" while its own `auto-fit` floor could only ever fit two in a ~536px
column, orphaning the third. The Sept 2026 copy presents the stats as a
three-column table, which settled it.

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
