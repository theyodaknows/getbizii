# Homepage Bento, 5th Service, Financing Split & TrustBar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Source spec:** `docs/superpowers/specs/2026-07-25-homepage-bento-pricing-redesign-design.md` (Approved). The spec is the source of truth for copy, data shapes, and component behavior. This plan only sequences it.

**Goal:** Ship four coordinated changes to the GetBizii site — a photo bento Business Solutions grid, a 5th service (Business Credit Monitoring), a Net Terms / `/pricing` financing split, and a rebuilt TrustBar.

**Architecture:** Everything stays inside the existing Next.js App Router structure. Content stays in `src/data/*` as typed constants; page-level Server Components read data and pass it down as props to section components. Exactly one new client component is introduced (`PricingSelector`) — every other new or changed file remains a Server Component. A new domain folder `src/components/pricing/` is added with a barrel `index.ts`, matching `src/components/services/` and `src/components/solutions/`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript 5 (strict), Tailwind CSS v4.2.2 (CSS-based `@theme`, no config file), `lucide-react` 1.7, `next/image`.

---

## Global Constraints

These apply to **every** task. Do not restate them per task; they are always in force.

- **No test runner exists.** `npm run dev`, `npm run build`, `npm run lint` are the only commands. There is no `npm test`. Never invent one.
- **`npm run lint` has a pre-existing failing baseline of 6 errors + 1 warning.** Verification is *"no new lint problems in the files I touched"*, not *"lint exits 0"*. Baseline (memorise this list):
  - `src/app/about/page.tsx:148:75` and `:149:23` — `react/no-unescaped-entities`
  - `src/components/Navbar.tsx:240:15`, `:250:11`, `:352:17` — `@next/next/no-html-link-for-pages`
  - `src/components/aurora/AuroraBackground.tsx:148:9` — `prefer-const`
  - `src/components/ui/RotatingText.tsx:104:5` — unused eslint-disable (warning)
- **`npm run build` currently passes** and emits **26 routes**. After this plan it must emit **28** (adds `/pricing` and `/services/credit-monitoring`).
- **Path alias:** `@/*` → `src/*`. Use it for every internal import.
- **Barrel imports:** import from `@/components/ui`, `@/components/services`, `@/components/solutions`, `@/components/pricing` — never from the individual file. (`src/app/financing/page.tsx` currently violates this; leave that import alone unless the task says otherwise.)
- **Server Components by default.** Add `"use client"` only to `PricingSelector.tsx`.
- **All four `@/components/ui` exports (`Button`, `Card`, `SectionHeading`, `SkipLink`) are already `"use client"`,** so importing the `ui` barrel from `PricingSelector.tsx` is safe — there is no server/client boundary problem to solve there.
- **New raw `<a href="/some-page">` to a static internal route will fail lint** (`@next/next/no-html-link-for-pages`). Use the `Button` component or `next/link` for new static internal links. Template-literal hrefs (`` `/solutions/${slug}` ``) are not flagged and are fine.
- **Tailwind v4 spelling:** this repo uses `bg-linear-to-*` (v4 name), not `bg-gradient-to-*`. Both compile to identical CSS in v4.2.2; use `bg-linear-to-*` for consistency with `Button.tsx` and `ServicesSection.tsx`.
- **WCAG 2.1 AA is mandatory.** Every interactive element gets `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`. Semantic HTML only — real `<input type="checkbox">`, `<label>`, `<ul role="list">`, `<section aria-labelledby>`.
- **Dev server URL:** use whatever URL `npm run dev` prints. `CLAUDE.md`/`README.md` say `http://localhost:1111`, but `package.json` runs bare `next dev` with no `-p`, so it will actually bind `http://localhost:3000`. Do not "fix" this; it is out of scope.
- **Commit after every task** using the exact `git commit` command given in that task's final step.
- **Placeholder pricing:** `price` values on the 4 existing services are placeholders. The literal comment `// placeholder — replace with real pricing` must sit directly above the `SERVICES` array. Do not silently invent different numbers.
- **Never hardcode a derived number.** Savings, one-time totals, and running totals are computed from `getAllServices()` + `src/data/pricing.ts` at render time.

---

## File Structure

**Create (4 files):**

| Path | Responsibility |
|---|---|
| `src/data/pricing.ts` | Two bundle constants: `BUNDLE_PRICE`, `MONITORING_FREE_MONTHS`. Nothing derived. |
| `src/components/pricing/PricingSelector.tsx` | The one client component. Bundle hero card + à la carte checklist + live running total. |
| `src/components/pricing/index.ts` | Barrel for the `pricing` domain folder. |
| `src/app/pricing/page.tsx` | `/pricing` Server Component route: hero copy, `<PricingSelector>`, CTA. |

**Modify (14 files):**

| Path | Change |
|---|---|
| `src/types/index.ts` | `Service` gains `price: number` and `priceType: "one-time" \| "monthly"`. |
| `src/data/services.ts` | Reorder to 5 services, add pricing fields, append `credit-monitoring`. |
| `src/data/services.validate.ts` | Refresh stale assertions (4 → 5 services, real slugs, new fields). |
| `src/components/services/ServiceFeatures.tsx` | Register `BellRing` + `ShieldCheck` feature icons. |
| `src/components/services/ServiceHero.tsx` | Register `Radar` service icon. |
| `src/components/services/RelatedServices.tsx` | Replace stale icon map with the real service icons. |
| `src/components/home/ServicesSection.tsx` | Drop CTA filler card, fix `getIcon()` slug map, fix "Four" → "Five" copy. |
| `src/components/home/SolutionsSection.tsx` | Photo bento grid + computed featured tiles. |
| `src/components/home/TrustBar.tsx` | New `TRUST_ITEMS`. |
| `src/components/home/FinancingSection.tsx` | Two-card Net Terms / Service Pricing layout; now takes a `services` prop. |
| `src/app/page.tsx` | One line: pass `services` to `<FinancingSection>`. |
| `src/app/financing/page.tsx` | Re-scope copy to Business Solution builds. |
| `src/components/Navbar.tsx` | Add Business Credit Monitoring to the Services dropdown; add a top-level Pricing link (desktop + mobile). |
| `src/components/Footer.tsx` | Add Business Credit Monitoring to the Services column; add Pricing to the Company column. |

**Commit only (no code change):** `public/images/bento/*.png` (8 files).

**Explicitly NOT changed:** `src/components/home/PaymentCalculator.tsx` (the spec says it stays byte-for-byte identical), `.gitignore` (already contains `.superpowers/` — verified).

---

## Task Dependency Graph

```
Task 1 (commit images) ─────────────────► Task 7 (SolutionsSection bento)

Task 2 (types + services data) ──┬──────► Task 3 (validate script)
                                 ├──────► Task 4 (service-detail icon maps)
                                 ├──────► Task 5 (ServicesSection)
                                 ├──────► Task 8 (pricing data + PricingSelector)
                                 │            └─► Task 9 (/pricing route)
                                 │                   ├─► Task 10 (FinancingSection)
                                 │                   └─► Task 13 (Navbar + Footer)
                                 └──────────────────────► Task 13 (Navbar + Footer)

Task 6  (TrustBar)        — no dependencies, run any time
Task 11 (/financing copy) — no dependencies, run any time

ALL OF 1-11 AND 13 ─────────────────────► Task 12 (full verification + a11y pass)
```

**Execution order:** Tasks 1–11, then **Task 13**, then **Task 12 last**. Task 12 is the final whole-site gate, so the navigation changes in Task 13 must already be in place when it runs. (Task 13 keeps its number to avoid renumbering the document — only its position in the run order is late.)

**Task 13 needs both:** Task 2 (the `credit-monitoring` slug and the "Business Credit Monitoring" name) and Task 9 (the `/pricing` route must exist before global navigation links to it).

**Safe to parallelise:** Tasks 1, 2, 6, 11 can all start immediately. Tasks 3, 4, 5 can run concurrently once Task 2 lands.

---

### Task 1: Commit the bento image assets

`public/images/bento/*.png` exist on disk but are untracked. Every later task that references `/images/bento/<slug>.png` must be working against tracked files.

**Files:**
- Commit (no edits): `public/images/bento/custom-jewelry.png`, `kurbside.png`, `mini-apparel-shop.png`, `mobile-detailing.png`, `mobile-dna-livescanning.png`, `party-rental.png`, `plumber.png`, `print-reseller.png`
- Read-only check: `.gitignore`

