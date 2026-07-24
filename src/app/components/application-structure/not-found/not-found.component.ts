import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
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
export class NotFoundComponent implements OnInit, OnDestroy {

  loaded: boolean = false;
  content = "¯\\_(ツ)_/¯ NOT FOUND";

  // Pending redirect/dots timers, so navigating away (e.g. clicking a navbar
  // link) before the redirect fires can cancel it - otherwise the timers
  // keep running after this component is destroyed and force-navigate the
  // user away from wherever they just clicked.
  private redirectTimeoutId: any;
  private dotsTimeoutId: any;

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
        this.redirectTimeoutId = setTimeout(() => {
          window.location.href = route.link;
        }, 1200);
      }
      this.loaded = true;
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    clearTimeout(this.redirectTimeoutId);
    clearTimeout(this.dotsTimeoutId);
  }

  dots() {
    this.dotsTimeoutId = setTimeout(() => {
      this.content += " .";
      this.cdr.detectChanges();
      this.dots();
    }, 200);
  }

}
