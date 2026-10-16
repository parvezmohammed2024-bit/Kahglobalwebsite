# Images

All product, category and page photos are now uploaded from the **admin panel** (`/admin`) and stored in
Vercel Blob — no code changes or file renaming needed.

| What | Where to upload | Shape that fits best |
| --- | --- | --- |
| Product photos (up to 8 each; the first is the cover) | Admin → Products → edit a product → Photos | Portrait 4:5 |
| Category photos (9 categories) | Admin → Categories | Landscape 4:3 |
| Home hero (3), “Our designs” / “Custom-made” cards (2) | Admin → Page images | 3:4, square, 16:9 |
| Custom-made hero, About “our story” | Admin → Page images | 4:3 |
| Printing methods (embroidery, silkscreen, sublimation, DTF) | Admin → Page images | 4:3 |
| Industries (schools, hotels, restaurants, corporate, events, festive) | Admin → Page images | 16:9 |

Any slot without a photo shows `public/images/placeholder.jpg` — a neutral grey card with the Kah Global logo mark.

Every photo is shown with `object-cover` in a fixed-shape frame, so nothing stretches; keep the main subject
centred. Large photos are resized automatically (max 2000px, WebP) before upload. Add a short description for each
photo (alt text) — it helps Google and visually impaired visitors.

## Fixed brand files (in the repo)

| Asset | File |
| --- | --- |
| Logo mark (navy / white) | `public/brand/logo-mark.png`, `public/brand/logo-mark-white.png` |
| Full logo | `public/brand/logo-full.png` |
| Favicon / app icon | `src/app/favicon.ico`, `src/app/apple-icon.png` |
| Social share image | `public/og-image.jpg` |

## Photos to take first

1. Your Cheras premises, production floor and team (About, Custom-made hero).
2. Embroidery machine, screen printing, sublimation press (Printing, Home hero).
3. One clear photo per product on a plain light background.
4. Customers wearing uniforms you made, with permission (Industries).
