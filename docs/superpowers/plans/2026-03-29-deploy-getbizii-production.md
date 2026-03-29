# Plan: Deploy GetBizii to Production

**Date:** 2026-03-29
**Author:** Planner (Opus)
**Status:** Draft — awaiting approval

---

## Goal

Deploy the GetBizii Next.js 16.2.1 website to production on Vercel with GitHub CI/CD, Zoho CRM integration, and custom domain configuration — resulting in a fully verified, live site.

---

## Architecture Overview

```
Local Git Repo (outer: GetBizii/)
  └── getbizii/ (submodule — Next.js app, its own git repo)
        ├── src/app/          ← App Router pages & components
        ├── public/           ← Static assets (SVG logos)
        ├── .env.local        ← Local env vars (not committed)
        └── package.json      ← Next.js 16.2.1, React 19.2.4

GitHub: theyodaknows/getbizii  ← Already exists, outer repo pushed
  └── Vercel Project: getbizii (prj_Lyd34SyJEwFFBVezn2JxfB6udBPj)
        └── Deploys from GitHub on push to main
              └── Custom domains: getbizii.com + www.getbizii.com
```

**Key observations from codebase analysis:**

1. The **outer repo** (`GetBizii/`) already has a GitHub remote at `theyodaknows/getbizii` and is pushed.
2. The **inner repo** (`getbizii/`) is tracked as a **git submodule** (commit `3c750b2`) — it has NO remote configured.
3. The inner repo contains only the **scaffold** (default Next.js page.tsx). The commit message references "full-stack build with Zoho CRM integration" but the actual feature code has not been written/committed yet.
4. A **Vercel project** already exists locally (`.vercel/project.json` with `prj_Lyd34SyJEwFFBVezn2JxfB6udBPj`), linked to the outer directory.
5. `.env.local` has 4 empty Zoho variables: `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `ZOHO_ORG_ID`.
6. **Vercel CLI** v50.33.1 and **GitHub CLI** v2.89.0 are available.

**Critical prerequisite:** The app code (components, API routes, Zoho integration, service detail pages) must be fully implemented and committed before deployment makes sense. This plan assumes that work is either complete in the working directory or will be completed before executing this plan.

---

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router)
- **Runtime:** React 19.2.4, Node.js 22
- **Styling:** Tailwind CSS 4, Framer Motion 12
- **Hosting:** Vercel (Serverless)
- **CI/CD:** GitHub → Vercel auto-deploy
- **CRM:** Zoho CRM API (OAuth2 refresh token flow)
- **DNS/Domain:** Custom domain via Vercel (registrar TBD)
- **CLI Tools:** `gh` v2.89.0, `vercel` v50.33.1

---

## Prerequisites & Credentials Needed

Before starting, the operator must have ready:

| Credential | Purpose | Where to get it |
|---|---|---|
| GitHub personal access token | `gh` CLI auth (already configured) | github.com/settings/tokens |
| Vercel account + CLI auth | `vercel` CLI (already linked via `.vercel/`) | vercel.com/account/tokens |
| Zoho API Console client ID | OAuth2 for CRM API | api-console.zoho.com |
| Zoho API Console client secret | OAuth2 for CRM API | api-console.zoho.com |
| Zoho refresh token | Long-lived token for server-side calls | Generated via OAuth2 flow |
| Zoho Org ID | Identifies the CRM organization | Zoho CRM > Setup > Developer Space |
| Domain registrar access | DNS records for getbizii.com | Wherever domain is registered |

---

## Task Breakdown

### Step 2: Create GitHub Repository

> **Status:** ALREADY DONE. The outer repo has `origin` at `https://github.com/theyodaknows/getbizii.git` and is pushed. However, the inner `getbizii/` submodule has no remote.

#### Task 2.1: Decide on repository structure for Vercel deployment
- **Time:** 5 min
- **Decision needed:** Vercel needs to build the Next.js app. There are two options:
  - **Option A (Recommended):** Push the inner `getbizii/` repo to its own GitHub repo (or the same repo) and connect Vercel to that. Vercel can be configured with a "Root Directory" setting pointing to the Next.js app.
  - **Option B:** Eliminate the submodule, move all Next.js code to the root of the outer repo, and push to the existing `theyodaknows/getbizii` GitHub repo.
