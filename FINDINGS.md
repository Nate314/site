# Angular 22 Upgrade — Debugging Findings

Notes from upgrading this site (Angular 8 → 22) and debugging why pages rendered
blank and why application links showed "NOT FOUND".

---

## 1. "NOT FOUND" on `.jar` links and web apps (e.g. ColorFlux)

**Not an Angular bug — a dead external URL.**

The GitHub Pages site `https://nate314.github.io/nathangawith/` no longer exists
(returns **404**). Every Java download and several web apps hang off that base:

| What you see | Real URL it hits | Status |
|---|---|---|
| ColorFlux "NOT FOUND" | `nate314.github.io/nathangawith/applications/webApplications/colorFlux.html` | 404 |
| `.jar` / `.zip` / `.apk` links "NOT FOUND" | `nate314.github.io/nathangawith/applications/javaApplications/Clock.jar` | 404 |

### RESOLVED for Java/Android downloads
The `.jar`/`.zip`/`.apk` files were copied into `src/assets/{javaApplications,androidApplications}/`
and are now hosted by the site itself. `openLink()` resolves bare filenames
against the site's own `assets/<ext>/` folder (via `document.baseURI`, so it
respects `<base href>`), with any full `http(s)` URL still passed through as-is.
`angular.json` already bundles `src/assets/**/*`, so the files ship in the build.
**Still open:** the web apps (ColorFlux etc.) are `.html` files that were NOT
copied locally; their `db.json` `file` URLs still point at the dead repo.

Key point: the ColorFlux "NOT FOUND" is **not** Angular's not-found page. The
Angular app renders correctly (the `<app-applications>` component and the
`<iframe>` are both present, no `app-not-found`). What shows is **GitHub's own
404 page rendered *inside* the iframe**. The `.jar` links are full-page
navigations to the same dead site.

### Where the URLs are hardcoded
- `src/app/components/pages/applications/applications.component.ts` → `openLink()`:
  `https://nate314.github.io/nathangawith/applications/${ext}/...`
  (Java + Android downloads)
- `src/assets/db.json` → each web app's `file` field (e.g. ColorFlux's `.html`)

### Diagnostics
- `https://nate314.github.io/` → 200 (user page alive)
- `https://nate314.github.io/react-games/` → 200 (that repo alive)
- `https://nate314.github.io/nathangawith/` → **404** (this repo is gone)
- `cdn.nathangawith.com` and `nathangawith.com` → 200, but the assets are not at
  the guessed paths.

### Action needed (decision pending)
Determine where the `.jar`/`.zip` files and web-app HTML files should be served
from now, then update `openLink()` and the `db.json` `file` URLs. Options:
1. A new host/path (e.g. somewhere under `cdn.nathangawith.com`).
2. Bundle into this project's `src/assets/` and serve from `nathangawith.com`.
3. Restore the old `nate314.github.io/nathangawith` repo.

---

## 2. Angular 22 makes NgModule apps ZONELESS by default (biggest gotcha)

**Symptom:** pages loaded, the network request for `assets/db.json` succeeded,
component properties were set — but the view stayed **blank with no console
errors**. Same symptom regardless of data source (Firebase or HTTP).

**Root cause:** In Angular 22, `PlatformRef.bootstrapModuleFactory` injects
`provideZonelessChangeDetectionInternal()` by default:

```ts
function provideZonelessChangeDetectionInternal(): Provider[] {
  return [
    { provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
    { provide: NgZone, useClass: NoopNgZone },      // NoopNgZone by default
    { provide: ZONELESS_ENABLED, useValue: true },  // zoneless ON
  ];
}
```

So even `platformBrowser().bootstrapModule()` yields a **`NoopNgZone`**. NgModule
apps now run zoneless. Because this app updates the view from RxJS subscriptions
and `setTimeout`/`setInterval` (no signals / `markForCheck` / `async` pipe),
change detection never ran on those async updates.

### What did NOT work
- `provideZoneChangeDetection()` — documented as "not for `bootstrapModule`". It
  set a real `NgZone` (`isInAngularZone = true`, `ZONELESS_ENABLED = false`) but
  the change-detection scheduler still never ticked on zone events, so the view
  stayed blank.
- The `{ ngZone: 'zone.js' }` bootstrap option — ignored (the string option was
  removed; there is no `"zone.js"` literal anywhere in `@angular/core`).
- `ApplicationRef.tick()` — under the zoneless default it is dirty-only, so it
  rendered nothing.

### The fix that works
Keep the plain zoneless bootstrap and call **`ChangeDetectorRef.detectChanges()`**
after any async state update (`detectChanges()` forces a synchronous check of the
component subtree, independent of zone config). Applied in:

- `app.component.ts` — header typing interval, router `NavigationEnd`, resize
- `home`, `applications`, `videos`, `github-projects`, `not-found` — after the
  `db.connection()` subscribe
- `typing-test.component.ts` — the countdown `setInterval`

Template event bindings (`(click)`, `(input)`) **do** still auto-trigger change
detection in zoneless mode, so the interactive calculator apps (betting
calculator, group creator, etc.) needed nothing.

> **Rule for future code:** any time you set component state from a non-template
> async source (subscription, timer, `Promise`), call `this.cdr.detectChanges()`.

### Related zoneless fix
Switching *between* web apps (e.g. ColorFlux → DtoConvert) left the view stale:
Angular reuses `ApplicationsComponent` on param-only route changes, so
`ngOnInit` did not re-run — only the `activatedRoute.url` subscription fired, and
it never reset state or called `detectChanges()`. Fixed by moving all
per-navigation logic (reset + recompute + `detectChanges()`) inside that
subscription.

---

## 3. Other upgrade notes

- **Data source:** Firebase/AngularFire removed from the code (it threw NG0203
  `inject(NgZone)` errors). `DatabaseService` now fetches `assets/db.json` via
  `HttpClient` + `shareReplay(1)`; `DB.ts` is a plain wrapper over the `nate314`
  node. NOTE: `@angular/fire` and `firebase` are still listed in `package.json`
  but unused — candidates to prune (needs an `npm install`).
- **Builder:** `@angular-devkit/build-angular:browser` → `@angular/build:application`
  (esbuild/Vite). CSS `~` import prefix removed (`~@angular/material/...` →
  `@angular/material/...`).
- **standalone: false** added to every component (Angular 19+ defaults to
  standalone; this project uses NgModules).
- **TypeScript 6 defaults:** added to `tsconfig.json`:
  `strictPropertyInitialization: false`, `strictNullChecks: false`,
  `noImplicitAny: false`, `ignoreDeprecations: "6.0"`, `skipLibCheck: true`.
- **Testing:** `@angular/build:karma` in zero-config mode (no `karma.conf.js`).
  Browser + coverage set in `angular.json` test options. `npx ng test --watch=false`.
- **Linting:** TSLint → ESLint flat config (`eslint.config.js`).
- **Removed packages:** `angularfire2`, `@angular/http`, `tslint`, `codelyzer`,
  `protractor`.
- **Dev note:** the Vite dev server does not hot-reload `angular.json` changes —
  restart `ng serve` after editing it.
