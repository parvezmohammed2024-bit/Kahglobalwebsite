import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Eyebrow } from '@/components/ui/SectionHeading';

/** Header band for inner pages: breadcrumbs, eyebrow, H1, intro and optional actions/aside. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  actions,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-gradient-to-b from-surface-blue to-canvas">
      <div className="container-page flex flex-col gap-8 py-8 md:py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-4">
          <Breadcrumbs items={crumbs} />
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-display-mobile font-extrabold text-navy md:text-[2.75rem] md:leading-[3.25rem] lg:text-display">
            {title}
          </h1>
          {description && <p className="text-base text-muted md:text-lg">{description}</p>}
          {actions && <div className="mt-2 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </section>
  );
}
