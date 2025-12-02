import { defineCollection, z } from 'astro:content';

const propertiesSchema = z.array(z.object({
  id: z.string(),
  type: z.array(z.string()),
  title: z.string(),
  summary: z.string(),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
  image: z.string(),
}));

const pagesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
});

const propertyContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  generalInfo: z.string(),
  ambient: z.string(),
  highlights: z.array(z.string()),
});

const createCollections = (langs: string[]) => {
  const collections: Record<string, ReturnType<typeof defineCollection>> = {};

  langs.forEach(lang => {
    collections[`${lang}-pages`] = defineCollection({
      type: 'content',
      schema: pagesSchema,
    });

    collections[`${lang}-properties`] = defineCollection({
      type: 'data',
      schema: propertiesSchema,
    });

    collections[`${lang}-property-content`] = defineCollection({
      type: 'content',
      schema: propertyContentSchema,
    });
  });

  return collections;
};

export const collections = createCollections(['de', 'en', 'it']);