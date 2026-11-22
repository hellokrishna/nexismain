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

## Laravel later

Leave `LARAVEL_API_URL` empty until the API exists. When it is set, the site reads JSON from:

- `GET /api/features`
- `GET /api/packages`
- `GET /api/reviews`
- `GET /api/posts`
- `GET /api/faqs`

Each route can return an array or `{ "data": [...] }`. Blog bodies are structured blocks (`p`, `h2`, `ul`), not HTML. The contact form posts JSON to `POST /api/inquiries`. Set `LARAVEL_API_TOKEN` if those routes need a bearer token.

Until that API is connected, the contact form opens an email to the address in `content/site.ts`.
