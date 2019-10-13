import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DB } from "../../../helpers/DB";
import { DomSanitizer, SafeResourceUrl } from "../../../../../node_modules/@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "angularfire2/database";

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
    private afdb: AngularFireDatabase
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.VIDEOS);
    new DB(this.afdb).getDB().subscribe(db => {
      const dbVideos = db.getVideos();
      this.videos = dbVideos.map(v => {
        return <Video> {
          title: v["title"],
          link: this.sanitizer.bypassSecurityTrustResourceUrl(v["link"]),
          description: v["description"]
        };
      });
    });
  }
}
