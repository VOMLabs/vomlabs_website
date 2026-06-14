# Editor Choice

## TipTap with HTML Output

The blog editor uses [TipTap](https://tiptap.dev/) (`@tiptap/react`) with the Starter Kit and Markdown extensions.

**Why TipTap:**
- Rich text editing with markdown shortcuts (`#` for heading, `**bold**`, etc.)
- Extensible via extensions (placeholder, markdown)
- Good React integration with `useEditor`

**Why HTML storage instead of Markdown:**
- The public blog renders with `dangerouslySetInnerHTML` (sanitized)
- HTML is more portable for rich formatting (lists, links, code blocks)
- The `@tiptap/markdown` extension adds markdown keyboard shortcuts but stores content as HTML/JSON

## Styling

Editor styles are in `globals.css` under the `.tiptap` class. The `prose` class from Tailwind Typography is used on the public blog renderer, not on the editor itself.

## Components

- `src/components/admin/tiptap-editor.tsx` — The editor wrapper (toolbar + editor instance)
- Output is sent as `content` (HTML string) to the API
