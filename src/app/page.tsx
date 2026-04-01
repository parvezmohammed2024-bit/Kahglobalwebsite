import AOSInit from '@/components/AOSInit';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <>
      {/* AOS animation initializer — client only, no visible output */}
      <AOSInit />

      {/* Sticky navigation */}
      <Navbar />

      {/* Main content — all SSR rendered for Google indexing */}
      <main>
        <Hero />
        <About />
        <Products />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />
    </>
  );
}
