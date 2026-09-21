import { DB } from "./DB";
import { dbJsonFixture } from "../testing/db-fixture";
import realDb from "../../assets/db.json";

describe("DB accessors", () => {

  let db: DB;

  beforeEach(() => db = new DB(dbJsonFixture().nate314));

  it("indexes the applications, videos and github projects by position", () => {
    expect(db.getApplications().name).toBe("Applications");
    expect(db.getVideos().map((v: any) => v.title)).toEqual(["Timelapse", "Typing Bot", "Secret Vid", "Misc"]);
    expect(db.getGithubProjects().subpages.length).toBe(7);
  });

  it("returns the java, web and android sections in that order", () => {
    expect(db.getJavaApplications().name).toBe("JavaApplications");
    expect(db.getWebApplications().name).toBe("WebApplications");
    expect(db.getAndroidApplications().name).toBe("AndroidApplications");
  });

  it("exposes home and pages straight from the wrapped node", () => {
    expect(db.getHome().pages).toBe(db.getPages());
    expect(db.getPages().length).toBe(2);
  });

  it("returns the configured redirects", () => {
    expect(db.getRedirects()).toEqual([
      { title: "/resume", link: "https://resume.example.com", description: "resume.example.com" }
    ]);
  });

  it("falls back to an empty list when no redirects are configured", () => {
    const json = dbJsonFixture().nate314;
    delete json.home.otherwebsites.redirects;
    expect(new DB(json).getRedirects()).toEqual([]);
  });

  it("fails loudly on a malformed document instead of silently returning nothing", () => {
    expect(() => new DB({ home: { pages: [] } })).toThrow();
  });
});

// The positional indexing in DB.ts is the contract with the real content file.
describe("DB against the real db.json", () => {
  const db = new DB((realDb as any).nate314);

  it("finds the three application groups with the names the components match on", () => {
    expect(db.getJavaApplications().name.toUpperCase()).toContain("JAVA");
    expect(db.getWebApplications().name.toUpperCase()).toContain("WEB");
    expect(db.getAndroidApplications().name.toUpperCase()).toContain("ANDROID");
  });

  it("has videos and projects, each with the fields the pages render", () => {
    expect(db.getVideos().length).toBeGreaterThan(0);
    for (const video of db.getVideos()) {
      expect(video.title).withContext("video title").toBeTruthy();
      expect(video.link).withContext(`link of ${video.title}`).toBeTruthy();
      expect(video.category).withContext(`category of ${video.title}`).toBeTruthy();
    }
    for (const project of db.getGithubProjects().subpages) {
      expect(project.title).withContext("project title").toBeTruthy();
      expect(project.link).withContext(`link of ${project.title}`).toMatch(/^https:\/\/github\.com\//);
      expect(["personal", "school", "hackathon"]).withContext(`category of ${project.title}`).toContain(project.category);
    }
  });

  it("gives every web application either a component selector or an embeddable https file", () => {
    for (const app of db.getWebApplications().apps) {
      expect(app.selector !== undefined || /^https:\/\//.test(app.file))
        .withContext(app.name)
        .toBe(true);
    }
  });

  it("keeps redirect titles unique so the not-found lookup is unambiguous", () => {
    const titles = db.getRedirects().map(r => r.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
