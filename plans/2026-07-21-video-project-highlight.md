# Video → Github Project Highlight Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the "Typing Bot" video on `/videos` link to its matching "Simple JS Projects" entry on `/github-projects`, landing on the right tab with the project card scrolled into view and briefly highlighted.

**Architecture:** A new optional `linkedProject` field on video entries in `db.json` drives a "View the code →" router link on the video card, carrying the target project's title as a query param. `GithubProjectsComponent` reads that query param on init, switches to the matching project's category tab, scrolls its card into view, and toggles a CSS class that fades out after 2 seconds.

**Tech Stack:** Angular 22 (NgModule-based, zoneless), TypeScript, plain CSS, Angular Router (`ActivatedRoute`, `routerLink`, `queryParams`). No new dependencies.

## Global Constraints

- Zoneless change detection: any state set from a non-template async source (route query param subscription, `setTimeout`) must be followed by `this.cdr.detectChanges()` (see `CLAUDE.md`).
- No new unit tests planned for this feature (per the approved spec, `specs/2026-07-21-video-project-highlight-design.md`) — verification is manual via `ng serve`. Do not add test files.
- Follow existing code conventions in touched files (comment style explaining *why* not *what*, existing `mat-card`/`row`/`col-N` markup patterns).
- Only the "Typing Bot" video gets `linkedProject` set in this plan — the mechanism must work generically (keyed off `db.json` data) so more videos can be wired up later without further code changes.

---

## File Structure

- Modify: `src/assets/db.json` — add `linkedProject` to the "Typing Bot" video entry.
- Modify: `src/app/components/pages/videos/videos.component.ts` — pass `linkedProject` through onto the `Video` model.
- Modify: `src/app/components/pages/videos/videos.component.html` — render the "View the code →" link when present.
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts` — read the `project` query param, switch tab, scroll, and time-box the highlight.
- Modify: `src/app/components/pages/github-projects/github-projects.component.html` — element id + highlight class binding on each project card.
- Modify: `src/app/components/pages/github-projects/github-projects.component.css` — `.highlight-pulse` styling.

---

### Task 1: Add `linkedProject` to the "Typing Bot" video entry

**Files:**
- Modify: `src/assets/db.json`

**Interfaces:**
- Produces: one new optional JSON field `linkedProject: string` on a video entry, consumed by Task 2.

- [ ] **Step 1: Add the field**

In `src/assets/db.json`, find:

```json
                {
                  "description": "As a computer science student, a friend of mine challenged me to a typing contest. I lost, so I thought it would be fun to code a bot to play for me. As you can see in this video, it isn't actually very fast.",
                  "link": "https://www.youtube.com/embed/UzCBnGSdWAE",
                  "title": "Typing Bot"
                },
```

Change it to:

```json
                {
                  "description": "As a computer science student, a friend of mine challenged me to a typing contest. I lost, so I thought it would be fun to code a bot to play for me. As you can see in this video, it isn't actually very fast.",
                  "link": "https://www.youtube.com/embed/UzCBnGSdWAE",
                  "title": "Typing Bot",
                  "linkedProject": "Simple JS Projects"
                },
```

- [ ] **Step 2: Validate the JSON is well-formed**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/assets/db.json', 'utf8')); console.log('valid')"`
Expected output: `valid`

- [ ] **Step 3: Confirm the target project title matches exactly**

Run: `node -e "const db=JSON.parse(require('fs').readFileSync('src/assets/db.json','utf8')); const gh=db.nate314.home.pages[1].subpages[1].subpages; console.log(gh.some(p => p.title === 'Simple JS Projects'))"`
Expected output: `true`

- [ ] **Step 4: Commit**

```bash
git add src/assets/db.json
git commit -m "Link Typing Bot video to its Simple JS Projects repo entry"
```

---

### Task 2: Show a "View the code" link on videos with a linked project