**Interfaces:**
- Produces: 8 tracked PNGs at `public/images/bento/<solution-slug>.png`, where `<solution-slug>` matches every `slug` in `SOLUTIONS` (`src/data/solutions.ts`) 1:1. Task 7 relies on this exact naming.

- [ ] **Step 1: Confirm all 8 files exist and match solution slugs**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
ls public/images/bento/
grep -o 'slug: "[a-z-]*"' src/data/solutions.ts
```

Expected: exactly 8 `.png` files; every slug printed by the `grep` (`mobile-dna-livescanning`, `party-rental`, `print-reseller`, `mobile-detailing`, `plumber`, `mini-apparel-shop`, `custom-jewelry`, `kurbside`) has a `<slug>.png`. If any is missing, **stop and report** — do not proceed to Task 7.

- [ ] **Step 2: Confirm `.gitignore` already ignores `.superpowers/`**

```bash
grep -n "superpowers" .gitignore
```

Expected: prints `.superpowers/`. It is already there, so the spec's `.gitignore` line item is a **no-op** — make no edit to `.gitignore`.

- [ ] **Step 3: Stage and commit the images**

```bash
git add public/images/bento
git status --short
```

Expected: 8 lines, all `A  public/images/bento/*.png`. Nothing else staged.

- [ ] **Step 4: Verify nothing else got swept in, then commit**

```bash
git commit -m "chore(assets): track bento grid images for business solutions

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git status --short
```

Expected: `git status --short` is now empty (or shows only unrelated pre-existing noise). **Verification:** `git ls-files public/images/bento | wc -l` prints `8`.

---

### Task 2: Add pricing fields to `Service` and add the 5th service

**Files:**
- Modify: `src/types/index.ts:41-52` (the `Service` interface)
- Modify: `src/data/services.ts` (whole `SERVICES` array — reorder + new fields + new entry)

**Interfaces:**
- Produces: `Service.price: number` and `Service.priceType: "one-time" | "monthly"`. Tasks 8, 9, 10 read both.
- Produces: `getAllServices()` returns exactly 5 services in this order — `biz-setup`, `visual-identity`, `data-aggregator`, `credit-bureau`, `credit-monitoring`. Tasks 5, 8, 9, 10 depend on that order.
- Produces: new slug `credit-monitoring` with `icon: "Radar"` and feature icons `BarChart3`, `BellRing`, `AlertCircle`, `TrendingUp`, `ShieldCheck`, `FileText`. Task 4 registers these.

- [ ] **Step 1: Add the two fields to the `Service` interface**

Replace the `Service` interface in `src/types/index.ts` with exactly:

```ts
export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: ServiceFeature[];
  icon: string;
  price: number;              // USD
  priceType: "one-time" | "monthly";
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
}
```

- [ ] **Step 2: Confirm the type change breaks the build (it should)**

```bash
npx tsc --noEmit
```

Expected: 4 errors, one per existing service object, of the form `Property 'price' is missing in type ... but required in type 'Service'`. This proves the type is actually enforced. If you get 0 errors, you edited the wrong interface.

- [ ] **Step 3: Add the placeholder comment above the array**

In `src/data/services.ts`, line 3 currently reads `const SERVICES: Service[] = [`. Insert this comment directly above it:

```ts
// placeholder — replace with real pricing
const SERVICES: Service[] = [
```

- [ ] **Step 4: Reorder the four existing service objects**

Current order in the file: `biz-setup`, `credit-bureau`, `data-aggregator`, `visual-identity`.
Target order: `biz-setup`, `visual-identity`, `data-aggregator`, `credit-bureau`.

Move the **whole object literals** — cut and paste them intact. Do **not** retype any `description`, `features`, or `metaDescription` copy; a single re-typed character is a content regression. Net effect: `visual-identity` moves from last to second; `credit-bureau` moves from second to last; `data-aggregator` stays third.

- [ ] **Step 5: Add `price` + `priceType` to each of the four**

Insert the two lines immediately **after** each object's `icon:` line, so field order matches the interface:

```ts
// biz-setup — after  icon: "Building2",
    price: 799,
    priceType: "one-time",

// visual-identity — after  icon: "Layers",
    price: 1299,
    priceType: "one-time",

// data-aggregator — after  icon: "Database",
    price: 549,
    priceType: "one-time",

// credit-bureau — after  icon: "CreditCard",
    price: 1499,
    priceType: "one-time",
```

- [ ] **Step 6: Append the new `credit-monitoring` service as the 5th and last array element**

Paste verbatim (copy is final, approved spec copy — do not paraphrase, do not reflow the `\n\n` escapes):

```ts
  {
    slug: "credit-monitoring",
    name: "Business Credit Monitoring",
    tagline: "Know the moment your business credit changes",
    description:
      "Building a business credit profile is only half the job — protecting and growing it is a continuous effort. Scores shift when vendors report late, when inquiries hit your file, or when a competitor's data gets crossed with yours. Without ongoing visibility, businesses miss the moment a problem appears and lose months undoing the damage. GetBizii's Business Credit Monitoring keeps a permanent watch on your file so nothing catches you off guard.\n\nOnce your credit profile is established — whether through our Credit Bureau Injection service or a file you've already built — we enroll you in continuous tracking across Dun & Bradstreet, Experian Business, and Equifax Business. Every change to your Paydex, Intelliscore, or Business Credit Risk score is logged, and anything that moves your file — a new trade line, a paid-as-agreed update, a hard inquiry — triggers a real-time alert.\n\nMonitoring isn't just a dashboard. When we spot an inaccuracy, an unauthorized inquiry, or a fraudulent trade line, we open a dispute on your behalf the same week. Each month we also review where your file stands against your next milestone — a higher vendor limit, a business line of credit, a lease — and tell you exactly what to do next to get there.\n\nThis is the service that turns a one-time credit build into a compounding asset. Businesses that monitor and actively manage their credit consistently qualify for better terms faster than those who build once and walk away.",
    features: [
      {
        icon: "BarChart3",
        title: "Tri-Bureau Score Tracking",
        description:
          "We continuously track your Paydex, Experian Intelliscore, and Equifax Business Credit Risk scores, so you always know exactly where your file stands across all three bureaus.",
      },
      {
        icon: "BellRing",
        title: "Real-Time Change Alerts",
        description:
          "The moment anything changes on your file — a new trade line, a hard inquiry, a payment update — you get an alert, instead of finding out months later.",
      },
      {
        icon: "AlertCircle",
        title: "Ongoing Dispute Support",
        description:
          "We open and manage disputes on any inaccurate, outdated, or fraudulent information the moment it appears — not just during initial setup, but for as long as you're monitored.",
      },
      {
        icon: "TrendingUp",
        title: "Monthly Growth Recommendations",
        description:
          "Every month we review your file against your next milestone — a higher vendor limit, a line of credit, a lease — and tell you the specific next step to get there.",
      },
      {
        icon: "ShieldCheck",
        title: "Fraud & Identity Monitoring",
        description:
          "We watch for unauthorized inquiries and fraudulent trade lines opened in your business's name, catching identity misuse before it damages your file.",
      },
      {
        icon: "FileText",
        title: "Monthly Credit Reports",
        description:
          "A plain-English summary of your credit position lands in your inbox every month — no bureau jargon, just what changed and what it means for your business.",
      },
    ],
    icon: "Radar",
    price: 49,
    priceType: "monthly",
    ctaLabel: "Start Monitoring",
    ctaHref: "/contact?service=credit-monitoring",
    metaTitle: "Business Credit Monitoring | GetBizii",
    metaDescription:
      "Track your business credit across Dun & Bradstreet, Experian, and Equifax with real-time alerts, ongoing dispute support, and monthly growth guidance from GetBizii.",
  },
```

- [ ] **Step 7: Verify types, lint, and build**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected:
- `tsc`: clean, 0 errors.
- `lint`: the 6-error baseline only — nothing from `src/types/index.ts` or `src/data/services.ts`.
- `build`: succeeds, route table now lists **27** routes including `/services/credit-monitoring` under `● /services/[slug]`.

- [ ] **Step 8: Manual browser check**

Run `npm run dev`, open `/services/credit-monitoring`. Confirm: the H1 reads "Business Credit Monitoring", the tagline and 4 body paragraphs render (paragraph breaks visible — `whitespace-pre-line` handles the `\n\n`), and all 6 feature cards appear. Two feature icons (Real-Time Change Alerts, Fraud & Identity Monitoring) will show a generic checkmark and the hero will show **no** decorative icon — that is expected and is fixed in Task 4. Also open `/` and confirm the "Everything Your Business Needs" grid now has an extra card that overflows the bento layout — also expected, fixed in Task 5.

- [ ] **Step 9: Commit**

```bash
git add src/types/index.ts src/data/services.ts
git commit -m "feat(services): add pricing fields and Business Credit Monitoring service

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Refresh the stale services validation script

`src/data/services.validate.ts` asserts 4 services and checks slugs `bookkeeping`, `cpa`, `legal` that have not existed for a long time. It type-checks (so `npm run build` passes) but its assertions are now wrong. Not in the spec's file list — see Open Question 6.

**Files:**
- Modify: `src/data/services.validate.ts`

**Interfaces:**
- Consumes: `getAllServices()`, `getServiceBySlug()`, `getRelatedServices()` from Task 2; `Service.price` / `Service.priceType`.
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Update the expected service count**

Change `assertEq(all.length, 4, "getAllServices length");` to:

```ts
assertEq(all.length, 5, "getAllServices length");
```

- [ ] **Step 2: Replace the stale slug list with the real one, in the real order**

```ts
const REQUIRED_SLUGS = [
  "biz-setup",
  "visual-identity",
  "data-aggregator",
  "credit-bureau",
  "credit-monitoring",
] as const;
```

- [ ] **Step 3: Update the unique-slug count**

Change `assertEq(slugSet.size, 4, "unique slug count");` to:

```ts
assertEq(slugSet.size, 5, "unique slug count");
```

- [ ] **Step 4: Add assertions for the two new fields**

Inside the existing `for (const service of all) { ... }` loop, directly after the `assertDefined(service.icon, ...)` line, add:

```ts
  if (typeof service.price !== "number" || !Number.isFinite(service.price) || service.price <= 0)
    throw new Error(`FAIL: ${ctx} price must be a positive number`);

  if (service.priceType !== "one-time" && service.priceType !== "monthly")
    throw new Error(`FAIL: ${ctx} priceType must be "one-time" or "monthly"`);
```

- [ ] **Step 5: Make the closing log count-agnostic**

Change the final line from `console.log("All 15 checks passed.");` to:

```ts
console.log("All checks passed.");
```

Also update the ordered-list header comment `// ── 1. getAllServices returns all 4 ──` to say `all 5`.

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit
npm run lint
```

Expected: `tsc` clean; `lint` shows only the 6-error baseline. Note: **this file cannot be executed** — `ts-node` is not installed and Node's type-stripping does not resolve the `@/*` alias. Its value is compile-time documentation of the data contract. Do not add a runner or a script entry for it.

- [ ] **Step 7: Commit**

```bash
git add src/data/services.validate.ts
git commit -m "chore(data): refresh services validation script for 5 services and pricing fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Register the new lucide icons on the service detail page

Three separate `iconMap` objects drive service-detail rendering. None of them knows about `Radar`, `BellRing`, or `ShieldCheck`, so `/services/credit-monitoring` renders with a missing hero icon and two wrong feature icons. Additive only — no behaviour change for existing services except that `RelatedServices` starts showing correct icons (it currently shows none for 3 of 4 services).

**Files:**
- Modify: `src/components/services/ServiceFeatures.tsx:1-61` (import block + `iconMap`)
- Modify: `src/components/services/ServiceHero.tsx:1-26` (import block + `iconMap`)
- Modify: `src/components/services/RelatedServices.tsx:1-18` (import block + `iconMap`)

**Interfaces:**
- Consumes: `Service.icon` values `Building2`, `Layers`, `Database`, `CreditCard`, `Radar`; `ServiceFeature.icon` values `BellRing`, `ShieldCheck` (from Task 2).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: `ServiceFeatures.tsx` — add two feature icons**

In the `lucide-react` import list, add `BellRing,` immediately after `BarChart3,` and `ShieldCheck,` immediately after `Shield,` (the list is alphabetical — keep it that way). Then add the same two identifiers, in the same two positions, to the `iconMap` object literal. Do not remove anything.

- [ ] **Step 2: `ServiceHero.tsx` — add the `Radar` service icon**

Add `Radar,` to the `lucide-react` import list, then extend the `iconMap` so it reads exactly:

```ts
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  Building2,
  BookOpen,
  Calculator,
  Briefcase,
  Layers,
  Radar,
};
```

Do not touch the `isVisualIdentity` / `isCreditBureau` / `isDataAggregator` custom-graphic branches. `credit-monitoring` intentionally falls through to the generic large-icon branch.

- [ ] **Step 3: `RelatedServices.tsx` — replace the stale map with the real service icons**

Replace the import on line 2 and the `iconMap` with:

```ts
import { Building2, CreditCard, Database, Layers, Radar } from "lucide-react";
```

```ts
const iconMap: Record<string, LucideIcon> = {
  Building2,
  CreditCard,
  Database,
  Layers,
  Radar,
};
```

`BookOpen`, `Calculator`, and `Briefcase` are removed from both the import and the map — they map to slugs that no longer exist.

- [ ] **Step 4: Verify build and lint**

```bash
npm run lint
npm run build
```

Expected: lint shows the 6-error baseline only (in particular, **no** `no-unused-vars` for the icons you removed from `RelatedServices.tsx` — if you see one, you deleted a map entry but left the import). Build succeeds with 27 routes.

- [ ] **Step 5: Manual browser check**

`npm run dev`, then:
- `/services/credit-monitoring` — a large faint radar icon appears at the right of the hero; the "Real-Time Change Alerts" card shows a bell icon and "Fraud & Identity Monitoring" shows a shield-check icon (neither is a plain checkmark any more).
- `/services/biz-setup` — scroll to "Related services". All 3 cards now show an icon (previously most were blank). Nothing else on the page changed.

- [ ] **Step 6: Commit**

```bash
git add src/components/services/ServiceFeatures.tsx src/components/services/ServiceHero.tsx src/components/services/RelatedServices.tsx
git commit -m "fix(services): register Radar, BellRing and ShieldCheck icons and drop stale icon map entries

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: ServicesSection — 5 real cards, correct icons, correct count copy

**Files:**
- Modify: `src/components/home/ServicesSection.tsx:1-12` (imports + `getIcon`)
- Modify: `src/components/home/ServicesSection.tsx:36-38` (subheading copy)
- Modify: `src/components/home/ServicesSection.tsx:115-126` (delete the CTA filler card)

**Interfaces:**
- Consumes: `services: Service[]` prop (5 items, order from Task 2). No prop-signature change — `src/app/page.tsx` already passes it.
- Produces: nothing consumed by other tasks.

**Do not restructure the grid.** The existing `grid gap-4 lg:grid-cols-5 lg:grid-rows-2` is already correct: the featured card spans `lg:col-span-3 lg:row-span-2` (6 of 10 cells), leaving exactly 4 cells for the 4 `lg:col-span-2` compact cards. With 5 services, `rest = services.slice(1)` is now exactly 4, so removing the CTA card restores the layout to a perfect fit.

- [ ] **Step 1: Fix the imports**

Replace line 1 with:

```tsx
import { Building2, Layers, Database, CreditCard, Radar, ArrowRight } from "lucide-react";
```

- [ ] **Step 2: Fix the `getIcon` slug map**

The current map keys `bookkeeping`, `cpa`, `legal` match no real service, so 3 of 4 compact cards silently fall back to `Building2`. Replace the whole function with:

```tsx
function getIcon(slug: string) {
  const map: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: "true" }>> = {
    "biz-setup": Building2,
    "visual-identity": Layers,
    "data-aggregator": Database,
    "credit-bureau": CreditCard,
    "credit-monitoring": Radar,
  };
  return map[slug] ?? Building2;
}
```

Each value matches that service's own `icon` field in `src/data/services.ts`, keeping the homepage, the TrustBar (Task 6), and the service detail pages visually consistent.

- [ ] **Step 3: Fix the "Four essential services" subheading**

There are five services now. Change the `<p>` under the H2 from `One platform. Four essential services. Zero guesswork.` to:

```tsx
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            One platform. Five essential services. Zero guesswork.
          </p>
```

- [ ] **Step 4: Delete the hardcoded CTA card**

Remove the entire `{/* CTA card */}` block — the comment and the `<a href="#contact" ...>...</a>` element that follows it (currently lines 115–126), ending just before the closing `</div>` of the bento grid. Nothing replaces it; `credit-monitoring` fills that slot.

- [ ] **Step 5: Verify build and lint**

```bash
npm run lint
npm run build
```

Expected: lint shows the 6-error baseline only. Build succeeds.

- [ ] **Step 6: Manual browser check at three breakpoints**

`npm run dev`, open `/`, scroll to "Everything Your Business Needs":
- **`lg` (≥1024px, e.g. 1440px wide):** exactly 5 cards. One large "Business Setup" card on the left spanning the full 2-row height; a 2×2 block of compact cards on the right in order Visual Identity, Data Aggregator, Credit Bureau Injection, Business Credit Monitoring. **No empty cell, no third row, no card overflowing below the featured card.** No "Not sure where to start?" card anywhere.
- **`sm`/`md` (768px):** cards stack in a single column, all 5 present, no layout break.
- **Icons:** each compact card shows a *different* icon in its top-right — layers, database, credit-card, radar. If two cards show the same building icon, Step 2 was not applied.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/ServicesSection.tsx
git commit -m "feat(home): show 5 services in bento grid, fix icon slug map and count copy

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: TrustBar — new items

No dependencies. Can run at any time.

**Files:**
- Modify: `src/components/home/TrustBar.tsx:1-9` (imports + `TRUST_ITEMS`)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

**Do not change any markup below line 9.** The desktop row, the mobile marquee, the separator dots, and the `aria-hidden` icons all stay exactly as they are.

- [ ] **Step 1: Replace the import**

```tsx
import { Star, FileText, Layers, Database, CreditCard } from "lucide-react";
```

`Building2`, `Calculator`, and `Scale` are dropped (no longer referenced).

- [ ] **Step 2: Replace `TRUST_ITEMS` wholesale**

```tsx
const TRUST_ITEMS = [
  { icon: Star, label: "5-Star Rated" },
  { icon: FileText, label: "LLC & Corp Formation" },
  { icon: Layers, label: "Brand Presence" },
  { icon: Database, label: "Visibility" },
  { icon: CreditCard, label: "Establish Credit" },
];
```

"NGV Company" is removed and **not** replaced. "Visible Compliance" becomes "Visibility". `Layers`/`Database`/`CreditCard` are reused 1:1 from the matching services' own `icon` fields.

- [ ] **Step 3: Verify build and lint**

```bash
npm run lint
npm run build
```

Expected: lint shows the 6-error baseline only. In particular **no** unused-import error — if you see `'Building2' is defined but never used`, you left a stale import.

- [ ] **Step 4: Manual browser check, desktop and mobile**

`npm run dev`, open `/`:
- **Desktop (≥640px):** the bar under the hero reads `5-STAR RATED · LLC & CORP FORMATION · BRAND PRESENCE · VISIBILITY · ESTABLISH CREDIT`, in that order, on one line, with 4 separator dots (none trailing). "NGV COMPANY" is gone.
- **Mobile (<640px, e.g. 390px):** the marquee scrolls smoothly and loops seamlessly with no visible jump at the wrap point (the list is duplicated and the `marquee` keyframe translates `-50%`, so 5 items must still loop cleanly).

- [ ] **Step 5: Commit**

```bash
git add src/components/home/TrustBar.tsx
git commit -m "feat(home): drop NGV Company from trust bar and relabel remaining items

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: SolutionsSection — photo bento grid

