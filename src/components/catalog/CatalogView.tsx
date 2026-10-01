'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import {
  categories,
  COLOURS,
  fabrics,
  products,
  SIZES,
  type CategorySlug,
  type Product,
} from '@/data/products';
import { formatRM } from '@/lib/format';
import { ProductCard } from '@/components/cards/ProductCard';

// ─────────────────────────────────────────────
//  Filter model — all state lives in the URL query string
// ─────────────────────────────────────────────

const GSM_BANDS = [
  { id: 'light', label: 'Lightweight (under 170 GSM)', test: (g: number) => g < 170 },
  { id: 'standard', label: 'Standard (170 – 220 GSM)', test: (g: number) => g >= 170 && g <= 220 },
  { id: 'heavy', label: 'Heavyweight (over 220 GSM)', test: (g: number) => g > 220 },
] as const;

const SORTS = [
  { id: 'popular', label: 'Most popular' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name (A–Z)' },
] as const;

type SortId = (typeof SORTS)[number]['id'];

const PRICE_CEILING = Math.ceil(Math.max(...products.map((p) => p.priceFrom)) / 5) * 5;
const FILTER_COLOURS = Object.values(COLOURS);

type Filters = {
  category: string[];
  fabric: string[];
  gsm: string[];
  colour: string[];
  size: string[];
  maxPrice: number;
  sort: SortId;
};

function list(params: URLSearchParams, key: string): string[] {
  return params.get(key)?.split(',').filter(Boolean) ?? [];
}

function readFilters(params: URLSearchParams): Filters {
  const max = Number(params.get('max'));
  const sort = params.get('sort') as SortId | null;
  return {
    category: list(params, 'category'),
    fabric: list(params, 'fabric'),
    gsm: list(params, 'gsm'),
    colour: list(params, 'colour'),
    size: list(params, 'size'),
    maxPrice: Number.isFinite(max) && max > 0 ? max : PRICE_CEILING,
    sort: sort && SORTS.some((s) => s.id === sort) ? sort : 'popular',
  };
}

function applyFilters(all: Product[], f: Filters): Product[] {
  const result = all.filter(
    (p) =>
      (f.category.length === 0 || f.category.includes(p.category)) &&
      (f.fabric.length === 0 || f.fabric.includes(p.fabric)) &&
      (f.gsm.length === 0 || GSM_BANDS.some((b) => f.gsm.includes(b.id) && b.test(p.gsm))) &&
      (f.colour.length === 0 || p.colours.some((c) => f.colour.includes(c.name))) &&
      (f.size.length === 0 || f.size.some((s) => (p.sizes as string[]).includes(s))) &&
      p.priceFrom <= f.maxPrice,
  );
  const sorters: Record<SortId, (a: Product, b: Product) => number> = {
    popular: (a, b) => b.popularity - a.popularity,
    'price-asc': (a, b) => a.priceFrom - b.priceFrom,
    'price-desc': (a, b) => b.priceFrom - a.priceFrom,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return result.sort(sorters[f.sort]);
}

function activeCount(f: Filters): number {
  return (
    f.category.length + f.fabric.length + f.gsm.length + f.colour.length + f.size.length + (f.maxPrice < PRICE_CEILING ? 1 : 0)
  );
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function CatalogView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const results = useMemo(() => applyFilters(products, filters), [filters]);
  const count = activeCount(filters);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  function toggle(key: keyof Pick<Filters, 'category' | 'fabric' | 'gsm' | 'colour' | 'size'>, value: string) {
    update((p) => {
      const current = list(p, key);
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (next.length) p.set(key, next.join(','));
      else p.delete(key);
    });
  }

  function setSingleCategory(slug: CategorySlug | null) {
    update((p) => (slug ? p.set('category', slug) : p.delete('category')));
  }

  function setMaxPrice(value: number) {
    update((p) => (value >= PRICE_CEILING ? p.delete('max') : p.set('max', String(value))));
  }

  function setSort(value: string) {
    update((p) => (value === 'popular' ? p.delete('sort') : p.set('sort', value)));
  }

  function clearAll() {
    update((p) => {
      ['category', 'fabric', 'gsm', 'colour', 'size', 'max'].forEach((k) => p.delete(k));
    });
  }

  const chips: { label: string; onRemove: () => void }[] = [
    ...filters.category.map((c) => ({
      label: categories.find((x) => x.slug === c)?.name ?? c,
      onRemove: () => toggle('category', c),
    })),
    ...filters.fabric.map((v) => ({ label: v, onRemove: () => toggle('fabric', v) })),
    ...filters.gsm.map((v) => ({
      label: GSM_BANDS.find((b) => b.id === v)?.label.split(' (')[0] ?? v,
      onRemove: () => toggle('gsm', v),
    })),
    ...filters.colour.map((v) => ({ label: v, onRemove: () => toggle('colour', v) })),
    ...filters.size.map((v) => ({ label: `Size ${v}`, onRemove: () => toggle('size', v) })),
    ...(filters.maxPrice < PRICE_CEILING
      ? [{ label: `Up to ${formatRM(filters.maxPrice)}`, onRemove: () => setMaxPrice(PRICE_CEILING) }]
      : []),
  ];

  const panel = (
    <FilterPanel
      filters={filters}
      onToggle={toggle}
      onMaxPrice={setMaxPrice}
      onClear={clearAll}
      activeCount={count}
    />
  );

  const singleCategory = filters.category.length === 1 ? filters.category[0] : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Category pills */}
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Category">
        <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
          <button
            type="button"
            onClick={() => setSingleCategory(null)}
            aria-pressed={filters.category.length === 0}
            className={pillClass(filters.category.length === 0)}
          >
            All ({products.length})
          </button>
          {categories.map((c) => {
            const n = products.filter((p) => p.category === c.slug).length;
            if (!n) return null;
            const active = singleCategory === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setSingleCategory(active ? null : c.slug)}
                aria-pressed={active}
                className={pillClass(active)}
              >
                {c.name} ({n})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 flex flex-col gap-5">
            <div className="rounded-card border border-line bg-white p-5 shadow-card">{panel}</div>
            <div className="rounded-card border border-orange-line bg-orange-soft p-5 text-center">
              <p className="font-display font-bold text-navy">Need custom colours or cuts?</p>
              <p className="mt-1 text-sm text-muted">Fabric, cut and colour made to your brand.</p>
              <Link
                href="/custom-made"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange-ink hover:text-orange"
              >
                Explore custom-made <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-5">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-white p-3 shadow-card">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-control border border-line px-3 text-sm font-semibold text-navy hover:bg-surface lg:hidden"
                aria-haspopup="dialog"
              >
                <SlidersHorizontal aria-hidden className="size-4" /> Filters
                {count > 0 && (
                  <span className="rounded-full bg-orange px-1.5 text-xs text-white tabular-nums">{count}</span>
                )}
              </button>
              <p className="text-sm text-muted" aria-live="polite">
                Showing <strong className="text-navy">{results.length}</strong> of {products.length} styles
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted">
              <span className="hidden sm:inline">Sort by</span>
              <select
                value={filters.sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 rounded-control border border-line bg-white px-3 text-sm font-medium text-navy focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Active filter chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-surface-blue px-3 py-1 text-xs font-semibold text-steel hover:border-steel"
                >
                  {chip.label} <X aria-hidden className="size-3.5" />
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
              <button type="button" onClick={clearAll} className="text-xs font-semibold text-orange-ink hover:underline">
                Clear all
              </button>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line-strong bg-white px-6 py-16 text-center">
              <p className="font-display text-lg font-bold text-navy">No styles match these filters</p>
              <p className="max-w-sm text-sm text-muted">
                Try removing a filter — or tell us what you need and we will source or make it for you.
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

      {/* Mobile filter drawer */}
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
            <div className="flex-1 overflow-y-auto p-5">{panel}</div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-12 w-full rounded-control bg-navy font-semibold text-white hover:bg-steel"
              >
                Show {results.length} style{results.length === 1 ? '' : 's'}
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

// ─────────────────────────────────────────────
//  Filter panel (shared by sidebar + drawer)
// ─────────────────────────────────────────────

function FilterPanel({
  filters,
  onToggle,
  onMaxPrice,
  onClear,
  activeCount,
}: {
  filters: Filters;
  onToggle: (key: 'category' | 'fabric' | 'gsm' | 'colour' | 'size', value: string) => void;
  onMaxPrice: (value: number) => void;
  onClear: () => void;
  activeCount: number;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-display font-bold text-navy">
          <SlidersHorizontal aria-hidden className="size-4" /> Filter products
        </p>
        {activeCount > 0 && (
          <button type="button" onClick={onClear} className="text-xs font-semibold text-orange-ink hover:underline">
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Category">
        {categories.map((c) => {
          const n = products.filter((p) => p.category === c.slug).length;
          if (!n) return null;
          return (
            <Checkbox
              key={c.slug}
              label={c.name}
              meta={String(n)}
              checked={filters.category.includes(c.slug)}
              onChange={() => onToggle('category', c.slug)}
            />
          );
        })}
      </FilterGroup>

      <FilterGroup title="Fabric">
        {fabrics.map((f) => {
          const n = products.filter((p) => p.fabric === f).length;
          if (!n) return null;
          return (
            <Checkbox
              key={f}
              label={f}
              meta={String(n)}
              checked={filters.fabric.includes(f)}
              onChange={() => onToggle('fabric', f)}
            />
          );
        })}
      </FilterGroup>

      <FilterGroup title="Fabric weight (GSM)">
        {GSM_BANDS.map((b) => (
          <Checkbox key={b.id} label={b.label} checked={filters.gsm.includes(b.id)} onChange={() => onToggle('gsm', b.id)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {FILTER_COLOURS.map((c) => {
            const active = filters.colour.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={active}
                onClick={() => onToggle('colour', c.name)}
                className={`size-8 rounded-full border-2 transition ${
                  active ? 'border-orange ring-2 ring-orange/30' : 'border-white shadow-[0_0_0_1px_var(--color-line-strong)]'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="grid grid-cols-5 gap-1.5">
          {SIZES.map((s) => {
            const active = filters.size.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => onToggle('size', s)}
                className={`h-9 rounded-control border text-xs font-semibold ${
                  active ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:bg-surface'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Price from (per piece)">
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={5}
            max={PRICE_CEILING}
            step={1}
            value={filters.maxPrice}
            onChange={(e) => onMaxPrice(Number(e.target.value))}
            className="w-full accent-orange"
            aria-label="Maximum starting price"
          />
          <div className="flex justify-between text-xs text-muted tabular-nums">
            <span>RM 5</span>
            <span className="font-semibold text-navy">
              {filters.maxPrice >= PRICE_CEILING ? 'Any price' : `Up to ${formatRM(filters.maxPrice)}`}
            </span>
          </div>
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-2.5 border-t border-line pt-5 first-of-type:border-t-0 first-of-type:pt-0">
      <legend className="mb-2.5 text-label font-semibold uppercase text-muted">{title}</legend>
      {children}
    </fieldset>
  );
}

function Checkbox({
  label,
  meta,
  checked,
  onChange,
}: {
  label: string;
  meta?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-ink">
      <span className="flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="size-4 rounded border-line-strong accent-navy"
        />
        {label}
      </span>
      {meta && <span className="text-xs text-muted tabular-nums">{meta}</span>}
    </label>
  );
}
