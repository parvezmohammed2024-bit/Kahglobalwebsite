import Image from 'next/image';
import { clientLogos } from '@/data/site';

/**
 * Client logo strip. Hidden until at least one client has a `logo` path in
 * src/data/site.ts (only list clients who have approved being shown).
 */
export function ClientLogos() {
  const withLogos = clientLogos.filter((c) => c.logo);
  if (withLogos.length === 0) return null;

  return (
    <section aria-labelledby="clients-heading" className="border-y border-line bg-white py-8 md:py-10">
      <div className="container-page flex flex-col gap-6">
        <h2 id="clients-heading" className="text-center text-label font-semibold uppercase text-muted">
          Trusted by teams across Malaysia
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {withLogos.map((client) => (
            <li
              key={client.name}
              className="flex h-16 items-center justify-center rounded-control border border-line bg-white px-3 text-center text-xs font-semibold text-muted"
            >
              <Image
                src={client.logo as string}
                alt={`${client.name} logo`}
                width={140}
                height={48}
                className="max-h-10 w-auto object-contain grayscale"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
