import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production';

// Only create a real client if the projectId looks valid (a-z, 0-9, dashes only)
const isConfigured = /^[a-z0-9-]+$/.test(projectId);

export const sanityClient = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn:    process.env.NODE_ENV === 'production',
      token:     process.env.SANITY_API_TOKEN,
    })
  : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = isConfigured && sanityClient ? createImageUrlBuilder(sanityClient) : null;

/** Get an optimised image URL from a Sanity image reference */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder?.image(source);
}
