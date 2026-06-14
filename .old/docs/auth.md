# Auth Flow

Admin routes are protected by token-based authentication.

## Mechanism

1. Login form sends credentials to `/api/admin/login`
2. Server validates against `ADMIN_KEYS` env var (comma-separated list of hashed tokens)
3. On success, an `admin_token` cookie is set
4. Admin API routes check `isAuthenticated()` by reading the cookie and calling `isValidToken()`

## Environment Variables

```
ADMIN_KEYS=hash1,hash2,hash3
```

Tokens are hashed with `crypto.createHash("sha256")` and compared against the stored hashes.

## Protected Routes

- `POST /api/admin/blogs` — Create post
- `PUT /api/admin/blogs/[slug]` — Update post
- `DELETE /api/admin/blogs/[slug]` — Delete post
- `PUT /api/admin/authors` — Update author icons

## Public Routes

- `GET /api/admin/blogs` — List all posts (no auth required)
- `GET /api/admin/blogs/[slug]` — Get single post (no auth required)
- `GET /api/admin/authors` — List author icons (no auth required)
