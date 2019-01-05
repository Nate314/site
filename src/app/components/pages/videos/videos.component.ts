import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../modules/Helper";
import { DB } from "../../../modules/DB";
import { DomSanitizer, SafeResourceUrl } from "../../../../../node_modules/@angular/platform-browser";

class Video {
  title: string;
  link: SafeResourceUrl;
  description: string;
}

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html"
})
export class VideosComponent implements OnInit {

  videos: Video[] = [];

  constructor(private router: Router, private location: Location, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.VIDEOS);
    const dbVideos = DB.dbVideos.getVideos();
    this.videos = [];
    for (let i = 0; i < dbVideos.length; i++) {
      this.videos.push(<Video>{
        title: dbVideos[i]["title"],
        link: this.sanitizer.bypassSecurityTrustResourceUrl(dbVideos[i]["link"]),
        description: dbVideos[i]["description"]
      });
    }
  }
}
