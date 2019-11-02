import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DB } from "../../../helpers/DB";
import { DomSanitizer, SafeResourceUrl } from "../../../../../node_modules/@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "angularfire2/database";
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
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.connection().subscribe(db => {
      Helper.initializePage(this, this.router.url, PageNames.VIDEOS);
      const dbVideos = db.getVideos();
      console.log("dbVideos");
      console.log(dbVideos);
      this.videos = dbVideos.map(v => {
        return <Video>{
          title: v["title"],
          link: this.sanitizer.bypassSecurityTrustResourceUrl(v["link"]),
          description: v["description"]
        };
      });
    });
  }
}
