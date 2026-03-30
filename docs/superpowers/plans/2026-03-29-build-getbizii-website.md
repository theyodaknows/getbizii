# Plan: Build GetBizii Website

**Date:** 2026-03-29
**Author:** Planner (Opus)
**Status:** Draft — awaiting approval

---

## Goal

Build the complete GetBizii marketing website — homepage with WebGL aurora background, glassmorphism navigation, 8 business solution pages, Zoho CRM contact form integration, and responsive design — on the existing Next.js 16.2.1 scaffold, ready for production deployment.

---

## Architecture Overview

```
src/
├── app/
│   ├── layout.tsx                      ← Root layout (Nav + Footer wrapper)
│   ├── page.tsx                        ← Homepage (hero, pillars, bundles, etc.)
│   ├── globals.css                     ← Already configured with brand tokens
│   ├── api/
│   │   └── contact/
│   │       └── route.ts                ← Zoho CRM POST handler (server-side)
│   └── solutions/
│       └── [slug]/
│           └── page.tsx                ← Dynamic service detail page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                  ← Glassmorphism nav (client component)
│   │   └── Footer.tsx                  ← Footer with NGV attribution
│   ├── ui/
│   │   ├── Button.tsx                  ← Shared button primitives
│   │   ├── Card.tsx                    ← Shared card primitive
│   │   ├── SectionHeading.tsx          ← Reusable section title/subtitle
│   │   └── SkipLink.tsx               ← Accessibility skip navigation
│   ├── home/
│   │   ├── HeroSection.tsx             ← Hero with aurora + CTA
│   │   ├── LogoScroll.tsx              ← Industry logo marquee
│   │   ├── PillarsSection.tsx          ← Six tech pillars cards
│   │   ├── SolutionsGrid.tsx           ← 8 bundle cards with links
│   │   ├── HowItWorks.tsx             ← 4-step timeline
│   │   ├── WhatsIncluded.tsx          ← Platform cards section
│   │   ├── FinancingSection.tsx        ← Checklist + payment calc
│   │   ├── TestimonialsSection.tsx     ← 3 review cards
│   │   └── CtaBanner.tsx              ← Call-to-action banner
│   ├── contact/
│   │   └── ContactForm.tsx             ← Form with solution selector (client)
│   └── aurora/
│       └── AuroraBackground.tsx        ← WebGL aurora via OGL (client)
├── lib/
│   ├── zoho.ts                         ← Zoho OAuth2 token refresh + API helpers
│   ├── solutions-data.ts               ← Static data for all 8 business bundles
│   └── cn.ts                           ← clsx + tailwind-merge utility
└── types/
    └── index.ts                        ← Shared TypeScript interfaces
```

### Key Design Decisions

1. **OGL for WebGL** — Already installed (`ogl@1.0.11`). Lighter than Three.js. The aurora will use a custom GLSL fragment shader rendered on a fullscreen quad.
2. **Dynamic route for solutions** — `[slug]` pattern with `generateStaticParams` for static generation of all 8 bundle pages.
3. **Server-side Zoho integration** — Route handler at `/api/contact` keeps secrets server-side. Uses OAuth2 refresh token flow (tokens in env vars).
4. **Framer Motion for scroll animations** — Already installed. Will use `motion` components with `whileInView` for reveal animations (replaces the IntersectionObserver pattern from the original design doc).
5. **All section components are Server Components by default** — Only `AuroraBackground`, `Navbar`, `ContactForm`, and scroll-animated wrappers need `"use client"`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.1 (App Router) |
| UI | React 19.2.4 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 + tw-animate-css |
| Animation | Framer Motion 12.38, OGL 1.0.11 |
| Icons | Lucide React 1.7.0 |
| CRM | Zoho CRM REST API v2 (OAuth2 refresh flow) |
| Deployment | Vercel |

---

## Dependencies Between Tasks

