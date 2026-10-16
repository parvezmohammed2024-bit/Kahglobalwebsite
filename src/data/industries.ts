import type { SiteImageKey } from '@/lib/catalog/types';

export type IndustryIcon = 'graduation' | 'hotel' | 'utensils' | 'building' | 'trophy' | 'moon';

export type Industry = {
  slug: string;
  name: string;
  icon: IndustryIcon;
  summary: string;
  description: string;
  needs: string[];
  /** Category slugs (see the catalogue in /admin) */
  recommended: string[];
  imageKey: SiteImageKey;
  imageAlt: string;
};

export const industries: Industry[] = [
  {
    slug: 'schools',
    name: 'Schools',
    icon: 'graduation',
    summary: 'Baju sekolah, PE & house tees',
    description:
      'School uniforms, baju kurung sekolah, PE attire and sports-house t-shirts — manufactured in your school colours with the school badge.',
    needs: ['School colours and badge', 'Children’s and adult sizes', 'Durable, easy-iron fabrics'],
    recommended: ['school-uniforms', 'sublimation-tshirts', 'baju-kurung'],
    imageKey: 'industry-school',
    imageAlt: 'Students wearing school uniforms',
  },
  {
    slug: 'hotels',
    name: 'Hotels & Hospitality',
    icon: 'hotel',
    summary: 'Front office, housekeeping & F&B',
    description:
      'Coordinated uniforms for every hotel department — front office, concierge, housekeeping, banquet and F&B — tailored for long shifts.',
    needs: ['Polished front-of-house look', 'Colours coordinated by department', 'Comfortable for long shifts'],
    recommended: ['hotel-uniforms', 'restaurant-uniforms', 'baju-melayu', 'baju-kurung'],
    imageKey: 'industry-hotel',
    imageAlt: 'Hotel staff in matching uniforms',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants & F&B',
    icon: 'utensils',
    summary: 'Chef jackets, crew tees & aprons',
    description:
      'Chef jackets, kitchen wear, crew t-shirts, aprons and caps for restaurants, cafés and central kitchens — branded with your logo.',
    needs: ['Breathable for hot kitchens', 'Easy-wash, stain-friendly colours', 'Matching aprons and caps'],
    recommended: ['restaurant-uniforms', 'corporate-uniforms'],
    imageKey: 'industry-restaurant',
    imageAlt: 'Chef and restaurant crew in uniforms',
  },
  {
    slug: 'corporate',
    name: 'Corporate & Offices',
    icon: 'building',
    summary: 'Polos, office shirts & jackets',
    description:
      'Consistent, professional uniforms for offices, banks, showrooms and service teams — with embroidered logos that stay sharp.',
    needs: ['Consistent look across branches', 'Embroidered company logo', 'Male, female & modest cuts'],
    recommended: ['corporate-uniforms', 'baju-melayu', 'baju-kurung'],
    imageKey: 'industry-corporate',
    imageAlt: 'Office team wearing corporate uniforms',
  },
  {
    slug: 'events',
    name: 'Sports, Clubs & Events',
    icon: 'trophy',
    summary: 'Sublimation jerseys & event tees',
    description:
      'Full-colour sublimation jerseys and t-shirts for sports teams, clubs, corporate runs, family days and launches.',
    needs: ['Unlimited colours and designs', 'Names and numbers', 'Fast turnaround for event dates'],
    recommended: ['sublimation-tshirts', 'corporate-uniforms'],
    imageKey: 'industry-events',
    imageAlt: 'Team wearing sublimation jerseys',
  },
  {
    slug: 'festive',
    name: 'Festive & Raya Collections',
    icon: 'moon',
    summary: 'Baju Melayu, kurung & accessories',
    description:
      'Matching Baju Melayu, Baju Kurung, samping, songkok, kebaya and tudung for corporate Raya, staff gifts and family sets.',
    needs: ['Matching team and family sets', 'Your choice of fabric and colour', 'Complete sets with accessories'],
    recommended: ['baju-melayu', 'baju-kurung', 'malay-mens-wear', 'malay-ladies-wear'],
    imageKey: 'industry-festive',
    imageAlt: 'Family wearing matching Baju Melayu and Baju Kurung',
  },
];
