# Icon System

Blog author icons are per-author, not per-post.

## Design

- `src/data/authors.json` maps author names to icon names:
  ```json
  { "VOMLabs": "brand-discord" }
  ```
- `src/lib/blogs/icons.tsx` defines 15 icon options with names, labels, and colors
- `src/lib/blogs/authors.ts` provides read/write helpers for the JSON mapping

## How Icons Flow

1. Server-side: `getAllPosts()` / `getPostBySlug()` call `getAllAuthorIcons()` to get the full mapping
2. Each post is resolved to a `BlogPostData.authorIcon` string field
3. Client components (`BlogList`, `BlogPost`) call `getBlogIcon(post.authorIcon)` to get the `component` + `color`
4. The icon is rendered inline next to the post title

## Admin UI

`/admin/authors` page lists all known authors (from blog posts) and lets admins pick an icon per author using the `BlogIconPicker` component.

## Icons List

| Name | Label | Color |
|------|-------|-------|
| `brand-discord` | Discord | `#5865F2` |
| `speakerphone` | Announcement | `#f59e0b` |
| `star` | Featured | `#eab308` |
| `news` | News | `#3b82f6` |
| `tools` | Update | `#8b5cf6` |
| `code` | Development | `#06b6d4` |
| `rocket` | Launch | `#10b981` |
| `bulb` | Idea | `#f59e0b` |
| `heart` | Community | `#ef4444` |
| `flag` | Milestone | `#22c55e` |
| `sparkles` | New | `#ec4899` |
| `bell` | Notification | `#f97316` |
| `book` | Guide | `#6366f1` |
| `brand-github` | GitHub | `#6b7280` |
| `file-description` | Post | `#a855f7` |
