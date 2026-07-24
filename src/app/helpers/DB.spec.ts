import db from "../../assets/db.json";

describe("db.json project<->video links", () => {
  const videos = (db as any).nate314.home.pages[1].subpages[0].videos as any[];
  const projects = (db as any).nate314.home.pages[1].subpages[1].subpages as any[];

  // linkedVideo is normally a single title string, but a project may cite
  // more than one video (e.g. several demos of the same program).
  const asArray = (value: string | string[] | undefined): string[] =>
    value === undefined ? [] : Array.isArray(value) ? value : [value];

  it("has a reciprocal linkedVideo on the project for every video's linkedProject", () => {
    for (const video of videos.filter(v => v.linkedProject)) {
      const project = projects.find(p => p.title === video.linkedProject);
      expect(project)
        .withContext(`video "${video.title}" links to unknown project "${video.linkedProject}"`)
        .toBeDefined();
      expect(asArray(project.linkedVideo))
        .withContext(`project "${video.linkedProject}" is missing a linkedVideo back to "${video.title}"`)
        .toContain(video.title);
    }
  });

  it("has a reciprocal linkedProject on the video for every project's linkedVideo", () => {
    for (const project of projects.filter(p => p.linkedVideo)) {
      for (const linkedVideoTitle of asArray(project.linkedVideo)) {
        const video = videos.find(v => v.title === linkedVideoTitle);
        expect(video)
          .withContext(`project "${project.title}" links to unknown video "${linkedVideoTitle}"`)
          .toBeDefined();
        expect(video.linkedProject)
          .withContext(`video "${linkedVideoTitle}" is missing a linkedProject back to "${project.title}"`)
          .toBe(project.title);
      }
    }
  });
});
