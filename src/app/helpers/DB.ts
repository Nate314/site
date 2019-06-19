import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class DB {

	applications: any;
	videos: any;

	db: any;

	constructor(private http: HttpClient, private database?: any) {
		if (database) {
			this.db = database;
			this.applications = this.db.nate314.home.pages[0];
			this.videos = this.db.nate314.home.pages[1].subpages[0]["videos"];
			console.log(database);
		}
	}

	public getDB(): Observable<any> {
		return this.http.get<any>("/site/assets/db.json").pipe(map(resp => {
			return new DB(this.http, resp);
		}));
	}

	public getHome() {
		return this.db.nate314.home;
	}

	public getPages() {
		return this.db.nate314.home.pages;
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
			otherwebsites: string;
			JavaApplications: PageType<ApplicationType>;
			WebApplications: PageType<ApplicationType>;
			AndroidApplications: PageType<ApplicationType>;
			videos: PageType<ResourceType>;
			howitsmade: PageType<ResourceType>;
		}
	};
}