- **Recommendation:** Option A — keep the existing outer repo on GitHub, and configure Vercel's "Root Directory" to `getbizii/`. This avoids restructuring. However, submodules can cause issues with Vercel builds. If Vercel does not resolve the submodule, fall back to Option B.
- **Action:** User decides. Plan proceeds assuming Option A with fallback instructions for B.

#### Task 2.2: Ensure all app code is committed in the inner repo
- **Time:** 10 min
- **Files:** All files under `getbizii/src/`, `getbizii/public/`, API routes, etc.
- **Commands:**
  ```bash
  cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii/getbizii"
  git status
  git add -A
  git commit -m "feat: complete GetBizii website with all components, pages, and Zoho integration"
  ```
- **Verification:** `git log --oneline -3` shows the new commit. `git diff --stat HEAD~1` shows all new files.

#### Task 2.3: Push code to GitHub
- **Time:** 5 min
- **Commands (Option A — submodule stays, outer repo uses root directory in Vercel):**
  ```bash
  # From outer repo
  cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
  # Update submodule reference
  git add getbizii
  git commit -m "chore: update getbizii submodule to latest"
  git push origin main
  ```
- **Commands (Option B — flatten into root):**
  ```bash
  # Would require restructuring — only if submodule approach fails
  ```
- **Verification:** `gh repo view theyodaknows/getbizii --json name` succeeds. Browsing GitHub shows all source files.

---

### Step 3: Connect Vercel to GitHub

#### Task 3.1: Link Vercel project to the GitHub repository
- **Time:** 10 min
- **Context:** A Vercel project (`getbizii`, ID `prj_Lyd34SyJEwFFBVezn2JxfB6udBPj`) already exists locally. It may or may not be connected to the GitHub repo yet.
- **Actions (via Vercel Dashboard — vercel.com):**
  1. Go to https://vercel.com → select "getbizii" project
  2. Settings → Git → Connect to Git Repository
  3. Select `theyodaknows/getbizii`
  4. Set **Production Branch** to `main`
- **Actions (via CLI alternative):**
  ```bash
  cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
  vercel link
  vercel git connect
  ```
- **Verification:** `vercel inspect` or Vercel Dashboard shows "Connected to theyodaknows/getbizii".

#### Task 3.2: Configure Root Directory (if using submodule structure)
- **Time:** 5 min
- **Actions (Vercel Dashboard):**
  1. Project Settings → General → Root Directory
  2. Set to `getbizii`
  3. Ensure Framework Preset is "Next.js"
  4. Build Command: `npm run build` (default)
  5. Output Directory: `.next` (default)
- **Actions (via CLI):**
  ```bash
  vercel project ls  # confirm project
  # Root directory must be set via dashboard or vercel.json
  ```
- **NOTE:** If Vercel cannot resolve the git submodule during build, you must switch to Option B (flatten repo structure). Vercel's build environment does NOT initialize submodules by default. You may need to add a custom install command:
  ```
  git submodule update --init --recursive && npm install
  ```
  Or set the `VERCEL_GIT_SUBMODULES` env var to `1`.
- **Verification:** Trigger a preview deploy and confirm the build log shows Next.js building from the correct directory.

---

### Step 4: Set Vercel Environment Variables

#### Task 4.1: Add Zoho CRM environment variables in Vercel
- **Time:** 10 min
- **Variables to set (all scopes: Production, Preview, Development):**
  | Variable | Value | Notes |
  |---|---|---|
  | `ZOHO_CLIENT_ID` | (from Zoho API Console) | OAuth2 Client ID |
  | `ZOHO_CLIENT_SECRET` | (from Zoho API Console) | OAuth2 Client Secret |
  | `ZOHO_REFRESH_TOKEN` | (from OAuth2 flow) | Long-lived refresh token |
  | `ZOHO_ORG_ID` | (from Zoho CRM settings) | Organization identifier |
