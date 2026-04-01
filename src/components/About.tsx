import StatCards from './StatCards';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">
            About Us
          </p>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-extrabold text-navy mb-5">
            Crafting Quality Uniforms Since 2014
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Kah Global Uniform Sdn Bhd has been crafting quality uniforms since 2014, serving
            businesses, schools, hotels, and corporate clients across Malaysia. Based in
            Cheras, Selangor, we combine precision manufacturing with personalised service —
            delivering uniforms that look great, feel comfortable, and last.
          </p>
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div data-aos="fade-right">
            <h3 className="text-2xl font-bold text-navy mb-4">Our Story</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in Cheras, Selangor, Kah Global started as a small tailoring outfit with a
              simple mission: to help Malaysian businesses project professionalism through
              well-crafted, affordable uniforms.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Over a decade later, we&apos;ve grown into one of the region&apos;s most trusted
              uniform manufacturers, serving clients from SMEs and government departments to
              international hotel chains and national schools.
            </p>
            <ul className="space-y-3">
              {[
                'In-house design and production facility',
                'ISO-compliant quality control process',
                'MOQ from 50 units — flexible for all business sizes',
                'Delivery across Peninsular Malaysia & East Malaysia',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="mt-1 w-4 h-4 rounded-full bg-gold flex-shrink-0 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-left" className="relative">
            {/* Placeholder image box */}
            <div
              role="img"
              aria-label="Kah Global Uniform Sdn Bhd production facility in Cheras, Kuala Lumpur"
              className="w-full h-80 bg-navy rounded-2xl flex items-center justify-center relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(201,168,76,0.4) 20px, rgba(201,168,76,0.4) 21px)',
                }}
              />
              <div className="text-center relative" aria-hidden="true">
                <div className="text-gold font-extrabold text-3xl">KAH GLOBAL</div>
                <div className="text-gray-400 text-sm mt-2">Factory Photo Placeholder</div>
              </div>
            </div>
            {/* Gold accent badge */}
            <div className="absolute -bottom-4 -right-4 bg-gold rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-white font-extrabold text-2xl">10+</div>
              <div className="text-white text-xs font-semibold">Years in Business</div>
            </div>
          </div>
        </div>

        {/* Stat Cards — client component for CountUp */}
        <StatCards />
      </div>
    </section>
  );
}
