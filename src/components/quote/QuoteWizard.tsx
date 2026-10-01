'use client';

import { useRef, useState, type ChangeEvent, type DragEvent, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, CircleAlert, FileUp, Mail, RotateCcw, X } from 'lucide-react';
import { categories, COLOURS, products, SIZES, type Size } from '@/data/products';
import { logoPlacements, printingMethods } from '@/data/services';
import { contact, terms } from '@/data/site';
import {
  FABRIC_OPTIONS,
  QUANTITY_RANGES,
  STATES,
  TRACK_LABELS,
  URGENCY_LABELS,
  buildQuoteMessage,
  quoteFromParams,
  submitQuote,
  totalSizes,
  validateAll,
  validateStep,
  type PrintingChoice,
  type ProductionTrack,
  type QuoteChannel,
  type QuoteErrors,
  type QuoteRequest,
  type Urgency,
} from '@/lib/quote';
import { buttonClasses } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const STEPS = [
  { title: 'Product & quantity', hint: 'Garment, type & volume' },
  { title: 'Branding & sizes', hint: 'Printing, logo & sizes' },
  { title: 'Company & contact', hint: 'Details & delivery' },
];

const MAX_LOGO_MB = 25;
const LOGO_ACCEPT = '.ai,.eps,.pdf,.svg,.png,.jpg,.jpeg';

const inputClass =
  'h-12 w-full rounded-control border border-line bg-white px-3.5 text-sm text-ink placeholder:text-muted/70 focus:border-navy focus:ring-2 focus:ring-navy/15 focus:outline-none aria-[invalid=true]:border-danger';

const STEP_OF_FIELD: Partial<Record<keyof QuoteRequest, number>> = {
  garmentType: 1,
  quantityRange: 1,
  exactQuantity: 1,
  placements: 2,
  companyName: 3,
  contactName: 3,
  phone: 3,
  email: 3,
};

