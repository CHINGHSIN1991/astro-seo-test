import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 內容依語系分資料夾：`<collection>/zh/<slug>.md` 與 `<collection>/en/<slug>.md`。
 * entry id 會是 `zh/<slug>`、`en/<slug>`，由 i18n 的 pairEntries() 依前綴配對。
 *
 * 注意：glob loader 預設只要 frontmatter 有 `slug` 就拿它當 id，會讓 CMS 寫入的
 * `slug: foo` 把 zh/en 兩個條目都變成 id `foo`，失去語系前綴而配對失敗。
 * 這裡一律以檔案路徑（去掉副檔名）產生 id，忽略 frontmatter 的 slug。
 */
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.[^./]+$/, '');

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates', generateId: idFromPath }),
  schema: z.object({
    /** CMS 用來決定檔名的欄位，頁面不使用 */
    slug: z.string().optional(),
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['product', 'company', 'event']),
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/changelog', generateId: idFromPath }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    date: z.coerce.date(),
    intro: z.string(),
  }),
});

export const collections = { updates, changelog };
