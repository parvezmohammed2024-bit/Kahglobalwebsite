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
import { categories, getProduct, SIZES, type Size } from '@/data/products';
import { printingMethods, type PrintingMethodId } from '@/data/services';
import { whatsappUrl } from '@/lib/whatsapp';

export type ProductionTrack = 'ready-made' | 'custom-made' | 'not-sure';
export type PrintingChoice = PrintingMethodId | 'none' | 'not-sure';
export type Urgency = 'urgent' | 'standard' | 'planning';

export type QuoteRequest = {
  // Step 1 — product & quantity
  garmentType: string; // category slug or "custom"
  productSlug: string;
  track: ProductionTrack;
  quantityRange: string;
  exactQuantity: string;
  fabric: string;
  // Step 2 — branding & sizes
  printingMethod: PrintingChoice;
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

export const QUANTITY_RANGES = ['30 – 49 pcs', '50 – 99 pcs', '100 – 299 pcs', '300 – 499 pcs', '500 – 999 pcs', '1,000+ pcs'];

export const FABRIC_OPTIONS = [
  'Not sure — please recommend',
  'Honeycomb piqué (polo)',
  'Combed cotton (t-shirt)',
  'Microfibre / dri-fit (quick-dry)',
  'Oxford / poly-cotton (shirt)',
  'Drill / twill (workwear)',
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
  'ready-made': 'Ready-made (in stock + logo)',
  'custom-made': 'Custom-made (made to order)',
  'not-sure': 'Not sure yet — please advise',
};

export const emptyQuote: QuoteRequest = {
  garmentType: '',
  productSlug: '',
  track: 'ready-made',
  quantityRange: '',
  exactQuantity: '',
  fabric: FABRIC_OPTIONS[0],
  printingMethod: 'embroidery',
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

const PRINTING_CHOICES: PrintingChoice[] = ['embroidery', 'silkscreen', 'sublimation', 'dtf', 'none', 'not-sure'];

/** Pre-fill the form from URL params, e.g. /request-quote?product=…&qty=…&colour=…&method=… */
export function quoteFromParams(params: URLSearchParams): QuoteRequest {
  const quote: QuoteRequest = { ...emptyQuote, sizes: {}, placements: [...emptyQuote.placements] };

  const product = getProduct(params.get('product') ?? '');
  if (product) {
    quote.productSlug = product.slug;
    quote.garmentType = product.category;
  }

  const category = params.get('category');
  if (category && categories.some((c) => c.slug === category)) quote.garmentType = category;

  const track = params.get('track');
  if (track === 'ready-made' || track === 'custom-made') quote.track = track;
  if (params.get('type') === 'custom') {
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

  const method = params.get('method') as PrintingChoice | null;
  if (method && PRINTING_CHOICES.includes(method)) quote.printingMethod = method;

  return quote;
}

function rangeForQuantity(qty: number): string {
  if (qty >= 1000) return QUANTITY_RANGES[5];
  if (qty >= 500) return QUANTITY_RANGES[4];
  if (qty >= 300) return QUANTITY_RANGES[3];
  if (qty >= 100) return QUANTITY_RANGES[2];
  if (qty >= 50) return QUANTITY_RANGES[1];
  return QUANTITY_RANGES[0];
}

export function totalSizes(sizes: QuoteRequest['sizes']): number {
  return SIZES.reduce((sum, size) => sum + (sizes[size] ?? 0), 0);
}

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{8,16}$/;

/** Validate one wizard step (1–3). Returns an empty object when valid. */
export function validateStep(step: number, q: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  if (step === 1) {
    if (!q.garmentType) errors.garmentType = 'Please choose a garment type.';
    if (!q.quantityRange && !q.exactQuantity) errors.quantityRange = 'Please choose an estimated quantity.';
    if (q.exactQuantity && !/^\d+$/.test(q.exactQuantity)) errors.exactQuantity = 'Numbers only, please.';
  }
  if (step === 2) {
    if (q.printingMethod !== 'none' && q.printingMethod !== 'not-sure' && q.placements.length === 0) {
      errors.placements = 'Choose at least one logo position.';
    }
  }
  if (step === 3) {
    if (!q.companyName.trim()) errors.companyName = 'Company or organisation name is required.';
    if (!q.contactName.trim()) errors.contactName = 'Your name is required.';
    if (!PHONE_RE.test(q.phone.trim())) errors.phone = 'Enter a valid phone / WhatsApp number.';
    if (q.email.trim() && !EMAIL_RE.test(q.email.trim())) errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export function validateAll(q: QuoteRequest): QuoteErrors {
  return { ...validateStep(1, q), ...validateStep(2, q), ...validateStep(3, q) };
}

function garmentLabel(q: QuoteRequest): string {
  if (q.garmentType === 'custom') return 'Custom cut & sew';
  return categories.find((c) => c.slug === q.garmentType)?.name ?? (q.garmentType || '-');
}

function printingLabel(choice: PrintingChoice): string {
  if (choice === 'none') return 'No branding (blank)';
  if (choice === 'not-sure') return 'Not sure — please advise';
  return printingMethods.find((m) => m.id === choice)?.name ?? choice;
}

/** Plain-text summary used for WhatsApp and email. */
export function buildQuoteMessage(q: QuoteRequest): string {
  const product = getProduct(q.productSlug);
  const sizeTotal = totalSizes(q.sizes);
  const sizeLine = SIZES.filter((s) => (q.sizes[s] ?? 0) > 0)
    .map((s) => `${s}: ${q.sizes[s]}`)
    .join(', ');

  const lines = [
    `*Quote request — ${company.shortName}*`,
    '',
    '*1. Product & quantity*',
    `Garment: ${garmentLabel(q)}`,
    product ? `Product: ${product.name}` : null,
    `Type: ${TRACK_LABELS[q.track]}`,
    `Quantity: ${q.exactQuantity ? `${q.exactQuantity} pcs` : q.quantityRange || '-'}`,
    `Fabric: ${q.fabric || '-'}`,
    '',
    '*2. Branding & sizes*',
    `Printing: ${printingLabel(q.printingMethod)}`,
    q.placements.length && q.printingMethod !== 'none' ? `Logo position: ${q.placements.join(', ')}` : null,
    `Logo file: ${q.logoFileName ? `${q.logoFileName} (I will send it in this chat)` : 'Not attached yet'}`,
    `Colour: ${q.colour || '-'}`,
    sizeTotal > 0 ? `Sizes (${sizeTotal} pcs): ${sizeLine}` : null,
    '',
    '*3. Company & contact*',
    `Company: ${q.companyName}`,
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

export function quoteWhatsAppUrl(q: QuoteRequest): string {
  return whatsappUrl(buildQuoteMessage(q));
}

export function quoteMailtoUrl(q: QuoteRequest): string {
  const subject = `Quote request — ${q.companyName || 'New enquiry'}`;
  const body = buildQuoteMessage(q).replace(/\*/g, '');
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Hand the quote off to the chosen channel. Replace the body of this function
 * with an API call when a backend is available; keep the signature so the UI
 * does not need to change.
 */
export function submitQuote(q: QuoteRequest, channel: QuoteChannel): { ok: true; url: string } {
  return { ok: true, url: channel === 'whatsapp' ? quoteWhatsAppUrl(q) : quoteMailtoUrl(q) };
}