```
Task 1 (cn utility + types)
  ↓
Task 2 (UI primitives)          Task 3 (solutions data)
  ↓                                ↓
Task 4 (Navbar)                 Task 5 (Footer)
  ↓                                ↓
Task 6 (Layout integration — wraps Nav + Footer into root layout)
  ↓
Task 7 (Aurora background)     ← independent, but needed by Task 8
Task 8 (Hero section)          ← depends on 7
Task 9 (Logo scroll)           ← depends on 2
Task 10 (Pillars section)      ← depends on 2
Task 11 (Solutions grid)       ← depends on 2, 3
Task 12 (How it works)         ← depends on 2
Task 13 (Whats included)       ← depends on 2
Task 14 (Financing section)    ← depends on 2
Task 15 (Testimonials)         ← depends on 2
Task 16 (CTA banner)           ← depends on 2
Task 17 (Homepage assembly)    ← depends on 8–16
  ↓
Task 18 (Solution detail page) ← depends on 2, 3
  ↓
Task 19 (Zoho lib)             ← independent
Task 20 (Contact form + API)   ← depends on 2, 19
  ↓
Task 21 (Contact section on homepage) ← depends on 17, 20
  ↓
Task 22 (Responsive polish)    ← depends on 17, 18, 21
Task 23 (Accessibility audit)  ← depends on 22
Task 24 (Final build verification) ← depends on 23
```

**Parallelization opportunities:**
- Tasks 2 and 3 can run in parallel after Task 1
- Tasks 4 and 5 can run in parallel after Task 2
- Tasks 7 through 16 can all run in parallel after Task 6 (with noted sub-dependencies)
- Task 19 can run at any time (fully independent)

---

## Tasks

### Task 1: Utility Functions and Type Definitions
**Estimated time:** 15 minutes
**Dependencies:** None

**Files to create:**
- `src/lib/cn.ts` — `cn()` helper combining `clsx` and `twMerge`
- `src/types/index.ts` — Shared interfaces: `Solution`, `Pillar`, `Testimonial`, `ContactFormData`

**Code snippet — `cn.ts`:**
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Code snippet — key types:**
```ts
export interface Solution {
  slug: string;
  name: string;
  tag: string;
  price: string;
  status: "active" | "waitlist";
  description: string;
  features: string[];
  heroImage: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}
```

**Test:** `npx tsc --noEmit` — should compile with zero errors.

---

### Task 2: Shared UI Primitives
**Estimated time:** 45 minutes
**Dependencies:** Task 1

**Files to create:**
- `src/components/ui/Button.tsx` — Primary/secondary/outline variants, proper `aria-` attributes, focus-visible ring
- `src/components/ui/Card.tsx` — Glass-effect card with optional hover animation
- `src/components/ui/SectionHeading.tsx` — Consistent section title + subtitle pattern
- `src/components/ui/SkipLink.tsx` — Hidden skip-to-content link for accessibility

**Design notes:**
- Button must support `as="a"` for link-style buttons (Next.js `Link` compatible)
- Card uses `backdrop-blur-xl bg-white/5 border border-white/10` for glassmorphism
- All interactive elements need `focus-visible:ring-2 focus-visible:ring-primary` at minimum
- SkipLink becomes visible on focus, jumps to `#main-content`

**Test:** `npx tsc --noEmit` + visual inspection via `npm run dev`.

---

### Task 3: Solutions Data Module
**Estimated time:** 30 minutes
**Dependencies:** Task 1 (for types)

**Files to create:**
- `src/lib/solutions-data.ts` — Array of all 8 `Solution` objects with slugs, prices, features, descriptions

**Data source:** `.claude` project intelligence file defines all 8 bundles:
1. `mobile-dna-livescanning` — Mobile DNA & Livescanning ($12,500)
2. `party-rental` — Party Rental ($15,000)
3. `print-reseller` — Print Reseller ($7,500)
4. `mobile-detailing` — Mobile Detailing ($9,800)
5. `plumber` — Plumber ($18,500)
6. `mini-apparel-shop` — Mini Apparel Shop ($14,000)
7. `custom-jewelry` — Custom Jewelry ($22,000)
8. `kurbside` — Kurbside (TBD / Waitlist)

