# Project → Video Highlight Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a project card on `/github-projects` link to its matching video on `/videos` (mirroring the existing video→project link), with both directions stored explicitly in `db.json` and a unit test that fails if they ever go out of sync.

**Architecture:** `linkedVideo` fields added to the two Github Projects entries that already have a matching video's `linkedProject`. A new `DB.spec.ts` test imports `db.json` directly and asserts both directions are reciprocal. `GithubProjectsComponent`'s template gains a "Watch the video →" link when `project.linkedVideo` is set. `VideosComponent` gains the same `ActivatedRoute` query-param → scroll-into-view → timed-highlight pattern already used by `GithubProjectsComponent`, simplified since Videos has no tabs.

**Tech Stack:** Angular 22 (NgModule-based, zoneless), TypeScript, Jasmine/Karma, Angular Router. No new runtime dependencies; `resolveJsonModule` added to `tsconfig.json` for the test's direct JSON import.

## Global Constraints

- Zoneless change detection: any component state set from a non-template async source (`setTimeout`) must be followed by `this.cdr.detectChanges()` (see `CLAUDE.md`).
- This feature's one piece of automated test coverage is the bidirectional-link consistency check (explicitly requested) — do not add any other test files; everything else is manual verification via `ng serve`, consistent with this repo's existing lack of component-level test coverage.
- `linkedVideo`/`linkedProject` values must match the referenced entry's `title` field exactly (case-sensitive), same convention as the existing video→project link.
- Follow existing code conventions in touched files (comment style explaining *why* not *what*; the existing `(click)="$event.stopPropagation()"` pattern for in-card links; the existing `<p *ngIf="...">` pattern already used for "View the code" on the Videos page, rather than introducing a new wrapper `<div>`/CSS class).

---

## File Structure

- Modify: `src/assets/db.json` — add `linkedVideo` to two Github Projects entries.
- Modify: `tsconfig.json` — add `resolveJsonModule: true`.
- Create: `src/app/helpers/DB.spec.ts` — bidirectional link consistency test.
- Modify: `src/app/components/pages/github-projects/github-projects.component.html` — "Watch the video →" link.
- Modify: `src/app/components/pages/videos/videos.component.ts` / `.html` / `.css` — query-param handling, scroll-into-view, timed highlight.

---

### Task 1: Add `linkedVideo` to the two matching project entries

**Files:**
- Modify: `src/assets/db.json`

**Interfaces:**
- Produces: `linkedVideo: string` field on two Github Projects entries, consumed by Task 2's test and Task 3's template.

- [ ] **Step 1: Add `linkedVideo` to "Simple JS Projects"**

Find:

```json
                {
                  "category": "personal",
                  "description": "https://raw.githubusercontent.com/Nate314/simplejsprojects/master/README.md",
                  "link": "https://github.com/Nate314/simplejsprojects",
                  "title": "Simple JS Projects"
                },
```

Replace with:

```json
                {
                  "category": "personal",
                  "description": "https://raw.githubusercontent.com/Nate314/simplejsprojects/master/README.md",
                  "link": "https://github.com/Nate314/simplejsprojects",
                  "title": "Simple JS Projects",
                  "linkedVideo": "Typing Bot"
                },
```

- [ ] **Step 2: Add `linkedVideo` to "Minecraft Stats Search"**

Find:

```json
                {
                  "category": "personal",
                  "description": "https://raw.githubusercontent.com/Nate314/minecraft-stats-search/master/README.md",
                  "link": "https://github.com/Nate314/minecraft-stats-search",
                  "title": "Minecraft Stats Search"
                }
```

Replace with:

```json
                {
                  "category": "personal",
                  "description": "https://raw.githubusercontent.com/Nate314/minecraft-stats-search/master/README.md",
                  "link": "https://github.com/Nate314/minecraft-stats-search",
                  "title": "Minecraft Stats Search",
                  "linkedVideo": "Minecraft Statistics Search Mod"
                }
```

(Note: this is the last entry in its array — keep it without a trailing comma, exactly as shown.)

- [ ] **Step 3: Validate the JSON is well-formed**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/assets/db.json', 'utf8')); console.log('valid')"`
Expected output: `valid`

- [ ] **Step 4: Commit**

```bash
git add src/assets/db.json
git commit -m "Add linkedVideo back-references for Simple JS Projects and Minecraft Stats Search"
```

---

### Task 2: Bidirectional link consistency test

**Files:**
- Modify: `tsconfig.json`
- Create: `src/app/helpers/DB.spec.ts`

**Interfaces:**
- Consumes: `linkedProject`/`linkedVideo` fields from `db.json` (Task 1 and the pre-existing video-side data).
- Produces: no runtime interface — this is a standalone test file with no consumers.

