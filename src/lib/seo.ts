import type { Metadata } from 'next';
import { company, SITE_URL } from '@/data/site';

/** Core search phrases the site targets. Pages add their own specific terms. */
export const CORE_KEYWORDS = [
  'uniform supplier Malaysia',
  'corporate uniform Kuala Lumpur',
  'baju korporat',
  'custom t-shirt printing Cheras',
  'uniform Cheras',
  'baju uniform syarikat',
];

type PageSeo = {
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical URL */
  path: string;
  keywords?: string[];
  image?: { url: string; alt: string };
  /** Skip the "| Kah Global Sdn Bhd" title suffix (e.g. home page) */
  absoluteTitle?: boolean;
};

const DEFAULT_IMAGE = { url: '/og-image.jpg', alt: `${company.name} — uniform supplier in Cheras, Kuala Lumpur` };

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_IMAGE,
  absoluteTitle = false,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords, ...CORE_KEYWORDS],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_MY',
      url,
      siteName: company.name,
      title,
      description,
      images: [{ url: image.url, width: 1200, height: 630, alt: image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
