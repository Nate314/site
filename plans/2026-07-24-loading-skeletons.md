# Skeleton Loading States Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show shimmering gray skeleton placeholders on `VideosComponent` and `GithubProjectsComponent` while `db.json` is loading, instead of a blank page.

**Architecture:** A shared `.skeleton` shimmer-animation utility class in `src/styles.css`. Each component gets a `loading: boolean` field (true until its `db.connection()` subscribe callback runs) gating a skeleton block vs. the real content.

**Tech Stack:** Angular 22 (NgModule-based, zoneless), plain CSS. No new dependencies.

## Global Constraints

- Zoneless change detection: `loading` is set to `false` inside the existing `db.connection().subscribe(...)` callback, which already ends with `this.cdr.detectChanges()` in both components — no new detectChanges call sites needed, just ensure `loading = false` happens before that existing call.
- No new unit tests planned — this is a visual-only change verified manually with throttled network conditions.
- `HomeComponent` and `ApplicationsComponent` are explicitly out of scope (see spec's Non-goals).
- The skeleton block's shape must roughly match the real content's layout (card grid for Videos, tab-strip + stacked cards for Github Projects) so there's no jarring layout jump when the real content swaps in.

---

## File Structure

- Modify: `src/styles.css` — shared `.skeleton` utility class.
- Modify: `src/app/components/pages/videos/videos.component.ts` / `.html`
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts` / `.html` / `.css`

---

### Task 1: Shared skeleton shimmer CSS utility

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Produces: a global `.skeleton` CSS class, consumed by Tasks 2 and 3.

- [ ] **Step 1: Add the utility class**

In `src/styles.css`, append:

```css
/* Generic shimmering placeholder block, used by any component's loading
   state (currently Videos and Github Projects). Give it explicit
   width/height (inline style or a component-scoped class) at each use site
   — this class only supplies the shimmer animation and rounded corners. */
.skeleton {
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
}

@keyframes skeleton-shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles.css
git commit -m "Add a shared skeleton shimmer CSS utility class"
```

---

### Task 2: Skeleton loading state for VideosComponent

**Files:**
- Modify: `src/app/components/pages/videos/videos.component.ts:1-57`
- Modify: `src/app/components/pages/videos/videos.component.html`

**Interfaces:**
- Consumes: `.skeleton` from Task 1.
- Produces: `loading: boolean` and `skeletonCards: unknown[]`, used only by this task's own template.

- [ ] **Step 1: Add `loading` and `skeletonCards` fields**

In `src/app/components/pages/videos/videos.component.ts`, find:

```ts
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  // Set (from a "video" query param) when navigating in from a project's
  // "Watch the video" link, and cleared after the highlight-pulse animation
  // finishes so the CSS class can retrigger on a later visit.
  highlightedVideoTitle: string | null = null;
```

Replace with:

```ts
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  // True until db.json resolves; gates the skeleton vs. real content in the
  // template. skeletonCards exists only to give *ngFor something to repeat
  // over for a fixed number of placeholder cards.
  loading = true;
  skeletonCards: unknown[] = new Array(6);

  // Set (from a "video" query param) when navigating in from a project's
  // "Watch the video" link, and cleared after the highlight-pulse animation
  // finishes so the CSS class can retrigger on a later visit.
  highlightedVideoTitle: string | null = null;
```

- [ ] **Step 2: Clear `loading` once data arrives**

Find:

```ts
      this.applyLinkedVideoHighlight();
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }
```

Replace with:

```ts
      this.applyLinkedVideoHighlight();
      this.loading = false;
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }
```

- [ ] **Step 3: Add the skeleton block to the template**

In `src/app/components/pages/videos/videos.component.html`, find:

```html
<div class="video-grid">
  <mat-card class="mat-elevation-z4 video-card" *ngFor="let video of videos"
    [id]="videoElementId(video.title)" [class.highlight-pulse]="video.title === highlightedVideoTitle">
