import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/data/products';

export function CategoryCard({ category, count }: { category: Category; count?: number }) {
  return (
    <Link
      href={`/ready-made?category=${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 md:p-4">
        <h3 className="font-display text-sm font-bold text-navy group-hover:text-orange-ink md:text-base">{category.name}</h3>
        <p className="text-xs text-muted md:text-sm">{category.blurb}</p>
        {count !== undefined && count > 0 && (
          <p className="mt-auto pt-1 text-xs font-semibold text-steel">
            {count} style{count === 1 ? '' : 's'} →
          </p>
        )}
      </div>
    </Link>
  );
}
