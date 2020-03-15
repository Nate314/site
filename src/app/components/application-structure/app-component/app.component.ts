import { trigger, style, transition, animate, query, group } from "@angular/animations";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { Component, OnInit, OnDestroy, ApplicationRef } from "@angular/core";
import { Helper } from "src/app/helpers/Helper";
import { Constants } from "src/app/helpers/Helper";

// inspired by Fireship https://www.youtube.com/watch?v=7JA90VI9fAI
export function slideTo(from: number, to: number) {
  const dir1 = Helper.isScreenSmall() ? "right" : "bottom";
  const dir2 = Helper.isScreenSmall() ? "left" : "top";
  const direction = from < to ? dir1 : dir2;
  const distance = 100 * Math.abs(from - to);
  const optional = { optional: true };
  const animationTime = "600ms ease";
  const enterLeaveStyle = {
    position: "absolute",
    top: "97.5px",
    width: `calc(100% - ${Helper.isScreenSmall() ? 4 : 9}rem)`,
    opacity: 1
  };
  const enterStyle = { opacity: 0 };
  const groupLeaveStyle = { opacity: 0 };
  const groupEnterStyle = { opacity: 1 };
  if (Helper.isScreenSmall()) {
    // enterLeaveStyle[direction] = 0;
    // enterStyle[direction] = `-${distance}%`;
    // groupLeaveStyle[direction] = `${distance}%`;
    // groupEnterStyle[direction] = "0%";
  }
  return [
    query(":enter, :leave", [
      style(enterLeaveStyle)
    ], optional),
    query(":enter", [
      style(enterStyle)
    ]),
    group([
      query(":leave", [
        animate(animationTime, style(groupLeaveStyle))
      ], optional),
      query(":enter", [
        animate(animationTime, style(groupEnterStyle))
      ])
    ])
  ];
}

const nums = Array(4).fill(null).map((_, i) => i);
const slider = trigger("routeAnimations",
  Helper.flatten2dArray(nums.map(from => nums.map(to =>
    transition(`${from} => ${to}`, slideTo(from, to))
))));

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [ slider ]
})
export class AppComponent implements OnInit, OnDestroy {

  erasing = true;
  i = 0;
  webapplication: boolean = false;
  pageNameInterval: any;
  previousPageName = "";
  currentPageName = "";
  _pageName = "";
  get pageName(): string {
    return this._pageName;
  }
  set pageName(val: string) {
    if (this.currentPageName !== val) {
      this.currentPageName = val;
      this.i = this._pageName.length;
      this.erasing = true;
      setTimeout(() => {
        const interval = setInterval(() => {
          if (this.erasing) {
            if (this.i >= 0) {
              this._pageName = this.previousPageName.substr(0, this.i--);
            } else {
              this.erasing = false;
            }
          } else {
            this._pageName = this.currentPageName.substr(0, this.i++);
          }
          // this._pageName = this.currentPageName.substr(0, this.i) + this.previousPageName.substr(this.i);
          // this.i++;
          if (this.pageName === this.currentPageName) {
            this.previousPageName = this._pageName;
            console.log("previous set to " + this.previousPageName);
            clearInterval(interval);
          }
        }, 50);
      }, 500);
    }
  }

  constructor(
    private router: Router,
    private appRef: ApplicationRef
  ) { }

  ngOnInit() {
    this.pageNameInterval = setInterval(() => {
      this.pageName = Constants.currentPage.includes(" |")
        ? Constants.currentPage.substr(Constants.currentPage.lastIndexOf("|") + 1).trim()
        : Constants.currentPage;
    }, 250);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.toLocaleLowerCase().includes("webapplications")
          && !event.url.toLocaleLowerCase().includes("nathangawithwebsite"))
          this.webapplication = true;
        }
      });
    window.addEventListener("resize", () => this.appRef.tick());
  }

  ngOnDestroy() {
    clearInterval(this.pageNameInterval);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"];
  }

  getStyle(): any {
    const margin = 2;
    return {
      "margin-left": Helper.isScreenSmall() ? `${margin}rem` : `${margin + 5}rem`,
      "margin-right": `${margin}rem`
    };
  }

  isScreenSmall(): boolean {
    return Helper.isScreenSmall();
  }
}