**Depends on Task 1** (images must be tracked).

**Files:**
- Modify: `src/components/home/SolutionsSection.tsx` (whole file — rewrite below)

**Interfaces:**
- Consumes: `solutions: Solution[]` prop (all 8, unchanged shape); `public/images/bento/<slug>.png` from Task 1.
- Produces: nothing consumed by other tasks.

**Key mechanics:**
- Featured tiles are **computed**, not stored. Top 2 *active* solutions by parsed price → currently Custom Jewelry ($22,000) and Plumber ($18,500). If prices change in `src/data/solutions.ts` the featured tiles follow automatically.
- `next/image` with `fill` requires a positioned ancestor — the `<a>` carries `relative overflow-hidden`.
- The `<li>` is the grid item, so all `col-span` / `row-span` classes go on the `<li>`, never the `<a>`.
- Photos are decorative: `alt=""`. The accessible name stays on the existing `aria-label` of the `<a>`. The gradient div is `aria-hidden="true"`.
- Do **not** add `priority` to any image — this section is below the fold.

- [ ] **Step 1: Replace the whole file with this**

```tsx
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/types";

const TAG_COLORS: Record<string, string> = {
  "Biometric Tech": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Event Tech": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "E-Commerce": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Service Tech": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Field Service Tech": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Fashion Tech": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Luxury Tech": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Coming Soon": "bg-white/10 text-white/50 border-white/20",
};

function tagClass(tag: string): string {
  return TAG_COLORS[tag] ?? "bg-white/10 text-white/50 border-white/20";
}

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

interface SolutionsSectionProps {
  solutions: Solution[];
}

export function SolutionsSection({ solutions }: SolutionsSectionProps) {
  const featuredSlugs = new Set(
    solutions
      .filter((s) => s.status === "active")
      .slice()
      .sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
      .slice(0, 2)
      .map((s) => s.slug)
  );

  return (
    <section
      id="solutions"
      className="py-20 sm:py-28"
      aria-labelledby="solutions-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="solutions-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Business Solutions
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Complete tech stacks for specific business types. Pick your business,
            we build the empire.
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[190px] [grid-auto-flow:dense]"
        >
          {solutions.map((solution) => {
            const isWaitlist = solution.status === "waitlist";
            const isFeatured = featuredSlugs.has(solution.slug);

            return (
              <li
                key={solution.slug}
                className={[
                  "relative flex min-h-[190px]",
                  isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : "",
                ].join(" ")}
              >
                <a
                  href={isWaitlist ? "#contact" : `/solutions/${solution.slug}`}
                  className={[
                    "group relative flex w-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    isWaitlist
                      ? "cursor-default border-white/8"
                      : "border-white/10 hover:border-white/25 hover:-translate-y-0.5",
                  ].join(" ")}
                  aria-label={`${solution.name}${isWaitlist ? " — Coming Soon" : ` — ${solution.price}`}`}
                >
                  <Image
                    src={`/images/bento/${solution.slug}.png`}
                    alt=""
                    fill
                    sizes={
                      isFeatured
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    }
                    className={[
                      "z-0 object-cover",
                      isWaitlist ? "grayscale-[0.4] opacity-90" : "",
                    ].join(" ")}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-0 bg-linear-to-t from-void/95 via-void/55 to-void/15"
                  />

                  <span
                    className={[
                      "relative z-10 mb-4 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm",
                      tagClass(solution.tag),
                    ].join(" ")}
                  >
                    {solution.tag}
                  </span>

                  <h3 className="relative z-10 font-heading text-base font-semibold text-white">
                    {solution.name}
                  </h3>

                  <p className="relative z-10 mt-1.5 flex-1 text-sm leading-relaxed text-white/70">
                    {solution.shortDescription}
                  </p>

                  <div className="relative z-10 mt-5 flex items-end justify-between">
                    <span
                      className={[
                        "text-lg font-bold",
                        isWaitlist ? "text-white/50" : "text-white",
                      ].join(" ")}
                    >
                      {solution.price}
                    </span>
                    {isWaitlist ? (
                      <span className="text-xs font-semibold text-white/50">
                        Join Waitlist
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary-sky transition-all duration-200 group-hover:gap-2">
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </a>

                {isWaitlist && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm"
                  >
                    Coming Soon
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run lint
npm run build
```

