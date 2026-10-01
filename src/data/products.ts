/**
 * ============================================================
 *  KAH GLOBAL — PRODUCT CATALOGUE (ready-made uniforms)
 *
 *  Add, edit or remove products here — no component changes needed.
 *  - `slug` becomes the URL: /ready-made/<slug>
 *  - Images live in /public/images/products/ (reference as /images/products/…)
 *  - Prices are in RM per piece, before SST.
 *
 *  [PLACEHOLDER] — every product below is a realistic SAMPLE seeded from
 *  the design mock-up. Names, fabrics, GSM, colours, prices and tiers must be
 *  replaced with Kah Global's real catalogue before launch.
 * ============================================================
 */

export type CategorySlug =
  | 'polo-shirts'
  | 't-shirts'
  | 'corporate-shirts'
  | 'f1-shirts'
  | 'jerseys'
  | 'jackets'
  | 'muslimah'
  | 'aprons-caps'
  | 'industrial';

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  { slug: 'polo-shirts', name: 'Polo Shirts', blurb: 'Honeycomb, quick-dry & cotton piqué', image: '/images/categories/polo-shirts.jpg' },
  { slug: 't-shirts', name: 'Round Neck T-Shirts', blurb: 'Combed cotton & microfibre tees', image: '/images/categories/t-shirts.jpg' },
  { slug: 'corporate-shirts', name: 'Corporate Shirts', blurb: 'Oxford & easy-care office shirts', image: '/images/categories/corporate-shirts.jpg' },
  { slug: 'f1-shirts', name: 'F1 / Racing Shirts', blurb: 'Multi-panel corporate F1 cuts', image: '/images/categories/f1-shirts.jpg' },
  { slug: 'jerseys', name: 'Sublimation Jerseys', blurb: 'Full-colour dri-fit jerseys', image: '/images/categories/jerseys.jpg' },
  { slug: 'jackets', name: 'Jackets & Windbreakers', blurb: 'Microfibre, fleece & bombers', image: '/images/categories/jackets.jpg' },
  { slug: 'muslimah', name: 'Muslimah Wear', blurb: 'Modest-cut blouses & tunics', image: '/images/categories/muslimah.jpg' },
  { slug: 'aprons-caps', name: 'Aprons & Caps', blurb: 'F&B aprons, caps & accessories', image: '/images/categories/aprons-caps.jpg' },
  { slug: 'industrial', name: 'Industrial & Safety', blurb: 'Workwear, reflective & vests', image: '/images/products/industrial-twill-shirt.jpg' },
];

export type Fabric =
  | 'Honeycomb Piqué'
  | 'Combed Cotton'
  | 'Microfibre / Dri-Fit'
  | 'Oxford / Poly-Cotton'
  | 'Drill / Twill'
  | 'Canvas'
  | 'Polyester Blend';

