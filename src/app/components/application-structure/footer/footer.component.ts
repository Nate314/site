import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html"
})
export class FooterComponent implements OnInit {

  get url(): string {
    return `${window.location.host}${this.router.url}`;
  }

  constructor(private router: Router) { }

  ngOnInit() { }

}
