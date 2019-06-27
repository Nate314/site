import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Helper, PageNames } from "../../../helpers/Helper";
import { DB, ResourceType } from "src/app/helpers/DB";
import { HttpClient } from "@angular/common/http";
import { DatabaseService } from "src/app/services";

@Component({
  selector: "app-github-projects",
  templateUrl: "./github-projects.component.html"
})
export class GithubProjectsComponent implements OnInit {

  projects: ResourceType[];
  description: string;

  constructor(
    private router: Router,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    Helper.initializePage(this, this.router.url, PageNames.GITHUB_PROJECTS);
    this.databaseService.connection().subscribe(db => {
      const githubProjects = db.getGithubProjects();
      this.description = githubProjects.description;
      this.projects = githubProjects.subpages;
    });
  }
}
