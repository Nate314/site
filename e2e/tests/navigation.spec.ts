import { test, expect } from '../support/fixtures';
import { Site, NAV_ITEMS } from '../support/site';

test.describe('navigation', () => {
  test('navbar lists the expected destinations in order @smoke', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    const labels = await site.navLinks.evaluateAll((els) => els.map((e) => e.textContent?.trim()));
    expect(labels).toEqual(['NathanGawith', 'Home', 'Github Projects', 'Applications', 'Videos', 'Games', 'Resume']);
  });

  for (const item of NAV_ITEMS) {
    test(`clicking "${item.name}" in the navbar opens ${item.path}`, async ({ page }) => {
      const site = new Site(page);
      // Start somewhere else so the click is a real navigation.
      await site.goto(item.path === '/videos' ? '/home' : '/videos');
      await site.navbar.hover(); // the desktop rail only shows link text while hovered
      await site.navLink(item.name).click();
      await expect(page).toHaveURL(new RegExp(`${item.path}$`));
      await site.expectTitle(item.title);
    });
  }

  test('the logo returns to Home', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/videos');
    await page.locator('nav.navbar li.logo a.nav-link').click();
    await expect(page).toHaveURL(/\/home$/);
  });

  test('external navbar entries point at the sibling sites', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    // These use location.href, so intercept the navigation instead of leaving the site.
    await page.route('https://games.nathangawith.com/**', (r) =>
      r.fulfill({ status: 200, contentType: 'text/html', body: '<title>games stub</title>' }));
    await page.route('https://resume.nathangawith.com/**', (r) =>
      r.fulfill({ status: 200, contentType: 'text/html', body: '<title>resume stub</title>' }));
    await site.navLink('Games').click();
    await page.waitForURL('https://games.nathangawith.com/');
    await page.goBack();
    await site.navLink('Resume').click();
    await page.waitForURL('https://resume.nathangawith.com/');
  });

  test('browser back and forward keep the page in sync with the URL', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    await site.navLink('Videos').click();
    await expect(page).toHaveURL(/\/videos$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/home$/);
    await site.expectTitle('NathanGawith | Home');
    await page.goForward();
    await expect(page).toHaveURL(/\/videos$/);
    await site.expectTitle('NathanGawith | Videos');
  });

  test('home page tiles route through the SPA without a full reload', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    await page.evaluate(() => { (window as unknown as { __marker: string }).__marker = 'same-document'; });
    await page.locator('a.tile', { hasText: 'Videos' }).click();
    await expect(page).toHaveURL(/\/videos$/);
    expect(await page.evaluate(() => (window as unknown as { __marker?: string }).__marker)).toBe('same-document');
  });

  test('the theme toggle switches labels and is remembered across a reload', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/home');
    await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  });
});
