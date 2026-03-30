# Plan: Service Detail Pages & Final Testing

**Date:** 2026-03-29
**Author:** Planner (Opus)
**Status:** Draft — awaiting approval

---

## Goal

Create four service detail pages (Biz Setup, Bookkeeping, CPA, Legal) using a reusable dynamic route template, update the services data layer to reflect the new service offerings, wire up navigation, and complete the project with accessibility audit, Lighthouse performance audit, and a clean production build.

---

## Architecture Overview

### Current State

The project uses Next.js 16.2.1 with the App Router (`src/app/`). Existing infrastructure:

- **UI primitives:** `Button`, `Card`, `SectionHeading`, `SkipLink` in `src/components/ui/`
- **Layout components:** `Navbar` and `Footer` in `src/components/`
- **Data layer:** `src/data/solutions.ts` exports `SOLUTIONS` array, `getSolutionBySlug()`, `getActiveSolutions()`
- **Types:** `src/types/index.ts` defines `Solution`, `Pillar`, `Testimonial`, `ContactFormData`
- **Styling:** Tailwind CSS 4, glassmorphism pattern (`bg-white/5 backdrop-blur-md border-white/10`), dark background (`--background: #070E1F`)
- **Fonts:** Plus Jakarta Sans (headings), DM Sans (body)
- **Root layout:** `src/app/layout.tsx` — currently does NOT include Navbar/Footer (they exist as components but are not wired into layout)
- **Homepage:** `src/app/page.tsx` — still the default Next.js scaffold

### What This Plan Adds

```
src/
├── app/
│   ├── layout.tsx                          ← MODIFY: wire in Navbar + Footer
│   ├── page.tsx                            ← NO CHANGE (not in scope)
│   └── services/
│       └── [slug]/
│           └── page.tsx                    ← NEW: dynamic service detail page
├── components/
│   ├── services/
│   │   ├── ServiceHero.tsx                 ← NEW: hero banner for detail pages
│   │   ├── ServiceFeatures.tsx             ← NEW: feature list section
│   │   ├── ServiceCTA.tsx                  ← NEW: pricing/CTA card
│   │   └── RelatedServices.tsx             ← NEW: related services links
│   └── ...existing...
├── data/
│   └── services.ts                         ← NEW: replaces/augments solutions.ts
└── types/
    └── index.ts                            ← MODIFY: add Service interface
```

### Key Design Decisions

1. **New data file for services** — The existing `solutions.ts` contains enterprise IT solutions (ERP, CRM, BI, Cloud, AI). The four new services (Biz Setup, Bookkeeping, CPA, Legal) are a different product line. Create `src/data/services.ts` with a `Service` interface and data array, keeping `solutions.ts` intact. The dynamic route at `/services/[slug]` will read from the services data.
2. **Reusable section components** — The detail page is assembled from composable server components (`ServiceHero`, `ServiceFeatures`, `ServiceCTA`, `RelatedServices`) so each can be tested and styled independently.
3. **Static generation** — `generateStaticParams` returns all 4 slugs. `dynamicParams = false` returns 404 for invalid slugs.
4. **Next.js 16 params convention** — `params` is `Promise<{ slug: string }>` and must be awaited. Use `PageProps<'/services/[slug]'>` type helper where available.
5. **No test framework installed** — The project has no Jest/Vitest. Testing tasks focus on TypeScript compilation, ESLint, axe DevTools manual audit, Lighthouse CLI, and `npm run build`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.1 (App Router) |
| UI | React 19.2.4 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 + tw-animate-css |
| Animation | Framer Motion 12.38 |
| Icons | Lucide React 1.7.0 |
| Utilities | clsx + tailwind-merge (`cn()`) |
| A11y Audit | axe DevTools (browser extension) |
| Perf Audit | Lighthouse CLI (`npx lighthouse`) |

---

## Dependencies Between Tasks

```
Task 1 (Service data + types)
  ↓
Task 2 (Service detail page components)  ←  independent sub-components
  ↓
Task 3 (Dynamic route page.tsx + metadata + generateStaticParams)
  ↓
Task 4 (Root layout integration — Navbar + Footer)
  ↓
Task 5 (Navigation wiring — update Navbar links + Footer links)
  ↓
Task 6 (Accessibility audit)
  ↓
Task 7 (Lighthouse performance audit + final build)
```

**Parallelization:**
- Within Task 2, the four sub-components (`ServiceHero`, `ServiceFeatures`, `ServiceCTA`, `RelatedServices`) are independent and can be built in parallel.
- Task 4 could technically run in parallel with Task 2 since it only touches `layout.tsx`.

