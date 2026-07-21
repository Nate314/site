# GitHub Project Badges — Featured & Award Highlights

**Date:** 2026-07-21
**Status:** Approved

## Problem

The Github Projects page (`/github-projects`) lists all projects flatly within
their category tab (personal/school/hackathon), in whatever order they appear
in `src/assets/db.json`. There's no way to signal that some projects — e.g.
"Graph Theory Game" — are more representative of the author's work than
others, like "Island Decimation". There's also no way to call out that
"Turing Messenger" won 3rd place at Hack K-State
(https://devpost.com/software/turing-messenger).

## Goals

- Let specific projects be marked as "featured" and visually stand out.
- Let a project optionally carry award info (short ribbon label, full text,
  and a link to more detail) and have that award imply "featured" styling.
- No new admin UI — this is data-driven the same way the rest of the site's
  content is, via `db.json`.

## Non-goals

- A separate "Highlights" page/section outside the existing category tabs.
- Featured/award status for anything other than Github Projects entries.

## Data model changes

Add two optional fields to entries under
`nate314.home.pages[1].subpages[1].subpages` (the Github Projects list) in
`src/assets/db.json`:

```jsonc
{
  "category": "hackathon",
  "description": "https://raw.githubusercontent.com/NABSINA/TuringMessenger/master/README.md",
  "link": "https://github.com/NABSINA/TuringMessenger",
  "title": "Turing Messenger",
  "featured": true,
  "award": {
    "ribbon": "3RD PLACE",
    "text": "3rd Place, Hack K-State",
    "link": "https://devpost.com/software/turing-messenger"
  }
}
```

- `featured` (boolean, optional): marks a project to sort first within its
  category and get the "★ FEATURED" corner ribbon.
- `award` (object, optional): implies featured-worthy styling.
  - `ribbon` (string): short text shown in the card's corner ribbon (e.g.
    `"3RD PLACE"`).
  - `text` (string): full award description shown under the project title
    (e.g. `"3rd Place, Hack K-State"`).
  - `link` (string): URL for "more detail" (e.g. the Devpost page), rendered
    as a clickable link next to `text`.

Initial data changes: set `"featured": true` on "Graph Theory Game", and set
`"featured": true` plus the `award` object above on "Turing Messenger".

No changes to `src/app/helpers/DB.ts` — it already passes the Github Projects
subpages array through untouched via `getGithubProjects()`.

## Component changes (`github-projects.component.ts`)

`projectGroups` currently does:

```ts
projects: this.projects.filter(p => p.category === category)
```

Change to stable-sort so featured projects (including any with an `award`,
which implies featured) come first within the category, otherwise preserving
the existing db.json order:

```ts
projects: this.projects
  .filter(p => p.category === category)
  .map((p, i) => ({ p, i }))
  .sort((a, b) => Number(isFeatured(b.p)) - Number(isFeatured(a.p)) || a.i - b.i)
  .map(({ p }) => p)
```

where `isFeatured(p) = !!(p.featured || p.award)`.

## Template/styling changes

`github-projects.component.html`, inside the project card (`mat-card`):

- The card wrapper becomes position-relative so a ribbon can be absolutely
  positioned in its top-right corner.
- If `project.award`: render a gold ribbon reading `🏆 {{ project.award.ribbon
  }}`, and beneath the title a small gold line: `{{ project.award.text }} ·`
  followed by a link (`project.award.link`, opens in a new tab) reading
  "view details →".
- Else if `project.featured`: render a purple ribbon reading `★ FEATURED`.
- Else: no ribbon.

Ribbon and award-line styling added to `github-projects.component.css`
(colors: purple `#5b4b8a` for featured, gold `#8a6d1a`/`#c9a53b` for award,
matching the approved mockup).

## Testing

- Manually verify in `ng serve`: Graph Theory Game and Turing Messenger sort
  to the top of the "Hackathon Projects" tab, Turing Messenger shows the gold
  award ribbon + Devpost link, Graph Theory Game shows the purple featured
  ribbon, and no other project's ribbon/position changes.
- No new unit tests planned — this page has no existing spec file for
  ribbon/sorting behavior, and the existing test suite doesn't cover
  `github-projects.component.ts` beyond the default Angular scaffold.
