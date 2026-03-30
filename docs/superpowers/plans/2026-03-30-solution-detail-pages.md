# Solution Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/solutions/[slug]` detail page for all 8 business solutions, with hero, features checklist, pricing panel, CTA, and related solutions sections.

**Architecture:** Mirror the existing `src/app/services/[slug]` pattern exactly — new `src/app/solutions/[slug]/page.tsx` with static generation, new components in `src/components/solutions/`, and two optional new fields on the `Solution` type. No existing files are substantially refactored.

**Tech Stack:** Next.js 16 App Router (Server Components, `generateStaticParams`), TypeScript strict, Tailwind CSS v4, lucide-react icons, `@/lib/cn` utility.

---

## File Map

**Modified:**
- `src/types/index.ts` — add `rightForYou?: string[]` and `financingNote?: string` to `Solution`
- `src/data/solutions.ts` — populate new fields for 7 active solutions; add `getRelatedSolutions` helper

**New:**
- `src/app/solutions/[slug]/page.tsx` — route with `generateStaticParams`, `generateMetadata`, page component
- `src/components/solutions/SolutionHero.tsx` — hero section with breadcrumbs, tag, name, price pill, graphic
- `src/components/solutions/SolutionFeatures.tsx` — "What's Built For You" checklist grid
- `src/components/solutions/SolutionPricing.tsx` — two-panel pricing + "right for you" section
- `src/components/solutions/SolutionCTA.tsx` — centered CTA with active/waitlist variants
- `src/components/solutions/RelatedSolutions.tsx` — 3-up related solution cards
- `src/components/solutions/index.ts` — barrel export
- `src/components/solutions/graphics/AppointmentSchedulerGraphic.tsx`
- `src/components/solutions/graphics/RentalCalendarGraphic.tsx`
- `src/components/solutions/graphics/OrderPipelineGraphic.tsx`
- `src/components/solutions/graphics/DetailingJobsGraphic.tsx`
- `src/components/solutions/graphics/DispatchBoardGraphic.tsx`
- `src/components/solutions/graphics/StorefrontMetricsGraphic.tsx`
- `src/components/solutions/graphics/CustomOrderWorkflowGraphic.tsx`
- `src/components/solutions/graphics/ComingSoonGraphic.tsx`

---

