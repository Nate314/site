# Video → Github Project Highlight Link

**Date:** 2026-07-21
**Status:** Approved

## Problem

The Videos page (`/videos`) shows a handful of YouTube videos, some of which
document code the author wrote (e.g. "Typing Bot", a video about a bot
written to win a typing contest). The code for that bot lives in the "Simple
JS Projects" repo, listed on the Github Projects page (`/github-projects`),
but there's no link between the two pages — a visitor watching "Typing Bot"
has no way to find the code behind it.

## Goals

- Let a video entry optionally point at its corresponding Github Projects
  entry.
- Clicking through takes the visitor to the Github Projects page, switches to
  the right category tab, scrolls the matching project card into view, and
  briefly highlights it so it's obvious which project the video referred to.
- Data-driven via `db.json`, consistent with the rest of the site's content.

## Non-goals

- Wiring up every video that describes code (e.g. "TetrisBot") — only
  "Typing Bot" → "Simple JS Projects" for now. The mechanism works for any
  video; more can be added to `db.json` later without code changes.
- Auto-expanding the highlighted project's README on arrival — only
  tab-switch + scroll + highlight.

## Data model changes

Add one optional field to video entries in
`nate314.home.pages[1].subpages[0].videos` (`src/assets/db.json`):

```jsonc
{
  "description": "As a computer science student, a friend of mine challenged me to a typing contest. I lost, so I thought it would be fun to code a bot to play for me. As you can see in this video, it isn't actually very fast.",
  "link": "https://www.youtube.com/embed/UzCBnGSdWAE",
  "title": "Typing Bot",
  "linkedProject": "Simple JS Projects"
}
```

- `linkedProject` (string, optional): the exact `title` of the matching entry
  under Github Projects (`nate314.home.pages[1].subpages[1].subpages`). Set
  to `"Simple JS Projects"` on the "Typing Bot" video entry.

No changes to `src/app/helpers/DB.ts` — `getVideos()` already passes video
entries through untouched.

## `videos.component.ts` / `.html` changes

`Video` class gains an optional field:

```ts
class Video {
  title: string;
  link: SafeResourceUrl;
  description: string;
  preview: string;
  enabled: boolean;
  linkedProject?: string;
}
```

`ngOnInit`'s `dbVideos.map(...)` passes `v["linkedProject"]` through onto the
mapped `Video` object.

Template: when `video.linkedProject` is set, render a second link next to
the existing "Click here to watch on Youtube" line:

```html
<p *ngIf="video.linkedProject">
  <a [routerLink]="['/github-projects']" [queryParams]="{ project: video.linkedProject }">
    View the code &rarr;
  </a>
</p>
```

## `github-projects.component.ts` / `.html` changes

Inject `ActivatedRoute`. On init, after `this.projects` is populated,
subscribe to `route.queryParamMap` and:

1. Read the `project` query param.
2. If it matches a project's `title` (case-sensitive exact match, same
   string as `db.json`), set `activeTab` to that project's `category`.
3. After the view updates (next microtask, e.g. via `setTimeout(() => ..., 0)`
   or `queueMicrotask`, since the matching card only exists in the DOM once
   the tab switch renders), scroll the matching card into view
   (`scrollIntoView({ behavior: "smooth", block: "center" })`) and set a
   `highlightedProjectTitle` field to the project's title.
4. Bind a `highlight-pulse` CSS class on the project card
   (`[class.highlight-pulse]="project.title === highlightedProjectTitle"`).
   After a fixed delay (2 seconds), clear `highlightedProjectTitle` back to
   `null` so the class is removed (re-triggering the CSS animation on a
   later visit requires the class to actually toggle off, not just fade
   visually while still applied).

If the `project` query param doesn't match any project (typo, stale link,
etc.), do nothing extra — page behaves exactly as it does today (default
first-tab / WellSky view).

## Styling

`.highlight-pulse` in `github-projects.component.css`: a colored outline/glow
(reusing the featured-ribbon purple `#5b4b8a`) that fades out via a CSS
`transition` on `box-shadow`/`outline` opacity over ~2 seconds, matching the
2-second `highlightedProjectTitle` clear timer above so the visual fade and
the class removal line up.

## Testing

- Manually verify in `ng serve`: from `/videos`, click "View the code →" on
  the "Typing Bot" card; confirm navigation to `/github-projects` lands on
  the "Personal Projects" tab (Simple JS Projects' category), the "Simple JS
  Projects" card is scrolled into view, and it visibly highlights and then
  the highlight fades after ~2 seconds.
- Confirm navigating to `/github-projects` directly (no query param) behaves
  unchanged.
- Confirm navigating to `/github-projects?project=NoSuchProject` behaves
  unchanged (no crash, default tab shown).
- No new unit tests planned, consistent with the existing lack of test
  coverage for `github-projects.component.ts` and `videos.component.ts`.
