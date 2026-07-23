# Dark Mode (Phase 1: Toggle Infrastructure + Core Pages)

**Date:** 2026-07-24
**Status:** Approved

## Problem

The navbar is already dark (`#23232e`), but every page's content renders in
plain white `mat-card`s against a light gray `#AAAAAA` body background —
there's no dark theme for content, and no way for a visitor to choose one.

## Scope reality check

This site layers three separate styling systems: Angular Material's
prebuilt `indigo-pink` theme (fixed, not currently using CSS custom
properties), w3.css and Bootstrap (loaded from CDN in `index.html`, used
extensively in the `Applications` sub-pages — calculators, forms, the
typing test, etc.), and this app's own component CSS. A true site-wide dark
mode that reskins all three consistently is a large, multi-subsystem
project, not a single small plan.

**This plan is Phase 1, scoped to:** the toggle infrastructure (a
`ThemeService`, persisted like the existing `UnlockService`, and a toggle
button in the navbar) plus the pages that use only this app's own component
CSS and plain `mat-card`s — Home, Videos, and Github Projects. The
`Applications` section (heavy w3.css/Bootstrap grid usage across many
sub-components) and fine-tuning Angular Material's own theme colors are
explicitly **out of scope** for this phase and would need a follow-up plan.

## Goals

- A `ThemeService` holds `theme: "light" | "dark"`, seeded from
  `localStorage`, defaulting to `"light"`.
- A toggle button in the navbar switches themes; the choice persists across
  visits.
- The `<html>` element gets `[attr.data-theme]="theme"` (bound from
  `AppComponent`), and `styles.css` defines dark-mode color overrides for:
  the body background, `mat-card` surfaces (background/text color, since
  the Material prebuilt theme doesn't expose card colors as overridable
  custom properties), and this app's own component chrome that currently
  hardcodes light-mode colors (page-tabs bar, ribbon/award text where it
  assumes a white card background is placed on the card body outside the
  ribbon itself, etc.).
- Home, Videos, and Github Projects read correctly (adequate contrast, no
  invisible text) in both themes.

## Non-goals

- Reskinning `Applications` and its sub-pages (out of scope, see above).
- Changing Angular Material's own component internals (buttons, dividers'
  exact shade) beyond what's achievable via the card background/text
  override — Material's `mat-divider` etc. already read reasonably in both
  themes since they're mid-gray, not pure black/white.
- An "auto" (`prefers-color-scheme`) mode — per your answer, manual toggle
  only.

## Architecture

**`ThemeService`** (`src/app/services/theme.service.ts`), mirroring the
existing `UnlockService` pattern (`BehaviorSubject` + `localStorage`, but
storing a string, not a boolean, and defaulting `"light"` rather than
`false`):

```ts
export class ThemeService {
  private readonly subject = new BehaviorSubject<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  readonly theme$ = this.subject.asObservable();
  get theme(): "light" | "dark" { return this.subject.value; }
  toggle() {
    const next = this.subject.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    this.subject.next(next);
  }
}
```

**`AppComponent`** binds `[attr.data-theme]="theme.theme"` on its root
element (or, since CSS needs it on `<html>`/`<body>` to cascade globally,
sets `document.documentElement.dataset["theme"]` directly in a
`theme$`-driven subscription — see plan for the exact mechanism chosen).

**`NavbarComponent`** gets a new toggle button/icon in the nav list,
calling `theme.toggle()`.

**`styles.css`** defines `:root[data-theme="dark"]` overrides for the CSS
custom properties/selectors that need to change; component CSS files for
Home/Videos/Github Projects are checked for any hardcoded light-only colors
that would become unreadable (e.g. dark text with no explicit color, which
inherits fine, vs. anything hardcoding a light background other than the
Material card default) and adjusted only if the manual verification step
finds a real problem — not preemptively, per YAGNI.

## Testing

Manually verify in `ng serve`: toggle dark mode from the navbar, confirm
Home, Videos, and Github Projects (all tabs, all card states — including
ribbons/badges, the highlight-pulse glow, and an expanded README) remain
legible with reasonable contrast; toggle back to light and confirm nothing
regressed; reload the page after toggling to dark and confirm it stays
dark (persistence); visit `/applications` while dark mode is active and
confirm it's at least not broken (unstyled-for-dark is acceptable per this
phase's scope, actively broken/unreadable is not — if it's broken, that's
a real finding to bring back before merging, not silently ship).
