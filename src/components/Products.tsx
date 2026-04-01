import { Briefcase, BookOpen, Building2, HardHat, Dumbbell, Scissors } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Product {
  icon: LucideIcon;
  title: string;
  description: string;
}

const products: Product[] = [
  {
    icon: Briefcase,
    title: 'Corporate Uniforms',
    description:
      'Polished, professional uniforms for offices, banks, retail, and service industries. Tailored to reflect your brand identity and dress code requirements.',
  },
  {
    icon: BookOpen,
    title: 'School Uniforms',
    description:
      'Durable, breathable school uniforms for primary and secondary institutions. Consistent quality across bulk orders, with options for custom embroidery.',
  },
  {
    icon: Building2,
    title: 'Hospitality & Hotel Uniforms',
    description:
      'Elegant, comfortable uniforms for hotels, resorts, restaurants, and F&B outlets. Designed for long service hours without compromising on style.',
  },
  {
    icon: HardHat,
    title: 'Industrial & Safety Wear',
    description:
      'High-visibility, safety-compliant workwear for factories, warehouses, and construction sites. Meets Malaysian industrial safety standards.',
  },
  {
    icon: Dumbbell,
    title: 'Sports & PE Uniforms',
    description:
      'Performance sportswear and PE uniforms for schools, sports clubs, and corporate events. Moisture-wicking fabrics for maximum comfort.',
  },
  {
    icon: Scissors,
    title: 'Custom Embroidery & Branding',
    description:
      'Logo embroidery, screen printing, heat transfer, and full custom branding services. Make every uniform a walking advertisement for your brand.',
  },
];

export default function Products() {
  return (
    <section id="products" aria-labelledby="products-heading" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">
            What We Offer
          </p>
          <h2 id="products-heading" className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            Our Uniform Collections
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            From corporate boardrooms to school halls, factory floors, and hotel lobbies —
            we have the perfect uniform solution for your industry.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <article
                key={product.title}
                data-aos="fade-up"
                data-aos-delay={`${(i % 3) * 100}`}
                className="group bg-white rounded-2xl p-7 shadow-sm border-2 border-transparent hover:border-gold hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300" aria-hidden="true">
                  <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-navy font-bold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm hover:gap-3 transition-all duration-200"
                  aria-label={`Learn more about ${product.title}`}
                >
                  Get a Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-gray-500 mb-4">Don&apos;t see what you need? We do custom orders.</p>
          <a
            href="#contact"
            className="inline-block bg-navy text-white font-bold px-8 py-3.5 rounded-md hover:bg-opacity-90 transition-all duration-200 shadow-md"
          >
            Discuss Your Requirements
          </a>
        </div>
      </div>
    </section>
  );
}