**Files:**
- Modify: `src/app/components/pages/videos/videos.component.ts:7-13,38-51`
- Modify: `src/app/components/pages/videos/videos.component.html:1-12`

**Interfaces:**
- Consumes: `v["linkedProject"]?: string` from Task 1's `db.json` data.
- Produces: `Video.linkedProject?: string` on the component's video model — used only by this task's own template; no other task depends on it.

- [ ] **Step 1: Add `linkedProject` to the `Video` class**

In `src/app/components/pages/videos/videos.component.ts`, find:

```ts
class Video {
  title: string;
  link: SafeResourceUrl;
  description: string;
  preview: string;
  enabled: boolean;
}
```

Replace with:

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

- [ ] **Step 2: Pass `linkedProject` through in the video-mapping code**

Find:

```ts
        return <Video>{
          title: v["title"],
          link: getSanatized(`https://www.youtube.com/embed/${id}`),
          description: v["description"],
          preview: v["preview"]
            ? v["preview"] + `?time=${time}`
            : `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          enabled: false
        };
```

Replace with:

```ts
        return <Video>{
          title: v["title"],
          link: getSanatized(`https://www.youtube.com/embed/${id}`),
          description: v["description"],
          preview: v["preview"]
            ? v["preview"] + `?time=${time}`
            : `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          enabled: false,
          linkedProject: v["linkedProject"]
        };
```

- [ ] **Step 3: Add the "View the code" link to the template**

In `src/app/components/pages/videos/videos.component.html`, find:

```html
    <p>{{ video.description }}</p>
    <p>Click <a [href]="getYoutubeLink(video.link)">here</a> to watch on Youtube.</p>
  </mat-card>
```

Replace with:

```html
    <p>{{ video.description }}</p>
    <p>Click <a [href]="getYoutubeLink(video.link)">here</a> to watch on Youtube.</p>
    <p *ngIf="video.linkedProject">
      <a [routerLink]="['/github-projects']" [queryParams]="{ project: video.linkedProject }">
        View the code &rarr;
      </a>
    </p>
  </mat-card>
```

- [ ] **Step 4: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/videos`.
Expected: the "Typing Bot" card shows a "View the code →" line below the YouTube link; no other video card shows this line (none of the others have `linkedProject` set).
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/videos/videos.component.ts src/app/components/pages/videos/videos.component.html
git commit -m "Show a 'View the code' link on videos with a linked Github project"
```

---

### Task 3: Land on the right tab, scroll to, and highlight the linked project

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts:1-5,25-67`
- Modify: `src/app/components/pages/github-projects/github-projects.component.html:42-53`
- Modify: `src/app/components/pages/github-projects/github-projects.component.css`

**Interfaces:**
- Consumes: the `project` query param produced by Task 2's router link (a project `title` string, e.g. `"Simple JS Projects"`); `this.projects` (already populated by the existing `db.connection()` subscription); `this.activeTab` and `projectGroups` (existing, unchanged in shape).
- Produces: `highlightedProjectTitle: string | null` field and `projectElementId(title: string): string` method, both used only by this task's own template.

- [ ] **Step 1: Inject `ActivatedRoute` and add highlight state**

In `src/app/components/pages/github-projects/github-projects.component.ts`, find the import line:

```ts
import { Router } from "@angular/router";
```

Replace with:

```ts
import { ActivatedRoute, Router } from "@angular/router";
```

Find:

```ts
  constructor(
    private router: Router,
    private db: DatabaseService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }
```

Replace with:

```ts
  // Set (from a "project" query param) when navigating in from a video's
  // "View the code" link, and cleared after the highlight-pulse animation
  // finishes so the CSS class can retrigger on a later visit.
  highlightedProjectTitle: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: DatabaseService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }
```

- [ ] **Step 2: Handle the `project` query param once projects are loaded**

Find:

```ts
  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.GITHUB_PROJECTS);
    this.db.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.projects = githubProjects.subpages;
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
    this.loadWellSkyContributions();
  }
