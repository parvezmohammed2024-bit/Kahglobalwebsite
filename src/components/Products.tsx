import Image from 'next/image';
import { Briefcase, BookOpen, Building2, HardHat, Dumbbell, Scissors } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { products as defaultProducts, productsSection } from '@/config/site.config';

const icons: LucideIcon[] = [Briefcase, BookOpen, Building2, HardHat, Dumbbell, Scissors];

interface SanityProduct {
  _id: string;
  title: string;
  description: string;
  gradient: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface ProductsProps {
  sanityProducts?: SanityProduct[] | null;
}

export default function Products({ sanityProducts }: ProductsProps) {
  // Use Sanity products if available, otherwise fall back to site.config
  const products = (sanityProducts && sanityProducts.length > 0)
    ? sanityProducts.map((p) => ({
        title:       p.title,
        description: p.description,
        gradient:    p.gradient || 'from-[#0A1F44] via-[#0d2855] to-[#1a3a6e]',
        image:       p.imageUrl ?? '',
        imageAlt:    p.imageAlt ?? p.title,
      }))
    : defaultProducts.map((p) => ({ ...p, imageAlt: p.title }));
  return (
    <section id="products" aria-labelledby="products-heading" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block bg-gold/10 text-gold font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
            {productsSection.eyebrow}
          </span>
          <h2 id="products-heading" className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            {productsSection.heading}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{productsSection.subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = icons[i] ?? Briefcase;
            return (
              <article
                key={product.title}
                data-aos="fade-up"
                data-aos-delay={`${(i % 3) * 100}`}
                className="card-hover group rounded-3xl overflow-hidden shadow-md cursor-pointer"
              >
                {/* Visual header */}
                <div className={`relative bg-gradient-to-br ${product.gradient} h-44 flex items-center justify-center overflow-hidden`}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <div aria-hidden="true" className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)' }} />
                      <div aria-hidden="true" className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
                      <div aria-hidden="true" className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/5" />
                      <div className="relative w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <div aria-hidden="true" className="absolute top-3 right-4 text-white/20 font-black text-5xl leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="bg-white p-6">
                  <h3 className="text-navy font-extrabold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.description}</p>
                  <a
                    href="#contact"
                    aria-label={`Get a quote for ${product.title}`}
                    className="inline-flex items-center gap-2 text-gold font-bold text-sm group-hover:gap-3 transition-all duration-200"
                  >
                    Get a Quote
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-14" data-aos="fade-up">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-navy rounded-2xl px-8 py-6 shadow-xl">
            <p className="text-gray-300 text-sm">{productsSection.ctaText}</p>
            <a href="#contact" className="bg-gold text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:brightness-110 transition-all whitespace-nowrap">
              {productsSection.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
