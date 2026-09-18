import { Component, OnInit, Input } from "@angular/core";

@Component({
  standalone: false,
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
    const iframe = document.createElement("iframe");
    iframe.src = this.src;
    iframe.setAttribute("frameborder", "0");
    iframe.style.width = "100%";
    iframe.style.height = "60vh";
    document.getElementById("iframediv").replaceChildren(iframe);
  }

}
