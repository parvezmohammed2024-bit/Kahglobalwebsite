/**
 * Catalogue data model. The live catalogue is a single JSON document stored in
 * Vercel Blob and edited from /admin; `defaults.ts` holds the built-in fallback.
 */

export const ADD_ONS = [
  { id: 'embroidery', name: 'Embroidery', description: 'Computerised logo embroidery' },
  { id: 'silkscreen', name: 'Silkscreen printing', description: 'Bold prints, economical in bulk' },
  { id: 'dtf', name: 'DTF printing', description: 'Detailed full-colour logos' },
  { id: 'sublimation', name: 'Sublimation printing', description: 'All-over full-colour designs' },
  { id: 'name-printing', name: 'Name / number', description: 'Individual names, numbers or titles' },
  { id: 'custom-size', name: 'Custom sizing', description: 'Made-to-measure or special sizes' },
  { id: 'custom-colour', name: 'Custom colour & fabric', description: 'Your choice of fabric and colours' },
] as const;

export type AddOnId = (typeof ADD_ONS)[number]['id'];
export const ADD_ON_IDS = ADD_ONS.map((a) => a.id) as AddOnId[];

export function addOnName(id: AddOnId): string {
  return ADD_ONS.find((a) => a.id === id)?.name ?? id;
}

export type CatalogImage = { url: string; alt: string };

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: CatalogImage;
  visible: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  summary: string;
  description: string;
  fabric: string;
  colours: string[];
  sizes: string[];
  features: string[];
  /** Minimum order quantity in pieces */
  moq: number;
  leadTime: string;
  addOns: AddOnId[];
  /** Optional "from RM" per piece; null = price on quotation */
  priceFrom: number | null;
  images: CatalogImage[];
  featured: boolean;
  visible: boolean;
};

/** Editable image slots on the static pages (home hero, printing methods, …). */
export const SITE_IMAGE_SLOTS = [
  { key: 'home-hero-main', label: 'Home — hero main photo', hint: 'Portrait 3:4 · uniforms close-up' },
  { key: 'home-hero-top', label: 'Home — hero small photo (top)', hint: 'Square · e.g. embroidery machine' },
  { key: 'home-hero-bottom', label: 'Home — hero small photo (bottom)', hint: 'Square · e.g. team in uniforms' },
  { key: 'home-path-ready', label: 'Home — “Ready designs” card', hint: 'Landscape 16:9' },
  { key: 'home-path-custom', label: 'Home — “Custom-made” card', hint: 'Landscape 16:9' },
  { key: 'custom-hero', label: 'Custom-made — hero', hint: 'Landscape 4:3 · production floor' },
  { key: 'about-story', label: 'About — our story', hint: 'Landscape 4:3 · premises or team' },
  { key: 'printing-embroidery', label: 'Printing — Embroidery', hint: 'Landscape 4:3' },
  { key: 'printing-silkscreen', label: 'Printing — Silkscreen', hint: 'Landscape 4:3' },
  { key: 'printing-sublimation', label: 'Printing — Sublimation', hint: 'Landscape 4:3' },
  { key: 'printing-dtf', label: 'Printing — DTF', hint: 'Landscape 4:3' },
  { key: 'industry-school', label: 'Industries — Schools', hint: 'Landscape 16:9' },
  { key: 'industry-hotel', label: 'Industries — Hotels', hint: 'Landscape 16:9' },
  { key: 'industry-restaurant', label: 'Industries — Restaurants & F&B', hint: 'Landscape 16:9' },
  { key: 'industry-corporate', label: 'Industries — Corporate', hint: 'Landscape 16:9' },
  { key: 'industry-events', label: 'Industries — Sports & events', hint: 'Landscape 16:9' },
  { key: 'industry-festive', label: 'Industries — Festive & Raya', hint: 'Landscape 16:9' },
] as const;

export type SiteImageKey = (typeof SITE_IMAGE_SLOTS)[number]['key'];

export type Catalog = {
  version: 1;
  updatedAt: string;
  categories: Category[];
  products: Product[];
  siteImages: Partial<Record<SiteImageKey, CatalogImage>>;
};

/** Neutral grey card with the logo mark, used wherever no photo is uploaded yet. */
export const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';
