#!/usr/bin/env node
/**
 * SEO 檢查：對 `astro build` 的輸出（dist/）做靜態驗證，任何一項不符就以非 0 結束。
 * 由 package.json 的 `postbuild` 自動執行，也可手動 `npm run check:seo`。
 *
 * 檢查項目：
 * - 每個 HTML 頁面：<html lang>、唯一的 <title> 與 meta description、唯一的 <h1>
 * - canonical：絕對網址、等於該頁的部署網址（含 base 與結尾斜線）、指向實際存在的頁面
 * - hreflang：含自身（與 <html lang> 一致）與 x-default、網址存在、兩頁互相對應
 * - og:title / og:description / og:url（og:url 必須等於 canonical）
 * - JSON-LD 可解析，且含 @context 與 @type
 * - <main> 內有實際文字內容（搜尋引擎不需執行 JavaScript 就能讀到）
 * - sitemap-index.xml → 子 sitemap → 所有 <loc> 與 xhtml:link 都指向存在的頁面；
 *   所有可索引頁面都在 sitemap 裡，noindex 頁面（如 404）不在
 * - robots.txt 存在、未封鎖整站、Sitemap: 指向存在的 sitemap
 * - <head> 的 <link rel="sitemap"> 指向存在的檔案
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'node-html-parser';

const root = process.cwd();
const dist = path.join(root, 'dist');

/** 正文最少字數（去掉標籤後），低於此值視為「空殼頁」 */
const MIN_MAIN_TEXT = 100;
/** 超過建議長度只提示，不視為錯誤 */
const MAX_TITLE = 70;
const MAX_DESCRIPTION = 160;

// ---------- 設定：從 astro.config.mjs 讀 site 與 base，確保與實際部署一致 ----------
const { default: config } = await import(pathToFileURL(path.join(root, 'astro.config.mjs')).href);
if (!config.site) fail('astro.config.mjs 缺少 `site`，canonical / sitemap 無法產生絕對網址');
const origin = new URL(config.site).origin;
const base = (config.base ?? '/').replace(/\/+$/, '');
/** 部署根網址，含 base 與結尾斜線，例如 https://example.com/astro-seo-test/ */
const siteRoot = `${origin}${base}/`;

// ---------- 工具 ----------
const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);
function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

const rel = (file) => path.relative(root, file);

