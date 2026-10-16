import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="container-page flex flex-col items-center gap-5 py-24 text-center">
          <p className="text-label font-semibold uppercase text-orange-ink">Error 404</p>
          <h1 className="font-display text-headline-lg-mobile font-bold text-navy md:text-headline-lg">Page not found</h1>
          <p className="max-w-md text-muted">The page you are looking for has moved or does not exist.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/products" variant="outline">
              View our products
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
