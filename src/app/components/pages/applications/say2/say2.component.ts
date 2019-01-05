import { Component, OnInit } from "@angular/core";
import { Router } from "../../../../../../node_modules/@angular/router";
import { Location } from "../../../../../../node_modules/@angular/common";

@Component({
  selector: "app-say2",
  templateUrl: "./say2.component.html"
})
export class Say2Component implements OnInit {

  input: number;
  numberLabel: string = "";
  t: string[] = ["", " one", " two", " three", " four", " five", " six", " seven",
    " eight", " nine", " ten", " eleven", " twelve", " thirteen", " fourteen",
    " fifteen", " sixteen", " seventeen", " eighteen", " nineteen", "", " ten",
    " twenty", " thirty", " fourty", " fifty", " sixty", " seventy", " eighty",
    " ninety", " hundred", "", " thousand", " million", " billion", " trillion"];

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {

  }

  log10(val) {
    return Math.log(val) / Math.LN10;
  }

  calculate() {
    if (this.input > 999999999999999) {
      this.numberLabel = "number is too big";
    }
    else if (this.input < -999999999999999) {
      this.numberLabel = "number is too small";
    }
    else {
      this.numberLabel = ((this.input < 0) ? "negative" : "") + ((this.input === 0) ?
        "zero" : ((this.input < 0) ? this.say2(-1 * this.input) : this.say2(this.input)));
    }
  }

  say(num: number) {
    let resault = "";
    if (num > 19) {
        if (num > 99) resault += this.t[Math.floor(num / 100)] + " hundred";
        if (num % 100 < 20 && num % 100 > 0) resault += this.t[Math.floor(num % 100)];
        else {
            resault += this.t[(Math.floor((num % 100) / 10)) + 20];
            resault += this.t[Math.floor(num % 10)];
        }
    }
    else resault += this.t[num];
    return resault;
  }

  say2(num) {
    let resault = "";
    const digits = Math.floor(this.log10(num)) + 1;
    const iterations = Math.floor(digits / 3) + ((digits % 3 === 0) ? 0 : 1);
    const parts = new Array(iterations);
    let divisor = Math.floor(Math.pow(10, ((iterations - 1) * 3)));
    for (let i = 0; i < iterations; i++) {
        parts[i] = Math.floor((num / divisor) % 1000);
        const part = this.say(parts[i]);
        resault += part + ((parts[i] === 0) ? "" : this.t[30 + iterations - i]);
        divisor /= 1000;
    }
    return resault;
  }
}
