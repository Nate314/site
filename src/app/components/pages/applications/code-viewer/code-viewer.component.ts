import { Component, OnInit } from "@angular/core";
import { SiteFolder, SiteComponent, getSiteFiles } from "../../../../helpers/FileStructure";

@Component({
    selector: "app-code-viewer",
    templateUrl: "./code-viewer.component.html"
})
export class CodeViewerComponent implements OnInit {

    dir: SiteFolder;
    path: string;
    files: string[];

    constructor() {

    }

    ngOnInit() {
        getSiteFiles();
    }

    clickFolderName() {
        
    }

    clickSubFolderName() {
        
    }

    clickFileName() {
        
    }

    clickComponentName() {
        
    }

}
