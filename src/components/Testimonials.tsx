'use client';
import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    quote:
      'Kah Global delivered 300 corporate uniforms for our hotel staff on time and within budget. The quality was outstanding — every stitch was perfect. Our guests always comment on how professional our team looks.',
    name: 'Nurul Aisyah binti Razali',
    title: 'HR Manager',
    company: 'Grand Meridian Hotel, Kuala Lumpur',
    initial: 'N',
  },
  {
    quote:
      "We've been ordering school uniforms from Kah Global for 4 consecutive years. Consistently high quality, competitive pricing, and the customer service team is incredibly responsive. Highly recommended for schools.",
    name: 'Encik Faizal bin Ahmad',
    title: 'Procurement Officer',
    company: 'SMK Cheras Perdana, Selangor',
    initial: 'F',
  },
  {
    quote:
      'Excellent service from inquiry to delivery. Our custom embroidered polo shirts for the annual corporate retreat were exactly what we envisioned — great fabric, crisp logo, fast delivery. Will order again.',
    name: 'Ms. Lim Wei Ling',
    title: 'Marketing Executive',
    company: 'TechMalaysia Sdn Bhd, Petaling Jaya',
    initial: 'L',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
                    {/* Quote mark */}
                    <div className="text-gold text-7xl font-serif leading-none select-none mb-2">
                      &ldquo;
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8 italic max-w-2xl mx-auto">
                      {t.quote}
                    </p>
                    {/* Divider */}
                    <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-gold font-bold text-lg flex-shrink-0">
                        {t.initial}
                      </div>
                      <div className="text-left">
                        <p className="text-navy font-bold">{t.name}</p>
                        <p className="text-gray-500 text-sm">
                          {t.title} — {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev/Next buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md items-center justify-center hover:border-gold hover:text-gold transition-all duration-200 text-gray-400"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md items-center justify-center hover:border-gold hover:text-gold transition-all duration-200 text-gray-400"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-7">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-gold w-7' : 'bg-gray-300 w-2.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
