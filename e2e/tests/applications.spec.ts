import { test, expect, STUB_FRAME_MARKER } from '../support/fixtures';
import { Site } from '../support/site';
import { db } from '../support/data';

test.describe('applications', () => {
  test('overview lists the three categories with the visible apps from db.json @smoke', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/applications');
    await expect(site.matCards).toHaveCount(3);
    await expect(site.matCards.nth(0).locator('h1')).toHaveText('WebApplications');
    await expect(site.matCards.nth(1).locator('h1')).toHaveText('JavaApplications');
    await expect(site.matCards.nth(2).locator('h1')).toHaveText('AndroidApplications');
    await expect(site.matCards.nth(0).locator('li')).toHaveText(db.webApps().map((a) => a.name));
    await expect(site.matCards.nth(1).locator('li')).toHaveText(db.javaApps().map((a) => a.name));
    await expect(site.matCards.nth(2).locator('li')).toHaveText(db.androidApps().map((a) => a.name));
  });

  test('each "here" link opens its category page', async ({ page }) => {
    const site = new Site(page);
    for (const [index, path] of [[0, '/applications/web'], [1, '/applications/java'], [2, '/applications/android']] as const) {
      await site.goto('/applications');
      await site.matCards.nth(index).getByRole('link', { name: 'here' }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });

  test('clicking a web application in the list opens its route', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/applications');
    await site.matCards.nth(0).locator('a.hyperlink', { hasText: 'Say2' }).click();
    await expect(page).toHaveURL(/\/applications\/web\/Say2$/);
    await expect(page.locator('app-say2')).toBeVisible();
  });

  test('the secret unlock reveals hidden applications', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('secretUnlocked', 'true'));
    const site = new Site(page);
    await site.goto('/applications');
    await expect(site.matCards.nth(1).locator('li')).toHaveText(db.javaApps(true).map((a) => a.name));
  });

  test('every java and android download resolves to a real file, not the SPA fallback', async ({ page, request }) => {
    const site = new Site(page);
    await site.goto('/applications');
    for (const [kind, apps] of [['javaApplications', db.javaApps(true)], ['androidApplications', db.androidApps(true)]] as const) {
      for (const app of apps) {
        const response = await request.get(`/assets/${kind}/${app.file}`);
        expect(response.status(), app.file).toBe(200);
        expect(response.headers()['content-type'], app.file).not.toContain('text/html');
      }
    }
  });

  test('a download link navigates to the asset URL under /assets', async ({ page }) => {
    const site = new Site(page);
    const app = db.androidApps()[0];
    await site.goto('/applications/android');
    const download = page.waitForEvent('download');
    await site.matCards.first().locator('a.hyperlink', { hasText: app.name }).click();
    expect((await download).url()).toMatch(new RegExp(`/assets/androidApplications/${app.file}$`));
  });

  test.describe('embedded applications (iframe-app component)', () => {
    const embedded = db.webApps().filter((a) => /^https?:\/\//.test(a.file));

    test('the db.json set includes embedded apps', () => {
      expect(embedded.length).toBeGreaterThan(0);
    });

    for (const app of embedded) {
      test(`${app.name}: iframe is created with the right attributes and source @smoke`, async ({ page, diagnostics }) => {
        const site = new Site(page);
        await site.goto(`/applications/web/${app.name}`);
        const host = page.locator('app-iframe-app #iframediv');
        const frame = host.locator('iframe');
        await expect(frame).toHaveCount(1);
        await expect(frame).toHaveAttribute('src', app.file);
        await expect(frame).toHaveAttribute('frameborder', '0');
        expect(await frame.evaluate((el) => (el as HTMLIFrameElement).style.width)).toBe('100%');
        expect(await frame.evaluate((el) => (el as HTMLIFrameElement).style.height)).toBe('60vh');
        await expect(page.locator('app-iframe-app').getByRole('link', { name: 'here' })).toHaveAttribute('href', app.file);
        await test.step('the embed passes frame-src and loads its document', async () => {
          await expect(page.frameLocator('app-iframe-app iframe').locator('#stub')).toHaveText(STUB_FRAME_MARKER);
          expect((await diagnostics.cspViolations()).filter((v) => v.startsWith('frame-src'))).toEqual([]);
        });
        await diagnostics.expectClean();
      });
    }

    test('the iframe is created exactly once and replaced, not duplicated, when switching apps', async ({ page }) => {
      const site = new Site(page);
      await site.goto(`/applications/web/${embedded[0].name}`);
      await expect(page.locator('app-iframe-app iframe')).toHaveCount(1);
      await site.goto(`/applications/web/${embedded[1].name}`);
      await expect(page.locator('app-iframe-app iframe')).toHaveCount(1);
      await expect(page.locator('app-iframe-app iframe')).toHaveAttribute('src', embedded[1].file);
    });

    test('the iframe is created through the DOM, not markup: no injected elements from the src', async ({ page }) => {
      const site = new Site(page);
      await site.goto(`/applications/web/${embedded[0].name}`);
      await expect(page.locator('#iframediv > *')).toHaveCount(1);
      await expect(page.locator('#iframediv > iframe')).toHaveCount(1);
    });
  });
});
