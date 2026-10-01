import type { CategorySlug } from './products';

export type IndustryIcon =
  | 'building'
  | 'utensils'
  | 'factory'
  | 'graduation'
  | 'party'
  | 'hotel'
  | 'health'
  | 'truck';

export type Industry = {
  slug: string;
  name: string;
  icon: IndustryIcon;
  summary: string;
  description: string;
  needs: string[];
  recommended: CategorySlug[];
  image?: string;
};

export const industries: Industry[] = [
  {
    slug: 'corporate',
    name: 'Corporate & Offices',
    icon: 'building',
    summary: 'Polos, Oxford shirts & jackets',
    description:
      'Consistent, professional uniforms for front office, sales, customer service and management teams — with embroidered logos that stay sharp.',
    needs: ['Smart, consistent look across branches', 'Embroidered logos', 'Male, female & modest cuts'],
    recommended: ['polo-shirts', 'corporate-shirts', 'jackets', 'muslimah'],
    image: '/images/industries/corporate.jpg',
  },
  {
    slug: 'food-beverage',
    name: 'Food & Beverage',
    icon: 'utensils',
    summary: 'Crew tees, aprons & caps',
    description:
      'Comfortable, easy-wash uniforms for cafés, restaurants, kiosks and central kitchens — matching tees, aprons and caps that carry your brand.',
    needs: ['Breathable fabrics for hot kitchens', 'Easy-wash, stain-friendly colours', 'Aprons and caps to complete the look'],
    recommended: ['t-shirts', 'polo-shirts', 'aprons-caps'],
    image: '/images/industries/food-beverage.jpg',
  },
  {
    slug: 'factories',
    name: 'Factories & Manufacturing',
    icon: 'factory',
    summary: 'Workwear, reflective & vests',
    description:
      'Durable workwear for production lines, warehouses and technical crews, with reflective options for visibility and heavy fabrics that survive frequent washing.',
    needs: ['Heavy-duty, long-lasting fabrics', 'Reflective tape & hi-vis options', 'Name or department printing'],
    recommended: ['industrial', 'f1-shirts', 'polo-shirts'],
    image: '/images/industries/factory.jpg',
  },
  {
    slug: 'schools',
    name: 'Schools & Universities',
    icon: 'graduation',
    summary: 'House jerseys, club & PE tees',
    description:
      'Sports house jerseys, club t-shirts, PE attire and event tees for schools, colleges and universities — with full-colour sublimation for team designs.',
    needs: ['Bright, full-colour designs', 'Wide size range for students', 'Budget-friendly bulk pricing'],
    recommended: ['jerseys', 't-shirts', 'polo-shirts'],
  },
  {
    slug: 'events',
    name: 'Events & Roadshows',
    icon: 'party',
    summary: 'Event tees & crew uniforms',
    description:
      'Fast turnaround t-shirts and crew uniforms for corporate events, family days, runs, launches and roadshows — printed with your campaign artwork.',
    needs: ['Fast turnaround for event dates', 'Cost-effective bulk printing', 'Quick-dry fabrics for outdoor events'],
    recommended: ['t-shirts', 'jerseys', 'polo-shirts'],
    image: '/images/industries/events.jpg',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality & Retail',
    icon: 'hotel',
    summary: 'Front desk, retail & housekeeping',
    description:
      'Neat, comfortable uniforms for hotels, resorts, retail stores and showrooms — designed to look good through long shifts.',
    needs: ['Polished front-of-house look', 'Comfortable for long shifts', 'Coordinated colours by department'],
    recommended: ['corporate-shirts', 'polo-shirts', 'muslimah', 'aprons-caps'],
  },
  {
    slug: 'healthcare',
    name: 'Clinics & Healthcare',
    icon: 'health',
    summary: 'Clinic staff polos & blouses',
    description:
      'Clean, professional uniforms for clinic, pharmacy and wellness staff, with modest-cut options and fabrics that handle frequent washing.',
    needs: ['Hygienic, easy-care fabrics', 'Modest-cut options', 'Clear staff identification'],
    recommended: ['polo-shirts', 'muslimah', 'corporate-shirts'],
  },
  {
    slug: 'logistics',
    name: 'Logistics & Security',
    icon: 'truck',
    summary: 'Field polos, jackets & vests',
    description:
      'Practical uniforms for delivery riders, drivers, security guards and field technicians — quick-dry, reflective and easy to identify.',
    needs: ['Quick-dry for outdoor work', 'Reflective and hi-vis options', 'Jackets for riders'],
    recommended: ['polo-shirts', 'jackets', 'industrial'],
    image: '/images/industries/logistics.jpg',
  },
];
