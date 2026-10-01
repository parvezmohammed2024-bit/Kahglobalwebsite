import { testimonials } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCard } from '@/components/cards/TestimonialCard';

export function Testimonials() {
  return (
    <section className="container-page section-y">
      <SectionHeading
        eyebrow="Customer reviews"
        title="What our customers say"
        description="Feedback from companies, F&B outlets and schools we have supplied."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </section>
  );
}
