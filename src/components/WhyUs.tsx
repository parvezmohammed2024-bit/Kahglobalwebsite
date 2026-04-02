import { Palette, Package, Zap, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { whyUs } from '@/config/site.config';

const icons: LucideIcon[] = [Palette, Package, Zap, Shield];

interface SanityFeature {
  _id: string;
  number: string;
  title: string;
  description: string;
}

interface WhyUsProps {
  sanityFeatures?: SanityFeature[] | null;
}

export default function WhyUs({ sanityFeatures }: WhyUsProps) {
  const features = (sanityFeatures && sanityFeatures.length > 0)
    ? sanityFeatures.map((f) => ({ num: f.number, title: f.title, description: f.description }))
    : whyUs.features;
  return (
    <section id="why-us" aria-labelledby="whyus-heading" className="py-24 bg-gradient-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block bg-gold/15 border border-gold/30 text-gold font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
            {whyUs.eyebrow}
          </span>
          <h2 id="whyus-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {whyUs.heading}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{whyUs.subheading}</p>
        </div>

        {/* 2×2 Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {features.map((feature, i) => {
            const Icon = icons[i] ?? Palette;
            const aos = i % 2 === 0 ? 'fade-right' : 'fade-left';
            return (
              <article
                key={feature.title}
                data-aos={aos}
                aria-label={feature.title}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-gold/40 transition-all duration-300 overflow-hidden card-hover"
              >
                <div aria-hidden="true" className="absolute top-4 right-6 text-white/5 font-black text-8xl leading-none select-none group-hover:text-gold/10 transition-colors duration-300">
                  {feature.num}
                </div>
                <div className="relative w-14 h-14 bg-gold/20 border border-gold/30 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gold group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                </div>
                <h3 className="text-white font-extrabold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                <div className="mt-6 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-500 rounded-full" />
              </article>
            );
          })}
        </div>

        {/* Stats row */}
        <div data-aos="fade-up" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {whyUs.stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-gold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div data-aos="fade-up" className="relative overflow-hidden bg-gold rounded-3xl p-8 md:p-12 text-center">
          <div aria-hidden="true" className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
          <div aria-hidden="true" className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10" />
          <div className="relative">
            <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-3">{whyUs.ctaHeading}</h3>
            <p className="text-white/80 mb-7 max-w-md mx-auto">{whyUs.ctaText}</p>
            <a href="#contact" className="inline-block bg-white text-navy font-extrabold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-xl">
              {whyUs.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
