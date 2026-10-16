import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { company, contact, SITE_URL, social } from '@/data/site';
import { CORE_KEYWORDS } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const defaultTitle = 'Uniform Manufacturer Malaysia | School, Hotel & Corporate Uniforms | Kah Global';
const defaultDescription =
  'Kah Global Sdn Bhd — uniform manufacturer in Cheras, Kuala Lumpur since 2014. School, hotel, restaurant and corporate uniforms, sublimation t-shirts, Baju Melayu, Baju Kurung and Malay traditional wear, with embroidery and printing.';

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
    'School uniforms',
    'Hotel uniforms',
    'Restaurant uniforms',
    'Baju Melayu',
    'Baju Kurung',
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
    // suppressHydrationWarning: the update-bar script may add data-update-bar before hydration
    <html lang="en-MY" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={localBusiness} />
        {children}
      </body>
    </html>
  );
}