Each solution needs: slug, name, tag, price, status, short description (2-3 sentences), feature list (6-8 items), and hero image path (placeholder for now).

**Test:** Import the array in a scratch file, verify TypeScript compiles, all 8 entries present.

---

### Task 4: Glassmorphism Navigation Bar
**Estimated time:** 1.5 hours
**Dependencies:** Task 2

**Files to create:**
- `src/components/layout/Navbar.tsx` — Client component (`"use client"`)

**Requirements:**
- Fixed position at top, `backdrop-blur-xl bg-void/60 border-b border-white/10`
- GetBizii logo (from `public/logo_light.svg`) linked to `/`
- Desktop links: Home, Solutions (dropdown with 8 items), Financing, Contact
- Mobile: Hamburger menu with animated open/close (Framer Motion)
- Solutions dropdown: grid layout showing all 8 bundles with tags
- Scroll behavior: navbar becomes more opaque on scroll (`bg-void/80`)
- Active link highlighting based on current route (`usePathname()`)

**Accessibility:**
- `<nav aria-label="Main navigation">`
- Dropdown: `aria-expanded`, `aria-haspopup="true"`, keyboard arrow navigation
- Mobile menu: focus trap when open, Escape to close
- All links have visible focus indicators

**Test:** `npm run dev` — navigate between pages, test keyboard navigation, test mobile hamburger at 375px viewport. `npx tsc --noEmit`.

---

### Task 5: Footer Component
**Estimated time:** 45 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/layout/Footer.tsx` — Server component

**Requirements:**
- Dark background (`bg-void`)
- 4-column grid: Company, Solutions, Resources, Legal
- GetBizii logo + tagline
- NGV attribution: "A Nobel Gemini Ventures company"
- Social media icon links (Lucide icons): placeholder hrefs
- Copyright notice with dynamic year
- Mobile: stacks to single column

**Accessibility:**
- `<footer role="contentinfo">`
- All links have descriptive text (no "click here")
- Social icons have `aria-label` (e.g., "Visit GetBizii on Instagram")

**Test:** Visual inspection at desktop (1440px) and mobile (375px). `npx tsc --noEmit`.

---

### Task 6: Root Layout Integration
**Estimated time:** 20 minutes
**Dependencies:** Tasks 4, 5

**Files to modify:**
- `src/app/layout.tsx` — Add Navbar, Footer, SkipLink, and `id="main-content"` on main element

**Changes:**
- Import and render `<SkipLink />` before `<Navbar />`
- Wrap `{children}` in `<main id="main-content" className="flex-1">`
- Render `<Footer />` after main
- Keep existing font variable setup and metadata

**Test:** `npm run dev` — every page should show nav + footer. `npx tsc --noEmit`.

---

### Task 7: WebGL Aurora Background
**Estimated time:** 2 hours
**Dependencies:** None (OGL already installed)

**Files to create:**
- `src/components/aurora/AuroraBackground.tsx` — Client component (`"use client"`)

**Technical approach:**
- Use OGL to create a fullscreen WebGL quad with a custom fragment shader
- Fragment shader: animated noise-based aurora bands in the brand blue/violet/mint palette
- Colors: blend between `#2563EB` (primary), `#8B5CF6` (violet), `#10B981` (mint) with time-varying noise
- Performance: `requestAnimationFrame` loop, cleanup on unmount, `devicePixelRatio` capped at 2
- Responsive: canvas fills parent container, resizes on window resize
- Fallback: if WebGL unavailable, render a CSS gradient (`bg-gradient-to-br from-primary-navy via-void to-violet/20`)
- The component accepts `className` prop for positioning (will be `absolute inset-0`)

