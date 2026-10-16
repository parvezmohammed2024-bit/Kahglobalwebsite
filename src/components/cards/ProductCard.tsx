import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { addOnName, type Product } from '@/lib/catalog/types';
import { formatRM } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';

export function ProductCard({
  product,
  categoryName,
  sizes = '(min-width: 1280px) 300px, (min-width: 768px) 33vw, 100vw',
}: {
  product: Product;
  categoryName: string;
  sizes?: string;
}) {
  const href = `/products/${product.slug}`;
  const shownAddOns = product.addOns.slice(0, 3);
  const extra = product.addOns.length - shownAddOns.length;
  const cover = product.images[0];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Image
          src={cover.url}
          alt={cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3">
          <Badge tone="navy">MOQ {product.moq} pcs</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <p className="text-xs font-semibold text-steel">{categoryName}</p>
        <h3 className="-mt-1.5 font-display text-base font-bold text-navy md:text-lg">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{product.summary}</p>

        {product.addOns.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Available add-ons">
            {shownAddOns.map((id) => (
              <li key={id} className="rounded-full bg-surface-blue px-2 py-0.5 text-[0.7rem] font-semibold text-steel">
                {addOnName(id)}
              </li>
            ))}
            {extra > 0 && <li className="px-1 py-0.5 text-[0.7rem] font-semibold text-muted">+{extra} more</li>}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3">
          <p className="text-sm font-semibold text-navy tabular-nums">
            {product.priceFrom ? `From ${formatRM(product.priceFrom)}` : 'Price on quotation'}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-ink">
            Details <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
