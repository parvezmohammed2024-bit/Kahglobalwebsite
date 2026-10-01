import Image from 'next/image';
import { clientLogos } from '@/data/site';

/** Client logo strip. Add `logo` paths in src/data/site.ts once clients approve. */
export function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="border-y border-line bg-white py-8 md:py-10">
      <div className="container-page flex flex-col gap-6">
        <h2 id="clients-heading" className="text-center text-label font-semibold uppercase text-muted">
          Trusted by teams across Malaysia
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {clientLogos.map((client) => (
            <li
              key={client.name}
              className="flex h-16 items-center justify-center rounded-control border border-dashed border-line-strong bg-surface px-3 text-center text-xs font-semibold text-muted"
            >
              {client.logo ? (
                <Image src={client.logo} alt={client.name} width={140} height={48} className="max-h-10 w-auto object-contain grayscale" />
              ) : (
                client.name
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
