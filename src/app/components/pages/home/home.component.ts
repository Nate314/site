import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService } from "src/app/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

  friendLinks: any[];
  youtubeLinks: any[];
  languageLinks: any[];
  toolLinks: any[];

  constructor(
    private router: Router,
    private location: Location,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.connection().subscribe(db => {
      Helper.initializePage(this, this.router.url, PageNames.HOME);
      const otherwebsites = db.getHome().otherwebsites;
      this.friendLinks = otherwebsites.friends;
      this.youtubeLinks = otherwebsites.youtube;
      this.languageLinks = otherwebsites.languages;
      this.toolLinks = otherwebsites.tools;
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
