# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (runs on http://localhost:1111)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured. There are no test commands.

## Architecture

**Next.js 16.2.1 App Router** with React 19, TypeScript strict mode, and Tailwind CSS v4. All routes are Server Components by default — add `'use client'` only when interactivity or browser APIs are required.

### Path alias

`@/*` maps to `src/*` — use it for all internal imports.

### Key directories

- `src/app/` — App Router pages and layout. `layout.tsx` wraps all pages with `SkipLink`, `Navbar`, and `Footer`.
- `src/components/` — UI split into `ui/` (primitives: Button, Card, SectionHeading, SkipLink) and `services/` (page-section components: ServiceHero, ServiceFeatures, ServiceCTA, RelatedServices).
- `src/data/` — All content lives here as typed constants, never in components. `services.ts` exports `getAllServices()`, `getServiceBySlug(slug)`, and `getRelatedServices(currentSlug, count)`. `solutions.ts` exports `SOLUTIONS`.
- `src/types/index.ts` — Shared interfaces: `Service`, `Solution`, `Pillar`, `Testimonial`, `ContactFormData`.
- `src/lib/cn.ts` — `cn()` utility (clsx + tailwind-merge). Import it for all conditional className construction.

### Routing

- `/` — Homepage (`src/app/page.tsx`): hero + services grid, fully static.
- `/services/[slug]` — Service detail pages (`src/app/services/[slug]/page.tsx`): statically generated from `getAllServices()` via `generateStaticParams`. `dynamicParams = false` so unknown slugs 404. Page params are async (`Promise<{ slug: string }>`).

### Design system

Defined entirely in `src/app/globals.css` via `@theme` (Tailwind v4 CSS-based config — no `tailwind.config.*` file):

- **Colors**: `void` (#070E1F) background, `primary` (#2563EB), `primary-sky` (#60A5FA), `primary-royal`, `primary-navy`, `accent`, `mint`, `violet`, `coral`
- **Fonts**: `font-heading` = Plus Jakarta Sans, `font-body` = DM Sans (both loaded via `next/font/google`)
- **Aesthetic**: dark-mode-only glassmorphism — `bg-white/5`, `border-white/10`, `backdrop-blur-md` layered over `bg-void`

### Accessibility

WCAG 2.1 AA is mandatory. All interactive elements need `focus-visible:ring-2 focus-visible:ring-blue-500` focus rings. Use semantic HTML (`<section aria-labelledby>`, `<ul role="list">`, etc.). The `SkipLink` component must remain in `RootLayout`.

### Adding a new service

1. Add a `Service` object to the `SERVICES` array in `src/data/services.ts` — the slug becomes the URL.
2. No new page file needed; `generateStaticParams` picks it up automatically.

### Component barrel exports

`src/components/services/index.ts` and `src/components/ui/index.ts` re-export all components in their respective directories — import from the barrel, not individual files.
