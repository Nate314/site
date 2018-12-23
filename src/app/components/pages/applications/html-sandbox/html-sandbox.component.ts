import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-html-sandbox",
  templateUrl: "./html-sandbox.component.html",
  styleUrls: ["./html-sandbox.component.css"]
})
export class HtmlSandboxComponent implements OnInit {

  html: string = "<html>\n\t<body>\n\t\t"
    + "<h1>this is a heading</h1>\n\t\t"
    + "<p>this is a paragraph</p>\n\t"
    + "<body>\n<html>";

  constructor() { }

  ngOnInit() {
  }

}
