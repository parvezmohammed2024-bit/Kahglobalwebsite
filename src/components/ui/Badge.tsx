import type { ReactNode } from 'react';

type Tone = 'spec' | 'accent' | 'navy' | 'success' | 'outline-light';

const tones: Record<Tone, string> = {
  spec: 'bg-surface border border-line text-ink',
  accent: 'bg-orange-soft border border-orange-line text-orange-ink',
  navy: 'bg-navy text-white border border-navy',
  success: 'bg-emerald-50 border border-emerald-200 text-emerald-700',
  'outline-light': 'border border-white/25 bg-white/10 text-white',
};

export function Badge({
  tone = 'spec',
  pill = false,
  className = '',
  children,
}: {
  tone?: Tone;
  pill?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-label font-semibold uppercase ${
        pill ? 'rounded-full' : 'rounded-control'
      } ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
