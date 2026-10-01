'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { priceForQuantity, type Product } from '@/data/products';
import { printingMethods, type PrintingMethodId } from '@/data/services';
import { terms } from '@/data/site';
import { formatRM } from '@/lib/format';
import { whatsappUrl } from '@/lib/whatsapp';
import { buttonClasses } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

type Branding = PrintingMethodId | 'none';

const QUICK_QTY = [50, 100, 300];

export function ProductOrderPanel({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0]?.name ?? '');
  const [qty, setQty] = useState(Math.max(terms.readyMadeMoq, 50));
  const [branding, setBranding] = useState<Branding>('embroidery');

  const tier = priceForQuantity(product, qty);
  const subtotal = tier.price * qty;
  const brandingName = branding === 'none' ? 'No branding' : printingMethods.find((m) => m.id === branding)?.name;

  const quoteHref = `/request-quote?${new URLSearchParams({
    product: product.slug,
    qty: String(qty),
    colour,
    method: branding,
  }).toString()}`;

  const waMessage = [
    `Hi Kah Global, I would like a quote for:`,
    `• ${product.name}`,
    `• Colour: ${colour}`,
    `• Quantity: ${qty} pcs`,
    `• Branding: ${brandingName}`,
    `Please advise price and lead time. Thank you.`,
  ].join('\n');

  function changeQty(next: number) {
    setQty(Math.min(99999, Math.max(1, Math.round(next) || 1)));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Colour */}
      <fieldset>
        <legend className="mb-2.5 flex w-full items-center justify-between text-sm">
          <span>
            <span className="font-semibold text-navy">Colour:</span> <span className="text-ink">{colour}</span>
          </span>
          <span className="text-xs text-muted">{product.colours.length} colours</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {product.colours.map((c) => {
            const active = c.name === colour;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setColour(c.name)}
                aria-pressed={active}
                aria-label={c.name}
                title={c.name}
                className={`size-9 rounded-full border-2 transition ${
                  active ? 'border-orange ring-2 ring-orange/30' : 'border-white shadow-[0_0_0_1px_var(--color-line-strong)]'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </fieldset>

      {/* Sizes (info) */}
      <div>
        <p className="mb-2.5 text-sm">
          <span className="font-semibold text-navy">Sizes available</span>{' '}
          <span className="text-muted">(Asian fit — mix sizes in one order)</span>
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <li
              key={s}
              className="flex h-9 min-w-11 items-center justify-center rounded-control border border-line bg-white px-2 text-xs font-semibold text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
        {product.plusSizeSurcharge ? (
          <p className="mt-2 text-xs text-muted">
            3XL and above: +{formatRM(product.plusSizeSurcharge)} per piece.
          </p>
        ) : null}
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="qty" className="text-sm font-semibold text-navy">
            Quantity
          </label>
          <div className="flex h-11 items-center overflow-hidden rounded-control border border-line bg-white">
            <button
              type="button"
              onClick={() => changeQty(qty - 10)}
              className="flex h-full w-10 items-center justify-center text-navy hover:bg-surface"
              aria-label="Decrease quantity by 10"
            >
              <Minus className="size-4" />
            </button>
            <input
              id="qty"
              type="number"
              inputMode="numeric"
              min={1}
              value={qty}
              onChange={(e) => changeQty(Number(e.target.value))}
              className="h-full w-20 border-x border-line text-center font-semibold text-navy tabular-nums focus:outline-none"
            />
            <button
              type="button"
              onClick={() => changeQty(qty + 10)}
              className="flex h-full w-10 items-center justify-center text-navy hover:bg-surface"
              aria-label="Increase quantity by 10"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <div className="flex gap-1.5">
            {QUICK_QTY.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => changeQty(n)}
                className={`h-9 rounded-control border px-3 text-xs font-semibold ${
                  qty === n ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:bg-surface-blue'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-3 border-t border-line pt-3">
          <div>
            <p className="text-xs text-muted">Estimated garment cost (excl. branding & SST)</p>
            <p className="font-display text-headline-sm font-extrabold text-navy tabular-nums">{formatRM(subtotal)}</p>
          </div>
          <p className="text-right text-xs font-semibold text-emerald-700 tabular-nums">
            {formatRM(tier.price)} / pc
            <br />
            <span className="font-normal text-muted">{tier.label} rate</span>
          </p>
        </div>
        {qty < terms.readyMadeMoq && (
          <p className="text-xs text-orange-ink">
            Logo orders start from {terms.readyMadeMoq} pcs. Smaller quantities may be available plain — ask us.
          </p>
        )}
      </div>

      {/* Branding */}
      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-navy">Logo / branding</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[{ id: 'none' as const, name: 'No branding', tagline: 'Plain garments' }, ...printingMethods].map((m) => {
            const active = branding === m.id;
            return (
              <label
                key={m.id}
                className={`flex cursor-pointer items-start gap-3 rounded-control border p-3 text-sm transition ${
                  active ? 'border-orange bg-orange-soft' : 'border-line bg-white hover:border-line-strong'
                }`}
              >
                <input
                  type="radio"
                  name="branding"
                  value={m.id}
                  checked={active}
                  onChange={() => setBranding(m.id)}
                  className="mt-0.5 accent-orange"
                />
                <span className="flex flex-col">
                  <span className="font-semibold text-navy">{m.name}</span>
                  <span className="text-xs text-muted">{m.tagline}</span>
                </span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted">Branding is priced on your quote, based on logo size, colours and position.</p>
      </fieldset>

      {/* CTAs */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={quoteHref} className={buttonClasses('primary', 'lg')}>
          Request a Quote <ArrowRight aria-hidden className="size-4" />
        </Link>
        <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" className={buttonClasses('whatsapp', 'lg')}>
          <WhatsAppIcon /> WhatsApp Quote
        </a>
      </div>
    </div>
  );
}
