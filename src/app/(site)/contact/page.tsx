import Link from 'next/link';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { company, contact } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/whatsapp';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ButtonAnchor } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const metadata = pageMetadata({
  title: 'Contact Kah Global — Uniform Supplier in Cheras, Kuala Lumpur',
  description: `Contact ${company.name} in Cheras, Kuala Lumpur. WhatsApp ${contact.whatsapp.display}, call ${contact.mobile.display} or ${contact.office.display}, or email ${contact.email} for uniform quotations.`,
  path: '/contact',
  keywords: ['uniform shop Cheras', 'uniform supplier near me KL', 'Kah Global contact'],
});

const channels = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: contact.whatsapp.display,
    href: whatsappUrl(DEFAULT_WHATSAPP_MESSAGE),
    note: 'Fastest reply — quotes & orders',
    external: true,
  },
  { icon: Phone, label: 'Call (mobile)', value: contact.mobile.display, href: `tel:${contact.mobile.tel}`, note: 'Sales enquiries' },
  { icon: Phone, label: 'Office', value: contact.office.display, href: `tel:${contact.office.tel}`, note: 'During office hours' },
  { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}`, note: 'Quotations & documents' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="We’re here to help"
        title="Contact us"
        description="Questions about uniforms, printing or an existing order? Message us on WhatsApp, call, or send the form below."
      />

      <section className="container-page grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex flex-col gap-2 rounded-card border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <span className="flex size-11 items-center justify-center rounded-control bg-surface-blue text-steel group-hover:bg-orange group-hover:text-white">
              <c.icon aria-hidden className="size-5" />
            </span>
            <span className="text-label font-semibold uppercase text-muted">{c.label}</span>
            <span className="font-display font-bold break-all text-navy">{c.value}</span>
            <span className="text-xs text-muted">{c.note}</span>
          </a>
        ))}
      </section>

      <section className="container-page grid gap-8 pb-16 lg:grid-cols-5">
        <div className="rounded-card border border-line bg-white p-6 shadow-card md:p-8 lg:col-span-3">
          <h2 className="font-display text-headline-md font-bold text-navy">Send us a message</h2>
          <p className="mt-1 mb-6 text-sm text-muted">
            For a detailed quotation with logo and sizes, use our{' '}
            <Link href="/request-quote" className="font-semibold text-orange-ink hover:underline">
              Request a Quote
            </Link>{' '}
            form.
          </p>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-card">
            <h2 className="font-display text-headline-sm font-bold text-navy">Visit us</h2>
            <p className="flex gap-3 text-sm text-ink">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" />
              <span>
                {company.name}
                <br />
                {contact.address.full}
              </span>
            </p>
            <div className="flex gap-3 text-sm text-ink">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" />
              <dl className="flex flex-col gap-1">
                {contact.hours.map((h) => (
                  <div key={h.days}>
                    <dt className="inline font-semibold text-navy">{h.days}: </dt>
                    <dd className="inline">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonAnchor href={contact.mapUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                <Navigation aria-hidden className="size-4" /> Get directions
              </ButtonAnchor>
              <ButtonAnchor
                href={whatsappUrl('Hi Kah Global, I would like to visit your Cheras location. When is a good time?')}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                <WhatsAppIcon className="size-5 text-whatsapp" /> Book a visit
              </ButtonAnchor>
            </div>
          </div>
          <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <iframe
              title={`Map showing ${company.name} in Cheras, Kuala Lumpur`}
              src={contact.mapEmbedUrl}
              className="aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
