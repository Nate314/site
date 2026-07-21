# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Source for [nathangawith.com](https://nathangawith.com), a personal portfolio site built with Angular 22, deployed to GitHub Pages via the `publish` branch.

## Commands

- `npm start` — dev server at `http://localhost:4200/` (`ng serve`), reloads on source changes.
- `npm run build` — `ng build`, output to `docs/`, then copies `docs/index.html` to `docs/404.html` so client-side routes resolve on GitHub Pages.
- `npm test` — unit tests via Karma/Jasmine (`ng test`).
- `npm run lint` — ESLint (`ng lint`).
- `ng generate component component-name` — scaffold a new component (also `directive|pipe|service|class|guard|interface|enum|module`).

## Deployment

Build output (`docs/`) is pushed to the `publish` branch, which is what GitHub Pages actually serves. The `publish` branch has a **flat, built-artifact layout** entirely different from the source tree on `master` (e.g. `assets/db.json` at the root instead of `src/assets/db.json`, hashed JS bundle filenames). Do not branch `publish` off `master` or diff the two directly — branch a fix off `publish` itself, or rebuild and replace its contents. Content-only changes to `db.json` that don't require a rebuild can be applied directly to `publish`'s `assets/db.json`.

## Architecture

**Content is data, not code.** All site content — bios, links, project lists, application descriptions, video entries — lives in `src/assets/db.json` and is fetched at runtime via `HttpClient` (`DatabaseService.connection()` in `src/app/services/database.service.ts`), not hardcoded into components. The JSON is wrapped in `src/app/helpers/DB.ts`, whose `DB` class indexes into the raw structure (`db.home.pages[0]` = applications, `db.home.pages[1].subpages[0].videos` = videos, `db.home.pages[1].subpages[1]` = GitHub projects) and exposes typed getters (`getApplications()`, `getJavaApplications()`, `getVideos()`, `getGithubProjects()`, etc.). When adding new sections to `db.json`, check whether `DB.ts`'s positional indexing needs a matching accessor.

**Routing** (`src/app/app-routing.module.ts`) is mostly static per top-level page (`/home`, `/videos`, `/github-projects`, `/applications`), but each standalone web application under `/webapplications/*` gets its own explicit route mapped to a specific component — adding a new web app means adding both a `db.json` entry (under `Applications > WebApplications`) and a route. Each route carries an `animation` data value used for route-transition animations.

**Component layout** under `src/app/components/`:
- `application-structure/` — app shell (app-component, navbar, footer, not-found).
- `pages/` — routed pages (`home`, `videos`, `github-projects`, `applications`). `applications/` further contains the individual embedded web apps (betting calculator, group creator, say2, typing test, etc.) alongside `index.ts` barrel exports.

**Zoneless change detection (Angular 22 default for `bootstrapModule`, even with NgModules and no zone.js config change).** Template event bindings (`(click)`, `(input)`) still auto-trigger change detection, but component state set from a non-template async source (RxJS subscription, `setTimeout`/`setInterval`, `Promise`) will NOT update the view on its own.

**Rule:** after setting state from such a source, inject `ChangeDetectorRef` as `cdr` and call `this.cdr.detectChanges()`.
