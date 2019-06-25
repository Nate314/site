import { Component, OnInit } from "@angular/core";
import { Location } from "../../../../../node_modules/@angular/common";
import { Router } from "../../../../../node_modules/@angular/router";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html"
})
export class NotFoundComponent implements OnInit {

  loaded: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.loaded = true, 200);
  }

}
