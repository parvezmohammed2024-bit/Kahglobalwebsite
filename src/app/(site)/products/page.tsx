import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Factory } from 'lucide-react';
import { getCatalog } from '@/lib/catalog/store';
import { visibleCategories, visibleProducts } from '@/lib/catalog/query';
import { pageMetadata } from '@/lib/seo';
import { whatsappUrl } from '@/lib/whatsapp';
import { PageHero } from '@/components/sections/PageHero';
import { CatalogView } from '@/components/catalog/CatalogView';
import { ProductCard } from '@/components/cards/ProductCard';
import { CTABanner } from '@/components/sections/CTABanner';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const metadata = pageMetadata({
  title: 'Products — School, Hotel, Restaurant & Corporate Uniforms, Baju Melayu & Baju Kurung',
  description:
    'Uniforms manufactured in Cheras, Kuala Lumpur: school, hotel, restaurant and corporate uniforms, sublimation t-shirts, Baju Melayu, Baju Kurung and Malay traditional wear. Embroidery and printing available.',
  path: '/products',
  keywords: ['uniform manufacturer Malaysia', 'school uniform supplier KL', 'baju melayu corporate', 'baju kurung uniform', 'sublimation t-shirt Malaysia'],
});

export default async function ProductsPage() {
  const catalog = await getCatalog();
  const categories = visibleCategories(catalog);
  const products = visibleProducts(catalog);
  const names = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products' }]}
        eyebrow="Manufactured in Cheras, KL"
        title="Our products"
        description="Every item is made to order in our facility — in your colours, with your logo embroidered or printed. Choose a product to see its minimum order and available add-ons, then request a quotation."
      />

      <div className="container-page flex flex-col gap-8 py-8 md:py-10">
        <div className="flex flex-col gap-4 rounded-card bg-navy p-5 text-white md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-orange">
              <Factory aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">We are the manufacturer</p>
              <p className="text-sm text-sky">
                No retail stock or middlemen — every order is cut, sewn, embroidered and printed for you. Prices are
                given on quotation.
              </p>
            </div>
          </div>
          <Link
            href="/printing"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-control bg-white px-4 text-sm font-semibold text-navy hover:bg-surface-blue"
          >
            Embroidery & printing <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        {/* Fallback = full server-rendered grid, so every product is in the HTML for search engines. */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} categoryName={names[p.category] ?? ''} />
              ))}
            </div>
          }
        >
          <CatalogView categories={categories} products={products} />
        </Suspense>

        <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <p className="text-label font-semibold uppercase text-orange-ink">Bulk & school orders</p>
            <h2 className="mt-1 font-display text-headline-sm font-bold text-navy md:text-headline-md">
              Outfitting a whole school, hotel or company?
            </h2>
            <p className="mt-2 text-muted">
              Talk to us about fabric samples, sizing sessions and delivery by branch or class.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <ButtonLink href="/request-quote" variant="outline">
              Request a quote
            </ButtonLink>
            <ButtonAnchor
              href={whatsappUrl('Hi Kah Global, I would like to discuss a bulk uniform order.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
            >
              <WhatsAppIcon /> WhatsApp our team
            </ButtonAnchor>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