Expected: lint shows the 6-error baseline only. Build succeeds. If lint reports `@next/next/no-img-element`, you used a raw `<img>` instead of `next/image`.

- [ ] **Step 3: Manual browser check at three breakpoints**

`npm run dev`, open `/`, scroll to "Business Solutions":
- **`lg` (1440px):** 4-column grid, 190px row height. **Custom Jewelry** and **Plumber** are the two large tiles (2 cols × 2 rows each); the other six are single-cell. `[grid-auto-flow:dense]` should leave **no holes** in the grid — if you see a gap, report it rather than hand-tuning the order.
- **`sm` (768px):** 2 columns; Custom Jewelry and Plumber span both columns.
- **mobile (390px):** single column, every tile ≥190px tall, photo fills the tile with no letterboxing or stretching.
- **Every tile shows its photo.** A blank/black tile means a filename mismatch — check `public/images/bento/<slug>.png`.
- **Kurbside** is visibly desaturated/dimmed, shows the "Coming Soon" pill top-right, price reads "TBD", and links to `#contact`.
- **Hover** a non-waitlist tile: border brightens and the card lifts slightly. **Tab** to a tile: a visible blue focus ring surrounds the whole card.

- [ ] **Step 4: Contrast check (WCAG 2.1 AA — mandatory)**