- [ ] **Step 1: Enable JSON module imports**

In `tsconfig.json`, find:

```json
    "target": "ES2022",
    "useDefineForClassFields": false,
```

Replace with:

```json
    "target": "ES2022",
    "useDefineForClassFields": false,
    "resolveJsonModule": true,
```

- [ ] **Step 2: Write the failing test**

Create `src/app/helpers/DB.spec.ts`:

```ts
import db from "../../assets/db.json";

describe("db.json project<->video links", () => {
  const videos = (db as any).nate314.home.pages[1].subpages[0].videos as any[];
  const projects = (db as any).nate314.home.pages[1].subpages[1].subpages as any[];

  it("has a reciprocal linkedVideo on the project for every video's linkedProject", () => {
    for (const video of videos.filter(v => v.linkedProject)) {
      const project = projects.find(p => p.title === video.linkedProject);
      expect(project)
        .withContext(`video "${video.title}" links to unknown project "${video.linkedProject}"`)
        .toBeDefined();
      expect(project.linkedVideo)
        .withContext(`project "${video.linkedProject}" is missing a linkedVideo back to "${video.title}"`)
        .toBe(video.title);
    }
  });

  it("has a reciprocal linkedProject on the video for every project's linkedVideo", () => {
    for (const project of projects.filter(p => p.linkedVideo)) {
      const video = videos.find(v => v.title === project.linkedVideo);
      expect(video)
        .withContext(`project "${project.title}" links to unknown video "${project.linkedVideo}"`)
        .toBeDefined();
      expect(video.linkedProject)
        .withContext(`video "${project.linkedVideo}" is missing a linkedProject back to "${project.title}"`)
        .toBe(project.title);
    }
  });
});
```

- [ ] **Step 3: Run the test suite and confirm it passes against the current data**

Run: `npx ng test --watch=false --browsers=ChromeHeadless`
Expected: all tests pass, including the two new `db.json project<->video links` specs (Task 1's data already satisfies both directions, so this should be green immediately — there is no separate "make it pass" step because the data and the test are added in adjacent tasks, not interleaved).

- [ ] **Step 4: Prove the test actually catches a broken link**

Temporarily edit `src/assets/db.json` to remove the `"linkedVideo": "Typing Bot"` line from "Simple JS Projects" (leaving the video's `"linkedProject": "Simple JS Projects"` in place), run `npx ng test --watch=false --browsers=ChromeHeadless` again, and confirm the `db.json project<->video links` suite now fails with a message naming the missing back-reference. Then revert the edit (re-add the line) and run the suite once more to confirm it's green again.

- [ ] **Step 5: Commit**

```bash
git add tsconfig.json src/app/helpers/DB.spec.ts
git commit -m "Add a unit test enforcing bidirectional project<->video db.json links"
```

---

### Task 3: "Watch the video" link on the project card

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.html:63-66`

**Interfaces:**
- Consumes: `project.linkedVideo?: string` from Task 1's `db.json` data.
- Produces: no new outputs — template-only change, no `.ts` modification needed (the component already exposes `project` objects with whatever fields `db.json` provides).

- [ ] **Step 1: Add the link**

In `src/app/components/pages/github-projects/github-projects.component.html`, find:

```html
      <div class="award-detail" *ngIf="project.award">
        {{project.award.text}} &middot;
        <a [href]="project.award.link" target="_blank" rel="noopener" (click)="$event.stopPropagation()">view details &rarr;</a>
      </div>
```

Replace with:

```html
      <div class="award-detail" *ngIf="project.award">
        {{project.award.text}} &middot;
        <a [href]="project.award.link" target="_blank" rel="noopener" (click)="$event.stopPropagation()">view details &rarr;</a>
      </div>
      <p *ngIf="project.linkedVideo">
        <a [routerLink]="['/videos']" [queryParams]="{ video: project.linkedVideo }" (click)="$event.stopPropagation()">
          Watch the video &rarr;
        </a>
      </p>
```

- [ ] **Step 2: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/github-projects`, click the "Personal Projects" tab.
Expected: "Simple JS Projects" and "Minecraft Stats Search" each show a "Watch the video →" line; no other project card shows it; clicking a project's title/expand row still toggles its README as before (the new link doesn't interfere).
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.html
git commit -m "Add a 'Watch the video' link on projects with a linked video"
```

---

### Task 4: Scroll to and highlight the linked video

**Files:**
- Modify: `src/app/components/pages/videos/videos.component.ts:1-71`
- Modify: `src/app/components/pages/videos/videos.component.html:1-17`
- Modify: `src/app/components/pages/videos/videos.component.css`

**Interfaces:**
- Consumes: the `video` query param produced by Task 3's router link (a video `title` string); `this.videos` (already populated by the existing `db.connection()` subscription).
- Produces: `highlightedVideoTitle: string | null` field and `videoElementId(title: string): string` method, used only by this task's own template.

- [ ] **Step 1: Inject `ActivatedRoute` and add highlight state**

In `src/app/components/pages/videos/videos.component.ts`, find:

```ts
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DatabaseService } from "src/app/services";
```

Replace with:

```ts
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DatabaseService } from "src/app/services";
```

Find:

```ts
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private db: DatabaseService,
    private cdr: ChangeDetectorRef
  ) { }
