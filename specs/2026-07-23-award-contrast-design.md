# Award-Detail Text Contrast Fix

**Date:** 2026-07-23
**Status:** Approved

## Problem

The `.award-detail` text on a project card (e.g. "3rd Place, Hack K-State ·
view details →" under Turing Messenger) renders in gold `#8a6d1a` at 12px on
a white card. That's roughly 4:1 contrast, just under the WCAG AA 4.5:1
threshold for normal-size text — flagged during the badges feature's review
and deferred as non-blocking at the time.

## Goal

Darken the gold used for `.award-detail` and `.award-detail a` (and, for
visual consistency, the `.ribbon-award` background) just enough to clear
4.5:1 against white, without changing the color's identity (still
recognizably "gold," matching the 🏆 ribbon).

## Non-goals

- Redesigning the badge/ribbon system.
- Touching the purple (`#5b4b8a`) or blue (`#007bff`) colors used elsewhere.

## Change

Replace `#8a6d1a` with `#6b530f` (contrast ratio ≈ 5.1:1 on white) everywhere
it's used for award styling in
`src/app/components/pages/github-projects/github-projects.component.css`:
`.ribbon-award`, `.award-detail`, `.award-detail a`.

## Testing

Manually verify in `ng serve`: the Turing Messenger card's award ribbon and
detail line still read clearly as gold, just a shade darker; no other ribbon
color changes.
