import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Helper } from "src/app/helpers/Helper";

@Component({
  standalone: false,
  selector: "app-list-of-links",
  templateUrl: "./list-of-links.component.html"
})
export class ListOfLinksComponent implements OnInit {

  @Input() links: { name: string, url: string }[];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  hrefFor(url: string): string {
    return Helper.hrefFor(url);
  }

  openLink(event: MouseEvent, url: string): void {
    Helper.smartNavigate(this.router, url, event);
  }
}
