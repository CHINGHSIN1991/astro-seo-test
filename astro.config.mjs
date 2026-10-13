// @ts-check
import { defineConfig } from 'astro/config';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';

const base = '/astro-seo-test';

/**
 * 只在 dev server 提供 Sveltia CMS 的 /admin/ 頁面（檔案在 cms/），
 * 不放 public/ 是為了避免被 build 進 GitHub Pages。
 * @returns {import('vite').Plugin}
 */
function cmsAdmin() {
  const dir = path.resolve('cms');
  const files = {
    '': { file: 'index.html', type: 'text/html; charset=utf-8' },
    'index.html': { file: 'index.html', type: 'text/html; charset=utf-8' },
    'config.yml': { file: 'config.yml', type: 'text/yaml; charset=utf-8' },
  };
  return {
    name: 'cms-admin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Astro 的 base middleware 已把 base 前綴去掉，這裡兩種形式都接受
        let pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
        if (pathname.startsWith(`${base}/`)) pathname = pathname.slice(base.length);
        if (pathname === '/admin') {
          res.writeHead(302, { Location: `${base}/admin/` });
          return res.end();
        }
        if (!pathname.startsWith('/admin/')) return next();
        const entry = files[pathname.slice('/admin/'.length)];
        if (!entry) return next();
        res.setHeader('Content-Type', entry.type);
        res.setHeader('Cache-Control', 'no-store');
        res.end(await readFile(path.join(dir, entry.file)));
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://chinghsin1991.github.io',
  base,
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss(), cmsAdmin()],
  },
});
