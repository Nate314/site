# Ribbon / Project-Link Overlap Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reserve enough right-side padding on each project card's header row that the corner ribbon never overlaps the project-link text, on desktop or mobile.

**Architecture:** Single CSS rule addition (`padding-right` on the existing `.project-header` class, shared by both the desktop two-column and mobile single-column header rows in `github-projects.component.html`). No markup or TypeScript changes.

**Tech Stack:** Plain CSS. No new dependencies.

## Global Constraints

- No new unit tests planned — this is a single-file CSS change verified visually across viewport widths.
- Must not change the ribbon's own position/size/style, and must not truncate or ellipsis the project link — it should still show in full, wrapping to a second line if the card is narrow.
- `.project-header` is used by both the desktop (`.row` with `.col-4`/`.col-8`) and mobile (`.row` with `.col-12`) header markup — the fix must work for both without a separate selector per layout.

---

## File Structure

- Modify: `src/app/components/pages/github-projects/github-projects.component.css`

---

### Task 1: Reserve space for the ribbon on the header row

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.css`

**Interfaces:** None — pure CSS change to an existing selector.

- [ ] **Step 1: Add right padding to `.project-header`**

Find:

```css
.project-header {
  cursor: pointer;
}
```

Replace with:

```css
.project-header {
  cursor: pointer;
  /* Reserves room for the absolutely-positioned corner ribbon (the widest
     is "🌐 nathangawith.com") so it never overlaps the project link/title
     text — the row wraps instead of running under the ribbon. */
  padding-right: 170px;
}
```

- [ ] **Step 2: Manually verify in the browser at two viewport widths**

Run: `npm start`
Open `http://localhost:4200/github-projects` in a wide desktop browser window.
Click "Hackathon Projects": confirm the Turing Messenger card's full link
(`https://github.com/NABSINA/TuringMessenger`) is fully visible and does not
run under the "🏆 3RD PLACE" ribbon.
Click "Personal Projects": confirm the "This Website" card's full link
(`https://github.com/Nate314/site`) does not run under the "🌐
nathangawith.com" ribbon (the widest one).

Then resize the browser window to a narrow/mobile width (or use dev tools
device emulation) and repeat: confirm the title/link text on both cards
still doesn't run under their ribbons in the single-column mobile layout.

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.css
git commit -m "Reserve space on project header rows so ribbons never overlap the link text"
```

---

## Self-Review Notes

- **Spec coverage:** The spec's approach (reserve space via padding, not truncation) is implemented exactly as described, for both desktop and mobile layouts via the shared `.project-header` class.
- **No placeholders:** exact CSS given.
