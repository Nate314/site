import { Component, OnInit } from "@angular/core";
import { Location } from "../../../../../node_modules/@angular/common";
import { Router } from "../../../../../node_modules/@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent implements OnInit {

  loaded: boolean = false;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    setTimeout(() => this.loaded = true, 200);
  }

}
