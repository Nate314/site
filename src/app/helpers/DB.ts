import { Observable, Subject } from "rxjs";
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
    const subject = new Subject<DB>();
    const emit = r => subject.next(new DB(this.afdb, r));
    const localStorageDBKey = "db";
    const localStorageDB = localStorage.getItem(localStorageDBKey);
    this.afdb.list("/").valueChanges()
      .pipe(map(resp => {
        localStorage.setItem(localStorageDBKey, JSON.stringify(resp[0]));
        emit(resp[0]);
      })).subscribe();
    if (!!localStorageDB) setTimeout(() => emit(JSON.parse(localStorageDB)), 0);
    return subject.asObservable();
  }

  // public getFile(): Observable<any> {
  //  return this.
  // }

  public getRedirects(): ResourceType[] {
    return this.db.home.otherwebsites.redirects;
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
      otherwebsites: { friends: ResourceType[], redirects: ResourceType[] };
      JavaApplications: PageType<ApplicationType>;
      WebApplications: PageType<ApplicationType>;
      AndroidApplications: PageType<ApplicationType>;
      videos: PageType<ResourceType>;
      howitsmade: PageType<ResourceType>;
    }
  };
}
