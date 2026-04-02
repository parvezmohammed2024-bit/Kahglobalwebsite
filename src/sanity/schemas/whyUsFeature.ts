import { defineType, defineField } from 'sanity';

export const whyUsFeature = defineType({
  name: 'whyUsFeature',
  title: 'Why Choose Us — Feature',
  type: 'document',
  icon: () => '✅',
  fields: [
    defineField({ name: 'number',      title: 'Display Number (e.g. 01)', type: 'string' }),
    defineField({ name: 'title',       title: 'Feature Title',            type: 'string' }),
    defineField({ name: 'description', title: 'Description',              type: 'text', rows: 3 }),
    defineField({
      name: 'order', title: 'Display Order', type: 'number',
      description: 'Lower number = shown first',
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'number' },
    prepare: ({ title, subtitle }) => ({ title: title ?? 'Untitled', subtitle: `#${subtitle}` }),
  },
});
