import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-iframe-app",
  template: `<div id="iframediv"></div>`
})
export class IFrameAppComponent implements OnInit {

  @Input() src: string;

  constructor() { }

  ngOnInit() {
    document.getElementById("iframediv").innerHTML = `<iframe src="${this.src}"
    frameborder="0" style="width:100%; height:60vh;"></iframe>`;
  }

}
