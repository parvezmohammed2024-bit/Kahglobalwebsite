/**
 * Printing & branding methods, production streams and the ordering process.
 * MOQs / prices marked [PLACEHOLDER] are indicative — confirm before launch.
 */

export type PrintingMethodId = 'embroidery' | 'silkscreen' | 'sublimation' | 'dtf';

export type PrintingMethod = {
  id: PrintingMethodId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  bestFor: string[];
  pros: string[];
  moq: string;
  /** Indicative add-on price per piece */
  priceFrom: string;
  image: string;
  imageAlt: string;
};

export const printingMethods: PrintingMethod[] = [
  {
    id: 'embroidery',
    name: 'Computerised Embroidery',
    shortName: 'Embroidery',
    tagline: 'Premium, long-lasting stitched logos',
    description:
      'Your logo is digitised and stitched directly into the fabric with computerised multi-head embroidery machines. It gives a raised, premium finish that outlasts the garment itself — the classic choice for corporate polos, shirts, caps and jackets.',
    bestFor: ['Corporate polos & shirts', 'Caps & jackets', 'Left chest and sleeve logos'],
    pros: ['Premium, professional look', 'Extremely durable — will not fade or peel', 'Works on most fabrics'],
    moq: '[PLACEHOLDER] e.g. 30 pcs',
    priceFrom: '[PLACEHOLDER] e.g. RM3.50 / pc',
    image: '/images/home/embroidery-machine.jpg',
    imageAlt: 'Computerised embroidery machine stitching a logo onto fabric',
  },
  {
    id: 'silkscreen',
    name: 'Silkscreen Printing',
    shortName: 'Silkscreen',
    tagline: 'Cost-effective for bulk orders',
    description:
      'Ink is pushed through a fine mesh screen, one colour at a time. Silkscreen gives bold, solid colours and becomes very economical as quantities grow — ideal for event tees and large staff orders with simple 1–3 colour logos.',
    bestFor: ['Event & campaign t-shirts', 'Large staff orders', 'Simple 1–3 colour logos'],
    pros: ['Lowest cost per piece in bulk', 'Bold, solid colours', 'Good wash durability'],
    moq: '[PLACEHOLDER] e.g. 50 pcs',
    priceFrom: '[PLACEHOLDER] e.g. RM2.50 / pc',
    image: '/images/categories/t-shirts.jpg',
    imageAlt: 'Screen printing a logo onto a t-shirt with a squeegee',
  },
  {
    id: 'sublimation',
    name: 'Dye-Sublimation',
    shortName: 'Sublimation',
    tagline: 'Full-colour, edge-to-edge designs',
    description:
      'Your design is printed onto transfer paper and heat-pressed so the ink turns to gas and bonds with polyester fibres. The print becomes part of the fabric — it cannot crack or peel — and allows unlimited colours across the whole garment.',
    bestFor: ['Sports & club jerseys', 'Corporate run tees', 'All-over patterns and gradients'],
    pros: ['Unlimited colours and gradients', 'Will not crack, peel or fade', 'Soft feel — no ink layer'],
    moq: '[PLACEHOLDER] e.g. 30 pcs',
    priceFrom: '[PLACEHOLDER] quoted per design',
    image: '/images/categories/jerseys.jpg',
    imageAlt: 'Brightly coloured sublimation-printed sports jersey',
  },
  {
    id: 'dtf',
    name: 'DTF (Direct-to-Film) Printing',
    shortName: 'DTF',
    tagline: 'Detailed, multi-colour logos on any fabric',
    description:
      'Designs are printed onto film, coated with adhesive powder and heat-pressed onto the garment. DTF reproduces fine detail and photo-quality gradients on cotton, polyester and blends — perfect for complex logos and smaller runs.',
    bestFor: ['Complex, multi-colour logos', 'Small to medium runs', 'Cotton, polyester & blends'],
    pros: ['Photo-quality detail', 'No colour limit', 'Fast setup for small quantities'],
    moq: '[PLACEHOLDER] e.g. 20 pcs',
    priceFrom: '[PLACEHOLDER] e.g. RM4.00 / pc',
    image: '/images/products/f1-shirt-navy-orange.jpg',
    imageAlt: 'Detailed full-colour DTF transfer on a uniform shirt',
  },
];

