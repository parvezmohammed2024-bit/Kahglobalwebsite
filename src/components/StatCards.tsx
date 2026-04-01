'use client';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const stats = [
  { end: 10, suffix: '+', label: 'Years Experience', sublabel: 'Crafting uniforms since 2014' },
  { end: 500, suffix: '+', label: 'Clients Served', sublabel: 'Across Malaysia' },
  { end: 10000, suffix: '+', label: 'Uniforms Delivered', sublabel: 'And counting' },
];

function StatCard({
  end,
  suffix,
  label,
  sublabel,
  delay,
}: (typeof stats)[0] & { delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div
      ref={ref}
      data-aos="fade-up"
      data-aos-delay={delay}
      className="bg-navy rounded-2xl p-8 text-center shadow-xl border border-white/5"
    >
      <div className="text-4xl sm:text-5xl font-extrabold text-gold mb-2 tabular-nums">
        {inView ? (
          <CountUp end={end} suffix={suffix} duration={2.5} separator="," />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <div className="text-white font-bold text-lg">{label}</div>
      <div className="text-gray-400 text-sm mt-1">{sublabel}</div>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} delay={i * 100} />
      ))}
    </div>
  );
}
