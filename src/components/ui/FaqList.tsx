import { ChevronDown } from 'lucide-react';
import type { Faq } from '@/data/site';
import { JsonLd } from './JsonLd';

/** Accessible accordion using native <details>; no client JS needed. */
export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-card">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-navy hover:bg-surface md:px-6 [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 text-muted md:px-6">{faq.answer}</p>
        </details>
      ))}
      {withSchema && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs
              .filter((f) => !f.answer.includes('[PLACEHOLDER]'))
              .map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
          }}
        />
      )}
    </div>
  );
}
