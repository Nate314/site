# Award-Detail Text Contrast Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Darken the award ribbon/detail gold color from `#8a6d1a` to `#6b530f` so `.award-detail` text clears WCAG AA contrast (4.5:1) against a white card.

**Architecture:** Single CSS color-value swap across three existing selectors in one file. No markup, TypeScript, or data changes.

**Tech Stack:** Plain CSS. No new dependencies.

## Global Constraints

- No new unit tests planned — this is a single-file CSS change verified visually.
- Do not touch `.ribbon-featured` (`#5b4b8a`) or any other color.

---

## File Structure

- Modify: `src/app/components/pages/github-projects/github-projects.component.css`

---

### Task 1: Darken the award gold color

**Files:**
- Modify: `src/app/components/pages/github-projects/github-projects.component.css`

**Interfaces:** None — pure CSS value change, no new selectors or classes.

- [ ] **Step 1: Replace the color in all three selectors**

Find:

```css
.ribbon-award {
  background-color: #8a6d1a;
}
```

Replace with:

```css
.ribbon-award {
  background-color: #6b530f;
}
```

Find:

```css
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

Replace with:

```css
.award-detail {
  font-size: 12px;
  color: #6b530f;
  margin: 6px 0 0 22px;
}

.award-detail a {
  color: #6b530f;
  text-decoration: underline;
}
```

- [ ] **Step 2: Manually verify in the browser**

Run: `npm start`
Open `http://localhost:4200/github-projects`, click the "Hackathon Projects" tab.
Expected: the Turing Messenger card's "🏆 3RD PLACE" ribbon and the "3rd Place, Hack K-State · view details →" line below the title are both a slightly darker gold than before, still clearly gold, still legible. No other ribbon (purple FEATURED, blue nathangawith.com) changes color.
Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/pages/github-projects/github-projects.component.css
git commit -m "Darken award ribbon/detail gold to clear WCAG AA contrast"
```

---

## Self-Review Notes

- **Spec coverage:** The spec's only change (color swap in three selectors) is fully covered in Task 1.
- **No placeholders:** exact hex values given for both old and new color.
