import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.kahglobal.com.my";

export const metadata: Metadata = {
  title: "Kah Global Uniform Sdn Bhd | Premium Uniforms Malaysia",
  description:
    "Kah Global Uniform Sdn Bhd — Malaysia's trusted uniform manufacturer in Cheras, Selangor. Corporate, school, hotel & industrial uniforms. 10+ years experience.",
  keywords: [
    "uniform malaysia",
    "corporate uniform",
    "sekolah uniform",
    "hotel uniform",
    "cheras selangor",
    "uniform manufacturer malaysia",
    "industrial uniform",
    "school uniform malaysia",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Kah Global Uniform Sdn Bhd",
    title: "Kah Global Uniform Sdn Bhd | Premium Uniforms Malaysia",
    description:
      "Malaysia's trusted uniform manufacturer in Cheras, Selangor. Corporate, school, hotel & industrial uniforms. 10+ years experience.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kah Global Uniform Sdn Bhd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kah Global Uniform Sdn Bhd | Premium Uniforms Malaysia",
    description:
      "Malaysia's trusted uniform manufacturer in Cheras, Selangor. Corporate, school, hotel & industrial uniforms. 10+ years experience.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A1F44',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ClothingStore"],
  name: "Kah Global Uniform Sdn Bhd",
  legalName: "Kah Global Sdn Bhd (1084190-X)",
  description:
    "Malaysia's trusted uniform manufacturer specialising in corporate, school, hotel and industrial uniforms. Based in Cheras, Wilayah Persekutuan Kuala Lumpur.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  telephone: "+601123305012",
  email: "info@kahglobal.com.my",
  priceRange: "$$",
  openingHours: ["Mo-Fr 08:00-17:00"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jalan Bunga Melur 3, Taman Suria Jaya",
    addressLocality: "Cheras",
    addressRegion: "Wilayah Persekutuan Kuala Lumpur",
    postalCode: "56000",
    addressCountry: "MY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 3.0838,
    longitude: 101.7285,
  },
  hasMap: "https://maps.google.com/?q=Taman+Suria+Jaya+Cheras+Kuala+Lumpur",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+601123305012",
    contactType: "customer service",
    availableLanguage: ["English", "Malay"],
    contactOption: "TollFree",
  },
  areaServed: {
    "@type": "Country",
    name: "Malaysia",
  },
  knowsAbout: [
    "Corporate Uniforms",
    "School Uniforms",
    "Hotel Uniforms",
    "Industrial Safety Wear",
    "Custom Embroidery",
    "Uniform Manufacturing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