```

Replace with:

```ts
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  // Set (from a "video" query param) when navigating in from a project's
  // "Watch the video" link, and cleared after the highlight-pulse animation
  // finishes so the CSS class can retrigger on a later visit.
  highlightedVideoTitle: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private db: DatabaseService,
    private cdr: ChangeDetectorRef
  ) { }
```

- [ ] **Step 2: Handle the `video` query param once videos are loaded**

Find:

```ts
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }

  getYoutubeLink(sanatizedLink: any): string {
```

Replace with:

```ts
      this.applyLinkedVideoHighlight();
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }

  // Scrolls to and schedules a highlight-pulse on the linked video once the
  // page has rendered. No-ops (page loads exactly as it does with no query
  // param) if there's no "video" param or it doesn't match any known video
  // title.
  private applyLinkedVideoHighlight() {
    const title = this.route.snapshot.queryParamMap.get("video");
    if (!title) return;
    const video = this.videos.find(v => v.title === title);
    if (!video) return;
    setTimeout(() => {
      document.getElementById(this.videoElementId(video.title))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      this.highlightedVideoTitle = video.title;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.highlightedVideoTitle = null;
        this.cdr.detectChanges();
      }, 2000);
    }, 0);
  }

  // Turns a video title into a DOM-safe id for scrollIntoView targeting.
  videoElementId(title: string): string {
    return "video-" + title.replace(/[^a-zA-Z0-9]+/g, "-");
  }

  getYoutubeLink(sanatizedLink: any): string {
```

- [ ] **Step 3: Bind the id and highlight class on each video card**

In `src/app/components/pages/videos/videos.component.html`, find:

```html
<div class="video-grid">
  <mat-card class="mat-elevation-z4 video-card" *ngFor="let video of videos">
```

Replace with:

```html
<div class="video-grid">
  <mat-card class="mat-elevation-z4 video-card" *ngFor="let video of videos"
    [id]="videoElementId(video.title)" [class.highlight-pulse]="video.title === highlightedVideoTitle">
```

- [ ] **Step 4: Add the highlight-pulse styling**

In `src/app/components/pages/videos/videos.component.css`, append:

```css
.highlight-pulse {
  animation: highlight-pulse 2s ease-out;
}

@keyframes highlight-pulse {
  from {
    outline: 3px solid #5b4b8a;
    outline-offset: 2px;
    box-shadow: 0 0 12px 2px rgba(91, 75, 138, 0.6);
  }
  to {
    outline: 3px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 0 rgba(91, 75, 138, 0);
  }
}
```

- [ ] **Step 5: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/github-projects`, click the "Personal Projects" tab, click "Watch the video →" on "Simple JS Projects".
Expected:
- Browser navigates to `http://localhost:4200/videos?video=Typing%20Bot`.
- The page scrolls so the "Typing Bot" video card is roughly centered in the viewport.
- The "Typing Bot" card shows a purple outline/glow that visibly fades out over about 2 seconds.
- No other video card shows the outline/glow.

Then check the no-param and bad-param cases:
- Navigate directly to `http://localhost:4200/videos` (no query string): page behaves exactly as before (no scroll, no highlight).
- Navigate to `http://localhost:4200/videos?video=NoSuchVideo`: page behaves exactly as with no query string (no crash).

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/pages/videos/videos.component.ts src/app/components/pages/videos/videos.component.html src/app/components/pages/videos/videos.component.css
git commit -m "Scroll to and highlight a video linked in from a project"
```

---

## Self-Review Notes

- **Spec coverage:** Data model (Task 1), consistency test (Task 2), project-side link (Task 3), video-side scroll/highlight (Task 4) all covered, matching every section of the spec.
- **Type consistency:** `videoElementId(title: string): string` and `highlightedVideoTitle: string | null` introduced in Task 4 mirror the existing `projectElementId`/`highlightedProjectTitle` naming pattern in `GithubProjectsComponent` exactly, used only within Task 4's own template. `linkedVideo` (Task 1's `db.json` field) is read only in Task 3's template and Task 2's test — no other task touches it.
- **No placeholders:** all steps show full, exact code/markup/CSS to write, including the explicit "prove the test can fail" step (Task 2 Step 4) the user asked for.
