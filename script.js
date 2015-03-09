document.addEventListener('click', clickTrack, false); // Capture all click events with event listener


//var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

var x = 1; // Keep track of which round we're at
var rounds = 50;
var matches = 20;
var back = 3;
var roundPos = [];
var colors = 4;

// This routine attempts to build a level with params from above.
// Todo: Check that number of matches is actually what we say
// Todo: It would be nice to see or track how many iterations were necessary to generate the level
// Todo: Test edge cases and attempt to break (for example, what to do when adding more or equal matches to rounds)
//
var i = 0;

// First create an array of 0
for (i=0 ; i<rounds ; i++) {
  roundPos[i] = 0;
}

// Next, create all the matches
for (i=0 ; i<matches ; i++) {

  var temproundPos = Math.floor(Math.random() * (rounds - back)) + back; // Random position between back and total rounds
  if ( roundPos[temproundPos] == 0 && roundPos[temproundPos-back] == 0 ) {

    // Here we can choose what we want to match; color, position or both
    tempValue = Math.floor(Math.random() * colors + 1);
    roundPos[temproundPos] = tempValue;
    roundPos[temproundPos-back] = tempValue;    
  } else {

    i--; // Don't count this iteration if we didn't find a possible match position (this is wasteful stuff tho)
  }

  // Create some output in the console for debugging purposes and fun
  console.log (roundPos.join(', '));
  console.log (roundPos.length);

}

// Last, iterate the level and create all the non-matches as "levelfillers"
for (i=0 ; i<rounds ; i++) {
  if ( roundPos[i] == 0) { // only work with the empty 0 positions
    tempValue = Math.floor(Math.random() * colors + 1);
    if ( tempValue != roundPos[i-back] && tempValue != roundPos[i+back] ) {
      roundPos[i] = tempValue;
    } else {
      i--;
    }
  }
}

// Create some output in the console for debugging purposes and fun
  console.log (roundPos.join(', '));
  console.log (roundPos.length);

//////////////////////// Level Routine End /////////////////////////

// Click Tracking
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


