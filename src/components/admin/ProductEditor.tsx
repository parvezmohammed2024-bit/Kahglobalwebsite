'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition, type ReactNode } from 'react';
import { ArrowLeft, ExternalLink, LoaderCircle, Save, Trash2 } from 'lucide-react';
import { deleteProduct, saveProduct } from '@/app/admin/actions';
import { slugify } from '@/lib/catalog/normalize';
import { ADD_ONS, type AddOnId, type Category, type Product } from '@/lib/catalog/types';
import { ImageUploader, isPlaceholder } from './ImageUploader';

const input =
  'h-11 w-full rounded-control border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none';

const toLines = (list: string[]) => list.join('\n');
const fromLines = (text: string) =>
  text
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean);
const toCsv = (list: string[]) => list.join(', ');
const fromCsv = (text: string) =>
  text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export function ProductEditor({
  product,
  categories,
  isNew,
}: {
  product: Product;
  categories: Category[];
  isNew: boolean;
}) {
  const router = useRouter();
  const [p, setP] = useState<Product>({ ...product, images: product.images.filter((i) => !isPlaceholder(i)) });
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [colours, setColours] = useState(toCsv(product.colours));
  const [sizes, setSizes] = useState(toCsv(product.sizes));
  const [features, setFeatures] = useState(toLines(product.features));
  const [price, setPrice] = useState(product.priceFrom ? String(product.priceFrom) : '');
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof Product>(key: K, value: Product[K]) => setP((prev) => ({ ...prev, [key]: value }));

  function onName(name: string) {
    setP((prev) => ({ ...prev, name, slug: slugTouched ? prev.slug : slugify(name) }));
  }

  function toggleAddOn(id: AddOnId) {
    set('addOns', p.addOns.includes(id) ? p.addOns.filter((a) => a !== id) : [...p.addOns, id]);
  }

  function save() {
    setMessage(null);
    const payload: Product = {
      ...p,
      colours: fromCsv(colours),
      sizes: fromCsv(sizes),
      features: fromLines(features),
      priceFrom: price.trim() ? Number(price) : null,
    };
    startTransition(async () => {
      const result = await saveProduct(payload, isNew ? null : product.slug);
      if (!result.ok) {
        setMessage({ type: 'error', text: result.error });
        return;
      }
      setMessage({ type: 'ok', text: 'Saved. The website updates within a few seconds.' });
      if (result.slug && (isNew || result.slug !== product.slug)) {
        router.replace(`/admin/products/${result.slug}`);
      }
      router.refresh();
    });
  }

  function remove() {
    if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteProduct(product.slug);
      if (!result.ok) {
        setMessage({ type: 'error', text: result.error });
        return;
      }
      router.replace('/admin');
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-navy">
          <ArrowLeft className="size-4" /> All products
        </Link>
        {!isNew && (
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-navy"
          >
            View on website <ExternalLink className="size-4" />
          </Link>
        )}
      </div>

      <h1 className="font-display text-headline-md font-bold text-navy">{isNew ? 'Add product' : `Edit: ${product.name}`}</h1>

      <Section title="Basics">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Product name *">
            <input className={input} value={p.name} onChange={(e) => onName(e.target.value)} required />
          </Field>
          <Field label="Category *">
            <select className={input} value={p.category} onChange={(e) => set('category', e.target.value)} required>
              <option value="">Choose…</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                  {c.visible ? '' : ' (hidden)'}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Web address (URL slug)" hint={`/products/${p.slug || '…'}`}>
            <input
              className={input}
              value={p.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set('slug', slugify(e.target.value));
              }}
            />
          </Field>
          <Field label="Short summary" hint="Shown on product cards (1 sentence)">
            <input className={input} value={p.summary} onChange={(e) => set('summary', e.target.value)} maxLength={300} />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            className={`${input} h-32 py-2.5`}
            value={p.description}
            onChange={(e) => set('description', e.target.value)}
            maxLength={2000}
          />
        </Field>
      </Section>

      <Section title="Photos" description="The first photo is the cover shown on product cards. Add a short description to each photo.">
        <ImageUploader
          images={p.images}
          onChange={(images) => set('images', images)}
          folder={`products/${p.slug || 'new'}`}
          defaultAlt={p.name}
          max={8}
        />
      </Section>

      <Section title="Order details">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Minimum order (MOQ) *" hint="pieces">
            <input
              className={input}
              inputMode="numeric"
              value={String(p.moq)}
              onChange={(e) => set('moq', Number(e.target.value.replace(/[^\d]/g, '')) || 0)}
            />
          </Field>
          <Field label="Lead time" hint="e.g. 2–3 weeks after approval">
            <input className={input} value={p.leadTime} onChange={(e) => set('leadTime', e.target.value)} />
          </Field>
          <Field label="Price from (RM, optional)" hint="Leave empty for “Price on quotation”">
            <input
              className={input}
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))}
              placeholder="On quotation"
            />
          </Field>
        </div>
      </Section>

      <Section title="Add-ons available for this product" description="Customers can pick these when requesting a quote. All are priced on quotation.">
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {ADD_ONS.map((a) => {
            const checked = p.addOns.includes(a.id);
            return (
              <label
                key={a.id}
                className={`flex cursor-pointer items-start gap-3 rounded-control border p-3 text-sm ${
                  checked ? 'border-orange bg-orange-soft' : 'border-line bg-white hover:bg-surface'
                }`}
              >
                <input type="checkbox" checked={checked} onChange={() => toggleAddOn(a.id)} className="mt-0.5 size-4 accent-orange" />
                <span>
                  <span className="block font-semibold text-navy">{a.name}</span>
                  <span className="text-xs text-muted">{a.description}</span>
                </span>
              </label>
            );
          })}
        </div>
      </Section>

      <Section title="Specifications">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Fabric">
            <input className={input} value={p.fabric} onChange={(e) => set('fabric', e.target.value)} />
          </Field>
          <Field label="Colours" hint="Separate with commas">
            <input className={input} value={colours} onChange={(e) => setColours(e.target.value)} placeholder="White, Navy, Custom" />
          </Field>
          <Field label="Sizes" hint="Separate with commas">
            <input className={input} value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="Kids 4–16, S, M, L, XL" />
          </Field>
          <Field label="Key features" hint="One per line">
            <textarea className={`${input} h-28 py-2.5`} value={features} onChange={(e) => setFeatures(e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Visibility">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <input type="checkbox" checked={p.visible} onChange={(e) => set('visible', e.target.checked)} className="size-4 accent-navy" />
            Show on website
          </label>
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <input type="checkbox" checked={p.featured} onChange={(e) => set('featured', e.target.checked)} className="size-4 accent-navy" />
            Feature on home page
          </label>
        </div>
      </Section>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div aria-live="polite" className="min-h-5 text-sm">
          {message && <span className={message.type === 'ok' ? 'text-emerald-700' : 'font-medium text-danger'}>{message.text}</span>}
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={remove}
              disabled={pending}
              className="inline-flex h-11 items-center gap-2 rounded-control border border-red-200 px-4 text-sm font-semibold text-danger hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="size-4" /> Delete
            </button>
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center gap-2 rounded-control bg-orange px-5 text-sm font-semibold text-white hover:bg-orange-hover disabled:opacity-60"
          >
            {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isNew ? 'Create product' : 'Save changes'}
          </button>
        </div>
      </div>
    </form>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-card border border-line bg-white p-5 shadow-card md:p-6">
      <div>
        <h2 className="font-display text-lg font-bold text-navy">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex flex-wrap items-baseline justify-between gap-x-2 text-sm font-semibold text-navy">
        {label}
        {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