**Accessibility:**
- Canvas has `aria-hidden="true"` (purely decorative)
- `role="presentation"` on container
- `prefers-reduced-motion`: pause animation, show static gradient instead

**Performance budget:**
- Shader should run at 60fps on mid-range mobile (test on throttled Chrome)
- Vertex count: 4 (single quad) — fragment shader does all the work

**Test:** `npm run dev` — verify aurora renders, resizes, and respects reduced motion. Check no console errors. Verify fallback by disabling WebGL in devtools.

---

### Task 8: Hero Section
**Estimated time:** 1 hour
**Dependencies:** Tasks 2, 7

**Files to create:**
- `src/components/home/HeroSection.tsx`

**Requirements:**
- Full viewport height (`min-h-screen`) with aurora background behind content
- Content overlay: heading, subheading, two CTA buttons
- Heading: "We build the tech. You build the empire." (font-heading, text-5xl md:text-7xl)
- Sub: "Business-in-a-box technology solutions for entrepreneurs ready to launch."
- Primary CTA: "Explore Solutions" → scrolls to solutions section
- Secondary CTA: "Get Started" → scrolls to contact section
- Subtle scroll-down indicator at bottom (animated chevron)

**Accessibility:**
- Heading is `<h1>`
- CTAs are buttons (not links) since they scroll within page — or `<a href="#solutions">` with smooth scroll
- Sufficient contrast ratio (white text on dark aurora — minimum 4.5:1)

**Test:** Visual at 1440px, 768px, 375px. Contrast check with Chrome DevTools. `npx tsc --noEmit`.

---

### Task 9: Logo Scroll Bar
**Estimated time:** 30 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/home/LogoScroll.tsx` — Client component for animation

**Requirements:**
- Infinite horizontal scroll of industry/partner logos
- CSS-only marquee animation (no JS needed — use `@keyframes` with `translateX`)
- Duplicate logo set for seamless loop
- Logos: placeholder SVG icons representing industries (Biometric, Events, E-Commerce, Service, Field Service, Fashion, Luxury, Coming Soon)
- Pause on hover (`animation-play-state: paused`)

**Accessibility:**
- `aria-label="Industries we serve"`
- Each logo has alt text
- `prefers-reduced-motion`: stop scrolling, show static grid

**Test:** Visual, hover pause works, reduced motion fallback.

---

### Task 10: Six Pillars Section
**Estimated time:** 45 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/home/PillarsSection.tsx`

**Requirements:**
- Section heading: "Six Technology Pillars"
- 6 glass-effect cards in a 3x2 grid (responsive: 1 column on mobile)
- Each card: Lucide icon, title, short description
- Pillars: Custom Development, Hosting & Storage, CRM System, Branding & Identity, Marketing Systems, Yearly Licensing
- Cards use Framer Motion `whileInView` for staggered reveal

**Test:** Visual at multiple breakpoints. `npx tsc --noEmit`.

---

### Task 11: Solutions Grid
**Estimated time:** 45 minutes
**Dependencies:** Tasks 2, 3

**Files to create:**
- `src/components/home/SolutionsGrid.tsx`

**Requirements:**
- Section id: `solutions` (for hero CTA scroll target)
- Section heading: "Business Solutions"
- 4x2 card grid (responsive: 2-col tablet, 1-col mobile)
- Each card: bundle name, tag badge, price, "Learn More" link to `/solutions/[slug]`
- Waitlist items (Kurbside): show "Coming Soon" badge, no link
- Cards: glass effect with hover lift animation

**Test:** Click "Learn More" navigates to correct slug. Visual at breakpoints.

---

### Task 12: How It Works Section
**Estimated time:** 30 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/home/HowItWorks.tsx`

**Requirements:**
- 4-step horizontal timeline (vertical on mobile)
- Steps: 1. Choose Your Business, 2. We Build Your Tech Stack, 3. Launch & Go Live, 4. Grow With Ongoing Support
- Each step: number badge, title, short description
- Connecting line between steps (CSS border or SVG)
- Framer Motion staggered reveal

**Test:** Visual at breakpoints.

---

### Task 13: What's Included Section
**Estimated time:** 45 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/home/WhatsIncluded.tsx`

