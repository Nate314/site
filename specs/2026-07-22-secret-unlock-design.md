# Secret Konami-Code Unlock

**Date:** 2026-07-22
**Status:** Approved

## Problem

Some content on the site isn't interesting enough to show every visitor by
default: three lower-quality school projects ("C++ Infix Parser", "C++ Morse
Code", "CS449 Umpire Buddy") on the Github Projects page, and the "Check out
Some of my Friend's websites" section on the Home page. The author still
wants this content reachable — just not front-and-center — via a hidden
interaction rather than a visible toggle/filter UI.

## Goals

- Hide the three named Github Projects entries and the friends section by
  default.
- A visitor who enters the classic Konami code (↑↑↓↓←→←→BA) anywhere on the
  site reveals them.
- Entering the code again re-hides them — it's a toggle, not one-way.
- The unlocked state persists across visits (browser-local), so a visitor
  who's unlocked it once doesn't need to redo it every session.
- A subtle, unadvertised visual acknowledgment that *something* happened:
  the navbar logo gets a glowing highlight while unlocked. No other UI (no
  banner, no toast, no help text) reveals that this feature exists.

## Non-goals

- Any visible "show hidden items" button/filter/menu — the whole point is
  that it's undiscoverable except by knowing the code.
- Hiding/showing anything item-by-item in the friends section — it's an
  all-or-nothing block.
- Server-side or account-based persistence — `localStorage` only, per
  browser/device.

## Data model changes

Add `"hidden": true` to three entries under Github Projects
(`nate314.home.pages[1].subpages[1].subpages` in `src/assets/db.json`):
"C++ Infix Parser", "C++ Morse Code", "CS449 Umpire Buddy".

No data flag needed for the friends section — it's a single block, gated in
the template (see below), not itemized.

## New `UnlockService`

`src/app/services/unlock.service.ts`, `providedIn: "root"`:

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

Exported from `src/app/services/index.ts` alongside `DatabaseService`.

## Konami code detection (`AppComponent`)

`src/app/components/application-structure/app-component/app.component.ts`
gets a `window.addEventListener("keydown", ...)` in `ngOnInit` (removed in
`ngOnDestroy`, matching the existing `resize` listener pattern already in
this file) that tracks a rolling buffer against the sequence:

```ts
const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];
```

Each keydown appends `event.key` (letters compared case-insensitively) to a
buffer, trims the buffer to the sequence's length from the end, and compares
it to `KONAMI_SEQUENCE`. On a full match, calls `this.unlock.toggle()` and
resets the buffer (so the same held-down/repeated key can't immediately
re-trigger).

`AppComponent` injects `UnlockService` (no subscription needed here — it
only calls `toggle()`, it doesn't render unlocked state itself).

## Consuming the unlock state (zoneless)

Per `CLAUDE.md`, a keydown listener is a non-template async source, so
components that render based on `unlocked` must re-render explicitly. Three
components inject `UnlockService` as a public field (so templates can read
`unlock.unlocked` directly) and additionally subscribe in `ngOnInit` purely
to trigger `this.cdr.detectChanges()` on each emission (the subscription
callback doesn't need to store the value anywhere else, since the template
reads `unlock.unlocked` live off the shared service):

```ts
constructor(..., public unlock: UnlockService, private cdr: ChangeDetectorRef) {}

ngOnInit() {
  ...
  this.unlock.unlocked$.subscribe(() => this.cdr.detectChanges());
}
```

- **`GithubProjectsComponent`**: `projectGroups`'s existing `.filter(p =>
  p.category === category)` gains `&& (!p.hidden || this.unlock.unlocked)`.
- **`HomeComponent`**: the friends `<div *ngIf="friendLinks">` in
  `home.component.html` becomes `*ngIf="friendLinks && unlock.unlocked"`.
- **`NavbarComponent`**: gains `ChangeDetectorRef` and `UnlockService`
  (neither injected today) and the same subscribe-and-detectChanges pattern.
  The `<li class="logo">` element in `navbar.component.html` gains
  `[class.logo-unlocked]="unlock.unlocked"`.

None of these three components need to unsubscribe in `ngOnDestroy` beyond
what Angular already does for routed components being destroyed —
`NavbarComponent` lives for the app's lifetime (outside the router outlet),
so its subscription is effectively permanent, matching the existing pattern
of un-torn-down `window.addEventListener` calls already in `AppComponent`.

## Styling

`navbar.component.css`, `.logo-unlocked` (or a nested selector reaching the
logo `<img>`/text): a glowing highlight using the site's existing purple
accent (`#5b4b8a`, already used for the featured-project ribbon and the
video-highlight-link glow) via `filter: drop-shadow(...)` or `box-shadow`,
with a `transition` so it fades in/out smoothly as the toggle flips rather
than snapping.

## Testing

- Manually verify in `ng serve`:
  - By default, "C++ Infix Parser", "C++ Morse Code", "CS449 Umpire Buddy"
    are absent from the Github Projects "School Projects" tab, and the
    friends section is absent from Home.
  - Entering ↑↑↓↓←→←→BA anywhere on the site reveals all four; the navbar
    logo shows the glow.
  - Entering it again hides them and removes the glow.
  - Reloading the page after unlocking keeps it unlocked (persisted);
    reloading after re-hiding keeps it hidden.
  - Typing an unrelated key sequence, or an almost-but-not-quite-Konami
    sequence, does nothing.
- No new unit tests planned, consistent with this repo's existing lack of
  test coverage for `github-projects.component.ts`, `home.component.ts`,
  `navbar.component.ts`, and `app.component.ts`.
