'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { ADD_ONS, type AddOnId, type Category, type Product } from '@/lib/catalog/types';
import { ProductCard } from '@/components/cards/ProductCard';

/** Filters live in the URL: ?category=…&addon=embroidery,dtf&q=… */

function list(params: URLSearchParams, key: string): string[] {
  return params.get(key)?.split(',').filter(Boolean) ?? [];
}

export function CatalogView({ categories, products }: { categories: Category[]; products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = searchParams.get('category') ?? '';
  const addons = useMemo(() => list(new URLSearchParams(searchParams.toString()), 'addon'), [searchParams]);
  const query = searchParams.get('q') ?? '';

  const names = useMemo(() => Object.fromEntries(categories.map((c) => [c.slug, c.name])), [categories]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!category || p.category === category) &&
        addons.every((a) => p.addOns.includes(a as AddOnId)) &&
        (!q || `${p.name} ${p.summary} ${p.fabric} ${names[p.category] ?? ''}`.toLowerCase().includes(q)),
    );
  }, [products, category, addons, query, names]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  function update(mutate: (p: URLSearchParams) => void) {
    const next = new URLSearchParams(searchParams.toString());
    mutate(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const setCategory = (slug: string) => update((p) => (slug ? p.set('category', slug) : p.delete('category')));
  const setQuery = (value: string) => update((p) => (value ? p.set('q', value) : p.delete('q')));
  const toggleAddOn = (id: string) =>
    update((p) => {
      const next = addons.includes(id) ? addons.filter((a) => a !== id) : [...addons, id];
      if (next.length) p.set('addon', next.join(','));
      else p.delete('addon');
    });
  const clearAll = () => update((p) => ['category', 'addon', 'q'].forEach((k) => p.delete(k)));

  const activeCount = (category ? 1 : 0) + addons.length + (query ? 1 : 0);

  const addOnFilters = (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 text-label font-semibold uppercase text-muted">Must include</legend>
      {ADD_ONS.map((a) => (
        <label key={a.id} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
          <input
            type="checkbox"
            checked={addons.includes(a.id)}
            onChange={() => toggleAddOn(a.id)}
            className="mt-0.5 size-4 accent-navy"
          />
          <span>
            <span className="font-medium">{a.name}</span>
            <span className="block text-xs text-muted">{a.description}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Category pills */}
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Category">
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          <button type="button" onClick={() => setCategory('')} aria-pressed={!category} className={pillClass(!category)}>
            All ({products.length})
          </button>
          {categories.map((c) => {
            const n = products.filter((p) => p.category === c.slug).length;
            if (!n) return null;
            const active = category === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCategory(active ? '' : c.slug)}
                aria-pressed={active}
                className={pillClass(active)}
              >
                {c.name} ({n})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 flex flex-col gap-5">
            <div className="rounded-card border border-line bg-white p-5 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <p className="flex items-center gap-2 font-display font-bold text-navy">
                  <SlidersHorizontal aria-hidden className="size-4" /> Filters
                </p>
                {activeCount > 0 && (
                  <button type="button" onClick={clearAll} className="text-xs font-semibold text-orange-ink hover:underline">
                    Clear all
                  </button>
                )}
              </div>
              {addOnFilters}
            </div>
            <div className="rounded-card border border-orange-line bg-orange-soft p-5 text-center">
              <p className="font-display font-bold text-navy">Have your own design?</p>
              <p className="mt-1 text-sm text-muted">We manufacture to your fabric, cut and colours.</p>
              <Link
                href="/custom-made"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange-ink hover:text-orange"
              >
                Custom-made uniforms <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3 rounded-card border border-line bg-white p-3 shadow-card">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-control border border-line px-3 text-sm font-semibold text-navy hover:bg-surface lg:hidden"
              aria-haspopup="dialog"
            >
              <SlidersHorizontal aria-hidden className="size-4" /> Filters
              {addons.length > 0 && (
                <span className="rounded-full bg-orange px-1.5 text-xs text-white tabular-nums">{addons.length}</span>
              )}
            </button>
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search products</span>
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. polo, baju kurung, chef…"
                className="h-10 w-full rounded-control border border-line bg-white pr-3 pl-9 text-sm text-ink focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
              />
            </label>
            <p className="text-sm text-muted" aria-live="polite">
              <strong className="text-navy">{results.length}</strong> of {products.length} products
            </p>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} categoryName={names[p.category] ?? ''} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line-strong bg-white px-6 py-16 text-center">
              <p className="font-display text-lg font-bold text-navy">No products match</p>
              <p className="max-w-sm text-sm text-muted">
                Try removing a filter — or tell us what you need and we will manufacture it for you.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={clearAll}
                  className="h-10 rounded-control border border-line px-4 text-sm font-semibold text-navy hover:bg-surface"
                >
                  Clear filters
                </button>
                <Link
                  href="/request-quote"
                  className="inline-flex h-10 items-center rounded-control bg-orange px-4 text-sm font-semibold text-white hover:bg-orange-hover"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            className="absolute inset-0 animate-fade-in bg-navy-950/60"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm animate-slide-in-left flex-col bg-white shadow-overlay">
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <p className="font-display text-lg font-bold text-navy">Filters</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-control text-navy hover:bg-surface"
                aria-label="Close filters"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{addOnFilters}</div>
            <div className="flex gap-3 border-t border-line p-4">
              <button
                type="button"
                onClick={clearAll}
                className="h-12 flex-1 rounded-control border border-line font-semibold text-navy hover:bg-surface"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-12 flex-[2] rounded-control bg-navy font-semibold text-white hover:bg-steel"
              >
                Show {results.length} product{results.length === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function pillClass(active: boolean) {
  return `h-9 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
    active ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-line-strong hover:bg-surface'
  }`;
}
