# Secret Konami-Code Unlock Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide three specific Github Projects entries and the Home page's friends section by default; entering the Konami code (↑↑↓↓←→←→BA) anywhere on the site toggles them visible, persisted across visits, with a subtle glow on the navbar logo while unlocked.

**Architecture:** A new `UnlockService` singleton holds a `localStorage`-backed boolean and an observable. `AppComponent` listens globally for the Konami sequence and calls `toggle()`. `GithubProjectsComponent`, `HomeComponent`, and `NavbarComponent` each inject the service, read `unlock.unlocked` directly in their templates, and subscribe to the observable purely to call `cdr.detectChanges()` (zoneless — the toggle originates outside any template event).

**Tech Stack:** Angular 22 (NgModule-based, zoneless), TypeScript, RxJS `BehaviorSubject`, plain CSS. No new dependencies.

## Global Constraints

- Zoneless change detection: any component state that depends on a non-template async source (here, `UnlockService.unlocked$`, itself driven by a `window` keydown listener) must call `this.cdr.detectChanges()` after that source changes (see `CLAUDE.md`).
- No new unit tests planned for this feature (per the approved spec, `specs/2026-07-22-secret-unlock-design.md`) — verification is manual via `ng serve`. Do not add test files.
- The unlock must be a **toggle**: entering the Konami code a second time re-hides the content. Persisted via `localStorage` under the key `secretUnlocked`.
- No visible UI (button, menu, hint text) may reveal that this feature exists — the only observable effect of unlocking is the previously-hidden content appearing and the navbar logo glow.
- Follow existing code conventions in touched files (comment style explaining *why* not *what*; the existing `window.addEventListener("resize", ...)` pattern in `AppComponent` for global listeners).

---

## File Structure

- Modify: `src/assets/db.json` — add `hidden: true` to three Github Projects entries.
- Create: `src/app/services/unlock.service.ts` — the `UnlockService` singleton.
- Modify: `src/app/services/index.ts` — export the new service.
- Modify: `src/app/components/application-structure/app-component/app.component.ts` — Konami code detection.
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts` — filter hidden projects unless unlocked.
- Modify: `src/app/components/pages/home/home.component.ts` / `.html` — gate the friends section on unlock.
- Modify: `src/app/components/application-structure/navbar/navbar.component.ts` / `.html` / `.css` — logo glow indicator.

---

### Task 1: Hide the three low-priority Github Projects entries

**Files:**
- Modify: `src/assets/db.json`

**Interfaces:**
- Produces: `hidden: boolean` field on three Github Projects entries, consumed by Task 4.

- [ ] **Step 1: Add `"hidden": true` to "C++ Infix Parser"**

Find:

```json
                {
                  "category": "school",
                  "description": "https://raw.githubusercontent.com/Nate314/InfixParser/master/README.md",
                  "link": "https://github.com/Nate314/InfixParser",
                  "title": "C++ Infix Parser"
                },
```

Replace with:

```json
                {
                  "category": "school",
                  "description": "https://raw.githubusercontent.com/Nate314/InfixParser/master/README.md",
                  "link": "https://github.com/Nate314/InfixParser",
                  "title": "C++ Infix Parser",
                  "hidden": true
                },
```

- [ ] **Step 2: Add `"hidden": true` to "C++ Morse Code"**

Find:

```json
                {
                  "category": "school",
                  "description": "https://raw.githubusercontent.com/Nate314/MorseCode/master/README.md",
                  "link": "https://github.com/Nate314/MorseCode",
                  "title": "C++ Morse Code"
                },
```

Replace with:

```json
                {
                  "category": "school",
                  "description": "https://raw.githubusercontent.com/Nate314/MorseCode/master/README.md",
                  "link": "https://github.com/Nate314/MorseCode",
                  "title": "C++ Morse Code",
                  "hidden": true
                },
```

- [ ] **Step 3: Add `"hidden": true` to "CS449 Umpire Buddy"**

Find:

```json
                {
                  "category": "school",
                  "description": "https://raw.githubusercontent.com/Nate314/CS449UmpireBuddy/master/README.md",
                  "link": "https://github.com/Nate314/CS449UmpireBuddy",
                  "title": "CS449 Umpire Buddy"
                },
