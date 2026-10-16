'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ADD_ONS, type AddOnId, type Product } from '@/lib/catalog/types';
import { whatsappUrl } from '@/lib/whatsapp';
import { buttonClasses } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/** Colour, quantity and add-on selection that pre-fills a quote request. */
export function ProductEnquiryPanel({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0] ?? '');
  const [qty, setQty] = useState(String(Math.max(product.moq, 1)));
  const [addOns, setAddOns] = useState<AddOnId[]>(product.addOns.slice(0, 1));

  const available = ADD_ONS.filter((a) => product.addOns.includes(a.id));
  const qtyNumber = Number.parseInt(qty, 10) || 0;
  const belowMoq = qtyNumber > 0 && qtyNumber < product.moq;

  const toggle = (id: AddOnId) => setAddOns((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const params = new URLSearchParams({ product: product.slug });
  if (qtyNumber > 0) params.set('qty', String(qtyNumber));
  if (colour) params.set('colour', colour);
  if (addOns.length) params.set('addons', addOns.join(','));

  const waMessage = [
    'Hi Kah Global, I would like a quotation for:',
    `• ${product.name}`,
    colour ? `• Colour: ${colour}` : null,
    qtyNumber ? `• Quantity: ${qtyNumber} pcs` : null,
    addOns.length ? `• Add-ons: ${available.filter((a) => addOns.includes(a.id)).map((a) => a.name).join(', ')}` : null,
    'Please advise price and lead time. Thank you.',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="flex flex-col gap-6 rounded-card border border-line bg-white p-5 shadow-card md:p-6">
      {product.colours.length > 0 && (
        <fieldset>
          <legend className="mb-2.5 text-sm font-semibold text-navy">Colour</legend>
          <div className="flex flex-wrap gap-2">
            {product.colours.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColour(c)}
                aria-pressed={colour === c}
                className={`min-h-9 rounded-control border px-3 py-1.5 text-sm font-medium ${
                  colour === c ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:bg-surface'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="qty" className="text-sm font-semibold text-navy">
          Quantity <span className="font-normal text-muted">(minimum {product.moq} pcs)</span>
        </label>
        <div className="relative max-w-48">
          <input
            id="qty"
            inputMode="numeric"
            value={qty}
            onChange={(e) => setQty(e.target.value.replace(/[^\d]/g, '').slice(0, 6))}
            className="h-11 w-full rounded-control border border-line bg-white pr-12 pl-3.5 font-semibold text-navy tabular-nums focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none"
          />
          <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm text-muted">pcs</span>
        </div>
        {belowMoq && (
          <p className="text-xs text-orange-ink">The minimum order for this item is {product.moq} pcs — ask us if you need fewer.</p>
        )}
      </div>

      {available.length > 0 && (
        <fieldset>
          <legend className="mb-2.5 text-sm font-semibold text-navy">Add-ons</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {available.map((a) => {
              const active = addOns.includes(a.id);
              return (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-control border p-3 text-sm transition ${
                    active ? 'border-orange bg-orange-soft' : 'border-line bg-white hover:border-line-strong'
                  }`}
                >
                  <input type="checkbox" checked={active} onChange={() => toggle(a.id)} className="mt-0.5 accent-orange" />
                  <span className="flex flex-col">
                    <span className="font-semibold text-navy">{a.name}</span>
                    <span className="text-xs text-muted">{a.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
            <Check aria-hidden className="size-3.5 text-emerald-600" /> All add-ons are priced on your quotation.
          </p>
        </fieldset>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={`/request-quote?${params.toString()}`} className={buttonClasses('primary', 'lg')}>
          Request a Quote <ArrowRight aria-hidden className="size-4" />
        </Link>
        <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" className={buttonClasses('whatsapp', 'lg')}>
          <WhatsAppIcon /> WhatsApp Quote
        </a>
      </div>
    </div>
  );
}
