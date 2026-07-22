# GitHub Project Badges Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let specific Github Projects entries be marked "featured" (sorted first, purple ribbon) and optionally carry award info (gold ribbon + linked detail line), driven entirely by `src/assets/db.json`.

**Architecture:** Two new optional fields on Github Projects entries in `db.json` (`featured`, `award`); a stable sort in `GithubProjectsComponent.projectGroups` that puts featured/awarded projects first within their category; new template markup and CSS in the same component for the corner ribbon and award detail line.

**Tech Stack:** Angular 22 (NgModule-based, zoneless), TypeScript, plain CSS. No new dependencies.

## Global Constraints

- Zoneless change detection: any state set from a non-template async source must be followed by `this.cdr.detectChanges()` (see `CLAUDE.md`). Not applicable here — this feature only touches synchronous getters and static markup/CSS, no new async state.
- No new unit tests planned for this feature (per the approved spec, `specs/2026-07-21-github-project-badges-design.md`) — this page has no existing spec coverage for `github-projects.component.ts`, and verification is manual via `ng serve`. Do not add a test file as part of this plan.
- Follow existing code conventions in the touched files (e.g. `mat-card`, `row`/`col-N` grid classes, existing comment style explaining *why*, not *what*).

---

## File Structure

- Modify: `src/assets/db.json` — add `featured`/`award` fields to two existing entries.
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts` — add `isFeatured` sort key to `projectGroups`.
- Modify: `src/app/components/pages/github-projects/github-projects.component.html` — add ribbon and award-detail markup to the project card.
- Modify: `src/app/components/pages/github-projects/github-projects.component.css` — add ribbon/award styling.

---

### Task 1: Add `featured`/`award` data to db.json

**Files:**
- Modify: `src/assets/db.json`

**Interfaces:**
- Produces: two new optional JSON fields on Github Projects entries — `featured: boolean` and `award: { ribbon: string; text: string; link: string }` — consumed by Task 2 (sorting) and Task 3 (template).

- [ ] **Step 1: Add `"featured": true` to the "Graph Theory Game" entry**

In `src/assets/db.json`, find this entry (near the end of the Github Projects `subpages` array):

```json
                {
                  "category": "hackathon",
                  "link": "https://github.com/glowing-potato/graph-theory-game",
                  "title": "Graph Theory Game"
                },
```

Change it to:

```json
                {
                  "category": "hackathon",
                  "link": "https://github.com/glowing-potato/graph-theory-game",
                  "title": "Graph Theory Game",
                  "featured": true
                },
```

- [ ] **Step 2: Add `"featured": true` and `award` to the "Turing Messenger" entry**

Find this entry:

```json
                {
                  "category": "hackathon",
                  "description": "https://raw.githubusercontent.com/NABSINA/TuringMessenger/master/README.md",
                  "link": "https://github.com/NABSINA/TuringMessenger",
                  "title": "Turing Messenger"
                },
```

Change it to:

```json
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
                },
```

- [ ] **Step 3: Validate the JSON is well-formed**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/assets/db.json', 'utf8')); console.log('valid')"`
Expected output: `valid`

- [ ] **Step 4: Commit**

```bash
git add src/assets/db.json
git commit -m "Add featured/award data for Graph Theory Game and Turing Messenger"
```

---

### Task 2: Sort featured/awarded projects first within each category

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.ts:148-157`

**Interfaces:**
- Consumes: `project.featured?: boolean` and `project.award?: { ribbon: string; text: string; link: string }` from Task 1's data (accessed as `any` — the component already types `projects: any[]`, no new interfaces needed).
- Produces: `projectGroups` getter's `projects` arrays are ordered featured/awarded-first, stable otherwise. No signature change — still `{ category: string; label: string; projects: any[] }[]`. This is what the template (Task 3) iterates over; no change needed on the template's iteration side, only on which markup renders per project.

- [ ] **Step 1: Replace the `projectGroups` getter**

In `src/app/components/pages/github-projects/github-projects.component.ts`, find:

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
  // Within each category, featured/awarded projects sort first; order is
  // otherwise preserved (stable sort keyed on original index).
  get projectGroups(): { category: string; label: string; projects: any[] }[] {
    if (!this.projects) return [];
    return this.projectCategoryOrder
      .map(category => ({
        category,
        label: this.projectCategoryLabels[category] || category,
        projects: this.projects
          .filter(p => p.category === category)
          .map((p, i) => ({ p, i }))
          .sort((a, b) => Number(this.isFeatured(b.p)) - Number(this.isFeatured(a.p)) || a.i - b.i)
          .map(({ p }) => p)
      }))
      .filter(group => group.projects.length > 0);
  }

  // A project with an award is featured-worthy even without an explicit
  // "featured" flag.
  isFeatured(project: any): boolean {
    return !!(project.featured || project.award);
  }
```

- [ ] **Step 2: Manually verify the sort in the browser**

Run: `npm start`
Open `http://localhost:4200/github-projects`, click the "Hackathon Projects" tab.
Expected: "Turing Messenger" and "Graph Theory Game" appear before "Turing Messenger"'s and "Graph Theory Game"'s previously-preceding siblings ("CS457 Group Project (WebStore)" stays in the "school" tab, unaffected — check within "Hackathon Projects" specifically: order should now be some arrangement with Turing Messenger and Graph Theory Game first, "Island Decimation" pushed below them).
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.ts
git commit -m "Sort featured/awarded Github Projects entries first within their category"
```

---

### Task 3: Add ribbon and award-detail markup + styling

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.html:42-68`
- Modify: `src/app/components/pages/github-projects/github-projects.component.css`

