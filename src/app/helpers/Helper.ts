import { Router } from "@angular/router";
import { Location } from "@angular/common";

export class Constants {
  public static currentComponent: any = null;
  public static currentPageURL: string = "";
  public static currentPage: string = "";
  public static appToOpen: string = "";
  public static dev: boolean = false;
}

export enum PageNames {
  SITE_TITLE = "NathanGawith",
  HOME = "Home",
  APPLICATIONS = "Applications",
  APPLICATIONS_JAVA = "Java Applications",
  APPLICATIONS_WEB = "Web Applications",
  APPLICATIONS_ANDROID = "Android Applications",
  GITHUB_PROJECTS = "Github Projects",
  VIDEOS = "Videos"
}

export enum StatusCodes {
  OK = 200,
  NOT_FOUND = 404
}

export class Helper {

  public static flatten2dArray(array: any[][]): any[] {
    const result = [];
    array.forEach(arr => arr.forEach(val => result.push(val)));
    return result;
  }

  public static replaceAll(str: string, replace: string, replacement: string): string {
    if (str.indexOf(replace) !== -1) {
      return this.replaceAll(str.replace(replace, replacement), replace, replacement);
    }
    return str;
  }

  public static equalsNull(obj) {
    if (obj === null || obj === undefined || obj === "") return true;
    else return false;
  }

  public static initializePage(component: any, pageURL: string, page: string) {
    Constants.currentComponent = component;
    Constants.currentPageURL = pageURL;
    Constants.currentPage = page;
    document.title = PageNames.SITE_TITLE + " | " + page;
  }

  public static navigateTo(router: Router, location: Location, url: string[], queryparams) {
    if (url === ["/"]) {
      url = ["/home"];
    }
    /*if(url[0].includes("application")
    && queryparams["queryParams"]["subpage"] != undefined
    && queryparams["queryParams"]["appName"] == undefined
    && Constants.currentPageURL.includes("application")) {*/
    setTimeout(() => {
      router.navigate(["/not-found"]);
    }, 0);
    /*}*/
    setTimeout(() => {
      router.navigate(url, queryparams);
    }, 0);
    /*
    router.navigate(["/not-found"]);
    router.navigate(url, queryparams);
    */
  }

  public static navigate(router: Router, location: Location, url: string) {
    router.navigate([url]);
  }
}