**Requirements:**
- Dark background section for visual contrast
- 6 platform cards matching the six pillars but with more detail
- Each card: icon, title, bullet list of specific features, tech tag badges
- Cards in 3x2 grid

**Test:** Visual at breakpoints.

---

### Task 14: Financing Section
**Estimated time:** 45 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/home/FinancingSection.tsx`

**Requirements:**
- Two-column layout: checklist on left, payment calculator card on right
- Checklist items: "Monthly plans from $399/mo", "No hard credit pull", "24hr approval", "0% interest available", "Revenue share options"
- Calculator card: interactive client component — select a bundle price, see monthly payment at sample APR
- Formula: standard amortization (P * r) / (1 - (1+r)^-n) with 24-month term, 5.9% APR default

**Accessibility:**
- Calculator inputs have labels
- Results announced via `aria-live="polite"`

**Test:** Calculator produces correct output for $15,000 at 5.9% APR / 24mo = ~$665/mo. Visual.

---

### Task 15: Testimonials Section
**Estimated time:** 30 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/home/TestimonialsSection.tsx`

**Requirements:**
- 3 testimonial cards in a row (stack on mobile)
- Each: quote text, author name, business type, star rating
- Placeholder testimonial content (realistic but clearly placeholder)
- Glass card styling

**Test:** Visual at breakpoints.

---

### Task 16: CTA Banner
**Estimated time:** 20 minutes
**Dependencies:** Task 2

**Files to create:**
- `src/components/home/CtaBanner.tsx`

**Requirements:**
- Full-width gradient banner (primary to violet)
- Bold heading: "Ready to Launch Your Business?"
- Two buttons: "Get Started" (→ contact) and "View Solutions" (→ solutions)
- Simple, punchy — no complex layout

**Test:** Visual, links work.

---

### Task 17: Homepage Assembly
**Estimated time:** 30 minutes
**Dependencies:** Tasks 8-16

**Files to modify:**
- `src/app/page.tsx` — Replace scaffold with all homepage sections in order

**Section order (from `.claude` site architecture):**
1. HeroSection
2. LogoScroll
3. PillarsSection
4. SolutionsGrid
5. HowItWorks
6. WhatsIncluded
7. FinancingSection
8. TestimonialsSection
9. CtaBanner
10. ContactSection (added in Task 21)

**Test:** `npm run dev` — full page scroll, all sections visible and properly spaced. `npm run build` — no build errors.

---

### Task 18: Solution Detail Pages
**Estimated time:** 1.5 hours
**Dependencies:** Tasks 2, 3

**Files to create:**
- `src/app/solutions/[slug]/page.tsx` — Dynamic page with `generateStaticParams` and `generateMetadata`

**Requirements:**
- `generateStaticParams()` returns all 8 slugs from solutions data
- `generateMetadata()` generates per-solution title and description
- Layout: back link ("← All Solutions"), tag badge, hero title, placeholder image area
- "What We Build" section: feature list with checkmarks
- Sidebar: pricing card with price, "Get Started" CTA button
- Bottom: CTA banner linking to contact form
- Params are `Promise<{ slug: string }>` per Next.js 16 convention (must `await params`)

**Code snippet — params pattern (Next.js 16):**
```ts
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}
```

**Test:** Navigate to `/solutions/party-rental`, `/solutions/plumber`, etc. Verify 404 for invalid slugs. `npm run build` to verify static generation.

---

### Task 19: Zoho CRM Integration Library
**Estimated time:** 1 hour
**Dependencies:** None

**Files to create:**
- `src/lib/zoho.ts`

