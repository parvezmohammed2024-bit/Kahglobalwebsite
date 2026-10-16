'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { checkPassword, endSession, isAdmin, startSession } from '@/lib/admin/auth';
import { deleteImages, getCatalogFresh, saveCatalog } from '@/lib/catalog/store';
import { normalizeCategory, normalizeProduct } from '@/lib/catalog/normalize';
import {
  SITE_IMAGE_SLOTS,
  type Catalog,
  type CatalogImage,
  type Category,
  type Product,
  type SiteImageKey,
} from '@/lib/catalog/types';

export type ActionResult = { ok: true; slug?: string } | { ok: false; error: string };

// ─────────────────────────────────────────────
//  Auth
// ─────────────────────────────────────────────

export async function login(_prev: { error: string } | null, formData: FormData): Promise<{ error: string } | null> {
  const password = String(formData.get('password') ?? '');
  if (!checkPassword(password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: 'Incorrect password.' };
  }
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/admin/login');
}

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

async function guard(): Promise<ActionResult | null> {
  return (await isAdmin()) ? null : { ok: false, error: 'Your session has expired — please log in again.' };
}

function imageUrls(images: (CatalogImage | undefined)[]): string[] {
  return images.filter((i): i is CatalogImage => Boolean(i)).map((i) => i.url);
}

/** Save, refresh every public page, then clean up images no longer used. */
async function commit(next: Catalog, previous: Catalog): Promise<ActionResult | null> {
  try {
    await saveCatalog(next);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Could not save. Please try again.' };
  }
  revalidatePath('/', 'layout');

  const used = new Set(allImageUrls(next));
  await deleteImages(allImageUrls(previous).filter((u) => !used.has(u)));
  return null;
}

function allImageUrls(c: Catalog): string[] {
  return [
    ...imageUrls(c.categories.map((cat) => cat.image)),
    ...c.products.flatMap((p) => imageUrls(p.images)),
    ...imageUrls(Object.values(c.siteImages)),
  ];
}

// ─────────────────────────────────────────────
//  Products
// ─────────────────────────────────────────────

export async function saveProduct(input: Product, originalSlug: string | null): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;

  const catalog = await getCatalogFresh();
  const product = normalizeProduct(input, catalog.categories.map((c) => c.slug));
  if (!product) return { ok: false, error: 'Please enter a product name and choose a category.' };

  const clash = catalog.products.find((p) => p.slug === product.slug && p.slug !== originalSlug);
  if (clash) return { ok: false, error: `Another product already uses the web address “${product.slug}”. Change the URL slug.` };

  const index = originalSlug ? catalog.products.findIndex((p) => p.slug === originalSlug) : -1;
  const products = [...catalog.products];
  if (index >= 0) products[index] = product;
  else products.push(product);

  const failed = await commit({ ...catalog, products }, catalog);
  return failed ?? { ok: true, slug: product.slug };
}

export async function deleteProduct(slug: string): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const catalog = await getCatalogFresh();
  const failed = await commit({ ...catalog, products: catalog.products.filter((p) => p.slug !== slug) }, catalog);
  return failed ?? { ok: true };
}

export async function updateProductFlags(
  slug: string,
  flags: Partial<Pick<Product, 'visible' | 'featured'>>,
): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const catalog = await getCatalogFresh();
  const products = catalog.products.map((p) =>
    p.slug === slug
      ? {
          ...p,
          ...(typeof flags.visible === 'boolean' ? { visible: flags.visible } : {}),
          ...(typeof flags.featured === 'boolean' ? { featured: flags.featured } : {}),
        }
      : p,
  );
  const failed = await commit({ ...catalog, products }, catalog);
  return failed ?? { ok: true };
}

export async function reorderProducts(slugs: string[]): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const catalog = await getCatalogFresh();
  const position = new Map(slugs.map((s, i) => [s, i]));
  const products = [...catalog.products].sort(
    (a, b) => (position.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (position.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
  );
  const failed = await commit({ ...catalog, products }, catalog);
  return failed ?? { ok: true };
}

// ─────────────────────────────────────────────
//  Categories
// ─────────────────────────────────────────────

export async function saveCategories(input: Category[]): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const catalog = await getCatalogFresh();

  const categories = input.map(normalizeCategory).filter((c): c is Category => c !== null);
  const slugs = categories.map((c) => c.slug);
  if (categories.length === 0) return { ok: false, error: 'Keep at least one category.' };
  if (new Set(slugs).size !== slugs.length) return { ok: false, error: 'Two categories have the same name/slug.' };

  const orphaned = catalog.products.filter((p) => !slugs.includes(p.category));
  if (orphaned.length) {
    return {
      ok: false,
      error: `Move or delete these products before removing their category: ${orphaned.map((p) => p.name).join(', ')}.`,
    };
  }

  const failed = await commit({ ...catalog, categories }, catalog);
  return failed ?? { ok: true };
}

// ─────────────────────────────────────────────
//  Page images
// ─────────────────────────────────────────────

export async function saveSiteImages(input: Partial<Record<SiteImageKey, CatalogImage | null>>): Promise<ActionResult> {
  const denied = await guard();
  if (denied) return denied;
  const catalog = await getCatalogFresh();

  const siteImages: Catalog['siteImages'] = {};
  for (const slot of SITE_IMAGE_SLOTS) {
    const img = input[slot.key];
    if (img && typeof img.url === 'string' && img.url) {
      siteImages[slot.key] = { url: img.url, alt: (img.alt || slot.label).slice(0, 200) };
    }
  }
  // normalizeCatalog (inside saveCatalog) re-validates every URL.
  const failed = await commit({ ...catalog, siteImages }, catalog);
  return failed ?? { ok: true };
}
