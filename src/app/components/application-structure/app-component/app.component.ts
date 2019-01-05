import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "../../../../../node_modules/@angular/router";
import { Location } from "../../../../../node_modules/@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  webapplication: boolean = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.toLocaleLowerCase().includes("webapplications")
          && !event.url.toLocaleLowerCase().includes("nathangawithwebsite"))
          this.webapplication = true;
      }
    });
  }
}
