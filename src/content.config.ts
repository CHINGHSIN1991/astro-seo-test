import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['產品', '公司', '活動']),
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/changelog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    intro: z.string(),
  }),
});

export const collections = { updates, changelog };