The gradient is darkest at the bottom (`from-void/95`) and lightest at the top (`to-void/15`), so the **tag badge and the H3 sit over the lightest part of the overlay**. On every one of the 8 tiles, verify with axe DevTools (or an eyedropper contrast check) that:
- tag badge text ≥ 4.5:1 against what is actually behind it,
- H3 white text ≥ 4.5:1,
- the description paragraph (`text-white/70`) ≥ 4.5:1.

**If any tile fails**, apply this pre-approved mitigation (it does not alter the spec's gradient): add a second flat scrim immediately after the gradient div —

```tsx
                  <div aria-hidden="true" className="absolute inset-0 z-0 bg-void/25" />
```

Re-check, and note in the commit message that the scrim was needed.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/SolutionsSection.tsx
git commit -m "feat(home): convert business solutions grid to photo bento layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 8: Pricing data + `PricingSelector` client component

**Depends on Task 2.**

**Files:**
- Create: `src/data/pricing.ts`
- Create: `src/components/pricing/PricingSelector.tsx`
- Create: `src/components/pricing/index.ts`

**Interfaces:**
- Consumes: `Service` type with `price` / `priceType` (Task 2); `Button` from `@/components/ui`.
- Produces:
  - `export const BUNDLE_PRICE: number` and `export const MONITORING_FREE_MONTHS: number` from `@/data/pricing` — **Task 10 imports `BUNDLE_PRICE`.**
  - `export function PricingSelector(props: { services: Service[] }): JSX.Element` re-exported from `@/components/pricing` — **Task 9 renders it.**

**Notes for the implementer:**
- `services` arrives as a prop (the page owns data access); the two bundle constants are imported directly. That split is intentional and is exactly what the spec calls for.
- Every derived figure is computed. With current placeholder prices: `oneTimeTotal` = 799+1299+549+1499 = **$4,146**, `savings` = 4146 − 2999 = **$1,147**. Do not hardcode either. The badge renders the dollar amount only — no percentage (see Open Question 8).
- All 5 checkboxes start **checked**.
- Checkboxes are real `<input type="checkbox">` with a `<label htmlFor>`. Do not fake them with divs.
- The running-total region is `aria-live="polite"`.
- `formatCurrency` is a small local helper duplicating the `Intl.NumberFormat` pattern in `PaymentCalculator.tsx`. Two call sites do not justify a shared util — do not extract one.

- [ ] **Step 1: Create `src/data/pricing.ts`**

```ts
export const BUNDLE_PRICE = 2999;          // USD, one-time
export const MONITORING_FREE_MONTHS = 3;   // months of credit-monitoring included free in the bundle
```

- [ ] **Step 2: Create `src/components/pricing/PricingSelector.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui";
import { BUNDLE_PRICE, MONITORING_FREE_MONTHS } from "@/data/pricing";
import type { Service } from "@/types";

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

interface PricingSelectorProps {
  services: Service[];
}

export function PricingSelector({ services }: PricingSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(services.map((s) => s.slug))
  );

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  const oneTimeTotal = services
    .filter((s) => s.priceType === "one-time")
    .reduce((sum, s) => sum + s.price, 0);
  const savings = oneTimeTotal - BUNDLE_PRICE;

  const selectedOneTime = services
    .filter((s) => s.priceType === "one-time" && selected.has(s.slug))
    .reduce((sum, s) => sum + s.price, 0);
  const selectedMonthly = services
    .filter((s) => s.priceType === "monthly" && selected.has(s.slug))
    .reduce((sum, s) => sum + s.price, 0);

  const monitoring = services.find((s) => s.priceType === "monthly");

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      {/* Bundle hero card */}
      <div className="rounded-2xl border border-blue-400/30 bg-linear-to-br from-blue-500/25 to-blue-500/8 p-6 backdrop-blur-md sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-2xl font-bold text-white">
            The Complete Bundle
          </h3>
          {savings > 0 && (
            <span className="shrink-0 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              Save ${savings.toLocaleString()}
            </span>
          )}
        </div>

        <p className="mt-6 font-heading text-5xl font-bold text-white">
          {formatCurrency(BUNDLE_PRICE)}
          <span className="ml-2 text-base font-normal text-white/50">
            one-time
          </span>
        </p>
        <p className="mt-2 text-sm text-white/50">
          <span className="line-through">{formatCurrency(oneTimeTotal)}</span>{" "}
          if purchased separately
        </p>

        <ul role="list" className="mt-6 space-y-2">
          {services.map((s) => (
            <li
              key={s.slug}
              className="flex items-start gap-2 text-sm text-white/80"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden="true"
              />
              {s.name}
            </li>
          ))}
        </ul>

        {monitoring && (
          <p className="mt-6 text-xs leading-relaxed text-white/55">
            {monitoring.name} is included free for your first{" "}
            {MONITORING_FREE_MONTHS} months, then billed at{" "}
            {formatCurrency(monitoring.price)}/mo.
          </p>
        )}

        <Button href="/contact" variant="primary" className="mt-6 w-full">
          Get the Bundle
        </Button>
      </div>

      {/* À la carte checklist */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
        <h3 className="font-heading text-2xl font-bold text-white">
          Build Your Own
        </h3>
        <p className="mt-2 text-sm text-white/60">
          Uncheck anything you don&apos;t need. Every service is available on its
          own.
        </p>

        <ul role="list" className="mt-6 space-y-1">
          {services.map((s) => {
            const inputId = `pricing-${s.slug}`;
            return (
              <li key={s.slug}>
                <label
                  htmlFor={inputId}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={selected.has(s.slug)}
                      onChange={() => toggle(s.slug)}
                      className="h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                    />
                    <span className="text-sm text-white/85">{s.name}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-white">
                    {formatCurrency(s.price)}
                    {s.priceType === "monthly" && (
                      <span className="font-normal text-white/50">/mo</span>
                    )}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div
          aria-live="polite"
          className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Your total
          </p>
          <p className="mt-1 font-heading text-3xl font-bold text-white">
            {formatCurrency(selectedOneTime)}
            {selectedMonthly > 0 && (
              <span className="text-lg font-normal text-white/70">
                {" "}
                + {formatCurrency(selectedMonthly)}/mo
              </span>
            )}
          </p>
        </div>

        <p className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          Net-30 terms available on individual services
        </p>

        <Button href="/contact" variant="secondary" className="mt-6 w-full">
          Talk to Us About This Mix
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the barrel `src/components/pricing/index.ts`**

```ts
export { PricingSelector } from "./PricingSelector";
```

- [ ] **Step 4: Verify types, lint, build**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: `tsc` clean; lint shows the 6-error baseline only; build succeeds with 27 routes (no new route yet — `/pricing` arrives in Task 9). **There is no browser verification in this task** — the component is not mounted anywhere until Task 9. That is expected; type-check + lint are this task's gate.

- [ ] **Step 5: Commit**

```bash
git add src/data/pricing.ts src/components/pricing
git commit -m "feat(pricing): add bundle constants and PricingSelector client component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 9: `/pricing` route

**Depends on Task 8** (and transitively Task 2).

**Files:**
- Create: `src/app/pricing/page.tsx`

**Interfaces:**
- Consumes: `getAllServices()` from `@/data/services`; `PricingSelector` from `@/components/pricing`; `Button` from `@/components/ui`.
- Produces: the route `/pricing`. **Task 10 links to it.**

Sections live inline in the page file — this matches `src/app/financing/page.tsx`, which does not use a components subfolder for simple static sections. Do not create `src/components/pricing/PricingHero.tsx` etc.

- [ ] **Step 1: Create the file**

```tsx
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/data/services";
import { PricingSelector } from "@/components/pricing";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing | GetBizii",
  description:
    "Bundle every GetBizii service into one discounted package, or pick individual services à la carte. Net-30 terms are available on individual services.",
};

export default function PricingPage() {
  const services = getAllServices();

  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="pricing-hero-heading"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-sky">
          Service Pricing
        </p>
        <h1
          id="pricing-hero-heading"
          className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Bundle It.
          <br />
          <span className="text-primary-sky">Or Pick Your Pieces.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          Take every GetBizii service as one discounted bundle, or choose only
          the pieces your business needs right now. Net-30 terms are available
          on individual services.
        </p>
      </section>

      {/* Selector */}
      <section
        className="pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="pricing-selector-heading"
      >
        <h2 id="pricing-selector-heading" className="sr-only">
          Bundle and à la carte pricing
        </h2>
        <PricingSelector services={services} />
      </section>

      {/* CTA */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="pricing-cta-heading"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-16 text-center backdrop-blur-md sm:px-16">
          <h2
            id="pricing-cta-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Not sure which mix is right?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Book a consultation and we&apos;ll map your goals to the shortest
            path — bundle or à la carte — and set up payment terms that fit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="primary">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/financing" variant="secondary">
              See Financing Options
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint and build**

```bash
npm run lint
npm run build
```

Expected: lint shows the 6-error baseline only. Build succeeds and the route table now lists **28** routes including `○ /pricing`.

- [ ] **Step 3: Manual browser check — rendering and arithmetic**

`npm run dev`, open `/pricing`:
- Two cards side by side at `lg`, stacked at mobile.
- Bundle card: badge reads **`Save $1,147`**; headline price **`$2,999`**; struck-through **`$4,146`**; a 5-item checklist; the free-months line reads "Business Credit Monitoring is included free for your first 3 months, then billed at $49/mo."
- À la carte card: 5 rows, **all checked on load**; prices read `$799`, `$1,299`, `$549`, `$1,499`, `$49/mo`.
- Running total on load: **`$4,146 + $49/mo`**.
- Uncheck "Credit Bureau Injection" → total becomes **`$2,647 + $49/mo`**.
- Uncheck "Business Credit Monitoring" → the `/mo` segment disappears entirely.
- Uncheck everything → **`$0`**.

- [ ] **Step 4: Keyboard and screen-reader check (WCAG 2.1 AA — mandatory)**

- `Tab` reaches every checkbox in DOM order; each shows a visible blue focus ring against the dark card.
- `Space` toggles the focused checkbox and the total updates.
- Clicking anywhere on a row's label toggles that row's checkbox.
- With VoiceOver on, toggling a checkbox causes the "Your total" region to be announced (it is `aria-live="polite"`).
- Run axe DevTools on `/pricing`: **zero critical and zero serious violations**. Pay attention to colour contrast on `text-white/50` (struck-through price) and `text-white/55` (free-months note) — if either flags, bump to `text-white/70`.

- [ ] **Step 5: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat(pricing): add /pricing route with bundle and a la carte selector

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 10: FinancingSection — Net Terms / Service Pricing split

**Depends on Task 9** (`/pricing` must exist before we link to it) and Task 8 (`BUNDLE_PRICE`).

**Files:**
- Modify: `src/components/home/FinancingSection.tsx` (whole file — rewrite below)
- Modify: `src/app/page.tsx:37` (pass the `services` prop)

**Interfaces:**
- Consumes: `BUNDLE_PRICE` from `@/data/pricing`; `Service[]` from Task 2; the unmodified `PaymentCalculator`.
- Produces: `FinancingSection` now requires a `services: Service[]` prop (breaking change to its call site — Step 2 handles it).

**Hard rule: do not touch `src/components/home/PaymentCalculator.tsx`.** Same `BUNDLES`, same 5.9% APR / 24-month maths, same markup. It simply gets nested inside the Net Terms card. The resulting card-inside-a-card border is expected and approved. The Net Terms card will be noticeably taller than the Service Pricing card — also expected; `lg:items-start` keeps the shorter card top-aligned rather than stretching it.

- [ ] **Step 1: Replace the whole of `src/components/home/FinancingSection.tsx`**

```tsx
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PaymentCalculator } from "./PaymentCalculator";
import { Button } from "@/components/ui";
import { BUNDLE_PRICE } from "@/data/pricing";
import type { Service } from "@/types";