export const logoPlacements = [
  'Left chest',
  'Right chest',
  'Left sleeve',
  'Right sleeve',
  'Back (upper / nape)',
  'Back (full)',
  'Cap front',
] as const;

export type ProcessStep = { title: string; description: string };

export const orderSteps: ProcessStep[] = [
  {
    title: 'Choose product & quantity',
    description: 'Pick a ready-made style or tell us what you need custom-made, with your rough quantity and target date.',
  },
  {
    title: 'Send your logo',
    description: 'Share your logo (AI, PDF, SVG or PNG) and choose embroidery, silkscreen, sublimation or DTF.',
  },
  {
    title: 'Approve the mock-up',
    description: 'We send a quotation and a digital mock-up showing your logo on the garment for your approval.',
  },
  {
    title: 'Production & delivery',
    description: 'We produce and quality-check your order in Cheras, then deliver or arrange collection.',
  },
];

export const customMadeSteps: ProcessStep[] = [
  {
    title: 'Consultation & brief',
    description: 'Tell us about your team, work environment, brand colours and budget. Share reference photos if you have them.',
  },
  {
    title: 'Fabric & design proposal',
    description: 'We recommend fabrics and cuts, and prepare a design sketch with colours, panels and logo placement.',
  },
  {
    title: 'Sample & fitting',
    description: 'A physical sample is produced for you to check fit, fabric and colour before bulk production.',
  },
  {
    title: 'Bulk production & delivery',
    description: 'Once approved, we cut, sew, brand and quality-check every piece, then pack and deliver.',
  },
];

export type CustomOption = { group: string; options: { name: string; detail: string }[] };

export const customOptions: CustomOption[] = [
  {
    group: 'Fabric',
    options: [
      { name: 'Honeycomb piqué', detail: 'Breathable corporate polo knit' },
      { name: 'Combed cotton', detail: 'Soft, natural t-shirt fabric' },
      { name: 'Microfibre dri-fit', detail: 'Quick-dry for outdoor & sports' },
      { name: 'Oxford / poly-cotton', detail: 'Easy-care office shirting' },
      { name: 'Drill / twill', detail: 'Heavy-duty workwear' },
    ],
  },
  {
    group: 'Collar & placket',
    options: [
      { name: 'Ribbed polo collar', detail: 'Classic flat-knit collar' },
      { name: 'Mandarin collar', detail: 'Clean band collar, modern look' },
      { name: 'F1 stand collar', detail: 'Sporty collar with piping' },
      { name: 'Concealed placket', detail: 'Hidden buttons, neat finish' },
      { name: 'Zip placket', detail: 'Quarter-zip for field teams' },
    ],
  },
  {
    group: 'Cut & details',
    options: [
      { name: 'Colour blocking', detail: 'Shoulder or side panels in brand colours' },
      { name: 'Contrast piping', detail: 'Piping on collar, sleeve or seams' },
      { name: 'Pen slot & pockets', detail: 'Practical pockets for work' },
      { name: 'Male, female & modest cuts', detail: 'Patterns for every team member' },
      { name: 'Extended sizing', detail: 'XS up to 5XL and beyond on request' },
    ],
  },
  {
    group: 'Branding',
    options: [
      { name: 'Embroidery', detail: 'Chest, sleeve and cap logos' },
      { name: 'Silkscreen', detail: 'Bold prints for bulk' },
      { name: 'Sublimation', detail: 'Full-colour all-over designs' },
      { name: 'DTF', detail: 'Detailed multi-colour logos' },
      { name: 'Woven labels & tags', detail: 'Custom neck labels on request' },
    ],
  },
];
