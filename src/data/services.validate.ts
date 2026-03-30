/**
 * Compile-time and runtime validation for the services data layer.
 * Run via: npx ts-node --project tsconfig.json src/data/services.validate.ts
 * Or include in a test suite once a runner is added.
 */
import { getAllServices, getServiceBySlug, getRelatedServices } from "./services";
import type { Service, ServiceFeature } from "@/types";

// ── type guards ──────────────────────────────────────────────────────────────

function assertDefined<T>(value: T | undefined, label: string): T {
  if (value === undefined) throw new Error(`FAIL: ${label} is undefined`);
  return value;
}

function assertEq<T>(actual: T, expected: T, label: string): void {
  if (actual !== expected)
    throw new Error(`FAIL: ${label} — expected ${expected}, got ${actual}`);
}

// ── 1. getAllServices returns all 4 ──────────────────────────────────────────

const all: Service[] = getAllServices();
assertEq(all.length, 4, "getAllServices length");

// ── 2. each service has every required field populated ────────────────────

const REQUIRED_SLUGS = ["biz-setup", "bookkeeping", "cpa", "legal"] as const;

for (const service of all) {
  const ctx = `service "${service.slug}"`;

  assertDefined(service.slug, `${ctx} slug`);
  assertDefined(service.name, `${ctx} name`);
  assertDefined(service.tagline, `${ctx} tagline`);
  assertDefined(service.description, `${ctx} description`);
  assertDefined(service.icon, `${ctx} icon`);
  assertDefined(service.ctaLabel, `${ctx} ctaLabel`);
  assertDefined(service.ctaHref, `${ctx} ctaHref`);
  assertDefined(service.metaTitle, `${ctx} metaTitle`);
  assertDefined(service.metaDescription, `${ctx} metaDescription`);

  if (!Array.isArray(service.features) || service.features.length < 4)
    throw new Error(`FAIL: ${ctx} must have at least 4 features`);

  for (const f of service.features as ServiceFeature[]) {
    if (!f.title || !f.description)
      throw new Error(`FAIL: ${ctx} feature missing title or description`);
  }

  // hrefs must be real paths, not placeholders
  if (service.ctaHref === "#" || !service.ctaHref.startsWith("/"))
    throw new Error(`FAIL: ${ctx} ctaHref is a placeholder or invalid`);
}

// ── 3. slugs are unique ───────────────────────────────────────────────────

const slugSet = new Set(all.map((s) => s.slug));
assertEq(slugSet.size, 4, "unique slug count");

for (const slug of REQUIRED_SLUGS) {
  if (!slugSet.has(slug)) throw new Error(`FAIL: slug "${slug}" is missing`);
}

// ── 4. getServiceBySlug ───────────────────────────────────────────────────

for (const slug of REQUIRED_SLUGS) {
  const found = assertDefined(getServiceBySlug(slug), `getServiceBySlug("${slug}")`);
  assertEq(found.slug, slug, `getServiceBySlug("${slug}") .slug`);
}

const missing = getServiceBySlug("nonexistent");
if (missing !== undefined)
  throw new Error(`FAIL: getServiceBySlug("nonexistent") should return undefined`);

// ── 5. getRelatedServices returns exactly 3, excluding current ────────────

for (const slug of REQUIRED_SLUGS) {
  const related = getRelatedServices(slug);
  assertEq(related.length, 3, `getRelatedServices("${slug}") length`);
  if (related.some((s) => s.slug === slug))
    throw new Error(`FAIL: getRelatedServices("${slug}") includes current slug`);
}

// ── all checks passed ─────────────────────────────────────────────────────

console.log("All 15 checks passed.");
