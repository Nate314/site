import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-multiplication-table",
  templateUrl: "./multiplication-table.component.html"
})
export class MultiplicationTableComponent implements OnInit {

  traditionalOption: boolean = true;
  loading: boolean = false;
  size: number;
  lastsize: number;
  multTableTraditional: number[][] = [];
  multTableOther: number[][] = [];
  multTable: string[][] = [];

  constructor() { }

  ngOnInit() {
    this.size = 12;
    this.generateTable(true);
    this.generateTable(false);
    this.loadTable();
  }

  getClass(i: number, j: number): string {
    return (i === 0 || j === 0) ? "w3-gray" : ((i === j) ? "w3-gray" : "w3-light-gray");
  }

  loadTable() {
    this.loading = true;
    if (this.size <= 120) {
      this.multTable = [];
      for (let i = 0; i < Number(this.size) + (this.traditionalOption ? 2 : 0); i++) {
        let tempList = [];
        for (let j = 0; j < Number(this.size) + (this.traditionalOption ? 2 : 0); j++) {
          if (this.traditionalOption) tempList.push(this.multTableTraditional[i][j]);
          else tempList.push(this.multTableOther[i][j]);
        }
        tempList = tempList;
        this.multTable.push(tempList);
      }
      this.lastsize = this.size;
    }
    else if (this.size > 120) {
      this.size = 120;
      this.loadTable();
    }
    else {
      this.size = this.lastsize;
    }
    this.loading = false;
  }

  generateTable(traditional: boolean) {
    if (traditional) this.multTableTraditional = [];
    else this.multTableOther = [];
    for (let i = -1; i < 120 + 1; i++) {
      let tempList = [];
      for (let j = -1; j < 120 + 1; j++) {
        if (i === -1 && j === -1) {
          if (traditional) tempList.push("asdf");
          else tempList.push(1);
        }
        else if (i === 0 || j === 0 || i === 1 || j === 1) {
          if (traditional) {
            if (i === -1 || j === -1) {
              if (i === -1) tempList.push(j);
              else if (j === -1) tempList.push(i);
            }
            else tempList.push(i * j);
          }
        }
        else if (i === -1 || j === -1) {
          if (i === -1) tempList.push(j);
          else if (j === -1) tempList.push(i);
        }
        else tempList.push(i * j);
      }
      tempList = tempList;
      if (tempList.length !== 0) {
        if (traditional) this.multTableTraditional.push(tempList);
        else this.multTableOther.push(tempList);
      }
    }
  }
}
