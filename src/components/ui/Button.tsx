import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'light' | 'ghost-light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-orange/30 whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-white hover:bg-orange-hover shadow-sm',
  secondary: 'bg-navy text-white hover:bg-steel',
  outline: 'border border-line bg-white text-navy hover:bg-surface hover:border-line-strong',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-hover',
  light: 'bg-white text-navy hover:bg-surface-blue',
  'ghost-light': 'border border-white/30 text-white hover:bg-white/10',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className = ''): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, 'className' | 'children'>) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

/** For external links (wa.me, tel:, mailto:) */
export function ButtonAnchor({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<'a'>, 'className' | 'children'>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...props
}: CommonProps & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
