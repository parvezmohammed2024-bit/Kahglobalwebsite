'use client';
import Image from 'next/image';

interface GalleryImage {
  id: string | number;
  image_url: string;
  alt_text: string;
}

interface GalleryProps {
  images?: GalleryImage[] | null;
}

// Default placeholder images (shown when no images uploaded yet)
const PLACEHOLDERS = [
  { id: 'p1', image_url: '', alt_text: 'Uniform gallery 1' },
  { id: 'p2', image_url: '', alt_text: 'Uniform gallery 2' },
  { id: 'p3', image_url: '', alt_text: 'Uniform gallery 3' },
  { id: 'p4', image_url: '', alt_text: 'Uniform gallery 4' },
  { id: 'p5', image_url: '', alt_text: 'Uniform gallery 5' },
];

export default function Gallery({ images }: GalleryProps) {
  const items = images && images.length > 0 ? images : null;
  if (!items) return null; // Hide section entirely until images are uploaded

  // Duplicate for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center" data-aos="fade-up">
        <span className="inline-block bg-gold/10 text-gold font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
          Our Work
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">
          Uniforms We&apos;ve Crafted
        </h2>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex gap-4 gallery-marquee" style={{ width: 'max-content' }}>
          {doubled.map((img, i) => (
            <div
              key={`${img.id}-${i}`}
              className="relative w-64 h-72 rounded-2xl overflow-hidden flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
            >
              <Image
                src={img.image_url}
                alt={img.alt_text || 'Kah Global uniform'}
                fill
                className="object-cover"
                sizes="256px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-marquee {
          animation: marquee 30s linear infinite;
        }
        .gallery-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
