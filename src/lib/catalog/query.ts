import { PLACEHOLDER_IMAGE, type Catalog, type CatalogImage, type Category, type Product, type SiteImageKey } from './types';

/** Pure helpers over a catalogue — safe to use in server and client components. */

export function visibleCategories(c: Catalog): Category[] {
  return c.categories.filter((cat) => cat.visible);
}

/** Visible products whose category is also visible. */
export function visibleProducts(c: Catalog): Product[] {
  const shown = new Set(visibleCategories(c).map((cat) => cat.slug));
  return c.products.filter((p) => p.visible && shown.has(p.category));
}

export function findProduct(c: Catalog, slug: string): Product | undefined {
  return visibleProducts(c).find((p) => p.slug === slug);
}

export function findCategory(c: Catalog, slug: string): Category | undefined {
  return c.categories.find((cat) => cat.slug === slug);
}

export function categoryName(c: Catalog, slug: string): string {
  return findCategory(c, slug)?.name ?? slug;
}

export function featuredProducts(c: Catalog, limit = 4): Product[] {
  const all = visibleProducts(c);
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export function relatedProducts(c: Catalog, product: Product, limit = 4): Product[] {
  const others = visibleProducts(c).filter((p) => p.slug !== product.slug);
  return [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(
    0,
    limit,
  );
}

export function countInCategory(c: Catalog, slug: string): number {
  return visibleProducts(c).filter((p) => p.category === slug).length;
}

/** A page image slot, falling back to the neutral placeholder. */
export function siteImage(c: Catalog, key: SiteImageKey, alt: string): CatalogImage {
  return c.siteImages[key] ?? { url: PLACEHOLDER_IMAGE, alt };
}
