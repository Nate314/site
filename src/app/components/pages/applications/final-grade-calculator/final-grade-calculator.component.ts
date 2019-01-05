import { Component, OnInit } from "@angular/core";
import { Helper } from "../../../../modules/Helper";

@Component({
  selector: "app-final-grade-calculator",
  templateUrl: "./final-grade-calculator.component.html"
})
export class FinalGradeCalculatorComponent implements OnInit {

  currentGrade: number;
  finalPercentage: number;
  goal: number;
  label: string;
  error: string;

  constructor() { }

  ngOnInit() {
  }

  calculate() {
    this.label = "";
    this.error = "";
    if (Helper.equalsNull(this.currentGrade)
      || Helper.equalsNull(this.finalPercentage)
      || Helper.equalsNull(this.goal))
      this.error = "Please fill out all three textboxes before pressing the Submit button.";
    else {
      const requiredFinalGrade = this.finalGradeRequired(this.currentGrade * 0.01,
        this.finalPercentage * 0.01, this.goal * 0.01);
      const toGetGrade = this.finalGrade(this.currentGrade * 0.01,
        this.finalPercentage * 0.01, requiredFinalGrade * 0.0001);
      if ((requiredFinalGrade + "") === "NaN" || (toGetGrade + "") === "NaN")
        this.error = "Please enter only numbers.";
      else this.label = `You need a ${requiredFinalGrade / 100}% on the final`
        + ` to get a grade of ${toGetGrade / 100}% in the class`;
    }
  }

  finalGradeRequired(currentGrade: number, finalPercentage: number, goal: number): number {
      return Math.round(10000 * ((goal - (currentGrade * (1 - finalPercentage))) / finalPercentage));
  }

  finalGrade(currentGrade: number, finalPercentage: number, requiredFinalGrade: number): number {
    return Math.round(10000 * ((currentGrade * (1 - finalPercentage)) + (requiredFinalGrade * finalPercentage)));
  }
}
