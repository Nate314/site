import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../modules/Helper";
import { DB } from "../../../modules/DB";
import { filter } from "rxjs/operators";
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
}

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.css"]
})
export class ApplicationsComponent implements OnInit {

  // Applications
  subpages: Page[] = [];

  // Applications/Subpage
  pageName: string;
  subpage: string;
  apps: App[] = [];

  // Applications/Subpage/App
  webAppOpen: boolean = false;
  webApp: App;

  // DB
  javaApplications: any;
  webApplications: any;
  androidApplications: any;

  constructor(private router: Router, private location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // load information about all applications from the database
    this.javaApplications = DB.dbApplications.getJavaApplications();
    this.webApplications = DB.dbApplications.getWebApplications();
    this.androidApplications = DB.dbApplications.getAndroidApplications();
    this.subpages.push(<Page>{
      name: this.javaApplications["name"],
      link: "../" + this.javaApplications["link"],
      description: this.javaApplications["description"],
      apps: this.javaApplications["apps"]
    });
    this.subpages.push(<Page>{
      name: this.webApplications["name"],
      link: "../" + this.webApplications["link"],
      description: this.webApplications["description"],
      apps: this.webApplications["apps"]
    });
    this.subpages.push(<Page>{
      name: this.androidApplications["name"],
      link: "../" + this.androidApplications["link"],
      description: this.androidApplications["description"],
      apps: this.androidApplications["apps"]
    });

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
      // location.href = "/applications/web/" + app.name;
    }
    else {
      if (!Helper.equalsNull(app)) {
        // set url
        let iFrameURL = app.file;
        if (!iFrameURL.includes("https://nate314.github.io/"))
          iFrameURL = "https://nate314.github.io/site/" + app.file;
        // // send to app
        // if (Helper.equalsNull(this.webApp.name))
        //   Helper.navigateTo(this.router, this.location, ["/applications"],
        //     { queryParams: { subpage: "web", appName: app.name }});
        // open app
        this.webApp.file = iFrameURL;
        this.webAppOpen = true;
        const iframe = `<iframe src="${iFrameURL}" frameborder="0" style="width:100%; height:60vh;"></iframe>`;
        document.getElementById("appContent").innerHTML = iframe;
        document.getElementById("appDescription").innerHTML = app.description;
      }
    }
  }

  openJavaApp(app: App) {
    let url = app.file;
    if (!url.includes("https://nate314.github.io/nathangawith/applications/javaApplications/"))
      url = "https://nate314.github.io/nathangawith/applications/javaApplications/" + app.file;
    location.href = url;
  }

  openAndroidApp(app: App) {
    let url = app.file;
    if (!url.includes("https://nate314.github.io/nathangawith/applications/androidApplications/"))
      url = "https://nate314.github.io/nathangawith/applications/androidApplications/" + app.file;
    location.href = url;
  }
}
