# Hero photograph — specification

For the main image on the Percapita homepage, beside the headline. This is the
first thing every visitor sees.

Measured against the live site on 25 September 2026.

---

## 1. Required file

| | |
|---|---|
| **Aspect ratio** | **4:5 portrait** (taller than it is wide) |
| **Minimum size** | **1400 × 1750 px** |
| **Preferred size** | **2000 × 2500 px** |
| **Format** | JPEG, quality 85 or higher. TIFF or PNG originals also accepted |
| **Colour space** | sRGB |
| **Orientation** | Portrait. Do not supply landscape |

Deliver the **original full-resolution file**. Do not resize down, do not crop
to fit, and do not export from a messaging app — WhatsApp and similar
recompress images and destroy detail that cannot be recovered.

## 2. Why these numbers

The image occupies a fixed 4:5 box on the page:

| Screen | Box size on screen |
|---|---|
| Desktop | 536 × 640 px |
| Mobile | 350 × 438 px |

Modern phones and laptops have high-density displays that draw two physical
pixels for every one of those, so the file must be at least **1072 × 1280 px**
to render sharply. 1400 × 1750 gives headroom above that floor; 2000 × 2500
leaves room for the layout to change later without a reshoot.

A file smaller than 1072 px wide will look visibly soft. There is no way to fix
this in code — detail that is not in the file cannot be added.

## 3. Composition

**Supply it already framed 4:5.** Anything wider has to be cropped to fit, and
cropping decides what gets cut. A previously supplied landscape image cut one
subject's head off the edge.

- Keep the main subject within the **central 80%** of the frame.
- Leave clear space at the top and bottom; the image sits against a headline
  and statistics and needs room to breathe.
- Avoid detail at the extreme left and right edges. Even a 4:5 file shifts
  slightly between screen sizes.
- No text, logos, watermarks or graphics inside the photograph. Everything
  readable on the page is set in live type.
- Avoid heavy vignettes or strong colour casts. The page is white with a deep
  purple accent, and the photograph should sit comfortably against that.

## 4. Subject

The photograph should show **people engaged with their own financial
decisions** — a couple, a family or an individual, in an everyday setting such
as a home or a bright office.

- Indian subjects, since this is the client base.
- Natural, unposed expressions. Warm rather than corporate.
- Real environments. Avoid the obvious stock-photo look: handshakes over
  desks, pointing at charts, suits in glass boardrooms.
- Screens may appear but must not show identifiable financial figures,
  statements, or any real person's account.

## 5. Rights

**The photograph must be owned by Percapita or licensed for commercial use on
a public website.** Percapita is an AMFI-registered financial services firm, so
an image used without clear rights is a liability rather than an inconvenience.

Please supply, with the file:

- Who took it, and the date
- The licence or a written confirmation that Percapita owns it
- **Signed model releases for every identifiable person in the frame**

If the image is bought from a stock library, send the licence receipt and note
whether the licence covers web and social use.

## 6. Delivering it

Send the original file by email, Google Drive or WeTransfer — not over
WhatsApp.

Name it `percapita-hero-<date>.jpg`, e.g. `percapita-hero-2026-10-01.jpg`.

---

## Checklist before sending

- [ ] 4:5 portrait, not landscape
- [ ] At least 1400 × 1750 px
- [ ] Original file, not a resized or messaged copy
- [ ] sRGB
- [ ] Subject within the central 80%, nothing important at the edges
- [ ] No text or logos inside the image
- [ ] Licence and model releases attached

---

## Other images on the site

Two further slots are still placeholders and will need the same treatment. Ask
for their specifications when you are ready to commission them; they are
recorded as open items in `OPEN-ITEMS.md`. Supplying all three from one shoot
is cheaper and keeps the site visually consistent.