---

## Tasks

### Task 1: Service Data Layer and Type Definitions

**Estimated time:** 30 minutes
**Dependencies:** None

**Goal:** Define the `Service` interface and create the data file with all four services, each containing slug, name, description, features, and metadata.

**Files to modify:**
- `src/types/index.ts` — Add `Service` interface

**Files to create:**
- `src/data/services.ts` — Array of 4 `Service` objects + lookup helpers

**Service interface:**
```ts
export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;       // 200-300 words
  features: ServiceFeature[];  // 4-6 key points
  icon: string;               // Lucide icon name
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}
```

**Four services to define:**

1. **biz-setup** — "Biz Setup" — Business registration, formation, entity structure selection (LLC, S-Corp, C-Corp), EIN registration, state filings, operating agreements, registered agent services.
2. **bookkeeping** — "Bookkeeping" — Financial record-keeping, bank reconciliation, accounts payable/receivable, payroll processing, tax preparation, monthly financial statements, QuickBooks/Xero integration.
3. **cpa** — "CPA" — Certified public accountant services, tax strategy and planning, quarterly estimated taxes, annual tax filing, IRS representation, financial statement audits, compliance advisory.
4. **legal** — "Legal" — Corporate counsel, contract drafting and review, intellectual property protection (trademarks, copyrights), business licensing, regulatory compliance, partnership agreements, dispute resolution.

**Helpers to export:**
```ts
export function getServiceBySlug(slug: string): Service | undefined
export function getAllServices(): Service[]
export function getRelatedServices(currentSlug: string): Service[]
```

**Test command:** `npx tsc --noEmit`

**Acceptance criteria:**
- TypeScript compiles with zero errors
- All 4 services have complete data (no empty strings)
- Each description is 200-300 words
- Each service has 4-6 features with title and description
- `getServiceBySlug("cpa")` returns the CPA service object
- `getRelatedServices("cpa")` returns the other 3 services

---

### Task 2: Service Detail Page Components

**Estimated time:** 1.5 hours
**Dependencies:** Task 1

**Goal:** Build four reusable server components that compose the service detail page layout.

**Files to create:**

#### 2A: `src/components/services/ServiceHero.tsx`
- Server component (no `"use client"`)
- Props: `name: string`, `tagline: string`, `icon: string`
- Layout: Full-width section with dark gradient background, large `<h1>` with service name, tagline as subtitle, Lucide icon rendered at large size
- Styling: `bg-gradient-to-b from-primary-navy to-void`, padding `py-24 px-4`
- Heading: `font-heading text-4xl md:text-6xl font-bold text-white`
- Tagline: `text-xl md:text-2xl text-white/70 mt-4 max-w-2xl`
- Breadcrumb: "Home > Services > {name}" with real links
- Accessibility: `<h1>` is the service name, breadcrumb uses `<nav aria-label="Breadcrumb">`

#### 2B: `src/components/services/ServiceFeatures.tsx`
- Server component
- Props: `features: ServiceFeature[]`
- Layout: Section heading "What We Deliver", then 2-column grid of feature cards (stacks on mobile)
- Each feature card: glassmorphism Card with `<h3>` title and `<p>` description
- Icon: checkmark or relevant Lucide icon per feature
- Accessibility: Section uses `<section aria-labelledby="features-heading">`, heading has `id="features-heading"`

#### 2C: `src/components/services/ServiceCTA.tsx`
- Server component
- Props: `serviceName: string`, `ctaLabel: string`, `ctaHref: string`
- Layout: Centered section with gradient background, heading "Ready to get started with {serviceName}?", CTA Button (primary variant), secondary text "Schedule a free consultation"
- Styling: `bg-gradient-to-r from-blue-500/20 to-cyan-500/20`, glassmorphism card centered, `max-w-2xl mx-auto`
- Accessibility: CTA button uses `Button` component (already has focus styles)

#### 2D: `src/components/services/RelatedServices.tsx`
- Server component
- Props: `services: Service[]` (the related ones, excluding current)
- Layout: Section heading "Explore Our Other Services", 3-column card grid
- Each card: glassmorphism Card, service name as `<h3>`, tagline, link to `/services/{slug}`
- Links use `<a>` tags (not `next/link` — check Next.js 16 docs for preferred approach)
- Accessibility: Each card link has descriptive text, section uses proper heading hierarchy (`<h2>` for section, `<h3>` for cards)

**Files to create (barrel export):**
- `src/components/services/index.ts` — Re-exports all four components

