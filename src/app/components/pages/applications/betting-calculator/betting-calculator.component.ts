import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-betting-calculator",
  templateUrl: "./betting-calculator.component.html",
  styleUrls: ["./betting-calculator.component.css"]
})
export class BettingCalculatorComponent implements OnInit {

  houseAccount: number = 0;
  players: number = 2;
  playerName: string = "Horse";
  humans: number = 2;
  playerIndecies: number[] = [];
  humanIndecies: number[] = [];
  // grid[human][player]
  grid: number[][] = [];
  output: string = "";

  constructor() { }

  ngOnInit() {
    this.setUpTable();
  }

  setUpTable() {
    this.playerIndecies = [];
    this.humanIndecies = [];
    this.grid = [];
    this.output = "";
    for (let i = 0; i < this.humans; i++) {
      this.humanIndecies.push(i + 1);
      let tempList = [];
      for (let j = 0; j < this.players; j++) {
        if (i === 0) this.playerIndecies.push(j + 1);
        tempList.push(0);
      }
      tempList = tempList;
      this.grid.push(tempList);
    }
  }

  playerWon(winnerID: number) {
    winnerID--;
    let totalLoot = this.houseAccount;
    let winningPot = 0;
    let loosingPot = 0;
    let winnings = [];
    let totalWinnings = 0;
    for (let i = 0; i < this.humans; i++) {
      for (let j = 0; j < this.players; j++) {
        totalLoot += this.grid[i][j];
        if (j === winnerID) winningPot += this.grid[i][j];
        else loosingPot += this.grid[i][j];
      }
    }
    this.output = `TotalLoot: ${totalLoot} `
      + `(House: ${this.houseAccount}, `
      + `WinningPot: ${winningPot}, `
      + `LoosingPot: ${loosingPot})<br />`;
    for (let i = 0; i < this.humans; i++) {
      if (this.grid[i][winnerID] !== 0)
        winnings.push(parseInt(((this.grid[i][winnerID] / winningPot) * totalLoot) + "", 10));
      else winnings.push(0);
    }
    winnings = winnings;
    this.output += `<div class="row border border-left-0 border-right-0"><div class="col-12">`;
    for (let i = 0; i < this.humans; i++) {
      if (winnings[i] !== 0) this.output += `<b>Human ${i + 1}: ${winnings[i]}</b><br />`;
      else this.output += `Human ${i + 1}: ${winnings[i]}<br />`;
      totalWinnings += winnings[i];
    }
    this.output += `</div></div>`;
    this.houseAccount = Math.round(100 * (totalLoot - totalWinnings)) / 100;
    this.output += `House: ${this.houseAccount}<br />`;
  }

}
