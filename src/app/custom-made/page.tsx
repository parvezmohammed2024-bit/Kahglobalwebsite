import Image from 'next/image';
import { ArrowRight, Check, Factory, Palette, Ruler, ShieldCheck } from 'lucide-react';
import { terms, type Faq } from '@/data/site';
import { customMadeSteps, customOptions } from '@/data/services';
import { pageMetadata } from '@/lib/seo';
import { whatsappUrl } from '@/lib/whatsapp';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StepsTimeline } from '@/components/sections/StepsTimeline';
import { FaqList } from '@/components/ui/FaqList';
import { CTABanner } from '@/components/sections/CTABanner';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const metadata = pageMetadata({
  title: 'Custom-Made Uniforms Malaysia — Tailored Corporate Uniforms (Baju Korporat)',
  description:
    'Custom-made corporate uniforms made in Cheras, Kuala Lumpur. Choose fabric, cut, colours, collar and branding — baju korporat, F1 shirts, polos and workwear tailored to your brand.',
  path: '/custom-made',
  keywords: ['custom made uniform Malaysia', 'tempah baju korporat', 'custom corporate uniform KL', 'uniform manufacturer Cheras'],
});

const reasons = [
  {
    icon: Factory,
    title: 'Direct from the maker',
    description: 'Work directly with our Cheras team — no agents in between, clear pricing and one point of contact.',
  },
  {
    icon: Palette,
    title: 'Your brand colours',
    description: 'Fabrics and trims chosen to match your brand colours, with colour blocking, piping and contrast details.',
  },
  {
    icon: Ruler,
    title: 'Fits for every team member',
    description: 'Male, female and modest cuts in an Asian size range, with extended sizes on request.',
  },
  {
    icon: ShieldCheck,
    title: 'Sample before bulk',
    description: 'Approve a physical sample for fit, fabric and colour before we start bulk production.',
  },
];

const tiers = [
  {
    phase: 'Step 1',
    title: 'Sample',
    description: 'A sewn sample so you can check fit, fabric and colour before committing.',
    rows: [
      ['Quantity', '1 – 2 pieces'],
      ['Lead time', terms.sampleLeadTime],
      ['Digital mock-up', 'Free'],
    ],
  },
  {
    phase: 'Step 2',
    title: 'Standard batch',
    description: 'For SME staff uniforms, new outlets and annual company events.',
    rows: [
      ['Quantity', `${terms.customMadeMoq} – 299 pieces`],
      ['Lead time', terms.customMadeLeadTime],
      ['Packing', 'Size-sorted, labelled'],
    ],
    highlight: true,
  },
  {
    phase: 'Step 3',
    title: 'Large contract',
    description: 'For company-wide rollouts, multiple branches and repeat orders.',
    rows: [
      ['Quantity', '300+ pieces'],
      ['Lead time', '[PLACEHOLDER] confirm per order'],
      ['Delivery', 'Split by branch on request'],
    ],
  },
];

const inspiration = [
  { src: '/images/custom/f1-crew-uniform.jpg', title: 'Dual-tone F1 crew uniforms', tag: 'Logistics & aviation' },
  { src: '/images/industries/food-beverage.jpg', title: 'Café tunics & cross-back aprons', tag: 'Food & beverage' },
  { src: '/images/industries/factory.jpg', title: 'Heavy-duty drill workwear', tag: 'Factories & plants' },
  { src: '/images/industries/events.jpg', title: 'Sublimated event & run tees', tag: 'Events & CSR' },
  { src: '/images/industries/corporate.jpg', title: 'Executive Oxford shirts', tag: 'Corporate HQ' },
  { src: '/images/industries/logistics.jpg', title: 'Rider polos with reflective piping', tag: 'Delivery fleets' },
];

const faqs: Faq[] = [
  {
    question: 'What is the minimum order for custom-made uniforms?',
    answer: `Custom-made orders start from ${terms.customMadeMoq} pieces per design and colour. Sizes can be mixed within that quantity.`,
  },
  {
    question: 'How long does a custom-made order take?',
    answer: `Samples take about ${terms.sampleLeadTime}. After you approve the sample, bulk production takes about ${terms.customMadeLeadTime}, depending on quantity and fabric availability.`,
  },
  {
    question: 'Can you match our brand colours?',
    answer:
      'Yes. Share your brand guide or Pantone codes and we will propose the closest fabric and trim colours, and show you swatches before production.',
  },
  {
    question: 'Can you copy a uniform we already have?',
    answer:
      'Yes — send us a sample garment or clear photos with measurements, and we can reproduce or improve the design.',
  },
];

