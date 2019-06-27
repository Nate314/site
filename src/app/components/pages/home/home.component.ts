import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { HttpClient } from "../../../../../node_modules/@angular/common/http";
import { environment } from "src/environments/environment";
import { DB } from "src/app/helpers/DB";
import { DatabaseService } from "src/app/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

  otherwebsites: { name: string, link: string }[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.databaseService.connection().subscribe(db => {
      this.otherwebsites = db.getHome().otherwebsites;
      Helper.initializePage(this, this.router.url, PageNames.HOME);
      console.log(`production: ${environment.production}`);
    });
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
