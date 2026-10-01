import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { company, contact, CURRENT_YEAR, mainNav, social } from '@/data/site';
import { categories } from '@/data/products';
import { printingMethods } from '@/data/services';
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Logo } from './Logo';

export function Footer() {
  const socials = Object.entries(social).filter(([, url]) => url);

  return (
    <footer className="bg-navy-950 text-sky">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo light />
          <p className="text-sm leading-relaxed">
            {company.name} ({company.registration}) — {company.description}
          </p>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" />
              <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {contact.address.full}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-orange" />
              <span>
                {contact.hours[0].days}: {contact.hours[0].time}
              </span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">Uniforms</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/ready-made?category=${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">Services</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/ready-made" className="hover:text-white">Ready-Made Uniforms</Link>
            </li>
            <li>
              <Link href="/custom-made" className="hover:text-white">Custom-Made Uniforms</Link>
            </li>
            {printingMethods.map((m) => (
              <li key={m.id}>
                <Link href={`/printing#${m.id}`} className="hover:text-white">
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">Company</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {mainNav
              .filter((n) => ['/industries', '/about', '/contact'].includes(n.href))
              .map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/request-quote" className="font-semibold text-orange-line hover:text-white">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">Talk to us</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <WhatsAppIcon className="size-4 text-whatsapp" /> {contact.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.mobile.tel}`} className="flex items-center gap-2 hover:text-white">
                <Phone aria-hidden className="size-4 text-orange" /> {contact.mobile.display}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.office.tel}`} className="flex items-center gap-2 hover:text-white">
                <Phone aria-hidden className="size-4 text-orange" /> {contact.office.display} (office)
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 break-all hover:text-white">
                <Mail aria-hidden className="size-4 shrink-0 text-orange" /> {contact.email}
              </a>
            </li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-3 text-sm">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {CURRENT_YEAR} {company.name} ({company.registration}). All rights reserved.
          </p>
          <p>Uniform supplier in Cheras, Kuala Lumpur, Malaysia.</p>
        </div>
      </div>
    </footer>
  );
}