export default function CustomMadePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Custom-Made Uniforms' }]}
        eyebrow="Made to order in Cheras, KL"
        title={
          <>
            Designed for your brand, <span className="text-orange">made in our workshop</span>
          </>
        }
        description="Choose the fabric, cut, colours, collar and branding — we turn your idea into uniforms your team will be proud to wear. From corporate polos and baju korporat to F1 shirts and workwear."
        actions={
          <>
            <ButtonLink href="/request-quote?type=custom" size="lg">
              Start a custom project <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonAnchor
              href={whatsappUrl('Hi Kah Global, I would like to discuss a custom-made uniform project.')}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
            >
              <WhatsAppIcon className="size-5 text-whatsapp" /> Discuss on WhatsApp
            </ButtonAnchor>
          </>
        }
        aside={
          <div className="relative hidden aspect-[4/3] w-[26rem] overflow-hidden rounded-panel shadow-card-hover lg:block xl:w-[32rem]">
            <Image
              src="/images/custom/factory-floor.jpg"
              alt="Tailors sewing uniforms on the production floor"
              fill
              sizes="32rem"
              className="object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        }
      />

      {/* Key numbers */}
      <section className="border-b border-line bg-white">
        <dl className="container-page grid grid-cols-2 gap-px overflow-hidden py-6 md:grid-cols-4">
          {[
            { label: 'Minimum order', value: `${terms.customMadeMoq} pcs`, note: 'Per design / colour' },
            { label: 'Sample', value: terms.sampleLeadTime, note: 'Physical sewn sample' },
            { label: 'Bulk lead time', value: terms.customMadeLeadTime, note: 'After sample approval' },
            { label: 'Made in', value: 'Cheras, KL', note: 'Our own facility' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5 px-2 py-3 md:px-6">
              <dt className="text-label font-semibold uppercase text-muted">{s.label}</dt>
              <dd className="font-display text-lg font-extrabold text-navy md:text-xl">{s.value}</dd>
              <dd className="text-xs text-muted">{s.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Why */}
      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Why custom-made with us"
          title="Uniforms that fit your brand and your work"
          description="We design around how your team works — the climate, the job and the image you want to project."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <ServiceCard key={r.title} icon={<r.icon aria-hidden className="size-6" />} title={r.title} description={r.description} />
          ))}
        </div>
      </section>

      {/* Options matrix */}
      <section className="bg-white">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Customisation options"
            title="Mix and match every detail"
            description="A few of the options we can combine — ask us about anything not listed."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {customOptions.map((group) => (
              <div key={group.group} className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
                <h3 className="bg-navy px-5 py-3 font-display text-base font-bold text-white">{group.group}</h3>
                <ul className="flex flex-col divide-y divide-line">
                  {group.options.map((o) => (
                    <li key={o.name} className="flex items-start gap-3 px-5 py-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" />
                      <span>
                        <span className="block text-sm font-semibold text-navy">{o.name}</span>
                        <span className="text-xs text-muted">{o.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Ideas"
          title="What we can make for you"
          description="Examples of custom uniform styles by industry. Ask us for photos of past work in your industry."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {inspiration.map((item) => (
            <figure key={item.title} className="group overflow-hidden rounded-card border border-line bg-white shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 p-4">
                <span className="font-display font-bold text-navy">{item.title}</span>
                <Badge>{item.tag}</Badge>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-surface-blue">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Timelines"
            title="Production stages & schedules"
            description="Clear milestones from sample sign-off to delivery."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((t) => (
              <article
                key={t.title}
                className={`relative flex flex-col gap-4 rounded-card border bg-white p-6 shadow-card ${
                  t.highlight ? 'border-orange ring-2 ring-orange/20' : 'border-line'
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 right-5 rounded-full bg-orange px-3 py-0.5 text-label font-semibold uppercase text-white">
                    Most common
                  </span>
                )}
                <Badge tone={t.highlight ? 'accent' : 'spec'} className="self-start">
                  {t.phase}
                </Badge>
                <h3 className="font-display text-headline-sm font-bold text-navy">{t.title}</h3>
                <p className="text-sm text-muted">{t.description}</p>
                <dl className="mt-auto divide-y divide-line border-t border-line text-sm">
                  {t.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 py-2.5">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-semibold text-navy">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-page section-y">
        <SectionHeading eyebrow="How it works" title="From brief to delivery" />
        <StepsTimeline steps={customMadeSteps} />
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/request-quote?type=custom" size="lg">
            Start your custom quote <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </section>

      <section className="container-page pb-4">
        <SectionHeading eyebrow="FAQ" title="Custom-made questions" />
        <div className="mx-auto max-w-3xl">
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CTABanner
        eyebrow="Custom-made quotation"
        title="Have a design in mind? Let’s make it."
        description="Share your idea, reference photos or brand guide. We will suggest fabrics and send a quotation with a free design mock-up."
      />
    </>
  );
}
