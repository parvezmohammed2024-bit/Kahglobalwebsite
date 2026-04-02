import Image from 'next/image';
import { hero, contact } from '@/config/site.config';

interface HeroProps {
  settings?: {
    heroEyebrow?: string;
    heroHeadline?: string;
    heroHeadlineAccent?: string;
    heroSubheadline?: string;
    heroImageUrl?: string;
    heroImageAlt?: string;
    heroVideoUrl?: string;
    catCorporateUrl?: string;
    catSchoolUrl?: string;
    catHotelUrl?: string;
    catIndustrialUrl?: string;
    phone?: string;
    address?: string;
  } | null;
}

export default function Hero({ settings }: HeroProps) {
  const eyebrow   = settings?.heroEyebrow        ?? hero.eyebrow;
  const headline  = settings?.heroHeadline       ?? hero.headline;
  const accent    = settings?.heroHeadlineAccent ?? hero.headlineAccent;
  const sub       = settings?.heroSubheadline    ?? hero.subheadline;
  const heroImg   = settings?.heroImageUrl       ?? '';
  const heroAlt   = settings?.heroImageAlt       ?? 'Kah Global Uniform hero image';
  const heroVideo = settings?.heroVideoUrl       ?? '';

  const cats = [
    { label: 'Corporate',  color: 'from-blue-800 to-navy',           emoji: '👔', img: settings?.catCorporateUrl  ?? '' },
    { label: 'School',     color: 'from-emerald-700 to-emerald-900', emoji: '🎓', img: settings?.catSchoolUrl      ?? '' },
    { label: 'Hotel',      color: 'from-amber-700 to-amber-900',     emoji: '🏨', img: settings?.catHotelUrl       ?? '' },
    { label: 'Industrial', color: 'from-gray-700 to-gray-900',       emoji: '⚙️', img: settings?.catIndustrialUrl  ?? '' },
  ];
  const addrShort = contact.addressShort;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative bg-gradient-navy min-h-screen flex items-center overflow-hidden"
    >
      {/* Background video */}
      {heroVideo && (
        <video
          src={heroVideo}
          autoPlay muted loop playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
        />
      )}

      {/* Background image */}
      {heroImg && !heroVideo && (
        <Image
          src={heroImg}
          alt={heroAlt}
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
      )}

      {/* Animated rings — hidden on mobile to reduce clutter */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold/10 animate-pulse-ring" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/15 animate-pulse-ring delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gold/20 animate-pulse-ring delay-600" />
      </div>

      {/* Floating shapes — hidden on mobile */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 animate-float-slow" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold/8 animate-float delay-400" />
        <div className="absolute top-1/4 right-1/4 grid grid-cols-4 gap-4 animate-float delay-200 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold" />
          ))}
        </div>
        <div className="absolute top-20 left-1/3 w-16 h-16 rounded-full border-2 border-dashed border-gold/20 animate-spin-slow" />
        <div className="absolute bottom-32 right-12 w-14 h-14 rounded-2xl bg-gold/10 rotate-12 animate-float delay-500" />
      </div>

      {/* Main content — fixed mobile padding */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-24 sm:py-36 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left — Text */}
          <div className="w-full min-w-0">
            {/* Eyebrow badge */}
            <div className="animate-fade-in-down inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-3 py-1.5 mb-5 max-w-full">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse-ring flex-shrink-0" />
              <span className="text-gold text-[11px] sm:text-xs font-bold uppercase tracking-wider truncate">
                {eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 animate-fade-in-up delay-100 break-words"
            >
              {headline}{' '}
              <span className="text-shimmer">{accent}</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed animate-fade-in-up delay-200">
              {sub}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <a
                href={hero.cta1Href}
                className="group relative bg-gold text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl overflow-hidden shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span className="relative z-10">{hero.cta1Label}</span>
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href={hero.cta2Href}
                className="border-2 border-white/40 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                {hero.cta2Label}
              </a>
            </div>

            {/* Stats */}
            <ul
              aria-label="Company highlights"
              className="mt-10 flex flex-wrap gap-5 sm:gap-6 items-center list-none p-0 animate-fade-in-up delay-400"
            >
              {hero.stats.map((item, i) => (
                <li key={item.label} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-gold font-extrabold text-lg sm:text-xl leading-none">{item.num}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.label}</div>
                  </div>
                  {i < hero.stats.length - 1 && <div className="w-px h-8 bg-white/10" />}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Visual cards (desktop only) */}
          <div className="hidden lg:block relative animate-fade-in-right delay-300">
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 animate-float">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {cats.map((cat) => (
                  <div
                    key={cat.label}
                    className={`bg-gradient-to-br ${cat.color} rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2 aspect-square relative`}
                  >
                    {cat.img ? (
                      <Image
                        src={cat.img}
                        alt={cat.label}
                        fill
                        className="object-cover"
                        sizes="160px"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <span className="text-3xl">{cat.emoji}</span>
                        <span className="relative z-10 text-white text-xs font-semibold">{cat.label}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-gold/20 border border-gold/30 rounded-2xl px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">Free Quote Available</div>
                  <div className="text-gray-400 text-xs">Respond within 24 hours</div>
                </div>
                <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-gold rounded-2xl px-5 py-3 shadow-2xl shadow-gold/30 animate-float-slow delay-300">
              <div className="text-white font-extrabold text-sm">📍 {addrShort}</div>
              <div className="text-white/70 text-xs">Since {new Date().getFullYear() - 10}+</div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-2xl animate-float delay-500">
              <div className="text-navy font-extrabold text-sm">✅ Bulk Orders</div>
              <div className="text-gray-400 text-xs">Min. 50 units</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 wave-divider">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0 70L1440 70L1440 20C1200 60 960 75 720 70C480 65 240 45 0 20L0 70Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
