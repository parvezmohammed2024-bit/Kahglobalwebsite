# Kah Global Sdn Bhd — Website

Website for **Kah Global Sdn Bhd** (201401008112 / 1084190-X), a manufacturer of school, hotel, restaurant and
corporate uniforms, sublimation t-shirts, Baju Melayu, Baju Kurung and Malay traditional wear in Cheras, Kuala
Lumpur. Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4** on Vercel, with an admin panel at
`/admin` for products and photos (stored in Vercel Blob). The visual design comes from the Google Stitch export in [`design/stitch/`](design/stitch).

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
| `/products` | Product catalogue — category, add-on filters and search |
| `/products/[slug]` | Product detail — photos, MOQ, add-ons, specs, quote / WhatsApp enquiry |
| `/custom-made` | Custom-made uniforms |
| `/printing` | Embroidery, silkscreen, sublimation & DTF |
| `/industries` | Industries served |
| `/about` | Company |
| `/contact` | Contact details, map and enquiry form |
| `/request-quote` | 3-step quotation wizard |
| `/admin` | Admin panel — products, categories, page images (password protected) |

Old `/ready-made` URLs redirect to `/products`.

`sitemap.xml` and `robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.

## Admin panel (`/admin`)

Manage the catalogue without touching code:

- **Products** — add, edit, delete, reorder, show/hide, feature on the home page. Each product has photos, MOQ,
  lead time, available add-ons (embroidery, silkscreen, DTF, sublimation, name/number, custom sizing, custom
  colour & fabric), fabric, colours, sizes, features and an optional "from RM" price (empty = price on quotation).
- **Categories** — name, short description, photo, order and visibility.
- **Page images** — photos for the home hero, custom-made, printing, industries and about pages.

Photos are resized in the browser (max 2000px, WebP) and uploaded straight to Vercel Blob. Every save stores a new
version of the catalogue JSON (the last 15 are kept as backups) and refreshes the public pages within seconds.
Until Blob is connected, the site shows the built-in catalogue in `src/lib/catalog/defaults.ts`.

### One-time setup in Vercel

1. **Storage → Create → Blob** — choose *public* access and connect it to this project (adds `BLOB_STORE_ID`; older stores add `BLOB_READ_WRITE_TOKEN` — either works).
2. **Settings → Environment Variables** — add `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (32+ random characters)
   for Production (and Preview if you want to test there).
3. **Redeploy**, then open `https://<your-domain>/admin` and log in.

## Editing content in code

| What | File |
| --- | --- |
| Company details, phone numbers, address, hours, promo bar, stats, testimonials, client logos, FAQs | `src/data/site.ts` |
| Default catalogue (used until the first admin save) and image slots | `src/lib/catalog/defaults.ts`, `src/lib/catalog/types.ts` |
| Printing methods, logo positions, process steps, custom-made options | `src/data/services.ts` |
| Industries | `src/data/industries.ts` |
| Update popup + bottom bar switch and wording | `src/config/site.ts` |
| Colours, fonts, radius, shadows (design tokens) | `src/app/globals.css` (`@theme`) |

Anything not yet confirmed is marked **`[PLACEHOLDER]`** — search the project for that text. Image slots without a
photo show a neutral grey card with the logo mark (`public/images/placeholder.jpg`).

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
  app/
    (site)/       public pages (home, products, custom-made, printing, industries, about, contact, request-quote)
    admin/        admin panel: login, (panel)/ products, categories, page images, server actions
    api/admin/    image upload token endpoint (Vercel Blob)
  components/
    layout/       Header, Footer, WhatsAppFloat, Logo, UpdatePopup, UpdateBar
    ui/           Button, Badge, SectionHeading, Breadcrumbs, FaqList, JsonLd, WhatsAppIcon
    cards/        ProductCard, CategoryCard, ServiceCard, IndustryCard, TestimonialCard
    sections/     PageHero, StatsBar, StepsTimeline, CTABanner, ClientLogos, Testimonials
    catalog/      CatalogView (filters, drawer, search)
    product/      ProductGallery, ProductEnquiryPanel
    quote/        QuoteWizard
    contact/      ContactForm
    admin/        ProductList, ProductEditor, CategoriesEditor, SiteImagesEditor, ImageUploader
  data/           site copy (site, services, industries)
  lib/
    catalog/      types, defaults, validation, queries, Vercel Blob storage
    admin/        password + signed-cookie auth
                  quote model, SEO, WhatsApp + formatting helpers
design/stitch/    Google Stitch export (source of truth for the visual design)
```