```

Replace with:

```ts
  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.GITHUB_PROJECTS);
    this.db.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.projects = githubProjects.subpages;
      this.applyLinkedProjectHighlight();
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
    this.loadWellSkyContributions();
  }

  // Switches to the linked project's category tab and schedules a scroll +
  // highlight-pulse once the tab's content has rendered. No-ops (page loads
  // exactly as it does with no query param) if there's no "project" param or
  // it doesn't match any known project title.
  private applyLinkedProjectHighlight() {
    const title = this.route.snapshot.queryParamMap.get("project");
    if (!title) return;
    const project = this.projects.find(p => p.title === title);
    if (!project) return;
    this.activeTab = project.category;
    setTimeout(() => {
      document.getElementById(this.projectElementId(project.title))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      this.highlightedProjectTitle = project.title;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.highlightedProjectTitle = null;
        this.cdr.detectChanges();
      }, 2000);
    }, 0);
  }

  // Turns a project title into a DOM-safe id for scrollIntoView targeting.
  projectElementId(title: string): string {
    return "gh-project-" + title.replace(/[^a-zA-Z0-9]+/g, "-");
  }
```

- [ ] **Step 3: Bind the id and highlight class on each project card**

In `src/app/components/pages/github-projects/github-projects.component.html`, find:

```html
<div *ngFor="let group of projectGroups" class="tab-content" [hidden]="activeTab !== group.category">
  <div *ngFor="let project of group.projects">
    <mat-card class="mat-elevation-z4">
```

Replace with:

```html
<div *ngFor="let group of projectGroups" class="tab-content" [hidden]="activeTab !== group.category">
  <div *ngFor="let project of group.projects">
    <mat-card class="mat-elevation-z4" [id]="projectElementId(project.title)"
      [class.highlight-pulse]="project.title === highlightedProjectTitle">
```

- [ ] **Step 4: Add the highlight-pulse styling**

In `src/app/components/pages/github-projects/github-projects.component.css`, append:

```css
.highlight-pulse {
  outline: 3px solid #5b4b8a;
  outline-offset: 2px;
  box-shadow: 0 0 12px 2px rgba(91, 75, 138, 0.6);
  transition: outline-color 2s ease, box-shadow 2s ease;
}
```

- [ ] **Step 5: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/videos`, click "View the code →" on the "Typing Bot" card.
Expected:
- Browser navigates to `http://localhost:4200/github-projects?project=Simple%20JS%20Projects`.
- The "Personal Projects" tab is selected (not the default "WellSky" tab).
- The page scrolls so the "Simple JS Projects" card is roughly centered in the viewport.
- The "Simple JS Projects" card shows a purple outline/glow that visibly fades out over about 2 seconds.
- No other project card shows the outline/glow.

Then check the no-param and bad-param cases:
- Navigate directly to `http://localhost:4200/github-projects` (no query string): page behaves exactly as before (defaults to the "WellSky" tab, no scrolling, no highlight).
- Navigate to `http://localhost:4200/github-projects?project=NoSuchProject`: page behaves exactly as with no query string (no crash, defaults to "WellSky" tab).

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.ts src/app/components/pages/github-projects/github-projects.component.html src/app/components/pages/github-projects/github-projects.component.css
git commit -m "Scroll to and highlight a project linked in from a video"
```

---

## Self-Review Notes

- **Spec coverage:** Data model (Task 1), video-side link (Task 2), and github-projects-side tab-switch/scroll/highlight (Task 3) all covered, matching every section of the spec.
- **Type consistency:** `projectElementId(title: string): string` and `highlightedProjectTitle: string | null` introduced in Task 3 are used only within Task 3's own template edit — no cross-task signature mismatches. `Video.linkedProject?: string` (Task 2) matches the `linkedProject` field name used in Task 1's `db.json` edit and in Task 2's own template query param.
- **No placeholders:** all steps show full, exact code/markup/CSS to write, including the no-param/bad-param no-op behavior explicitly described and tested.
