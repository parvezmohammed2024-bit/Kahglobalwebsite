import Image from 'next/image';
import { ArrowRight, Factory, Handshake, MessageCircle, ShieldCheck } from 'lucide-react';
import { company, contact, YEARS_IN_BUSINESS } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { getCatalog } from '@/lib/catalog/store';
import { siteImage } from '@/lib/catalog/query';
import { PageHero } from '@/components/sections/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StatsBar } from '@/components/sections/StatsBar';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner';
import { ButtonLink } from '@/components/ui/Button';

export const metadata = pageMetadata({
  title: 'About Kah Global — Uniform Manufacturer in Cheras, Kuala Lumpur',
  description: `${company.name} (${company.registration}) manufactures uniforms and Malay traditional wear in Cheras, Kuala Lumpur, established in ${company.foundedYear}. School, hotel, restaurant and corporate uniforms, sublimation t-shirts, Baju Melayu and Baju Kurung.`,
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

export default async function AboutPage() {
  const storyImage = siteImage(await getCatalog(), 'about-story', 'Kah Global production floor in Cheras');
  const facts: [string, string][] = [
    ['Company', company.name],
    ['Registration no.', company.registration],
    ['Established', String(company.foundedYear)],
    ['Location', contact.address.full],
    ['What we make', 'School, hotel, restaurant & corporate uniforms, sublimation t-shirts, Baju Melayu, Baju Kurung and Malay men’s & ladies’ wear'],
    ['Services', 'Manufacturing to our designs or yours, embroidery & printing'],
    ['Customers', 'Schools, hotels, restaurants, companies, clubs and event organisers'],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow={`Established ${company.foundedYear}`}
        title="Uniforms made with care in Cheras, Kuala Lumpur"
        description={`For more than ${YEARS_IN_BUSINESS} years, ${company.name} has manufactured uniforms and traditional wear for Malaysian schools, hotels, restaurants and companies — with in-house embroidery and printing.`}
      />

      <StatsBar />

      <section className="container-page section-y grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-surface shadow-card">
          <Image
            src={storyImage.url}
            alt={storyImage.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-label font-semibold uppercase text-orange-ink">Our story</p>
          <h2 className="font-display text-headline-lg-mobile font-bold text-navy md:text-headline-lg">
            A uniform manufacturer for Malaysian organisations
          </h2>
          <p className="text-ink">
            {company.name} was registered in {company.foundedYear} and operates from Cheras, Kuala Lumpur. We
            manufacture uniforms for schools, hotels, restaurants and companies, plus sublimation t-shirts, Baju Melayu,
            Baju Kurung and Malay traditional wear — from small team orders to school- and company-wide rollouts.
          </p>
          <p className="text-ink">
            Customers can start from <strong>our designs</strong> — made in their colours with their logo — or have
            uniforms <strong>custom-made</strong> to their own design, with fabric, cut and colour chosen to suit the job.
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
