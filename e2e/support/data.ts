import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Reads the same db.json the site serves, so tests follow content changes. */
const raw = JSON.parse(readFileSync(join(__dirname, '..', '..', 'src', 'assets', 'db.json'), 'utf8'));
const home = raw.nate314.home;

export interface DbApp { name: string; file: string; description: string; selector?: string; hidden?: boolean }
export interface DbProject { title: string; link: string; description?: string; category: string; hidden?: boolean; award?: { link: string } }
export interface DbVideo { title: string; link: string; description: string; category: string; hidden?: boolean; linkedProject?: string; preview?: string }
export interface DbLink { name: string; url: string; context?: string }

const visible = <T extends { hidden?: boolean }>(items: T[], includeHidden: boolean) =>
  includeHidden ? items : items.filter((i) => !i.hidden);

export const db = {
  javaApps: (includeHidden = false): DbApp[] => visible(home.pages[0].subpages[0].apps, includeHidden),
  webApps: (includeHidden = false): DbApp[] => visible(home.pages[0].subpages[1].apps, includeHidden),
  androidApps: (includeHidden = false): DbApp[] => visible(home.pages[0].subpages[2].apps, includeHidden),
  videos: (includeHidden = false): DbVideo[] => visible(home.pages[1].subpages[0].videos, includeHidden),
  projects: (includeHidden = false): DbProject[] => visible(home.pages[1].subpages[1].subpages, includeHidden),
  languages: home.otherwebsites.languages as DbLink[],
  tools: home.otherwebsites.tools as DbLink[],
  youtube: home.otherwebsites.youtube as DbLink[],
  friends: home.otherwebsites.friends as DbLink[],
  redirects: home.otherwebsites.redirects as { title: string; description: string; link: string }[],
};

export const PROJECT_CATEGORIES = [
  { key: 'personal', label: 'Personal Projects' },
  { key: 'school', label: 'School Projects' },
  { key: 'hackathon', label: 'Hackathon Projects' },
] as const;

export const VIDEO_CATEGORIES = ['Code', "Rubik's Cube", 'Other Projects'] as const;

/** The id the site derives from a YouTube link (full embed URL or bare id). */
export const youtubeId = (link: string) => (link.includes('/') ? link.split('/').pop()!.split('?')[0] : link);
