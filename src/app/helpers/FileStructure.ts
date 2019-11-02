export class SiteFolder {
  name: string;
  folders: SiteFolder[];
  files: string[];
}

export class SiteComponent extends SiteFolder {
  HTML: boolean;
  CSS: boolean;
  TS: boolean;
  SPECTS: boolean;
  components: SiteComponent[];
}

export function getSiteFiles() {
  return SiteFiles;
}

const SiteFiles = <SiteFolder>{
  name: "site",
  folders: [
    <SiteFolder>{
      name: "e2e",
      folders: [
        <SiteFolder>{
          name: "src",
          folders: [],
          files: ["app.e2e-spec.ts", "app.po.ts"]
        }],
      files: ["protractor.conf.js", "tsconfig.e2e.ts"]
    },
    <SiteFolder>{
      name: "src",
      folders: [
        <SiteFolder>{
          name: "app",
          folders: [
            <SiteFolder>{
              name: "components",
              folders: [
                <SiteFolder>{
                  name: "application-structure",
                  folders: [
                    <SiteComponent>{
                      name: "app-component",
                      HTML: true, TS: true
                    },
                    <SiteComponent>{
                      name: "footer",
                      HTML: true, TS: true
                    },
                    <SiteComponent>{
                      name: "navbar",
                      HTML: true, TS: true
                    },
                    <SiteComponent>{
                      name: "not-found",
                      HTML: true, TS: true
                    }
                  ],
                  files: ["index.ts"]
                },
                <SiteFolder>{
                  name: "pages",
                  folders: [
                    <SiteComponent>{
                      name: "applications",
                      components: [
                        <SiteComponent>{
                          name: "betting-calculator",
                          HTML: true, TS: true
                        },
                        <SiteComponent>{
                          name: "dto-convert",
                          HTML: true, TS: true
                        },
                        <SiteComponent>{
                          name: "final-grade-calculator",
                          HTML: true, TS: true
                        },
                        <SiteComponent>{
                          name: "group-creator",
                          HTML: true, TS: true
                        },
                        <SiteComponent>{
                          name: "html-sandbox",
                          HTML: true, TS: true
                        },
                        <SiteComponent>{
                          name: "multiplication-table",
                          HTML: true, TS: true
                        },
                        <SiteComponent>{
                          name: "say2",
                          HTML: true, TS: true
                        },
                        <SiteComponent>{
                          name: "typing-test",
                          HTML: true, TS: true
                        }
                      ],
                      HTML: true, TS: true,
                      files: ["iframe-app.component.ts", "index.ts"]
                    },
                    <SiteComponent>{
                      name: "home",
                      HTML: true, TS: true
                    },
                    <SiteComponent>{
                      name: "videos",
                      HTML: true, TS: true
                    }
                  ],
                  files: []
                }
              ],
              files: []
            },
            <SiteFolder>{
              name: "modules",
              folders: [],
              files: ["DB.ts", "FileStructure.ts", "Helper.ts"]
            }
          ],
          files: ["app-routing.module.ts", "app.module.ts", "routes.ts"]
        },
        <SiteFolder>{
          name: "assets",
          folders: [],
          files: ["db.json"]
        },
        <SiteFolder>{
          name: "environments",
          folders: [],
          files: ["environment.prod.ts", "envoronment.ts"]
        }
      ],
      files: ["browserlist", "favicon.ico", "index.html", "karma.conf.js", "main.ts", "polyfills.ts",
        "styles.css", "test.ts", "tsconfig.app.json", "tsconfig.spec.json", "tslint.json"]
    }],
  files: [".editorconfig", ".firebawerc", ".gitignore", ".angular.json", "firebase.json", "package-lock.json",
    "package.json", "README.md", "tsconfig.json", "tslint.json"]
};
