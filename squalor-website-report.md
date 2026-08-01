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
| Projects (`projects.html`) | Public OSS (Noterizer, DataBall, Consecutor, Obfuscator) |
| Contact (`contact.html`) | Prefill mailto, SLA, LinkedIn/GitHub/X |

## Related (separate site)

Black-hole WebGL experiments are published from [squalor-xyz/space](https://github.com/squalor-xyz/space) at **[space.squalor.xyz](https://space.squalor.xyz)**. They are not nested under this marketing deploy.

## Shared assets

- `style.css` — layout and theme
- `logo.svg` / `favicon.svg` — brand mark
- `game.js` — home-page runner (only loaded on home)
- `assets/og-default.png` — Open Graph image
- `robots.txt`, `sitemap.xml` — crawl helpers

## Positioning (content)

Squalor LLC is a small technical contracting company: custom software, workflow automation, measurement data pipelines, RF test/instrument control, and architecture support for underserved engineering teams. Public open-source work and a local DBA (Squalor Farms) are secondary to the core services business.
