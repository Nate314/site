import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireDatabase } from "angularfire2/database";

export class DB {

  applications: any;
  videos: any;
  githubProjects: any;

  db: any;

  constructor(
    private afdb: AngularFireDatabase,
    private database?: any
  ) {
    if (database) {
      this.db = database;
      this.applications = this.db.home.pages[0];
      this.videos = this.db.home.pages[1].subpages[0]["videos"];
      this.githubProjects = this.db.home.pages[1].subpages[1];
      console.log(database);
    }
  }

  public getDB(): Observable<any> {
    return this.afdb.list("/").valueChanges()
      .pipe(map(resp => {
        return new DB(this.afdb, resp[0]);
      }));
  }

  // public getFile(): Observable<any> {
  //  return this.
  // }

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
    console.log(this.applications);
    return this.applications.subpages[0];
  }

  public getWebApplications() {
    return this.applications.subpages[1];
  }

  public getAndroidApplications() {
    return this.applications.subpages[2];
  }

  public getVideos() {
    console.log(this.videos);
    return this.videos;
  }

  public getGithubProjects() {
    console.log(this.githubProjects);
    return this.githubProjects;
  }

}

class ApplicationType {
  name: string;
  description: string;
  link: string;
  apps: {
    name: string;
    file: string;
    selector: string;
    description: string;
  }[];
}

class ResourceType {
  title: string;
  link: string;
  description: string;
}

class PageType<T> {
  title: string;
  name: string;
  description: string;
  subpages: T[];
}

class DBtype {
  nate314: {
    home: {
      title: string;
      subtitle: string;
      name: string;
      sections: string[];
      otherwebsites: { friends: ResourceType[] };
      JavaApplications: PageType<ApplicationType>;
      WebApplications: PageType<ApplicationType>;
      AndroidApplications: PageType<ApplicationType>;
      videos: PageType<ResourceType>;
      howitsmade: PageType<ResourceType>;
    }
  };
}
