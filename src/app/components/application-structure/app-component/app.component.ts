import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "../../../../../node_modules/@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
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
}