- **Actions (via CLI):**
  ```bash
  cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
  vercel env add ZOHO_CLIENT_ID production preview
  vercel env add ZOHO_CLIENT_SECRET production preview
  vercel env add ZOHO_REFRESH_TOKEN production preview
  vercel env add ZOHO_ORG_ID production preview
  ```
  Each command will prompt for the value interactively.
- **Actions (via Dashboard):**
  1. Vercel → getbizii → Settings → Environment Variables
  2. Add each variable with values for Production + Preview
- **Security:** Never commit these values. The `.env*` pattern is already in `.gitignore`.
- **Verification:**
  ```bash
  vercel env ls
  ```
  Should list all 4 variables.

#### Task 4.2: Update local .env.local with real values
- **Time:** 5 min
- **File:** `/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii/getbizii/.env.local`
- **Action:** Fill in the 4 empty values with the same credentials used in Vercel. This enables local development testing.
- **Verification:** `cat .env.local` shows non-empty values (do NOT commit this file).

---

### Step 5: Configure Custom Domains

#### Task 5.1: Add custom domains to Vercel project
- **Time:** 10 min
- **Domains to add:**
  - `getbizii.com` (apex/root domain)
  - `www.getbizii.com` (www subdomain)
- **Actions (via CLI):**
  ```bash
  vercel domains add getbizii.com
  vercel domains add www.getbizii.com
  ```
- **Actions (via Dashboard):**
  1. Vercel → getbizii → Settings → Domains
  2. Add `getbizii.com`
  3. Add `www.getbizii.com`
  4. Set preferred: redirect `www` → apex (or vice versa, per brand preference)
- **Verification:** Vercel shows both domains with "Pending" or "Valid Configuration" status.

#### Task 5.2: Configure DNS records at domain registrar
- **Time:** 15 min
- **DNS records needed:**
  | Type | Name | Value | TTL |
  |---|---|---|---|
  | A | `@` | `76.76.21.21` | 300 |
  | CNAME | `www` | `cname.vercel-dns.com` | 300 |
- **Note:** The A record IP is Vercel's standard. Confirm the exact values shown in Vercel's domain configuration panel, as they may differ.
- **Actions:** Log into domain registrar, navigate to DNS management, add/update records.
- **Verification:** 
  ```bash
  dig getbizii.com A +short
  # Expected: 76.76.21.21
  dig www.getbizii.com CNAME +short
  # Expected: cname.vercel-dns.com
  ```
  DNS propagation may take 5 min to 48 hours. Vercel Dashboard will show green checkmarks when verified.

#### Task 5.3: Verify SSL certificate provisioning
- **Time:** 5 min (may need to wait for DNS propagation)
- **Action:** Vercel auto-provisions Let's Encrypt SSL once DNS resolves. Check Dashboard for certificate status.
- **Verification:**
  ```bash
  curl -I https://getbizii.com 2>/dev/null | head -5
  # Should show HTTP/2 200 or 301 redirect
  ```

---

### Step 6: Create Zoho Custom Field

#### Task 6.1: Create "Lead Source Detail" custom field in Zoho CRM
- **Time:** 15 min
- **Purpose:** Track that a lead came from the GetBizii website specifically, with the selected service/solution.
- **Actions (Zoho CRM Dashboard):**
  1. Go to Zoho CRM → Setup → Customization → Modules and Fields → Leads
  2. Click "Add New Field"
  3. Field type: **Single Line** (or **Pick List** if you want constrained values)
  4. Field Label: `Website Source` (or `Lead Source Detail`)
  5. API Name will auto-generate (e.g., `Website_Source`)
  6. If Pick List, add values:
     - `GetBizii - Homepage`
     - `GetBizii - Mobile DNA`
     - `GetBizii - Party Rental`
     - `GetBizii - Print Reseller`
     - `GetBizii - Mobile Detailing`
     - `GetBizii - Plumber`
     - `GetBizii - Mini Apparel`
     - `GetBizii - Custom Jewelry`
     - `GetBizii - Kurbside`
  7. Save the field.
- **Verification:**
  - Go to any Lead record → Edit → confirm the new field appears
  - Note the **API name** — it will be needed in the Next.js API route that creates leads via Zoho API
  - Test via Zoho API:
    ```
    GET https://www.zohoapis.com/crm/v5/settings/fields?module=Leads
    ```
    Confirm the custom field appears in the response.

