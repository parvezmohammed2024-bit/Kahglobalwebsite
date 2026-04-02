import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: () => '👔',
  fields: [
    defineField({ name: 'title',       title: 'Title',       type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'image', title: 'Product Image',
      type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'gradient',
      title: 'Card Gradient (Tailwind classes)',
      type: 'string',
      description: 'e.g. from-[#0A1F44] via-[#0d2855] to-[#1a3a6e]',
      initialValue: 'from-[#0A1F44] via-[#0d2855] to-[#1a3a6e]',
    }),
    defineField({
      name: 'order', title: 'Display Order', type: 'number',
      description: 'Lower number = shown first',
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare: ({ title, media }) => ({ title: title ?? 'Untitled Product', media }),
  },
});
