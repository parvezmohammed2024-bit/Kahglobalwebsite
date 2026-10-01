import Image from 'next/image';
import { ArrowRight, Factory, Handshake, MessageCircle, ShieldCheck } from 'lucide-react';
import { company, contact, YEARS_IN_BUSINESS } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StatsBar } from '@/components/sections/StatsBar';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner';
import { ButtonLink } from '@/components/ui/Button';

export const metadata = pageMetadata({
  title: 'About Kah Global — Uniform Manufacturer in Cheras, Kuala Lumpur',
  description: `${company.name} (${company.registration}) is a uniform and apparel company in Cheras, Kuala Lumpur, established in ${company.foundedYear}. Ready-made and custom-made uniforms with in-house printing and embroidery.`,
  path: '/about',
  keywords: ['Kah Global Sdn Bhd', 'uniform company Cheras', 'uniform manufacturer Kuala Lumpur'],
});

const values = [
  {
    icon: Factory,
    title: 'Made & branded in-house',
    description: 'Production, printing and embroidery happen at our Cheras facility, so we control quality and timelines.',
  },
  {
    icon: Handshake,
    title: 'Straightforward pricing',
    description: 'Clear quotations with volume pricing, and no surprises between quote and invoice.',
  },
  {
    icon: ShieldCheck,
    title: 'Checked before delivery',
    description: 'Every order is inspected for sizing, stitching and logo placement before it leaves us.',
  },
  {
    icon: MessageCircle,
    title: 'Easy to reach',
    description: 'Talk to us directly on WhatsApp or phone — in English or Bahasa Melayu.',
  },
];

export default function AboutPage() {
  const facts: [string, string][] = [
    ['Company', company.name],
    ['Registration no.', company.registration],
    ['Established', String(company.foundedYear)],
    ['Location', contact.address.full],
    ['Services', 'Ready-made uniforms, custom-made uniforms, printing & embroidery'],
    ['Customers', 'Companies, F&B outlets, factories, schools and event organisers'],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow={`Established ${company.foundedYear}`}
        title="Uniforms made with care in Cheras, Kuala Lumpur"
        description={`For more than ${YEARS_IN_BUSINESS} years, ${company.name} has helped Malaysian organisations look professional and work comfortably — supplying ready-made and custom-made uniforms with in-house printing and embroidery.`}
      />

      <StatsBar />

      <section className="container-page section-y grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-surface shadow-card">
          <Image
            src="/images/custom/factory-floor.jpg"
            alt="Kah Global production floor in Cheras"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-label font-semibold uppercase text-orange-ink">Our story</p>
          <h2 className="font-display text-headline-lg-mobile font-bold text-navy md:text-headline-lg">
            A uniform partner for Malaysian businesses
          </h2>
          <p className="text-ink">
            {company.name} was registered in {company.foundedYear} and operates from Cheras, Kuala Lumpur. We supply
            uniforms to corporate offices, F&B outlets, factories, schools and event organisers — from a handful of
            staff polos to company-wide rollouts.
          </p>
          <p className="text-ink">
            [PLACEHOLDER] Add 2–3 sentences about how the company started, the founder(s), and what makes Kah Global
            different (e.g. family business, number of machines, team size, notable milestones).
          </p>
          <p className="text-ink">
            Customers choose between our <strong>ready-made</strong> range — in-stock garments branded with their logo
            — and <strong>custom-made</strong> uniforms designed around their brand, with fabric, cut and colour chosen
            to suit the job.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="self-start">
            Visit or contact us <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page section-y">
          <SectionHeading eyebrow="How we work" title="What you can expect from us" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <ServiceCard key={v.title} icon={<v.icon aria-hidden className="size-6" />} title={v.title} description={v.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading eyebrow="Company details" title="At a glance" />
        <dl className="mx-auto max-w-3xl overflow-hidden rounded-card border border-line bg-white shadow-card">
          {facts.map(([label, value], i) => (
            <div key={label} className={`grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4 ${i % 2 ? 'bg-surface' : ''}`}>
              <dt className="text-sm font-semibold text-navy">{label}</dt>
              <dd className="text-sm text-ink sm:col-span-2">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Testimonials />
      <CTABanner />
    </>
  );
}
