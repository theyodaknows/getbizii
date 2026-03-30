# Solution Detail Pages — Design Spec
**Date:** 2026-03-30
**Status:** Approved

---

## Goal

Add a detail page for each business solution (`/solutions/[slug]`), mirroring the existing services pattern. Pages are richer than service pages: they include a pricing panel, financing mention, and "right for you" qualifiers — appropriate for a higher-ticket purchase decision.

---

## Architecture

### Route
- `src/app/solutions/[slug]/page.tsx`
- `generateStaticParams` pulls from `getAllSolutions()` — covers all 8 solutions including waitlist
- `dynamicParams = false` — unknown slugs 404
- Params are async: `Promise<{ slug: string }>`
- `generateMetadata` derives title/description from existing fields: `title = solution.name + " | GetBizii"`, `description = solution.shortDescription`. No new fields added to `Solution` type for metadata.

### Components
All new components live in `src/components/solutions/` with a barrel `src/components/solutions/index.ts`.

```
src/components/solutions/
  index.ts
  SolutionHero.tsx
  SolutionFeatures.tsx
  SolutionPricing.tsx
  SolutionCTA.tsx
  RelatedSolutions.tsx
  graphics/
    AppointmentSchedulerGraphic.tsx     (mobile-dna-livescanning)
    RentalCalendarGraphic.tsx           (party-rental)
    OrderPipelineGraphic.tsx            (print-reseller)
    DetailingJobsGraphic.tsx            (mobile-detailing)
    DispatchBoardGraphic.tsx            (plumber)
    StorefrontMetricsGraphic.tsx        (mini-apparel-shop)
    CustomOrderWorkflowGraphic.tsx      (custom-jewelry)
    ComingSoonGraphic.tsx               (kurbside + waitlist fallback)
```

### Data
Add two optional fields to `Solution` in `src/types/index.ts`:

```ts
rightForYou?: string[];   // 3–5 bullet qualifiers for the pricing panel
financingNote?: string;   // one sentence shown below the price, ~15 words max
```

Add a `getRelatedSolutions(currentSlug: string, count: number): Solution[]` helper to `src/data/solutions.ts`. Unlike `getRelatedServices`, this helper **must filter by `status === "active"`** before excluding the current slug — waitlist solutions are never shown as related. Returns up to `count` results.

Populate `rightForYou` and `financingNote` for all 7 active solutions in `SOLUTIONS`. Kurbside (waitlist) skips both fields.

**Content for `financingNote` (all active solutions):**
> "Financing available — split your investment into manageable monthly payments."

**Content for `rightForYou` per solution:**

- **mobile-dna-livescanning:** ["You offer or want to offer DNA collection, livescan, or background checks", "You're scheduling appointments manually or via phone", "You need HIPAA-compliant document and results delivery", "You want a client portal and automated reminders"]
- **party-rental:** ["You rent party equipment, tents, bounce houses, or event gear", "You're managing bookings and availability by phone or spreadsheet", "You want to automate deposits, contracts, and delivery scheduling", "You're ready to grow beyond word-of-mouth referrals"]
- **print-reseller:** ["You resell printed products (cards, banners, apparel, signage)", "You want a branded storefront without managing inventory", "You're routing orders to print suppliers manually", "You want to control margins and offer bulk pricing"]
- **mobile-detailing:** ["You offer mobile or on-site auto detailing services", "You're scheduling jobs via text, calls, or social media", "You want to automate review requests and upsells", "You're ready to take on fleet or B2B clients"]
- **plumber:** ["You run a plumbing business with one or more technicians", "You're managing job requests, estimates, and invoices manually", "You want GPS dispatch and digital payment collection in the field", "You're ready to offer recurring maintenance plans"]
- **mini-apparel-shop:** ["You're launching or growing a fashion or apparel brand", "You want an online storefront with a lookbook and size guide", "You're ready to run promotions and an affiliate program", "You want Instagram shop integration from day one"]
- **custom-jewelry:** ["You create custom or bespoke jewelry on commission", "You want to streamline design consultations and approvals", "You need certificate of authenticity and layaway management", "You work with high-value clients who expect white-glove service"]

---

## Page Sections

### 1. SolutionHero
- Structure mirrors `ServiceHero`: gradient background (`bg-linear-to-br from-void via-[#0a1630] to-void`), right-side glow (`absolute -right-32 top-1/2 h-96 w-96 bg-blue-500/10 blur-3xl`), breadcrumb nav
- Breadcrumbs: `Home / Solutions / [name]` — "Solutions" links to `/#solutions`
- Left column: tag badge (color-matched per tag, same `TAG_COLORS` map as `SolutionsSection`) + `<h1>` name + short description + price pill (`bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm`)
- Right column: unique graphic component (mapped by `solution.slug`, see graphic map below)
- Waitlist variant: price shows "TBD", right column shows `ComingSoonGraphic`

