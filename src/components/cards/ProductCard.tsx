import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { getCategory } from '@/data/products';
import { formatRM } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';

export function ColourDots({ colours, max = 6 }: { colours: Product['colours']; max?: number }) {
  const shown = colours.slice(0, max);
  const extra = colours.length - shown.length;
  return (
    <div className="flex items-center gap-1.5" aria-label={`${colours.length} colours available`}>
      {shown.map((c) => (
        <span
          key={c.name}
          title={c.name}
          className="size-3.5 rounded-full border border-black/10 shadow-inner"
          style={{ backgroundColor: c.hex }}
        />
      ))}
      {extra > 0 && <span className="text-xs font-medium text-muted">+{extra}</span>}
    </div>
  );
}

export function ProductCard({ product, sizes = '(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw' }: { product: Product; sizes?: string }) {
  const bestTier = product.priceTiers[product.priceTiers.length - 1];
  const href = `/ready-made/${product.slug}`;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          <Badge tone="navy">{product.gsm} GSM</Badge>
          {product.badges?.map((b) => (
            <Badge key={b} tone="accent">
              {b}
            </Badge>
          ))}
        </div>
        {product.inStock && (
          <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2 py-0.5 text-[0.7rem] font-semibold text-emerald-700 shadow-sm">
            Ready stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-center justify-between gap-2">
          <ColourDots colours={product.colours} />
          <span className="text-xs text-muted">{getCategory(product.category).name}</span>
        </div>
        <h3 className="font-display text-base font-bold text-navy md:text-lg">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{product.composition}</p>

        <div className="mt-auto flex items-end justify-between gap-3 rounded-control bg-surface p-3">
          <div>
            <p className="text-label font-semibold uppercase text-muted">From</p>
            <p className="font-display text-lg font-extrabold text-navy tabular-nums">{formatRM(product.priceFrom)}</p>
          </div>
          <p className="text-right text-xs text-muted tabular-nums">
            {formatRM(bestTier.price)}
            <br />
            for {bestTier.minQty}+ pcs
          </p>
        </div>
        <span className="inline-flex h-10 items-center justify-center gap-2 rounded-control bg-navy text-sm font-semibold text-white transition-colors group-hover:bg-steel">
          View options & quote <ArrowRight aria-hidden className="size-4" />
        </span>
      </div>
    </article>
  );
}
