import { Quote } from 'lucide-react';
import type { Testimonial } from '@/data/site';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .replace(/\[.*?\]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-card">
      <Quote aria-hidden className="size-7 text-orange" />
      <blockquote className="flex-1 text-ink">“{testimonial.quote}”</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-line pt-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-blue font-display text-sm font-bold text-steel">
          {initials || '?'}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-navy">{testimonial.name}</span>
          <span className="text-xs text-muted">
            {testimonial.role}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
