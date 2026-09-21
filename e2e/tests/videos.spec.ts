import { test, expect } from '../support/fixtures';
import { Site } from '../support/site';
import { db, VIDEO_CATEGORIES, youtubeId } from '../support/data';

const videoId = (title: string) => 'video-' + title.replace(/[^a-zA-Z0-9]+/g, '-');

test.describe('videos', () => {
  test('one card per visible db.json video, grouped into category tabs @smoke', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/videos');
    await expect(page.locator('app-videos .page-tab')).toHaveText([...VIDEO_CATEGORIES]);
    await expect(page.locator('mat-card.video-card')).toHaveCount(db.videos().length);
    for (const category of VIDEO_CATEGORIES) {
      await page.locator('app-videos .page-tab', { hasText: category }).click();
      await expect(page.locator('app-videos .tab-content:visible mat-card.video-card'))
        .toHaveCount(db.videos().filter((v) => v.category === category).length);
    }
  });

  test('every video shows a thumbnail first and the YouTube watch link', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/videos');
    for (const video of db.videos()) {
      const card = page.locator(`#${videoId(video.title)}`);
      await expect(card.locator('h3'), video.title).toHaveText(video.title);
      await expect(card.locator('iframe')).toHaveCount(0);
      await expect(card.locator('.video-media img')).toHaveAttribute(
        'src', video.preview ? new RegExp(`^${video.preview.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) : `https://img.youtube.com/vi/${youtubeId(video.link)}/hqdefault.jpg`);
      await expect(card.locator('a', { hasText: 'here' })).toHaveAttribute(
        'href', `https://www.youtube.com/watch?v=${youtubeId(video.link)}`);
    }
  });

  test('clicking a thumbnail renders a YouTube embed iframe with the expected src @smoke', async ({ page, diagnostics }) => {
    const site = new Site(page);
    await site.goto('/videos');
    const video = db.videos().find((v) => v.category === 'Code')!;
    const card = page.locator(`#${videoId(video.title)}`);
    await card.locator('.video-media img').click();
    const frame = card.locator('iframe');
    await expect(frame).toHaveCount(1);
    await expect(frame).toHaveAttribute('src', `https://www.youtube.com/embed/${youtubeId(video.link)}`);
    await expect(frame).toHaveAttribute('allowfullscreen', '');
    await expect(card.locator('.video-media img')).toHaveCount(0);
    // The embed is allowed by frame-src even though YouTube itself is stubbed.
    expect((await diagnostics.cspViolations()).filter((v) => v.startsWith('frame-src'))).toEqual([]);
    await diagnostics.expectClean();
  });

  test('only one embed is active at a time', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/videos');
    const [first, second] = db.videos().filter((v) => v.category === 'Code');
    await page.locator(`#${videoId(first.title)} .video-media img`).click();
    await expect(page.locator('mat-card iframe')).toHaveCount(1);
    await page.locator(`#${videoId(second.title)} .video-media img`).click();
    await expect(page.locator('mat-card iframe')).toHaveCount(1);
    await expect(page.locator(`#${videoId(second.title)} iframe`)).toHaveAttribute(
      'src', `https://www.youtube.com/embed/${youtubeId(second.link)}`);
    await expect(page.locator(`#${videoId(first.title)} iframe`)).toHaveCount(0);
  });

  test('"View the code" links to the linked project and the project links back', async ({ page }) => {
    const site = new Site(page);
    const video = db.videos().find((v) => v.linkedProject)!;
    await site.goto('/videos');
    await page.locator(`#${videoId(video.title)}`).getByRole('link', { name: /View the code/ }).click();
    await expect(page).toHaveURL(new RegExp(`/github-projects\\?project=${encodeURIComponent(video.linkedProject!).replace(/%20/g, '(%20|\\+)')}`));
    // The route animation briefly leaves two copies of the strip in the DOM, so look at the newest.
    await expect(page.locator('app-github-projects .page-tab-active').last()).not.toHaveText('WellSky');
  });

  test('?video= selects the right tab and scrolls to that video', async ({ page }) => {
    const site = new Site(page);
    const video = db.videos().find((v) => v.category === 'Other Projects')!;
    await site.goto(`/videos?video=${encodeURIComponent(video.title)}`);
    await expect(page.locator('app-videos .page-tab-active')).toHaveText(video.category);
    await expect(page.locator(`#${videoId(video.title)}`)).toBeInViewport();
  });

  test('the secret unlock reveals hidden videos and hidden projects', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('secretUnlocked', 'true'));
    const site = new Site(page);
    await site.goto('/videos');
    await expect(page.locator('mat-card.video-card')).toHaveCount(db.videos(true).length);
    await site.goto('/github-projects');
    await expect(page.locator('mat-card.project-card')).toHaveCount(db.projects(true).length);
  });

  test('the Konami code toggles the unlock from the keyboard', async ({ page }) => {
    const site = new Site(page);
    await site.goto('/videos');
    await expect(page.locator('mat-card.video-card')).toHaveCount(db.videos().length);
    for (const key of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) {
      await page.keyboard.press(key);
    }
    await expect(page.locator('mat-card.video-card')).toHaveCount(db.videos(true).length);
  });
});
