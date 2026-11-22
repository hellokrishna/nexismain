# Nexis Fitness

Marketing site for Nexis Fitness. The home page is a single scrolling page (modules, packages, stories, FAQ, contact). Articles live at `/blog` so search engines have pages to index.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit the public content

| What | File |
| --- | --- |
| Name, email, navigation | `content/site.ts` |
| Product modules | `content/features.ts` |
| Packages and prices | `content/packages.ts` |
| Client quotes | `content/reviews.ts` |
| FAQ | `content/faqs.ts` |
| Blog posts | `content/posts.ts` |

Set `reviewsAreSamples` to `false` in `content/reviews.ts` after the sample quotes are replaced.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real domain before launch. Canonical links, Open Graph, and `sitemap.xml` use that value.

## Get listed on Google

1. Deploy the site on a real domain (for example `https://nexisfitness.com`).
2. Set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.
3. Open [Google Search Console](https://search.google.com/search-console), add the domain or URL prefix property.
4. Paste the HTML-tag verification code into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click Verify.
5. Submit `https://your-domain/sitemap.xml` under Sitemaps.
6. Use URL Inspection on the home page and a few blog posts, then request indexing.
7. Keep publishing blogs and client pages from `/admin`. Ranking at the top takes time, backlinks, and real searches — meta tags alone do not put a new site at #1 overnight.

## Laravel later

Leave `LARAVEL_API_URL` empty until the API exists. When it is set, the site reads JSON from:

- `GET /api/features`
- `GET /api/packages`
- `GET /api/reviews`
- `GET /api/posts`
- `GET /api/faqs`

Each route can return an array or `{ "data": [...] }`. Blog bodies are structured blocks (`p`, `h2`, `ul`), not HTML. The contact form posts JSON to `POST /api/inquiries`. Set `LARAVEL_API_TOKEN` if those routes need a bearer token.

Until that API is connected, the contact form opens an email to the address in `content/site.ts`.
