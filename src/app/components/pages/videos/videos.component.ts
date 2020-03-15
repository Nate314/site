import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DomSanitizer, SafeResourceUrl } from "../../../../../node_modules/@angular/platform-browser";
import { DatabaseService } from "src/app/services";

class Video {
  title: string;
  link: SafeResourceUrl;
  description: string;
  preview: string;
  enabled: boolean;
}

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html"
})
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.VIDEOS);
    const getSanatized = link => this.sanitizer.bypassSecurityTrustResourceUrl(link);
    this.db.connection().subscribe(db => {
      const dbVideos = db.getVideos();
      console.log("dbVideos");
      console.log(dbVideos);
      const time = new Date().getTime();
      this.videos = dbVideos.map(v => {
        return <Video>{
          title: v["title"],
          link: getSanatized(`https://www.youtube.com/embed/${v["link"]}`),
          description: v["description"],
          preview: v["preview"] + `?time=${time}`,
          enabled: false
        };
      });
    });
  }

  getColumns(): number {
    const el = document.getElementById("videoGrid");
    const width = el ? el.offsetWidth : window.innerWidth;
    const result = Math.max(Math.floor(width / 340), 1);
    return result;
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
