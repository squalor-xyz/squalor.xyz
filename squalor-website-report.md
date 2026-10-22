# Squalor LLC website notes

Short overview of the static site served at [squalor.xyz](https://squalor.xyz).

## Stack

- Plain HTML, CSS, and JavaScript in `docs/`
- GitHub Pages (Actions workflow deploys `docs/`, or classic branch `/docs`)
- Custom domain: `squalor.xyz` (`docs/CNAME`)

## Pages

| Page | Purpose |
|------|---------|
| Home (`index.html`) | Positioning, fit, principal blurb (Jon Robbins), optional canvas game |
| Services (`services.html`) | Core offerings and engagement model |
| Projects (`projects.html`) | Public OSS (sss, slicer, quire, adjudicate, ork, larder, DataBall, squalify, Obfuscator, Noterizer, Consecutor, Space, pitfight, Daystar; sss is not public yet) |
| Contact (`contact.html`) | Prefill mailto, SLA, LinkedIn/GitHub/X |

## Related (separate site)

Black-hole WebGL experiments are published from [squalor-xyz/space](https://github.com/squalor-xyz/space) at **[space.squalor.xyz](https://space.squalor.xyz)**. They are not nested under this marketing deploy.

## Shared assets

- `style.css` — layout and theme
- `logo.svg` — SL seal, the site mark (branding `generated/logos/squalor/seal/vector/seal-sl-monogram.svg`)
- `favicon.ico` (16/32/48), `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-192/512.png`, `site.webmanifest` — from branding `generated/logos/squalor/web/vector/exports/`; the favicons use a seal redrawn for 16 px
- `game.js` — home-page runner (only loaded on home)
- `assets/og-default.png` — Open Graph card (seal + teal stencil SQUALOR + SQUALOR.XYZ on charcoal); source `og-default.svg` (branding `web/vector/og-image.svg`)
- `assets/wordmark-distressed-teal.svg` — merch callout wordmark (branding `wordmark/vector/`)
- `robots.txt`, `sitemap.xml` — crawl helpers

## Positioning (content)

Squalor LLC is a small technical contracting company: custom software, workflow automation, measurement data pipelines, RF test/instrument control, and architecture support for underserved engineering teams. Public open-source work and a local DBA (Squalor Farms) are secondary to the core services business.
