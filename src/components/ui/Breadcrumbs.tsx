import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_URL } from '@/data/site';
import { JsonLd } from './JsonLd';

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className={`flex flex-wrap items-center gap-1.5 ${light ? 'text-sky' : 'text-muted'}`}>
          {all.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
              {item.href && i < all.length - 1 ? (
                <Link href={item.href} className={light ? 'hover:text-white' : 'hover:text-navy'}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={`font-medium ${light ? 'text-white' : 'text-navy'}`}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${SITE_URL}${item.href === '/' ? '' : item.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
