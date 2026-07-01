import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DatabaseService } from "src/app/services";

class Video {
  title: string;
  link: SafeResourceUrl;
  description: string;
  preview: string;
  enabled: boolean;
}

@Component({
  standalone: false,
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.css"]
})
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  constructor(
    private router: Router,
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
          enabled: false
        };
      });
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
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
}
