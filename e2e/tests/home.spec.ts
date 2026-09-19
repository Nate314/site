import { test, expect } from '../support/fixtures';
import { Site } from '../support/site';
import { db } from '../support/data';

test.describe('home content', () => {
  test('explore tiles link to the main sections @smoke', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    const tiles = page.locator('a.tile');
    await expect(tiles).toHaveCount(3);
    await expect(tiles.nth(0)).toHaveAttribute('href', '/github-projects');
    await expect(tiles.nth(1)).toHaveAttribute('href', '/applications');
    await expect(tiles.nth(2)).toHaveAttribute('href', '/videos');
  });

  test('skill chips come from db.json languages and tools, split by context', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    const all = [...db.languages, ...db.tools];
    const work = all.filter((t) => t.context === 'work' || t.context === 'both');
    const personal = all.filter((t) => t.context === 'personal' || t.context === 'both');
    await expect(page.locator('.skills-col.work .chip')).toHaveText(work.map((t) => t.name));
    await expect(page.locator('.skills-col.personal .chip')).toHaveText(personal.map((t) => t.name));
    for (const tech of work) {
      await expect(page.locator('.skills-col.work .chip', { hasText: new RegExp(`^${tech.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) })).toHaveAttribute('href', tech.url);
    }
  });

  test('YouTube channels list comes from db.json', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    const chips = page.locator('section[aria-label="Elsewhere"] a.chip');
    await expect(chips).toHaveCount(db.youtube.length);
    await expect(chips.first()).toHaveAttribute('href', db.youtube[0].url);
  });

  test('friends section stays hidden until the secret unlock is on', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    await expect(page.locator('section[aria-label="Friends"]')).toHaveCount(0);
    await page.addInitScript(() => localStorage.setItem('secretUnlocked', 'true'));
    await page.reload();
    await expect(page.locator('section[aria-label="Friends"] a.chip')).toHaveCount(db.friends.length);
  });

  test('absolute links on Home have a real href so they can open in a new tab', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    await expect(page.locator('section[aria-label="Elsewhere"] a.chip').first()).toBeVisible(); // db.json has loaded
    const hrefs = await page.locator('mat-card a[href]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThan(10);
    for (const href of hrefs) expect(href, 'link href').toMatch(/^(https?:\/\/|\/)/);
  });

  test('links that open a new tab, anywhere on the tested pages, use rel=noopener', async ({ page }) => {
    const site = new Site(page);
    for (const route of ['/home', '/videos', '/applications']) {
      await site.goto(route);
      await expect(site.matCards.locator('a').first()).toBeVisible(); // content has rendered
      for (const link of await page.locator('a[target="_blank"]').all()) {
        expect(await link.getAttribute('rel'), `${route} ${await link.getAttribute('href')}`).toMatch(/noopener/);
      }
    }
  });
});
