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

  public static isScreenSmall(): boolean {
    return window.innerWidth < 600;
  }

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
    if (url.length === 1 && url[0] === "/") {
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

  // A real, resolvable URL for a link's [href] binding, so the browser can
  // offer "Copy Link Address"/"Open in new tab" on right-click even though
  // (click) handles the actual in-app navigation. Bare internal route
  // strings (e.g. "videos") aren't valid hrefs on their own, so they get a
  // leading slash; absolute URLs (internal or external) are used as-is.
  public static hrefFor(url: string): string {
    return /^https?:\/\//i.test(url) ? url : "/" + url;
  }

  // Routes internal links (bare paths like "videos", or absolute URLs whose
  // origin matches the current page) through Angular's Router instead of a
  // full page reload. Only intervenes for a plain left-click on an internal
  // link; external links and modified clicks (middle-click, ctrl/cmd/shift,
  // right-click) are left alone so the real [href] (see hrefFor) handles
  // them natively - e.g. opening in a new tab.
  public static smartNavigate(router: Router, url: string, event: MouseEvent): void {
    const isAbsolute = /^https?:\/\//i.test(url);
    const parsed = isAbsolute ? new URL(url) : null;
    const isInternal = !isAbsolute || parsed.origin === window.location.origin;
    const isPlainLeftClick = event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey;

    if (isInternal && isPlainLeftClick) {
      event.preventDefault();
      router.navigate([isAbsolute ? parsed.pathname + parsed.search : url]);
    }
  }
}
