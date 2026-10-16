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
  tagline: 'Uniform & Traditional Wear Manufacturer in Cheras, Kuala Lumpur',
  description:
    'Kah Global Sdn Bhd manufactures school, hotel, restaurant and corporate uniforms, sublimation t-shirts, Baju Melayu, Baju Kurung and Malay traditional wear — with in-house embroidery and printing — in Cheras, Kuala Lumpur.',
} as const;

/** Evaluated at build time (pages are statically generated). */
export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS_IN_BUSINESS = CURRENT_YEAR - company.foundedYear;

export const contact = {
  whatsapp: {
    display: '011-2615 8753',
    number: '601126158753', // international format, no "+" — used for wa.me links
  },
  mobile: {
    display: '011-2615 8753',
    tel: '+601126158753',
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
    { days: 'Saturday', time: '9:00 AM – 8:00 PM' },
    { days: 'Sunday & Public Holidays', time: 'Closed' },
  ],
  // Used in LocalBusiness JSON-LD (schema.org openingHours format)
  openingHoursSchema: ['Mo-Fr 08:00-17:00', 'Sa 09:00-20:00'],
} as const;

/** Social profiles — leave empty to hide the icon. */
export const social = {
  facebook: 'https://www.facebook.com/kahglobalsdn',
  instagram: 'https://www.instagram.com/sales.kahglobal/',
  tiktok: 'https://www.tiktok.com/@kahglobalsdnbhd1',
} as const;

export const promoBar = {
  message: 'Uniforms & Malay traditional wear manufactured in Cheras — with embroidery and printing.',
  cta: { label: 'Get a quote', href: '/request-quote' },
} as const;

export type NavItem = { label: string; href: string; description?: string };

export const mainNav: NavItem[] = [
  { label: 'Products', href: '/products', description: 'Uniforms, sublimation tees & traditional wear' },
  { label: 'Custom-Made', href: '/custom-made', description: 'Fabric, cut & colour made to order' },
  { label: 'Printing', href: '/printing', description: 'Silkscreen, embroidery, sublimation, DTF' },
  { label: 'Industries', href: '/industries', description: 'Schools, hotels, restaurants, corporate & events' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * General terms shown on static pages (product-specific MOQs and lead times are
 * edited per product in /admin).
 * [PLACEHOLDER] — confirm these with the production team.
 */
export const terms = {
  readyMadeMoq: 30, // pieces — [PLACEHOLDER] confirm
  customMadeMoq: 50, // pieces per design/colour — [PLACEHOLDER] confirm
  readyMadeLeadTime: '3–5 working days', // [PLACEHOLDER] confirm
  customMadeLeadTime: '10–14 working days', // [PLACEHOLDER] confirm
  sampleLeadTime: '3–5 working days', // [PLACEHOLDER] confirm
  quoteResponse: '1 working day', // [PLACEHOLDER] confirm
} as const;

/** Headline facts shown on the home and about pages. */
export const stats = [
  { value: String(company.foundedYear), label: 'Established', sublabel: 'Registered in Malaysia' },
  { value: '178+', label: 'Clients served', sublabel: 'Schools, hotels, restaurants & companies' },
  { value: 'Made to order', label: 'Manufacturer', sublabel: 'Uniforms & Malay traditional wear' },
  { value: 'Cheras, KL', label: 'In-house production', sublabel: 'Printing & embroidery' },
] as const;

export type Testimonial = { quote: string; name: string; role: string; company: string };

/**
 * Real, approved customer testimonials. The section stays hidden while this is empty.
 * Example: { quote: '…', name: 'Aisyah', role: 'HR Manager', company: 'Company, City' }
 */
export const testimonials: Testimonial[] = [];

/** Client names/logos, e.g. { name: 'ABC Hotel', logo: '/clients/abc.png' }. Only list clients who agreed to be shown. */
export const clientLogos: { name: string; logo?: string }[] = [];

export type Faq = { question: string; answer: string };

export const quoteFaqs: Faq[] = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'Each product page shows its minimum order quantity (MOQ). Sizes can be mixed within the MOQ. For custom-made designs, the MOQ is per design and colour — ask us if you need a smaller quantity.',
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
    question: 'How can I pay?',
    answer:
      'We accept bank transfer, DuitNow, online transfer and cash on delivery (COD). Payment details are included with your quotation.',
  },
  {
    question: 'Do you deliver outside Kuala Lumpur?',
    answer:
      '[PLACEHOLDER] Describe delivery coverage and charges, e.g. courier delivery across Peninsular and East Malaysia.',
  },
];
