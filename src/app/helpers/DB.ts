import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

class DB {

	videos: any;

	db: DBType;

	constructor(private http: HttpClient, private database?: DBType) {
		if (database) {
			this.db = <DBType> database;
			console.log(database);
		}
	}

	public getDB(): Observable<DB> {
		const url = true ? "/site/assets/db.json" : "/assets/db.json";
		return this.http.get<any>(url).pipe(map(resp => {
			return new DB(this.http, <DBType> resp);
		}));
	}

	public getHome() {
		return this.db.nate314.home;
	}

	public getGithubProjects(): PageType<ResourceType> {
		return this.getHome().githubprojects;
	}

	public getJavaApplications(): PageType<ApplicationType> {
		return this.getHome().javaApplications;
	}

	public getWebApplications(): PageType<ApplicationType> {
		return this.getHome().webApplications;
	}

	public getAndroidApplications(): PageType<ApplicationType> {
		return this.getHome().androidApplications;
	}

	public getVideos(): ResourceType[] {
		return this.getHome().videos.subpages;
	}

}

class ApplicationType {
	name: string;
	file: string;
	selector: string;
	description: string;
}

class ResourceType {
	title: string;
	link: string;
	description: string;
}

class PageType<T> {
	title: string;
	name: string;
	link: string;
	description: string;
	subpages: T[];
}

class DBType {
	nate314: {
		home: {
			title: string;
			subtitle: string;
			name: string;
			sections: string[];
			otherwebsites: string;
			javaApplications: PageType<ApplicationType>;
			webApplications: PageType<ApplicationType>;
			androidApplications: PageType<ApplicationType>;
			videos: PageType<ResourceType>;
			githubprojects: PageType<ResourceType>;
			howitsmade: PageType<ResourceType>;
		}
	};
}

export { DB, DBType, PageType, ResourceType, ApplicationType }
