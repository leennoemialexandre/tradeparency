# Leen-Noemi Alexandre — portfolio

A playful, product-led portfolio: each project lets visitors **try** the work, **discover** the decisions behind it, and **read** the full case study.

Built with Next.js (App Router) and TypeScript, using plain CSS. There's no backend, no accounts, and no paid or third-party APIs; every page is statically generated.

## Run it locally

```bash
cd portfolio
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + type check
npm run start      # serve the production build
```

## Where things live

| Path | What it holds |
|---|---|
| `content/site.ts` | Name, email, links, optional résumé PDF path |
| `content/projects.ts` | The project index: titles, summaries, filters, homepage featured flags |
| `content/stories/*.ts` | Long-form case studies and decision stories, as structured blocks (paragraphs, tables, callouts, figures) |
| `content/about.ts` | Experience, education, toolkit |
| `components/demos/` | Interactive experiences: TAFIA walkthrough, Concentration 64, Jobaholic sandbox, Pinterest model, hospital explorer, small demos |
| `components/` | Shared presentation: project shell, story renderer, decision stickers, nav |
| `app/` | Routes and styles (`globals.css` design system, `demos.css`) |
| `public/` | Images, the Concentration 64 word lists, the hospital analysis PDF |
| `CONTENT_TODO.md` | Private list of unresolved facts and missing assets (not served) |

To edit copy, change the files in `content/`; the layout updates automatically. Inline `**bold**`, `*italic*`, and `` `code` `` work inside story text.

## Deploy to Vercel

1. Push this repository to GitHub. You can also move the `portfolio/` folder into its own repository and use that as the root.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set **Root Directory** to `portfolio` (skip this if it's the repository root). Vercel detects Next.js; leave the build command (`next build`) and output settings at their defaults.
4. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your final URL (for example `https://leennoemi.com`). It's used for social previews and the sitemap.
5. Deploy. To use a custom domain, add it under **Settings → Domains**.

No other environment variables or services are needed.
