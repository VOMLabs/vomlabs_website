# Deployment

The site deploys to a self-hosted Dokploy instance with PostgreSQL.

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string
- `ADMIN_KEYS` — Comma-separated SHA-256 hashed admin tokens

## Dokploy Setup

1. Add `DATABASE_URL` and `ADMIN_KEYS` in the Dokploy environment settings
2. Run `npm run db:push` to apply schema (or `db:generate` + manual migration)
3. Run `npm run db:migrate` to import existing JSON data into Postgres

## Build

Standard `next build` — all blog data is fetched at runtime from the database (no static export dependency on the JSON file in production).