**Test command:** `npx tsc --noEmit`

**Acceptance criteria:**
- All four components render without errors when given valid props
- Glassmorphism styling matches existing Card component pattern
- Responsive: features grid is 1-col on mobile, 2-col on md+
- All text is readable against dark background (white/light text)
- Heading hierarchy is sequential within each component
- No `"use client"` directive (all server components)

---

### Task 3: Dynamic Route — Service Detail Page

**Estimated time:** 45 minutes
**Dependencies:** Tasks 1, 2

**Goal:** Create the `/services/[slug]` dynamic route that composes the section components, generates static params for all 4 services, and produces per-page metadata.

**Files to create:**
- `src/app/services/[slug]/page.tsx`

**Implementation requirements:**

1. **`generateStaticParams()`** — Returns `[{ slug: "biz-setup" }, { slug: "bookkeeping" }, { slug: "cpa" }, { slug: "legal" }]` from the services data.

2. **`export const dynamicParams = false`** — Invalid slugs return 404.

3. **`generateMetadata()`** — Async function, awaits params, returns:
   ```ts
   {
     title: `${service.metaTitle} | GetBizii`,
     description: service.metaDescription,
     openGraph: {
       title: service.metaTitle,
       description: service.metaDescription,
       type: "website",
       url: `https://getbizii.com/services/${slug}`,
     },
   }
   ```

4. **Page component** — Async server component:
   ```ts
   export default async function ServicePage({
     params,
   }: {
     params: Promise<{ slug: string }>;
   }) {
     const { slug } = await params;
     const service = getServiceBySlug(slug);
     if (!service) notFound();
     const related = getRelatedServices(slug);
     // render ServiceHero, ServiceFeatures, ServiceCTA, RelatedServices
   }
   ```

5. **Page layout structure:**
   - `<ServiceHero />` — full width
   - `<article>` wrapper with `max-w-7xl mx-auto px-4`
     - Description section: `<section>` with `<h2>About This Service</h2>` + `<p>` with full description
     - `<ServiceFeatures />`
   - `<ServiceCTA />` — full width
   - `<RelatedServices />` — full width

6. **`notFound()` import** — from `next/navigation`

**Test commands:**
```bash
npx tsc --noEmit
npm run build    # verify 4 static pages generated
npm run dev      # navigate to /services/biz-setup, /services/cpa, etc.
```

**Acceptance criteria:**
- Build output shows 4 static pages under `/services/`
- `/services/biz-setup` renders with correct content
- `/services/invalid-slug` returns 404
- Page metadata is correct (inspect `<head>` in dev tools)
- Page is scrollable with logical content flow
- All sections render with consistent glassmorphism styling

---

### Task 4: Root Layout Integration

**Estimated time:** 15 minutes
**Dependencies:** None (can run in parallel with Tasks 1-3)

**Goal:** Wire the existing Navbar and Footer into the root layout so they appear on all pages including service detail pages.

**Files to modify:**
- `src/app/layout.tsx`

**Changes:**
- Import `Navbar` from `@/components/Navbar`
- Import `Footer` from `@/components/Footer`
- Import `SkipLink` from `@/components/ui`
- Add `<SkipLink />` before `<Navbar />`
- Wrap `{children}` in `<main id="main-content" className="flex-1">`
- Add `<Footer />` after `</main>`

**Resulting structure:**
```tsx
<html lang="en" className={...}>
  <body className="min-h-full flex flex-col">
    <SkipLink />
    <Navbar />
    <main id="main-content" className="flex-1">
      {children}
    </main>
    <Footer />
  </body>
</html>
```

**Test command:** `npm run dev` — verify Navbar and Footer appear on homepage and service pages.

**Acceptance criteria:**
- Navbar visible at top of every page
- Footer visible at bottom of every page
- Skip link works (Tab into page, first focusable element jumps to main content)
- No layout shift or overlap between nav and page content (add `pt-16` to main or first section to account for fixed nav)

---

### Task 5: Navigation Wiring

**Estimated time:** 30 minutes
**Dependencies:** Tasks 3, 4

**Goal:** Update Navbar and Footer links to include real routes to the service detail pages. Ensure all internal links work and there are no `#` placeholder hrefs.

**Files to modify:**
- `src/components/Navbar.tsx` — Update `navLinks` array:
  - Change `{ label: "Home", href: "#" }` to `{ label: "Home", href: "/" }`
  - Change `{ label: "Services", href: "#services" }` to include a dropdown or direct link to `/services/biz-setup` (or keep as anchor if homepage has a services section)
  - Add individual service links: Biz Setup, Bookkeeping, CPA, Legal
  - Ensure "Contact" links to `/#contact` or `/contact` (depending on whether contact is a section or page)

