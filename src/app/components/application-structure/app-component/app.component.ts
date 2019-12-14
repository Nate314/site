import { trigger, style, transition, animate, query, group, state } from "@angular/animations";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/helpers/Helper";

// inspired by Fireship https://www.youtube.com/watch?v=7JA90VI9fAI
export function slideTo(from, to) {
  const direction = from < to ? "right" : "left";
  const distance = 100 * Math.abs(from - to);
  const optional = { optional: true };
  const animationTime = "1000ms ease";
  return [
    query(":enter, :leave", [
      style({
        position: "absolute",
        top: 0,
        [direction]: 0,
        width: "100%",
        opacity: 1
      })
    ], optional),
    query(":enter", [
      style({ [direction]: `-${distance}%`, opacity: 0 })
    ]),
    group([
      query(":leave", [
        animate(animationTime, style({ [direction]: `${distance}%`, opacity: 0 }))
      ], optional),
      query(":enter", [
        animate(animationTime, style({ [direction]: "0%", opacity: 1 }))
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
export class AppComponent implements OnInit {

  webapplication: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.toLocaleLowerCase().includes("webapplications")
          && !event.url.toLocaleLowerCase().includes("nathangawithwebsite"))
          this.webapplication = true;
        }
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"];
  }
}