const FINANCING_PERKS = [
  "Monthly plans from $399/mo",
  "No hard credit pull",
  "24hr approval decisions",
  "0% interest for qualifying applicants",
  "Revenue share options available",
];

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

interface FinancingSectionProps {
  services: Service[];
}

export function FinancingSection({ services }: FinancingSectionProps) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="financing-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="financing-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Flexible Financing
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Launch your business without draining your savings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Left: Net Terms — installments on Business Solution builds */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
            <h3 className="font-heading text-2xl font-bold text-white">
              Net Terms
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Installment plans for full Business Solution builds.
            </p>

            <ul role="list" className="mt-6 space-y-3">
              {FINANCING_PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white/80">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PaymentCalculator />
            </div>
          </div>

          {/* Right: Service Pricing — bundle or a la carte, net-30 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
            <h3 className="font-heading text-2xl font-bold text-white">
              Service Pricing
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Bundle everything or pick individual services — net-30 terms
              available.
            </p>

            <ul role="list" className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug} className="flex items-center gap-3">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-primary-sky"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white/80">{service.name}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-heading text-3xl font-bold text-white">
              Bundle from {formatCurrency(BUNDLE_PRICE)}
            </p>

            <Button href="/pricing" variant="primary" className="mt-6 w-full">
              See Full Pricing
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Pass the prop from the homepage**

In `src/app/page.tsx`, change the single line

```tsx
        <FinancingSection />
```

to

```tsx
        <FinancingSection services={services} />
```

`const services = getAllServices();` already exists at the top of that component — do not add a second data call.

- [ ] **Step 3: Verify types, lint, build**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: `tsc` clean (if you skipped Step 2 you will get `Property 'services' is missing`); lint shows the 6-error baseline only; build succeeds with 28 routes.

- [ ] **Step 4: Manual browser check**

`npm run dev`, open `/`, scroll to "Flexible Financing":
- **`lg`:** two cards side by side. Left = "Net Terms" with the 5 perks and the Payment Calculator nested inside it. Right = "Service Pricing" with the 5 service names, "Bundle from $2,999", and a full-width "See Full Pricing" button. The right card is shorter and top-aligned — correct.
- **mobile:** cards stack; the calculator is still fully usable (select a bundle, monthly figure updates).
- Click **"See Full Pricing"** → navigates to `/pricing`. Click **"Apply for Financing →"** inside the calculator → jumps to `#contact` (unchanged behaviour).
- `Tab` through the section: perk list is not focusable, the calculator `<select>` is, both buttons are, and each focusable element shows a visible blue ring.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/FinancingSection.tsx src/app/page.tsx
git commit -m "feat(home): split financing section into Net Terms and Service Pricing paths

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 11: Re-scope `/financing` copy to Business Solutions

No code dependencies — copy-only. Can run at any time.

**Files:**
- Modify: `src/app/financing/page.tsx:5-9` (metadata), `:11-36` (`HOW_IT_WORKS`), `:38-45` (`BENEFITS`), `:66-70` (hero subtext)

**Interfaces:**
- Consumes/produces: nothing. Structure, buttons, and the "Browse Solutions" CTA all stay exactly as they are.

The page currently promises financing for "all packages" and "all services and solution builds". With `/pricing` now owning service pricing (net-30), `/financing` must speak only to **Business Solution builds**.

- [ ] **Step 1: Re-scope the metadata description**

```ts
export const metadata: Metadata = {
  title: "Financing | GetBizii",
  description:
    "Split your GetBizii Business Solution build into manageable monthly payments. Flexible installment financing with fast approvals and no hard credit pull.",
};
```

- [ ] **Step 2: Re-scope `HOW_IT_WORKS` steps 01 and 04**

Replace step `"01"` in full:

```ts
  {
    step: "01",
    title: "Choose Your Business Solution",
    description:
      "Select any GetBizii Business Solution build. Financing is available for builds above $2,500.",
  },
```

Replace step `"04"`'s description only:

```ts
      "Work on your Business Solution build begins immediately upon approval. You don't wait to start while payments are arranged.",
```

Steps `"02"` and `"03"` are unchanged.

- [ ] **Step 3: Re-scope the `BENEFITS` list**

```ts
const BENEFITS = [
  "No large upfront payment required",
  "Fixed monthly payments with no hidden fees",
  "Available on every Business Solution build",
  "Work begins immediately upon approval",
  "Terms from 3 to 12 months",
  "Soft credit check for initial qualification",
];
```

Only the third entry changes.

- [ ] **Step 4: Re-scope the hero subtext**

Replace the hero `<p>` body with:

```tsx
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          Your Business Solution build shouldn&apos;t be delayed by cash flow.
          GetBizii offers flexible installment financing so you can start
          building the right way — today — and spread the investment over time.
        </p>
```

- [ ] **Step 5: Re-scope the two remaining "package" references**

In the "Example Payment Schedules" cards, change `on a {amount} package` to:

```tsx
                <p className="text-sm text-white/50 mt-1">
                  on a {amount} build
                </p>
```

In the closing CTA paragraph, change `We'll match you with the right package and payment plan for your situation.` to `We&apos;ll match you with the right Business Solution and payment plan for your situation.`

- [ ] **Step 6: Verify lint and build**

```bash
npm run lint
npm run build
```

Expected: lint shows the 6-error baseline only (watch for a new `react/no-unescaped-entities` if you typed a bare `'` instead of `&apos;`). Build succeeds.

- [ ] **Step 7: Manual browser check**

`npm run dev`, open `/financing`. Search the rendered page (Cmd-F) for the word "package" — **there should be zero matches**. Confirm both hero buttons and both CTA buttons still work, and that the page layout is visually unchanged apart from the wording.

- [ ] **Step 8: Commit**

```bash
git add src/app/financing/page.tsx
git commit -m "docs(financing): re-scope financing page copy to Business Solution builds

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 12: Full-site verification and accessibility pass

**Depends on Tasks 1–11.** No code is written unless a check fails.

**Files:**
- Modify: only whatever a failing check forces you to fix.

- [ ] **Step 1: Clean build and route count**

```bash
rm -rf .next
npm run build
```

Expected: succeeds. Route table lists **28** routes. `● /services/[slug]` prerenders **5** paths including `/services/credit-monitoring`. `○ /pricing` is present and static. `● /solutions/[slug]` still prerenders 8.

- [ ] **Step 2: Lint delta**

```bash
npm run lint
```

Expected: **exactly** the 6-error / 1-warning baseline listed in Global Constraints. Any additional problem must be fixed before this task closes.

- [ ] **Step 3: Homepage walkthrough**

`npm run dev`, open `/` at 1440px, 768px, and 390px. Confirm in order down the page:
1. Hero unchanged.
2. TrustBar: 5 items, no "NGV Company", mobile marquee loops smoothly.
3. Services bento: 5 cards, "Five essential services" subheading, 5 distinct icons, no filler CTA card, no empty grid cell at `lg`.
4. Solutions bento: 8 photo tiles, Custom Jewelry + Plumber large, Kurbside desaturated with the "Coming Soon" pill, no blank tiles.
5. Financing: two cards, calculator nested left, "Bundle from $2,999" right.

- [ ] **Step 4: Link integrity**

Click through and confirm each lands on a real page (no 404, no `#` dead-end):
`/` → Business Credit Monitoring card → `/services/credit-monitoring`; `/` → "See Full Pricing" → `/pricing`; `/pricing` → "Get the Bundle" → `/contact`; `/pricing` → "See Financing Options" → `/financing`; `/` → any solution tile → `/solutions/<slug>`; `/` → Kurbside tile → `#contact` anchor on the homepage.

Then the Task 13 navigation links, from **any** page (the navbar and footer are in `RootLayout`, so they must work everywhere): navbar Services dropdown → Business Credit Monitoring → `/services/credit-monitoring`; navbar → Pricing → `/pricing`; footer Services column → Business Credit Monitoring; footer Company column → Pricing. Repeat the two navbar checks with the mobile menu open at 390px.

- [ ] **Step 5: Keyboard-only pass**

With the mouse untouched, `Tab` from the top of `/` to the footer. Every interactive element must be reachable, in a sensible order, with a clearly visible focus indicator. Repeat on `/pricing`, driving all 5 checkboxes with `Space`. Confirm the skip link still appears as the very first `Tab` stop on both pages.

- [ ] **Step 6: axe DevTools audit**

Run axe DevTools on `/`, `/pricing`, `/financing`, and `/services/credit-monitoring`. **Zero critical and zero serious violations on all four** — this is the minimum bar per the project's ADA standard. Expect the most likely findings to be colour-contrast on bento tile text (mitigation in Task 7 Step 4) and on the low-opacity helper text in `PricingSelector` (bump to `text-white/70`).

- [ ] **Step 7: Commit any fixes**

If Steps 1–6 produced no changes, skip this step. Otherwise:

```bash
git add -A
git commit -m "fix(a11y): resolve contrast and focus findings from full-site verification pass

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 13: Navbar and Footer — global navigation coverage

**Depends on Task 2** (the `credit-monitoring` slug and the "Business Credit Monitoring" name) **and Task 9** (`/pricing` must exist before we link to it from global navigation). **Run this after Task 11 and before Task 12.**

Approved by the user on 2026-07-25 in answer to Open Question 5. `src/components/Navbar.tsx:18-23` and `src/components/Footer.tsx:30-36` both hardcode the 4 old services, and after Task 9 nothing in global navigation points at `/pricing`.

**Files:**
- Modify: `src/components/Navbar.tsx:8` (lucide import), `:18-23` (`serviceLinks`), `:25-29` (`topLevelLinks`), and the desktop `<ul>` (insert one new `<li>` between the Services dropdown item and the About item)
- Modify: `src/components/Footer.tsx:21-26` (Company column links), `:30-36` (Services column links)

**Interfaces:**
- Consumes: the route `/services/credit-monitoring` (generated by Task 2 via `generateStaticParams`) and the route `/pricing` (Task 9).
- Produces: nothing consumed by other tasks. Task 12 Step 4 verifies these links.

**Scope guards — read before editing:**
- **Do not restructure the Navbar.** No changes to the scroll-hide effect, the outside-click handler, the Escape handling, the focus trap, or the framer-motion animations. You are adding one array entry, one array entry, and one `<li>`.
- `topLevelLinks` currently drives **only the mobile menu** (it is rendered with `.filter(l => l.label !== "Home")`). The desktop links are hardcoded as JSX. That is why Pricing must be added in **two** places to appear in both.
- `Footer.tsx` has no `"use client"` and must stay a Server Component. Its `FooterLink` helper already routes `/#`-prefixed hrefs to a plain `<a>` and everything else to `next/link` — `/pricing` and `/services/credit-monitoring` both take the `next/link` branch automatically. Do not touch that helper.

- [ ] **Step 1: Add `Radar` to the Navbar lucide import**

Replace line 8 of `src/components/Navbar.tsx` with:

```tsx
import { ChevronDown, X, Menu, Building2, CreditCard, Database, Layers, Radar } from "lucide-react";
```

`Radar` matches the `icon` field on the `credit-monitoring` service, keeping the dropdown consistent with `ServicesSection.getIcon()` (Task 5) and `ServiceHero`/`RelatedServices` (Task 4).

- [ ] **Step 2: Add Business Credit Monitoring to `serviceLinks`**

Replace the whole `serviceLinks` array (lines 18–23) with:

```tsx
const serviceLinks: ServiceLink[] = [
  { label: "Business Setup", tagline: "Register & launch your business", href: "/services/biz-setup", Icon: Building2 },
  { label: "Credit Bureau Injection", tagline: "Build fundable business credit", href: "/services/credit-bureau", Icon: CreditCard },
  { label: "Business Credit Monitoring", tagline: "Track every change to your file", href: "/services/credit-monitoring", Icon: Radar },
  { label: "Data Aggregator", tagline: "Get found on every directory", href: "/services/data-aggregator", Icon: Database },
  { label: "Visual Identity", tagline: "Brand design that earns trust", href: "/services/visual-identity", Icon: Layers },
];
```

The new entry sits directly after Credit Bureau Injection so the two credit services read as a pair (build, then monitor). The existing four entries are byte-for-byte unchanged. The tagline is written in the established 5-word house style rather than reusing the service's longer marketing tagline, which would wrap in the dropdown.

- [ ] **Step 3: Add Pricing to `topLevelLinks` (this is the mobile menu)**

Replace lines 25–29 with:

```tsx
const topLevelLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
```

Pricing goes before About so that, once "Home" is filtered out and the Services group is rendered above this list, the mobile order matches the desktop order you build in Step 4: Home → Services → Pricing → About → Contact.

- [ ] **Step 4: Add the desktop Pricing link**

In the desktop `<ul className="hidden md:flex items-center gap-1" role="list">`, insert this `<li>` **immediately after the closing `</li>` of the Services dropdown list item** (the one whose `<li>` carries `className="relative"` and contains the `<AnimatePresence>` block) and **immediately before the `<li>` containing the About link**:

```tsx
            <li>
              <Link
                href="/pricing"
                aria-current={pathname === "/pricing" ? "page" : undefined}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  pathname === "/pricing" ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                Pricing
              </Link>
            </li>
```

This is the About link's markup with `/pricing` and `Pricing` substituted — same classes, same `aria-current` pattern, same focus ring. Use `next/link` (already imported), **not** a raw `<a>`: a literal `<a href="/pricing">` would add a 7th `@next/next/no-html-link-for-pages` lint error.

- [ ] **Step 5: Add Business Credit Monitoring to the Footer Services column**

In `src/components/Footer.tsx`, replace the Services section's `links` array (lines 30–36) with:

```tsx
    links: [
      { label: "Business Setup", href: "/services/biz-setup" },
      { label: "Credit Bureau Injection", href: "/services/credit-bureau" },
      { label: "Business Credit Monitoring", href: "/services/credit-monitoring" },
      { label: "Data Aggregator", href: "/services/data-aggregator" },
      { label: "Visual Identity", href: "/services/visual-identity" },
      { label: "Business Solutions", href: "/#solutions" },
    ],
```

Same ordering rationale as the navbar; "Business Solutions" stays last because it is a section anchor, not a service.

- [ ] **Step 6: Add Pricing to the Footer Company column**

Replace the Company section's `links` array (lines 21–26) with:

```tsx
    links: [
      { label: "About", href: "/about" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Pricing", href: "/pricing" },
      { label: "Financing", href: "/financing" },
      { label: "Partners", href: "/partners" },
    ],
```

Pricing sits next to Financing since they are the two money pages.

- [ ] **Step 7: Verify types, lint and build**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected:
- `tsc`: clean.
- `lint`: still **exactly 6 errors + 1 warning**. ⚠️ **The three pre-existing `@next/next/no-html-link-for-pages` errors in `Navbar.tsx` will now be reported at higher line numbers** (they all sit below your insertion points, so they shift down by however many lines you added — roughly 14). Those are the *same* three errors, not new ones. Verify by **total count and by rule + file**, never by line number. If the total climbs to 7, you used a raw `<a>` somewhere in Step 4.
- `build`: succeeds, still **28** routes (this task adds no routes).

- [ ] **Step 8: Manual browser check — desktop**

`npm run dev`, open `/` at 1440px:
- The navbar pill reads **Home · Services · Pricing · About · Contact**, with the "Get Started" button still on the far right and the logo still on the far left. The pill must not wrap or overflow at 1024px — check that breakpoint specifically, since you just added a 5th link to a fixed-width rounded container.
- Hover (or click) **Services**: the dropdown now lists **5** items in order Business Setup, Credit Bureau Injection, Business Credit Monitoring, Data Aggregator, Visual Identity. Business Credit Monitoring shows a radar icon and the tagline "Track every change to your file". The dropdown still closes on outside click and on `Escape`.
- Click **Business Credit Monitoring** → lands on `/services/credit-monitoring` and the dropdown closes.
- Click **Pricing** → lands on `/pricing`, and while on that page the Pricing link renders in full white (its `aria-current="page"` state). Confirm in DevTools that the element carries `aria-current="page"` on `/pricing` and does not on `/`.
- Scroll down: the navbar still auto-hides, and scrolling back up still reveals it.

- [ ] **Step 9: Manual browser check — mobile**

Resize to 390px:
- Open the hamburger menu. It lists: Home, then a "SERVICES" group of **5** links, then **Pricing**, **About**, **Contact**, then the "Get Started" button.
- Tapping Business Credit Monitoring navigates and closes the menu. Tapping Pricing navigates and closes the menu.
- Body scroll is still locked while the menu is open and released when it closes.

- [ ] **Step 10: Footer check**

Scroll to the footer on any page:
- **Services** column lists 6 links, with Business Credit Monitoring third.
- **Company** column lists 5 links, with Pricing third.
- Both new links navigate correctly (they are `next/link`, so navigation is client-side with no full reload).

- [ ] **Step 11: Keyboard and accessibility pass (WCAG 2.1 AA — mandatory)**

- `Tab` through the desktop navbar: Home → Services (button) → **Pricing** → About → Contact → Get Started. Each stop shows a visible blue focus ring. The new Pricing link must not be skipped or trapped.
- Open the Services dropdown with `Enter`/`Space` on the Services button, `Tab` through all 5 items, press `Escape` — the dropdown closes **and focus returns to the Services button**. This is existing behaviour that must survive your edit.
- Open the mobile menu: focus moves to the first link, `Tab` cycles within the menu, `Escape` closes it and returns focus to the hamburger button.
- Run axe DevTools on `/` and on `/pricing`: **zero critical and zero serious violations**. Confirm no new "duplicate link name" or nested-interactive findings from the added markup.

- [ ] **Step 12: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat(nav): add Business Credit Monitoring and Pricing to global navigation

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Open Questions / Spec Gaps

Each of these was verified against the code, not manufactured. Items 1–4 and 6–8 have a **plan default** so no implementer is blocked; item 5 is genuinely blocking for Task 13 only.

1. **Right-hand financing card heading text.** The spec labels it the *"Pricing Page" card* but never gives the rendered `<h3>` string ("Pricing Page" would be odd UI copy). **Plan default: `Service Pricing`**, chosen for parallelism with the left card's `Net Terms`. One-word change if you prefer something else.

2. **How `FinancingSection` gets the 5 service names.** The spec doesn't say whether it should import `getAllServices()` itself or receive a prop. **Plan default: a `services: Service[]` prop, with a one-line change to `src/app/page.tsx`**, matching how `ServicesSection` and `SolutionsSection` already receive their data. This adds `src/app/page.tsx` to the spec's modified-files list. The alternative (direct import, zero extra files) is a one-line swap if preferred.

3. **Bento tile contrast.** The spec's gradient `from-void/95 via-void/55 to-void/15` is lightest at the **top**, which is exactly where the tag badge and H3 sit. Over a bright photo this can fail 4.5:1. **Plan default: keep the spec's gradient, add `backdrop-blur-sm` to the tag badge, and verify with axe (Task 7 Step 4); if any tile fails, add a flat `bg-void/25` scrim.** Flagging because it is an AA risk the spec did not price in.

4. **"Four essential services" subheading.** `ServicesSection.tsx:37` says "One platform. Four essential services. Zero guesswork." The spec's ServicesSection section doesn't mention it, but it becomes factually wrong with 5 services. **Plan default: change "Four" → "Five" (Task 5 Step 3).**

5. **Navbar and Footer are stale — RESOLVED, approved by the user 2026-07-25.** Both hardcode the 4 old services, and nothing anywhere linked to `/pricing` except the new homepage financing card. Outside the original spec, but the user has approved adding **both** Business Credit Monitoring and a Pricing link to global navigation. This is now **Task 13**, fully specified, depending on Task 2 (slug + name) and Task 9 (`/pricing` must exist), and sequenced to run after Task 11 and before the Task 12 verification pass. No open decision remains.

6. **`src/data/services.validate.ts` is stale.** It asserts 4 services and checks slugs `bookkeeping` / `cpa` / `legal` that no longer exist. Not in the spec's file list. **Plan default: refresh it (Task 3)** rather than delete it, since deleting a data contract is a bigger call than the spec authorises. Note it is not executable in this repo (no `ts-node`, and Node's type-stripping can't resolve `@/*`), so it functions as compile-time documentation only.

7. **Icon maps on the service detail page.** `ServiceHero`, `ServiceFeatures`, and `RelatedServices` each have their own `iconMap`; none knows `Radar`, `BellRing`, or `ShieldCheck`, so `/services/credit-monitoring` would ship with a missing hero icon and two wrong feature icons. Not in the spec's file list, but required for the spec's own new service to render. **Plan default: register them (Task 4)**, and while in `RelatedServices` replace its fully stale map (`BookOpen`/`Calculator`/`Briefcase`) with the real service icons — the same bug class the spec explicitly calls out for `ServicesSection.getIcon()`.

8. **The "27%" savings figure.** The spec's badge string is `Save ${savings.toLocaleString()}` — dollars only. Its parenthetical "≈ $1,147 / 27%" is commentary, and `1147 / 4146` actually rounds to **28%**, so rendering a computed percentage would contradict the spec's own note. **Plan default: render `Save $1,147` (dollars only), no percentage.**

Two non-issues confirmed while reading the code, listed so nobody re-opens them:
- `.gitignore` already contains `.superpowers/` — the spec's line item is a no-op.
- `CLAUDE.md` and `README.md` say the dev server runs on `:1111`, but `package.json` runs bare `next dev`, so it binds `:3000`. Pre-existing doc drift, out of scope.
