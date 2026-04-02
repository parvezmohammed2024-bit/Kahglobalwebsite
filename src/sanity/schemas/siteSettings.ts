import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '🏢',
  fields: [
    // ── Company ──────────────────────────
    defineField({ name: 'companyName',   title: 'Company Name',   type: 'string' }),
    defineField({ name: 'regNumber',     title: 'Reg. Number',    type: 'string' }),
    defineField({ name: 'tagline',       title: 'Tagline',        type: 'string' }),
    defineField({ name: 'description',   title: 'Description',    type: 'text', rows: 2 }),

    // ── Contact ───────────────────────────
    defineField({ name: 'phone',    title: 'Phone',    type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (no + or spaces, e.g. 601123305012)', type: 'string' }),
    defineField({ name: 'email',    title: 'Email',    type: 'string' }),
    defineField({ name: 'address',  title: 'Full Address', type: 'text', rows: 2 }),
    defineField({ name: 'hours',    title: 'Business Hours', type: 'string' }),
    defineField({ name: 'mapUrl',   title: 'Google Maps URL', type: 'url' }),

    // ── Social ────────────────────────────
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebook',  title: 'Facebook URL',  type: 'url' }),

    // ── Hero ──────────────────────────────
    defineField({ name: 'heroEyebrow',       title: 'Hero — Eyebrow Text',  type: 'string' }),
    defineField({ name: 'heroHeadline',      title: 'Hero — Headline',      type: 'string' }),
    defineField({ name: 'heroHeadlineAccent',title: 'Hero — Headline Accent (gold text)', type: 'string' }),
    defineField({ name: 'heroSubheadline',   title: 'Hero — Subheadline',   type: 'text', rows: 3 }),

    // ── Hero Image ────────────────────────
    defineField({
      name: 'heroImage', title: 'Hero — Background Image',
      type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      description: 'Optional full background image for the hero section',
    }),

    // ── About ─────────────────────────────
    defineField({ name: 'aboutHeading',  title: 'About — Heading',   type: 'string' }),
    defineField({ name: 'aboutIntro',    title: 'About — Intro paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'aboutStory1',   title: 'About — Story paragraph 1', type: 'text', rows: 3 }),
    defineField({ name: 'aboutStory2',   title: 'About — Story paragraph 2', type: 'text', rows: 3 }),
    defineField({
      name: 'aboutHighlights', title: 'About — Bullet Points',
      type: 'array', of: [{ type: 'string' }],
    }),
    defineField({
      name: 'aboutFactory', title: 'About — Factory / Office Photo',
      type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),

    // ── Logo / OG image ───────────────────
    defineField({
      name: 'ogImage', title: 'Social Share Image (OG Image, 1200×630)',
      type: 'image', options: { hotspot: true },
    }),
  ],

  preview: {
    select: { title: 'companyName' },
    prepare: ({ title }) => ({ title: title ?? 'Site Settings' }),
  },
});
