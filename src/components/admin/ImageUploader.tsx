'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { uploadPresigned } from '@vercel/blob/client';
import { ArrowLeft, ArrowRight, ImagePlus, LoaderCircle, Trash2 } from 'lucide-react';
import { PLACEHOLDER_IMAGE, type CatalogImage } from '@/lib/catalog/types';

const MAX_SIDE = 2000;

/** Downscale large photos and convert to WebP in the browser before uploading. */
async function prepareImage(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85));
    if (!blob || (blob.size >= file.size && scale === 1)) return file;
    const name = file.name.replace(/\.[^.]+$/, '') || 'image';
    return new File([blob], `${name}.webp`, { type: 'image/webp' });
  } catch {
    return file;
  }
}

function cleanName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'image'
  );
}

export function isPlaceholder(img: CatalogImage) {
  return img.url === PLACEHOLDER_IMAGE;
}

/**
 * Upload / order / remove images. `max` = 1 gives a single-image picker.
 * Uploads go straight to Vercel Blob; changes are kept when the parent form is saved.
 */
export function ImageUploader({
  images,
  onChange,
  folder,
  defaultAlt,
  max = 8,
  aspect = 'aspect-[4/5]',
}: {
  images: CatalogImage[];
  onChange: (images: CatalogImage[]) => void;
  folder: string;
  defaultAlt: string;
  max?: number;
  aspect?: string;
}) {
  const [busy, setBusy] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const real = images.filter((i) => !isPlaceholder(i));
  const canAdd = real.length < max;

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setError('');
    const room = max === 1 ? 1 : Math.max(0, max - real.length);
    const picked = Array.from(files).slice(0, room);
    setBusy(picked.length);
    const uploaded: CatalogImage[] = [];
    for (const original of picked) {
      try {
        if (!original.type.startsWith('image/')) throw new Error(`${original.name} is not an image.`);
        const file = await prepareImage(original);
        const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
        const blob = await uploadPresigned(`uploads/${folder}/${cleanName(original.name)}.${ext}`, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload',
        });
        uploaded.push({ url: blob.url, alt: defaultAlt });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      } finally {
        setBusy((n) => n - 1);
      }
    }
    if (uploaded.length) onChange(max === 1 ? uploaded.slice(0, 1) : [...real, ...uploaded]);
    if (inputRef.current) inputRef.current.value = '';
  }

  function move(index: number, delta: number) {
    const next = [...real];
    const [item] = next.splice(index, 1);
    next.splice(index + delta, 0, item);
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      {real.length > 0 && (
        <ul className={`grid gap-3 ${max === 1 ? 'max-w-xs grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
          {real.map((img, i) => (
            <li key={img.url} className="flex flex-col gap-2 rounded-card border border-line bg-white p-2">
              <div className={`relative overflow-hidden rounded-control bg-surface ${aspect}`}>
                <Image src={img.url} alt={img.alt} fill sizes="240px" className="object-cover" />
                {i === 0 && max > 1 && (
                  <span className="absolute top-2 left-2 rounded-full bg-navy px-2 py-0.5 text-[0.65rem] font-semibold text-white">
                    Cover
                  </span>
                )}
              </div>
              <input
                value={img.alt}
                onChange={(e) => onChange(real.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
                placeholder="Describe the photo (alt text)"
                aria-label="Image description"
                className="h-9 rounded-control border border-line px-2 text-xs focus:border-navy focus:outline-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {max > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label="Move left"
                        className="inline-flex size-8 items-center justify-center rounded-control text-navy hover:bg-surface disabled:opacity-30"
                      >
                        <ArrowLeft className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, 1)}
                        disabled={i === real.length - 1}
                        aria-label="Move right"
                        className="inline-flex size-8 items-center justify-center rounded-control text-navy hover:bg-surface disabled:opacity-30"
                      >
                        <ArrowRight className="size-4" />
                      </button>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onChange(real.filter((_, j) => j !== i))}
                  aria-label="Remove image"
                  className="inline-flex size-8 items-center justify-center rounded-control text-danger hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(canAdd || max === 1) && (
        <label
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-card border-2 border-dashed border-line-strong bg-surface px-4 py-6 text-sm font-semibold text-navy hover:border-steel ${
            busy ? 'pointer-events-none opacity-70' : ''
          }`}
        >
          {busy ? <LoaderCircle className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
          {busy
            ? `Uploading ${busy} image${busy === 1 ? '' : 's'}…`
            : max === 1
              ? real.length
                ? 'Replace photo'
                : 'Upload photo'
              : 'Upload photos'}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple={max > 1}
            className="sr-only"
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>
      )}
      <p className="text-xs text-muted">JPG, PNG or WebP. Large photos are resized automatically.</p>
      {error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