export const fabrics: Fabric[] = [
  'Honeycomb Piqué',
  'Combed Cotton',
  'Microfibre / Dri-Fit',
  'Oxford / Poly-Cotton',
  'Drill / Twill',
  'Canvas',
  'Polyester Blend',
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'] as const;
export type Size = (typeof SIZES)[number];

export type Colour = { name: string; hex: string };

/** Shared colour swatches — reuse these names so the colour filter groups correctly. */
export const COLOURS = {
  navy: { name: 'Navy', hex: '#14213d' },
  black: { name: 'Black', hex: '#111111' },
  white: { name: 'White', hex: '#ffffff' },
  royal: { name: 'Royal Blue', hex: '#1d4ed8' },
  skyBlue: { name: 'Sky Blue', hex: '#9cc3e6' },
  grey: { name: 'Heather Grey', hex: '#9ca3af' },
  charcoal: { name: 'Charcoal', hex: '#374151' },
  red: { name: 'Red', hex: '#c81e1e' },
  maroon: { name: 'Maroon', hex: '#7f1d1d' },
  green: { name: 'Forest Green', hex: '#14532d' },
  orange: { name: 'Orange', hex: '#f26b1d' },
  yellow: { name: 'Yellow', hex: '#facc15' },
  teal: { name: 'Teal', hex: '#5eaaa8' },
  khaki: { name: 'Khaki', hex: '#a68a64' },
  brown: { name: 'Brown', hex: '#6b4423' },
  hiVis: { name: 'Hi-Vis Lime', hex: '#c6f432' },
} satisfies Record<string, Colour>;

export type PriceTier = {
  minQty: number;
  /** undefined = no upper limit */
  maxQty?: number;
  /** RM per piece, before SST */
  price: number;
  label?: string;
};

export type ProductImage = { src: string; alt: string };

export type SizeChartRow = {
  size: string;
  chestCm: string;
  lengthCm: string;
  sleeveCm?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  fabric: Fabric;
  /** Full composition, e.g. "65% cotton / 35% polyester" */
  composition: string;
  gsm: number;
  colours: Colour[];
  sizes: Size[];
  /** Lowest per-piece price shown as "From RM…" */
  priceFrom: number;
  priceTiers: PriceTier[];
  images: ProductImage[];
  summary: string;
  description: string;
  features: string[];
  badges?: string[];
  /** Extra RM per piece for 3XL and above */
  plusSizeSurcharge?: number;
  sizeChart?: SizeChartRow[];
  inStock: boolean;
  featured?: boolean;
  /** Higher = shown first when sorting by "Popular" */
  popularity: number;
};

/** [PLACEHOLDER] Asian-fit size chart — replace with your actual measurements. */
const ASIAN_FIT_TOP: SizeChartRow[] = [
  { size: 'XS', chestCm: '46', lengthCm: '64', sleeveCm: '20' },
  { size: 'S', chestCm: '48', lengthCm: '66', sleeveCm: '21' },
  { size: 'M', chestCm: '51', lengthCm: '69', sleeveCm: '22' },
  { size: 'L', chestCm: '53', lengthCm: '71', sleeveCm: '23' },
  { size: 'XL', chestCm: '56', lengthCm: '74', sleeveCm: '24' },
  { size: '2XL', chestCm: '58', lengthCm: '76', sleeveCm: '25' },
  { size: '3XL', chestCm: '61', lengthCm: '78', sleeveCm: '26' },
  { size: '4XL', chestCm: '63', lengthCm: '80', sleeveCm: '27' },
  { size: '5XL', chestCm: '66', lengthCm: '82', sleeveCm: '28' },
];

const ALL_SIZES: Size[] = [...SIZES];
const STANDARD_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

/** Standard 4-tier wholesale ladder: 1–49, 50–99, 100–299, 300+ */
function tiers(base: number, t50: number, t100: number, t300: number): PriceTier[] {
  return [
    { minQty: 1, maxQty: 49, price: base, label: 'Small order' },
    { minQty: 50, maxQty: 99, price: t50, label: 'Team batch' },
    { minQty: 100, maxQty: 299, price: t100, label: 'Department' },
    { minQty: 300, price: t300, label: 'Company-wide' },
  ];
}

export const products: Product[] = [
  {
    slug: 'honeycomb-polo-210gsm',
    name: 'Signature Honeycomb Polo (210 GSM)',
    category: 'polo-shirts',
    fabric: 'Honeycomb Piqué',
    composition: '65% combed cotton / 35% polyester honeycomb piqué',
    gsm: 210,
    colours: [COLOURS.navy, COLOURS.black, COLOURS.white, COLOURS.royal, COLOURS.grey, COLOURS.green, COLOURS.red, COLOURS.maroon],
    sizes: ALL_SIZES,
    priceFrom: 16.5,
    priceTiers: tiers(24.5, 21, 18.9, 16.5),
    plusSizeSurcharge: 2,
    images: [
      { src: '/images/products/honeycomb-polo-navy.jpg', alt: 'Navy honeycomb polo shirt, flat lay' },
      { src: '/images/products/honeycomb-polo-navy-front.jpg', alt: 'Navy honeycomb polo shirt, front view' },
      { src: '/images/products/honeycomb-polo-navy-collar.jpg', alt: 'Close-up of ribbed polo collar' },
      { src: '/images/products/honeycomb-polo-grey.jpg', alt: 'Heather grey honeycomb polo shirt' },
      { src: '/images/products/honeycomb-polo-green.jpg', alt: 'Forest green honeycomb polo shirt' },
      { src: '/images/products/honeycomb-polo-fabric.jpg', alt: 'Macro view of honeycomb piqué knit' },
      { src: '/images/products/honeycomb-polo-placket.jpg', alt: 'Reinforced three-button placket detail' },
    ],
    summary: 'Our best-selling corporate polo — breathable honeycomb knit that holds its shape wash after wash.',
    description:
      'A dependable everyday uniform polo for offices, service teams and events. The 210 GSM honeycomb piqué combines the softness of combed cotton with the durability of polyester, so it stays breathable in Malaysian heat and resists wrinkles and shrinkage. Ideal for embroidery on the left chest and sleeves.',
    features: [
      'Breathable honeycomb piqué knit',
      'Flat-knit ribbed collar that resists curling',
      'Reinforced three-button placket',
      'Side slits for easy movement',
      'Ideal for embroidery and silkscreen printing',
    ],
    badges: ['Best seller'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    featured: true,
    popularity: 100,
  },
  {
    slug: 'quick-dry-polo-160gsm',
    name: 'Quick-Dry Microfibre Polo (160 GSM)',
    category: 'polo-shirts',
    fabric: 'Microfibre / Dri-Fit',
    composition: '100% polyester microfibre, moisture-wicking',
    gsm: 160,
    colours: [COLOURS.navy, COLOURS.black, COLOURS.white, COLOURS.royal, COLOURS.red, COLOURS.yellow, COLOURS.orange],
    sizes: ALL_SIZES,
    priceFrom: 13.9,
    priceTiers: tiers(19.9, 17.5, 15.5, 13.9),
    plusSizeSurcharge: 2,
    images: [{ src: '/images/categories/polo-shirts.jpg', alt: 'Quick-dry microfibre polo shirt' }],
    summary: 'Lightweight, fast-drying polo for outdoor teams, roadshows and sports days.',
    description:
      'A lightweight microfibre polo that wicks sweat and dries quickly — a practical choice for promoters, field staff and outdoor events. Takes embroidery, DTF and silkscreen well.',
    features: ['Moisture-wicking microfibre', 'Lightweight 160 GSM', 'Colour-fast', 'Great for events and outdoor teams'],
    badges: ['Quick-dry'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    popularity: 80,
  },
  {
    slug: 'combed-cotton-tee-190gsm',
    name: 'Premium Combed Cotton Tee (190 GSM)',
    category: 't-shirts',
    fabric: 'Combed Cotton',
    composition: '100% ring-spun combed cotton',
    gsm: 190,
    colours: [COLOURS.black, COLOURS.white, COLOURS.navy, COLOURS.grey, COLOURS.red, COLOURS.royal, COLOURS.maroon, COLOURS.green],
    sizes: ALL_SIZES,
    priceFrom: 10.9,
    priceTiers: tiers(16.8, 14.5, 12.8, 10.9),
    plusSizeSurcharge: 2,
    images: [
      { src: '/images/products/combed-tee-black.jpg', alt: 'Black combed cotton round neck t-shirt' },
      { src: '/images/products/combed-tee-white.jpg', alt: 'White combed cotton round neck t-shirt' },
    ],
    summary: 'Soft, heavyweight round-neck tee — the go-to for company events and staff tees.',
    description:
      'A soft, substantial cotton tee with a smooth surface that is ideal for silkscreen and DTF printing. Popular for company events, family days, campaigns and casual staff uniforms.',
    features: ['100% combed cotton', 'Smooth print surface', 'Taped shoulder seams', 'Pre-shrunk'],
    badges: ['Budget pick'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    featured: true,
    popularity: 95,
  },
  {
    slug: 'quick-dry-crewneck-tee',
    name: 'Quick-Dry Crewneck Tee (160 GSM)',
    category: 't-shirts',
    fabric: 'Microfibre / Dri-Fit',
    composition: '100% polyester microfibre with eyelet mesh',
    gsm: 160,
    colours: [COLOURS.black, COLOURS.white, COLOURS.navy, COLOURS.royal, COLOURS.red, COLOURS.yellow, COLOURS.orange, COLOURS.hiVis],
    sizes: ALL_SIZES,
    priceFrom: 9.5,
    priceTiers: tiers(14.8, 12.5, 10.9, 9.5),
    plusSizeSurcharge: 2,
    images: [{ src: '/images/products/quick-dry-crewneck-black.jpg', alt: 'Black quick-dry crewneck t-shirt' }],
    summary: 'Breathable eyelet microfibre tee for runs, sports days and roadshows.',
    description:
      'An affordable performance tee for large events. The eyelet microfibre keeps wearers cool and pairs well with sublimation and DTF logos.',
    features: ['Eyelet mesh microfibre', 'Quick-dry and lightweight', 'Ideal for large event runs'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    popularity: 70,
  },
  {
    slug: 'executive-oxford-shirt',
    name: 'Executive Oxford Long Sleeve Shirt',
    category: 'corporate-shirts',
    fabric: 'Oxford / Poly-Cotton',
    composition: '60% cotton / 40% polyester easy-care Oxford',
    gsm: 130,
    colours: [COLOURS.skyBlue, COLOURS.white, COLOURS.navy, COLOURS.grey],
    sizes: STANDARD_SIZES,
    priceFrom: 30.5,
    priceTiers: tiers(38, 34, 32, 30.5),
    images: [
      { src: '/images/products/oxford-shirt-blue.jpg', alt: 'Light blue Oxford long sleeve corporate shirt' },
      { src: '/images/products/oxford-shirt-blue-2.jpg', alt: 'Oxford corporate shirt, front view' },
    ],
    summary: 'Easy-care Oxford shirt for front-office, sales and management teams.',
    description:
      'A smart long-sleeve Oxford shirt with an easy-iron finish — a professional look for front-office staff, banks, sales teams and management. Embroider your logo on the chest or cuff.',
    features: ['Easy-iron poly-cotton Oxford', 'Button-down collar', 'Reinforced placket', 'Chest pocket'],
    badges: ['Easy-care'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    featured: true,
    popularity: 75,
  },
  {
    slug: 'dual-tone-f1-shirt',
    name: 'Dual-Tone Corporate F1 Shirt',
    category: 'f1-shirts',
    fabric: 'Polyester Blend',
    composition: 'Polyester / viscose blend with underarm eyelets',
    gsm: 180,
    colours: [COLOURS.red, COLOURS.navy, COLOURS.charcoal, COLOURS.royal],
    sizes: STANDARD_SIZES,
    priceFrom: 28.5,
    priceTiers: tiers(36, 32, 30, 28.5),
    images: [
      { src: '/images/products/f1-shirt-red-charcoal.jpg', alt: 'Red and charcoal dual-tone F1 corporate shirt' },
      { src: '/images/products/f1-shirt-navy-orange.jpg', alt: 'Navy and orange dual-tone F1 shirt' },
    ],
    summary: 'Multi-panel F1 shirt with pen slot — a bold, sporty corporate look.',
    description:
      'A colour-blocked F1-style shirt that is popular with automotive, logistics and technical service teams. Features a sleeve pen slot and breathable underarm eyelets.',
    features: ['Dual-tone colour panels', 'Sleeve pen slot', 'Breathable underarm eyelets', 'Concealed button placket'],
    badges: ['Dual-tone'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    popularity: 65,
  },
  {
    slug: 'dri-fit-sublimation-jersey',
    name: 'Dri-Fit Sublimation Collar Jersey',
    category: 'jerseys',
    fabric: 'Microfibre / Dri-Fit',
    composition: '100% polyester interlock microfibre',
    gsm: 160,
    colours: [COLOURS.royal, COLOURS.navy, COLOURS.red, COLOURS.yellow, COLOURS.white],
    sizes: ALL_SIZES,
    priceFrom: 19.8,
    priceTiers: tiers(28, 24.5, 22.5, 19.8),
    images: [{ src: '/images/products/dri-fit-jersey.jpg', alt: 'Dri-fit sublimation collar jersey' }],
    summary: 'Full-colour, edge-to-edge sublimated jersey for teams, clubs and corporate runs.',
    description:
      'Your design is dye-sublimated into the fabric, so colours never crack or peel. Ideal for sports clubs, school houses, corporate runs and promotional events. Colours shown are base options — sublimation allows any design.',
    features: ['All-over sublimation print', 'Moisture-wicking interlock', 'Colours will not crack or peel'],
    badges: ['Full colour'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    featured: true,
    popularity: 72,
  },
  {
    slug: 'microfibre-windbreaker',
    name: 'Corporate Microfibre Windbreaker',
    category: 'jackets',
    fabric: 'Microfibre / Dri-Fit',
    composition: 'Water-repellent microfibre shell with mesh lining',
    gsm: 120,
    colours: [COLOURS.charcoal, COLOURS.navy, COLOURS.black],
    sizes: STANDARD_SIZES,
    priceFrom: 39.9,
    priceTiers: tiers(52, 46, 43, 39.9),
    images: [{ src: '/images/products/microfibre-windbreaker.jpg', alt: 'Charcoal microfibre windbreaker jacket' }],
    summary: 'Light, water-repellent jacket for field teams, riders and air-conditioned offices.',
    description:
      'A lightweight, water-repellent windbreaker with breathable mesh lining and a concealed hood. Embroider your logo on the chest and print on the back for team identity.',
    features: ['Water-repellent shell', 'Breathable mesh lining', 'Concealed hood in collar', 'Zip pockets'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    popularity: 50,
  },
  {
    slug: 'muslimah-corporate-blouse',
    name: 'Muslimah Corporate Blouse',
    category: 'muslimah',
    fabric: 'Polyester Blend',
    composition: 'Lightweight non-sheer koshibo weave',
    gsm: 140,
    colours: [COLOURS.teal, COLOURS.navy, COLOURS.black, COLOURS.maroon],
    sizes: STANDARD_SIZES,
    priceFrom: 24.5,
    priceTiers: tiers(32, 28, 26.5, 24.5),
    images: [{ src: '/images/products/muslimah-blouse-teal.jpg', alt: 'Teal modest-cut corporate blouse' }],
    summary: 'Modest, longer-cut blouse with side slits — comfortable for all-day wear.',
    description:
      'A modest A-line corporate blouse in a lightweight, non-sheer fabric. Longer body length and side slits for comfortable movement — suitable for front desk, banking, retail and clinic staff.',
    features: ['Non-sheer fabric', 'Longer modest cut', 'Side slits for movement', 'Mandarin collar'],
    badges: ['Modest cut'],
    inStock: true,
    popularity: 55,
  },
  {
    slug: 'canvas-barista-apron',
    name: 'Canvas Barista & Workshop Apron',
    category: 'aprons-caps',
    fabric: 'Canvas',
    composition: '12 oz cotton canvas with cross-back straps',
    gsm: 400,
    colours: [COLOURS.brown, COLOURS.black, COLOURS.navy, COLOURS.khaki],
    sizes: ['M'],
    priceFrom: 17.5,
    priceTiers: tiers(26, 21, 19, 17.5),
    images: [{ src: '/images/products/canvas-apron.jpg', alt: 'Brown heavy-duty canvas barista apron' }],
    summary: 'Heavy-duty cross-back apron for cafés, restaurants and workshops.',
    description:
      'A durable canvas apron with cross-back straps that spread the weight across the shoulders. Riveted pockets for pens, tools and phones. One size, adjustable.',
    features: ['Heavy 12 oz canvas', 'Cross-back adjustable straps', 'Riveted front pockets', 'One size fits most'],
    badges: ['F&B favourite'],
    inStock: true,
    popularity: 60,
  },
  {
    slug: 'cotton-twill-cap',
    name: 'Cotton Twill Cap',
    category: 'aprons-caps',
    fabric: 'Drill / Twill',
    composition: '100% cotton twill, 6-panel, adjustable strap',
    gsm: 250,
    colours: [COLOURS.black, COLOURS.navy, COLOURS.white, COLOURS.red, COLOURS.khaki],
    sizes: ['M'],
    priceFrom: 7.5,
    priceTiers: tiers(12, 9.9, 8.5, 7.5),
    images: [{ src: '/images/categories/aprons-caps.jpg', alt: 'Cotton twill cap' }],
    summary: 'Classic 6-panel cap — embroider your logo for F&B crews and event teams.',
    description:
      'A classic 6-panel cotton twill cap with an adjustable strap. A simple, effective way to complete an F&B or event uniform with an embroidered logo.',
    features: ['6-panel structured crown', 'Adjustable back strap', 'Front panel ideal for embroidery'],
    inStock: true,
    popularity: 45,
  },
  {
    slug: 'industrial-twill-workwear-shirt',
    name: 'Industrial Twill Workwear Shirt (Reflective)',
    category: 'industrial',
    fabric: 'Drill / Twill',
    composition: 'Heavy poly-cotton drill with reflective tape',
    gsm: 240,
    colours: [COLOURS.navy, COLOURS.khaki, COLOURS.grey],
    sizes: ALL_SIZES,
    priceFrom: 33.5,
    priceTiers: tiers(42, 38, 36, 33.5),
    plusSizeSurcharge: 3,
    images: [
      { src: '/images/products/industrial-twill-shirt.jpg', alt: 'Navy industrial workwear shirt with reflective tape' },
      { src: '/images/products/industrial-twill-shirt-reflective.jpg', alt: 'Reflective tape detail on workwear shirt' },
    ],
    summary: 'Tough drill workwear shirt with reflective tape for factory and site teams.',
    description:
      'A heavy-duty drill shirt built for factories, warehouses and technical crews. Reflective tape improves visibility in low light, and triple-stitched seams stand up to frequent washing.',
    features: ['Heavy 240 GSM drill', 'Reflective tape on chest and arms', 'Triple-stitched seams', 'Twin chest pockets'],
    badges: ['Heavy duty'],
    sizeChart: ASIAN_FIT_TOP,
    inStock: true,
    featured: true,
    popularity: 68,
  },
  {
    slug: 'hi-vis-safety-vest',
    name: 'Hi-Vis Safety Vest',
    category: 'industrial',
    fabric: 'Polyester Blend',
    composition: 'Polyester mesh with reflective bands',
    gsm: 120,
    colours: [COLOURS.hiVis, COLOURS.orange],
    sizes: ['M', 'L', 'XL', '2XL'],
    priceFrom: 9.9,
    priceTiers: tiers(16, 13.5, 11.5, 9.9),
    images: [{ src: '/images/products/safety-vest-hi-vis.jpg', alt: 'Hi-vis safety vest with reflective bands' }],
    summary: 'High-visibility vest with reflective bands — print your company name on the back.',
    description:
      'A lightweight, breathable high-visibility vest for warehouses, construction sites, car parks and event marshals. Front zip or velcro closure, with space for a printed logo on the back.',
    features: ['High-visibility colours', 'Reflective bands', 'Breathable mesh', 'Back print area'],
    inStock: true,
    popularity: 40,
  },
];

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: CategorySlug): Category {
  const category = categories.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown category: ${slug}`);
  return category;
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products
    .filter((p) => p.featured)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = products
    .filter((p) => p.slug !== product.slug && p.category !== product.category)
    .sort((a, b) => b.popularity - a.popularity);
  return [...sameCategory, ...others].slice(0, limit);
}

export function countByCategory(slug: CategorySlug): number {
  return products.filter((p) => p.category === slug).length;
}

/** Price per piece for a given quantity (falls back to the first tier). */
export function priceForQuantity(product: Product, qty: number): PriceTier {
  const tier = product.priceTiers.find((t) => qty >= t.minQty && (t.maxQty === undefined || qty <= t.maxQty));
  return tier ?? product.priceTiers[0];
}
