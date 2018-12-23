import { Component, OnInit } from "@angular/core";
import { Helper } from "../../../../modules/Helper";

@Component({
  selector: "app-grade-calculator",
  templateUrl: "./grade-calculator.component.html",
  styleUrls: ["./grade-calculator.component.css"]
})
export class GradeCalculatorComponent implements OnInit {

  attendanceGrade: number = 100;
  homeworkGrade: number = 86.4;
  labGrade: number = 90;
  exam1Grade: number = 106;
  exam2Grade: number = 84.5;
  exam3Grade: number = 77.25;
  exam4Grade: number = 81;
  exam5Grade: number = 55;
  goal: number = 80;
  label: string;
  error: string;

  constructor() { }

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.label = "";
    this.error = "";
    if (Helper.equalsNull(this.attendanceGrade)
    || Helper.equalsNull(this.homeworkGrade)
    || Helper.equalsNull(this.labGrade)
    || Helper.equalsNull(this.exam1Grade)
    || Helper.equalsNull(this.exam2Grade)
    || Helper.equalsNull(this.exam3Grade)
    || Helper.equalsNull(this.exam4Grade)
    || Helper.equalsNull(this.exam5Grade)
      || Helper.equalsNull(this.goal))
      this.error = "Please fill out all three textboxes before pressing the Submit button.";
    else {
      const currentGrade = (0.05 * this.attendanceGrade)
      + (0.1 * this.homeworkGrade) + (0.2 * this.labGrade)
      + (0.1 * this.exam1Grade)
      + (0.1 * this.exam2Grade)
      + (0.1 * this.exam3Grade)
      + (0.1 * this.exam4Grade)
      + (0.1 * this.exam5Grade);
      const requiredFinalGrade = (this.goal - currentGrade) / 0.15;
      const toGetGrade = (currentGrade + (requiredFinalGrade * 0.15));
      if ((requiredFinalGrade + "") === "NaN" || (toGetGrade + "") === "NaN")
        this.error = "Please enter only numbers.";
      else this.label = `You need a ${this.round(requiredFinalGrade) / 100}% on the final`
        + ` to get a grade of ${this.round(toGetGrade) / 100}% in the class`;
    }
  }

  round(num: number): number {
    return Math.round(10000 * num) / 100;
  }
}
