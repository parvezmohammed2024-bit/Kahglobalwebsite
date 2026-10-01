# Image inventory

Every image slot on the site, what it currently shows, and where it came from.
Use this to track what still needs a **real Kah Global photo**.

**Source key**

| Source | Meaning |
| --- | --- |
| **Real** | Kah Global's own asset |
| **Old site** | Restored from the previous website |
| **Unsplash** | Stock photo hot-linked from `images.unsplash.com` (allowed in `next.config.ts`) |
| **Placeholder** | Neutral grey card with the Kah Global logo mark — needs a photo |

> **Status (current):** no real photos have been uploaded to `public/images/`, and the old site's photos were
> stored in Supabase (never in git), so nothing could be restored. Unsplash could not be reached from the build
> environment, so every content slot below is still a **Placeholder**.

## How to replace an image

- **Local photo (preferred):** save it in `public/images/…` with the **same filename** as the slot below and it
  updates everywhere. Or use a new kebab-case name (e.g. `honeycomb-polo-navy.jpg`) and update the path in the file
  listed under *Set in*.
- **Unsplash photo:** paste the direct URL (`https://images.unsplash.com/photo-…?w=1600&q=80`) as the `src` in the
  file listed under *Set in*, and update the alt text to describe the actual photo. Avoid photos with visible brand
  logos.
- All images use `next/image` with `fill` + `object-cover` inside a fixed-ratio frame, so any photo fits without
  stretching. Recommended size: at least 1600px on the long side.
- Optional interim fill: `node scripts/fetch-stitch-images.mjs` downloads the AI-generated Stitch mock-up photos
  into the same paths (needs internet access to `lh3.googleusercontent.com`).

## Brand

| Slot | Ratio | Image | Source | Set in |
| --- | --- | --- | --- | --- |
| Header / footer logo | — | `public/brand/logo-mark.png`, `logo-mark-white.png` | Real (official logo) | `src/components/layout/Logo.tsx` |
| Full logo (schema.org) | — | `public/brand/logo-full.png` | Real (official logo) | `src/app/layout.tsx` |
| Favicon | 1:1 | `src/app/favicon.ico` | Real (uploaded by owner) | — |
| Apple touch icon | 1:1 | `src/app/apple-icon.png` | Real (from logo) | — |
| Social share (Open Graph) | 1200×630 | `public/og-image.jpg` | Generated from logo | `src/lib/seo.ts` |

## Home (`/`)

| Slot | Ratio | Image | Alt text | Source | Set in |
| --- | --- | --- | --- | --- | --- |
| Hero — main | 3:4 | `images/home/hero-polos.jpg` | Navy corporate polo shirts with embroidered logos | Placeholder | `src/app/page.tsx` |
| Hero — top right | ~1:1 | `images/home/embroidery-machine.jpg` | Computerised embroidery machine stitching a logo | Placeholder | `src/app/page.tsx` |
| Hero — bottom right | ~1:1 | `images/home/corporate-team.jpg` | Corporate team wearing matching uniforms | Placeholder | `src/app/page.tsx` |
| Ready-made pathway card | 16:9 | `images/home/ready-stock.jpg` | Stacks of ready-made corporate polo shirts | Placeholder | `src/app/page.tsx` |
| Custom-made pathway card | 16:9 | `images/home/custom-workshop.jpg` | Fabric swatches and pattern pieces on a design table | Placeholder | `src/app/page.tsx` |
| Category cards (8) | 4:3 | see *Categories* | | | |
| Featured products (4) | 4:5 | see *Products* | | | |

## Categories (home, footer links, catalogue)

Set in `src/data/products.ts` → `categories`. Ratio 4:3.

| Category | Image | Alt text | Source |
| --- | --- | --- | --- |
| Polo Shirts | `images/categories/polo-shirts.jpg` | Folded corporate polo shirts in assorted colours | Placeholder |
| Round Neck T-Shirts | `images/categories/t-shirts.jpg` | Stack of plain round neck cotton t-shirts | Placeholder |
| Corporate Shirts | `images/categories/corporate-shirts.jpg` | Light blue corporate button-down shirt on a hanger | Placeholder |
| F1 / Racing Shirts | `images/categories/f1-shirts.jpg` | Colour-blocked F1-style corporate uniform shirt | Placeholder |
| Sublimation Jerseys | `images/categories/jerseys.jpg` | Full-colour sublimated sports jersey | Placeholder |
| Jackets & Windbreakers | `images/categories/jackets.jpg` | Dark microfibre corporate jacket with zip front | Placeholder |
| Muslimah Wear | `images/categories/muslimah.jpg` | Modest long-cut corporate blouse | Placeholder |
| Aprons & Caps | `images/categories/aprons-caps.jpg` | Canvas work apron and twill cap | Placeholder |
| Industrial & Safety | `images/products/industrial-twill-shirt.jpg` (shared) | Navy workwear shirt with reflective tape | Placeholder |

## Products (`/ready-made`, `/ready-made/[slug]`)

Set in `src/data/products.ts` → each product's `images` array. Ratio 4:5 (cards and main gallery), thumbnails 1:1.
The first image is used on product cards.