- `src/components/Footer.tsx` — Update `sections` array:
  - Under "Product" section, replace `{ label: "Services", href: "/services" }` with individual service links or keep as a landing page link
  - Add service detail page links under a "Services" column
  - Verify all links point to real routes (no `/blog`, `/press`, `/docs` etc. unless those pages exist)

**Important:** Only link to pages that actually exist. For pages that do not exist yet (e.g., `/about`, `/blog`, `/pricing`), either remove the links or point them to `/#` sections on the homepage. Mark any remaining placeholder links with a comment for future implementation.

**Test command:** `npm run dev` — click every link in Navbar and Footer, verify none lead to 404 (except intentionally removed pages).

**Acceptance criteria:**
- Clicking "Biz Setup" in nav goes to `/services/biz-setup`
- All four service pages are reachable from navigation
- No broken links (no 404s from any nav/footer link)
- Mobile menu includes service links
- External links (if any) have `target="_blank" rel="noopener noreferrer"`
- Active page highlighted in nav (if current implementation supports it)

---

### Task 6: Accessibility Audit (ADA/WCAG 2.1 AA)

**Estimated time:** 1.5 hours
**Dependencies:** Task 5

**Goal:** Audit all pages for WCAG 2.1 AA compliance, fix all critical and serious violations, document results.

**Pages to audit:**
1. Homepage (`/`)
2. `/services/biz-setup`
3. `/services/bookkeeping`
4. `/services/cpa`
5. `/services/legal`

**Audit process:**

1. **Automated scan** — Run axe DevTools on each page. Record all violations.
2. **Keyboard navigation** — Tab through every page start to finish:
   - Verify logical tab order
   - All interactive elements focusable
   - Focus indicators visible on all elements
   - No keyboard traps
   - Skip link jumps to main content
   - Escape closes mobile menu
3. **Color contrast** — Check all text/background combinations:
   - Normal text: 4.5:1 minimum
   - Large text (18px+ bold or 24px+): 3:1 minimum
   - Known risk areas: white text on glassmorphism (semi-transparent backgrounds)
4. **Semantic HTML check:**
   - One `<h1>` per page
   - Heading hierarchy sequential (h1 > h2 > h3, no skipping)
   - ARIA landmarks: `<header>` (banner), `<nav>` (navigation), `<main>` (main), `<footer>` (contentinfo)
   - Lists use `<ul>`/`<ol>` + `<li>`
   - All images have alt text (or `aria-hidden` if decorative)
5. **Motion preferences** — Enable `prefers-reduced-motion` in dev tools, verify animations stop/reduce
6. **Screen reader spot check** — macOS VoiceOver on homepage and one service page

**Files to modify:** Any component files where issues are found.

**Common fixes to anticipate:**
- Add missing `alt` text on images
- Fix heading hierarchy gaps
- Increase contrast on `text-white/60` or `text-white/50` text (may need to bump to `text-white/70` or `text-white/80`)
- Add `aria-current="page"` to active nav links
- Ensure form elements have associated labels

**Deliverable:** Create `docs/accessibility-audit.md` with:
- Date of audit
- Pages audited
- axe DevTools results (violations found, violations fixed)
- Manual testing results
- Remaining known issues (if any)

**Test commands:**
```bash
npx eslint .          # Includes jsx-a11y rules from eslint-config-next
npx tsc --noEmit      # Ensure fixes don't break types
npm run build         # Ensure fixes don't break build
```

**Acceptance criteria:**
- Zero critical/serious axe DevTools violations on all 5 pages
- All interactive elements keyboard accessible
- Skip link functional
- Heading hierarchy correct on every page
- Focus indicators visible on every interactive element
- Contrast ratios meet WCAG 2.1 AA thresholds
- Audit report written to `docs/accessibility-audit.md`

---

### Task 7: Lighthouse Performance Audit & Final Build

**Estimated time:** 1 hour
**Dependencies:** Task 6

**Goal:** Run Lighthouse audits, optimize as needed, verify the production build is clean, and document final scores.

**Audit steps:**

1. **Build the production bundle:**
   ```bash
   npm run build
   ```
   - Verify zero build errors
   - Verify 4 service pages are statically generated (check build output)
   - Note bundle sizes from build output

