import { ArrowRight, Phone } from 'lucide-react';
import { contact, terms } from '@/data/site';
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/whatsapp';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function CTABanner({
  eyebrow = 'Free quotation',
  title = 'Need 30 or 3,000 uniforms? Get a quote today.',
  description = `Tell us the garment, quantity and logo. We reply within ${terms.quoteResponse} with pricing and a digital mock-up.`,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="container-page section-y">
      <div className="relative overflow-hidden rounded-panel bg-navy px-6 py-10 md:px-12 md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-steel/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-orange/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-label font-semibold uppercase text-orange-line">{eyebrow}</p>
            <h2 className="font-display text-headline-lg-mobile font-bold text-white md:text-headline-lg">{title}</h2>
            <p className="text-sky md:text-lg">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonLink href="/request-quote" size="lg">
              Request a Quote <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonAnchor
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon /> WhatsApp Us
            </ButtonAnchor>
            <ButtonAnchor href={`tel:${contact.mobile.tel}`} variant="ghost-light" size="lg" className="sm:hidden">
              <Phone aria-hidden className="size-4" /> {contact.mobile.display}
            </ButtonAnchor>
          </div>
        </div>
      </div>
    </section>
  );
}
