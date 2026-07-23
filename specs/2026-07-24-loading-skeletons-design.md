# Skeleton Loading States for Videos and Github Projects

**Date:** 2026-07-24
**Status:** Approved

## Problem

`DatabaseService.connection()` fetches `assets/db.json` over HTTP once
(cached via `shareReplay(1)` for the rest of the session), but on the first
page visited in a session, that fetch takes a visible beat. `VideosComponent`
renders a completely empty `.video-grid` until it resolves, and
`GithubProjectsComponent` renders an empty tab strip and no cards (its
separate WellSky contribution graph, fetched independently, is out of scope
here — it already has no loading state and this task doesn't change that).
`HomeComponent` is not really affected — its intro paragraphs are static
content that renders immediately regardless of data-load state, only a few
secondary paragraphs (friend/tool links) are gated on the fetch — so it's
excluded from this task's scope.

## Goal

Show gray shimmering skeleton placeholders, shaped like the real content, on
`VideosComponent` and `GithubProjectsComponent` while `db.json` is loading,
replaced by the real content once it resolves.

## Non-goals

- `HomeComponent` or `ApplicationsComponent` — not visibly blank today (Home
  per above; Applications wasn't identified as a problem case and is out of
  scope for this pass).
- A loading state for `GithubProjectsComponent`'s separate WellSky
  contribution-graph fetch.
- A generic/reusable Angular directive or component for skeletons — a
  shared CSS utility class is enough for two call sites (see Architecture).

## Architecture

A single generic `.skeleton` CSS class (shimmering gradient animation) is
added to the global `src/styles.css` — this is cross-cutting utility CSS
used identically by two unrelated components in the same change, unlike the
feature-specific `.highlight-pulse` duplication elsewhere on this branch,
so a shared global class is the right call here, not premature.

Each component gets a `loading: boolean` field (`true` initially, set
`false` once its `db.connection()` subscribe callback runs) and a
`*ngIf="loading"` skeleton block sized/shaped like its real content,
alongside the existing `*ngIf="!loading"`-gated real content.

## Testing

Manually verify in `ng serve`: the fetch is fast on localhost, so to
actually see the skeleton, throttle the network in browser dev tools (e.g.
Chrome DevTools → Network → Slow 3G) and reload `/videos` and
`/github-projects` — confirm the skeleton shows first, shimmering, shaped
like the eventual real content, then swaps cleanly to the real content with
no layout jump.
