import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export function ServiceCard({
  icon,
  title,
  description,
  meta,
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  meta?: string[];
  href?: string;
}) {
  const body = (
    <>
      <span className="flex size-12 items-center justify-center rounded-card bg-surface-blue text-steel transition-colors group-hover:bg-orange group-hover:text-white">
        {icon}
      </span>
      <h3 className="font-display text-headline-sm font-semibold text-navy">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
      {meta && meta.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-xs font-semibold text-steel">
          {meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      )}
      {href && (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-ink">
          Learn more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  const className =
    'group flex h-full flex-col gap-3 rounded-card border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover md:p-6';

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
