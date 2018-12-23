import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "../../../../../node_modules/@angular/router";
import { Location } from "../../../../../node_modules/@angular/common";
import { Helper } from "../../../modules/Helper";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  leavePage: boolean = false;
  webapplication: boolean = false;
  history: string[] = [];
  sent: boolean = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    /*
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) console.log(event);
    });
    */
  }
}
