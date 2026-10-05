export class DB {

  applications: any;
  videos: any;
  githubProjects: any;

  db: any;

  // `database` is the value of the "nate314" node, i.e. { home: { ... } }.
  constructor(database: any) {
    this.db = database;
    this.applications = this.db.home.pages[0];
    this.videos = this.db.home.pages[1].subpages[0]["videos"];
    this.githubProjects = this.db.home.pages[1].subpages[1];
  }

  public getRedirects(): ResourceType[] {
    return this.db.home.otherwebsites.redirects || [];
  }

  public getHome() {
    return this.db.home;
  }

  public getPages() {
    return this.db.home.pages;
  }

  public getApplications() {
    return this.applications;
  }

  public getJavaApplications() {
    return this.applications.subpages[0];
  }

  public getWebApplications() {
    return this.applications.subpages[1];
  }

  public getAndroidApplications() {
    return this.applications.subpages[2];
  }

  public getVideos() {
    return this.videos;
  }

  public getGithubProjects() {
    return this.githubProjects;
  }

}

class ResourceType {
  title: string;
  link: string;
  description: string;
}
