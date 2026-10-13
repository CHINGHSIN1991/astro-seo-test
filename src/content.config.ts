import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 內容依語系分資料夾：`<collection>/zh/<slug>.md` 與 `<collection>/en/<slug>.md`。
 * entry id 會是 `zh/<slug>`、`en/<slug>`，由 i18n 的 pairEntries() 依前綴配對。
 */
const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['product', 'company', 'event']),
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