## Task 1: Extend the Solution type and data

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/solutions.ts`

- [ ] **Step 1: Add optional fields to the Solution interface**

Open `src/types/index.ts`. Find the `Solution` interface (currently ends at `features: string[]`) and add two optional fields:

```ts
export interface Solution {
  slug: string;
  name: string;
  tag: string;
  price: string;
  status: "active" | "waitlist";
  shortDescription: string;
  features: string[];
  rightForYou?: string[];
  financingNote?: string;
}
```

- [ ] **Step 2: Add `getRelatedSolutions` helper to solutions.ts**

Open `src/data/solutions.ts`. After the existing `getSolutionBySlug` function, add:

```ts
export function getRelatedSolutions(currentSlug: string, count = 3): Solution[] {
  return SOLUTIONS.filter(
    (s) => s.status === "active" && s.slug !== currentSlug
  ).slice(0, count);
}
```

- [ ] **Step 3: Populate `rightForYou` and `financingNote` for the 7 active solutions**

In `src/data/solutions.ts`, add these fields to each active `Solution` object in the `SOLUTIONS` array. Add them after the `features` array. Kurbside gets neither field.

For `mobile-dna-livescanning`:
```ts
financingNote: "Financing available — split your investment into manageable monthly payments.",
rightForYou: [
  "You offer or want to offer DNA collection, livescan, or background checks",
  "You're scheduling appointments manually or via phone",
  "You need HIPAA-compliant document and results delivery",
  "You want a client portal and automated reminders",
],
```

For `party-rental`:
```ts
financingNote: "Financing available — split your investment into manageable monthly payments.",
rightForYou: [
  "You rent party equipment, tents, bounce houses, or event gear",
  "You're managing bookings and availability by phone or spreadsheet",
  "You want to automate deposits, contracts, and delivery scheduling",
  "You're ready to grow beyond word-of-mouth referrals",
],
```

For `print-reseller`:
```ts
financingNote: "Financing available — split your investment into manageable monthly payments.",
rightForYou: [
  "You resell printed products (cards, banners, apparel, signage)",
  "You want a branded storefront without managing inventory",
  "You're routing orders to print suppliers manually",
  "You want to control margins and offer bulk pricing",
],
```

For `mobile-detailing`:
```ts
financingNote: "Financing available — split your investment into manageable monthly payments.",
rightForYou: [
  "You offer mobile or on-site auto detailing services",
  "You're scheduling jobs via text, calls, or social media",
  "You want to automate review requests and upsells",
  "You're ready to take on fleet or B2B clients",
],
```

For `plumber`:
```ts
financingNote: "Financing available — split your investment into manageable monthly payments.",
rightForYou: [
  "You run a plumbing business with one or more technicians",
  "You're managing job requests, estimates, and invoices manually",
  "You want GPS dispatch and digital payment collection in the field",
  "You're ready to offer recurring maintenance plans",
],
```

For `mini-apparel-shop`:
```ts
financingNote: "Financing available — split your investment into manageable monthly payments.",
rightForYou: [
  "You're launching or growing a fashion or apparel brand",
  "You want an online storefront with a lookbook and size guide",
  "You're ready to run promotions and an affiliate program",
  "You want Instagram shop integration from day one",
],
```

For `custom-jewelry`:
```ts
financingNote: "Financing available — split your investment into manageable monthly payments.",
rightForYou: [
  "You create custom or bespoke jewelry on commission",
  "You want to streamline design consultations and approvals",
  "You need certificate of authenticity and layaway management",
  "You work with high-value clients who expect white-glove service",
],
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii" && npm run lint
```

Expected: no errors related to `Solution` type.

- [ ] **Step 5: Commit**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
git add src/types/index.ts src/data/solutions.ts
git commit -m "feat(solutions): extend Solution type with rightForYou/financingNote; add getRelatedSolutions"
```

---

## Task 2: Hero graphic components (8 files)

**Files:**
- Create: `src/components/solutions/graphics/AppointmentSchedulerGraphic.tsx`
- Create: `src/components/solutions/graphics/RentalCalendarGraphic.tsx`
- Create: `src/components/solutions/graphics/OrderPipelineGraphic.tsx`
- Create: `src/components/solutions/graphics/DetailingJobsGraphic.tsx`
- Create: `src/components/solutions/graphics/DispatchBoardGraphic.tsx`
- Create: `src/components/solutions/graphics/StorefrontMetricsGraphic.tsx`
- Create: `src/components/solutions/graphics/CustomOrderWorkflowGraphic.tsx`
- Create: `src/components/solutions/graphics/ComingSoonGraphic.tsx`

All graphics follow this outer shell pattern (identical to `BrandIdentityDocumentGraphic` in `src/components/services/ServiceHero.tsx`):

```tsx
// outer wrapper
<div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
  {/* ambient glow blobs */}
  <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-[COLOR]/15 blur-2xl" />
  <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-[COLOR]/20 blur-2xl" />
  {/* glass panel */}
  <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
    <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
      {/* content */}
    </div>
  </div>
</div>
```

- [ ] **Step 1: Create `AppointmentSchedulerGraphic.tsx`**

