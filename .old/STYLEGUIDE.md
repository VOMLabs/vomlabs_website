<div align="center">

# Vesper Website — Code & Style Guide

[![Discord](https://img.shields.io/discord/1200726878757085194?label=Discord&logo=discord)](https://dc.devflare.de)
[![GitHub](https://img.shields.io/github/stars/IMDevFlare/vesper-website)](https://github.com/IMDevFlare/vesper-website)

This style guide defines best practices and conventions for contributing to the Vesper Website project.

</div>

> **Launcher Repository:** [ArexLabs/vesper-client](https://github.com/ArexLabs/vesper-client)

---

## Table of Contents

1. [General Principles](#1-general-principles)
2. [File & Folder Organization](#2-file--folder-organization)
3. [Naming Conventions](#3-naming-conventions)
4. [HTML Guidelines](#4-html-guidelines)
5. [CSS/TailwindCSS Guidelines](#5-csstailwindcss-guidelines)
6. [JavaScript/TypeScript Guidelines](#6javascripttypescript-guidelines)
7. [Git & Commit Messages](#7-git--commit-messages)
8. [Documentation](#8-documentation)

---

## 1. General Principles

- Use **Bun** as the package manager (not npm, pnpm, or yarn)
- Prioritize readability and simplicity
- Use clear, descriptive names for variables, functions, and files
- Write self-documenting code where possible
- Remove unused code instead of commenting it out
- Ensure code is linted and passes all automated checks before committing

---

## 2. File & Folder Organization

- Group related files into feature-oriented or functional directories
- Use `kebab-case` for folder and file names
- Keep assets (images, fonts, etc.) in the `/public` folder

---

## 3. Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables & functions | `camelCase` | `launchVesper()` |
| React components & classes | `PascalCase` | `VesperButton` |
| Constants | `SCREAMING_SNAKE_CASE` | `API_BASE_URL` |
| File names | `kebab-case` | `user-profile.ts` |

---

## 4. HTML Guidelines

- Write semantic HTML5 where possible (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Use alt text for all images
- Minimize unnecessary nesting
- Use Next.js `Link` component instead of `<a>` tags

---

## 5. CSS/TailwindCSS Guidelines

### Tailwind CSS

- Use utility classes to compose styles directly in JSX/HTML
- Prefer semantic and grouped Tailwind classes (e.g., `px-4 py-2 text-brand-accent`)
- Use the official TailwindCSS color palette or custom theme via `globals.css`
- Use responsive and state-based classes (`sm:`, `md:`, `hover:`, `focus:`)

### Custom CSS

- Use `@apply` in SCSS for reusable styles
- Use BEM naming (`.block__element--modifier`)
- Place all reusable values in variables
- Avoid `!important` unless absolutely necessary

> **Note:** Use shadcn/ui components (e.g., Button) for consistency and accessibility.

```tsx
import { Button } from "@/components/ui/button";

<Button className="px-4 py-2 text-sm font-mono">
  Launch Vesper
</Button>
```

---

## 6. JavaScript/TypeScript Guidelines

- Prefer modern ES6+ features (arrow functions, destructuring)
- Write all new code in TypeScript
- Strictly type all function inputs and outputs
- Avoid `any` type unless absolutely necessary
- Use async/await for asynchronous operations
- Run Prettier and ESLint before PR submission

---

## 7. Git & Commit Messages

- Use feature branches: `feature/`, `fix/`, `chore/`
- Follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat: add user login component`
  - `fix: resolve authentication bug`
  - `chore: update dependencies`
- Rebase and resolve conflicts before submitting PRs

---

## 8. Documentation

- Include JSDoc/TSDoc comments for components, utilities, and services
- Update README sections when adding features

---

<div align="center">

[**launcher.devflare.de**](https://launcher.devflare.de) · [**GitHub**](https://github.com/IMDevFlare/vesper-website) · [**Discord**](https://dc.devflare.de)

</div>
