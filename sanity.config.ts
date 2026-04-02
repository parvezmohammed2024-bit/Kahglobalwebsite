import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Kah Global Content Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'qob3wr6a',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('🏢 Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('👔 Products / Uniform Types')
              .child(S.documentTypeList('product').title('Products')),
            S.listItem()
              .title('⭐ Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.listItem()
              .title('✅ Why Choose Us')
              .child(S.documentTypeList('whyUsFeature').title('Features')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
