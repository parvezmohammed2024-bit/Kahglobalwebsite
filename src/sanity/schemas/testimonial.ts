import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '⭐',
  fields: [
    defineField({ name: 'quote',   title: 'Quote',   type: 'text', rows: 4 }),
    defineField({ name: 'name',    title: 'Client Name',  type: 'string' }),
    defineField({ name: 'jobTitle',title: 'Job Title',    type: 'string' }),
    defineField({ name: 'company', title: 'Company',      type: 'string' }),
    defineField({
      name: 'avatar', title: 'Avatar Photo (optional)',
      type: 'image', options: { hotspot: true },
    }),
    defineField({
      name: 'order', title: 'Display Order', type: 'number',
      description: 'Lower number = shown first',
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'avatar' },
    prepare: ({ title, subtitle, media }) => ({ title: title ?? 'Unnamed', subtitle, media }),
  },
});
