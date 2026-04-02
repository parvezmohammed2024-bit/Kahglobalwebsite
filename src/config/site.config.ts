/**
 * ============================================================
 *  KAH GLOBAL — SITE CONFIGURATION
 *  Edit this file to update text, images, and contact details
 *  across the entire website without touching component files.
 * ============================================================
 */

// ─────────────────────────────────────────────
//  COMPANY INFO
// ─────────────────────────────────────────────
export const company = {
  name:         'Kah Global Sdn Bhd',
  shortName:    'Kah Global',
  regNumber:    '1084190-X',
  tagline:      "Malaysia's Trusted Uniform Manufacturer",
  description:  "Premium Uniform & Apparel Solutions for Businesses Across Malaysia.",
  foundedYear:  2014,
  location:     'Cheras, Kuala Lumpur',
};

// ─────────────────────────────────────────────
//  CONTACT
// ─────────────────────────────────────────────
export const contact = {
  phone:        '011-2330 5012',
  phoneLink:    'tel:+601123305012',
  whatsapp:     '601123305012',
  email:        'info@kahglobal.com.my',
  address:      'Jalan Bunga Melur 3, Taman Suria Jaya, 56000 Cheras, WP Kuala Lumpur',
  addressShort: 'Cheras, WP KL',
  hours:        'Mon–Fri: 8am–5pm',
  mapUrl:       'https://maps.google.com/?q=Taman+Suria+Jaya+Cheras+Kuala+Lumpur',
};

// ─────────────────────────────────────────────
//  SOCIAL MEDIA  (put real URLs here)
// ─────────────────────────────────────────────
export const social = {
  instagram: '#',
  facebook:  '#',
  whatsapp:  `https://wa.me/${contact.whatsapp}`,
};

// ─────────────────────────────────────────────
//  IMAGES
//  → Place image files in:  /public/images/
//  → Reference them as:     /images/filename.jpg
// ─────────────────────────────────────────────
export const images = {
  logo:          '/logo.png',           // Navbar & footer logo
  ogImage:       '/og-image.jpg',       // Social share image (1200×630)
  heroImage:     '',                    // Optional hero background image
  aboutFactory:  '',                    // About section factory photo
};

// ─────────────────────────────────────────────
//  HERO SECTION
// ─────────────────────────────────────────────
export const hero = {
  eyebrow:    "Malaysia's Trusted Uniform Manufacturer",
  headline:   'Dress Your Team.',
  headlineAccent: 'Define Your Brand.',
  subheadline: 'Premium Uniform & Apparel Solutions for Businesses Across Malaysia. Quality craftsmanship, custom designs, and reliable bulk orders since 2014.',
  cta1Label:  'View Our Products',
  cta1Href:   '#products',
  cta2Label:  'Request a Quote',
  cta2Href:   '#contact',
  stats: [
    { num: '10+',  label: 'Years'    },
    { num: '500+', label: 'Clients'  },
    { num: '10K+', label: 'Uniforms' },
  ],
};

// ─────────────────────────────────────────────
//  ABOUT SECTION
// ─────────────────────────────────────────────
export const about = {
  heading:    'Crafting Quality Uniforms Since 2014',
  intro:      'Kah Global Uniform Sdn Bhd has been serving businesses, schools, hotels, and corporates across Malaysia for over a decade — from our production facility in Cheras, KL.',
  storyP1:    'Founded in Cheras, we started with a simple mission — help Malaysian businesses project professionalism through well-crafted, affordable uniforms.',
  storyP2:    'Over a decade later, we serve SMEs, government departments, international hotel chains and national schools — all from our in-house production facility.',
  highlights: [
    'In-house design and production facility',
    'ISO-compliant quality control process',
    'MOQ from 50 units — flexible for all sizes',
    'Delivery across Peninsular & East Malaysia',
  ],
  stats: [
    { end: 10,    suffix: '+', label: 'Years Experience',  sublabel: 'Crafting uniforms since 2014' },
    { end: 500,   suffix: '+', label: 'Clients Served',    sublabel: 'Across Malaysia'               },
    { end: 10000, suffix: '+', label: 'Uniforms Delivered',sublabel: 'And counting'                  },
  ],
};

// ─────────────────────────────────────────────
//  PRODUCTS SECTION
// ─────────────────────────────────────────────
export const productsSection = {
  eyebrow:     'What We Offer',
  heading:     'Our Uniform Collections',
  subheading:  'From boardrooms to factory floors — we have the perfect uniform solution for every industry.',
  ctaText:     "Don't see your industry? We do custom orders.",
  ctaButton:   'Discuss Your Requirements →',
};