```

Replace with:

```html
<div class="video-grid" *ngIf="loading">
  <mat-card class="mat-elevation-z4 video-card" *ngFor="let card of skeletonCards">
    <div class="skeleton" style="height: 22px; width: 60%; margin-bottom: 12px;"></div>
    <div class="video-media skeleton"></div>
    <div class="skeleton" style="height: 14px; width: 90%; margin-top: 12px;"></div>
    <div class="skeleton" style="height: 14px; width: 70%; margin-top: 6px;"></div>
  </mat-card>
</div>
<div class="video-grid" *ngIf="!loading">
  <mat-card class="mat-elevation-z4 video-card" *ngFor="let video of videos"
    [id]="videoElementId(video.title)" [class.highlight-pulse]="video.title === highlightedVideoTitle">
```

Then find the closing tags of the original grid (unchanged content in between — do not duplicate the card body, only the two wrapping `<div class="video-grid">` opens above and the single close below need adjusting):

```html
  </mat-card>
</div>
```

Replace with (this closes the `*ngIf="!loading"` grid only — the `*ngIf="loading"` skeleton grid from Step 3 above already has its own closing `</div>` written inline in that block):

```html
  </mat-card>
</div>
```

(No change needed here — the existing closing tags already correctly close the real-content grid; this step just confirms no duplicate/orphaned closing tag was introduced. Re-read the full file after editing to confirm exactly two top-level `<div class="video-grid">...</div>` blocks exist, one per `*ngIf` branch, each internally well-formed.)

- [ ] **Step 4: Manually verify in the browser with throttled network**

Run: `npm start`
Open Chrome DevTools → Network tab → set throttling to "Slow 3G" (or similar).
Navigate to `http://localhost:4200/videos` (hard reload).
Expected: six shimmering gray skeleton cards appear first, roughly matching
the real cards' shape (title bar, 16:9 media box, two text lines), then
swap cleanly to the real video cards once the fetch resolves, with no
visible layout jump.
Reset network throttling to "No throttling" and stop the dev server
(Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/videos/videos.component.ts src/app/components/pages/videos/videos.component.html
git commit -m "Show skeleton placeholder cards on Videos while db.json loads"
```

---

### Task 3: Skeleton loading state for GithubProjectsComponent

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts:25-67`
- Modify: `src/app/components/pages/github-projects/github-projects.component.html:1-76`
- Modify: `src/app/components/pages/github-projects/github-projects.component.css`

**Interfaces:**
- Consumes: `.skeleton` from Task 1.
- Produces: `loading: boolean`, `skeletonTabs: unknown[]`, `skeletonCards: unknown[]`, used only by this task's own template.

- [ ] **Step 1: Add `loading` and skeleton-count fields**

In `src/app/components/pages/github-projects/github-projects.component.ts`, find:

```ts
export class GithubProjectsComponent implements OnInit, AfterViewInit, OnDestroy {

  projects: any[];
```

Replace with:

```ts
export class GithubProjectsComponent implements OnInit, AfterViewInit, OnDestroy {

  projects: any[];

  // True until db.json resolves; gates the skeleton vs. the real tab
  // strip/content in the template. skeletonTabs/skeletonCards exist only
  // to give *ngFor something to repeat over for a fixed placeholder count.
  loading = true;
  skeletonTabs: unknown[] = new Array(4);
  skeletonCards: unknown[] = new Array(4);
```

- [ ] **Step 2: Clear `loading` once data arrives**

Find:

```ts
    this.db.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.projects = githubProjects.subpages;
      this.applyLinkedProjectHighlight();
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
```

Replace with:

```ts
    this.db.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.projects = githubProjects.subpages;
      this.applyLinkedProjectHighlight();
      this.loading = false;
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
```

- [ ] **Step 3: Wrap the existing tabs/content in `*ngIf="!loading"` and add the skeleton**

In `src/app/components/pages/github-projects/github-projects.component.html`, find:

```html
<div class="page-tabs">
  <div *ngFor="let tab of pageTabs" class="page-tab" [class.page-tab-active]="activeTab === tab.key"
    (click)="selectTab(tab.key)">
    {{ tab.label }}
  </div>
</div>
```

Replace with:

```html
<div *ngIf="loading" class="page-tabs">
  <div class="skeleton page-tab-skeleton" *ngFor="let tab of skeletonTabs"></div>
</div>
<div *ngIf="loading">
  <mat-card class="mat-elevation-z4 skeleton-card" *ngFor="let card of skeletonCards">
    <div class="skeleton" style="height: 20px; width: 40%; margin-bottom: 10px;"></div>
    <div class="skeleton" style="height: 14px; width: 70%;"></div>
  </mat-card>
</div>

<div class="page-tabs" *ngIf="!loading">
  <div *ngFor="let tab of pageTabs" class="page-tab" [class.page-tab-active]="activeTab === tab.key"
    (click)="selectTab(tab.key)">
    {{ tab.label }}
  </div>
</div>
```

Then find the very end of the file:

```html
<div *ngFor="let group of projectGroups" class="tab-content" [hidden]="activeTab !== group.category">
```

Replace with:

```html
<div *ngIf="!loading" *ngFor="let group of projectGroups" class="tab-content" [hidden]="activeTab !== group.category">
```

Note: Angular does not allow two structural directives (`*ngIf` and `*ngFor`) on the same element. Use this exact replacement instead, wrapping the existing `*ngFor` block in an `ng-container`:

```html
<ng-container *ngIf="!loading">
  <div *ngFor="let group of projectGroups" class="tab-content" [hidden]="activeTab !== group.category">
```

...and add a matching `</ng-container>` immediately after that block's existing closing `</div>` (the one that closes the outermost `*ngFor="let group of projectGroups"` div — the very last `</div>` in the file, before end of file). Also wrap the pre-existing WellSky `<div class="tab-content" [hidden]="activeTab !== 'wellsky'">...</div>` block the same way — it must also only render `*ngIf="!loading"`, since `pageTabs`/`activeTab` behavior depends on data having loaded. Wrap all three (page-tabs already handled above with its own `*ngIf`, WellSky tab-content, and the project-groups tab-content) inside one `<ng-container *ngIf="!loading">...</ng-container>` spanning from the real `page-tabs` div through the end of the file, rather than three separate `*ngIf`s, to keep the diff simple: put `<ng-container *ngIf="!loading">` right before `<div class="page-tabs">` (replacing the standalone `*ngIf="!loading"` on that div from the first replacement above with a plain `<div class="page-tabs">` again) and `</ng-container>` at the very end of the file.

- [ ] **Step 4: Add skeleton-specific sizing CSS**

In `src/app/components/pages/github-projects/github-projects.component.css`, append:

```css
.page-tab-skeleton {
  width: 140px;
  height: 38px;
  margin: 0 4px 0 0;
}

.skeleton-card {
  margin-bottom: 16px;
}
```

- [ ] **Step 5: Manually verify in the browser with throttled network**

Run: `npm start`
Open Chrome DevTools → Network tab → set throttling to "Slow 3G".
Navigate to `http://localhost:4200/github-projects` (hard reload).
Expected: four shimmering tab-shaped bars and four shimmering card-shaped
blocks appear first, then swap cleanly to the real tab strip (WellSky +
category tabs) and the default WellSky tab's contribution graph once the
fetch resolves, with no visible layout jump and no console errors (in
particular, no "two structural directives on one element" template compile
error — if `ng serve` fails to compile, the `ng-container` wrapping in Step
3 was done incorrectly; re-check it).
Reset network throttling and stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.ts src/app/components/pages/github-projects/github-projects.component.html src/app/components/pages/github-projects/github-projects.component.css
git commit -m "Show skeleton placeholder tabs/cards on Github Projects while db.json loads"
```

---

## Self-Review Notes

- **Spec coverage:** Shared CSS utility (Task 1), Videos skeleton (Task 2), Github Projects skeleton (Task 3) all covered; Home/Applications correctly excluded per the spec's Non-goals.
- **Type consistency:** `loading: boolean` and the skeleton-count arrays are named identically in both components (Task 2/3) but are entirely local — no cross-task interface to keep consistent beyond the shared `.skeleton` CSS class name from Task 1.
- **Known risk flagged inline:** Task 3 Step 3 is the trickiest edit in this plan (two structural directives can't share an element in Angular) — the step explicitly calls out the `ng-container` wrapping technique and tells the implementer how to recognize if they got it wrong (a template compile error), rather than leaving it implicit.
