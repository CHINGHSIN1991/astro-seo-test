import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 保留檔名作為 id（含 `.en` 後綴），例如 partner-visit.en.md → partner-visit.en */
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates', generateId }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/changelog', generateId }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    intro: z.string(),
  }),
});

export const collections = { updates, changelog };
