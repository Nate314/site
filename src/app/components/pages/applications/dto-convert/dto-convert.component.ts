import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { Helper } from "src/app/modules/Helper";

@Component({
  selector: "app-dto-convert",
  templateUrl: "./dto-convert.component.html",
  styleUrls: ["./dto-convert.component.css"]
})
export class DtoConvertComponent implements OnInit {

  dto_csharp: string = "class User {\n"
    + "\tpublic string username { get; set; }\n"
    + "\tpublic string password { get; set; }\n"
    + "}";

  dto_typescript: string = "class User {\n"
    + "\tusername: string;\n"
    + "\tpassword: string;\n"
    + "}";

  csharp_text: string;
  typescript_text: string;

  constructor() { }

  ngOnInit() {
  }

  csharp_to_typescript() {
    let result = this.csharp_text;
    result = Helper.replaceAll(result, "  ", " ");
    const getset_list = ["{get;set;}", "{ get;set;}", "{ get; set;}", "{ get; set; }"
      , "{get;set; }", "{get; set; }", "{get; set;}"];
    for (const getset of getset_list) {
      result = Helper.replaceAll(result, getset, "");
    }
    const result_lines = result.split("\n");
    result = "";
    for (const line of result_lines) {
      if (!Helper.equalsNull(line)) {
        if (line.indexOf("{") !== -1 || line.indexOf("}") !== -1) {
          result += line + "\n";
        }
        else {
          const variable = line.split(" ")[2];
          const type = line.split(" ")[1];
          result += `\t${variable}: ${type};\n`;
        }
      }
    }
    this.typescript_text = result;
  }

  typescript_to_csharp() {
    let result = this.typescript_text;
    result = Helper.replaceAll(result, "  ", " ");
    const result_lines = result.split("\n");
    result = "";
    for (const line of result_lines) {
      if (!Helper.equalsNull(line)) {
        if (line.indexOf("{") !== -1 || line.indexOf("}") !== -1) {
          result += line + "\n";
        }
        else {
          const scope = "public";
          const type = Helper.replaceAll(line, " ", "").split(":")[1].split(";")[0];
          const variable = Helper.replaceAll(line, "\t", "").split(":")[0];
          result += `\t${scope} ${type} ${variable} { get; set; }\n`;
        }
      }
    }
    this.csharp_text = result;
  }
}