2. **Start production server and run Lighthouse:**
   ```bash
   npm run start &
   npx lighthouse http://localhost:3000 --output=json --output-path=./docs/lighthouse-home.json
   npx lighthouse http://localhost:3000/services/biz-setup --output=json --output-path=./docs/lighthouse-service.json
   ```

3. **Target scores (Lighthouse):**
   - Performance: >= 90
   - Accessibility: >= 95
   - Best Practices: >= 90
   - SEO: >= 90

4. **Common optimizations if scores are low:**
   - Add `loading="lazy"` to below-fold images
   - Ensure fonts use `display: swap` (already configured)
   - Minimize unused CSS (Tailwind purges automatically)
   - Check for Largest Contentful Paint (LCP) bottlenecks
   - Verify meta viewport tag present
   - Add meta descriptions to all pages

5. **Final verification checklist:**
   ```bash
   npx tsc --noEmit          # Zero TypeScript errors
   npx eslint .              # Zero ESLint errors
   npm run build             # Clean production build
   ```
   - [ ] All 4 service pages render correctly in production mode
   - [ ] Metadata correct on each page (title, description, OG tags)
   - [ ] No console errors in browser
   - [ ] No hydration mismatches
   - [ ] All links functional
   - [ ] Responsive at 375px, 768px, 1280px
   - [ ] `prefers-reduced-motion` respected

**Deliverable:** Create `docs/final-audit-report.md` with:
- Build status and output summary
- Lighthouse scores for homepage and one service page
- Bundle size summary
- Any remaining issues or technical debt
- Recommendations for future work

**Test commands:**
```bash
npx tsc --noEmit
npx eslint .
npm run build
npm run start
```

**Acceptance criteria:**
- `npm run build` succeeds with zero errors
- `npx tsc --noEmit` passes with zero errors
- `npx eslint .` passes with zero errors
- Lighthouse Performance >= 90
- Lighthouse Accessibility >= 95
- All 4 service pages statically generated
- Final audit report written to `docs/final-audit-report.md`

---

## Files Summary

**New files (9):**
- `src/data/services.ts`
- `src/app/services/[slug]/page.tsx`
- `src/components/services/ServiceHero.tsx`
- `src/components/services/ServiceFeatures.tsx`
- `src/components/services/ServiceCTA.tsx`
- `src/components/services/RelatedServices.tsx`
- `src/components/services/index.ts`
- `docs/accessibility-audit.md`
- `docs/final-audit-report.md`

**Modified files (3):**
- `src/types/index.ts` — Add `Service` and `ServiceFeature` interfaces
- `src/components/Navbar.tsx` — Update navigation links
- `src/components/Footer.tsx` — Update footer links
- `src/app/layout.tsx` — Wire in Navbar, Footer, SkipLink

**Unchanged files:**
- `src/data/solutions.ts` — Kept as-is (different product line)
- `src/components/ui/*` — Reused as-is
- `src/lib/cn.ts` — Reused as-is
- `src/app/globals.css` — No changes needed
- `package.json` — No new dependencies needed
- `next.config.ts` — No config changes
- `tsconfig.json` — No changes

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Next.js 16 `params` as Promise | Build errors if accessed synchronously | Always `await params`; consult `node_modules/next/dist/docs/` |
| Glassmorphism contrast issues | Fails WCAG contrast audit | Test early in Task 2; use solid dark backgrounds behind text when blur alone is insufficient |
| `PageProps` type helper may not exist | TypeScript errors | Fall back to manual typing: `{ params: Promise<{ slug: string }> }` |
| Footer/Navbar link to nonexistent pages | 404 errors | Task 5 explicitly audits every link; remove or redirect stale links |
| Lighthouse CLI not installed | Cannot run perf audit | Install via `npm install -g lighthouse` or use `npx lighthouse` |
| No test framework for unit tests | Cannot write automated component tests | Rely on TypeScript compilation, ESLint, build verification, and manual testing; note as future work |

---

## Test Strategy Summary

| Level | Tool | When |
|-------|------|------|
| Type safety | `npx tsc --noEmit` | After every task |
| Linting | `npx eslint .` | After Tasks 5, 6, 7 |
| Build | `npm run build` | After Tasks 3, 7 |
| Visual | `npm run dev` + browser | After Tasks 2, 3, 4, 5 |
| Accessibility | axe DevTools + keyboard + VoiceOver | Task 6 (dedicated) |
| Performance | Lighthouse CLI | Task 7 (dedicated) |
| Links | Manual click-through | Task 5 |
| Responsive | Chrome DevTools device emulation | Tasks 2, 5 |
