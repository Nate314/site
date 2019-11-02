import { Component, OnInit, Input, Output } from "@angular/core";
import { KeyValue } from "@angular/common";
import { Subject } from "rxjs";

@Component({
  selector: "app-list-of-links",
  templateUrl: "./list-of-links.component.html"
})
export class ListOfLinksComponent implements OnInit {

  @Input() links: { name: string, url: string }[];
  @Output() click: Subject<KeyValue<any, string>> = new Subject<KeyValue<any, string>>();

  ngOnInit(): void { }

  openLink(event: any, url: string): void {
    this.click.next(<KeyValue<any, string>>{ key: event, value: url });
  }
}
