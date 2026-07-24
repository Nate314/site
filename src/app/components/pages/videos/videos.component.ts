import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DatabaseService } from "src/app/services";

class Video {
  title: string;
  link: SafeResourceUrl;
  description: string;
  preview: string;
  enabled: boolean;
  linkedProject?: string;
  category: string;
}

@Component({
  standalone: false,
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.css"]
})
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  // True until db.json resolves; gates the skeleton vs. real content in the
  // template. skeletonCards exists only to give *ngFor something to repeat
  // over for a fixed number of placeholder cards.
  loading = true;
  skeletonCards: unknown[] = new Array(6);
  skeletonTabs: unknown[] = new Array(3);

  // Set (from a "video" query param) when navigating in from a project's
  // "Watch the video" link, and cleared after the highlight-pulse animation
  // finishes so the CSS class can retrigger on a later visit.
  highlightedVideoTitle: string | null = null;

  // Order and display labels for grouping the videos list below by category,
  // mirroring GithubProjectsComponent's tab strip pattern.
  private readonly videoCategoryOrder = ["Code", "Rubik's Cube", "Other Projects"];
  activeTab = this.videoCategoryOrder[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private db: DatabaseService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.VIDEOS);
    const getSanatized = link => this.sanitizer.bypassSecurityTrustResourceUrl(link);
    this.db.connection().subscribe(db => {
      const dbVideos = db.getVideos();
      const time = new Date().getTime();
      this.videos = dbVideos.map(v => {
        // v.link may be a full YouTube embed URL or a bare video id
        const raw = String(v["link"]);
        const id = raw.includes("/") ? raw.split("/").pop().split("?")[0] : raw;
        return <Video>{
          title: v["title"],
          link: getSanatized(`https://www.youtube.com/embed/${id}`),
          description: v["description"],
          preview: v["preview"]
            ? v["preview"] + `?time=${time}`
            : `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          enabled: false,
          linkedProject: v["linkedProject"],
          category: v["category"]
        };
      });
      this.applyLinkedVideoHighlight();
      this.loading = false;
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }

  // Scrolls to and schedules a highlight-pulse on the linked video once the
  // page has rendered. No-ops (page loads exactly as it does with no query
  // param) if there's no "video" param or it doesn't match any known video
  // title.
  private applyLinkedVideoHighlight() {
    const title = this.route.snapshot.queryParamMap.get("video");
    if (!title) return;
    const video = this.videos.find(v => v.title === title);
    if (!video) return;
    this.activeTab = video.category;
    setTimeout(() => {
      document.getElementById(this.videoElementId(video.title))
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      this.highlightedVideoTitle = video.title;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.highlightedVideoTitle = null;
        this.cdr.detectChanges();
      }, 2000);
    }, 0);
  }

  // Turns a video title into a DOM-safe id for scrollIntoView targeting.
  videoElementId(title: string): string {
    return "video-" + title.replace(/[^a-zA-Z0-9]+/g, "-");
  }

  getYoutubeLink(sanatizedLink: any): string {
    const link = sanatizedLink["changingThisBreaksApplicationSecurity"];
    const urlParts = `${link}/`.split("/");
    const id = urlParts[urlParts.length >= 2 ? urlParts.length - 2 : urlParts.length - 1];
    const result = `https://www.youtube.com/watch?v=${id}`;
    return result;
  }

  btnThumbnail(video: Video): void {
    this.videos.forEach(x => x.enabled = false);
    video.enabled = true;
  }

  selectTab(key: string) {
    this.activeTab = key;
    this.cdr.detectChanges();
  }

  get pageTabs(): { key: string; label: string }[] {
    return this.videoGroups.map(g => ({ key: g.category, label: g.category }));
  }

  // Groups the flat videos list into labeled sections by category, in a
  // fixed display order, omitting any empty category. Order is otherwise
  // preserved within each category.
  get videoGroups(): { category: string; videos: Video[] }[] {
    return this.videoCategoryOrder
      .map(category => ({
        category,
        videos: this.videos.filter(v => v.category === category)
      }))
      .filter(group => group.videos.length > 0);
  }
}
