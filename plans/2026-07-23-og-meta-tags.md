# Social-Share (Open Graph) Meta Tags Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a description and Open Graph/Twitter Card meta tags to `index.html` so shared links render a title, description, and preview image.

**Architecture:** Static markup addition to the single `index.html` `<head>`. No components, services, or routing involved — this is a client-rendered SPA with one HTML shell.

**Tech Stack:** Plain HTML. No new dependencies.

## Global Constraints

- No new unit tests planned — this is static markup with no runtime logic.
- One static, site-wide description (no per-route meta tags) — see spec's Non-goals.
- Reuse the existing hosted logo (`http://cdn.nathangawith.com/images/svg/ng_icon_cutout.svg`) as `og:image`/`twitter:image` — no new image asset.

---

## File Structure

- Modify: `src/index.html`

---

### Task 1: Add meta tags to index.html

**Files:**
- Modify: `src/index.html`

**Interfaces:** None — static markup only.

- [ ] **Step 1: Add the meta tags**

In `src/index.html`, find:

```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
```

Replace with:

```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Nathan Gawith's personal portfolio — Java, web, and Android applications, Github projects, and videos.">
  <meta property="og:title" content="Nathan Gawith">
  <meta property="og:description" content="Nathan Gawith's personal portfolio — Java, web, and Android applications, Github projects, and videos.">
  <meta property="og:image" content="http://cdn.nathangawith.com/images/svg/ng_icon_cutout.svg">
  <meta property="og:url" content="https://nathangawith.com">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Nathan Gawith">
  <meta name="twitter:description" content="Nathan Gawith's personal portfolio — Java, web, and Android applications, Github projects, and videos.">
  <meta name="twitter:image" content="http://cdn.nathangawith.com/images/svg/ng_icon_cutout.svg">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
```

- [ ] **Step 2: Verify the tags are present in the built/served output**

Run: `npm start`
Open `http://localhost:4200/`, right-click → "View Page Source" (not
DevTools Elements, which shows the live DOM after Angular runs — you want
the raw HTML response, which is what a link-preview crawler actually
fetches for a non-SSR SPA... note: if this app is prerendered/SSR for the
root route per the `prerendered-routes.json` seen in the build output,
confirm the served root document includes these tags either way, since
`ng serve` doesn't prerender — the authoritative check is `ng build`'s
output file, see Step 3).
Confirm all 11 new `<meta>` tags appear in `<head>`.

- [ ] **Step 3: Verify in the production build output**

Run: `npx ng build`
Open `docs/index.html` (or the relevant prerendered root document if the
build outputs one per-route) and confirm the same 11 tags are present.

- [ ] **Step 4: Commit**

```bash
git add src/index.html
git commit -m "Add Open Graph and Twitter Card meta tags for social link previews"
```

---

## Self-Review Notes

- **Spec coverage:** All tags listed in the spec's Change section are included verbatim.
- **No placeholders:** exact tag content given, no TBD values.
