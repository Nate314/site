import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { HttpClient } from "../../../../../node_modules/@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private location: Location, private http: HttpClient) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.HOME);
  }

  openLink(event, url: string) {
    console.log(event.which);
    if (event.which === 1) {
      location.href = url;
    }
    if (event.which === 2) {
      window.open(url);
    }
  }

  openPage(event, page: string) {
    console.log(page);
    if (event.which === 1) {
      Helper.navigate(this.router, this.location, page);
    }
    if (event.which === 2) {
      window.open(page);
    }
  }
}
