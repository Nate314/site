import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { HttpClient } from "../../../../../node_modules/@angular/common/http";
import { AngularFireDatabase } from "angularfire2/database";
import { DB } from "src/app/helpers/DB";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

  friends: any;

  constructor(
    private router: Router,
    private location: Location,
    private afdb: AngularFireDatabase
  ) { }

  ngOnInit() {
    new DB(this.afdb).getDB().subscribe(db => {
      Helper.initializePage(this, this.router.url, PageNames.HOME);
      this.friends = db.getHome().otherwebsites.friends;
    });
  }

  openLink(event, url: string) {
    if (event.which === 1) {
      location.href = url;
    }
    if (event.which === 2) {
      window.open(url);
    }
  }

  openPage(event, page: string) {
    if (event.which === 1) {
      Helper.navigate(this.router, this.location, page);
    }
    if (event.which === 2) {
      window.open(page);
    }
  }
}
