## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Checks

Before finishing any change to pages, layouts, content, `src/seo.ts`, `src/i18n.ts`, `public/robots.txt`, or `astro.config.mjs`, run:

```
npm run check   # astro check (types)
npm run build   # astro build + SEO checks (postbuild → scripts/check-seo.mjs, warnings only)
```

`scripts/check-seo.mjs` validates the built `dist/` (title, description, canonical, hreflang, Open Graph, JSON-LD, real `<main>` content, sitemap, robots.txt) and prints a `⚠` warning for each problem. It does not fail the build, so read the output and fix every warning your change introduced. CI (`.github/workflows/deploy.yml`) runs the same two commands on every push and PR; do not remove or weaken checks to silence warnings — fix the page instead.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
