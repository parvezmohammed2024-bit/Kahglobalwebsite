import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Factory, MessageCircle, Truck } from 'lucide-react';
import { SITE_URL, terms } from '@/data/site';
import { getCategory, getProduct, getRelatedProducts, products } from '@/data/products';
import { formatRM } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGallery } from '@/components/product/ProductGallery';
import { PriceTierTable } from '@/components/product/PriceTierTable';
import { ProductOrderPanel } from '@/components/product/ProductOrderPanel';
import { ProductCard } from '@/components/cards/ProductCard';
import { CTABanner } from '@/components/sections/CTABanner';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const category = getCategory(product.category);
  return pageMetadata({
    title: `${product.name} — ${category.name} Supplier Malaysia`,
    description: `${product.summary} ${product.gsm} GSM ${product.fabric.toLowerCase()}, ${product.colours.length} colours, from ${formatRM(product.priceFrom)} per piece. Add your logo — Kah Global, Cheras KL.`,
    path: `/ready-made/${product.slug}`,
    keywords: [product.name, `${category.name.toLowerCase()} Malaysia`, `${category.name.toLowerCase()} Kuala Lumpur`],
    image: { url: product.images[0].src, alt: product.images[0].alt },
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);
  const highest = Math.max(...product.priceTiers.map((t) => t.price));

  const specs: [string, string][] = [
    ['Category', category.name],
    ['Fabric', product.fabric],
    ['Composition', product.composition],
    ['Weight', `${product.gsm} GSM`],
    ['Colours', product.colours.map((c) => c.name).join(', ')],
    ['Sizes', product.sizes.join(', ')],
    ['MOQ with logo', `${terms.readyMadeMoq} pcs (mixed sizes)`],
    ['Lead time', `${terms.readyMadeLeadTime} after mock-up approval`],
  ];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.images.map((i) => `${SITE_URL}${i.src}`),
          sku: product.slug,
          category: category.name,
          material: product.composition,
          brand: { '@type': 'Brand', name: 'Kah Global' },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'MYR',
            lowPrice: product.priceFrom.toFixed(2),
            highPrice: highest.toFixed(2),
            offerCount: product.priceTiers.length,
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
            seller: { '@id': `${SITE_URL}/#business` },
          },
        }}
      />

      <div className="border-b border-line bg-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
          <Breadcrumbs
            items={[
              { label: 'Ready-Made', href: '/ready-made' },
              { label: category.name, href: `/ready-made?category=${category.slug}` },
              { label: product.name },
            ]}
          />
          {product.inStock && (
            <Badge tone="success" pill className="normal-case tracking-normal">
              ● Ready stock · dispatch in {terms.readyMadeLeadTime}
            </Badge>
          )}
        </div>
      </div>

      <section className="container-page grid gap-8 py-8 md:py-12 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={product.images} badge={`${product.gsm} GSM`} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge tone="navy">Ready-made</Badge>
              <Badge>{category.name}</Badge>
              {product.badges?.map((b) => (
                <Badge key={b} tone="accent">
                  {b}
                </Badge>
              ))}
            </div>
            <h1 className="font-display text-headline-lg-mobile font-extrabold text-navy md:text-headline-lg">{product.name}</h1>
            <p className="text-muted md:text-lg">{product.summary}</p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3 rounded-card border border-line bg-white p-4 shadow-card">
            <div>
              <p className="text-label font-semibold uppercase text-muted">Wholesale price</p>
              <p className="font-display text-headline-md font-extrabold text-navy tabular-nums">
                {formatRM(product.priceFrom)} – {formatRM(highest)}
                <span className="ml-1 text-sm font-medium text-muted">/ piece</span>
              </p>
            </div>
            <p className="text-right text-xs text-muted">
              Excl. branding & SST
              <br />
              Final price confirmed on quotation
            </p>
          </div>

          <PriceTierTable product={product} />
          <ProductOrderPanel product={product} />

          <ul className="grid gap-2 border-t border-line pt-5 text-sm text-ink sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Factory aria-hidden className="size-4 text-steel" /> Branded in Cheras, KL
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle aria-hidden className="size-4 text-steel" /> Free digital mock-up
            </li>
            <li className="flex items-center gap-2">
              <Truck aria-hidden className="size-4 text-steel" /> Delivery across Malaysia
            </li>
          </ul>
        </div>
      </section>

      {/* Details */}
      <section className="border-y border-line bg-white">
        <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-headline-md font-bold text-navy">Description & features</h2>
            <p className="text-ink">{product.description}</p>
            <ul className="flex flex-col gap-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {f}
                </li>
              ))}
            </ul>
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

        {product.sizeChart && (
          <div className="container-page pb-12 md:pb-16">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-display text-headline-md font-bold text-navy">Size chart (Asian fit)</h2>
              <p className="text-xs text-muted">Garment measurements in cm · tolerance ±1.5 cm</p>
            </div>
            <div className="overflow-x-auto rounded-card border border-line">
              <table className="w-full min-w-[32rem] text-sm">
                <thead className="bg-navy text-left text-label font-semibold uppercase text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3">Size</th>
                    <th scope="col" className="px-4 py-3 text-right">Chest width</th>
                    <th scope="col" className="px-4 py-3 text-right">Body length</th>
                    <th scope="col" className="px-4 py-3 text-right">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {product.sizeChart.map((row, i) => (
                    <tr key={row.size} className={`border-t border-line ${i % 2 ? 'bg-surface' : 'bg-white'}`}>
                      <th scope="row" className="px-4 py-3 text-left font-semibold text-navy">{row.size}</th>
                      <td className="px-4 py-3 text-right">{row.chestCm}</td>
                      <td className="px-4 py-3 text-right">{row.lengthCm}</td>
                      <td className="px-4 py-3 text-right">{row.sleeveCm ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Related */}
      <section className="container-page section-y">
        <SectionHeading
          align="left"
          eyebrow="You may also need"
          title="Frequently ordered together"
          action={
            <Link href="/ready-made" className="inline-flex items-center gap-1 font-semibold text-orange-ink hover:text-orange">
              View full catalogue <ArrowRight aria-hidden className="size-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      <CTABanner
        eyebrow="Company & bulk orders"
        title="Outfitting a factory, multi-branch team or event crew?"
        description="Send us your quantities and logo — we will recommend the right fabric and branding, and quote with a free mock-up."
      />
    </>
  );
}
