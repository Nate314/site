# Ribbon / Project-Link Overlap Fix

**Date:** 2026-07-23
**Status:** Approved

## Problem

Each project card's ribbon (`.ribbon`, `★ FEATURED` / `🏆 {award}` /
`🌐 nathangawith.com`) is `position: absolute; top: 0; right: 0`, painted on
top of the in-flow header row. On desktop, the header row's right column
(`.col-8`) shows the full project URL as a link
(`{{project.link}}` — e.g. `https://github.com/NABSINA/TuringMessenger`).
A long URL can visually run under the ribbon's ~90-160px box in the
top-right corner, cutting off or obscuring the tail of the link text. This
was flagged as a Minor, non-blocking risk during both the badges feature's
and the video-highlight feature's reviews and never fixed.

## Goal

Make sure the ribbon never overlaps the project-link text, for any ribbon
width (the `nathangawith.com` ribbon is the widest) and any link length,
without changing the ribbon's visual style (still a corner flag) or the
link's existing behavior (still a plain, fully-visible URL).

## Approach

Reserve space for the ribbon on the header row itself, rather than trying to
predict/truncate link text. Give `.col-8` (the link column) a `padding-right`
large enough for the widest ribbon (`🌐 nathangawith.com`, measured at
~150px including its padding), so the in-flow link text wraps before it
ever reaches the ribbon's absolutely-positioned box, on both desktop
(`!isScreenSmall()`, two-column row) and mobile (`isScreenSmall()`,
single-column row — where the ribbon sits above the link text because the
title comes first, so the same reserved-space treatment keeps the title
line from running under it too).

## Non-goals

- Redesigning the ribbon's shape/position (still top-right corner flag).
- Truncating or ellipsis-ing long URLs — they should remain fully visible,
  just wrapped onto a second line if needed.

## Change

In `github-projects.component.css`, add `padding-right` to the two header
row target elements (`.col-8` on desktop, and the title `span`/text on the
mobile single-column row) sized to clear the ribbon.

## Testing

Manually verify in `ng serve`: on the Hackathon Projects tab, the Turing
Messenger card (award ribbon) and a hypothetical `nathangawith.com`-badged
card (test by temporarily viewing a project with that badge, e.g. This
Website in Personal Projects) both show their full project link with no
visual overlap with the ribbon, on both a wide desktop viewport and a
narrow mobile-width viewport (resize the browser or use dev tools device
emulation).
