import { getCatalogFresh } from '@/lib/catalog/store';
import { CategoriesEditor } from '@/components/admin/CategoriesEditor';

export const metadata = { title: 'Categories' };

export default async function AdminCategoriesPage() {
  const catalog = await getCatalogFresh();
  const counts: Record<string, number> = {};
  for (const p of catalog.products) counts[p.category] = (counts[p.category] ?? 0) + 1;
  return <CategoriesEditor categories={catalog.categories} productCounts={counts} />;
}
