import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, CircleCheck, Clock, Package, Ruler } from 'lucide-react';
import { company, terms, YEARS_IN_BUSINESS } from '@/data/site';
import { getCatalog } from '@/lib/catalog/store';
import { categoryName, countInCategory, featuredProducts, siteImage, visibleCategories } from '@/lib/catalog/query';
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
  title: 'Uniform Manufacturer Malaysia | School, Hotel & Corporate Uniforms | Kah Global',
  description:
    'Uniform manufacturer in Cheras, Kuala Lumpur since 2014. School, hotel, restaurant and corporate uniforms, sublimation t-shirts, Baju Melayu and Baju Kurung — with embroidery and printing. Get a free quote.',
  path: '/',
  absoluteTitle: true,
});

const pathways = [
  {
    eyebrow: 'Faster to order',
    moq: `MOQ from ${terms.readyMadeMoq} pcs`,
    title: 'Our Designs',
    description:
      'Choose one of our proven uniform and traditional-wear designs. We manufacture it in your colours and add your logo with embroidery or printing.',
    points: ['School, hotel, restaurant & corporate uniforms', 'Baju Melayu, Baju Kurung & Malay wear', 'Free digital mock-up before production'],
    imageKey: 'home-path-ready' as const,
    imageAlt: 'Finished uniforms ready for delivery',
    cta: { label: 'View our products', href: '/products' },
    icon: Package,
  },
  {
    eyebrow: `Made to order · ${terms.customMadeLeadTime}`,
    moq: `MOQ ${terms.customMadeMoq} pcs`,
    title: 'Custom-Made Uniforms',
    description:
      'Your own design, manufactured in our Cheras facility — choose the fabric, cut, colours and details to match your brand.',
    points: ['Fabric, cut and colour tailored to you', 'Colour blocking, piping and custom details', 'Physical sample before bulk production'],
    imageKey: 'home-path-custom' as const,
    imageAlt: 'Fabric swatches and pattern pieces on a design table',
    cta: { label: 'Start a custom project', href: '/custom-made' },
    icon: Ruler,
  },
];

export default async function HomePage() {
  const catalog = await getCatalog();
  const featured = featuredProducts(catalog, 4);
  const categories = visibleCategories(catalog);
  const hero = {
    main: siteImage(catalog, 'home-hero-main', 'Uniforms manufactured by Kah Global'),
    top: siteImage(catalog, 'home-hero-top', 'Computerised embroidery of a logo'),
    bottom: siteImage(catalog, 'home-hero-bottom', 'Team wearing matching uniforms'),
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-blue via-canvas to-canvas">
        <div className="container-page grid items-center gap-10 py-10 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="flex flex-col gap-6">
            <Badge tone="accent" pill className="self-start normal-case tracking-normal">
              <CircleCheck aria-hidden className="size-3.5" /> Uniform manufacturer in Cheras, KL since {company.foundedYear}
            </Badge>
            <h1 className="font-display text-display-mobile font-extrabold text-navy md:text-[3rem] md:leading-[3.5rem] lg:text-display">
              Uniforms & traditional wear, <span className="text-orange">made in Malaysia</span>
            </h1>
            <p className="max-w-xl text-base text-muted md:text-lg">
              We manufacture school, hotel, restaurant and corporate uniforms, sublimation t-shirts, Baju Melayu, Baju
              Kurung and Malay traditional wear — with in-house embroidery and printing at our Cheras, Kuala Lumpur
              facility.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" size="lg">
                View Our Products <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/request-quote?type=custom" variant="outline" size="lg">
                Request a Quote
              </ButtonLink>
            </div>
            <ul className="flex flex-col gap-2 text-sm font-medium text-ink sm:flex-row sm:flex-wrap sm:gap-x-6">
              {['Direct from the manufacturer', 'In-house embroidery & printing', 'Free digital mock-up'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-emerald-600" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative grid grid-cols-5 grid-rows-2 gap-3 md:gap-4">
            <div className="relative col-span-3 row-span-2 aspect-[3/4] overflow-hidden rounded-panel bg-surface shadow-card-hover">
              <Image
                src={hero.main.url}
                alt={hero.main.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-panel bg-surface">
              <Image
                src={hero.top.url}
                alt={hero.top.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-panel bg-surface">
              <Image
                src={hero.bottom.url}
                alt={hero.bottom.alt}
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
                <span className="font-display text-sm font-bold text-navy">{YEARS_IN_BUSINESS}+ years of uniform making</span>
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
          title="Our designs or your own?"
          description="Start from one of our proven designs, or bring your own — either way, we manufacture it for you in Cheras."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {pathways.map((p) => {
            const img = siteImage(catalog, p.imageKey, p.imageAlt);
            return (
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
                <Image src={img.url} alt={img.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
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
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white">
        <div className="container-page section-y">
          <SectionHeading
            align="left"
            eyebrow="What we make"
            title="Product categories"
            description="Uniforms, sublimation t-shirts and Malay traditional wear — all manufactured to order."
            action={
              <ButtonLink href="/products" variant="outline">
                View all products <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            }
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} count={countInCategory(catalog, c.slug)} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page section-y">
        <SectionHeading
          align="left"
          eyebrow="Popular"
          title="Featured products"
          description="Designs our customers order again and again — made in your colours with your logo."
          action={
            <ButtonLink href="/products" variant="secondary">
              All products <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          }
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} categoryName={categoryName(catalog, p.category)} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
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
