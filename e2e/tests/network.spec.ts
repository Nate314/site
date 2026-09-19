import { test, expect } from '../support/fixtures';
import { db, youtubeId } from '../support/data';
import { SHELL_ROUTES, VIEWPORTS } from '../support/site';

// These tests reach the real internet (CDNs, GitHub, YouTube). They are the only ones that do, and
// they exist to prove the CSP allow-list matches the third-party origins the site really uses.
// Skip them on offline or restricted networks with SKIP_NETWORK=1.
test.describe('real network @network', () => {
  test.skip(process.env.SKIP_NETWORK === '1', 'SKIP_NETWORK=1');
  test.describe.configure({ retries: 2 });

  test('Home loads with the real CDN stylesheets and scripts without CSP violations', async ({ livePage, liveDiagnostics }) => {
    await livePage.goto('/home');
    await expect(livePage.locator('mat-card')).toBeVisible();
    await livePage.waitForLoadState('load');
    await expect(livePage.locator('link[rel="stylesheet"][href*="bootstrap"]')).toHaveCount(1);
    await liveDiagnostics.expectClean();
  });

  test('Github Projects loads the real contributions API and a real README', async ({ livePage, liveDiagnostics }) => {
    await livePage.goto('/github-projects');
    await expect(livePage.locator('.contrib-year-label').first()).toBeVisible();
    const project = db.projects().find((p) => p.category === 'personal' && p.description)!;
    await livePage.locator('app-github-projects .page-tab', { hasText: 'Personal Projects' }).click();
    const card = livePage.locator('#gh-project-' + project.title.replace(/[^a-zA-Z0-9]+/g, '-'));
    await card.locator('.project-header .col-4').click();
    await expect(card.locator('markdown')).not.toBeEmpty();
    await liveDiagnostics.expectClean();
  });

  test('a real YouTube embed is allowed by frame-src', async ({ livePage, liveDiagnostics }) => {
    await livePage.goto('/videos');
    const video = db.videos().find((v) => v.category === 'Code')!;
    await livePage.locator('mat-card.video-card .video-media img').first().click();
    const frame = livePage.locator('mat-card.video-card iframe');
    await expect(frame).toHaveAttribute('src', `https://www.youtube.com/embed/${youtubeId(video.link)}`);
    await expect.poll(() => livePage.frames().some((f) => f.url().startsWith('https://www.youtube.com/embed/'))).toBe(true);
    expect((await liveDiagnostics.cspViolations()).filter((v) => v.startsWith('frame-src'))).toEqual([]);
  });

  // The offline layout tests use a small reset in place of bootstrap and w3.css, so confirm the
  // real stylesheets do not introduce horizontal scrolling either.
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    test(`no horizontal overflow with the real stylesheets at ${name}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      for (const route of SHELL_ROUTES) {
        await test.step(route, async () => {
          await page.goto(route);
          await expect(page.locator('mat-card').first()).toBeVisible();
          await expect(page.locator('link[rel="stylesheet"][href*="bootstrap"]')).toHaveCount(1);
          const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          }));
          expect(scrollWidth, route).toBeLessThanOrEqual(clientWidth);
        });
      }
      await context.close();
    });
  }
});
