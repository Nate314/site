import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService, UnlockService } from "src/app/services";

@Component({
  standalone: false,
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

  friendLinks: any[];
  youtubeLinks: any[];
  // Each language/tool entry in db.json is tagged with a "context" of "work",
  // "personal", or "both", so the WellSky and personal-project paragraphs on
  // this page can each link the technologies actually relevant to them.
  workLinks: any[];
  personalLinks: any[];

  constructor(
    private router: Router,
    private db: DatabaseService,
    private cdr: ChangeDetectorRef,
    public unlock: UnlockService
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.HOME);
    this.db.connection().subscribe(db => {
      const otherwebsites = db.getHome().otherwebsites;
      this.friendLinks = otherwebsites.friends;
      this.youtubeLinks = otherwebsites.youtube;
      const techLinks = [...otherwebsites.languages, ...otherwebsites.tools];
      this.workLinks = techLinks.filter(t => t.context === "work" || t.context === "both");
      this.personalLinks = techLinks.filter(t => t.context === "personal" || t.context === "both");
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
    // Zoneless: the Konami-toggle happens outside this component's own
    // template events, so re-render explicitly when it changes.
    this.unlock.unlocked$.subscribe(() => this.cdr.detectChanges());
  }

  // A real href for the [href] binding, so right-click "Copy Link
  // Address"/"Open in new tab" work - see Helper.hrefFor.
  hrefFor(url: string): string {
    return Helper.hrefFor(url);
  }

  // Routes internal links (e.g. "videos") through Angular's Router on a plain
  // left-click; external URLs and modified clicks are left to the real
  // [href] to handle natively - see Helper.smartNavigate.
  go(event: MouseEvent, url: string) {
    Helper.smartNavigate(this.router, url, event);
  }
}
