/**
 * ============================================================
 *  KAH GLOBAL — SITE DATA
 *  Company facts, contact details, navigation and shared copy.
 *  Edit here; every page and component reads from this file.
 *
 *  Anything containing "[PLACEHOLDER]" is not yet confirmed by the
 *  company and must be replaced before launch (search the repo for
 *  "[PLACEHOLDER]" to find them all).
 * ============================================================
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.kahglobal.com.my').replace(/\/$/, '');

export const company = {
  name: 'Kah Global Sdn Bhd',
  shortName: 'Kah Global',
  registration: '201401008112 (1084190-X)',
  regNew: '201401008112',
  regOld: '1084190-X',
  foundedYear: 2014,
  tagline: 'Uniform & Apparel Manufacturer in Cheras, Kuala Lumpur',
  description:
    'Kah Global Sdn Bhd supplies ready-made and custom-made uniforms with in-house printing and embroidery for companies, F&B outlets, factories, schools and events across Malaysia.',
} as const;

/** Evaluated at build time (pages are statically generated). */
export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS_IN_BUSINESS = CURRENT_YEAR - company.foundedYear;

export const contact = {
  whatsapp: {
    display: '011-2330 5012',
    number: '601123305012', // international format, no "+" — used for wa.me links
  },
  mobile: {
    display: '013-782 4320',
    tel: '+60137824320',
  },
  office: {
    display: '03-9107 1458',
    tel: '+60391071458',
  },
  email: 'info@kahglobal.com.my',
  address: {
    street: 'Jalan Bunga Melur 3, Taman Suria Jaya',
    postcode: '56000',
    city: 'Cheras',
    state: 'Wilayah Persekutuan Kuala Lumpur',
    country: 'MY',
    full: 'Jalan Bunga Melur 3, Taman Suria Jaya, 56000 Cheras, Kuala Lumpur',
  },
  // Approximate coordinates carried over from the previous site — verify on Google Maps.
  geo: { lat: 3.0838, lng: 101.7285 },
  mapUrl: 'https://maps.google.com/?q=Jalan+Bunga+Melur+3+Taman+Suria+Jaya+Cheras+Kuala+Lumpur',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Jalan+Bunga+Melur+3,+Taman+Suria+Jaya,+56000+Cheras,+Kuala+Lumpur&output=embed',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 5:00 PM' },
    { days: 'Saturday', time: '[PLACEHOLDER] e.g. Closed / 9:00 AM – 1:00 PM' },
    { days: 'Sunday & Public Holidays', time: 'Closed' },
  ],
  // Used in LocalBusiness JSON-LD (schema.org openingHours format)
  openingHoursSchema: ['Mo-Fr 08:00-17:00'],
} as const;

/** Social profiles — leave empty to hide the icon. */
export const social = {
  facebook: '', // [PLACEHOLDER] e.g. https://facebook.com/kahglobal
  instagram: '', // [PLACEHOLDER] e.g. https://instagram.com/kahglobal
  tiktok: '', // [PLACEHOLDER]
} as const;

export const promoBar = {
  message: 'Ready-made uniforms in stock — add your logo with embroidery or printing.',
  cta: { label: 'Get a quote', href: '/request-quote' },
} as const;

export type NavItem = { label: string; href: string; description?: string };

