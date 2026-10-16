import { getCatalogFresh } from '@/lib/catalog/store';
import { ProductList } from '@/components/admin/ProductList';

export const metadata = { title: 'Products' };

export default async function AdminProductsPage() {
  const catalog = await getCatalogFresh();
  return <ProductList products={catalog.products} categories={catalog.categories} />;
}
