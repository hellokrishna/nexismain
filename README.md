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

## Desk + Supabase (Vercel)

Vercel’s filesystem is read-only, so `/admin/clients` cannot write `data/` or `public/` there. Connect a free Supabase project for the database and file storage.

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL** → New query, paste `supabase/schema.sql`, and run it. That creates `clients`, `reviews`, `posts`, `messages`, and a public `desk-media` storage bucket (gym logos/photos under `clients/`, blog covers and article images under `blog/`, review photos under `reviews/`).
3. Open **Project Settings → API**. Copy the **Project URL** and the **service_role** key (keep that key secret; only the Next.js server uses it).
4. Locally, put them in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-long-password
```

5. On Vercel → Project → **Settings → Environment Variables**, add the same three values for Production (and Preview if you use it). Redeploy.
6. Open the live `/admin`, sign in, and add gyms, blogs, or reviews. Text rows go in the database; covers and photos upload to `desk-media` and show on the marketing site.

Without Supabase, you can still add clients on your computer at `http://localhost:3001/admin/clients`, then commit `data/clients.json` and files under `public/clients/` and push.

## Laravel later

Leave `LARAVEL_API_URL` empty until the API exists. When it is set, the site reads JSON from:

- `GET /api/features`
- `GET /api/packages`
- `GET /api/reviews`
- `GET /api/posts`
- `GET /api/faqs`

Each route can return an array or `{ "data": [...] }`. Blog bodies are structured blocks (`p`, `h2`, `ul`), not HTML. The contact form posts JSON to `POST /api/inquiries`. Set `LARAVEL_API_TOKEN` if those routes need a bearer token.

Until that API is connected, the contact form opens an email to the address in `content/site.ts`.
