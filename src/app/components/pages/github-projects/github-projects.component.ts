import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService } from "src/app/services";

@Component({
  standalone: false,
  selector: "app-github-projects",
  templateUrl: "./github-projects.component.html"
})
export class GithubProjectsComponent implements OnInit {

  projects: any[];
  description: string;

  constructor(
    private router: Router,
    private db: DatabaseService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.GITHUB_PROJECTS);
    this.db.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.description = githubProjects.description;
      this.projects = githubProjects.subpages;
      // Zoneless: explicitly trigger change detection after async data loads.
      this.cdr.detectChanges();
    });
  }

  isScreenSmall(): boolean {
    return Helper.isScreenSmall();
  }
}
