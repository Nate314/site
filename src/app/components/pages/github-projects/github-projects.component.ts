import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DatabaseService } from "src/app/services";

@Component({
  selector: "app-github-projects",
  templateUrl: "./github-projects.component.html"
})
export class GithubProjectsComponent implements OnInit {

  projects: any[];
  description: string;

  constructor(
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.connection().subscribe(db => {
      Helper.initializePage(this, this.router.url, PageNames.GITHUB_PROJECTS);
      const githubProjects = db.getGithubProjects();
      this.description = githubProjects.description;
      this.projects = githubProjects.subpages;
    });
  }
}