async function walk(dir) {
  const out = [];
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const isAbsoluteHttp = (s) => /^https?:\/\//.test(s);

/** dist 內的 HTML 檔 → 部署後的絕對網址（index.html → 目錄結尾斜線） */
function fileToUrl(file) {
  const p = path.relative(dist, file).split(path.sep).join('/');
  if (p === 'index.html') return siteRoot;
  if (p.endsWith('/index.html')) return `${siteRoot}${p.slice(0, -'index.html'.length)}`;
  return `${siteRoot}${p}`;
}

/** 絕對網址 → dist 內的檔案路徑；不屬於本站或檔案不存在回傳 null */
function urlToFile(href) {
  let u;
  try {
    u = new URL(href);
  } catch {
    return null;
  }
  const clean = `${u.origin}${u.pathname}`;
  if (clean !== siteRoot.slice(0, -1) && !clean.startsWith(siteRoot)) return null;
  let p = clean === siteRoot.slice(0, -1) ? '' : clean.slice(siteRoot.length);
  p = decodeURIComponent(p);
  const candidates = p === '' || p.endsWith('/') ? [`${p}index.html`] : [p, `${p}.html`, `${p}/index.html`];
  for (const c of candidates) {
    const f = path.join(dist, c);
    if (existsSync(f)) return f;
  }
  return null;
}

const attr = (el, name) => el?.getAttribute(name)?.trim() ?? '';

// ---------- 1. 掃描所有 HTML 頁面 ----------
if (!existsSync(dist)) fail('找不到 dist/，請先執行 `astro build`');
const htmlFiles = (await walk(dist)).filter((f) => f.endsWith('.html')).sort();
if (htmlFiles.length === 0) fail('dist/ 內沒有任何 HTML 頁面');

/** @type {Map<string, { file: string; name: string; lang: string; alternates: Map<string, string>; noindex: boolean }>} 以網址為 key */
const pages = new Map();

for (const file of htmlFiles) {
  const name = rel(file);
  const html = await readFile(file, 'utf8');
  const doc = parse(html, { blockTextElements: { script: true, style: true, noscript: true } });
  const url = fileToUrl(file);
  const lang = attr(doc.querySelector('html'), 'lang');
  const robots = attr(doc.querySelector('meta[name="robots"]'), 'content').toLowerCase();
  const noindex = /\bnoindex\b/.test(robots);
  const page = { file, name, lang, alternates: new Map(), noindex };
  pages.set(url, page);

  if (!lang) err(name, '<html> 缺少 lang 屬性');

  // 404 等 noindex 頁面：只要求標題與 lang，其餘索引相關檢查略過
  if (noindex) {
    if (!doc.querySelector('title')?.text.trim()) err(name, 'noindex 頁面仍需有 <title>');
    continue;
  }

  // title / description
  const titles = doc.querySelectorAll('title');
  const title = titles[0]?.text.trim() ?? '';
  if (titles.length !== 1) err(name, `應有且僅有一個 <title>，實際 ${titles.length} 個`);
  if (!title) err(name, '<title> 為空');
  else if (title.length > MAX_TITLE) warn(name, `<title> 長度 ${title.length} 超過 ${MAX_TITLE} 字`);

  const descs = doc.querySelectorAll('meta[name="description"]');
  const desc = attr(descs[0], 'content');
  if (descs.length !== 1) err(name, `應有且僅有一個 meta description，實際 ${descs.length} 個`);
  if (!desc) err(name, 'meta description 為空');
  else if (desc.length > MAX_DESCRIPTION) warn(name, `meta description 長度 ${desc.length} 超過 ${MAX_DESCRIPTION} 字`);

  // h1
  const h1s = doc.querySelectorAll('h1');
  if (h1s.length !== 1) err(name, `應有且僅有一個 <h1>，實際 ${h1s.length} 個`);
  else if (!h1s[0].text.trim()) err(name, '<h1> 為空');

  // canonical
  const canonicals = doc.querySelectorAll('link[rel="canonical"]');
  const canonical = attr(canonicals[0], 'href');
  if (canonicals.length !== 1) err(name, `應有且僅有一個 canonical，實際 ${canonicals.length} 個`);
  if (!canonical) err(name, '缺少 canonical');
  else if (!isAbsoluteHttp(canonical)) err(name, `canonical 必須是絕對網址：${canonical}`);
  else if (canonical !== url) err(name, `canonical 與部署網址不符：${canonical} ≠ ${url}`);
  else if (!urlToFile(canonical)) err(name, `canonical 指向不存在的頁面：${canonical}`);

  // hreflang
  const alts = doc.querySelectorAll('link[rel="alternate"][hreflang]');
  if (alts.length === 0) err(name, '缺少 hreflang（<link rel="alternate" hreflang>）');
  const seen = new Set();
  let hasSelf = false;
  let hasDefault = false;
  for (const a of alts) {
    const hl = attr(a, 'hreflang');
    const href = attr(a, 'href');
    if (seen.has(hl)) err(name, `hreflang="${hl}" 重複`);
    seen.add(hl);
    if (hl !== 'x-default' && !/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/i.test(hl)) err(name, `hreflang 值不合法：${hl}`);
    if (!isAbsoluteHttp(href)) {
      err(name, `hreflang="${hl}" 的 href 必須是絕對網址：${href}`);
      continue;
    }
    if (!urlToFile(href)) err(name, `hreflang="${hl}" 指向不存在的頁面：${href}`);
    if (hl === 'x-default') hasDefault = true;
    else {
      page.alternates.set(hl, href);
      if (href === url) {
        hasSelf = true;
        if (hl.toLowerCase() !== lang.toLowerCase()) err(name, `自身 hreflang="${hl}" 與 <html lang="${lang}"> 不一致`);
      }
    }
  }
  if (alts.length > 0 && !hasSelf) err(name, 'hreflang 缺少指向自身的項目');
  if (alts.length > 0 && !hasDefault) err(name, 'hreflang 缺少 x-default');

  // Open Graph
  const og = (p) => attr(doc.querySelector(`meta[property="og:${p}"]`), 'content');
  for (const p of ['title', 'description', 'url']) if (!og(p)) err(name, `缺少 og:${p}`);
  if (og('url') && canonical && og('url') !== canonical) err(name, `og:url 與 canonical 不符：${og('url')}`);

  // JSON-LD
  const lds = doc.querySelectorAll('script[type="application/ld+json"]');
  if (lds.length === 0) warn(name, '沒有 JSON-LD 結構化資料');
  for (const s of lds) {
    let data;
    try {
      data = JSON.parse(s.text);
    } catch (e) {
      err(name, `JSON-LD 無法解析：${e.message}`);
      continue;
    }
    if (!data['@context']) err(name, 'JSON-LD 缺少 @context');
    const nodes = Array.isArray(data['@graph']) ? data['@graph'] : [data];
    for (const n of nodes) if (!n['@type']) err(name, 'JSON-LD 節點缺少 @type');
  }

  // 正文內容：去掉 script/style 後 <main> 內的純文字
  const main = doc.querySelector('main');
  if (!main) err(name, '缺少 <main>');
  else {
    main.querySelectorAll('script, style, noscript, template').forEach((n) => n.remove());
    const text = main.text.replace(/\s+/g, ' ').trim();
    if (text.length < MIN_MAIN_TEXT) err(name, `<main> 純文字僅 ${text.length} 字（至少 ${MIN_MAIN_TEXT}），內容可能依賴 JavaScript 才會出現`);
  }

  // <link rel="sitemap">
  const sitemapLink = attr(doc.querySelector('link[rel="sitemap"]'), 'href');
  if (sitemapLink) {
    const abs = isAbsoluteHttp(sitemapLink) ? sitemapLink : new URL(sitemapLink, siteRoot).href;
    if (!urlToFile(abs)) err(name, `<link rel="sitemap"> 指向不存在的檔案：${sitemapLink}`);
  }
}

// hreflang 必須雙向：A 列出 B，則 B 也要列出 A
for (const [url, page] of pages) {
  for (const [hl, href] of page.alternates) {
    if (href === url) continue;
    const other = pages.get(href);
    if (!other) continue; // 不存在已在上面報錯
    if (![...other.alternates.values()].includes(url)) err(page.name, `hreflang="${hl}" 指向 ${href}，但該頁未反向列出本頁`);
  }
}

// ---------- 2. sitemap ----------
const locsOf = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
const sitemapUrls = new Set();
const indexFile = path.join(dist, 'sitemap-index.xml');
if (!existsSync(indexFile)) err('dist/sitemap-index.xml', '不存在（@astrojs/sitemap 是否已啟用？）');
else {
  const children = locsOf(await readFile(indexFile, 'utf8'));
  if (children.length === 0) err('dist/sitemap-index.xml', '沒有任何子 sitemap');
  for (const loc of children) {
    const f = urlToFile(loc);
    if (!f) {
      err('dist/sitemap-index.xml', `指向不存在的 sitemap：${loc}`);
      continue;
    }
    const xml = await readFile(f, 'utf8');
    const name = rel(f);
    for (const url of locsOf(xml)) {
      sitemapUrls.add(url);
      if (!urlToFile(url)) err(name, `<loc> 指向不存在的頁面：${url}`);
      else if (!pages.has(url)) err(name, `<loc> 網址形式與頁面部署網址不一致（應含結尾斜線）：${url}`);
      else if (pages.get(url).noindex) err(name, `noindex 頁面不應列在 sitemap：${url}`);
    }
    for (const m of xml.matchAll(/<xhtml:link\b([^>]*)\/?>/g)) {
      const href = /href="([^"]+)"/.exec(m[1])?.[1];
      if (href && !urlToFile(href)) err(name, `xhtml:link 指向不存在的頁面：${href}`);
    }
  }
  for (const [url, page] of pages) {
    if (!page.noindex && !sitemapUrls.has(url)) err(page.name, `可索引頁面未列在 sitemap：${url}`);
  }
}

