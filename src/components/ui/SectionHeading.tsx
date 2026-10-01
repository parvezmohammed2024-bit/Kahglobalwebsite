import type { ReactNode } from 'react';

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-label font-semibold uppercase ${light ? 'text-orange-line' : 'text-orange-ink'}`}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  action,
  light = false,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  action?: ReactNode;
  light?: boolean;
  as?: 'h1' | 'h2';
}) {
  const centered = align === 'center';
  return (
    <div
      className={`mb-8 flex flex-col gap-4 md:mb-12 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={`flex flex-col gap-3 ${centered ? 'max-w-2xl items-center' : 'max-w-2xl'}`}>
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <Tag
          className={`font-display text-headline-lg-mobile font-bold md:text-headline-lg ${light ? 'text-white' : 'text-navy'}`}
        >
          {title}
        </Tag>
        {description && (
          <p className={`text-base md:text-lg ${light ? 'text-sky' : 'text-muted'}`}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
