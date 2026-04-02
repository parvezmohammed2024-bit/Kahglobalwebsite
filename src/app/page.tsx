export const dynamic = 'force-dynamic';

import AOSInit from '@/components/AOSInit';
import Gallery from '@/components/Gallery';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  getSiteSettings,
  getProducts,
  getTestimonials,
  getWhyUsFeatures,
} from '@/sanity/queries';
import {
  getSupabaseSettings,
  getSupabaseAboutSettings,
  getSupabaseProducts,
  getSupabaseTestimonials,
  getSupabaseWhyUsFeatures,
  getSupabaseGallery,
} from '@/lib/supabase-queries';

export default async function Home() {
  // Fetch Sanity + Supabase data in parallel
  const [
    sanitySettings, sanityProducts, sanityTestimonials, sanityFeatures,
    supabaseSettings, supabaseAbout, supabaseProducts, supabaseTestimonials, supabaseFeatures, galleryImages,
  ] = await Promise.all([
    getSiteSettings().catch(() => null),
    getProducts().catch(() => null),
    getTestimonials().catch(() => null),
    getWhyUsFeatures().catch(() => null),
    getSupabaseSettings().catch(() => null),
    getSupabaseAboutSettings().catch(() => null),
    getSupabaseProducts().catch(() => null),
    getSupabaseTestimonials().catch(() => null),
    getSupabaseWhyUsFeatures().catch(() => null),
    getSupabaseGallery().catch(() => null),
  ]);

  // Supabase takes priority over Sanity (admin panel edits win)
  // Merge about settings into the main settings object
  const settings = { ...(supabaseSettings ?? sanitySettings ?? {}), ...(supabaseAbout ?? {}) };
  const products = supabaseProducts ?? sanityProducts;
  const testimonials = supabaseTestimonials ?? sanityTestimonials;
  const features = supabaseFeatures ?? sanityFeatures;

  return (
    <>
      <AOSInit />
      <Navbar
        logoUrl={settings?.logo_url || settings?.logoUrl || undefined}
        companyName={settings?.companyName || 'Kah Global'}
      />

      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Products sanityProducts={products} />
        <WhyUs sanityFeatures={features} />
        <Testimonials sanityTestimonials={testimonials} />
        <Gallery images={galleryImages} />
        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />
      <WhatsAppButton />
    </>
  );
}
