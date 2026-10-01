import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { company, contact, SITE_URL, social } from '@/data/site';
import { CORE_KEYWORDS } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { JsonLd } from '@/components/ui/JsonLd';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const defaultTitle = 'Uniform Supplier Malaysia | Corporate Uniform Kuala Lumpur | Kah Global';
const defaultDescription =
  'Kah Global Sdn Bhd — uniform supplier in Cheras, Kuala Lumpur since 2014. Ready-made & custom-made corporate uniforms (baju korporat), polo shirts and t-shirts with embroidery, silkscreen, sublimation & DTF printing.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: '%s | Kah Global Sdn Bhd' },
  description: defaultDescription,
  keywords: CORE_KEYWORDS,
  applicationName: company.name,
  authors: [{ name: company.name }],
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: SITE_URL,
    siteName: company.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: company.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b2545',
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ClothingStore'],
  '@id': `${SITE_URL}/#business`,
  name: company.name,
  legalName: `${company.name} (${company.registration})`,
  description: company.description,
  foundingDate: String(company.foundedYear),
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-full.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: contact.office.tel,
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    postalCode: contact.address.postcode,
    addressCountry: contact.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: contact.geo.lat, longitude: contact.geo.lng },
  hasMap: contact.mapUrl,
  openingHours: contact.openingHoursSchema,
  areaServed: { '@type': 'Country', name: 'Malaysia' },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: `+${contact.whatsapp.number}`,
      contactType: 'sales',
      availableLanguage: ['English', 'Malay'],
    },
    {
      '@type': 'ContactPoint',
      telephone: contact.office.tel,
      contactType: 'customer service',
      availableLanguage: ['English', 'Malay'],
    },
  ],
  knowsAbout: [
    'Corporate uniforms',
    'Ready-made uniforms',
    'Custom-made uniforms',
    'Embroidery',
    'Silkscreen printing',
    'Dye-sublimation printing',
    'DTF printing',
  ],
  sameAs: Object.values(social).filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-control bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <JsonLd data={localBusiness} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
