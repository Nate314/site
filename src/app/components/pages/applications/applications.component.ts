import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService } from "src/app/services";
import * as _ from "lodash";

class Page {
  name: string;
  link: string;
  description: string;
  apps: App[];
}

class App {
  name: string;
  file: string;
  description: string;
  selector: string;
}

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html"
})
export class ApplicationsComponent implements OnInit {

  appSelector: string = "<app-dto-convert></app-dto-convert>";

  // Applications
  subpages: Page[] = [];

  // Applications/Subpage
  pageName: string;
  subpage: string;
  apps: App[] = [];

  // Applications/Subpage/App
  webAppOpen: boolean = false;
  webApp: App;
  appDescription: string;

  // DB
  javaApplications: any;
  webApplications: any;
  androidApplications: any;

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.connection().subscribe(db => {
      // load information about all applications from the database
      this.javaApplications = db.getJavaApplications();
      this.webApplications = db.getWebApplications();
      this.androidApplications = db.getAndroidApplications();
      this.subpages = [
        <Page>{
          name: this.javaApplications["name"],
          link: "../" + this.javaApplications["link"],
          description: this.javaApplications["description"],
          apps: this.javaApplications["apps"]
        }, <Page>{
          name: this.webApplications["name"],
          link: "../" + this.webApplications["link"],
          description: this.webApplications["description"],
          apps: this.webApplications["apps"]
        }, <Page>{
          name: this.androidApplications["name"],
          link: "../" + this.androidApplications["link"],
          description: this.androidApplications["description"],
          apps: this.androidApplications["apps"]
        }
      ];

      // load different sections of the page based on the url
      const validSubpages = ["java", "web", "android"];
      this.activatedRoute.url.subscribe(response => {
        // get the subpage
        const validSubpage = response.filter(x => _.includes(validSubpages, x.path));
        if (validSubpage.length > 0) {
          this.subpage = validSubpage[0].path;
          // get the subpage object
          const routeSubpage = this.subpages.filter(page =>
            page.name.toUpperCase().includes(this.subpage.toUpperCase()));
          if (routeSubpage.length > 0) {
            const thisPage = routeSubpage[0];
            this.pageName = thisPage["name"];
            this.apps = thisPage["apps"];
            // get the web application
            if (response.length === 3)
              this.webApp = this.getApp(this.webApplications["apps"], response[2].path);
          }
        }
      });

      // if a web app is being passed through the url, then open that web app
      if (!Helper.equalsNull(this.webApp))
        this.openWebApp(this.getApp(this.webApplications["apps"], this.webApp.name), false);

      // initialize page
      let pageTitle = String(PageNames.APPLICATIONS);
      if (!Helper.equalsNull(this.pageName))
        pageTitle += " | " + this.pageName;
      if (!Helper.equalsNull(this.webApp))
        pageTitle += " | " + this.webApp.name;
      Helper.initializePage(this, this.router.url, pageTitle);
    });
  }

  getApp(appList: App[], appName: string): App {
    const appToOpen = appList.filter(application => application.name.toLowerCase() === appName.toLowerCase());
    if (appToOpen.length > 0)
      return appToOpen[0];
    return null;
  }

  open(url: string) {
    Helper.navigate(this.router, this.location, url);
  }

  openWebApp(app: App, href: boolean) {
    if (href) {
      Helper.navigate(this.router, this.location, "/applications/web/" + app.name);
    }
    else {
      if (!Helper.equalsNull(app)) {
        this.webAppOpen = true;
        this.appDescription = app.description;
      }
    }
  }

  openLink(url: string, ext?: string) {
    if (!url.includes("firebasestorage.googleapis.com")) {
      if (!url.includes(`https://nate314.github.io/nathangawith/applications/${ext}/`))
        url = `https://nate314.github.io/nathangawith/applications/${ext}/` + url;
    }
    location.href = url;
  }

  openJavaApp(app: App) {
    this.openLink(app.file, "javaApplications");
  }

  openAndroidApp(app: App) {
    this.openLink(app.file, "androidApplications");
  }
}
