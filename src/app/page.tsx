import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, CircleCheck, Clock, Package, Ruler } from 'lucide-react';
import { company, terms } from '@/data/site';
import { categories, countByCategory, getFeaturedProducts } from '@/data/products';
import { orderSteps, printingMethods } from '@/data/services';
import { industries } from '@/data/industries';
import { pageMetadata } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/cards/ProductCard';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { printingIcons } from '@/components/cards/printingIcons';
import { StatsBar } from '@/components/sections/StatsBar';
import { StepsTimeline } from '@/components/sections/StepsTimeline';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata = pageMetadata({
  title: 'Uniform Supplier Malaysia | Corporate Uniform Kuala Lumpur | Kah Global',
  description:
    'Uniform supplier in Cheras, Kuala Lumpur since 2014. Ready-made and custom-made corporate uniforms, baju korporat, polo & t-shirts with embroidery and custom t-shirt printing. Get a free quote.',
  path: '/',
  absoluteTitle: true,
});

const pathways = [
  {
    eyebrow: `Fast turnaround · ${terms.readyMadeLeadTime}`,
    moq: `MOQ ${terms.readyMadeMoq} pcs`,
    title: 'Ready-Made Uniforms',
    description:
      'Choose from in-stock polos, t-shirts, shirts and workwear, then add your logo with embroidery or printing. Ideal for new staff, events and urgent orders.',
    points: ['Polos, tees, Oxford & F1 shirts in stock', 'Add your logo by embroidery or print', 'Free digital mock-up before production'],
    image: '/images/home/ready-stock.jpg',
    imageAlt: 'Stacks of ready-made corporate polo shirts',
    cta: { label: 'Browse ready-made', href: '/ready-made' },
    icon: Package,
  },
  {
    eyebrow: `Made to order · ${terms.customMadeLeadTime}`,
    moq: `MOQ ${terms.customMadeMoq} pcs`,
    title: 'Custom-Made Uniforms',
    description:
      'Your design, made in our Cheras workshop — choose the fabric, cut, colours, collar and details to match your brand and work environment.',
    points: ['Fabric, cut and colour tailored to you', 'Colour blocking, piping and custom details', 'Physical sample before bulk production'],
    image: '/images/home/custom-workshop.jpg',
    imageAlt: 'Fabric swatches and pattern pieces on a design table',
    cta: { label: 'Start a custom project', href: '/custom-made' },
    icon: Ruler,
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const years = new Date().getFullYear() - company.foundedYear;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-blue via-canvas to-canvas">
        <div className="container-page grid items-center gap-10 py-10 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="flex flex-col gap-6">
            <Badge tone="accent" pill className="self-start normal-case tracking-normal">
              <CircleCheck aria-hidden className="size-3.5" /> Uniform supplier in Cheras, KL since {company.foundedYear}
            </Badge>
            <h1 className="font-display text-display-mobile font-extrabold text-navy md:text-[3rem] md:leading-[3.5rem] lg:text-display">
              Uniforms built for <span className="text-orange">Malaysian businesses</span>
            </h1>
            <p className="max-w-xl text-base text-muted md:text-lg">
              Ready-made and custom-made corporate uniforms with in-house embroidery and printing — for offices, F&B
              outlets, factories, schools and events. Order direct from our Cheras, Kuala Lumpur facility.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/ready-made" size="lg">
                Shop Ready-Made <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/request-quote?type=custom" variant="outline" size="lg">
                Request Custom Quote
              </ButtonLink>
            </div>
            <ul className="flex flex-col gap-2 text-sm font-medium text-ink sm:flex-row sm:flex-wrap sm:gap-x-6">
              {['Direct from our Cheras facility', 'In-house printing & embroidery', 'Free digital mock-up'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-emerald-600" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative grid grid-cols-5 grid-rows-2 gap-3 md:gap-4">
            <div className="relative col-span-3 row-span-2 aspect-[3/4] overflow-hidden rounded-panel bg-surface shadow-card-hover">
              <Image
                src="/images/home/hero-polos.jpg"
                alt="Navy corporate polo shirts with embroidered logos"
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-panel bg-surface">
              <Image
                src="/images/home/embroidery-machine.jpg"
                alt="Computerised embroidery machine stitching a logo"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-panel bg-surface">
              <Image
                src="/images/home/corporate-team.jpg"
                alt="Corporate team wearing matching uniforms"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-card border border-line bg-white p-3 shadow-overlay md:left-6 md:p-4">
              <span className="flex size-10 items-center justify-center rounded-control bg-orange text-white">
                <Clock aria-hidden className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-sm font-bold text-navy">{years}+ years of uniform making</span>
                <span className="text-xs text-muted">In-house embroidery & printing</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Production pathways */}
      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Two ways to order"
          title="Ready-made or custom-made?"
          description="Need uniforms fast, or a design that is entirely your own? We run both — pick the stream that fits your timeline."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {pathways.map((p) => (
            <article
              key={p.title}
              className="flex flex-col overflow-hidden rounded-panel border border-line bg-white shadow-card"
            >
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge tone="accent">{p.eyebrow}</Badge>
                  <span className="text-sm font-semibold text-steel">{p.moq}</span>
                </div>
                <h3 className="flex items-center gap-3 font-display text-headline-md font-bold text-navy">
                  <p.icon aria-hidden className="size-7 text-orange" /> {p.title}
                </h3>
                <p className="text-muted">{p.description}</p>
              </div>
              <div className="relative mx-6 aspect-[16/9] overflow-hidden rounded-card bg-surface md:mx-8">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
                <ul className="flex flex-col gap-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.cta.href}
                  className="mt-auto inline-flex items-center gap-1.5 self-start font-semibold text-orange-ink hover:text-orange"
                >
                  {p.cta.label} <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white">
        <div className="container-page section-y">
          <SectionHeading
            align="left"
            eyebrow="Catalogue"
            title="Uniform categories"
            description="Factory-direct pricing in Ringgit, with lower prices per piece as your quantity grows."
            action={
              <ButtonLink href="/ready-made" variant="outline">
                View all products <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            }
          />
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {categories.slice(0, 8).map((c) => (
              <CategoryCard key={c.slug} category={c} count={countByCategory(c.slug)} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page section-y">
        <SectionHeading
          align="left"
          eyebrow="Best sellers"
          title="Featured ready-made uniforms"
          description="Popular styles our customers order again and again — in stock and ready for your logo."
          action={
            <ButtonLink href="/ready-made" variant="secondary">
              Shop ready-made <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          }
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      {/* Printing */}
      <section className="bg-surface-blue">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="In-house branding"
            title="Printing & embroidery"
            description="Every logo is applied and checked in-house — choose the method that suits your design, fabric and quantity."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {printingMethods.map((m) => {
              const Icon = printingIcons[m.id];
              return (
                <ServiceCard
                  key={m.id}
                  icon={<Icon aria-hidden className="size-6" />}
                  title={m.name}
                  description={m.tagline + '. ' + m.bestFor.slice(0, 2).join(', ') + '.'}
                  href={`/printing#${m.id}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Simple process"
          title="How ordering works"
          description="From your first message to uniforms delivered to your door."
        />
        <StepsTimeline steps={orderSteps} />
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/request-quote" size="lg">
            Start your quote <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Industries"
            title="Uniforms for every workplace"
            description="Fabric weight, breathability and fit chosen for how your team actually works."
          />
          <div className="grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {industries.map((ind) => (
              <IndustryCard key={ind.slug} industry={ind} />
            ))}
          </div>
        </div>
      </section>

      <ClientLogos />
      <Testimonials />
      <CTABanner />
    </>
  );
}
