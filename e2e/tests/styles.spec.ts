import { test, expect } from '../support/fixtures';
import { Site } from '../support/site';

// Regression guard for the CSP that blocked Angular's inline `onload="this.media='all'"` handler.
// The build ships styles.css as `<link media="print" onload="this.media='all'">`; when the CSP
// refuses that handler the stylesheet never applies and every mat-card loses its padding.
test.describe('global stylesheet and card padding', () => {
  for (const route of ['/home', '/github-projects', '/videos']) {
    test(`styles.css is applied and mat-card has 16px padding on ${route} @smoke`, async ({ page, diagnostics }) => {
      const site = new Site(page);
      await site.goto(route);

      await test.step('the styles.css link is switched to media="all"', async () => {
        const link = page.locator('link[rel="stylesheet"][href*="styles"]');
        await expect(link).toHaveCount(1);
        await expect(link).toHaveAttribute('media', 'all');
      });

      await test.step('the inline onload handler was not blocked by the CSP', async () => {
        const violations = await diagnostics.cspViolations();
        expect(violations.filter((v) => v.startsWith('script-src'))).toEqual([]);
      });

      await test.step('mat-card padding is 16px on every side', async () => {
        const card = site.matCards.locator('visible=true').first();
        await expect(card).toBeVisible();
        await expect(card).toHaveCSS('padding-top', '16px');
        await expect(card).toHaveCSS('padding-right', '16px');
        await expect(card).toHaveCSS('padding-bottom', '16px');
        await expect(card).toHaveCSS('padding-left', '16px');
      });
    });
  }
});
