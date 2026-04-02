import { sanityClient } from './client';

// force-dynamic: use no-store so Studio changes reflect immediately
const opts = { cache: 'no-store' as const };

/** Fetch global site settings (company, contact, hero, about) */
export async function getSiteSettings() {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      companyName, regNumber, tagline, description,
      phone, whatsapp, email, address, hours, mapUrl,
      instagram, facebook,
      heroEyebrow, heroHeadline, heroHeadlineAccent, heroSubheadline,
      "heroImageUrl": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      aboutHeading, aboutIntro, aboutStory1, aboutStory2,
      aboutHighlights,
      "aboutFactoryUrl": aboutFactory.asset->url,
      "aboutFactoryAlt": aboutFactory.alt,
      "ogImageUrl": ogImage.asset->url
    }`,
    {},
    opts
  );
}

/** Fetch all products ordered by display order */
export async function getProducts() {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "product"] | order(order asc) {
      _id, title, description, gradient,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`,
    {},
    opts
  );
}

/** Fetch all testimonials ordered by display order */
export async function getTestimonials() {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "testimonial"] | order(order asc) {
      _id, quote, name, jobTitle, company,
      "avatarUrl": avatar.asset->url
    }`,
    {},
    opts
  );
}

/** Fetch Why Choose Us features ordered by display order */
export async function getWhyUsFeatures() {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "whyUsFeature"] | order(order asc) {
      _id, number, title, description
    }`,
    {},
    opts
  );
}
