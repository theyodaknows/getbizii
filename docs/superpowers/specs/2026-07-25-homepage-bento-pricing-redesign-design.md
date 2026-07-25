# Homepage Bento, 5th Service, Financing Split & TrustBar — Design Spec
**Date:** 2026-07-25
**Status:** Approved

---

## Goal

Four coordinated homepage changes:
1. Business Solutions grid becomes a photo-based bento layout, one graphic per niche.
2. "Everything Your Business Needs" gets a 5th service (Business Credit Monitoring) and a defined order.
3. Flexible Financing splits into two paths — Net Terms (installment, for Business Solutions) and a new Pricing page (bundle-or-à-la-carte, net-30, for the 5 services).
4. TrustBar drops "NGV Company" and relabels/reorders the remaining items.

---

## Data Changes

### `src/types/index.ts` — `Service` gains pricing fields

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

No changes to `Solution` — bento tile size is derived at render time from `price`, not stored as data.

### `src/data/services.ts`

1. Reorder `SERVICES` to: `biz-setup`, `visual-identity`, `data-aggregator`, `credit-bureau`, `credit-monitoring` (new, appended last).
2. Add `price` + `priceType` to all 4 existing services (placeholder figures — mark with a one-line comment `// placeholder — replace with real pricing` above the array):
   - `biz-setup`: `price: 799, priceType: "one-time"`
   - `visual-identity`: `price: 1299, priceType: "one-time"`
   - `data-aggregator`: `price: 549, priceType: "one-time"`
   - `credit-bureau`: `price: 1499, priceType: "one-time"`
3. Add the new service:

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
}
```

### New `src/data/pricing.ts`

```ts
export const BUNDLE_PRICE = 2999;          // USD, one-time
export const MONITORING_FREE_MONTHS = 3;   // months of credit-monitoring included free in the bundle
```

Everything else (one-time total, savings amount, savings %) is derived from `getAllServices()` at render time — never hardcode a second copy of numbers that already live on the services.

---

## 1. Business Solutions → Photo Bento Grid (`SolutionsSection.tsx`)

- Cards use the real photos already in `public/images/bento/<slug>.png` (all 8 slugs have a matching file) via `next/image` with `fill` + `object-cover`, layered under a gradient overlay div (`bg-gradient-to-t from-void/95 via-void/55 to-void/15`, using `void` = `#070E1F`) so text stays legible over any photo.
- **Featured tiles:** the top 2 *active* solutions by price get a larger tile. Computed at render time — no new data field:

```ts
function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}
const featuredSlugs = new Set(
  solutions
    .filter((s) => s.status === "active")
    .slice()
    .sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    .slice(0, 2)
    .map((s) => s.slug)
);
```

  With current data this is Custom Jewelry ($22,000) and Plumber ($18,500) — automatically re-computed if prices change, no manual curation.
- **Grid:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[190px] [grid-auto-flow:dense] gap-4`. Featured items get `sm:col-span-2 lg:col-span-2 lg:row-span-2`; compact items get no extra span classes. All cards get `min-h-[190px]`.
- Card content (unchanged behavior, restyled container): tag badge (top-left, existing `TAG_COLORS`), name, price (or "Join Waitlist" for status `waitlist`), "Learn More →" / waitlist badge. Same `href` logic as today (`/solutions/[slug]` vs `#contact`), same `aria-label` pattern, same "Coming Soon" overlay badge for Kurbside.
- Kurbside (waitlist) additionally gets `grayscale-[0.4] opacity-90` on the image so it visually reads as inactive, same as the muted card treatment it has today.
- Text/badges get `relative z-10` to sit above the gradient overlay (`absolute inset-0 z-0`) and the `next/image` (`z-0`).

---

## 2. "Everything Your Business Needs" (`ServicesSection.tsx`)

- No grid restructuring needed. Current grid is `lg:grid-cols-5 lg:grid-rows-2`: featured card (`SERVICES[0]`, `biz-setup`) spans `lg:col-span-3 lg:row-span-2` (6 cells); the remaining 4 cells hold compact cards spanning `lg:col-span-2` each, stacking into implicit rows below the featured card's height.
- Today that's 3 "rest" services + 1 hardcoded "Not sure where to start?" CTA card = 4 compact slots. With 5 services, `rest = services.slice(1)` is now exactly 4 items (`visual-identity`, `data-aggregator`, `credit-bureau`, `credit-monitoring`) — **the CTA card is removed** and the new 5th service fills its slot. No other layout change required.
- **Bug fix while touching this file:** `getIcon()`'s map currently has stale slugs (`bookkeeping`, `cpa`, `legal`) that don't match any real service, so `visual-identity`, `data-aggregator`, and `credit-bureau` all silently fall back to the same `Building2` icon. Fix the map to match real slugs, reusing each service's own `icon` field value for consistency with the TrustBar mapping below:

```ts
const map: Record<string, ...> = {
  "biz-setup": Building2,
  "visual-identity": Layers,
  "data-aggregator": Database,
  "credit-bureau": CreditCard,
  "credit-monitoring": Radar,
};
```

---

## 3. Flexible Financing Split

### `src/components/home/FinancingSection.tsx` (rewrite)

Two side-by-side cards (`grid gap-6 lg:grid-cols-2`), replacing the single copy+calculator layout:

- **Left — "Net Terms" card:** heading, one-line framing ("Installment plans for full Business Solution builds"), the existing `FINANCING_PERKS` list, and the existing `<PaymentCalculator />` embedded inside this card (calculator stays exactly as it is today — same `BUNDLES`, same APR/term math — just now visually scoped inside the Net Terms card instead of floating as a bare right column). This card will naturally be taller than the one beside it; that's expected.
- **Right — "Pricing Page" card:** heading, one-line framing ("Bundle everything or pick individual services — net-30 terms available"), a short list of the 5 service names, a teaser figure ("Bundle from $2,999"), and a primary CTA `Button` → `/pricing`.

### `/financing` page (`src/app/financing/page.tsx`)

Re-scope copy to Business Solutions specifically (it currently says "all packages" / "all services and solution builds"):
- Hero subtext, `BENEFITS` list, and `HOW_IT_WORKS` step copy: replace generic "package" language with "Business Solution build."
- `Browse Solutions` button (already present) stays; no structural changes otherwise.

---

## 4. New `/pricing` Page

### Route: `src/app/pricing/page.tsx` (Server Component)

- `metadata`: title `"Pricing | GetBizii"`, description covering bundle + à la carte + net-30.
- Sections (all inline in the page file, matching the existing `/financing` page's convention of not using a components subfolder for simple static sections):
  1. Hero copy: heading, subtext mentioning net-30 availability.
  2. `<PricingSelector services={getAllServices()} />` — the only interactive piece.
  3. CTA section → `/contact`.

### New `src/components/pricing/` (new domain folder, barrel `index.ts`, matching the `services/`/`solutions/`/`ui/` convention)

**`PricingSelector.tsx`** (`"use client"`):
- Props: `services: Service[]` (all 5 — passed from the page so this stays a pure presentational component with no data import of its own).
- **Bundle hero card:** `BUNDLE_PRICE` from `src/data/pricing.ts`; savings computed as `oneTimeTotal - BUNDLE_PRICE` where `oneTimeTotal = services.filter(s => s.priceType === "one-time").reduce((sum, s) => sum + s.price, 0)`; savings badge shows `Save ${savings.toLocaleString()}` (≈ $1,147 / 27% with current placeholder prices — computed, not hardcoded). Sub-line notes Business Credit Monitoring is included free for `MONITORING_FREE_MONTHS` months, then billed at its normal monthly price.
- **À la carte checklist below:** one row per service (checkbox + name + formatted price, `/mo` suffix when `priceType === "monthly"`). **All checkboxes default to checked.** `useState<Set<string>>` of selected slugs, initialized to all slugs.
- **Running total:** sum of `price` for checked one-time services (formatted as currency) `+` `$49/mo`-style suffix if the monitoring service is checked. Unchecking items shows the user their custom total climbing toward (or staying below) the bundle price — makes the bundle's savings self-evident without a hard toggle/tab switch.
- **Net-30 note:** small badge/line near the checklist ("Net-30 terms available on individual services") — this is the payment mechanic for this page, distinct from the installment "Net Terms" path on `/financing`.
- CTA button below the total → `/contact`.
- Currency formatting: reuse the same `Intl.NumberFormat` pattern already in `PaymentCalculator.tsx` (small local helper, not worth extracting to a shared util for two call sites).

---

## 5. TrustBar (`src/components/home/TrustBar.tsx`)

Replace `TRUST_ITEMS` entirely:

```ts
const TRUST_ITEMS = [
  { icon: Star, label: "5-Star Rated" },
  { icon: FileText, label: "LLC & Corp Formation" },
  { icon: Layers, label: "Brand Presence" },
  { icon: Database, label: "Visibility" },
  { icon: CreditCard, label: "Establish Credit" },
];
```

- "NGV Company" is removed (not replaced).
- Icons are reused 1:1 from the matching service's own `icon` field (`Layers` = Visual Identity, `Database` = Data Aggregator, `CreditCard` = Credit Bureau/Monitoring) for visual consistency between the trust bar and the services section.
- Drop now-unused imports `Building2`, `Calculator`, `Scale`; add `Layers`, `Database`.
- No structural changes to the component — same desktop row / mobile marquee markup, same separator dots.

---

## Accessibility

- Bento tiles (Solutions): background photos are decorative (`aria-hidden` on the `<Image>` via empty `alt=""`); the card's own `aria-label` (already present) continues to carry the accessible name. Gradient overlay div is `aria-hidden="true"`.
- `PricingSelector` checkboxes: real `<input type="checkbox">` elements with associated `<label>` (not div/onClick fakes), so they're keyboard-operable and announced correctly. Running total region gets `aria-live="polite"` so screen reader users hear the total update as they toggle checkboxes.
- All new interactive elements: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`, consistent with the rest of the site.
- TrustBar: no accessibility changes needed beyond the existing pattern (icons already `aria-hidden`, labels already text).

---

## Files Changed / Created

**New:**
- `src/data/pricing.ts`
- `src/app/pricing/page.tsx`
- `src/components/pricing/index.ts`
- `src/components/pricing/PricingSelector.tsx`

**Modified:**
- `src/types/index.ts` — add `price`, `priceType` to `Service`
- `src/data/services.ts` — reorder, add pricing fields to 4 existing services, add `credit-monitoring`
- `src/components/home/ServicesSection.tsx` — drop CTA filler card, fix `getIcon()` slug map
- `src/components/home/SolutionsSection.tsx` — photo bento grid, featured-tile logic
- `src/components/home/FinancingSection.tsx` — two-card Net Terms / Pricing Page layout
- `src/components/home/TrustBar.tsx` — new `TRUST_ITEMS`
- `src/app/financing/page.tsx` — re-scope copy to Business Solutions
- `.gitignore` — add `.superpowers/`