export const mainNav: NavItem[] = [
  { label: 'Ready-Made', href: '/ready-made', description: 'In-stock uniforms, add your logo' },
  { label: 'Custom-Made', href: '/custom-made', description: 'Fabric, cut & colour made to order' },
  { label: 'Printing', href: '/printing', description: 'Silkscreen, embroidery, sublimation, DTF' },
  { label: 'Industries', href: '/industries', description: 'Corporate, F&B, factories, schools, events' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Commercial terms shown across the site.
 * [PLACEHOLDER] — indicative values taken from the design mock-up.
 * Confirm MOQs and lead times with the production team before launch.
 */
export const terms = {
  readyMadeMoq: 30, // pieces — [PLACEHOLDER] confirm
  customMadeMoq: 50, // pieces per design/colour — [PLACEHOLDER] confirm
  readyMadeLeadTime: '3–5 working days', // [PLACEHOLDER] confirm
  customMadeLeadTime: '10–14 working days', // [PLACEHOLDER] confirm
  sampleLeadTime: '3–5 working days', // [PLACEHOLDER] confirm
  quoteResponse: '1 working day', // [PLACEHOLDER] confirm
} as const;

/** Headline numbers. Only "since" is confirmed; the rest are placeholders. */
export const stats = [
  { value: String(company.foundedYear), label: 'Established', sublabel: 'Registered in Malaysia' },
  { value: '[PLACEHOLDER]', label: 'Clients served', sublabel: 'e.g. 500+ companies' },
  { value: '[PLACEHOLDER]', label: 'Uniforms delivered', sublabel: 'e.g. 100,000+ pieces' },
  { value: 'Cheras, KL', label: 'In-house production', sublabel: 'Printing & embroidery' },
] as const;

export type Testimonial = { quote: string; name: string; role: string; company: string };

/** [PLACEHOLDER] — replace with real, approved customer testimonials. */
export const testimonials: Testimonial[] = [
  {
    quote:
      '[PLACEHOLDER] Real customer quote about quality, delivery time or service. Ask a happy client for 2–3 sentences and their permission to publish.',
    name: '[PLACEHOLDER] Customer name',
    role: '[PLACEHOLDER] Job title',
    company: '[PLACEHOLDER] Company, City',
  },
  {
    quote:
      '[PLACEHOLDER] Second testimonial — ideally from an F&B outlet or factory client describing their uniform order.',
    name: '[PLACEHOLDER] Customer name',
    role: '[PLACEHOLDER] Job title',
    company: '[PLACEHOLDER] Company, City',
  },
  {
    quote:
      '[PLACEHOLDER] Third testimonial — ideally from a school, event organiser or corporate HR team.',
    name: '[PLACEHOLDER] Customer name',
    role: '[PLACEHOLDER] Job title',
    company: '[PLACEHOLDER] Company, City',
  },
];

/** [PLACEHOLDER] — client names/logos. Only list clients who have agreed to be shown. */
export const clientLogos: { name: string; logo?: string }[] = [
  { name: '[PLACEHOLDER] Client 1' },
  { name: '[PLACEHOLDER] Client 2' },
  { name: '[PLACEHOLDER] Client 3' },
  { name: '[PLACEHOLDER] Client 4' },
  { name: '[PLACEHOLDER] Client 5' },
  { name: '[PLACEHOLDER] Client 6' },
];

export type Faq = { question: string; answer: string };

export const quoteFaqs: Faq[] = [
  {
    question: 'What is the minimum order quantity?',
    answer: `Ready-made uniforms start from ${terms.readyMadeMoq} pieces when you add a logo. Custom-made uniforms start from ${terms.customMadeMoq} pieces per design and colour. Plain samples can be arranged — just ask.`,
  },
  {
    question: 'What logo file should I send?',
    answer:
      'Vector files (AI, EPS, PDF or SVG) give the sharpest result for embroidery and printing. If you only have a PNG or JPG, send it anyway — our team will advise whether it needs to be redrawn.',
  },
  {
    question: 'Can I see a sample before the full order?',
    answer:
      'Yes. We can prepare a digital mock-up of your logo on the garment, and a physical sample for custom-made orders before bulk production starts.',
  },
  {
    question: 'How do payment terms work?',
    answer:
      '[PLACEHOLDER] Describe your payment terms, e.g. deposit on confirmation and balance before delivery.',
  },
  {
    question: 'Do you deliver outside Kuala Lumpur?',
    answer:
      '[PLACEHOLDER] Describe delivery coverage and charges, e.g. courier delivery across Peninsular and East Malaysia.',
  },
];
