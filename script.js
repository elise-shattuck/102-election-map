//Politican factory function
var makePolitician = function(name, color)
{
  var politician = {};
  politician.name = name;
  politician.partyColor = color;
  politician.electionResults = null;
  politician.totalVotes = 0;

  politician.countVotes = function ()
    {
        this.totalVotes = 0;
  
        for (var i = 0; i < this.electionResults.length; i++)
        {    
            this.totalVotes = this.totalVotes + this.electionResults[i];
        }
};
  
  //console.log(politician.name, politician.partyColor);
  
  return politician;
};


//Create and name politicians
var warren = makePolitician("Elizabeth Warren", [132, 17, 11]);
var aoc = makePolitician("Alexandria Ocasio Cortez", [245, 141, 136]);


//Enter election results and adjustments
warren.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

aoc.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

warren.electionResults[9] = 1;
aoc.electionResults[9] = 28;

warren.electionResults[4] = 17;
aoc.electionResults[4] = 38;

warren.electionResults[43] = 11;
aoc.electionResults[43] = 27;

//console.log(warren.electionResults);
//console.log(aoc.electionResults);


//Sum total votes for each candidate
warren.countVotes();
console.log(warren.name + " has " + warren.totalVotes + " votes.");

aoc.countVotes();
console.log(aoc.name + " has " + aoc.totalVotes + " votes.");


//Determine winner
var winner = "???";

if (warren.totalVotes > aoc.totalVotes) {
    winner = warren.name;
} else if (warren.totalVotes < aoc.totalVotes) {
    winner = aoc.name;
} else {
    winner = "DRAW";
}

console.log(winner + " wins the popular vote!!!")


//Determine and assign state results
var setStateResults = function(state)
{
  //Determine winner
  theStates[state].winner = null;
  
  if (warren.electionResults[state] > aoc.electionResults[state]){
    theStates[state].winner = warren;
  } else if (warren.electionResults[state] < aoc.electionResults[state]) {
    theStates[state].winner = aoc;
  }
  
  var stateWinner = theStates[state].winner;
  
  //Change state color based on winner
  if (stateWinner !== null) {
    theStates[state].rgbColor = stateWinner.partyColor;
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  }
  
  //Define varibables for state table
  var stateInfoTable = document.getElementById('stateResults');
  var header = stateInfoTable.children[0];
  var body = stateInfoTable.children[1];
  var stateName = header.children[0].children[0];
  var stateAbbrev = header.children[0].children[1];
  var candidate1Name = body.children[0].children[0];
  var candidate2Name = body.children[1].children[0];
  var candidate1Votes = body.children[0].children[1];
  var candidate2Votes = body.children[1].children[1];
  var winnerName = body.children[2].children[1];
  
  //Assign variables to state table
  stateName.innerText = theStates[state].nameFull;
  stateAbbrev.innerText = "(" + theStates[state].nameAbbrev + ")";
  
  candidate1Name.innerText = warren.name;
  candidate2Name.innerText = aoc.name;
  
  candidate1Votes.innerText = warren.electionResults[state];
  candidate2Votes.innerText = aoc.electionResults[state];
  
  if (theStates[state].winner === null) {
    winnerName.innerText = "DRAW";
  } else {
    winnerName.innerText = theStates[state].winner.name;
  }
  
};


//Populate top table
var countryResultsTable = document.getElementById("countryResults");
var country = countryResultsTable.children[0].children[0];

country.children[0].innerText = warren.name;
country.children[1].innerText = warren.totalVotes;
country.children[2].innerText = aoc.name;
country.children[3].innerText = aoc.totalVotes;
country.children[5].innerText = winner;
