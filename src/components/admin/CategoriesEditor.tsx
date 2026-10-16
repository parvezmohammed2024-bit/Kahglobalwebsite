'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { ArrowDown, ArrowUp, LoaderCircle, Plus, Save, Trash2 } from 'lucide-react';
import { saveCategories } from '@/app/admin/actions';
import { slugify } from '@/lib/catalog/normalize';
import { PLACEHOLDER_IMAGE, type Category } from '@/lib/catalog/types';
import { ImageUploader } from './ImageUploader';

const input =
  'h-10 w-full rounded-control border border-line bg-white px-3 text-sm text-ink focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none';

export function CategoriesEditor({ categories, productCounts }: { categories: Category[]; productCounts: Record<string, number> }) {
  const router = useRouter();
  const [list, setList] = useState<Category[]>(categories);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const update = (i: number, patch: Partial<Category>) => setList((l) => l.map((c, j) => (j === i ? { ...c, ...patch } : c)));

  function move(i: number, delta: number) {
    setList((l) => {
      const next = [...l];
      const [item] = next.splice(i, 1);
      next.splice(i + delta, 0, item);
      return next;
    });
  }

  function add() {
    setList((l) => [
      ...l,
      { slug: '', name: '', blurb: '', image: { url: PLACEHOLDER_IMAGE, alt: '' }, visible: true },
    ]);
  }

  function save() {
    setMessage(null);
    const payload = list.map((c) => ({ ...c, slug: c.slug || slugify(c.name), image: { ...c.image, alt: c.image.alt || c.name } }));
    startTransition(async () => {
      const result = await saveCategories(payload);
      if (!result.ok) setMessage({ type: 'error', text: result.error });
      else setMessage({ type: 'ok', text: 'Categories saved.' });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-headline-md font-bold text-navy">Categories</h1>
          <p className="text-sm text-muted">Name, short description and photo for each category. The order here is the order on the website.</p>
        </div>
        <button
          type="button"
          onClick={add}
          className="inline-flex h-10 items-center gap-2 rounded-control border border-line bg-white px-4 text-sm font-semibold text-navy hover:bg-surface"
        >
          <Plus className="size-4" /> Add category
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {list.map((c, i) => {
          const count = productCounts[c.slug] ?? 0;
          return (
            <li key={c.slug || `new-${i}`} className="grid gap-5 rounded-card border border-line bg-white p-5 shadow-card md:grid-cols-[14rem_1fr]">
              <ImageUploader
                images={[c.image]}
                onChange={(images) => update(i, { image: images[0] ?? { url: PLACEHOLDER_IMAGE, alt: c.name } })}
                folder={`categories/${c.slug || 'new'}`}
                defaultAlt={c.name}
                max={1}
                aspect="aspect-[4/3]"
              />
              <div className="flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
                    Name
                    <input className={input} value={c.name} onChange={(e) => update(i, { name: e.target.value })} />
                  </label>
                  <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy">
                    Short description
                    <input className={input} value={c.blurb} onChange={(e) => update(i, { blurb: e.target.value })} maxLength={160} />
                  </label>
                </div>
                <p className="text-xs text-muted">
                  Web address: /products?category={c.slug || slugify(c.name) || '…'} · {count} product{count === 1 ? '' : 's'}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-ink">
                    <input type="checkbox" checked={c.visible} onChange={(e) => update(i, { visible: e.target.checked })} className="size-4 accent-navy" />
                    Show on website
                  </label>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="inline-flex size-9 items-center justify-center rounded-control text-navy hover:bg-surface disabled:opacity-30">
                      <ArrowUp className="size-4" />
                    </button>
                    <button type="button" onClick={() => move(i, 1)} disabled={i === list.length - 1} aria-label="Move down" className="inline-flex size-9 items-center justify-center rounded-control text-navy hover:bg-surface disabled:opacity-30">
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setList((l) => l.filter((_, j) => j !== i))}
                      disabled={count > 0}
                      title={count > 0 ? 'Move or delete its products first' : 'Remove category'}
                      aria-label="Remove category"
                      className="inline-flex size-9 items-center justify-center rounded-control text-danger hover:bg-red-50 disabled:opacity-30"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div aria-live="polite" className="min-h-5 text-sm">
          {message && <span className={message.type === 'ok' ? 'text-emerald-700' : 'font-medium text-danger'}>{message.text}</span>}
        </div>
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="inline-flex h-11 items-center gap-2 rounded-control bg-orange px-5 text-sm font-semibold text-white hover:bg-orange-hover disabled:opacity-60"
        >
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />} Save categories
        </button>
      </div>
    </div>
  );
}
