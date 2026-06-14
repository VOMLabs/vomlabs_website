<div align="center">

# VOMLabs Website

Official website for VOMLabs — built with Next.js.

[![Website](https://img.shields.io/badge/Website-launcher.devflare.de-blue?style=flat&logo=google-chrome)](https://launcher.devflare.de)
[![Discord](https://img.shields.io/discord/1441770650602831902?label=Discord&logo=discord)](https://dc.devflare.de)
[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE.md)

</div>

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Components | shadcn/ui (Radix UI, Base UI) |
| Animations | Framer Motion |
| Content | MDX (blog & FAQ) |
| Icons | Tabler, Heroicons, Lucide, react-icons |
| Analytics | Vercel Analytics, Sentry |

---

## Development

```bash
# Install dependencies
bun install

# Start dev server with HMR
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Lint
bun run lint
```

The app runs on **http://localhost:3000**.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Description |
|----------|-------------|
| `ADMIN_KEYS` | Comma-separated admin keys (SHA-256 hashed for session cookies) |
| `NEXT_PUBLIC_DISCORD_GUILD_ID` | Discord server ID for the stats widget |

---

## Docker

```bash
# Start all services (Traefik + app)
docker compose up -d

# Rebuild the app after code changes
docker compose up -d --build app

# View logs
docker compose logs -f

# Stop everything
docker compose down
```

The app is served on **port 443 (HTTPS)** via Traefik. Set `TRAEFIK_DOMAIN` in `.env` to your domain for automatic Let's Encrypt certificates.

### Traefik dashboard

Available at `https://traefik.<your-domain>`, protected by basic auth. Set `TRAEFIK_DASHBOARD_USERS` in `.env` with an `htpasswd`-generated string:

```bash
htpasswd -nb admin your-password
```

---

## Project Structure

```
src/
├── app/            # App Router pages & API routes
│   ├── layout.tsx  # Root layout
│   ├── page.tsx    # Home page
│   ├── api/admin/  # Admin auth API routes
│   ├── blog/       # Blog pages
│   ├── (admin)/    # Admin dashboard
│   ├── (docs)/     # About, FAQ, roadmap, support
│   └── (legal)/    # Privacy, terms, ToS
├── components/     # React components
│   ├── ui/         # shadcn/ui primitives
│   ├── sections/   # Page sections
│   └── admin/      # Admin components
└── lib/            # Utilities & content
    ├── blogs/      # Blog MDX content
    └── faq/        # FAQ MDX content
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

GPL-3.0 — see [LICENSE.md](LICENSE.md).
