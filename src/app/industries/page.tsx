import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { industries } from '@/data/industries';
import { getCategory } from '@/data/products';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { CTABanner } from '@/components/sections/CTABanner';
import { industryIcons } from '@/components/cards/IndustryCard';
import { ButtonLink } from '@/components/ui/Button';

export const metadata = pageMetadata({
  title: 'Uniforms by Industry — Corporate, F&B, Factory, School & Event Uniforms',
  description:
    'Uniform supplier for corporate offices, F&B outlets, factories, schools, events, hospitality, clinics and logistics in Malaysia. Fabrics and fits chosen for how your team works.',
  path: '/industries',
  keywords: ['F&B uniform Malaysia', 'factory uniform supplier', 'school jersey Malaysia', 'event t-shirt KL', 'hotel uniform Kuala Lumpur'],
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Industries' }]}
        eyebrow="Who we supply"
        title="Uniforms for every industry"
        description="Every workplace is different. We recommend fabric weight, breathability, fit and branding based on how your team actually works — in the office, the kitchen, the factory floor or out on the road."
      />

      {/* Jump links */}
      <nav aria-label="Industries" className="border-b border-line bg-white">
        <ul className="container-page flex gap-2 overflow-x-auto py-3">
          {industries.map((ind) => {
            const Icon = industryIcons[ind.icon];
            return (
              <li key={ind.slug} className="shrink-0">
                <a
                  href={`#${ind.slug}`}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-navy hover:border-orange hover:text-orange-ink"
                >
                  <Icon aria-hidden className="size-4" /> {ind.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="container-page grid gap-6 py-12 md:grid-cols-2 md:py-16">
        {industries.map((ind) => {
          const Icon = industryIcons[ind.icon];
          return (
            <article
              key={ind.slug}
              id={ind.slug}
              className="flex scroll-mt-28 flex-col overflow-hidden rounded-card border border-line bg-white shadow-card"
            >
              {ind.image && (
                <div className="relative aspect-[16/9] bg-surface">
                  <Image src={ind.image} alt={`${ind.name} uniforms`} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-control bg-surface-blue text-steel">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h2 className="font-display text-headline-sm font-bold text-navy">{ind.name}</h2>
                </div>
                <p className="text-ink">{ind.description}</p>
                <ul className="flex flex-col gap-2">
                  {ind.needs.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm text-ink">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {n}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
                  <p className="text-label font-semibold uppercase text-muted">Recommended</p>
                  <div className="flex flex-wrap gap-2">
                    {ind.recommended.map((slug) => (
                      <Link
                        key={slug}
                        href={`/ready-made?category=${slug}`}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-steel hover:border-steel"
                      >
                        {getCategory(slug).name}
                      </Link>
                    ))}
                  </div>
                  <ButtonLink href="/request-quote" variant="outline" size="sm" className="self-start">
                    Get a quote <ArrowRight aria-hidden className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ClientLogos />
      <CTABanner
        eyebrow="Not sure what fits?"
        title="Tell us about your team — we’ll recommend the right uniform"
        description="Share your industry, headcount and working conditions. We will suggest fabrics, styles and branding that suit your budget."
      />
    </>
  );
}
