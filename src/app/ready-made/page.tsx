import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { terms } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { whatsappUrl } from '@/lib/whatsapp';
import { PageHero } from '@/components/sections/PageHero';
import { CatalogView } from '@/components/catalog/CatalogView';
import { CTABanner } from '@/components/sections/CTABanner';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const metadata = pageMetadata({
  title: 'Ready-Made Uniforms Malaysia — Polo, T-Shirt & Corporate Shirts',
  description:
    'In-stock corporate uniforms in Kuala Lumpur: polo shirts, round neck t-shirts, Oxford & F1 shirts, jackets, aprons and workwear. Add your logo with embroidery or printing. Bulk prices from RM.',
  path: '/ready-made',
  keywords: ['ready made uniform Malaysia', 'polo shirt supplier KL', 'baju polo korporat', 'corporate t-shirt Malaysia'],
});

export default function ReadyMadePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Ready-Made Uniforms' }]}
        eyebrow="In stock · add your logo"
        title="Ready-made uniforms & apparel catalogue"
        description={`Choose an in-stock style, add your logo with embroidery or printing, and receive your order in about ${terms.readyMadeLeadTime}. Prices drop as your quantity grows.`}
        aside={
          <dl className="grid grid-cols-3 divide-x divide-line rounded-card border border-line bg-white text-center shadow-card">
            {[
              { label: 'Lead time', value: terms.readyMadeLeadTime.replace(' working days', ' days') },
              { label: 'MOQ (with logo)', value: `${terms.readyMadeMoq} pcs` },
              { label: 'Mock-up', value: 'Free' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-4 py-3 md:px-6">
                <dt className="text-label font-semibold uppercase text-muted">{s.label}</dt>
                <dd className="font-display font-bold text-navy">{s.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <div className="container-page flex flex-col gap-8 py-8 md:py-10">
        {/* Branding banner */}
        <div className="flex flex-col gap-4 rounded-card bg-navy p-5 text-white md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-orange">
              <Sparkles aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Add your company logo & branding</p>
              <p className="text-sm text-sky">
                In-house embroidery, silkscreen, sublimation and DTF — with a free digital mock-up before production.
              </p>
            </div>
          </div>
          <Link
            href="/printing"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-control bg-white px-4 text-sm font-semibold text-navy hover:bg-surface-blue"
          >
            Compare printing methods <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-surface" aria-hidden />}>
          <CatalogView />
        </Suspense>

        {/* Bulk / enterprise support */}
        <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <p className="text-label font-semibold uppercase text-orange-ink">Bulk & company-wide orders</p>
            <h2 className="mt-1 font-display text-headline-sm font-bold text-navy md:text-headline-md">
              Outfitting a whole company or several branches?
            </h2>
            <p className="mt-2 text-muted">
              Ask for our full catalogue with fabric swatches, or speak to our team about sizing sessions and
              staggered delivery by branch.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <ButtonLink href="/request-quote" variant="outline">
              <Download aria-hidden className="size-4" /> Request catalogue
            </ButtonLink>
            <ButtonAnchor
              href={whatsappUrl('Hi Kah Global, I would like to discuss a bulk uniform order for my company.')}
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
