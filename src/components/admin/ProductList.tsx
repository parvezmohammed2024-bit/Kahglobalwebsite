'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Star } from 'lucide-react';
import { reorderProducts, updateProductFlags } from '@/app/admin/actions';
import type { Category, Product } from '@/lib/catalog/types';
import { isPlaceholder } from './ImageUploader';

export function ProductList({ products, categories }: { products: Product[]; categories: Category[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const names = useMemo(() => Object.fromEntries(categories.map((c) => [c.slug, c.name])), [categories]);
  const shown = filter ? products.filter((p) => p.category === filter) : products;

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError('');
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setError(result.error ?? 'Something went wrong.');
      router.refresh();
    });
  }

  function move(slug: string, delta: number) {
    const order = products.map((p) => p.slug);
    const i = order.indexOf(slug);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= order.length) return;
    [order[i], order[j]] = [order[j], order[i]];
    run(() => reorderProducts(order));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-headline-md font-bold text-navy">Products</h1>
          <p className="text-sm text-muted">
            {products.length} products · use the arrows to change the order · changes go live within seconds
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center gap-2 rounded-control bg-orange px-4 text-sm font-semibold text-white hover:bg-orange-hover"
        >
          <Plus className="size-4" /> Add product
        </Link>
      </div>

      <label className="flex items-center gap-2 text-sm text-muted">
        Category
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 rounded-control border border-line bg-white px-3 text-sm text-navy"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p role="alert" className="rounded-control bg-red-50 px-4 py-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      <ul className={`flex flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-card ${pending ? 'opacity-60' : ''}`}>
        {shown.map((p) => {
          const cover = p.images[0];
          const index = products.indexOf(p);
          return (
            <li key={p.slug} className="flex items-center gap-3 p-3 md:gap-4 md:p-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-control bg-surface md:size-16">
                {cover && <Image src={cover.url} alt="" fill sizes="64px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/products/${p.slug}`} className="font-semibold text-navy hover:underline">
                  {p.name}
                </Link>
                <p className="truncate text-xs text-muted">
                  {names[p.category] ?? p.category} · MOQ {p.moq} · {p.addOns.length} add-ons
                  {cover && isPlaceholder(cover) && <span className="ml-1 text-orange-ink">· no photo yet</span>}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <IconButton
                  label={p.featured ? 'Remove from home page' : 'Feature on home page'}
                  onClick={() => run(() => updateProductFlags(p.slug, { featured: !p.featured }))}
                  active={p.featured}
                >
                  <Star className={`size-4 ${p.featured ? 'fill-current' : ''}`} />
                </IconButton>
                <IconButton
                  label={p.visible ? 'Hide from website' : 'Show on website'}
                  onClick={() => run(() => updateProductFlags(p.slug, { visible: !p.visible }))}
                  active={!p.visible}
                >
                  {p.visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </IconButton>
                {!filter && (
                  <>
                    <IconButton label="Move up" onClick={() => move(p.slug, -1)} disabled={index === 0}>
                      <ArrowUp className="size-4" />
                    </IconButton>
                    <IconButton label="Move down" onClick={() => move(p.slug, 1)} disabled={index === products.length - 1}>
                      <ArrowDown className="size-4" />
                    </IconButton>
                  </>
                )}
                <Link
                  href={`/admin/products/${p.slug}`}
                  aria-label={`Edit ${p.name}`}
                  className="inline-flex size-9 items-center justify-center rounded-control text-navy hover:bg-surface"
                >
                  <Pencil className="size-4" />
                </Link>
              </div>
            </li>
          );
        })}
        {shown.length === 0 && <li className="p-6 text-center text-sm text-muted">No products in this category yet.</li>}
      </ul>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex size-9 items-center justify-center rounded-control hover:bg-surface disabled:opacity-30 ${
        active ? 'text-orange-ink' : 'text-navy'
      }`}
    >
      {children}
    </button>
  );
}
