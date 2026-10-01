import { Suspense } from 'react';
import { Clock, FileCheck, Phone, Shirt, Truck } from 'lucide-react';
import { contact, quoteFaqs, terms } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/whatsapp';
import { PageHero } from '@/components/sections/PageHero';
import { QuoteWizard } from '@/components/quote/QuoteWizard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqList } from '@/components/ui/FaqList';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const metadata = pageMetadata({
  title: 'Request a Quote — Corporate Uniform & T-Shirt Printing Quotation',
  description:
    'Get a free quotation for corporate uniforms, baju korporat, polo shirts and custom t-shirt printing in Kuala Lumpur. Tell us the product, quantity and logo — reply via WhatsApp.',
  path: '/request-quote',
  keywords: ['uniform quotation Malaysia', 'sebut harga baju korporat', 't-shirt printing quote KL'],
});

const promises = [
  { icon: Clock, title: `Reply within ${terms.quoteResponse}`, text: 'On working days' },
  { icon: FileCheck, title: 'Free digital mock-up', text: 'See your logo before you pay' },
  { icon: Shirt, title: `MOQ from ${terms.readyMadeMoq} pcs`, text: 'Mix sizes in one order' },
  { icon: Truck, title: 'Delivery across Malaysia', text: 'Or collect in Cheras' },
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Request a Quote' }]}
        eyebrow="Free quotation · 3 quick steps"
        title="Request a uniform quotation"
        description="Tell us what you need, how many, and how you want your logo applied. We will reply with itemised pricing and a free digital mock-up."
      />

      <div className="container-page grid gap-8 py-8 md:py-12 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
        <Suspense fallback={<div className="h-[36rem] animate-pulse rounded-card bg-surface" aria-hidden />}>
          <QuoteWizard />
        </Suspense>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card bg-navy p-6 text-white">
            <p className="text-label font-semibold uppercase text-orange-line">Why request a quote</p>
            <ul className="mt-4 flex flex-col gap-4">
              {promises.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-white/10">
                    <p.icon aria-hidden className="size-4 text-orange-line" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{p.title}</span>
                    <span className="text-xs text-sky">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 shadow-card">
            <p className="font-display font-bold text-navy">Prefer to talk?</p>
            <p className="text-sm text-muted">Speak directly with our team.</p>
            <a
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-control border border-line p-3 text-sm hover:border-whatsapp hover:bg-surface"
            >
              <span className="flex items-center gap-2 font-semibold text-navy">
                <WhatsAppIcon className="size-5 text-whatsapp" /> WhatsApp
              </span>
              <span className="text-muted">{contact.whatsapp.display}</span>
            </a>
            <a
              href={`tel:${contact.mobile.tel}`}
              className="flex items-center justify-between gap-3 rounded-control border border-line p-3 text-sm hover:border-steel hover:bg-surface"
            >
              <span className="flex items-center gap-2 font-semibold text-navy">
                <Phone aria-hidden className="size-4 text-steel" /> Call
              </span>
              <span className="text-muted">{contact.mobile.display}</span>
            </a>
            <a
              href={`tel:${contact.office.tel}`}
              className="flex items-center justify-between gap-3 rounded-control border border-line p-3 text-sm hover:border-steel hover:bg-surface"
            >
              <span className="flex items-center gap-2 font-semibold text-navy">
                <Phone aria-hidden className="size-4 text-steel" /> Office
              </span>
              <span className="text-muted">{contact.office.display}</span>
            </a>
            <p className="text-xs text-muted">
              {contact.hours[0].days}: {contact.hours[0].time}
            </p>
          </div>
        </aside>
      </div>

      <section className="container-page section-y">
        <SectionHeading eyebrow="Before you order" title="Frequently asked questions" />
        <div className="mx-auto max-w-3xl">
          <FaqList faqs={quoteFaqs} />
        </div>
      </section>
    </>
  );
}
