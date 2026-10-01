import type { ProcessStep } from '@/data/services';

/** Numbered horizontal timeline on desktop, vertical on mobile. */
export function StepsTimeline({ steps, light = false }: { steps: ProcessStep[]; light?: boolean }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <span
        aria-hidden
        className={`absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 lg:block ${light ? 'bg-white/15' : 'bg-line'}`}
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
          <span
            className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-card font-display text-lg font-extrabold tabular-nums ${
              i === steps.length - 1 ? 'bg-orange text-white' : light ? 'bg-white text-navy' : 'bg-navy text-white'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className={`font-display text-headline-sm font-semibold ${light ? 'text-white' : 'text-navy'}`}>
              {step.title}
            </h3>
            <p className={`text-sm ${light ? 'text-sky' : 'text-muted'}`}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
