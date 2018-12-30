import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { Helper } from "src/app/modules/Helper";

@Component({
  selector: "app-typing-test",
  templateUrl: "./typing-test.component.html",
  styleUrls: ["./typing-test.component.css"]
})
export class TypingTestComponent implements OnInit {

  dummyparagraph: string = "Lorem ipsum dolor sit amet, consectetur adipiscing"
    + " elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    + " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
    + " ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
    + " in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur"
    + " sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt"
    + " mollit anim id est laborum.";
  customparagraph: string = "";
  paragraph: string = "";

  timerMinutes: number = 1;
  timerSeconds: number = 0;
  typingparagraph: string = "";
  disableTextBox: boolean = false;
  outputText: string = "";
  timerStarted: boolean = false;

  typedText: string = "";
  wrongtypedText: string = "";
  cursorText: string = "";
  untypedText: string = "";

  constructor() { }

  ngOnInit() {
  }

  replaceSpaces(str: string) {
    const typescript_non_breaking_space = String.fromCharCode(160);
    return Helper.replaceAll(str, "  ", " ");
  }

  clockTick() {
    if (this.timerMinutes > 0 && this.timerSeconds === 0) {
      this.timerMinutes--;
      this.timerSeconds = 59;
    }
    else if (this.timerSeconds > 0) {
      this.timerSeconds--;
    }
    if (this.timerMinutes === 0 && this.timerSeconds === 0) {
      this.disableTextBox = true;
      let wpm = this.typedText.split(" ").length;
      if (this.cursorText !== " ") wpm -= 1;
      this.outputText = `You typed at ${wpm} words per minute`;
    }
  }

  pad(num: number): string {
    if (num < 10) {
      return "0" + num;
    }
    else return "" + num;
  }

  correctPart() {
    let temp_typingparagraph = "";
    let temp_typedText = "";
    let temp_wrongtypedText = "";
    let wrongTextHit = false;
    this.typingparagraph = this.replaceSpaces(this.typingparagraph);
    for (let i = 0; i < this.typingparagraph.length; i++) {
      temp_typingparagraph += this.typingparagraph[i];
      if (!wrongTextHit && this.paragraph.startsWith(temp_typedText + this.typingparagraph[i])) {
        temp_typedText += this.typingparagraph[i];
      }
      else {
        wrongTextHit = true;
        temp_wrongtypedText += this.typingparagraph[i];
      }
    }
    this.typedText = temp_typedText;
    this.wrongtypedText = temp_wrongtypedText;
    this.untypedText = this.paragraph.substr(this.typedText.length + 1, this.paragraph.length);
    this.cursorText = this.paragraph[this.typedText.length];
  }

  typingparagraphchanged() {
    if (!this.timerStarted) {
      this.timerStarted = true;
      setInterval(() => {
        if (this.timerStarted) {
          this.clockTick();
        }
      }, 150);
    }
    this.correctPart();
  }

  submit() {
    this.paragraph = this.customparagraph + " ";
    this.untypedText = this.paragraph;
  }

  restart() {
    this.typingparagraph = "";
    this.timerMinutes = 1;
    this.timerSeconds = 0;
    this.outputText = "";
    this.cursorText = "";
    this.typedText = "";
    this.wrongtypedText = "";
    this.untypedText = this.paragraph;
    this.timerStarted = false;
    this.disableTextBox = false;
  }
}
