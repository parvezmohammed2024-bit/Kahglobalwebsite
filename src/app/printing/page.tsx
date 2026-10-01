import Image from 'next/image';
import { ArrowRight, Check, FileImage } from 'lucide-react';
import { type Faq } from '@/data/site';
import { logoPlacements, printingMethods } from '@/data/services';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FaqList } from '@/components/ui/FaqList';
import { CTABanner } from '@/components/sections/CTABanner';
import { printingIcons } from '@/components/cards/printingIcons';

export const metadata = pageMetadata({
  title: 'Custom T-Shirt Printing Cheras — Embroidery, Silkscreen, Sublimation & DTF',
  description:
    'Custom t-shirt printing and uniform embroidery in Cheras, Kuala Lumpur. Silkscreen, computerised embroidery, dye-sublimation and DTF printing for company uniforms, events and teams.',
  path: '/printing',
  keywords: ['t-shirt printing Cheras', 'embroidery uniform KL', 'silkscreen printing Kuala Lumpur', 'sublimation jersey Malaysia', 'DTF printing KL', 'cetak baju Cheras'],
});

type Rating = 1 | 2 | 3;
const comparison: { label: string; values: Record<string, Rating | string> }[] = [
  { label: 'Best for', values: { embroidery: 'Polos, shirts, caps', silkscreen: 'Bulk event tees', sublimation: 'Jerseys, all-over', dtf: 'Detailed logos' } },
  { label: 'Durability', values: { embroidery: 3, silkscreen: 2, sublimation: 3, dtf: 2 } },
  { label: 'Colours / detail', values: { embroidery: 1, silkscreen: 1, sublimation: 3, dtf: 3 } },
  { label: 'Cost at high volume', values: { embroidery: 2, silkscreen: 3, sublimation: 2, dtf: 2 } },
  { label: 'Fabric', values: { embroidery: 'Most fabrics', silkscreen: 'Cotton & blends', sublimation: 'Polyester only', dtf: 'Most fabrics' } },
];

const faqs: Faq[] = [
  {
    question: 'Which printing method should I choose?',
    answer:
      'For corporate polos and shirts, embroidery gives the most premium, long-lasting finish. For large quantities of event t-shirts with simple logos, silkscreen is the most economical. For full-colour jerseys, choose sublimation. For detailed, multi-colour logos in smaller quantities, DTF is ideal. We will recommend the best option when you send your logo.',
  },
  {
    question: 'Can I print on garments I already have?',
    answer: '[PLACEHOLDER] State whether you accept customer-supplied garments, and any conditions.',
  },
  {
    question: 'Will I see the design before production?',
    answer: 'Yes. We send a digital mock-up showing your logo size, colours and position on the garment for your approval.',
  },
  {
    question: 'Can different staff names be added?',
    answer: 'Yes — names or departments can be embroidered or printed per piece. Send us the list with sizes.',
  },
];

