import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DB } from "../../../helpers/DB";
import { HttpClient } from "@angular/common/http";
import { PageType, ApplicationType } from "../../../helpers/DB";
import * as _ from "lodash";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html"
})
export class ApplicationsComponent implements OnInit {

  appSelector: string = "<app-dto-convert></app-dto-convert>";

  // Applications
  subpages: PageType<ApplicationType>[] = [];

  // Applications/Subpage
  pageName: string;
  subpage: string;
  apps: ApplicationType[] = [];

  // Applications/Subpage/App
  webAppOpen: boolean = false;
  webApp: ApplicationType;

  // DB
  findPageThatStartsWith(str: string): PageType<ApplicationType>
    { return this.subpages.find(page => page.name.toUpperCase().startsWith(str.toUpperCase())); }
  get javaApplications(): PageType<ApplicationType>
    { return this.findPageThatStartsWith("JAVA"); }
  get webApplications(): PageType<ApplicationType>
    { return this.findPageThatStartsWith("WEB"); }
  get androidApplications(): PageType<ApplicationType>
    { return this.findPageThatStartsWith("ANDROID"); }

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    new DB(this.http).getDB().subscribe(db => {
      // load information about all applications from the database
      this.subpages.push(db.getJavaApplications());
      this.subpages.push(db.getWebApplications());
      this.subpages.push(db.getAndroidApplications());
      console.log(this.subpages);

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
            this.pageName = thisPage.name;
            this.apps = thisPage.subpages;
            // get the web application
            console.log(response);
            console.log(response.length);
            console.log(response.length === 3);
            if (response.length === 3) {
              this.webApp = this.getApp(this.webApplications.subpages, response[2].path);
            }
          }
        }
      });

      // if a web app is being passed through the url, then open that web app
      if (!Helper.equalsNull(this.webApp))
        this.openWebApp(this.getApp(this.webApplications.subpages, this.webApp.name), false);

      // initialize page
      let pageTitle = String(PageNames.APPLICATIONS);
      if (!Helper.equalsNull(this.pageName))
        pageTitle += " | " + this.pageName;
      if (!Helper.equalsNull(this.webApp))
        pageTitle += " | " + this.webApp.name;
      Helper.initializePage(this, this.router.url, pageTitle);
    });
  }

  getApp(appList: ApplicationType[], appName: string): ApplicationType {
    console.log(appList);
    console.log(appName);
    const appToOpen = appList.filter(application => application.name.toLowerCase() === appName.toLowerCase());
    if (appToOpen.length > 0)
      return appToOpen[0];
    return null;
  }

  open(url: string) {
    Helper.navigate(this.router, this.location, url);
  }

  openWebApp(app: ApplicationType, href: boolean) {
    if (href) {
      Helper.navigate(this.router, this.location, "/applications/web/" + app.name);
    }
    else {
      if (!Helper.equalsNull(app)) {
        this.webAppOpen = true;
        document.getElementById("appDescription").innerHTML = app.description;
      }
    }
  }

  openJavaApp(app: ApplicationType) {
    let url = app.file;
    if (!url.includes("https://nate314.github.io/nathangawith/applications/javaApplications/"))
      url = "https://nate314.github.io/nathangawith/applications/javaApplications/" + app.file;
    location.href = url;
  }

  openAndroidApp(app: ApplicationType) {
    let url = app.file;
    if (!url.includes("https://nate314.github.io/nathangawith/applications/androidApplications/"))
      url = "https://nate314.github.io/nathangawith/applications/androidApplications/" + app.file;
    location.href = url;
  }
}