**Interfaces:**
- Consumes: `project.featured`, `project.award` (from Task 1), `isFeatured(project)` (from Task 2, used only to decide ribbon *presence*; the template branches on `project.award` vs `project.featured` directly to pick ribbon *style*).
- Produces: no new outputs — this is leaf UI.

- [ ] **Step 1: Update the project card markup**

In `src/app/components/pages/github-projects/github-projects.component.html`, find:

```html
<div *ngFor="let group of projectGroups" class="tab-content" [hidden]="activeTab !== group.category">
  <div *ngFor="let project of group.projects">
    <mat-card class="mat-elevation-z4">
      <div class="row project-header" (click)="toggleProject(project)" *ngIf="!isScreenSmall()">
        <div class="col-4">
          <span class="expand-indicator" [class.expand-indicator-open]="project.expanded">&#9656;</span>
          {{project.title}}
        </div>
        <div class="col-8">
          <a [href]="project.link" (click)="$event.stopPropagation()">{{project.link}}</a>
        </div>
      </div>
      <div class="row project-header" (click)="toggleProject(project)" *ngIf="isScreenSmall()">
        <div class="col-12">
          <span class="expand-indicator" [class.expand-indicator-open]="project.expanded">&#9656;</span>
          <a [href]="project.link" (click)="$event.stopPropagation()">{{project.title}}</a>
        </div>
      </div>
      <markdown *ngIf="project.expanded && project.readmeContent"
        [data]="project.readmeContent" lineNumbers [start]="5"></markdown>
      <p *ngIf="project.expanded && (!project.description || project.readmeError)">
        No README is available for this project.
      </p>
    </mat-card>
    <br />
  </div>
</div>
```

Replace with:

```html
<div *ngFor="let group of projectGroups" class="tab-content" [hidden]="activeTab !== group.category">
  <div *ngFor="let project of group.projects">
    <mat-card class="mat-elevation-z4 project-card">
      <div class="ribbon ribbon-award" *ngIf="project.award">&#127942; {{project.award.ribbon}}</div>
      <div class="ribbon ribbon-featured" *ngIf="!project.award && project.featured">&#9733; FEATURED</div>
      <div class="row project-header" (click)="toggleProject(project)" *ngIf="!isScreenSmall()">
        <div class="col-4">
          <span class="expand-indicator" [class.expand-indicator-open]="project.expanded">&#9656;</span>
          {{project.title}}
        </div>
        <div class="col-8">
          <a [href]="project.link" (click)="$event.stopPropagation()">{{project.link}}</a>
        </div>
      </div>
      <div class="row project-header" (click)="toggleProject(project)" *ngIf="isScreenSmall()">
        <div class="col-12">
          <span class="expand-indicator" [class.expand-indicator-open]="project.expanded">&#9656;</span>
          <a [href]="project.link" (click)="$event.stopPropagation()">{{project.title}}</a>
        </div>
      </div>
      <div class="award-detail" *ngIf="project.award">
        {{project.award.text}} &middot;
        <a [href]="project.award.link" target="_blank" rel="noopener" (click)="$event.stopPropagation()">view details &rarr;</a>
      </div>
      <markdown *ngIf="project.expanded && project.readmeContent"
        [data]="project.readmeContent" lineNumbers [start]="5"></markdown>
      <p *ngIf="project.expanded && (!project.description || project.readmeError)">
        No README is available for this project.
      </p>
    </mat-card>
    <br />
  </div>
</div>
```

- [ ] **Step 2: Add ribbon/award-detail styles**

In `src/app/components/pages/github-projects/github-projects.component.css`, append:

```css
.project-card {
  position: relative;
  overflow: hidden;
}

.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.03em;
  color: #ffffff;
  padding: 4px 12px;
  border-bottom-left-radius: 6px;
}

.ribbon-featured {
  background-color: #5b4b8a;
}

.ribbon-award {
  background-color: #8a6d1a;
}

.award-detail {
  font-size: 12px;
  color: #8a6d1a;
  margin: 6px 0 0 22px;
}

.award-detail a {
  color: #8a6d1a;
  text-decoration: underline;
}
```

- [ ] **Step 3: Manually verify styling in the browser**

Run: `npm start`
Open `http://localhost:4200/github-projects`, click the "Hackathon Projects" tab.
Expected:
- "Turing Messenger" card shows a gold "🏆 3RD PLACE" ribbon in its top-right corner, and a gold line below the title reading "3rd Place, Hack K-State · view details →" where the link opens https://devpost.com/software/turing-messenger in a new tab (clicking it must NOT toggle the card's expand/collapse).
- "Graph Theory Game" card shows a purple "★ FEATURED" ribbon and no award line.
- Every other project card in every tab shows no ribbon and no award line.
- Clicking a card's title/row still toggles its README expand/collapse as before.
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.html src/app/components/pages/github-projects/github-projects.component.css
git commit -m "Add featured/award ribbons and award detail link to project cards"
```

---

## Self-Review Notes

- **Spec coverage:** Data model (Task 1), sorting (Task 2), ribbon + award line + styling (Task 3) all covered. Spec's "Testing" section (manual `ng serve` verification, no new unit tests) is reflected as manual-verification steps within Task 2 and Task 3, not skipped.
- **Type consistency:** `isFeatured(project: any): boolean` in Task 2 is the only new method; Task 3's template does not call it directly (it branches on `project.award` / `project.featured` for ribbon *style* selection, which is intentionally more specific than the boolean `isFeatured`), consistent with the spec's "award ribbon takes precedence over featured ribbon" rule.
- **No placeholders:** all steps show full, exact code/markup/CSS to write.