function Dots({ value }: { value: Rating }) {
  return (
    <span className="inline-flex gap-1" aria-label={`${value} out of 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`size-2.5 rounded-full ${i <= value ? 'bg-orange' : 'bg-line'}`} />
      ))}
    </span>
  );
}

export default function PrintingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Printing Services' }]}
        eyebrow="In-house branding"
        title="Uniform printing & embroidery in Cheras, KL"
        description="Embroidery, silkscreen, sublimation and DTF printing — applied and quality-checked in-house, on our uniforms or as part of your custom-made order."
        actions={
          <>
            <ButtonLink href="/request-quote" size="lg">
              Get a printing quote <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="#compare" variant="outline" size="lg">
              Compare methods
            </ButtonLink>
          </>
        }
      />

      {/* Quick nav */}
      <nav aria-label="Printing methods" className="sticky top-16 z-20 border-b border-line bg-white/95 backdrop-blur md:top-[4.5rem]">
        <ul className="container-page flex gap-2 overflow-x-auto py-3">
          {printingMethods.map((m) => {
            const Icon = printingIcons[m.id];
            return (
              <li key={m.id} className="shrink-0">
                <a
                  href={`#${m.id}`}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-navy hover:border-orange hover:text-orange-ink"
                >
                  <Icon aria-hidden className="size-4" /> {m.shortName}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Methods */}
      <div className="container-page flex flex-col gap-16 py-14 md:gap-24 md:py-20">
        {printingMethods.map((m, i) => {
          const Icon = printingIcons[m.id];
          return (
            <section key={m.id} id={m.id} className="grid scroll-mt-36 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-panel bg-surface shadow-card ${i % 2 ? 'lg:order-2' : ''}`}>
                <Image src={m.image} alt={`${m.name} example`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-5">
                <span className="flex size-12 items-center justify-center rounded-card bg-orange text-white">
                  <Icon aria-hidden className="size-6" />
                </span>
                <div>
                  <p className="text-label font-semibold uppercase text-orange-ink">{m.tagline}</p>
                  <h2 className="mt-1 font-display text-headline-lg-mobile font-bold text-navy md:text-headline-lg">{m.name}</h2>
                </div>
                <p className="text-ink">{m.description}</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-bold text-navy">Best for</h3>
                    <ul className="flex flex-col gap-1.5">
                      {m.bestFor.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-ink">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-bold text-navy">Why choose it</h3>
                    <ul className="flex flex-col gap-1.5">
                      {m.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-ink">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="accent">MOQ: {m.moq}</Badge>
                  <Badge>From: {m.priceFrom}</Badge>
                </div>
                <ButtonLink href={`/request-quote?method=${m.id}`} variant="secondary" className="self-start">
                  Quote for {m.shortName.toLowerCase()} <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
              </div>
            </section>
          );
        })}
      </div>

      {/* Comparison */}
      <section id="compare" className="scroll-mt-36 bg-white">
        <div className="container-page section-y">
          <SectionHeading eyebrow="Side by side" title="Compare printing methods" />
          <div className="overflow-x-auto rounded-card border border-line shadow-card">
            <table className="w-full min-w-[40rem] text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-label font-semibold uppercase">
                    <span className="sr-only">Criteria</span>
                  </th>
                  {printingMethods.map((m) => (
                    <th key={m.id} scope="col" className="px-4 py-3 text-left font-display font-bold">
                      {m.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.label} className={`border-t border-line ${i % 2 ? 'bg-surface' : 'bg-white'}`}>
                    <th scope="row" className="px-4 py-3 text-left font-semibold text-navy">
                      {row.label}
                    </th>
                    {printingMethods.map((m) => {
                      const v = row.values[m.id];
                      return (
                        <td key={m.id} className="px-4 py-3 text-ink">
                          {typeof v === 'number' ? <Dots value={v} /> : v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Artwork & placement */}
      <section className="container-page section-y grid gap-6 lg:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-6 shadow-card md:p-8">
          <h2 className="font-display text-headline-sm font-bold text-navy">Logo positions</h2>
          <p className="mt-2 text-sm text-muted">Popular positions — combine several on one garment.</p>
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {logoPlacements.map((p) => (
              <li key={p} className="flex items-center gap-2 rounded-control bg-surface px-3 py-2 text-sm font-medium text-ink">
                <Check aria-hidden className="size-4 text-orange" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-line bg-white p-6 shadow-card md:p-8">
          <h2 className="flex items-center gap-2 font-display text-headline-sm font-bold text-navy">
            <FileImage aria-hidden className="size-5 text-orange" /> Artwork guidelines
          </h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-ink">
            <li className="flex gap-2">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> Best: vector files — AI, EPS, PDF or SVG.
            </li>
            <li className="flex gap-2">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> Also OK: high-resolution PNG or JPG (at least 2000px wide).
            </li>
            <li className="flex gap-2">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> Include Pantone or HEX codes if colours must match exactly.
            </li>
            <li className="flex gap-2">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> No file? Send a photo — we will advise if it needs redrawing.
            </li>
          </ul>
        </div>
      </section>

      <section className="container-page pb-4">
        <SectionHeading eyebrow="FAQ" title="Printing questions" />
        <div className="mx-auto max-w-3xl">
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CTABanner
        eyebrow="Printing quotation"
        title="Send us your logo — we’ll recommend the best method"
        description="Tell us the garment, quantity and where the logo goes. You will get a quotation and a free digital mock-up."
      />
    </>
  );
}
