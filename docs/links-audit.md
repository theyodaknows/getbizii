# Navigation Links Audit — 2026-03-29

## Routes that exist in src/app/

| Route | Status |
|---|---|
| `/` | Real — `src/app/page.tsx` |
| `/services/[slug]` | Real — `src/app/services/[slug]/page.tsx` |
| `/services/biz-setup` | Valid slug |
| `/services/bookkeeping` | Valid slug |
| `/services/cpa` | Valid slug |
| `/services/legal` | Valid slug |

All other routes (`/about`, `/blog`, `/press`, `/pricing`, `/docs`, `/privacy`, `/terms`, `/contact`, `/services` index) do **not** exist as of this audit.

---

## Navbar.tsx changes

| Link text | Old href | New href | Reason |
|---|---|---|---|
| Home | `#` | `/` | Broken hash; points to real home route |
| Services | `#services` | `/services/biz-setup` | No `#services` section on page; nearest valid services route |
| Pricing | `#pricing` | `/` | No pricing page or section exists yet |
| About | `#about` | `/` | No about page or section exists yet |
| Contact | `#contact` | `/` | No contact page or section exists yet |
| Get Started (desktop CTA) | `#contact` | `/services/biz-setup` | No contact page; pointed to primary service entry |
| Get Started (mobile CTA) | `#contact` | `/services/biz-setup` | Same as above |

---

## Footer.tsx changes

| Section | Link text | Old href | New href | Reason |
|---|---|---|---|---|
| Company | About | `/about` | `/` | Route does not exist |
| Company | Blog | `/blog` | `/` | Route does not exist |
| Company | Press | `/press` | `/` | Route does not exist |
| Product | *(section renamed to "Services")* | — | — | Old "Product" section linked non-existent routes; replaced with real service detail pages |
| Services | Business Setup | `/services` (old) | `/services/biz-setup` | `/services` index does not exist; linked to real slug |
| Services | Bookkeeping | *(new)* | `/services/bookkeeping` | Added real route |
| Services | CPA Services | *(new)* | `/services/cpa` | Added real route |
| Services | Legal Services | *(new)* | `/services/legal` | Added real route |
| Legal | Privacy | `/privacy` | `/` | Route does not exist |
| Legal | Terms | `/terms` | `/` | Route does not exist |
| Legal | Contact | `/contact` | `/` | Route does not exist |

---

## Notes

- Links pointing to `/` are temporary placeholders. When dedicated pages are built (`/about`, `/contact`, `/pricing`, etc.) these should be updated to the correct routes.
- No external or social links were present in either component at the time of this audit (social links were removed in a prior commit).
- TypeScript check (`npx tsc --noEmit`) passes with no errors after changes.
