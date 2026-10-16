import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/data/site';

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center gap-2 ${className}`} aria-label={`${company.name} — home`}>
      <Image
        src={light ? '/brand/logo-mark-white.png' : '/brand/logo-mark.png'}
        alt=""
        width={44}
        height={42}
        className="h-9 w-auto shrink-0 md:h-10"
        loading="eager"
      />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={`font-display text-base font-extrabold sm:text-lg tracking-tight md:text-xl ${light ? 'text-white' : 'text-navy'}`}>
          KAH GLOBAL
        </span>
        <span className={`mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${light ? 'text-sky' : 'text-muted'}`}>
          Sdn Bhd
        </span>
      </span>
    </Link>
  );
}
