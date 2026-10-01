# Kah Global Sdn Bhd — Website

Marketing site for **Kah Global Sdn Bhd** (201401008112 / 1084190-X), a uniform & apparel company in Cheras,
Kuala Lumpur. Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, fully static and deployable to
Vercel. The visual design comes from the Google Stitch export in [`design/stitch/`](design/stitch).

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` (defaults to
`https://www.kahglobal.com.my`).

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/ready-made` | Product catalogue with filters (category, fabric, GSM, colour, size, price, sort) |
| `/ready-made/[slug]` | Product detail — gallery, price tiers, quantity estimator, specs, size chart |
| `/custom-made` | Custom-made uniforms |
| `/printing` | Embroidery, silkscreen, sublimation & DTF |
| `/industries` | Industries served |
| `/about` | Company |
| `/contact` | Contact details, map and enquiry form |
| `/request-quote` | 3-step quotation wizard |

`sitemap.xml` and `robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.

## Editing content (no component changes needed)

| What | File |
| --- | --- |
| Company details, phone numbers, address, hours, promo bar, stats, testimonials, client logos, FAQs, MOQs & lead times | `src/data/site.ts` |
| Products (name, slug, category, fabric, GSM, colours, sizes, price-from, bulk tiers, images) | `src/data/products.ts` |
| Printing methods, logo positions, process steps, custom-made options | `src/data/services.ts` |
| Industries | `src/data/industries.ts` |
| Colours, fonts, radius, shadows (design tokens) | `src/app/globals.css` (`@theme`) |

### Placeholders

Anything not yet confirmed is marked **`[PLACEHOLDER]`** — search the project for that text and replace it before
launch. Image slots without a photo show a neutral grey card with the logo mark — see `IMAGES.md`.

The "we're updating our website" popup (shown once per visit after a short delay) is controlled by
`SHOW_UPDATE_POPUP` and `POPUP_DELAY_MS` in `src/config/site.ts`; its wording is in the same file.

### Images

- Brand assets: `public/brand/` (logo mark, white logo mark, full logo), `public/og-image.jpg`, `src/app/apple-icon.png`.
- Content images: `public/images/{home,categories,products,industries,custom}/`. Replace a file with a real photo
  **using the same filename** and it updates everywhere. Product images are referenced in `src/data/products.ts`.
- To fill the slots with the AI-generated mock-up photos from the Stitch export (as an interim step):

  ```bash
  node scripts/fetch-stitch-images.mjs
  ```

  The mapping lives in `scripts/stitch-images.json`. These are stand-ins — swap them for real Kah Global photos.

## Quote form & WhatsApp

- The quote wizard (`src/components/quote/QuoteWizard.tsx`) builds a structured `QuoteRequest`
  (`src/lib/quote.ts`). On submit it opens WhatsApp with a pre-filled message, with an email (`mailto:`) fallback.
- WhatsApp links cannot attach files, so customers are reminded to send their logo in the chat.
- **Adding a backend later:** implement `submitQuote()` in `src/lib/quote.ts` (e.g. a Server Action or
  `src/app/api/quote/route.ts` that emails the team and stores the logo upload). The UI only depends on that
  function and the `QuoteRequest` type.
- The WhatsApp number used everywhere (floating button, header, forms) is `contact.whatsapp.number` in
  `src/data/site.ts`.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository. Framework preset **Next.js** is detected
   automatically (see `vercel.json`); no build settings need changing.
3. (Optional) **Settings → Environment Variables:** `NEXT_PUBLIC_SITE_URL=https://www.kahglobal.com.my`.
4. **Deploy.** Every push to the production branch redeploys; other branches get preview URLs.
5. **Settings → Domains:** add `kahglobal.com.my` and `www.kahglobal.com.my`, then update DNS at your domain
   registrar as Vercel instructs.
6. After launch, submit `https://www.kahglobal.com.my/sitemap.xml` in Google Search Console and update the
   Google Business Profile website link.

## Project structure

```
src/
  app/            routes, layout, sitemap/robots, globals.css (design tokens)
  components/
    layout/       Header (promo bar + mobile drawer), Footer, WhatsAppFloat, Logo
    ui/           Button, Badge, SectionHeading, Breadcrumbs, FaqList, JsonLd, WhatsAppIcon
    cards/        ProductCard, CategoryCard, ServiceCard, IndustryCard, TestimonialCard
    sections/     PageHero, StatsBar, StepsTimeline, CTABanner, ClientLogos, Testimonials
    catalog/      CatalogView (filters, drawer)
    product/      ProductGallery, PriceTierTable, ProductOrderPanel
    quote/        QuoteWizard
    contact/      ContactForm
  data/           editable content (site, products, services, industries)
  lib/            quote model, SEO helper, WhatsApp + formatting helpers
design/stitch/    Google Stitch export (source of truth for the visual design)
scripts/          fetch-stitch-images.mjs + stitch-images.json
```
