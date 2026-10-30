import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

const activitiesSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  guestnet: z.object({
    text: z.string(),
    link: z.string(),
  }),
  neighborhoodIntro: z.string(),
  activities: z.array(z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    phone: z.string().optional(),
    website: z.string().optional(),
    content: z.string(),
  })),
});

const checkInVideos = z.array(z.object({
  id: z.string(),
  address: z.string(),
  title: z.string(),
  plz: z.number(),
  city: z.string(),
}));

const solutionsSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  title: z.string(),
  size: z.string(),
  guests: z.string(),
  images: z.array(z.string()),
  location: z.string(),
  amenities: z.array(z.string()),
  highlights: z.array(z.string()),
});

export const collections = {
  'de-pages': defineCollection({
    loader: glob({ base: './src/content/de-pages', pattern: '**/*.md' }),
    schema: pagesSchema,
  }),
  'de-properties': defineCollection({
    loader: glob({ base: './src/content/de-properties', pattern: '**/*.{yaml,yml}' }),
    schema: propertiesSchema,
  }),
  'de-property-content': defineCollection({
    loader: glob({ base: './src/content/de-property-content', pattern: '**/*.md' }),
    schema: propertyContentSchema,
  }),
  'de-activities': defineCollection({
    loader: glob({ base: './src/content/de-activities', pattern: '**/*.md' }),
    schema: activitiesSchema,
  }),
  'de-check-in-videos': defineCollection({
    loader: glob({ base: './src/content/de-check-in-videos', pattern: '**/*.{yaml,yml}' }),
    schema: checkInVideos,
  }),
  'de-solutions': defineCollection({
    loader: glob({ base: './src/content/de-solutions', pattern: '**/*.md' }),
    schema: solutionsSchema,
  }),
  'en-pages': defineCollection({
    loader: glob({ base: './src/content/en-pages', pattern: '**/*.md' }),
    schema: pagesSchema,
  }),
  'en-properties': defineCollection({
    loader: glob({ base: './src/content/en-properties', pattern: '**/*.{yaml,yml}' }),
    schema: propertiesSchema,
  }),
  'en-property-content': defineCollection({
    loader: glob({ base: './src/content/en-property-content', pattern: '**/*.md' }),
    schema: propertyContentSchema,
  }),
  'en-activities': defineCollection({
    loader: glob({ base: './src/content/en-activities', pattern: '**/*.md' }),
    schema: activitiesSchema,
  }),
  'en-check-in-videos': defineCollection({
    loader: glob({ base: './src/content/en-check-in-videos', pattern: '**/*.{yaml,yml}' }),
    schema: checkInVideos,
  }),
  'en-solutions': defineCollection({
    loader: glob({ base: './src/content/en-solutions', pattern: '**/*.md' }),
    schema: solutionsSchema,
  }),
  'it-pages': defineCollection({
    loader: glob({ base: './src/content/it-pages', pattern: '**/*.md' }),
    schema: pagesSchema,
  }),
  'it-properties': defineCollection({
    loader: glob({ base: './src/content/it-properties', pattern: '**/*.{yaml,yml}' }),
    schema: propertiesSchema,
  }),
  'it-property-content': defineCollection({
    loader: glob({ base: './src/content/it-property-content', pattern: '**/*.md' }),
    schema: propertyContentSchema,
  }),
  'it-activities': defineCollection({
    loader: glob({ base: './src/content/it-activities', pattern: '**/*.md' }),
    schema: activitiesSchema,
  }),
  'it-check-in-videos': defineCollection({
    loader: glob({ base: './src/content/it-check-in-videos', pattern: '**/*.{yaml,yml}' }),
    schema: checkInVideos,
  }),
  'it-solutions': defineCollection({
    loader: glob({ base: './src/content/it-solutions', pattern: '**/*.md' }),
    schema: solutionsSchema,
  }),
};