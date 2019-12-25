import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-iframe-app",
  template: `
  <div id="iframediv"></div>
  <div>
    You can open this application on it's own
    <a [href]="src">here</a>
  </div>
`
})
export class IFrameAppComponent implements OnInit {

  @Input() src: string;

  constructor() { }

  ngOnInit() {
    document.getElementById("iframediv").innerHTML = `
      <iframe src="${this.src}" frameborder="0" style="width:100%; height:60vh;"></iframe>
    `;
  }

}
