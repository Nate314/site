# Project → Video Highlight Link (Bidirectional)

**Date:** 2026-07-23
**Status:** Approved

## Problem

A prior feature lets a video on `/videos` link to its corresponding project on
`/github-projects` (a `linkedProject` field on the video entry, plus a "View
the code →" link that scrolls to and highlights the project card). There's no
link the other direction: a visitor looking at a project's card on
`/github-projects` has no way to jump to the video demonstrating it.

## Goals

- Add an explicit, symmetric `linkedVideo` field on the Github Projects side
  of each existing video↔project pair, stored alongside the existing
  `linkedProject` field on the video side — both directions live in
  `db.json`, not derived at runtime.
- Clicking a "Watch the video →" link on a project's card takes the visitor
  to `/videos`, scrolls to the matching video card, and briefly highlights
  it (same fade-glow treatment as the existing project-side highlight).
- A unit test fails the build if the two directions ever go out of sync (a
  video's `linkedProject` without a matching project's `linkedVideo`, or
  vice versa, or either pointing at a title that doesn't exist).

## Non-goals

- Auto-playing the video on arrival — only scroll + highlight, matching the
  existing project-side behavior.
- Deriving the reverse link at runtime instead of storing it explicitly —
  the user explicitly asked for both directions to be stored in `db.json`,
  enforced by a test, not computed.

## Data model changes

Add `linkedVideo` (string, a video's exact `title`) to the two Github
Projects entries that already have a matching video via `linkedProject`:

- "Simple JS Projects" → `"linkedVideo": "Typing Bot"` (matches the "Typing
  Bot" video's existing `"linkedProject": "Simple JS Projects"`).
- "Minecraft Stats Search" → `"linkedVideo": "Minecraft Statistics Search
  Mod"` (matches that video's existing `"linkedProject": "Minecraft Stats
  Search"`).

No other entries change.

## Consistency test

New file `src/app/helpers/DB.spec.ts`. `tsconfig.json` gains
`"resolveJsonModule": true` under `compilerOptions` so the spec can `import
db from "src/assets/db.json"` directly (synchronous, no HTTP mocking
needed) and get type-checked JSON.

The test walks `db.nate314.home.pages[1].subpages[0].videos` (videos) and
`db.nate314.home.pages[1].subpages[1].subpages` (Github Projects) and
asserts, for every video with a `linkedProject` and every project with a
`linkedVideo`:

- The referenced title exists on the other side.
- The reference is reciprocal: if video V has `linkedProject === P.title`,
  then project P must have `linkedVideo === V.title`, and vice versa.

This fails (not just warns) if either direction is missing or mismatched,
so an author who adds one side of a link and forgets the other finds out
immediately.

## `GithubProjectsComponent` / `.html` changes

When `project.linkedVideo` is set, render a "Watch the video →" link next to
the existing project link/title row, using the same
`(click)="$event.stopPropagation()"` pattern already used there so it
doesn't toggle the card's README expand/collapse:

```html
<a [routerLink]="['/videos']" [queryParams]="{ video: project.linkedVideo }"
  (click)="$event.stopPropagation()">
  Watch the video &rarr;
</a>
```

No changes to `GithubProjectsComponent`'s TypeScript — this is template-only,
reading a field already present on `project` once Task 1's data lands.

## `VideosComponent` / `.html` / `.css` changes

Mirrors `GithubProjectsComponent`'s existing query-param handling
(`ActivatedRoute`, scroll-into-view, timed highlight class), simplified
since the Videos page has no tabs to switch:

- Inject `ActivatedRoute`.
- On init, after `this.videos` is populated, read the `video` query param;
  if it matches a video's `title`, scroll that card into view and set
  `highlightedVideoTitle` for 2 seconds (same `setTimeout` +
  `cdr.detectChanges()` zoneless pattern as the existing project-side code).
- Add `[id]="videoElementId(video.title)"` and
  `[class.highlight-pulse]="video.title === highlightedVideoTitle"` on each
  video's `mat-card`.
- No-ops cleanly (page loads exactly as it does today) if there's no `video`
  param or it doesn't match any video title.

`videos.component.css` gets its own copy of the `.highlight-pulse` `@keyframes`
rule (identical to the one in `github-projects.component.css`) — duplicated
rather than extracted into a shared stylesheet, consistent with this
codebase's existing convention of each component owning its own styles;
extracting a shared abstraction for a two-use-case animation would be
premature.

## Testing

- The new `DB.spec.ts` test runs as part of the existing `ng test` suite —
  this is the one piece of automated test coverage in this feature (per your
  explicit request), everything else is manual verification, consistent
  with this repo's existing lack of component-level test coverage.
- Manually verify in `ng serve`:
  - On `/github-projects`, "Simple JS Projects" and "Minecraft Stats Search"
    show a "Watch the video →" link; no other project shows it.
  - Clicking it navigates to `/videos?video=<title>`, scrolls to the matching
    video card, and highlights it with the fading purple glow; clicking the
    link doesn't also toggle the source project card's expand state.
  - Navigating to `/videos` with no query param, or an unmatched `video`
    param, behaves exactly as today (no crash, no scroll, no highlight).
