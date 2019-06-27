import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DB } from "../../../helpers/DB";
import { DomSanitizer, SafeResourceUrl } from "../../../../../node_modules/@angular/platform-browser";
import { DatabaseService } from "src/app/services";

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

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.VIDEOS);
    this.databaseService.connection().subscribe(db => {
      const dbVideos = db.getVideos();
      console.log(dbVideos);
      this.videos = [];
      for (let i = 0; i < dbVideos.length; i++) {
        this.videos.push(<Video>{
          title: dbVideos[i]["title"],
          link: this.sanitizer.bypassSecurityTrustResourceUrl(dbVideos[i]["link"]),
          description: dbVideos[i]["description"]
        });
      }
    });
  }
}
