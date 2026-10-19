# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`

There is no linter, formatter, or test suite configured.

## Stack

Vite 6 + React 19 (JSX, no TypeScript), React Router 7, Tailwind CSS 3 (via PostCSS), framer-motion. The site content and UI copy are in Brazilian Portuguese (`lang="pt-BR"`); keep new copy and code comments in Portuguese.

## Architecture

- **Content is data-driven from `src/data/content.js`.** It exports `site`, `books`, `games`, `characters`, `news`, `reviews`, `progress`, `faq`. Pages and sections import from it and render whatever is there — adding/editing a book, character, or news item is normally a data change, not a component change.
- Relationships are by id: `characters[].bookIds` / `gameIds` and `games[].bookId` reference `books[].id`; `BookPage` filters characters by the current book.
- Feature flags live in the data: `book.available` + `book.buyLink` gate the buy button; `book.prologue.available` gates the "read prologue" CTA and `/livros/:slug/ler`. Optional sections are skipped when their field is `null`/empty (e.g. `emotional: null`, `reasons: []`).
- **Routing** (`src/App.jsx`, `BrowserRouter`): `/` → `Home`, `/livros/:slug` → `BookPage`, `/livros/:slug/ler` → `ReadPage`. Books are looked up by `slug`. `ScrollToTop` resets scroll on route change; `Navbar`/`Footer` wrap every route.
- `Home` composes sections from `src/components/home/`; `BookPage` defines most of its sub-sections inline in the same file.
- **Prologue reader**: `ReadPage` embeds a PDF from `public/prologues/` in an iframe. `pdfUrl` values contain spaces and non-ASCII characters, so they are always passed through `encodeURI()`.
- **News media**: `news[]` items accept optional `image` or `video` (+ `mediaAlt`); videos autoplay muted unless the visitor prefers reduced motion.
- **Assets**: images live under `public/images/` and are referenced by absolute paths (`/images/...`) from `content.js`; filenames contain spaces. Render them through `asset()` (`src/utils/asset.js`), which prepends the Vite `base` (`/saintcatstudios/` for GitHub Pages) and URL-encodes.

## Styling

Tailwind theme (`tailwind.config.js`) defines the palette used everywhere: `dark-950…500` backgrounds, `gold` (primary accent), `ice` (The Storm Fall accent), and fonts `font-cinzel` (headings/labels) and `font-body` (Inter). Per-book accents come from `book.accentColor` in the data. Custom utilities (`.text-gradient-gold`, `.border-shine`, `.prose-reader`) and Google Fonts import are in `src/index.css`.
