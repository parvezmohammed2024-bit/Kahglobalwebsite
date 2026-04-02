'use client';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { about } from '@/config/site.config';

function StatCard({
  end, suffix, label, sublabel, delay,
}: { end: number; suffix: string; label: string; sublabel: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div
      ref={ref}
      data-aos="fade-up"
      data-aos-delay={delay}
      className="bg-navy rounded-2xl p-8 text-center shadow-xl border border-white/5"
    >
      <div className="text-4xl sm:text-5xl font-extrabold text-gold mb-2 tabular-nums">
        {inView
          ? <CountUp end={end} suffix={suffix} duration={2.5} separator="," />
          : <span>0{suffix}</span>}
      </div>
      <div className="text-white font-bold text-lg">{label}</div>
      <div className="text-gray-400 text-sm mt-1">{sublabel}</div>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
      {about.stats.map((stat, i) => (
        <StatCard key={i} {...stat} delay={i * 100} />
      ))}
    </div>
  );
}
