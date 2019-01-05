import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html"
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  url(url?: string): string {
    return this.router.url;
  }

}