```

Replace with:

```json
                {
                  "category": "school",
                  "description": "https://raw.githubusercontent.com/Nate314/CS449UmpireBuddy/master/README.md",
                  "link": "https://github.com/Nate314/CS449UmpireBuddy",
                  "title": "CS449 Umpire Buddy",
                  "hidden": true
                },
```

- [ ] **Step 4: Validate the JSON is well-formed**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/assets/db.json', 'utf8')); console.log('valid')"`
Expected output: `valid`

- [ ] **Step 5: Confirm exactly three entries are hidden**

Run: `node -e "const db=JSON.parse(require('fs').readFileSync('src/assets/db.json','utf8')); const gh=db.nate314.home.pages[1].subpages[1].subpages; console.log(gh.filter(p=>p.hidden).map(p=>p.title))"`
Expected output: `[ 'C++ Infix Parser', 'C++ Morse Code', 'CS449 Umpire Buddy' ]`

- [ ] **Step 6: Commit**

```bash
git add src/assets/db.json
git commit -m "Mark three low-priority Github Projects entries as hidden by default"
```

---

### Task 2: Create `UnlockService`

**Files:**
- Create: `src/app/services/unlock.service.ts`
- Modify: `src/app/services/index.ts`

**Interfaces:**
- Produces: `UnlockService` class with `unlocked: boolean` (getter), `unlocked$: Observable<boolean>`, `toggle(): void`. Consumed by Tasks 3, 4, and 5.

- [ ] **Step 1: Create the service**

Create `src/app/services/unlock.service.ts`:

```ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const STORAGE_KEY = "secretUnlocked";

@Injectable({ providedIn: "root" })
export class UnlockService {

  private readonly subject = new BehaviorSubject<boolean>(
    localStorage.getItem(STORAGE_KEY) === "true"
  );

  readonly unlocked$ = this.subject.asObservable();

  get unlocked(): boolean {
    return this.subject.value;
  }

  toggle() {
    const next = !this.subject.value;
    localStorage.setItem(STORAGE_KEY, String(next));
    this.subject.next(next);
  }
}
```

- [ ] **Step 2: Export it from the services barrel**

In `src/app/services/index.ts`, find:

```ts
export * from "./database.service";
```

Replace with:

```ts
export * from "./database.service";
export * from "./unlock.service";
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit -p tsconfig.json` (or `npx ng build` if `tsc --noEmit` isn't set up standalone — use whichever succeeds; either confirms the new file type-checks with the rest of the app)
Expected: no new compile errors referencing `unlock.service.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/app/services/unlock.service.ts src/app/services/index.ts
git commit -m "Add UnlockService: localStorage-backed toggle for secret content"
```

---

### Task 3: Detect the Konami code in `AppComponent`

**Files:**
- Modify: `src/app/components/application-structure/app-component/app.component.ts:1-6,60-126`

**Interfaces:**
- Consumes: `UnlockService.toggle()` from Task 2.
- Produces: no new outputs — this task only triggers the shared service's state, which Tasks 4 and 5 read.

- [ ] **Step 1: Import `UnlockService`**

In `src/app/components/application-structure/app-component/app.component.ts`, find:

```ts
import { trigger, style, transition, animate, query, group } from "@angular/animations";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Helper } from "src/app/helpers/Helper";
import { Constants } from "src/app/helpers/Helper";
```

Replace with:

```ts
import { trigger, style, transition, animate, query, group } from "@angular/animations";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Helper } from "src/app/helpers/Helper";
import { Constants } from "src/app/helpers/Helper";
import { UnlockService } from "src/app/services";

const KONAMI_SEQUENCE = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright",
  "b", "a"
];
```

- [ ] **Step 2: Inject the service and add a keydown buffer**

Find:

```ts
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
```

Replace with:

```ts
  private konamiBuffer: string[] = [];
  private konamiListener = (event: KeyboardEvent) => this.onKeydownForKonami(event);

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private unlock: UnlockService
  ) { }
```

- [ ] **Step 3: Register the listener in `ngOnInit` and remove it in `ngOnDestroy`**

Find:

```ts
    window.addEventListener("resize", () => this.cdr.detectChanges());
  }

  ngOnDestroy() {
    clearInterval(this.pageNameInterval);
  }
```

Replace with:

```ts
    window.addEventListener("resize", () => this.cdr.detectChanges());
    window.addEventListener("keydown", this.konamiListener);
  }

  ngOnDestroy() {
    clearInterval(this.pageNameInterval);
    window.removeEventListener("keydown", this.konamiListener);
  }

  // Tracks a rolling buffer of recent keys against the Konami sequence
  // (case-insensitive). On a full match, toggles the secret-content unlock
  // and resets the buffer so the same trailing keys can't immediately
  // re-trigger a match.
  private onKeydownForKonami(event: KeyboardEvent) {
    this.konamiBuffer.push(event.key.toLowerCase());
    if (this.konamiBuffer.length > KONAMI_SEQUENCE.length) {
      this.konamiBuffer.shift();
    }
    if (this.konamiBuffer.length === KONAMI_SEQUENCE.length
      && this.konamiBuffer.every((key, i) => key === KONAMI_SEQUENCE[i])) {
      this.unlock.toggle();
      this.konamiBuffer = [];
    }
  }
```

- [ ] **Step 4: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/`, click somewhere on the page to ensure it has focus, then type the sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A (arrow keys, then the letters "b" and "a").
Expected: no visible change yet (Tasks 4/5 haven't wired up the consuming components), but no console errors. Open the browser console and run `localStorage.getItem("secretUnlocked")` — expected: `"true"`. Enter the sequence again; expected: now `"false"`.
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/application-structure/app-component/app.component.ts
git commit -m "Detect the Konami code anywhere on the site and toggle the secret unlock"
```

---

### Task 4: Hide/reveal the three projects and the friends section

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts:1-5,51-67,146-157`
- Modify: `src/app/components/pages/home/home.component.ts:1-53`
- Modify: `src/app/components/pages/home/home.component.html:65-69`

**Interfaces:**
- Consumes: `UnlockService` (public field `unlocked: boolean`, `unlocked$: Observable<boolean>`) from Task 2. `project.hidden?: boolean` from Task 1's `db.json` data.
- Produces: no new outputs — these are leaf consumers.

- [ ] **Step 1: Inject `UnlockService` into `GithubProjectsComponent` and filter hidden projects**

In `src/app/components/pages/github-projects/github-projects.component.ts`, find:

```ts
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService } from "src/app/services";
```

Replace with:

```ts
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService, UnlockService } from "src/app/services";
```

Find:

```ts
  constructor(
    private router: Router,
    private db: DatabaseService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

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
  constructor(
    private router: Router,
    private db: DatabaseService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public unlock: UnlockService
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.GITHUB_PROJECTS);
    this.db.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.projects = githubProjects.subpages;
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
    this.loadWellSkyContributions();
    // Zoneless: the Konami-toggle happens outside this component's own
    // template events, so re-render explicitly when it changes.
    this.unlock.unlocked$.subscribe(() => this.cdr.detectChanges());
  }
```

Find:

```ts
  // Groups the flat projects list into labeled sections (personal/school/
  // hackathon), in a fixed display order, omitting any empty category.
  get projectGroups(): { category: string; label: string; projects: any[] }[] {
    if (!this.projects) return [];
    return this.projectCategoryOrder
      .map(category => ({
        category,
        label: this.projectCategoryLabels[category] || category,
        projects: this.projects.filter(p => p.category === category)
      }))
      .filter(group => group.projects.length > 0);
  }
```

Replace with:

```ts
  // Groups the flat projects list into labeled sections (personal/school/
  // hackathon), in a fixed display order, omitting any empty category.
  // Entries marked "hidden" are excluded unless the secret unlock is active.
  get projectGroups(): { category: string; label: string; projects: any[] }[] {
    if (!this.projects) return [];
    return this.projectCategoryOrder
      .map(category => ({
        category,
        label: this.projectCategoryLabels[category] || category,
        projects: this.projects.filter(p => p.category === category && (!p.hidden || this.unlock.unlocked))
      }))
      .filter(group => group.projects.length > 0);
  }
