import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Constants, Helper } from "../../../helpers/Helper";

class Page {
  link: string;
  name: string;
  svg: string;
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {

  pages: Page[] = [];

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.pages.push(<Page>{ link: "/home", name: "Home", svg: "home" });
    this.pages.push(<Page>{ link: "/applications", name: "Applications", svg: "laptop" });
    this.pages.push(<Page>{ link: "/github-projects", name: "Github Projects", svg: "github" });
    this.pages.push(<Page>{ link: "/videos", name: "Videos", svg: "youtube" });
    this.pages.push(<Page>{ link: "https://games.nathangawith.com/", name: "Games", svg: "gamepad" });
    this.pages.push(<Page>{ link: "https://resume.nathangawith.com/", name: "Resume", svg: "file-invoice" });
  }

  goTo(url: string) {
    if (url.includes("https://")) {
      location.href = url;
    } else {
      Helper.navigate(this.router, this.location, url);
    }
  }

  isSelected(page: Page) {
    if (Constants.currentPageURL.includes(page.link)) return true;
    else return false;
  }
}
