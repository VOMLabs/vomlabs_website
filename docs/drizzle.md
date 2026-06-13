# Drizzle Schema

## `posts` Table

```sql
CREATE TABLE posts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  content    TEXT NOT NULL,
  excerpt    TEXT,
  author     TEXT NOT NULL DEFAULT 'VOMLabs',
  published  BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Migration Commands

| Command | Purpose |
|---------|---------|
| `npm run db:generate` | Generate SQL migration files from schema |
| `npm run db:push` | Push schema directly to database (dev only) |
| `npm run db:studio` | Launch Drizzle Studio GUI |
| `npm run db:migrate` | Run `src/db/migrate.ts` to import `blogs.json` into Postgres |

## Files

- `src/db/schema.ts` — Table definition (Drizzle ORM schema)
- `src/db/index.ts` — Client init from `DATABASE_URL`
- `src/db/migrate.ts` — JSON-to-DB bulk import script
- `drizzle.config.ts` — Drizzle Kit configuration

All `db:*` commands require `DATABASE_URL` to be set.
