import { DB } from "../helpers/DB";

// A small, hand-written db.json shaped like the real one (see DB.ts for the
// positional layout), so component specs do not depend on live site content.
export const RAW_README = "https://raw.githubusercontent.com/Nate314/Plain-A/master/README.md";

export function dbJsonFixture(): any {
  return {
    nate314: {
      home: {
        otherwebsites: {
          redirects: [{ title: "/resume", link: "https://resume.example.com", description: "resume.example.com" }]
        },
        pages: [
          {
            name: "Applications",
            subpages: [
              {
                name: "JavaApplications", link: "applications/java", description: "java apps",
                apps: [
                  { name: "Clock", file: "Clock.jar", description: "a clock" },
                  { name: "Secret", file: "Secret.jar", description: "hidden one", hidden: true }
                ]
              },
              {
                name: "WebApplications", link: "applications/web", description: "web apps",
                apps: [
                  { name: "Say2", file: "webapplications/say2", selector: "app-say2", description: "say numbers" },
                  { name: "Embedded", file: "https://games.nathangawith.com/embedded", selector: "", description: "an embed" }
                ]
              },
              {
                name: "AndroidApplications", link: "applications/android", description: "android apps",
                apps: [{ name: "Wallpaper", file: "Wallpaper.apk", description: "a wallpaper" }]
              }
            ]
          },
          {
            name: "Other",
            subpages: [
              {
                name: "Videos",
                videos: [
                  { title: "Timelapse", category: "Rubik's Cube", link: "https://www.youtube.com/embed/abc123", description: "cube" },
                  { title: "Typing Bot", category: "Code", link: "bareId99", description: "bot", linkedProject: "Plain A", preview: "https://cdn.example.com/p.png" },
                  { title: "Secret Vid", category: "Code", link: "https://www.youtube.com/embed/sec1?rel=0", description: "hidden", hidden: true },
                  { title: "Misc", category: "Other Projects", link: "https://www.youtube.com/embed/misc1", description: "misc" }
                ]
              },
              {
                name: "Github Projects", description: "",
                subpages: [
                  { title: "Plain A", category: "personal", link: "https://github.com/Nate314/Plain-A", description: RAW_README, linkedVideo: "Typing Bot" },
                  { title: "Award", category: "personal", link: "https://github.com/Nate314/Award", award: { ribbon: "1st", text: "won", link: "https://example.com/award" } },
                  { title: "Site", category: "personal", link: "https://github.com/Nate314/site", siteProject: true },
                  { title: "Feat", category: "personal", link: "https://github.com/Nate314/Feat", featured: true },
                  { title: "Plain B", category: "personal", link: "https://github.com/Nate314/Plain-B" },
                  { title: "Secret P", category: "personal", link: "https://github.com/Nate314/Secret-P", hidden: true },
                  { title: "Sch", category: "school", link: "https://github.com/Nate314/Sch" }
                ]
              }
            ]
          }
        ]
      }
    }
  };
}

export function dbFixture(): DB {
  return new DB(dbJsonFixture().nate314);
}
