/**
 * Sanity Studio route — accessible at /studio
 * Only renders on the client; not included in sitemap or indexed by search engines.
 */
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
