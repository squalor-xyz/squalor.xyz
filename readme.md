# squalor.xyz

Marketing site for **Squalor LLC** (solo technical contracting): software, automation, data systems, and RF/test specialization.

**Live:** [https://squalor.xyz](https://squalor.xyz)

**Experiments (separate site):** [https://space.squalor.xyz](https://space.squalor.xyz) — repo [squalor-xyz/space](https://github.com/squalor-xyz/space)

## Layout

| Path | Role |
|------|------|
| `docs/` | GitHub Pages site root (HTML, CSS, JS, assets) |
| `docs/CNAME` | Custom domain `squalor.xyz` |
| `media/` | Source screenshots and other media (not all are published) |
| `.github/workflows/pages.yml` | Deploy `docs/` to GitHub Pages |

### Public pages

- `index.html` — home
- `services.html` — offerings
- `projects.html` — public OSS
- `contact.html` — email / channels

WebGL space demos are **not** part of this repo; they live on `space.squalor.xyz`.

## Local preview

```bash
python3 -m http.server -d docs 8080
# open http://localhost:8080/
```

## Deploy (GitHub Pages)

Optional workflow: `.github/workflows/pages.yml` deploys the `docs/` folder via **GitHub Actions**.

1. Merge to `main` (workflow runs on push), **or** use classic Pages: branch `main` / folder `/docs`.
2. If using the workflow: **Settings → Pages → Source: GitHub Actions** (one-time).
3. Custom domain: `docs/CNAME` should remain `squalor.xyz`; enable HTTPS in Pages settings.

## Contact

- Email: contact@squalor.xyz
- GitHub: [github.com/squalor-xyz](https://github.com/squalor-xyz)
