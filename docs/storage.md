# Storage Design

Blog posts are stored in a hybrid JSON / PostgreSQL system.

## Storage Layers

- **Primary (dev):** `src/data/blogs.json` — a JSON array of post objects
- **Primary (prod):** PostgreSQL via Drizzle ORM, when `DATABASE_URL` is set

## Switching Logic

All CRUD functions in `src/lib/blogs/index.ts` check `hasDb()` (`!!process.env.DATABASE_URL`):

- If `DATABASE_URL` is set → use Drizzle queries against the `posts` table
- If not → read/write `src/data/blogs.json` via `fs`

This makes the site work without a database during development and fall back gracefully if the DB is unreachable.

## JSON Format

Each post in `blogs.json`:

```json
{
  "slug": "join-our-discord",
  "title": "Join our Discord now!",
  "date": "2026-04-12",
  "author": "ItzzMateo",
  "excerpt": "Connect with the VOMLabs community...",
  "content": "<h2>Why Join?</h2><p>..."
}
```

## Migration

`src/db/migrate.ts` reads the JSON array and bulk-inserts rows into PostgreSQL, skipping existing slugs.
Run with `npm run db:migrate`.
