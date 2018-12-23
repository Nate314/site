import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  url(url?: string): string {
    if (url === undefined) url = this.router.url;
    if (url.includes("?")) url = url.split("?")[0];
    if (url.includes("#")) url = url.split("#")[0];
    else url = url;
    if (this.router.url.includes("?")) {
      return url = url + this.subpage();
    }
    return url;
  }

  subpage() {
    const url = this.router.url;
    let result = "";
    if (url.includes("subpage=")) {
      const subpage = url.split("subpage=")[1].split("&")[0];
      if (subpage.toUpperCase().includes("APPLICATIONS"))
        result += `/${subpage.toUpperCase().replace("APPLICATIONS", "").toLowerCase()}`;
      else result += `/${subpage.toLowerCase()}`;
      if (url.includes("appName=")) {
        result += `/${url.split("appName=")[1].split("&")[0].toLowerCase()}`;
      }
    }
    return result;
  }
}
