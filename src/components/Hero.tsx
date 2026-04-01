export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative bg-navy min-h-screen flex items-center overflow-hidden"
    >
      {/* Diagonal stripe overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(201,168,76,0.06) 40px, rgba(201,168,76,0.06) 41px)',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 lg:py-48">
        <div className="max-w-3xl">
          <p
            data-aos="fade-down"
            className="text-gold font-semibold uppercase tracking-widest text-sm mb-5"
          >
            Malaysia&apos;s Trusted Uniform Manufacturer — Cheras, Selangor
          </p>

          <h1
            id="hero-heading"
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Dress Your Team.{' '}
            <span className="text-gold">Define Your Brand.</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            Premium Uniform &amp; Apparel Solutions for Businesses Across Malaysia.
            From corporate offices and schools to hotels and factories — quality craftsmanship,
            custom designs, and reliable bulk orders since 2014.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-wrap gap-4"
          >
            <a
              href="#products"
              className="bg-gold text-white font-bold px-7 py-3.5 rounded-md hover:brightness-110 transition-all duration-200 shadow-md"
            >
              View Our Products
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white font-bold px-7 py-3.5 rounded-md hover:bg-white hover:text-navy transition-all duration-200"
            >
              Request a Quote
            </a>
          </div>

          {/* Trust badges */}
          <ul
            data-aos="fade-up"
            data-aos-delay="400"
            aria-label="Company highlights"
            className="mt-14 flex flex-wrap gap-6 items-center list-none p-0"
          >
            {['10+ Years Experience', '500+ Happy Clients', 'Cheras, Selangor'].map((badge) => (
              <li key={badge} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" aria-hidden="true" />
                <span className="text-gray-400 text-sm">{badge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom wave into white */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-14"
        >
          <path
            d="M0 56L1440 56L1440 0C1200 38 960 56 720 56C480 56 240 38 0 0L0 56Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
