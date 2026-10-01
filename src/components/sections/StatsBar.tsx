import { Award, Building2, Factory, Shirt, type LucideIcon } from 'lucide-react';
import { stats } from '@/data/site';

const icons: LucideIcon[] = [Award, Building2, Shirt, Factory];

export function StatsBar() {
  return (
    <section aria-label="Kah Global at a glance" className="border-y border-line bg-white">
      <dl className="container-page grid grid-cols-2 gap-y-6 py-6 md:py-8 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={s.label} className="flex items-center gap-3 px-2 lg:border-l lg:border-line lg:px-6 lg:first:border-l-0">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-surface-blue text-steel">
                <Icon aria-hidden className="size-5" />
              </span>
              <div className="flex min-w-0 flex-col">
                <dt className="order-2 text-xs text-muted md:text-sm">
                  {s.label}
                  <span className="hidden md:inline"> · {s.sublabel}</span>
                </dt>
                <dd className="order-1 truncate font-display text-base font-extrabold text-navy md:text-xl">{s.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