export const products = [
  {
    title:       'Corporate Uniforms',
    description: 'Polished uniforms for offices, banks & service industries. Tailored to your brand identity.',
    gradient:    'from-[#0A1F44] via-[#0d2855] to-[#1a3a6e]',
    image:       '',   // Optional: /images/corporate.jpg
  },
  {
    title:       'School Uniforms',
    description: 'Durable, breathable school uniforms for primary and secondary institutions. Bulk pricing available.',
    gradient:    'from-emerald-800 via-emerald-700 to-teal-800',
    image:       '',
  },
  {
    title:       'Hospitality & Hotel',
    description: 'Elegant uniforms for hotels, resorts & F&B outlets. Designed for long service hours.',
    gradient:    'from-amber-800 via-amber-700 to-orange-800',
    image:       '',
  },
  {
    title:       'Industrial & Safety Wear',
    description: 'High-visibility, safety-compliant workwear for factories, warehouses & construction sites.',
    gradient:    'from-gray-700 via-gray-600 to-slate-700',
    image:       '',
  },
  {
    title:       'Sports & PE Uniforms',
    description: 'Performance sportswear for schools, sports clubs & corporate events. Moisture-wicking fabrics.',
    gradient:    'from-red-800 via-red-700 to-rose-800',
    image:       '',
  },
  {
    title:       'Custom Embroidery',
    description: 'Logo embroidery, screen printing & heat transfer. Make every uniform your own brand statement.',
    gradient:    'from-purple-800 via-purple-700 to-violet-800',
    image:       '',
  },
];

// ─────────────────────────────────────────────
//  WHY CHOOSE US
// ─────────────────────────────────────────────
export const whyUs = {
  eyebrow:    'Why Choose Us',
  heading:    'The Kah Global Difference',
  subheading: "We're more than a uniform supplier — we're your long-term uniform partner.",
  ctaHeading: 'Ready to Outfit Your Team?',
  ctaText:    'Get a free consultation and quote — no commitment required. We respond within 24 hours.',
  ctaButton:  'Get a Free Quote →',
  features: [
    {
      num:         '01',
      title:       'Custom Design & Branding',
      description: 'Work with our in-house designers to create uniforms that reflect your brand — colours, cuts, logos, embroidery, and print styles.',
    },
    {
      num:         '02',
      title:       'Bulk Order Specialists',
      description: '50 to 5,000 units — we handle large-scale orders with consistency and volume pricing that beats the market.',
    },
    {
      num:         '03',
      title:       'Fast Turnaround',
      description: 'Streamlined production and dedicated logistics mean your order arrives on time, every time — no excuses.',
    },
    {
      num:         '04',
      title:       'Quality Guaranteed',
      description: 'Premium fabrics, reinforced stitching, rigorous QC at every stage. Every uniform is backed by our quality guarantee.',
    },
  ],
  stats: [
    { value: '10+',  label: 'Years Experience' },
    { value: '500+', label: 'Happy Clients'    },
    { value: '10K+', label: 'Uniforms Made'    },
    { value: '6',    label: 'Uniform Types'    },
  ],
};

// ─────────────────────────────────────────────
//  TESTIMONIALS
// ─────────────────────────────────────────────
export const testimonials = [
  {
    quote:   'Kah Global delivered 300 corporate uniforms for our hotel staff on time and within budget. The quality was outstanding — every stitch was perfect. Our guests always comment on how professional our team looks.',
    name:    'Nurul Aisyah binti Razali',
    title:   'HR Manager',
    company: 'Grand Meridian Hotel, Kuala Lumpur',
    initial: 'N',
  },
  {
    quote:   "We've been ordering school uniforms from Kah Global for 4 consecutive years. Consistently high quality, competitive pricing, and the customer service team is incredibly responsive.",
    name:    'Encik Faizal bin Ahmad',
    title:   'Procurement Officer',
    company: 'SMK Cheras Perdana, Selangor',
    initial: 'F',
  },
  {
    quote:   'Excellent service from inquiry to delivery. Our custom embroidered polo shirts for the annual corporate retreat were exactly what we envisioned — great fabric, crisp logo, fast delivery.',
    name:    'Ms. Lim Wei Ling',
    title:   'Marketing Executive',
    company: 'TechMalaysia Sdn Bhd, Petaling Jaya',
    initial: 'L',
  },
];

// ─────────────────────────────────────────────
//  CONTACT SECTION
// ─────────────────────────────────────────────
export const contactSection = {
  eyebrow:    'Get In Touch',
  heading:    'Request a Free Quote',
  subheading: "Fill in the form and we'll open WhatsApp with your details pre-filled — for a faster, more personal response.",
  uniformTypes: [
    'Corporate Uniforms',
    'School Uniforms',
    'Hospitality & Hotel Uniforms',
    'Industrial & Safety Wear',
    'Sports & PE Uniforms',
    'Custom Embroidery & Branding',
    'Other / Not Sure',
  ],
};

// ─────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────
export const footer = {
  tagline:   "Malaysia's trusted uniform manufacturer based in Cheras, Selangor. Quality uniforms for every industry, crafted with pride since 2014.",
  copyright: `© ${new Date().getFullYear()} Kah Global Uniform Sdn Bhd. All Rights Reserved.`,
  services: [
    'Corporate Uniforms',
    'School Uniforms',
    'Hospitality Uniforms',
    'Industrial Safety Wear',
    'Sports Uniforms',
    'Custom Embroidery',
  ],
};
