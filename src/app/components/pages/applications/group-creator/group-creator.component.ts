import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-group-creator",
  templateUrl: "./group-creator.component.html"
})
export class GroupCreatorComponent implements OnInit {

  list: string = "";
  minPeople: number = 1;
  maxPeople: number = 3;
  output: string;

  constructor() { }

  ngOnInit() {
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  myParseInt(num) {
      for (let i = 0; i < 500; i++) {
          if (num === i + "") {
              return i;
          }
      }
      return -1;
  }

  generateList() {
    this.group();
  }

  // Written by Hanavan Kuhn
  // Copyright 2016
  group() {
    // Initialize variables
    const names = this.list; // String of names from the names textbox
    const minsize = this.minPeople; // Minimum size of the group from the minsize textbox
    const maxsize = this.maxPeople; // Maximum size of the group from the maxsize textbox
    let result = ""; // Empty result string which is populated by the code and sent to the div tag

    let splitnames = names.split(","); // Split names by comma
    splitnames = this.shuffleArray(splitnames); // the one line added by Nathan Gawith
    const nameamount = splitnames.length; // Gets the length of the splitnames array
    let j = nameamount; // Temporary variable that stores the amount of names
    let groupnumber = 1; // Stores the current group number

    result += "<strong>Total names:</strong> " + nameamount + "<br /><br />"; // Writes some information to the result string

    while (j > 0) { // Continues looping until there are no names left
      let groupsize = Math.round(Math.random() * (maxsize - minsize)) + minsize; // Picks a group size based on the preset values
      console.log("Group size = " + groupsize + ", j = " + j); // Logs some stuff
      if (j - groupsize < 0) { // Checks if the random group size is larger than the amount of names left
        groupsize = j; // Sets the size of the group to the amount of remaining names
      }
      j -= groupsize; // Subtracts the size of the group from the list of names
      result += "<strong>Group " + groupnumber + ":</strong> "; // Writes the name of the group to the result string
      for (let i = 0; i < groupsize; i++) { // Iterates through the group members and writes them to the result string
        result += splitnames[j + i]; // Adds the name to the result string
        if (i < groupsize - 1) { // Checks if there needs to be a comma (for every name except for the last one)
          result += ", "; // Adds a comma
        }
      }
      result += "<br />"; // Writes a new line to the result string
      groupnumber++; // Increases the group number by 1
    }

    this.output = result; // Writes the result to the page
  }
}
