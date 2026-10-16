import { DEFAULT_CATALOG } from './defaults';
import {
  ADD_ON_IDS,
  PLACEHOLDER_IMAGE,
  SITE_IMAGE_SLOTS,
  type AddOnId,
  type Catalog,
  type CatalogImage,
  type Category,
  type Product,
  type SiteImageKey,
} from './types';

/*
 * Defensive parsing for catalogue data coming from Blob storage or the admin
 * panel. Anything malformed is dropped or replaced with a safe default, so a
 * bad save can never break the public site.
 */

const MAX_TEXT = 2000;

function str(v: unknown, max = 200): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function strList(v: unknown, maxItems = 40, maxLen = 120): string[] {
  const items = Array.isArray(v) ? v : typeof v === 'string' ? v.split(/[\n,]/) : [];
  return items.map((x) => str(x, maxLen)).filter(Boolean).slice(0, maxItems);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Only allow site-relative paths or https URLs (no javascript:, data:, etc.). */
function safeUrl(v: unknown): string {
  const url = str(v, 1000);
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' ? parsed.toString() : '';
  } catch {
    return '';
  }
}

function image(v: unknown, fallbackAlt: string): CatalogImage | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  const url = safeUrl(o.url);
  if (!url) return null;
  return { url, alt: str(o.alt, 200) || fallbackAlt };
}

export function normalizeCategory(v: unknown): Category | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  const name = str(o.name, 80);
  const slug = slugify(str(o.slug, 80) || name);
  if (!name || !slug) return null;
  return {
    slug,
    name,
    blurb: str(o.blurb, 160),
    image: image(o.image, name) ?? { url: PLACEHOLDER_IMAGE, alt: name },
    visible: o.visible !== false,
  };
}

export function normalizeProduct(v: unknown, categorySlugs: string[]): Product | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  const name = str(o.name, 120);
  let slug = slugify(str(o.slug, 80) || name);
  if (slug === 'new') slug = 'new-product'; // "new" is the admin "add product" URL
  const category = str(o.category, 80);
  if (!name || !slug || !categorySlugs.includes(category)) return null;

  const moq = Math.round(Number(o.moq));
  const price = o.priceFrom === null || o.priceFrom === '' ? NaN : Number(o.priceFrom);
  const addOns = (Array.isArray(o.addOns) ? o.addOns : []).filter((a): a is AddOnId =>
    ADD_ON_IDS.includes(a as AddOnId),
  );
  const images = (Array.isArray(o.images) ? o.images : [])
    .map((i) => image(i, name))
    .filter((i): i is CatalogImage => i !== null)
    .slice(0, 12);

  return {
    slug,
    name,
    category,
    summary: str(o.summary, 300),
    description: str(o.description, MAX_TEXT),
    fabric: str(o.fabric, 160),
    colours: strList(o.colours),
    sizes: strList(o.sizes),
    features: strList(o.features, 12, 160),
    moq: Number.isFinite(moq) && moq > 0 ? Math.min(moq, 100000) : 1,
    leadTime: str(o.leadTime, 80),
    addOns: [...new Set(addOns)],
    priceFrom: Number.isFinite(price) && price > 0 ? Math.round(price * 100) / 100 : null,
    images: images.length ? images : [{ url: PLACEHOLDER_IMAGE, alt: name }],
    featured: o.featured === true,
    visible: o.visible !== false,
  };
}

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((i) => (seen.has(i.slug) ? false : (seen.add(i.slug), true)));
}

export function normalizeCatalog(v: unknown): Catalog {
  if (!v || typeof v !== 'object') return DEFAULT_CATALOG;
  const o = v as Record<string, unknown>;

  const categories = uniqueBySlug(
    (Array.isArray(o.categories) ? o.categories : []).map(normalizeCategory).filter((c): c is Category => c !== null),
  );
  if (categories.length === 0) return DEFAULT_CATALOG;
  const slugs = categories.map((c) => c.slug);

  const products = uniqueBySlug(
    (Array.isArray(o.products) ? o.products : [])
      .map((p) => normalizeProduct(p, slugs))
      .filter((p): p is Product => p !== null),
  );

  const siteImages: Catalog['siteImages'] = {};
  const rawImages = o.siteImages && typeof o.siteImages === 'object' ? (o.siteImages as Record<string, unknown>) : {};
  for (const slot of SITE_IMAGE_SLOTS) {
    const parsed = image(rawImages[slot.key], slot.label);
    if (parsed) siteImages[slot.key as SiteImageKey] = parsed;
  }

  return {
    version: 1,
    updatedAt: str(o.updatedAt, 40) || new Date(0).toISOString(),
    categories,
    products,
    siteImages,
  };
}