**Graphic map (slug → component):**
| Slug | Component | Visual concept |
|------|-----------|----------------|
| `mobile-dna-livescanning` | `AppointmentSchedulerGraphic` | 3-row appointment list with colored status dots (green/blue/amber) + HIPAA Compliant and Results Portal badge pills |
| `party-rental` | `RentalCalendarGraphic` | 21-cell month grid with booked dates highlighted amber + "6 Booked / 15 Available" stat pills |
| `print-reseller` | `OrderPipelineGraphic` | 3-row order pipeline with order ID, item name, and colored status badge (Sent to Printer / In Production / Awaiting Artwork) |
| `mobile-detailing` | `DetailingJobsGraphic` | 3-row job schedule with time, service type, star rating + purple "GPS Dispatch Active" badge |
| `plumber` | `DispatchBoardGraphic` | 3-row dispatch board with job type, tech name, estimate, and status badge (Dispatched / In Progress / Complete) |
| `mini-apparel-shop` | `StorefrontMetricsGraphic` | 2×2 stats grid (Active Listings / Revenue / Conversion / Units Sold) + pink "Instagram Shop Connected" badge |
| `custom-jewelry` | `CustomOrderWorkflowGraphic` | 4-step workflow: Design Brief → Stone Selection → Preview Approval → Certificate — first 3 checked gold, last step "Generating" |
| `kurbside` | `ComingSoonGraphic` | Centered emoji + "coming soon" text + "Join Waitlist" muted pill |

All graphics: `aria-hidden="true"`, dark glassmorphism panel (`bg-white/5 border border-white/15 rounded-2xl backdrop-blur-sm`), inner panel (`bg-slate-950/70 border border-white/10 rounded-xl`). Match the exact visual style of `BrandIdentityDocumentGraphic` and `CreditBureauReportGraphic` in `ServiceHero.tsx`.

### 2. SolutionFeatures
- Section heading: "What's Built For You"
- 2-col responsive grid (1-col mobile, 2-col sm+)
- Each item: circular checkmark badge (`w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center`) containing `<Check size={12} className="text-blue-400" />` + feature text
- Item cards: `bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3`
- Rendered for all solutions including waitlist

### 3. SolutionPricing
- **Omitted entirely for `status === "waitlist"` solutions**
- Two-panel grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
- Both panels: `bg-white/5 border border-white/10 rounded-2xl p-6`
- **Left panel — Investment:**
  - Label: `text-xs uppercase tracking-widest text-white/40` → "Investment"
  - Price: `text-4xl font-bold text-white`
  - Sublabel: `text-sm text-white/50` → "One-time build fee"
  - `<hr className="border-white/10 my-4" />`
  - Financing note: `text-sm text-primary-sky` from `solution.financingNote`
- **Right panel — Right for you if…:**
  - Heading: `text-xs uppercase tracking-widest text-white/40` → "This is right for you if…"
  - `<ul>` of items from `solution.rightForYou`, each: `flex gap-2 items-start text-sm text-white/65` with `→` prefix in `text-emerald-400`

### 4. SolutionCTA
- Centered section, `py-20`
- **Active variant:**
  - Headline: `Ready to launch your [name] business?`
  - Subtext: `"Let's talk about your goals and get you started."`
  - Primary button: "Get Started" → `/contact?solution=[slug]` (the contact page should pre-select the solution field from this query param if present — verify `ContactSection` supports it, otherwise link to `/contact` without the param)
  - Secondary button: "View All Solutions" → `/#solutions`
- **Waitlist variant:**
  - Headline: `Be first to know when [name] launches.`
  - Subtext: `"Join the waitlist and we'll reach out when it's ready."`
  - Primary button: "Join Waitlist" → `/#contact`
  - Secondary button: "View All Solutions" → `/#solutions`

### 5. RelatedSolutions
- Heading: "Other Solutions"
- 3-up card grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Cards: tag badge + name + short description + price, link to `/solutions/[slug]`
- Uses `getRelatedSolutions(currentSlug, 3)` — returns active-only, excludes current
- If result has fewer than 3, render what's available in the same 3-col grid (1–2 cards will left-align naturally). If 0 active others exist, omit the section entirely.
- Rendered for both active and waitlist current solution

---

## Accessibility
- Breadcrumb `<nav aria-label="Breadcrumb">` with `aria-current="page"` on last crumb item
- All interactive elements: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded`
- Decorative graphics: `aria-hidden="true"`
- Each `<section>` has `aria-labelledby` pointing to its heading id
- Price pill: visually shows "$15,000" but `<span className="sr-only">` adds "One-time build fee" for screen readers

---

## Waitlist Behavior Summary
Kurbside and any future `status: "waitlist"` solution:
- Hero: tag badge + name + "TBD" price + `ComingSoonGraphic`
- Features: rendered normally
- Pricing: **omitted**
- CTA: waitlist variant
- Related solutions: rendered normally (active solutions only)

---

## Files Changed / Created

**New:**
- `src/app/solutions/[slug]/page.tsx`
- `src/components/solutions/index.ts`
- `src/components/solutions/SolutionHero.tsx`
- `src/components/solutions/SolutionFeatures.tsx`
- `src/components/solutions/SolutionPricing.tsx`
- `src/components/solutions/SolutionCTA.tsx`
- `src/components/solutions/RelatedSolutions.tsx`
- `src/components/solutions/graphics/AppointmentSchedulerGraphic.tsx`
- `src/components/solutions/graphics/RentalCalendarGraphic.tsx`
- `src/components/solutions/graphics/OrderPipelineGraphic.tsx`
- `src/components/solutions/graphics/DetailingJobsGraphic.tsx`
- `src/components/solutions/graphics/DispatchBoardGraphic.tsx`
- `src/components/solutions/graphics/StorefrontMetricsGraphic.tsx`
- `src/components/solutions/graphics/CustomOrderWorkflowGraphic.tsx`
- `src/components/solutions/graphics/ComingSoonGraphic.tsx`

**Modified:**
- `src/types/index.ts` — add optional `rightForYou` and `financingNote` to `Solution`
- `src/data/solutions.ts` — populate new fields for 7 active solutions, add `getRelatedSolutions`