#### Task 6.2: Update API route to include the custom field
- **Time:** 10 min
- **File:** The API route file that handles contact form submissions (path TBD — likely `getbizii/src/app/api/contact/route.ts` or similar)
- **Action:** Ensure the Zoho CRM lead creation payload includes the new custom field API name with the appropriate value based on which service page or solution the user selected.
- **Verification:** Submit a test form locally, check Zoho CRM for the lead with the custom field populated.

---

### Step 7: Deploy to Production

#### Task 7.1: Trigger production deployment
- **Time:** 10 min
- **Actions (automatic — if GitHub integration is configured):**
  ```bash
  cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii"
  git push origin main
  ```
  Vercel auto-deploys on push to `main`.
- **Actions (manual via CLI):**
  ```bash
  cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/GetBizii/getbizii"
  vercel --prod
  ```
- **Verification:** 
  - Vercel Dashboard shows deployment in progress → succeeded
  - Build log shows no errors
  - Preview URL (*.vercel.app) loads the site

#### Task 7.2: Monitor build logs for errors
- **Time:** 5 min
- **Actions:**
  ```bash
  vercel logs <deployment-url>
  ```
  Or check Dashboard → Deployments → latest → Build Logs
- **Common issues to watch for:**
  - Submodule not initialized (if using submodule structure)
  - Missing environment variables causing build/runtime errors
  - Next.js build errors (TypeScript, missing imports)
  - Image optimization warnings
- **Verification:** Build completes with exit code 0. No runtime errors in function logs.

---

### Step 8: Verify Production (8 Checks)

#### Task 8.1: Check 1 — Homepage loads correctly
- **Time:** 2 min
- **Action:** Open `https://getbizii.com` in a browser (and incognito mode)
- **Verify:**
  - Page loads without errors (no blank screen, no 500)
  - Hero section renders with WebGL aurora background
  - Navigation bar with glassmorphism effect is visible
  - All sections scroll properly (Pillars, Solutions, How It Works, Financing, Testimonials, Contact, Footer)
- **Command:**
  ```bash
  curl -s -o /dev/null -w "%{http_code}" https://getbizii.com
  # Expected: 200
  ```

#### Task 8.2: Check 2 — Service detail pages load
- **Time:** 5 min
- **Action:** Navigate to each of the 5 service detail pages
- **Verify:**
  - Each page loads with correct content (hero, features, pricing card)
  - Back navigation works
  - URLs are clean (e.g., `/services/mobile-dna`)
- **Pages to check:**
  - `/services/mobile-dna` (or equivalent route)
  - `/services/party-rental`
  - `/services/print-reseller`
  - `/services/mobile-detailing`
  - `/services/plumber`

#### Task 8.3: Check 3 — Contact form submits to Zoho CRM
- **Time:** 5 min
- **Action:** Fill out the contact form with test data and submit
- **Verify:**
  - Form submission shows success feedback (no errors)
  - A new Lead appears in Zoho CRM with:
    - Name, email, phone populated
    - Selected service/solution populated
    - Custom field (`Website_Source`) populated with correct value
  - No CORS errors in browser console
- **Cleanup:** Delete the test lead from Zoho CRM after verification.

#### Task 8.4: Check 4 — Environment variables are working
- **Time:** 2 min
- **Action:** The contact form test (8.3) implicitly validates this. Additionally:
- **Verify:**
  - No "missing environment variable" errors in Vercel function logs
  - Zoho API calls succeed (200 responses, not 401/403)
- **Command:**
  ```bash
  vercel env ls
  # All 4 ZOHO_* vars should be listed
  ```

#### Task 8.5: Check 5 — Custom domains and SSL
- **Time:** 3 min
- **Verify:**
  - `https://getbizii.com` loads with valid SSL (green lock)
  - `https://www.getbizii.com` redirects to apex (or vice versa)
  - `http://getbizii.com` redirects to `https://`
  - No mixed content warnings
- **Commands:**
  ```bash
  curl -I https://getbizii.com 2>&1 | head -10
  curl -I https://www.getbizii.com 2>&1 | head -10
  curl -I http://getbizii.com 2>&1 | head -10
  ```

