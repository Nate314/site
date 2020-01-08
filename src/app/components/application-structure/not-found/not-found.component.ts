import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services";

@Component({
  selector: "app-not-found",
  template: `
  <div *ngIf="loaded">
    {{ content }}
  </div>
`
})
export class NotFoundComponent implements OnInit {

  loaded: boolean = false;
  content = "¯\\_(ツ)_/¯ NOT FOUND";

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.connection().subscribe(db => {
      const path = window.location.pathname;
      const redirects = db.getRedirects();
      if (redirects.map(x => x.title).includes(path)) {
        const route = redirects.find(x => x.title === path);
        this.content = `Redirecting to ${route.description}`;
        this.dots();
        setTimeout(() => {
          window.location.href = route.link;
        }, 1200);
      }
      this.loaded = true;
    });
  }

  dots() {
    setTimeout(() => {
      this.content += " .";
      this.dots();
    }, 200);
  }

}
