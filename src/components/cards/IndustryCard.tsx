import Link from 'next/link';
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  PartyPopper,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import type { Industry, IndustryIcon } from '@/data/industries';

export const industryIcons: Record<IndustryIcon, LucideIcon> = {
  building: Building2,
  utensils: UtensilsCrossed,
  factory: Factory,
  graduation: GraduationCap,
  party: PartyPopper,
  hotel: Hotel,
  health: HeartPulse,
  truck: Truck,
};

export function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industryIcons[industry.icon];
  return (
    <Link
      href={`/industries#${industry.slug}`}
      className="group flex items-center gap-4 rounded-card border border-line bg-white p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-orange-line hover:shadow-card-hover md:flex-col md:items-start md:p-5"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-surface-blue text-steel transition-colors group-hover:bg-orange group-hover:text-white">
        <Icon aria-hidden className="size-5" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-display font-bold text-navy">{industry.name}</span>
        <span className="text-sm text-muted">{industry.summary}</span>
      </span>
    </Link>
  );
}