#### Task 8.6: Check 6 — Responsive design
- **Time:** 5 min
- **Action:** Test in browser DevTools at these breakpoints:
  - Desktop: 1440px
  - Tablet: 768px
  - Mobile: 375px (iPhone SE), 390px (iPhone 14)
- **Verify:**
  - Navigation collapses to hamburger on mobile
  - Hero section scales properly
  - Solution cards stack vertically on mobile
  - Contact form is usable on mobile
  - No horizontal scroll on any breakpoint

#### Task 8.7: Check 7 — Performance and Core Web Vitals
- **Time:** 5 min
- **Action:** Run Lighthouse audit (Chrome DevTools → Lighthouse → Mobile)
- **Verify:**
  - Performance score > 80
  - LCP < 2.5s
  - CLS < 0.1
  - No render-blocking resources warnings
  - Images are optimized (Next.js Image component)
- **Alternative:**
  ```bash
  # Use PageSpeed Insights API
  open "https://pagespeed.web.dev/analysis?url=https://getbizii.com"
  ```

#### Task 8.8: Check 8 — Accessibility baseline
- **Time:** 5 min
- **Action:** Run axe DevTools browser extension on homepage
- **Verify:**
  - Zero critical violations
  - Zero serious violations
  - All images have alt text
  - Color contrast meets WCAG AA (4.5:1 for normal text)
  - Keyboard navigation works (Tab through nav, form fields, buttons)
  - Focus indicators are visible
- **Note:** Per project rules, ADA/WCAG 2.1 AA compliance is mandatory.

---

## Dependency Graph

```
Task 2.1 (decide repo structure)
  └── Task 2.2 (commit code)
        └── Task 2.3 (push to GitHub)
              ├── Task 3.1 (connect Vercel to GitHub)
              │     └── Task 3.2 (configure root directory)
              │           └── Task 7.1 (deploy) ──→ Task 7.2 (monitor)
              │                 └── Tasks 8.1–8.8 (all verification checks)
              └── Task 5.1 (add domains to Vercel)
                    └── Task 5.2 (DNS records)
                          └── Task 5.3 (SSL verification)

Task 4.1 (Vercel env vars) ← can run in parallel with Steps 3 and 5
Task 4.2 (local env vars) ← can run in parallel with Task 4.1

Task 6.1 (Zoho custom field) ← independent, can run any time before Task 8.3
  └── Task 6.2 (update API route) ← must complete before Task 7.1
```

**Parallel tracks:**
- Track A: Steps 2 → 3 → 7 (code → GitHub → Vercel → deploy)
- Track B: Step 4 (environment variables) — independent
- Track C: Steps 5 (domains + DNS) — independent after Step 3
- Track D: Step 6 (Zoho custom field) — independent until deploy

All tracks must converge before Step 7 (deploy) and Step 8 (verification).

---

## Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Vercel cannot resolve git submodule | Build fails | Set `VERCEL_GIT_SUBMODULES=1` env var, or flatten repo (Option B) |
| DNS propagation delay | Custom domain not working for hours | Deploy first to `*.vercel.app`, verify there. DNS will catch up. |
| Zoho refresh token expired | API calls fail in production | Generate a fresh token before deploy. Implement token refresh logic in API route. |
| Next.js 16.2.1 has breaking changes | Build fails on Vercel | Check Vercel's supported Next.js versions. May need to pin Node.js version in `package.json` engines field. |
| App code not yet implemented | Nothing to deploy | This is the biggest risk — page.tsx is still default scaffold. Must complete implementation first. |

---

## Estimated Total Time

| Step | Time |
|---|---|
| Step 2: GitHub Repository | 20 min |
| Step 3: Connect Vercel | 15 min |
| Step 4: Environment Variables | 15 min |
| Step 5: Custom Domains | 30 min |
| Step 6: Zoho Custom Field | 25 min |
| Step 7: Deploy | 15 min |
| Step 8: Verify (8 checks) | 32 min |
| **Total** | **~2.5 hours** |

(Plus DNS propagation wait time, which is unpredictable: 5 min to 48 hours.)
