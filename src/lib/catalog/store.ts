import { cache } from 'react';
import { del, list, put } from '@vercel/blob';
import { DEFAULT_CATALOG } from './defaults';
import { normalizeCatalog } from './normalize';
import type { Catalog } from './types';

/*
 * Server-only catalogue storage in Vercel Blob.
 *
 * Every save writes a new JSON file under catalog/ (random suffix → fresh URL,
 * so CDN caching never serves stale data) and keeps the most recent versions
 * as a backup history. Reads pick the newest file.
 *
 * Without BLOB_READ_WRITE_TOKEN (local dev, or before the Blob store is
 * connected in Vercel) the built-in DEFAULT_CATALOG is used.
 */

const PREFIX = 'catalog/catalog-';
const KEEP_VERSIONS = 15;

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function listVersions() {
  const { blobs } = await list({ prefix: PREFIX, limit: 1000 });
  return [...blobs].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

async function loadCatalog(): Promise<Catalog> {
  if (!blobConfigured()) return DEFAULT_CATALOG;
  try {
    const [latest] = await listVersions();
    if (!latest) return DEFAULT_CATALOG;
    const res = await fetch(latest.url, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return normalizeCatalog(await res.json());
  } catch (err) {
    console.error('[catalog] Failed to load catalogue from Blob, using defaults:', err);
    return DEFAULT_CATALOG;
  }
}

/** Current catalogue (deduplicated per request). */
export const getCatalog = cache(loadCatalog);

/** Uncached read for the admin panel, so edits always start from the latest save. */
export async function getCatalogFresh(): Promise<Catalog> {
  return loadCatalog();
}

export async function saveCatalog(catalog: Catalog): Promise<Catalog> {
  if (!blobConfigured()) {
    throw new Error('Image & product storage is not connected. Add a Vercel Blob store to this project (see README).');
  }
  const data = normalizeCatalog({ ...catalog, updatedAt: new Date().toISOString() });
  await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/json',
  });

  // Prune old versions (best effort).
  try {
    const old = (await listVersions()).slice(KEEP_VERSIONS).map((b) => b.url);
    if (old.length) await del(old);
  } catch (err) {
    console.error('[catalog] Failed to prune old versions:', err);
  }
  return data;
}

const BLOB_HOST_SUFFIX = '.public.blob.vercel-storage.com';

/** Delete uploaded images that are no longer referenced (only our Blob files). */
export async function deleteImages(urls: string[]) {
  const ours = urls.filter((u) => {
    try {
      return new URL(u).hostname.endsWith(BLOB_HOST_SUFFIX) && new URL(u).pathname.startsWith('/uploads/');
    } catch {
      return false;
    }
  });
  if (!ours.length) return;
  try {
    await del(ours);
  } catch (err) {
    console.error('[catalog] Failed to delete images:', err);
  }
}
