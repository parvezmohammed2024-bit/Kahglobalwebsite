import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';
import { getCatalog } from '@/lib/catalog/store';
import { visibleProducts } from '@/lib/catalog/query';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalog();
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/custom-made', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/printing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/request-quote', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...visibleProducts(catalog).map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
