/**
 * SEO 工具：絕對網址與 JSON-LD（schema.org）結構化資料。
 * - Organization 由 Base layout 在每一頁輸出
 * - Article 由文章頁（updates/[slug]）建立後交給 Base，與 Organization 合併成同一個 @graph，
 *   讓 author / publisher 能用 @id 參照同一個 Organization 節點
 */
import { site as info } from './data/site';
import { base, langTag, tr, type Lang } from './i18n';

/** schema.org 節點（JSON-LD 物件） */
export type JsonLdNode = Record<string, unknown>;

/**
 * 以 astro.config 的 `site` 為基準產生絕對網址，並統一加結尾斜線
 * （build.format 'directory' 的輸出網址形式），避免 dev 與 build 不一致
 */
export const absoluteUrl = (site: URL | undefined, path: string) => new URL(path.endsWith('/') ? path : `${path}/`, site).href;

/** 網站首頁（預設語系、含 base）的絕對網址，作為 Organization 的 url 與 @id 基準 */
export const homeUrl = (site: URL | undefined) => absoluteUrl(site, `${base}/`);

export const organizationId = (site: URL | undefined) => `${homeUrl(site)}#organization`;

const isHttpUrl = (s: string) => /^https?:\/\//.test(s);

/** Organization 節點；文字依語系切換，@id 跨語系固定以便參照 */
export function organizationSchema(site: URL | undefined, lang: Lang): JsonLdNode {
  const $ = tr(lang);
  const sameAs = [info.linkedinUrl].filter(isHttpUrl);
  return {
    '@type': 'Organization',
    '@id': organizationId(site),
    name: $('name'),
    legalName: info.company,
    url: homeUrl(site),
    logo: new URL(`${base}/favicon.svg`, site).href,
    description: $('meta.description'),
    email: info.email,
    telephone: info.phone,
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export interface ArticleInput {
  /** 文章頁的絕對網址（canonical） */
  url: string;
  title: string;
  description: string;
  datePublished: Date;
  dateModified?: Date;
  /** 站內相對路徑（不含 base），例如 /images/foo.png */
  image?: string;
  /** 分類顯示名稱 */
  section?: string;
}

/** Article 節點；author / publisher 以 @id 參照 Organization */
export function articleSchema(site: URL | undefined, lang: Lang, a: ArticleInput): JsonLdNode {
  const org = { '@id': organizationId(site) };
  return {
    '@type': 'Article',
    '@id': `${a.url}#article`,
    headline: a.title,
    description: a.description,
    url: a.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
    inLanguage: langTag(lang),
    datePublished: a.datePublished.toISOString(),
    ...(a.dateModified && { dateModified: a.dateModified.toISOString() }),
    ...(a.image && { image: [new URL(`${base}${a.image}`, site).href] }),
    ...(a.section && { articleSection: a.section }),
    author: org,
    publisher: org,
  };
}

/**
 * 序列化為可直接放進 <script type="application/ld+json"> 的字串。
 * 把 `<` 轉成 <，避免內容含 `</script>` 時提早關閉標籤（JSON 允許此跳脫）。
 */
export const jsonLdHtml = (nodes: JsonLdNode[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
