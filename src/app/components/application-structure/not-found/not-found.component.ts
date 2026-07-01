import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DatabaseService } from "src/app/services";

@Component({
  standalone: false,
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
    private db: DatabaseService,
    private cdr: ChangeDetectorRef
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
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }

  dots() {
    setTimeout(() => {
      this.content += " .";
      this.cdr.detectChanges();
      this.dots();
    }, 200);
  }

}
