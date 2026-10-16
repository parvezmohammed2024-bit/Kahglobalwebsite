'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { LoaderCircle, Save } from 'lucide-react';
import { saveSiteImages } from '@/app/admin/actions';
import { SITE_IMAGE_SLOTS, type Catalog, type CatalogImage, type SiteImageKey } from '@/lib/catalog/types';
import { ImageUploader } from './ImageUploader';

type Slots = Partial<Record<SiteImageKey, CatalogImage | null>>;

export function SiteImagesEditor({ siteImages }: { siteImages: Catalog['siteImages'] }) {
  const router = useRouter();
  const [images, setImages] = useState<Slots>(siteImages);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setMessage(null);
    startTransition(async () => {
      const result = await saveSiteImages(images);
      if (!result.ok) setMessage({ type: 'error', text: result.error });
      else setMessage({ type: 'ok', text: 'Page images saved.' });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-display text-headline-md font-bold text-navy">Page images</h1>
        <p className="text-sm text-muted">Photos used on the home, custom-made, printing, industries and about pages. Empty slots show a neutral placeholder.</p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SITE_IMAGE_SLOTS.map((slot) => {
          const current = images[slot.key];
          return (
            <li key={slot.key} className="flex flex-col gap-3 rounded-card border border-line bg-white p-4 shadow-card">
              <div>
                <p className="font-semibold text-navy">{slot.label}</p>
                <p className="text-xs text-muted">{slot.hint}</p>
              </div>
              <ImageUploader
                images={current ? [current] : []}
                onChange={(list) => setImages((prev) => ({ ...prev, [slot.key]: list[0] ?? null }))}
                folder={`pages/${slot.key}`}
                defaultAlt={slot.label.split('— ')[1] ?? slot.label}
                max={1}
                aspect="aspect-[4/3]"
              />
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
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />} Save page images
        </button>
      </div>
    </div>
  );
}
