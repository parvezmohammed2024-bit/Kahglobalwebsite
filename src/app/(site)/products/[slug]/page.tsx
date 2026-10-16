import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Clock, Factory, Package, Ruler, Shirt } from 'lucide-react';
import { SITE_URL } from '@/data/site';
import { getCatalog } from '@/lib/catalog/store';
import { categoryName, findCategory, findProduct, relatedProducts, visibleProducts } from '@/lib/catalog/query';
import { addOnName } from '@/lib/catalog/types';
import { formatRM } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductEnquiryPanel } from '@/components/product/ProductEnquiryPanel';
import { ProductCard } from '@/components/cards/ProductCard';
import { CTABanner } from '@/components/sections/CTABanner';

type Props = { params: Promise<{ slug: string }> };

// New products added in /admin are rendered on first visit.
export const dynamicParams = true;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return visibleProducts(catalog).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCatalog();
  const product = findProduct(catalog, slug);
  if (!product) return {};
  const category = categoryName(catalog, product.category);
  return pageMetadata({
    title: `${product.name} — ${category} Manufacturer Malaysia`,
    description: `${product.summary} Made to order in Cheras, Kuala Lumpur. MOQ ${product.moq} pcs. ${
      product.addOns.length ? `Available with ${product.addOns.map(addOnName).join(', ').toLowerCase()}.` : ''
    }`.trim(),
    path: `/products/${product.slug}`,
    keywords: [product.name, `${category} Malaysia`, `${category} Kuala Lumpur`],
    image: product.images[0].url.startsWith('/images/placeholder')
      ? undefined
      : { url: product.images[0].url, alt: product.images[0].alt },
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const product = findProduct(catalog, slug);
  if (!product) notFound();

  const category = findCategory(catalog, product.category);
  const related = relatedProducts(catalog, product, 4);

  const specs: [string, string][] = [
    ['Category', category?.name ?? ''],
    ['Fabric', product.fabric],
    ['Colours', product.colours.join(', ')],
    ['Sizes', product.sizes.join(', ')],
    ['Minimum order', `${product.moq} pcs (sizes can be mixed)`],
    ['Lead time', product.leadTime],
    ['Add-ons', product.addOns.map(addOnName).join(', ')],
    ['Price', product.priceFrom ? `From ${formatRM(product.priceFrom)} per piece` : 'On quotation'],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description || product.summary,
          image: product.images.map((i) => (i.url.startsWith('/') ? `${SITE_URL}${i.url}` : i.url)),
          sku: product.slug,
          category: category?.name,
          material: product.fabric,
          brand: { '@type': 'Brand', name: 'Kah Global' },
          manufacturer: { '@id': `${SITE_URL}/#business` },
        }}
      />

      <div className="border-b border-line bg-white">
        <div className="container-page py-3">
          <Breadcrumbs
            items={[
              { label: 'Products', href: '/products' },
              ...(category ? [{ label: category.name, href: `/products?category=${category.slug}` }] : []),
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <section className="container-page grid gap-8 py-8 md:py-12 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {category && <Badge>{category.name}</Badge>}
              <Badge tone="accent">Made to order</Badge>
            </div>
            <h1 className="font-display text-headline-lg-mobile font-extrabold text-navy md:text-headline-lg">{product.name}</h1>
            <p className="text-muted md:text-lg">{product.summary}</p>
          </div>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Package, label: 'MOQ', value: `${product.moq} pcs` },
              { icon: Clock, label: 'Lead time', value: product.leadTime || 'On request' },
              { icon: Shirt, label: 'Fabric', value: product.fabric || 'On request' },
              { icon: Ruler, label: 'Sizes', value: product.sizes.length ? `${product.sizes[0]} – ${product.sizes[product.sizes.length - 1]}` : 'On request' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 rounded-card border border-line bg-white p-3">
                <dt className="flex items-center gap-1.5 text-label font-semibold uppercase text-muted">
                  <s.icon aria-hidden className="size-3.5" /> {s.label}
                </dt>
                <dd className="text-sm font-semibold text-navy">{s.value}</dd>
              </div>
            ))}
          </dl>

          <p className="rounded-control bg-surface px-4 py-3 text-sm text-ink">
            <strong className="text-navy">
              {product.priceFrom ? `From ${formatRM(product.priceFrom)} per piece.` : 'Price on quotation.'}
            </strong>{' '}
            Final price depends on quantity, fabric and add-ons.
          </p>

          <ProductEnquiryPanel product={product} />

          <p className="flex items-center gap-2 text-sm text-muted">
            <Factory aria-hidden className="size-4 text-steel" /> Manufactured in our Cheras, Kuala Lumpur facility.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-headline-md font-bold text-navy">About this product</h2>
            {product.description && <p className="whitespace-pre-line text-ink">{product.description}</p>}
            {product.features.length > 0 && (
              <ul className="flex flex-col gap-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-ink">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-headline-md font-bold text-navy">Specifications</h2>
            <dl className="overflow-hidden rounded-card border border-line">
              {specs.map(([label, value], i) => (
                <div key={label} className={`grid grid-cols-3 gap-4 px-4 py-3 text-sm ${i % 2 ? 'bg-surface' : 'bg-white'}`}>
                  <dt className="font-semibold text-navy">{label}</dt>
                  <dd className="col-span-2 text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page section-y">
          <SectionHeading
            align="left"
            eyebrow="You may also need"
            title="Related products"
            action={
              <Link href="/products" className="inline-flex items-center gap-1 font-semibold text-orange-ink hover:text-orange">
                All products <ArrowRight aria-hidden className="size-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                categoryName={categoryName(catalog, p.category)}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </section>
      )}

      <CTABanner
        eyebrow="School, hotel & company orders"
        title="Need uniforms for your whole team?"
        description="Send us your quantities and logo — we will recommend the right fabric and add-ons, and quote with a free mock-up."
      />
    </>
  );
}