```

- [ ] **Step 2: Inject `UnlockService` into `HomeComponent`**

In `src/app/components/pages/home/home.component.ts`, find:

```ts
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService } from "src/app/services";
```

Replace with:

```ts
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService, UnlockService } from "src/app/services";
```

Find:

```ts
  constructor(
    private router: Router,
    private db: DatabaseService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.HOME);
    this.db.connection().subscribe(db => {
      const otherwebsites = db.getHome().otherwebsites;
      this.friendLinks = otherwebsites.friends;
      this.youtubeLinks = otherwebsites.youtube;
      const techLinks = [...otherwebsites.languages, ...otherwebsites.tools];
      this.workLinks = techLinks.filter(t => t.context === "work" || t.context === "both");
      this.personalLinks = techLinks.filter(t => t.context === "personal" || t.context === "both");
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }
```

Replace with:

```ts
  constructor(
    private router: Router,
    private db: DatabaseService,
    private cdr: ChangeDetectorRef,
    public unlock: UnlockService
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.HOME);
    this.db.connection().subscribe(db => {
      const otherwebsites = db.getHome().otherwebsites;
      this.friendLinks = otherwebsites.friends;
      this.youtubeLinks = otherwebsites.youtube;
      const techLinks = [...otherwebsites.languages, ...otherwebsites.tools];
      this.workLinks = techLinks.filter(t => t.context === "work" || t.context === "both");
      this.personalLinks = techLinks.filter(t => t.context === "personal" || t.context === "both");
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
    // Zoneless: the Konami-toggle happens outside this component's own
    // template events, so re-render explicitly when it changes.
    this.unlock.unlocked$.subscribe(() => this.cdr.detectChanges());
  }
```

- [ ] **Step 3: Gate the friends section in the template**

In `src/app/components/pages/home/home.component.html`, find:

```html
    <div *ngIf="friendLinks">
      <h3>Check out Some of my Friend's websites:</h3>
      <app-list-of-links [links]="friendLinks"></app-list-of-links>
      all have websites where you can download or use software as well!
    </div>
```

Replace with:

```html
    <div *ngIf="friendLinks && unlock.unlocked">
      <h3>Check out Some of my Friend's websites:</h3>
      <app-list-of-links [links]="friendLinks"></app-list-of-links>
      all have websites where you can download or use software as well!
    </div>
```

- [ ] **Step 4: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/home`. Expected: the "Check out Some of my Friend's websites" section is absent.
Open `http://localhost:4200/github-projects`, click the "School Projects" tab. Expected: "C++ Infix Parser", "C++ Morse Code", and "CS449 Umpire Buddy" are absent; other school projects (e.g. "CS461 Ramen Noodles") are still present.
On any page, click to focus the page and enter the Konami sequence (Up, Up, Down, Down, Left, Right, Left, Right, B, A). Expected: without navigating away, go back to `/home` and `/github-projects` (or if already on one of them, the content should appear without a reload since both components subscribed to the observable) — the friends section and the three projects now appear.
Enter the sequence again. Expected: they disappear again.
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.ts src/app/components/pages/home/home.component.ts src/app/components/pages/home/home.component.html
git commit -m "Hide three Github Projects entries and the friends section unless unlocked"
```

---

### Task 5: Navbar logo glow indicator

**Files:**
- Modify: `src/app/components/application-structure/navbar/navbar.component.ts:1-22`
- Modify: `src/app/components/application-structure/navbar/navbar.component.html:1-8`
- Modify: `src/app/components/application-structure/navbar/navbar.component.css`

**Interfaces:**
- Consumes: `UnlockService` (public field `unlocked: boolean`, `unlocked$: Observable<boolean>`) from Task 2.
- Produces: no new outputs — leaf UI.

- [ ] **Step 1: Inject `UnlockService` and `ChangeDetectorRef`**

In `src/app/components/application-structure/navbar/navbar.component.ts`, find:

```ts
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Constants, Helper } from "../../../helpers/Helper";
```

Replace with:

```ts
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Constants, Helper } from "../../../helpers/Helper";
import { UnlockService } from "src/app/services";
```

Find:

```ts
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.pages.push(<Page>{ link: "/home", name: "Home", svg: "http://cdn.nathangawith.com/images/svg/home.svg" });
    this.pages.push(<Page>{ link: "/applications", name: "Applications", svg: "http://cdn.nathangawith.com/images/svg/laptop.svg" });
    this.pages.push(<Page>{ link: "/github-projects", name: "Github Projects", svg: "http://cdn.nathangawith.com/images/svg/github.svg" });
    this.pages.push(<Page>{ link: "/videos", name: "Videos", svg: "http://cdn.nathangawith.com/images/svg/youtube.svg" });
    this.pages.push(<Page>{ link: "https://games.nathangawith.com/", name: "Games", svg: "http://cdn.nathangawith.com/images/svg/gamepad.svg" });
    this.pages.push(<Page>{ link: "https://resume.nathangawith.com/", name: "Resume", svg: "http://cdn.nathangawith.com/images/svg/file-invoice.svg" });
  }
