import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/data/site';

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label={`${company.name} — home`}>
      <Image
        src={light ? '/brand/logo-mark-white.png' : '/brand/logo-mark.png'}
        alt=""
        width={44}
        height={42}
        className="h-9 w-auto md:h-10"
        loading="eager"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight md:text-xl ${light ? 'text-white' : 'text-navy'}`}>
          KAH GLOBAL
        </span>
        <span className={`mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${light ? 'text-sky' : 'text-muted'}`}>
          Sdn Bhd · Uniforms
        </span>
      </span>
    </Link>
  );
}
