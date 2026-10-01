'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProductImage } from '@/data/products';

export function ProductGallery({ images, badge }: { images: ProductImage[]; badge?: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-panel border border-line bg-surface">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="animate-fade-in object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {badge && (
          <span className="absolute top-4 left-4 rounded-control bg-navy px-2.5 py-1 text-label font-semibold uppercase text-white">
            {badge}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <ul className="grid grid-cols-5 gap-2" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}: ${img.alt}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full overflow-hidden rounded-control border-2 bg-surface transition ${
                  i === active ? 'border-orange' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
