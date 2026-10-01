'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react';
import { contact, mainNav, promoBar } from '@/data/site';
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from '@/lib/whatsapp';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Logo } from './Logo';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* Top promo bar */}
      <div className="bg-navy-950 text-white">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-xs md:text-sm">
          <p className="truncate">
            <span className="hidden sm:inline">{promoBar.message} </span>
            <span className="sm:hidden">Ready stock + your logo. </span>
            <Link href={promoBar.cta.href} className="font-semibold text-orange-line underline-offset-2 hover:underline">
              {promoBar.cta.label} →
            </Link>
          </p>
          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <a href={`tel:${contact.office.tel}`} className="flex items-center gap-1.5 text-sky hover:text-white">
              <Phone aria-hidden className="size-3.5" /> {contact.office.display}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-sky hover:text-white">
              <Mail aria-hidden className="size-3.5" /> {contact.email}
            </a>
            <a
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-semibold text-white hover:text-whatsapp"
            >
              <WhatsAppIcon className="size-3.5" /> WhatsApp {contact.whatsapp.display}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative rounded-control px-3 py-2 text-sm font-semibold transition-colors ${
                        active ? 'text-orange-ink' : 'text-ink hover:bg-surface hover:text-navy'
                      }`}
                    >
                      {item.label}
                      {active && <span className="absolute inset-x-3 -bottom-[1.05rem] h-0.5 rounded-full bg-orange" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${contact.mobile.tel}`}
              className="hidden flex-col items-end leading-tight xl:flex"
              aria-label={`Call ${contact.mobile.display}`}
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">Call us</span>
              <span className="font-display text-sm font-bold text-navy">{contact.mobile.display}</span>
            </a>
            <ButtonLink href="/request-quote" size="sm" className="hidden sm:inline-flex md:h-10 md:px-4">
              Get a Quote <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-control border border-line text-navy hover:bg-surface lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 animate-fade-in bg-navy-950/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm animate-slide-in-left flex-col bg-white shadow-overlay">
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-control text-navy hover:bg-surface"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex flex-col rounded-control px-3 py-3 ${
                          active ? 'bg-orange-soft text-orange-ink' : 'text-navy hover:bg-surface'
                        }`}
                      >
                        <span className="font-semibold">{item.label}</span>
                        {item.description && <span className="text-sm text-muted">{item.description}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex flex-col gap-2 border-t border-line p-5">
              <ButtonLink href="/request-quote" onClick={() => setOpen(false)} size="lg">
                Request a Quote <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonAnchor
                href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
              >
                <WhatsAppIcon /> WhatsApp {contact.whatsapp.display}
              </ButtonAnchor>
              <ButtonAnchor href={`tel:${contact.mobile.tel}`} variant="outline" size="lg">
                <Phone aria-hidden className="size-4" /> Call {contact.mobile.display}
              </ButtonAnchor>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
