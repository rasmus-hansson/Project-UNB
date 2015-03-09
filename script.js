document.addEventListener('click', clickTrack, false); // Capture all click events


var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

var x = 1;
var rounds = 50;
var matches = 10;
var back = 3;
var roundPos = [];
var colors = 4;

// This routine attempts to build a round with params from above. It starts by creating positions in the total number of rounds where matches shall occur.
// When the routine is complete we should be allowed to fill the rest of the rounds with whatever other color we want.
// The routine will most likely contain bugs and doesn't take position into account.
for (i=0 ; i<matches ; i++) {

  var temproundPos = Math.floor(Math.random() * (rounds - back)) + back; // Random position between back and total rounds
  if ( roundPos[temproundPos] == undefined && roundPos[temproundPos-back] == undefined ) {
    roundPos[temproundPos] = Math.floor(Math.random() * colors + 1);
    console.log (roundPos[temproundPos]);
  } else if ( roundPos[temproundPos] == undefined && roundPos[temproundPos-back] != undefined ) {
    roundPos[temproundPos] = roundPos[temproundPos-back];
    console.log (roundPos[temproundPos]);
  } else {
    i--; // Don't count this iteration if we cannot find a match position
  }

}

console.log (roundPos);
////////////////////////

// Track only when clicking on certain objects (id in this example)
function clickTrack (ev) {
  switch (ev.target.id) {
    case "trackposition":
      console.log('click pos');
    break;
    case "trackcolor":
      console.log('click col');
    break;
  }
}

function setColor() {   //function to set color and position, called by var start

var index;
var gamesquare = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
for (index = 0; index < gamesquare.length; index++) {
    gamesquare[index].style.backgroundColor = "white"; };  // resets square before start of loop

var rand1 = Math.floor(Math.random() * 9);   // returns a random number between 0 and 8 for color
var rand2 = Math.floor(Math.random() * 9);   // returns a random number between 0 and 8 for position

switch (rand1) {   // I tried a switch-statement for setting color & position instead of if-statements, but couldn't get it to work

    case 0:
      randcol = "red";
    break;

    case 1:
      randcol = "green"
    break;

    case 2:
      randcol = "green"
    break;

    case 3:
      randcol = "blue"
    break;

    case 4:
      randcol = "green"
    break;

    case 5:
      randcol = "blue";
    break;

    case 6:
      randcol = "yellow"
    break;

    case 7:
      randcol = "yellow"
    break;
    
    case 8:
      randcol = "red"
    break;

    case 9:
      randcol = "yellow"
    break;

    default:
  }

console.log('Position ' + gamesquare[rand2].id + ' Color ' + randcol);

  gamesquare[rand2].style.backgroundColor = randcol;  // sets color and position for square
  x++;                                      // increments x on each loop iteration

  if(x > rounds){
    clearInterval(start); // stops engine after x is above rounds
  }; 

  

  

};