```

Replace with:

```ts
  constructor(
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    public unlock: UnlockService
  ) { }

  ngOnInit() {
    this.pages.push(<Page>{ link: "/home", name: "Home", svg: "http://cdn.nathangawith.com/images/svg/home.svg" });
    this.pages.push(<Page>{ link: "/applications", name: "Applications", svg: "http://cdn.nathangawith.com/images/svg/laptop.svg" });
    this.pages.push(<Page>{ link: "/github-projects", name: "Github Projects", svg: "http://cdn.nathangawith.com/images/svg/github.svg" });
    this.pages.push(<Page>{ link: "/videos", name: "Videos", svg: "http://cdn.nathangawith.com/images/svg/youtube.svg" });
    this.pages.push(<Page>{ link: "https://games.nathangawith.com/", name: "Games", svg: "http://cdn.nathangawith.com/images/svg/gamepad.svg" });
    this.pages.push(<Page>{ link: "https://resume.nathangawith.com/", name: "Resume", svg: "http://cdn.nathangawith.com/images/svg/file-invoice.svg" });
    // Zoneless: the Konami-toggle happens outside this component's own
    // template events, so re-render explicitly when it changes.
    this.unlock.unlocked$.subscribe(() => this.cdr.detectChanges());
  }
```

- [ ] **Step 2: Bind the glow class on the logo**

In `src/app/components/application-structure/navbar/navbar.component.html`, find:

```html
    <li class="logo">
      <a class="nav-link" (click)="goTo('/home')" style="cursor:pointer;">
        <img src="http://cdn.nathangawith.com/images/svg/ng_icon_cutout.svg" />
        <span class="link-text">NathanGawith</span>
      </a>
    </li>
```

Replace with:

```html
    <li class="logo" [class.logo-unlocked]="unlock.unlocked">
      <a class="nav-link" (click)="goTo('/home')" style="cursor:pointer;">
        <img src="http://cdn.nathangawith.com/images/svg/ng_icon_cutout.svg" />
        <span class="link-text">NathanGawith</span>
      </a>
    </li>
```

- [ ] **Step 3: Add the glow styling**

In `src/app/components/application-structure/navbar/navbar.component.css`, find:

```css
.logo img {
  transform: rotate(0deg);
  transition: 600ms;
  filter: invert(.5) sepia(1) saturate(5) hue-rotate(180deg);
}
```

Replace with:

```css
.logo img {
  transform: rotate(0deg);
  transition: 600ms;
  filter: invert(.5) sepia(1) saturate(5) hue-rotate(180deg);
}

.logo-unlocked img {
  filter: invert(.5) sepia(1) saturate(5) hue-rotate(180deg)
    drop-shadow(0 0 6px #5b4b8a) drop-shadow(0 0 12px #5b4b8a);
}
```

The existing `transition: 600ms;` on `.logo img` already covers the `filter` property, so the glow fades in/out smoothly as `logo-unlocked` is toggled — no separate transition rule needed.

- [ ] **Step 4: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/`, focus the page, enter the Konami sequence. Expected: the navbar logo icon shows a purple glow around it, fading in smoothly. Enter the sequence again. Expected: the glow fades back out.
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/application-structure/navbar/navbar.component.ts src/app/components/application-structure/navbar/navbar.component.html src/app/components/application-structure/navbar/navbar.component.css
git commit -m "Glow the navbar logo while the secret unlock is active"
```

---

## Self-Review Notes

- **Spec coverage:** Data model (Task 1), `UnlockService` (Task 2), Konami detection (Task 3), content hide/reveal (Task 4), navbar indicator (Task 5) all covered, matching every section of the spec.
- **Type consistency:** `UnlockService.unlocked` (getter, boolean), `unlocked$` (Observable<boolean>), and `toggle()` (Task 2) are used identically and by name in Tasks 3, 4, and 5 — no signature drift. `project.hidden?: boolean` (Task 1's `db.json` field) is read only in Task 4's `projectGroups` filter.
- **No placeholders:** all steps show full, exact code/markup/CSS to write, including the manual multi-page verification flow for the toggle behavior.
