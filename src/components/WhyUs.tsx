import { Palette, Package, Zap, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  aosDirection: 'fade-right' | 'fade-left';
}

const features: Feature[] = [
  {
    icon: Palette,
    title: 'Custom Design & Branding',
    description:
      'Work directly with our in-house design team to create uniforms that perfectly represent your brand. Full customisation — colours, cuts, logos, embroidery, and print styles. No two brands are the same, and neither are our uniforms.',
    aosDirection: 'fade-right',
  },
  {
    icon: Package,
    title: 'Bulk Order Specialists',
    description:
      'Whether it\'s 50 or 5,000 units, we handle large-scale orders with consistency and precision. Our volume pricing model ensures you get the most cost-effective solution in Malaysia without sacrificing quality.',
    aosDirection: 'fade-left',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description:
      'We understand that deadlines matter. Our streamlined production process and dedicated logistics team ensure your order is delivered on time, every time — without compromising on quality or craftsmanship.',
    aosDirection: 'fade-right',
  },
  {
    icon: Shield,
    title: 'Quality Fabric & Stitching',
    description:
      'All uniforms are manufactured using premium, durable fabrics carefully selected for each industry\'s demands. Reinforced stitching and rigorous QC checks at every stage mean you get uniforms built to last — backed by our quality guarantee.',
    aosDirection: 'fade-left',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="whyus-heading" className="py-24 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">
            Why Choose Us
          </p>
          <h2 id="whyus-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            The Kah Global Difference
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We&apos;re more than a uniform supplier — we&apos;re your long-term uniform partner.
            Here&apos;s what sets us apart.
          </p>
        </div>

        {/* Alternating Feature Blocks */}
        <div className="space-y-16">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isReversed = i % 2 !== 0;
            return (
              <article
                key={feature.title}
                data-aos={feature.aosDirection}
                aria-label={feature.title}
                className={`flex flex-col md:flex-row items-center gap-8 lg:gap-14 ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Icon block */}
                <div className="flex-shrink-0" aria-hidden="true">
                  <div className="w-20 h-20 bg-gold rounded-2xl flex items-center justify-center shadow-lg shadow-gold/20">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Text block */}
                <div
                  className={`flex-1 text-center md:text-left ${
                    isReversed ? 'md:text-right' : ''
                  }`}
                >
                  <h3 className="text-white font-extrabold text-xl sm:text-2xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-lg">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div
          data-aos="fade-up"
          className="mt-20 border border-gold/30 rounded-2xl p-8 md:p-10 text-center bg-white/5"
        >
          <h3 className="text-white font-extrabold text-2xl mb-3">
            Ready to Outfit Your Team?
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Get a free consultation and quote — no commitment required. We respond within 24 hours.
          </p>
          <a
            href="#contact"
            className="inline-block bg-gold text-white font-bold px-8 py-3.5 rounded-md hover:brightness-110 transition-all duration-200 shadow-md"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
