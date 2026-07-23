# Social-Share (Open Graph) Meta Tags

**Date:** 2026-07-23
**Status:** Approved

## Problem

`src/index.html` has no `<meta name="description">` or Open Graph
(`og:*`)/Twitter Card tags. Sharing a link to the site (e.g. in Slack,
LinkedIn, iMessage) currently renders as a bare title with no description
or preview image, since those platforms read `og:title`/`og:description`/
`og:image` when generating link previews.

## Goal

Add a static description and Open Graph/Twitter Card meta tags to
`index.html` so shared links render a proper preview: title, description,
and an image (the existing site logo icon).

## Non-goals

- Per-page dynamic meta tags (e.g. a different `og:description` for
  `/videos` vs `/github-projects`) — this is a client-side-rendered SPA with
  a single `index.html`; per-route meta tags would need `Meta`/`Title`
  service wiring in each page component, which is a larger change than this
  task. One static, site-wide description is the scope here.
- A dedicated social preview graphic — reusing the existing hosted logo
  icon (`ng_icon_cutout.svg`), per your answer to the design question.

## Change

In `src/index.html`, inside `<head>`, add:

```html
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
```

## Testing

Manually verify: view page source (`ng build` output `docs/index.html`, or
`ng serve` + browser "View Page Source") and confirm all tags are present
with the expected content. Optionally paste the live URL into a social
platform's link-preview debugger (e.g. Facebook's Sharing Debugger,
Twitter's Card Validator) after deploy to confirm real-world rendering —
not required before merge, since this is static markup with no runtime
logic to break.