| Product | Images | Source |
| --- | --- | --- |
| Signature Honeycomb Polo (210 GSM) | `honeycomb-polo-navy.jpg`, `-navy-front.jpg`, `-navy-collar.jpg`, `-grey.jpg`, `-green.jpg`, `-fabric.jpg`, `-placket.jpg` | Placeholder (7) |
| Quick-Dry Microfibre Polo (160 GSM) | `categories/polo-shirts.jpg` (shared — needs its own photo) | Placeholder |
| Premium Combed Cotton Tee (190 GSM) | `combed-tee-black.jpg`, `combed-tee-white.jpg` | Placeholder (2) |
| Quick-Dry Crewneck Tee (160 GSM) | `quick-dry-crewneck-black.jpg` | Placeholder |
| Executive Oxford Long Sleeve Shirt | `oxford-shirt-blue.jpg`, `oxford-shirt-blue-2.jpg` | Placeholder (2) |
| Dual-Tone Corporate F1 Shirt | `f1-shirt-red-charcoal.jpg`, `f1-shirt-navy-orange.jpg` | Placeholder (2) |
| Dri-Fit Sublimation Collar Jersey | `dri-fit-jersey.jpg` | Placeholder |
| Corporate Microfibre Windbreaker | `microfibre-windbreaker.jpg` | Placeholder |
| Muslimah Corporate Blouse | `muslimah-blouse-teal.jpg` | Placeholder |
| Canvas Barista & Workshop Apron | `canvas-apron.jpg` | Placeholder |
| Cotton Twill Cap | `categories/aprons-caps.jpg` (shared — needs its own photo) | Placeholder |
| Industrial Twill Workwear Shirt | `industrial-twill-shirt.jpg`, `industrial-twill-shirt-reflective.jpg` | Placeholder (2) |
| Hi-Vis Safety Vest | `safety-vest-hi-vis.jpg` | Placeholder |

All product files live in `public/images/products/` unless noted.

## Printing (`/printing`, home printing cards link here)

Set in `src/data/services.ts` → `printingMethods`. Ratio 4:3.

| Method | Image | Alt text | Source |
| --- | --- | --- | --- |
| Embroidery | `images/home/embroidery-machine.jpg` (shared with home hero) | Computerised embroidery machine stitching a logo onto fabric | Placeholder |
| Silkscreen | `images/categories/t-shirts.jpg` (shared — needs a screen-printing photo) | Screen printing a logo onto a t-shirt with a squeegee | Placeholder |
| Sublimation | `images/categories/jerseys.jpg` (shared) | Brightly coloured sublimation-printed sports jersey | Placeholder |
| DTF | `images/products/f1-shirt-navy-orange.jpg` (shared — needs a DTF photo) | Detailed full-colour DTF transfer on a uniform shirt | Placeholder |

## Custom-made (`/custom-made`)

Set in `src/app/custom-made/page.tsx`.

| Slot | Ratio | Image | Alt text | Source |
| --- | --- | --- | --- | --- |
| Hero (desktop only) | 4:3 | `images/custom/factory-floor.jpg` | Tailors sewing uniforms on the production floor | Placeholder |
| Idea: F1 crew uniforms | 4:3 | `images/custom/f1-crew-uniform.jpg` | Crew member in a navy and red dual-tone F1-style uniform | Placeholder |
| Idea: café tunics & aprons | 4:3 | `images/industries/food-beverage.jpg` (shared) | Café staff in a mandarin-collar tunic and cross-back apron | Placeholder |
| Idea: drill workwear | 4:3 | `images/industries/factory.jpg` (shared) | Plant worker in heavy-duty drill workwear | Placeholder |
| Idea: event run tees | 4:3 | `images/industries/events.jpg` (shared) | Runners in matching sublimated event t-shirts | Placeholder |
| Idea: Oxford shirts | 4:3 | `images/industries/corporate.jpg` (shared) | Executives in tailored light blue Oxford shirts | Placeholder |
| Idea: rider polos | 4:3 | `images/industries/logistics.jpg` (shared) | Delivery rider in a polo shirt with reflective piping | Placeholder |

## Industries (`/industries`)

Set in `src/data/industries.ts`. Ratio 16:9. Industries without an `image` show a text-only card.

| Industry | Image | Alt text | Source |
| --- | --- | --- | --- |
| Corporate & Offices | `images/industries/corporate.jpg` | Office team wearing matching corporate shirts | Placeholder |
| Food & Beverage | `images/industries/food-beverage.jpg` | Café barista in a branded uniform and apron | Placeholder |
| Factories & Manufacturing | `images/industries/factory.jpg` | Factory worker in heavy-duty workwear on the production floor | Placeholder |
| Events & Roadshows | `images/industries/events.jpg` | Event crew in matching printed t-shirts | Placeholder |
| Logistics & Security | `images/industries/logistics.jpg` | Delivery rider in a branded polo shirt beside a vehicle | Placeholder |
| Schools & Universities | — (no image slot used) | — | None |
| Hospitality & Retail | — (no image slot used) | — | None |
| Clinics & Healthcare | — (no image slot used) | — | None |

## About (`/about`)

| Slot | Ratio | Image | Alt text | Source | Set in |
| --- | --- | --- | --- | --- | --- |
| Our story | 4:3 | `images/custom/factory-floor.jpg` (shared) | Kah Global production floor in Cheras | Placeholder — **should be a real photo of your premises/team** | `src/app/about/page.tsx` |

## Other

| Slot | Notes |
| --- | --- |
| Client logos (home, industries) | Strip is hidden until a client has a `logo` path in `src/data/site.ts` → `clientLogos`. Add logo files once clients approve. |
| Contact map | Live Google Maps embed — no image needed. |

## Shots to prioritise when photographing

1. Your Cheras premises / production floor and team (About, Custom-made hero) — stock photos can't stand in for these.
2. Embroidery machine at work, screen printing, heat press (Printing, Home hero).
3. Each ready-made product on a plain light-grey background, front view, in its main colour (Products).
4. Customers' staff wearing uniforms you made, with permission (Industries, Custom-made ideas).
