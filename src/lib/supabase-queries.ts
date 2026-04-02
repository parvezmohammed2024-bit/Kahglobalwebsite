import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (no caching — always fresh)
function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'https://placeholder.supabase.co') return null;
  return createClient(url, key);
}

/** Fetch hero + site settings merged into the shape Hero/Footer components expect */
export async function getSupabaseSettings() {
  const client = getClient();
  if (!client) return null;

  const [{ data: hero }, { data: settings }] = await Promise.all([
    client.from('hero_settings').select('*').limit(1).single(),
    client.from('site_settings').select('key, value'),
  ]);

  if (!hero && !settings?.length) return null;

  const map: Record<string, string> = {};
  for (const row of settings ?? []) map[row.key] = row.value ?? '';

  return {
    heroEyebrow:        hero?.eyebrow        ?? undefined,
    heroHeadline:       hero?.headline       ?? undefined,
    heroHeadlineAccent: hero?.headline_accent ?? undefined,
    heroSubheadline:    hero?.subheadline    ?? undefined,
    heroImageUrl:       hero?.hero_image_url  ?? undefined,
    heroImageAlt:       hero?.hero_image_alt  ?? undefined,
    heroVideoUrl:       hero?.hero_video_url   ?? undefined,
    catCorporateUrl:    hero?.cat_corporate_url  ?? undefined,
    catSchoolUrl:       hero?.cat_school_url     ?? undefined,
    catHotelUrl:        hero?.cat_hotel_url      ?? undefined,
    catIndustrialUrl:   hero?.cat_industrial_url ?? undefined,
    logo_url:     map.logo_url      || undefined,
    phone:        map.phone         || undefined,
    email:        map.email         || undefined,
    address:      map.address       || undefined,
    tagline:      map.tagline       || undefined,
    companyName:  map.company_name  || undefined,
    instagram:    map.instagram     || undefined,
    facebook:     map.facebook      || undefined,
    mapEmbedUrl:  map.map_embed_url || undefined,
  };
}

/** Fetch about section settings */
export async function getSupabaseAboutSettings() {
  const client = getClient();
  if (!client) return null;
  const { data } = await client.from('about_settings').select('*').limit(1).single();
  if (!data) return null;
  return {
    aboutHeading:    data.about_heading     || undefined,
    aboutIntro:      data.about_intro       || undefined,
    aboutStory1:     data.about_story1      || undefined,
    aboutStory2:     data.about_story2      || undefined,
    aboutFactoryUrl: data.about_factory_url || undefined,
    aboutFactoryAlt: data.about_factory_alt || undefined,
    aboutHighlights: data.about_highlights
      ? (data.about_highlights as string).split('\n').filter(Boolean)
      : undefined,
  };
}

/** Fetch gallery images */
export async function getSupabaseGallery() {
  const client = getClient();
  if (!client) return null;
  const { data } = await client.from('gallery_images').select('*').order('display_order', { ascending: true });
  if (!data?.length) return null;
  return data.map((g) => ({ id: g.id, image_url: g.image_url, alt_text: g.alt_text ?? '' }));
}

/** Fetch products — returns same shape as Sanity getProducts() */
export async function getSupabaseProducts() {
  const client = getClient();
  if (!client) return null;

  const { data } = await client
    .from('products')
    .select('*')
    .order('display_order', { ascending: true });

  if (!data?.length) return null;

  return data.map((p) => ({
    _id:         p.id,
    title:       p.title,
    description: p.description ?? '',
    gradient:    p.gradient ?? 'from-[#0A1F44] via-[#0d2855] to-[#1a3a6e]',
    imageUrl:    p.image_url ?? null,
    imageAlt:    p.image_alt ?? p.title,
  }));
}

/** Fetch testimonials — returns same shape as Sanity getTestimonials() */
export async function getSupabaseTestimonials() {
  const client = getClient();
  if (!client) return null;

  const { data } = await client
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });

  if (!data?.length) return null;

  return data.map((t) => ({
    _id:       t.id,
    quote:     t.quote,
    name:      t.name,
    jobTitle:  t.job_title ?? '',
    company:   t.company ?? '',
    avatarUrl: t.avatar_url ?? null,
  }));
}

/** Fetch Why Us features — returns same shape as Sanity getWhyUsFeatures() */
export async function getSupabaseWhyUsFeatures() {
  const client = getClient();
  if (!client) return null;

  const { data } = await client
    .from('why_us_features')
    .select('*')
    .order('display_order', { ascending: true });

  if (!data?.length) return null;

  return data.map((f) => ({
    _id:         f.id,
    number:      f.number ?? '01',
    title:       f.title,
    description: f.description ?? '',
  }));
}