```tsx
// src/components/solutions/graphics/AppointmentSchedulerGraphic.tsx
export function AppointmentSchedulerGraphic() {
  const appointments = [
    { time: "9:00 AM", service: "DNA Collection", client: "Johnson", color: "bg-emerald-400" },
    { time: "11:30 AM", service: "Livescan", client: "Martinez", color: "bg-blue-400" },
    { time: "2:00 PM", service: "Background Check", client: "Patel", color: "bg-amber-400" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Appointment Status
          </p>
          <div className="space-y-2">
            {appointments.map((apt) => (
              <div
                key={apt.time}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${apt.color}`} />
                <span className="text-[11px] text-white/40">{apt.time}</span>
                <span className="flex-1 text-xs text-white/80">{apt.service}</span>
                <span className="text-[11px] text-white/50">{apt.client}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1.5 text-center text-[11px] text-emerald-300">
              HIPAA Compliant
            </div>
            <div className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1.5 text-center text-[11px] text-blue-300">
              Results Portal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `RentalCalendarGraphic.tsx`**

```tsx
// src/components/solutions/graphics/RentalCalendarGraphic.tsx
export function RentalCalendarGraphic() {
  const bookedDays = new Set([3, 4, 10, 11, 17, 18]);
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-amber-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-orange-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Availability Calendar
          </p>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day) => (
              <div
                key={day}
                className={`flex h-7 w-full items-center justify-center rounded text-[11px] ${
                  bookedDays.has(day)
                    ? "bg-amber-500/35 text-amber-200"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-center text-[11px] text-amber-300">
              6 Booked
            </div>
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1.5 text-center text-[11px] text-emerald-300">
              15 Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `OrderPipelineGraphic.tsx`**

```tsx
// src/components/solutions/graphics/OrderPipelineGraphic.tsx
export function OrderPipelineGraphic() {
  const orders = [
    { id: "#1042", item: "Business Cards", status: "Sent to Printer", statusColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25" },
    { id: "#1043", item: "Banners × 3", status: "In Production", statusColor: "text-blue-300 bg-blue-500/15 border-blue-500/25" },
    { id: "#1044", item: "T-Shirts × 12", status: "Awaiting Artwork", statusColor: "text-amber-300 bg-amber-500/15 border-amber-500/25" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Order Pipeline
          </p>
          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className="w-10 shrink-0 text-[11px] text-white/30">{order.id}</span>
                <span className="flex-1 text-xs text-white/80">{order.item}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `DetailingJobsGraphic.tsx`**

```tsx
// src/components/solutions/graphics/DetailingJobsGraphic.tsx
export function DetailingJobsGraphic() {
  const jobs = [
    { time: "8:30 AM", service: "Full Detail", rating: "★★★★★" },
    { time: "11:00 AM", service: "Interior Only", rating: "★★★★☆" },
    { time: "2:30 PM", service: "Express Wash", rating: "Pending" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-violet-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-purple-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Today&apos;s Jobs
          </p>
          <div className="space-y-2">
            {jobs.map((job) => (
              <div
                key={job.time}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className="w-16 shrink-0 text-[11px] text-white/40">{job.time}</span>
                <span className="flex-1 text-xs text-white/80">{job.service}</span>
                <span className="text-[11px] text-amber-400">{job.rating}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-md border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-center text-[11px] text-violet-300">
            📍 GPS Dispatch Active
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `DispatchBoardGraphic.tsx`**

```tsx
// src/components/solutions/graphics/DispatchBoardGraphic.tsx
export function DispatchBoardGraphic() {
  const jobs = [
    { job: "Leak Repair", tech: "Rodriguez", estimate: "$420", status: "Dispatched", statusColor: "text-blue-300 bg-blue-500/15 border-blue-500/25" },
    { job: "Water Heater", tech: "Williams", estimate: "$1,200", status: "In Progress", statusColor: "text-amber-300 bg-amber-500/15 border-amber-500/25" },
    { job: "Drain Clear", tech: "Kim", estimate: "$180", status: "Complete", statusColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-blue-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Active Jobs
          </p>
          <div className="space-y-2">
            {jobs.map((job) => (
              <div
                key={job.job}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className="flex-1 text-xs text-white/80">{job.job}</span>
                <span className="text-[11px] text-white/40">{job.tech}</span>
                <span className="text-[11px] text-blue-300">{job.estimate}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${job.statusColor}`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create `StorefrontMetricsGraphic.tsx`**

```tsx
// src/components/solutions/graphics/StorefrontMetricsGraphic.tsx
export function StorefrontMetricsGraphic() {
  const metrics = [
    { value: "48", label: "Active Listings" },
    { value: "$3,240", label: "This Month" },
    { value: "12%", label: "Conversion" },
    { value: "94", label: "Units Sold" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-pink-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-rose-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Storefront Metrics
          </p>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-md border border-white/10 bg-slate-900/80 p-3 text-center"
              >
                <p className="text-lg font-bold text-white">{m.value}</p>
                <p className="mt-0.5 text-[11px] text-white/45">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-md border border-pink-500/20 bg-pink-500/10 px-3 py-1.5 text-center text-[11px] text-pink-300">
            Instagram Shop Connected
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create `CustomOrderWorkflowGraphic.tsx`**

```tsx
// src/components/solutions/graphics/CustomOrderWorkflowGraphic.tsx
import { Check } from "lucide-react";

export function CustomOrderWorkflowGraphic() {
  const steps = [
    { label: "Design Brief", detail: "Received", done: true },
    { label: "Stone Selection", detail: "14k Gold · Oval Ruby", done: true },
    { label: "Preview Approval", detail: "Client Approved", done: true },
    { label: "Certificate", detail: "Generating…", done: false },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-yellow-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-amber-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Custom Order #C-0087
          </p>
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.label}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-amber-500/20" : "bg-white/[0.06]"}`}>
                  {step.done ? (
                    <Check size={10} className="text-amber-400" />
                  ) : (
                    <span className="text-[10px] text-white/30">⟳</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/80">{step.label}</p>
                  <p className="text-[11px] text-white/40">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Create `ComingSoonGraphic.tsx`**

```tsx
// src/components/solutions/graphics/ComingSoonGraphic.tsx
export function ComingSoonGraphic() {
  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-slate-400/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-slate-500/15 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 text-center">
            <span className="text-3xl" role="img" aria-label="package">📦</span>
            <p className="text-xs text-white/50">This solution is in development</p>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] text-white/40">
              Join Waitlist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Verify TypeScript**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii" && npm run lint
```

Expected: no errors.

- [ ] **Step 10: Commit**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
git add src/components/solutions/graphics/
git commit -m "feat(solutions): add 8 hero graphic components for solution detail pages"
```

---

## Task 3: SolutionHero component

**Files:**
- Create: `src/components/solutions/SolutionHero.tsx`

The `TAG_COLORS` map is duplicated here from `SolutionsSection` — this is intentional (YAGNI; a shared constant would be premature for two files).

- [ ] **Step 1: Create `SolutionHero.tsx`**

```tsx
// src/components/solutions/SolutionHero.tsx
import type { Solution } from "@/types";
import { cn } from "@/lib/cn";
import { AppointmentSchedulerGraphic } from "./graphics/AppointmentSchedulerGraphic";
import { RentalCalendarGraphic } from "./graphics/RentalCalendarGraphic";
import { OrderPipelineGraphic } from "./graphics/OrderPipelineGraphic";
import { DetailingJobsGraphic } from "./graphics/DetailingJobsGraphic";
import { DispatchBoardGraphic } from "./graphics/DispatchBoardGraphic";
import { StorefrontMetricsGraphic } from "./graphics/StorefrontMetricsGraphic";
import { CustomOrderWorkflowGraphic } from "./graphics/CustomOrderWorkflowGraphic";
import { ComingSoonGraphic } from "./graphics/ComingSoonGraphic";

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

function SolutionGraphic({ slug }: { slug: string }) {
  switch (slug) {
    case "mobile-dna-livescanning": return <AppointmentSchedulerGraphic />;
    case "party-rental": return <RentalCalendarGraphic />;
    case "print-reseller": return <OrderPipelineGraphic />;
    case "mobile-detailing": return <DetailingJobsGraphic />;
    case "plumber": return <DispatchBoardGraphic />;
    case "mini-apparel-shop": return <StorefrontMetricsGraphic />;
    case "custom-jewelry": return <CustomOrderWorkflowGraphic />;
    default: return <ComingSoonGraphic />;
  }
}

interface Breadcrumb {
  label: string;
  href: string;
}

interface SolutionHeroProps {
  solution: Solution;
  breadcrumbs: Breadcrumb[];
}

export function SolutionHero({ solution, breadcrumbs }: SolutionHeroProps) {
  return (
    <section
      aria-labelledby="solution-hero-heading"
      className={cn(
        "relative w-full overflow-hidden",
        "bg-linear-to-br from-void via-[#0a1630] to-void",
        "border-b border-white/10",
        "pt-24 pb-16 sm:pt-32 sm:pb-20"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/30">/</span>
                )}
                <a
                  href={crumb.href}
                  className="rounded transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {crumb.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2" aria-current="page">
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-white/80">{solution.name}</span>
            </li>
          </ol>
        </nav>

        {/* Hero content */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {/* Tag badge */}
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                tagClass(solution.tag)
              )}
            >
              {solution.tag}
            </span>

            <h1
              id="solution-hero-heading"
              className="mt-3 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {solution.name}
            </h1>

            <p className="mt-4 text-lg text-white/70 sm:text-xl">
              {solution.shortDescription}
            </p>

            {/* Price pill */}
            <div className="mt-5 inline-flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{solution.price}</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/70">
                {solution.status === "waitlist" ? "Coming Soon" : "One-time build fee"}
                <span className="sr-only">
                  {solution.status === "active" ? " — one-time build fee" : ""}
                </span>
              </span>
            </div>
          </div>

          {/* Graphic */}
          <div className="shrink-0 lg:pr-8">
            <SolutionGraphic slug={solution.slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint check**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii" && npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
git add src/components/solutions/SolutionHero.tsx
git commit -m "feat(solutions): add SolutionHero component"
```

---

## Task 4: SolutionFeatures, SolutionPricing, SolutionCTA, RelatedSolutions

**Files:**
- Create: `src/components/solutions/SolutionFeatures.tsx`
- Create: `src/components/solutions/SolutionPricing.tsx`
- Create: `src/components/solutions/SolutionCTA.tsx`
- Create: `src/components/solutions/RelatedSolutions.tsx`

- [ ] **Step 1: Create `SolutionFeatures.tsx`**

```tsx
// src/components/solutions/SolutionFeatures.tsx
import { Check } from "lucide-react";

interface SolutionFeaturesProps {
  features: string[];
}

export function SolutionFeatures({ features }: SolutionFeaturesProps) {
  return (
    <section
      aria-labelledby="features-heading"
      className="py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="features-heading"
          className="mb-8 font-heading text-2xl font-bold text-white sm:text-3xl"
        >
          What&apos;s Built For You
        </h2>
        <ul
          role="list"
          className="grid gap-3 sm:grid-cols-2"
        >
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <Check size={12} className="text-blue-400" aria-hidden="true" />
              </div>
              <span className="text-sm leading-relaxed text-white/75">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `SolutionPricing.tsx`**

```tsx
// src/components/solutions/SolutionPricing.tsx
interface SolutionPricingProps {
  price: string;
  financingNote: string;
  rightForYou: string[];
}

export function SolutionPricing({ price, financingNote, rightForYou }: SolutionPricingProps) {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Left: Investment */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Investment
            </p>
            <p className="mt-3 text-4xl font-bold text-white">{price}</p>
            <p className="mt-1 text-sm text-white/50">One-time build fee</p>
            <hr className="my-5 border-white/10" />
            <p className="text-sm text-primary-sky">{financingNote}</p>
          </div>

          {/* Right: Right for you */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              This is right for you if…
            </p>
            <ul role="list" className="mt-4 space-y-3">
              {rightForYou.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                  <span className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `SolutionCTA.tsx`**

```tsx
// src/components/solutions/SolutionCTA.tsx
import { Button } from "@/components/ui/Button";

interface SolutionCTAProps {
  name: string;
  slug: string;
  isWaitlist: boolean;
}

export function SolutionCTA({ name, slug, isWaitlist }: SolutionCTAProps) {
  if (isWaitlist) {
    return (
      <section aria-labelledby="cta-heading" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-linear-to-br from-blue-600/20 via-cyan-600/10 to-blue-800/20 px-8 py-14 text-center sm:px-12 sm:py-16">
            <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Be first to know when {name} launches.
            </h2>
            <p className="mt-4 text-white/60">
              Join the waitlist and we&apos;ll reach out when it&apos;s ready.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/#contact" variant="primary">
                Join Waitlist
              </Button>
              <Button href="/#solutions" variant="secondary">
                View All Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="cta-heading" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-linear-to-br from-blue-600/20 via-cyan-600/10 to-blue-800/20 px-8 py-14 text-center sm:px-12 sm:py-16">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
            Ready to launch your {name} business?
          </h2>
          <p className="mt-4 text-white/60">
            Let&apos;s talk about your goals and get you started.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="primary">
              Get Started
            </Button>
            <Button href="/#solutions" variant="secondary">
              View All Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `RelatedSolutions.tsx`**

```tsx
// src/components/solutions/RelatedSolutions.tsx
import { ArrowRight } from "lucide-react";
import { getRelatedSolutions } from "@/data/solutions";

const TAG_COLORS: Record<string, string> = {
  "Biometric Tech": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Event Tech": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "E-Commerce": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Service Tech": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Field Service Tech": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Fashion Tech": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Luxury Tech": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

function tagClass(tag: string): string {
  return TAG_COLORS[tag] ?? "bg-white/10 text-white/50 border-white/20";
}

interface RelatedSolutionsProps {
  currentSlug: string;
  count?: number;
}

export function RelatedSolutions({ currentSlug, count = 3 }: RelatedSolutionsProps) {
  const related = getRelatedSolutions(currentSlug, count);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="py-16 sm:py-20 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="related-heading"
          className="mb-8 font-heading text-2xl font-bold text-white sm:text-3xl"
        >
          Other Solutions
        </h2>
        <ul
          role="list"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {related.map((solution) => (
            <li key={solution.slug}>
              <a
                href={`/solutions/${solution.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/8 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`${solution.name} — ${solution.price}`}
              >
                <span
                  className={`mb-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tagClass(solution.tag)}`}
                >
                  {solution.tag}
                </span>
                <h3 className="font-heading text-base font-semibold text-white">
                  {solution.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/60">
                  {solution.shortDescription}
                </p>
                <div className="mt-5 flex items-end justify-between">
                  <span className="text-lg font-bold text-white">{solution.price}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary-sky transition-all duration-200 group-hover:gap-2">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Lint check**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii" && npm run lint
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
git add src/components/solutions/SolutionFeatures.tsx src/components/solutions/SolutionPricing.tsx src/components/solutions/SolutionCTA.tsx src/components/solutions/RelatedSolutions.tsx
git commit -m "feat(solutions): add SolutionFeatures, SolutionPricing, SolutionCTA, RelatedSolutions components"
```

---

## Task 5: Barrel export and route page

**Files:**
- Create: `src/components/solutions/index.ts`
- Create: `src/app/solutions/[slug]/page.tsx`

- [ ] **Step 1: Create the barrel `index.ts`**

```ts
// src/components/solutions/index.ts
export { SolutionHero } from "./SolutionHero";
export { SolutionFeatures } from "./SolutionFeatures";
export { SolutionPricing } from "./SolutionPricing";
export { SolutionCTA } from "./SolutionCTA";
export { RelatedSolutions } from "./RelatedSolutions";
```

- [ ] **Step 2: Create the route page**

```tsx
// src/app/solutions/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSolutions, getSolutionBySlug } from "@/data/solutions";
import {
  SolutionHero,
  SolutionFeatures,
  SolutionPricing,
  SolutionCTA,
  RelatedSolutions,
} from "@/components/solutions";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllSolutions().map((solution) => ({ slug: solution.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return { title: "Solution Not Found" };
  }

  return {
    title: `${solution.name} | GetBizii`,
    description: solution.shortDescription,
  };
}

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
];

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const isWaitlist = solution.status === "waitlist";

  return (
    <main id="main-content">
      <SolutionHero solution={solution} breadcrumbs={BREADCRUMBS} />
      <SolutionFeatures features={solution.features} />
      {!isWaitlist && solution.financingNote && solution.rightForYou && (
        <SolutionPricing
          price={solution.price}
          financingNote={solution.financingNote}
          rightForYou={solution.rightForYou}
        />
      )}
      <SolutionCTA name={solution.name} slug={solution.slug} isWaitlist={isWaitlist} />
      <RelatedSolutions currentSlug={slug} count={3} />
    </main>
  );
}
```

- [ ] **Step 3: Build check**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii" && npm run build
```

Expected: build completes with 8 new `/solutions/[slug]` static routes generated. Look for output like:
```
○ /solutions/mobile-dna-livescanning
○ /solutions/party-rental
○ /solutions/print-reseller
...
```

- [ ] **Step 4: Smoke-test in dev server**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii" && npm run dev
```

Verify manually in the browser (runs on port 3000 per CLAUDE.md):
- `http://localhost:3000/solutions/party-rental` — active solution page loads with all 5 sections
- `http://localhost:3000/solutions/kurbside` — waitlist page loads, pricing section absent, CTA says "Be first to know"
- `http://localhost:3000/solutions/nonexistent` — 404 page shown (dynamicParams = false)

- [ ] **Step 5: Commit**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
git add src/components/solutions/index.ts src/app/solutions/
git commit -m "feat(solutions): add solution detail page route and barrel export"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Route with `generateStaticParams`, `dynamicParams = false`, async params — Task 5
- ✅ `generateMetadata` deriving from `name` and `shortDescription` — Task 5
- ✅ `Solution` type extended with `rightForYou` and `financingNote` — Task 1
- ✅ `getRelatedSolutions` active-only, excludes current — Task 1
- ✅ All 7 active solutions populated with data — Task 1
- ✅ 8 graphic components — Task 2
- ✅ `SolutionHero` with breadcrumbs, tag, price pill, graphic switcher — Task 3
- ✅ `SolutionFeatures` checklist grid — Task 4
- ✅ `SolutionPricing` two-panel — Task 4
- ✅ `SolutionCTA` active/waitlist variants — Task 4
- ✅ `RelatedSolutions` 3-up grid, returns null on 0 results — Task 4
- ✅ Waitlist: pricing omitted, CTA variant, ComingSoonGraphic — Tasks 3, 4, 5
- ✅ Accessibility: breadcrumb nav, aria-labelledby, aria-hidden on graphics, focus rings — Tasks 3, 4
- ✅ Barrel export — Task 5

**Placeholder scan:** No TBDs, no "implement later", all code blocks complete.

**Type consistency:**
- `Solution.rightForYou: string[]` defined in Task 1, consumed in Tasks 4 and 5 ✅
- `Solution.financingNote: string` defined in Task 1, consumed in Tasks 4 and 5 ✅
- `getRelatedSolutions` defined in Task 1, imported in Task 4 (`RelatedSolutions.tsx`) ✅
- `SolutionHero`, `SolutionFeatures`, `SolutionPricing`, `SolutionCTA`, `RelatedSolutions` defined in Tasks 3–4, exported in Task 5 barrel, imported in Task 5 page ✅
