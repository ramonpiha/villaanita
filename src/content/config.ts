import { defineCollection, z } from 'astro:content';

const propertiesSchema = z.array(z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  summary: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  images: z.array(z.string()),
}));

const pagesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
});

const createCollections = (langs: string[]) => {
  const collections: Record<string, ReturnType<typeof defineCollection>> = {};

  langs.forEach(lang => {
    // Flat naming: 'de-pages' instead of 'de/pages'
    collections[`${lang}-pages`] = defineCollection({
      type: 'content',
      schema: pagesSchema,
    });

    collections[`${lang}-properties`] = defineCollection({
      type: 'data',
      schema: propertiesSchema,
    });
  });

  return collections;
};

export const collections = createCollections(['de', 'en', 'it']);