export function QuoteWizard() {
  const searchParams = useSearchParams();
  const [quote, setQuote] = useState<QuoteRequest>(() => quoteFromParams(new URLSearchParams(searchParams.toString())));
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoError, setLogoError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [sent, setSent] = useState<{ channel: QuoteChannel; url: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof QuoteRequest>(key: K, value: QuoteRequest[K]) {
    setQuote((q) => ({ ...q, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function goTo(next: number) {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function next() {
    const stepErrors = validateStep(step, quote);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) goTo(step + 1);
  }

  function send(channel: QuoteChannel) {
    const all = validateAll(quote);
    setErrors(all);
    const firstInvalid = (Object.keys(all) as (keyof QuoteRequest)[])[0];
    if (firstInvalid) {
      goTo(STEP_OF_FIELD[firstInvalid] ?? 1);
      return;
    }
    const result = submitQuote(quote, channel);
    if (channel === 'whatsapp') window.open(result.url, '_blank', 'noopener,noreferrer');
    else window.location.href = result.url;
    setSent({ channel, url: result.url });
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function acceptFile(file: File | undefined) {
    if (!file) return;
    if (file.size > MAX_LOGO_MB * 1024 * 1024) {
      setLogoError(`File is larger than ${MAX_LOGO_MB} MB. Please send it directly on WhatsApp or email.`);
      return;
    }
    setLogoError('');
    setLogoFile(file);
    update('logoFileName', file.name);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  }

  function removeLogo() {
    setLogoFile(null);
    update('logoFileName', '');
  }

  const productOptions = products.filter((p) => !quote.garmentType || p.category === quote.garmentType);
  const sizeTotal = totalSizes(quote.sizes);

  if (sent) {
    return (
      <div ref={topRef} className="scroll-mt-28 rounded-card border border-line bg-white p-6 shadow-card md:p-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="size-7" />
          </span>
          <h2 className="font-display text-headline-md font-bold text-navy">Almost done — send your message</h2>
          <p className="max-w-lg text-muted">
            {sent.channel === 'whatsapp'
              ? 'We opened WhatsApp with your quote request filled in. Press send in WhatsApp to reach our team.'
              : 'We opened your email app with your quote request filled in. Press send to reach our team.'}
            {quote.logoFileName && (
              <>
                {' '}
                <strong className="text-navy">Remember to attach your logo ({quote.logoFileName})</strong> in the chat or
                email.
              </>
            )}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={sent.url}
              target={sent.channel === 'whatsapp' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={buttonClasses(sent.channel === 'whatsapp' ? 'whatsapp' : 'secondary', 'lg')}
            >
              {sent.channel === 'whatsapp' ? <WhatsAppIcon /> : <Mail aria-hidden className="size-4" />} Open again
            </a>
            {sent.channel === 'whatsapp' && (
              <button type="button" onClick={() => send('email')} className={buttonClasses('outline', 'lg')}>
                <Mail aria-hidden className="size-4" /> Send by email instead
              </button>
            )}
            <button type="button" onClick={() => setSent(null)} className={buttonClasses('outline', 'lg')}>
              <RotateCcw aria-hidden className="size-4" /> Edit request
            </button>
          </div>
          <details className="mt-4 w-full max-w-lg rounded-control border border-line bg-surface text-left">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-navy">View your request</summary>
            <pre className="overflow-x-auto px-4 pb-4 font-sans text-xs whitespace-pre-wrap text-ink">
              {buildQuoteMessage(quote).replace(/\*/g, '')}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="flex scroll-mt-28 flex-col gap-6">
      {/* Stepper */}
      <ol className="grid grid-cols-3 gap-2 rounded-card border border-line bg-white p-3 shadow-card md:p-4" aria-label="Progress">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const done = n < step;
          const current = n === step;
          return (
            <li key={s.title}>
              <button
                type="button"
                disabled={n > step}
                onClick={() => goTo(n)}
                aria-current={current ? 'step' : undefined}
                className="flex w-full items-center gap-2.5 rounded-control p-1.5 text-left disabled:cursor-default md:p-2"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    current ? 'bg-orange text-white' : done ? 'bg-navy text-white' : 'bg-surface text-muted'
                  }`}
                >
                  {done ? <Check className="size-4" /> : n}
                </span>
                <span className="hidden flex-col sm:flex">
                  <span className={`text-sm font-semibold ${current || done ? 'text-navy' : 'text-muted'}`}>{s.title}</span>
                  <span className="text-xs text-muted">{s.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="-mt-3 text-sm font-semibold text-navy sm:hidden">
        Step {step} of 3: {STEPS[step - 1].title}
      </p>

      <div className="rounded-card border border-line bg-white p-5 shadow-card md:p-8">
        {step === 1 && (
          <div className="flex flex-col gap-8">
            <StepHeader n={1} title="Product type & quantity" />

            <Field label="What do you need?" error={errors.garmentType} required>
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
                {[...categories.map((c) => ({ id: c.slug as string, name: c.name, blurb: c.blurb })), { id: 'custom', name: 'Custom cut & sew', blurb: 'Made to your design' }].map(
                  (opt) => (
                    <OptionCard
                      key={opt.id}
                      name="garmentType"
                      checked={quote.garmentType === opt.id}
                      onChange={() => {
                        update('garmentType', opt.id);
                        if (opt.id === 'custom') update('track', 'custom-made');
                        if (quote.productSlug && products.find((p) => p.slug === quote.productSlug)?.category !== opt.id) {
                          update('productSlug', '');
                        }
                      }}
                      title={opt.name}
                      description={opt.blurb}
                    />
                  ),
                )}
              </div>
            </Field>

            {quote.garmentType && quote.garmentType !== 'custom' && productOptions.length > 0 && (
              <Field label="Specific product (optional)" htmlFor="productSlug">
                <select
                  id="productSlug"
                  className={inputClass}
                  value={quote.productSlug}
                  onChange={(e) => update('productSlug', e.target.value)}
                >
                  <option value="">Not sure / any suitable product</option>
                  {productOptions.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field label="Ready-made or custom-made?">
              <div className="grid gap-2.5 md:grid-cols-3">
                {(Object.keys(TRACK_LABELS) as ProductionTrack[]).map((t) => (
                  <OptionCard
                    key={t}
                    name="track"
                    checked={quote.track === t}
                    onChange={() => update('track', t)}
                    title={TRACK_LABELS[t].split(' (')[0]}
                    description={
                      t === 'ready-made'
                        ? `In stock + logo · ~${terms.readyMadeLeadTime}`
                        : t === 'custom-made'
                          ? `Your design · ~${terms.customMadeLeadTime}`
                          : 'We will recommend the best option'
                    }
                  />
                ))}
              </div>
            </Field>

            <Field
              label="Estimated quantity"
              error={errors.quantityRange}
              required
              hint={`MOQ: ${terms.readyMadeMoq} pcs ready-made · ${terms.customMadeMoq} pcs custom-made`}
            >
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {QUANTITY_RANGES.map((r) => (
                  <Chip key={r} active={quote.quantityRange === r} onClick={() => update('quantityRange', r)}>
                    {r}
                  </Chip>
                ))}
              </div>
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Exact quantity (if known)" htmlFor="exactQuantity" error={errors.exactQuantity}>
                <div className="relative">
                  <input
                    id="exactQuantity"
                    inputMode="numeric"
                    className={`${inputClass} pr-12`}
                    value={quote.exactQuantity}
                    onChange={(e) => update('exactQuantity', e.target.value.replace(/[^\d]/g, ''))}
                    placeholder="e.g. 120"
                    aria-invalid={!!errors.exactQuantity}
                  />
                  <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm text-muted">pcs</span>
                </div>
              </Field>
              <Field label="Fabric preference" htmlFor="fabric">
                <select id="fabric" className={inputClass} value={quote.fabric} onChange={(e) => update('fabric', e.target.value)}>
                  {FABRIC_OPTIONS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-8">
            <StepHeader n={2} title="Branding, colour & sizes" />

            <Field label="Logo / printing method">
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ...printingMethods.map((m) => ({ id: m.id as PrintingChoice, name: m.name, tagline: m.tagline })),
                  { id: 'not-sure' as PrintingChoice, name: 'Not sure', tagline: 'Recommend the best method' },
                  { id: 'none' as PrintingChoice, name: 'No branding', tagline: 'Plain garments only' },
                ].map((m) => (
                  <OptionCard
                    key={m.id}
                    name="printingMethod"
                    checked={quote.printingMethod === m.id}
                    onChange={() => update('printingMethod', m.id)}
                    title={m.name}
                    description={m.tagline}
                  />
                ))}
              </div>
            </Field>

            {quote.printingMethod !== 'none' && (
              <Field label="Logo position(s)" error={errors.placements} hint="Select all that apply">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {logoPlacements.map((p) => {
                    const checked = quote.placements.includes(p);
                    return (
                      <label
                        key={p}
                        className={`flex cursor-pointer items-center gap-2 rounded-control border px-3 py-2.5 text-sm ${
                          checked ? 'border-navy bg-surface-blue font-semibold text-navy' : 'border-line text-ink hover:bg-surface'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            update('placements', checked ? quote.placements.filter((x) => x !== p) : [...quote.placements, p])
                          }
                          className="size-4 accent-navy"
                        />
                        {p}
                      </label>
                    );
                  })}
                </div>
              </Field>
            )}

            {quote.printingMethod !== 'none' && (
              <Field label="Company logo / artwork" hint={`AI, EPS, PDF, SVG, PNG or JPG · max ${MAX_LOGO_MB} MB`}>
                {logoFile || quote.logoFileName ? (
                  <div className="flex items-center justify-between gap-3 rounded-control border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <FileUp aria-hidden className="size-5 shrink-0 text-emerald-700" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-navy">{quote.logoFileName}</p>
                        <p className="text-xs text-muted">
                          {logoFile ? `${(logoFile.size / 1024 / 1024).toFixed(2)} MB · ` : ''}Attach this file in WhatsApp or email
                          after you submit.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-control text-muted hover:bg-white hover:text-danger"
                      aria-label="Remove logo"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-card border-2 border-dashed p-8 text-center transition ${
                      dragging ? 'border-orange bg-orange-soft' : 'border-line-strong bg-surface hover:border-steel'
                    }`}
                  >
                    <FileUp aria-hidden className="size-8 text-steel" />
                    <span className="text-sm font-semibold text-navy">
                      Drop your logo here, or <span className="text-orange-ink underline">browse files</span>
                    </span>
                    <span className="text-xs text-muted">No vector file? Send what you have — we will advise.</span>
                    <input
                      type="file"
                      accept={LOGO_ACCEPT}
                      className="sr-only"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => acceptFile(e.target.files?.[0])}
                    />
                  </label>
                )}
                {logoError && (
                  <p role="alert" className="mt-2 text-sm text-danger">
                    {logoError}
                  </p>
                )}
              </Field>
            )}

            <Field label="Garment colour" hint="Choose a colour or type your own (e.g. Pantone code)">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2.5">
                  {Object.values(COLOURS).map((c) => {
                    const active = quote.colour === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => update('colour', active ? '' : c.name)}
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
                <input
                  className={inputClass}
                  value={quote.colour}
                  onChange={(e) => update('colour', e.target.value)}
                  placeholder="e.g. Navy body, orange collar, or Pantone 289 C"
                  aria-label="Colour or Pantone code"
                />
              </div>
            </Field>

            <Field label="Size breakdown (optional)" hint="An estimate is fine — you can adjust before production">
              <div className="overflow-x-auto">
                <div className="grid min-w-[34rem] grid-cols-9 overflow-hidden rounded-control border border-line">
                  {SIZES.map((s) => (
                    <label key={s} className="flex flex-col border-r border-line last:border-r-0">
                      <span className="bg-navy py-1.5 text-center text-xs font-semibold text-white">{s}</span>
                      <input
                        inputMode="numeric"
                        className="h-11 w-full text-center text-sm tabular-nums focus:bg-surface-blue focus:outline-none"
                        value={quote.sizes[s] ?? ''}
                        onChange={(e) => {
                          const n = Number.parseInt(e.target.value.replace(/[^\d]/g, ''), 10);
                          const sizes: Partial<Record<Size, number>> = { ...quote.sizes };
                          if (Number.isFinite(n) && n > 0) sizes[s] = n;
                          else delete sizes[s];
                          update('sizes', sizes);
                        }}
                        placeholder="0"
                        aria-label={`Quantity in size ${s}`}
                      />
                    </label>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-right text-sm font-semibold text-navy tabular-nums">Total: {sizeTotal} pcs</p>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-8">
            <StepHeader n={3} title="Company, contact & delivery" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Company / organisation" htmlFor="companyName" error={errors.companyName} required>
                <input
                  id="companyName"
                  className={inputClass}
                  value={quote.companyName}
                  onChange={(e) => update('companyName', e.target.value)}
                  autoComplete="organization"
                  aria-invalid={!!errors.companyName}
                  placeholder="e.g. ABC Sdn Bhd"
                />
              </Field>
              <Field label="SSM no. (optional)" htmlFor="ssmNumber">
                <input
                  id="ssmNumber"
                  className={inputClass}
                  value={quote.ssmNumber}
                  onChange={(e) => update('ssmNumber', e.target.value)}
                  placeholder="For invoicing"
                />
              </Field>
              <Field label="Your name" htmlFor="contactName" error={errors.contactName} required>
                <input
                  id="contactName"
                  className={inputClass}
                  value={quote.contactName}
                  onChange={(e) => update('contactName', e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.contactName}
                />
              </Field>
              <Field label="Job title / department" htmlFor="designation">
                <input
                  id="designation"
                  className={inputClass}
                  value={quote.designation}
                  onChange={(e) => update('designation', e.target.value)}
                  autoComplete="organization-title"
                  placeholder="e.g. HR Executive"
                />
              </Field>
              <Field label="Phone / WhatsApp" htmlFor="phone" error={errors.phone} required>
                <input
                  id="phone"
                  type="tel"
                  className={inputClass}
                  value={quote.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  placeholder="e.g. 012-345 6789"
                />
              </Field>
              <Field label="Email (optional)" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={quote.email}
                  onChange={(e) => update('email', e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  placeholder="you@company.com.my"
                />
              </Field>
              <Field label="Delivery state" htmlFor="state">
                <select id="state" className={inputClass} value={quote.state} onChange={(e) => update('state', e.target.value)}>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Needed by (optional)" htmlFor="deliveryDate">
                <input
                  id="deliveryDate"
                  type="date"
                  className={inputClass}
                  value={quote.deliveryDate}
                  onChange={(e) => update('deliveryDate', e.target.value)}
                />
              </Field>
            </div>

            <Field label="How urgent is this?">
              <div className="grid gap-2 md:grid-cols-3">
                {(Object.keys(URGENCY_LABELS) as Urgency[]).map((u) => (
                  <Chip key={u} active={quote.urgency === u} onClick={() => update('urgency', u)}>
                    {URGENCY_LABELS[u]}
                  </Chip>
                ))}
              </div>
            </Field>

            <Field label="Anything else? (optional)" htmlFor="notes">
              <textarea
                id="notes"
                className={`${inputClass} h-28 py-3`}
                value={quote.notes}
                onChange={(e) => update('notes', e.target.value)}
                placeholder="e.g. names on sleeves, packing per department, delivery to 2 branches…"
              />
            </Field>

            {Object.values(errors).some(Boolean) && (
              <p role="alert" className="flex items-center gap-2 rounded-control bg-red-50 p-3 text-sm font-medium text-danger">
                <CircleAlert aria-hidden className="size-4 shrink-0" /> Please check the highlighted fields.
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button type="button" onClick={() => goTo(step - 1)} className={buttonClasses('outline', 'lg')}>
              <ArrowLeft aria-hidden className="size-4" /> Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < 3 ? (
            <button type="button" onClick={next} className={buttonClasses('primary', 'lg')}>
              Continue <ArrowRight aria-hidden className="size-4" />
            </button>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => send('email')} className={buttonClasses('outline', 'lg')}>
                <Mail aria-hidden className="size-4" /> Send by email
              </button>
              <button type="button" onClick={() => send('whatsapp')} className={buttonClasses('whatsapp', 'lg')}>
                <WhatsAppIcon /> Send via WhatsApp
              </button>
            </div>
          )}
        </div>
        {step === 3 && (
          <p className="mt-4 text-xs text-muted">
            Your request opens in WhatsApp ({contact.whatsapp.display}) or your email app ({contact.email}) ready to send.
            Nothing is stored on this website.
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Small form building blocks
// ─────────────────────────────────────────────

function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line pb-4">
      <span className="flex size-8 items-center justify-center rounded-control bg-navy text-sm font-bold text-white">
        {String(n).padStart(2, '0')}
      </span>
      <h2 className="font-display text-headline-sm font-bold text-navy">{title}</h2>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const labelEl = (
    <span className="text-sm font-semibold text-navy">
      {label}
      {required && <span className="text-orange-ink"> *</span>}
    </span>
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        {htmlFor ? <label htmlFor={htmlFor}>{labelEl}</label> : labelEl}
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function OptionCard({
  name,
  checked,
  onChange,
  title,
  description,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
}) {
  return (
    <label
      className={`relative flex cursor-pointer flex-col gap-0.5 rounded-control border p-3.5 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange ${
        checked ? 'border-orange bg-orange-soft ring-1 ring-orange' : 'border-line bg-white hover:border-line-strong hover:bg-surface'
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="pr-5 text-sm font-semibold text-navy">{title}</span>
      {description && <span className="text-xs text-muted">{description}</span>}
      {checked && <Check aria-hidden className="absolute top-3 right-3 size-4 text-orange" />}
    </label>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm font-semibold transition ${
        active ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-line-strong hover:bg-surface'
      }`}
    >
      {children}
    </button>
  );
}
