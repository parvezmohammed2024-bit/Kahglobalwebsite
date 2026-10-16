import { notFound } from 'next/navigation';
import { getCatalogFresh } from '@/lib/catalog/store';
import type { Product } from '@/lib/catalog/types';
import { ProductEditor } from '@/components/admin/ProductEditor';

export const metadata = { title: 'Edit product' };

type Props = { params: Promise<{ slug: string }> };

export default async function AdminProductPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCatalogFresh();
  const isNew = slug === 'new';

  const product: Product | undefined = isNew
    ? {
        slug: '',
        name: '',
        category: catalog.categories[0]?.slug ?? '',
        summary: '',
        description: '',
        fabric: '',
        colours: [],
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        features: [],
        moq: 30,
        leadTime: '2–3 weeks after approval',
        addOns: ['embroidery'],
        priceFrom: null,
        images: [],
        featured: false,
        visible: true,
      }
    : catalog.products.find((p) => p.slug === slug);

  if (!product) notFound();
  return <ProductEditor key={product.slug || 'new'} product={product} categories={catalog.categories} isNew={isNew} />;
}
