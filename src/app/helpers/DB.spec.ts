import db from "../../assets/db.json";

describe("db.json project<->video links", () => {
  const videos = (db as any).nate314.home.pages[1].subpages[0].videos as any[];
  const projects = (db as any).nate314.home.pages[1].subpages[1].subpages as any[];

  it("has a reciprocal linkedVideo on the project for every video's linkedProject", () => {
    for (const video of videos.filter(v => v.linkedProject)) {
      const project = projects.find(p => p.title === video.linkedProject);
      expect(project)
        .withContext(`video "${video.title}" links to unknown project "${video.linkedProject}"`)
        .toBeDefined();
      expect(project.linkedVideo)
        .withContext(`project "${video.linkedProject}" is missing a linkedVideo back to "${video.title}"`)
        .toBe(video.title);
    }
  });

  it("has a reciprocal linkedProject on the video for every project's linkedVideo", () => {
    for (const project of projects.filter(p => p.linkedVideo)) {
      const video = videos.find(v => v.title === project.linkedVideo);
      expect(video)
        .withContext(`project "${project.title}" links to unknown video "${project.linkedVideo}"`)
        .toBeDefined();
      expect(video.linkedProject)
        .withContext(`video "${project.linkedVideo}" is missing a linkedProject back to "${project.title}"`)
        .toBe(project.title);
    }
  });
});