// ---------- 3. robots.txt ----------
const robotsFile = path.join(dist, 'robots.txt');
if (!existsSync(robotsFile)) err('dist/robots.txt', '不存在');
else {
  const lines = (await readFile(robotsFile, 'utf8'))
    .split(/\r?\n/)
    .map((l) => l.replace(/#.*/, '').trim())
    .filter(Boolean);
  const sitemaps = lines.filter((l) => /^sitemap:/i.test(l)).map((l) => l.replace(/^sitemap:\s*/i, ''));
  if (sitemaps.length === 0) err('dist/robots.txt', '缺少 Sitemap: 指令');
  for (const s of sitemaps) {
    if (!isAbsoluteHttp(s)) err('dist/robots.txt', `Sitemap 必須是絕對網址：${s}`);
    else if (!urlToFile(s)) err('dist/robots.txt', `Sitemap 指向不存在的檔案：${s}`);
  }
  // User-agent: * 區塊內不可 Disallow 整站
  let agentAll = false;
  for (const l of lines) {
    if (/^user-agent:/i.test(l)) agentAll = /^user-agent:\s*\*$/i.test(l);
    else if (agentAll && /^disallow:\s*\/\s*$/i.test(l)) err('dist/robots.txt', '`User-agent: *` 底下 `Disallow: /` 會封鎖整站');
  }
}

// ---------- 結果 ----------
const indexable = [...pages.values()].filter((p) => !p.noindex).length;
for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);
console.log(`\nSEO 檢查：${pages.size} 個頁面（可索引 ${indexable}）、sitemap ${sitemapUrls.size} 筆、${errors.length} 個錯誤、${warnings.length} 個提示`);
if (errors.length > 0) {
  console.error('✖ SEO 檢查未通過');
  process.exit(1);
}
console.log('✓ SEO 檢查通過');
