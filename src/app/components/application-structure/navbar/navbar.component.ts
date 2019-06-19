import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Constants, Helper } from "../../../helpers/Helper";

class Page {
  link: string;
  name: string;
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {

  pages: Page[] = [];

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.pages.push(<Page>{ link: "/home", name: "Home" });
    this.pages.push(<Page>{ link: "/applications", name: "Applications" });
    this.pages.push(<Page>{ link: "/videos", name: "Videos" });
  }

  goTo(url: string) {
    Helper.navigate(this.router, this.location, url);
    // location.href = url;
  }

  isSelected(page: Page) {
    if (Constants.currentPageURL.includes(page.link)) return true;
    else return false;
  }
}