**Requirements:**
- `refreshAccessToken()` — POST to `https://accounts.zoho.com/oauth/v2/token` with refresh token grant
- Cache access token in module-level variable with expiry tracking (tokens last ~1 hour)
- `createLead(data: ContactFormData)` — POST to Zoho CRM v2 API `/crm/v2/Leads`
- Fields: First_Name, Last_Name, Email, Phone, Company, Description (message), Lead_Source ("Website")
- Error handling: retry once on 401 (token expired), throw on other errors
- All secrets from `process.env` — never exposed to client

**Environment variables (already in `.env.local`):**
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`
- `ZOHO_ORG_ID`

**Test:** Manual test with `curl` against the route handler (Task 20). TypeScript compilation.

---

### Task 20: Contact Form and API Route
**Estimated time:** 1.5 hours
**Dependencies:** Tasks 2, 19

**Files to create:**
- `src/app/api/contact/route.ts` — POST handler
- `src/components/contact/ContactForm.tsx` — Client component

**API Route (`route.ts`):**
- Validate required fields: firstName, lastName, email, message
- Optional: phone, solution (which bundle they are interested in)
- Call `createLead()` from zoho lib
- Return 200 on success, 400 on validation error, 500 on CRM failure
- Rate limiting: basic in-memory throttle (max 5 submissions per IP per hour)

**Contact Form (`ContactForm.tsx`):**
- Fields: First Name, Last Name, Email, Phone (optional), Solution Selector (dropdown of 8 bundles + "General Inquiry"), Message
- Client-side validation before submission
- Loading state with spinner during submission
- Success state: "Thank you! We'll be in touch within 24 hours."
- Error state: "Something went wrong. Please try again."
- Uses native `fetch('/api/contact', { method: 'POST' })`

**Accessibility:**
- All inputs have associated `<label>` elements
- Error messages linked via `aria-describedby`
- Form submission status announced via `aria-live="polite"` region
- Required fields marked with `aria-required="true"` and visual indicator

**Test:** Submit form with valid data (if env vars populated). Submit with missing fields — see validation. `npx tsc --noEmit`.

---

### Task 21: Contact Section on Homepage
**Estimated time:** 30 minutes
**Dependencies:** Tasks 17, 20

**Files to modify:**
- `src/app/page.tsx` — Add contact section after CTA banner

**Files to create:**
- `src/components/home/ContactSection.tsx`

**Requirements:**
- Section id: `contact` (for nav/CTA scroll targets)
- Two-column layout: info blocks on left (address, email, phone placeholders), form on right
- Info blocks use Lucide icons (MapPin, Mail, Phone)
- Background: subtle gradient or dark section

**Test:** "Get Started" buttons throughout the page scroll to this section.

---

### Task 22: Responsive Design Polish
**Estimated time:** 1.5 hours
**Dependencies:** Tasks 17, 18, 21

**Files to modify:** Various component files as needed

**Breakpoint targets:**
- Mobile: 375px (iPhone SE), 390px (iPhone 14)
- Tablet: 768px (iPad)
- Desktop: 1024px, 1280px, 1440px

**Checklist:**
- [ ] Navbar hamburger at < 768px, full nav at >= 768px
- [ ] Hero text scales: `text-3xl` mobile → `text-7xl` desktop
- [ ] Card grids collapse: 1-col mobile → 2-col tablet → 3-4 col desktop
- [ ] Footer: 1-col mobile → 4-col desktop
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Images and aurora resize without layout shift
- [ ] Contact form is full-width on mobile
- [ ] Solution detail page sidebar stacks below content on mobile
- [ ] Font sizes readable without zooming (minimum 16px body)

**Test:** Chrome DevTools device emulation at each breakpoint. Verify no horizontal overflow: `document.documentElement.scrollWidth > document.documentElement.clientWidth` should be false.

---

### Task 23: Accessibility Audit
**Estimated time:** 1.5 hours
**Dependencies:** Task 22

**Files to modify:** Various as issues are found

**Audit process:**
1. Run axe DevTools on every page (homepage + all 8 solution pages)
2. Manual keyboard navigation: Tab through entire homepage, verify logical order
3. Screen reader pass: VoiceOver on macOS, verify all content is announced
4. Color contrast: check all text/background combinations meet 4.5:1 (normal) / 3:1 (large)
5. `prefers-reduced-motion`: verify all animations pause/disable
6. `prefers-color-scheme`: verify dark mode (the site is dark by default, but ensure no light-mode flash)

**Required fixes (non-negotiable for WCAG 2.1 AA):**
- Zero critical/serious axe violations
- All images have alt text
- All form inputs have labels
- All interactive elements keyboard accessible
- Skip link present and functional
- Heading hierarchy is sequential (no skipping h1→h3)
- Focus indicators visible on all interactive elements
- ARIA landmarks present: banner, navigation, main, contentinfo

**Test:** `npx eslint .` (eslint-config-next includes jsx-a11y rules). axe DevTools browser extension. Manual keyboard walkthrough.

---

### Task 24: Final Build Verification
**Estimated time:** 30 minutes
**Dependencies:** Task 23

**Commands:**
```bash
npx tsc --noEmit          # TypeScript strict check
npx eslint .              # Lint (includes a11y rules)
npm run build             # Full production build — must succeed
npm run start             # Verify production server runs
```

**Checks:**
- Build completes with zero errors
- No TypeScript errors
- No ESLint errors or warnings
- All 8 solution pages statically generated (check build output)
- API route `/api/contact` responds to POST
- Bundle size reasonable (check `.next/` output)
- No console errors in browser

---

## Test Strategy Summary

| Level | Tool | When |
|-------|------|------|
| Type safety | `npx tsc --noEmit` | After every task |
| Linting | `npx eslint .` | After every task |
| Visual | `npm run dev` + browser | After every UI task |
| Accessibility | axe DevTools + keyboard | Task 23 (dedicated) |
| Responsive | Chrome DevTools emulation | Task 22 (dedicated) |
| Integration | Manual form submission | Task 20 |
| Build | `npm run build` | Tasks 17, 18, 24 |

---

## Files Summary

**New files (28):**
- `src/lib/cn.ts`
- `src/lib/zoho.ts`
- `src/lib/solutions-data.ts`
- `src/types/index.ts`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/components/ui/SkipLink.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/aurora/AuroraBackground.tsx`
- `src/components/home/HeroSection.tsx`
- `src/components/home/LogoScroll.tsx`
- `src/components/home/PillarsSection.tsx`
- `src/components/home/SolutionsGrid.tsx`
- `src/components/home/HowItWorks.tsx`
- `src/components/home/WhatsIncluded.tsx`
- `src/components/home/FinancingSection.tsx`
- `src/components/home/TestimonialsSection.tsx`
- `src/components/home/CtaBanner.tsx`
- `src/components/home/ContactSection.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/app/api/contact/route.ts`
- `src/app/solutions/[slug]/page.tsx`

**Modified files (2):**
- `src/app/layout.tsx`
- `src/app/page.tsx`

**Unchanged files:**
- `src/app/globals.css` (brand tokens already configured)
- `package.json` (all dependencies already installed)
- `next.config.ts` (no config changes needed)
- `tsconfig.json` (already correctly configured)

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| OGL aurora shader performance on low-end mobile | Poor UX, battery drain | Cap pixel ratio at 2, reduce shader complexity, CSS fallback for reduced-motion |
| Zoho API rate limits | Form submissions fail | Cache access token, basic client-side throttle, queue with retry |
| Zoho env vars empty in `.env.local` | API route returns 500 | Graceful degradation — form still "submits" with success message, logs warning server-side |
| Next.js 16 API differences from training data | Build errors, wrong patterns | Consult `node_modules/next/dist/docs/` before writing any route handler or page |
| Large bundle from Framer Motion | Slow initial load | Use dynamic imports for heavy animation components, tree-shake unused features |
