import Image from 'next/image';
import StatCards from './StatCards';
import { about, images } from '@/config/site.config';

interface AboutProps {
  settings?: {
    aboutHeading?: string;
    aboutIntro?: string;
    aboutStory1?: string;
    aboutStory2?: string;
    aboutHighlights?: string[];
    aboutFactoryUrl?: string;
    aboutFactoryAlt?: string;
  } | null;
}

export default function About({ settings }: AboutProps) {
  const heading    = settings?.aboutHeading    ?? about.heading;
  const intro      = settings?.aboutIntro      ?? about.intro;
  const story1     = settings?.aboutStory1     ?? about.storyP1;
  const story2     = settings?.aboutStory2     ?? about.storyP2;
  const highlights = settings?.aboutHighlights ?? about.highlights;
  const factoryImg = settings?.aboutFactoryUrl ?? images.aboutFactory;
  const factoryAlt = settings?.aboutFactoryAlt ?? 'Our factory in Cheras, KL';
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block bg-navy/5 text-navy font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
            About Us
          </span>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            {heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left — Visual / factory image */}
          <div data-aos="fade-right" className="relative order-2 lg:order-1">
            <div
              role="img"
              aria-label="Kah Global Uniform Sdn Bhd production facility in Cheras, Kuala Lumpur"
              className="relative w-full aspect-[4/3] bg-gradient-navy rounded-3xl overflow-hidden"
            >
              {factoryImg ? (
                <Image
                  src={factoryImg}
                  alt={factoryAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : (
                <>
                  {/* Placeholder design */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" aria-hidden="true">
                    <div className="w-20 h-20 bg-gold/20 border-2 border-gold/40 rounded-3xl flex items-center justify-center animate-pulse-ring">
                      <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <p className="text-gold font-bold text-sm tracking-widest uppercase">Add Your Photo</p>
                    <p className="text-gray-500 text-xs">Set <code className="bg-white/10 px-1 rounded">images.aboutFactory</code> in site.config.ts</p>
                  </div>
                </>
              )}
            </div>

            <div className="absolute -bottom-5 -right-5 bg-gold rounded-2xl px-6 py-4 shadow-2xl shadow-gold/30 animate-float">
              <div className="text-white font-black text-3xl leading-none">10+</div>
              <div className="text-white/80 text-xs font-semibold mt-0.5">Years in Business</div>
            </div>

            <div className="absolute -top-4 -left-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-xl animate-float delay-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-navy font-bold text-sm">Cheras, KL</span>
              </div>
              <div className="text-gray-400 text-xs mt-0.5">Mon–Fri 8am–5pm</div>
            </div>
          </div>

          {/* Right — Text */}
          <div data-aos="fade-left" className="order-1 lg:order-2">
            <h3 className="text-2xl font-extrabold text-navy mb-4">Our Story</h3>
            <p className="text-gray-600 leading-relaxed mb-5">{story1}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{story2}</p>

            <ul className="space-y-3 mb-8">
              {highlights.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gold flex-shrink-0 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-sm">{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-navy text-white font-bold px-6 py-3.5 rounded-xl hover:bg-opacity-90 transition-all duration-200 hover:scale-105 shadow-md"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <StatCards />
      </div>
    </section>
  );
}
