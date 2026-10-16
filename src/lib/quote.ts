/**
 * Quote request model — shared by the Request a Quote wizard and product pages.
 *
 * Today a submission is handed off to WhatsApp (primary) or email (fallback)
 * as a pre-filled message. To add a backend later, implement `submitQuote`
 * (e.g. POST to /app/api/quote/route.ts or a Server Action that emails the
 * team and stores the logo file) — the UI only depends on the types and
 * functions exported here.
 */
import { contact, company } from '@/data/site';
import { ADD_ON_IDS, addOnName, type AddOnId } from '@/lib/catalog/types';
import { whatsappUrl } from '@/lib/whatsapp';

export const SIZES = ['Kids', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'] as const;
export type Size = (typeof SIZES)[number];

export type ProductionTrack = 'our-design' | 'custom-made' | 'not-sure';
export type Urgency = 'urgent' | 'standard' | 'planning';

/** The slice of the catalogue the quote form needs (kept small for the client bundle). */
export type QuoteCatalog = {
  categories: { slug: string; name: string }[];
  products: { slug: string; name: string; category: string; moq: number; addOns: AddOnId[] }[];
};

export type QuoteRequest = {
  // Step 1 — product & quantity
  garmentType: string; // category slug or "custom"
  productSlug: string;
  track: ProductionTrack;
  quantityRange: string;
  exactQuantity: string;
  fabric: string;
  // Step 2 — add-ons, logo & sizes
  addOns: AddOnId[];
  placements: string[];
  logoFileName: string;
  colour: string;
  sizes: Partial<Record<Size, number>>;
  // Step 3 — company & contact
  companyName: string;
  ssmNumber: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  state: string;
  deliveryDate: string;
  urgency: Urgency;
  notes: string;
};

export const QUANTITY_RANGES = ['Below 30 pcs', '30 – 99 pcs', '100 – 299 pcs', '300 – 499 pcs', '500 – 999 pcs', '1,000+ pcs'];

export const FABRIC_OPTIONS = [
  'Not sure — please recommend',
  'Poly-cotton / Tetron (school & office)',
  'Honeycomb piqué (polo)',
  'Cotton (t-shirt)',
  'Microfibre / dri-fit (sublimation)',
  'Cotton / Jacquard (Baju Melayu)',
  'Crepe / Satin (Baju Kurung, kebaya)',
];

export const STATES = [
  'Kuala Lumpur',
  'Selangor',
  'Putrajaya',
  'Negeri Sembilan',
  'Melaka',
  'Johor',
  'Pahang',
  'Perak',
  'Penang',
  'Kedah',
  'Perlis',
  'Kelantan',
  'Terengganu',
  'Sabah',
  'Sarawak',
  'Labuan',
  'Outside Malaysia',
];

export const URGENCY_LABELS: Record<Urgency, string> = {
  urgent: 'Urgent (within 7 days)',
  standard: 'Standard (2–3 weeks)',
  planning: 'Planning / budgeting stage',
};

export const TRACK_LABELS: Record<ProductionTrack, string> = {
  'our-design': 'One of your designs (in our colours + logo)',
  'custom-made': 'Custom-made to our own design',
  'not-sure': 'Not sure yet — please advise',
};

/** Add-ons that put a logo on the garment (logo position applies to these). */
export const LOGO_ADD_ONS: AddOnId[] = ['embroidery', 'silkscreen', 'dtf', 'sublimation'];

export const emptyQuote: QuoteRequest = {
  garmentType: '',
  productSlug: '',
  track: 'our-design',
  quantityRange: '',
  exactQuantity: '',
  fabric: FABRIC_OPTIONS[0],
  addOns: ['embroidery'],
  placements: ['Left chest'],
  logoFileName: '',
  colour: '',
  sizes: {},
  companyName: '',
  ssmNumber: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
  state: 'Kuala Lumpur',
  deliveryDate: '',
  urgency: 'standard',
  notes: '',
};

/** Pre-fill from URL params, e.g. /request-quote?product=…&qty=…&colour=…&addons=embroidery,dtf */
export function quoteFromParams(params: URLSearchParams, catalog: QuoteCatalog): QuoteRequest {
  const quote: QuoteRequest = { ...emptyQuote, sizes: {}, placements: [...emptyQuote.placements], addOns: [...emptyQuote.addOns] };

  const product = catalog.products.find((p) => p.slug === params.get('product'));
  if (product) {
    quote.productSlug = product.slug;
    quote.garmentType = product.category;
    quote.addOns = quote.addOns.filter((a) => product.addOns.includes(a));
  }

  const category = params.get('category');
  if (category && catalog.categories.some((c) => c.slug === category)) quote.garmentType = category;

  const track = params.get('track');
  if (track === 'custom-made' || params.get('type') === 'custom') {
    quote.track = 'custom-made';
    quote.garmentType = quote.garmentType || 'custom';
  }

  const qty = Number.parseInt(params.get('qty') ?? '', 10);
  if (Number.isFinite(qty) && qty > 0) {
    quote.exactQuantity = String(qty);
    quote.quantityRange = rangeForQuantity(qty);
  }

  const colour = params.get('colour');
  if (colour) quote.colour = colour.slice(0, 60);

  const addons = (params.get('addons') ?? params.get('method') ?? '')
    .split(',')
    .filter((a): a is AddOnId => ADD_ON_IDS.includes(a as AddOnId));
  if (addons.length) quote.addOns = [...new Set(addons)];

  return quote;
}

function rangeForQuantity(qty: number): string {
  if (qty >= 1000) return QUANTITY_RANGES[5];
  if (qty >= 500) return QUANTITY_RANGES[4];
  if (qty >= 300) return QUANTITY_RANGES[3];
  if (qty >= 100) return QUANTITY_RANGES[2];
  if (qty >= 30) return QUANTITY_RANGES[1];
  return QUANTITY_RANGES[0];
}

export function totalSizes(sizes: QuoteRequest['sizes']): number {
  return SIZES.reduce((sum, size) => sum + (sizes[size] ?? 0), 0);
}

export function hasLogoAddOn(q: QuoteRequest): boolean {
  return q.addOns.some((a) => LOGO_ADD_ONS.includes(a));
}

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{8,16}$/;

/** Validate one wizard step (1–3). Returns an empty object when valid. */
export function validateStep(step: number, q: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (step === 1) {
    if (!q.garmentType) errors.garmentType = 'Please choose what you need.';
    if (!q.quantityRange && !q.exactQuantity) errors.quantityRange = 'Please choose an estimated quantity.';
    if (q.exactQuantity && !/^\d+$/.test(q.exactQuantity)) errors.exactQuantity = 'Numbers only, please.';
  }
  if (step === 2) {
    if (hasLogoAddOn(q) && q.placements.length === 0) errors.placements = 'Choose at least one logo position.';
  }
  if (step === 3) {
    if (!q.companyName.trim()) errors.companyName = 'Company, school or organisation name is required.';
    if (!q.contactName.trim()) errors.contactName = 'Your name is required.';
    if (!PHONE_RE.test(q.phone.trim())) errors.phone = 'Enter a valid phone / WhatsApp number.';
    if (q.email.trim() && !EMAIL_RE.test(q.email.trim())) errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export function validateAll(q: QuoteRequest): QuoteErrors {
  return { ...validateStep(1, q), ...validateStep(2, q), ...validateStep(3, q) };
}

function garmentLabel(q: QuoteRequest, catalog: QuoteCatalog): string {
  if (q.garmentType === 'custom') return 'Custom design';
  return catalog.categories.find((c) => c.slug === q.garmentType)?.name ?? (q.garmentType || '-');
}

/** Plain-text summary used for WhatsApp and email. */
export function buildQuoteMessage(q: QuoteRequest, catalog: QuoteCatalog): string {
  const product = catalog.products.find((p) => p.slug === q.productSlug);
  const sizeTotal = totalSizes(q.sizes);
  const sizeLine = SIZES.filter((s) => (q.sizes[s] ?? 0) > 0)
    .map((s) => `${s}: ${q.sizes[s]}`)
    .join(', ');

  const lines = [
    `*Quote request — ${company.shortName}*`,
    '',
    '*1. Product & quantity*',
    `Category: ${garmentLabel(q, catalog)}`,
    product ? `Product: ${product.name}` : null,
    `Design: ${TRACK_LABELS[q.track]}`,
    `Quantity: ${q.exactQuantity ? `${q.exactQuantity} pcs` : q.quantityRange || '-'}`,
    `Fabric: ${q.fabric || '-'}`,
    '',
    '*2. Add-ons, logo & sizes*',
    `Add-ons: ${q.addOns.length ? q.addOns.map(addOnName).join(', ') : 'None'}`,
    hasLogoAddOn(q) && q.placements.length ? `Logo position: ${q.placements.join(', ')}` : null,
    `Logo file: ${q.logoFileName ? `${q.logoFileName} (I will send it in this chat)` : 'Not attached yet'}`,
    `Colour: ${q.colour || '-'}`,
    sizeTotal > 0 ? `Sizes (${sizeTotal} pcs): ${sizeLine}` : null,
    '',
    '*3. Contact & delivery*',
    `Organisation: ${q.companyName}`,
    q.ssmNumber ? `SSM no.: ${q.ssmNumber}` : null,
    `Name: ${q.contactName}${q.designation ? ` (${q.designation})` : ''}`,
    `Phone: ${q.phone}`,
    q.email ? `Email: ${q.email}` : null,
    `Deliver to: ${q.state}`,
    q.deliveryDate ? `Needed by: ${q.deliveryDate}` : null,
    `Urgency: ${URGENCY_LABELS[q.urgency]}`,
    q.notes.trim() ? `Notes: ${q.notes.trim()}` : null,
  ];

  return lines.filter((line): line is string => line !== null).join('\n');
}

export type QuoteChannel = 'whatsapp' | 'email';

export function quoteWhatsAppUrl(q: QuoteRequest, catalog: QuoteCatalog): string {
  return whatsappUrl(buildQuoteMessage(q, catalog));
}

export function quoteMailtoUrl(q: QuoteRequest, catalog: QuoteCatalog): string {
  const subject = `Quote request — ${q.companyName || 'New enquiry'}`;
  const body = buildQuoteMessage(q, catalog).replace(/\*/g, '');
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Hand the quote off to the chosen channel. Replace the body of this function
 * with an API call when a backend is available; keep the signature so the UI
 * does not need to change.
 */
export function submitQuote(q: QuoteRequest, catalog: QuoteCatalog, channel: QuoteChannel): { ok: true; url: string } {
  return { ok: true, url: channel === 'whatsapp' ? quoteWhatsAppUrl(q, catalog) : quoteMailtoUrl(q, catalog) };
}
