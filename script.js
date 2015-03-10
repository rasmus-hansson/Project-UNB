document.addEventListener('click', clickTrack, false); // Capture all click events with event listener


var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

var levelArr = []; // Multidimensional array that will be used as the game level with parameters from config
var x = 0; // Keep track of which round we're at
var rounds = 50; // Number of rounds in the game
var back = 3; // Difficulty modulator
var colors = ['red','green','orange','yellow'];
var board = 8; // Number of pieces on the board (strangely from 0)

// The idea of this section is to improve the level generator to include
// color matching, position matching and thirdly a match of all Stimuli 
// (in this case a combination of color and position)
// The level generator will try to create a random level based on the params below
//
var colMatches = 0.3; // Percentage of rounds that will be color matched
var posMatches = 0.4; // Percentage of rounds that will be position matched
var allMatches = 0.2; // Percentage of rounds that will be all matching (both color and position)

var totalMatches = Math.round(rounds * (colMatches + posMatches + allMatches));

var totalPosMatches = Math.round(rounds * posMatches);
var totalColMatches = Math.round(rounds * colMatches);
var totalAllMatches = Math.round(rounds * allMatches);

  
  // These will probably be hidden due to all the iteration counting going on below... Anyway, we will fix
  console.log ('Color matches ' + totalColMatches);
  console.log ('Position matches ' + totalPosMatches);
  console.log ('All matches ' + totalAllMatches);
  console.log ('Total matches ' + totalMatches);

// First create an array full of nulls to initialize the level.
// This is needed because we need to check every position against certain conditions.
for (i=0 ; i<rounds ; i++) {
  levelArr[i] = null;
}

// For debugging and optimization purupose we use a total iteration counter
var iterationCounter = 0;

// Next try to find an empty spot for all AllMatches
for (i=0 ; i<totalAllMatches/2 ; i++) {
  
  // Random position for a match
  var rndMatch = Math.floor(Math.random() * (rounds - back)) + back;  

  // If this random position is valid, insert the match
  if ( levelArr[rndMatch] == null && levelArr[rndMatch-back] == null ) {

    // Generate random matching values
    var rndCol = Math.floor(Math.random() * colors.length);
    var rndPos = Math.floor(Math.random() * board + 1);

    // Insert both color and position at match location and match-back location
    levelArr[rndMatch] = [rndCol, rndPos];
    levelArr[rndMatch-back] = [rndCol, rndPos];

  } else { 
    i--;
  }

  // Increment iteration counter to keep track of efficiency
  iterationCounter ++;

  // Print out the current level array for debugging purpose
  console.log (levelArr.join(', '));

}

console.log ('Total iterations ' + iterationCounter);
//console.log ('Iterations wasted ' + (iterationCounter-totalAllMatches));



// Next iterate over the amount of allPositions
for (i=0 ; i<totalPosMatches/2 ; i++) {

  // Try to find random position for a match
  var rndMatch = Math.floor(Math.random() * (rounds - back)) + back;

  if (levelArr[rndMatch] == null && levelArr[rndMatch-back] == null ) {

    // Generate random matching values
    var rndCol = Math.floor(Math.random() * colors.length); 
    var rndPos = Math.floor(Math.random() * board + 1);
    var secCol = 0;

    // This is currently a hack. If the algorithm works overall, we need to 
    // get a proper random number that doesn't match the first random number
    if (rndCol > 5) secCol = rndCol - 2;
    else secCol = rndCol + 2;

    // Insert both color and position at match location and match-back location
    levelArr[rndMatch] = [rndCol, rndPos];
    levelArr[rndMatch-back] = [secCol, rndPos];

  } else { 
    i--; 
  }

  // Print out the current level array for debugging purpose
  console.log (levelArr.join(', '));

  // Increment iteration counter to keep track of efficiency
  iterationCounter ++;

}

console.log ('Total iterations ' + iterationCounter);
//console.log ('Iterations wasted ' + (iterationCounter-totalAllMatches));


// Next iterate over the amount of allColors
for (i=0 ; i<totalColMatches/2 ; i++) {

  // Try to find random position for a match
  var rndMatch = Math.floor(Math.random() * (rounds - back)) + back;

  if (levelArr[rndMatch] == null && levelArr[rndMatch-back] == null ) {

    // Generate random matching values
    var rndCol = Math.floor(Math.random() * colors.length);    
    var rndPos = Math.floor(Math.random() * board + 1);
    var secPos = 0;

    // This is currently a hack. We need to 
    // get a proper random number that doesn't match the first random number
    if (rndPos > 2) secPos = rndPos - 1;
    else secCol = rndPos + 1;

    // Insert both color and position at match location and match-back location
    levelArr[rndMatch] = [rndCol, rndPos];
    levelArr[rndMatch-back] = [rndCol, secPos];

  } else { 
    i--; 
  }

  // Print out the current level array for debugging purpose
  console.log (levelArr.join(', '));

  // Increment iteration counter to keep track of efficiency
  iterationCounter ++;

  if (iterationCounter > 1000) {
    console.log ('Assuming no more matches, aborting...');
    break;
  }
}

console.log ('Total iterations ' + iterationCounter);
//console.log ('Iterations wasted ' + (iterationCounter-totalAllMatches));


// Now we want to create non-matching values for the rest of the level array
// We do this by looping the level array
for (i=0 ; i<levelArr.length ; i++) {
    if (levelArr[i] == null) {
      if (i < back) { // If the empty slot is in the beginning we need to make sure there isn't a match forward (todo currently unsafe hack)
        var tmpValues = levelArr[i+back];

        do {
          var tmpCol = Math.floor(Math.random() * colors.length);
        } while (tmpCol == tmpValues[0]);

        do {
          var tmpPos = Math.floor(Math.random() * board + 1); 
        } while (tmpPos == tmpValues[1]);

        levelArr[i] = [tmpCol,tmpPos];
      
      } else if (i > (levelArr.length - back)) {

        var tmpValues = levelArr[i-back];

        do {
          var tmpCol = Math.floor(Math.random() * colors.length);
        } while (tmpCol == tmpValues[0]);

        do {
          var tmpPos = Math.floor(Math.random() * board + 1); 
        } while (tmpPos == tmpValues[1]);

        levelArr[i] = [tmpCol,tmpPos];

      } else { // If the empty slot is later we need to make sure there isn't a match forward and backward
        var tmpValuesB = levelArr[i-back];
        var tmpValuesF = levelArr[i+back];

        do {
          var tmpCol = Math.floor(Math.random() * colors.length);
        } while (tmpCol == tmpValuesB[0] || tmpCol == tmpValuesF[0]);

        do { // These guys are apparently dangeours and can freeze the script because of endless loop.
             // It basically means that with the config params we supply there is no non-matching option.
             // How we solve is a great mystery waiting to unfold
          var tmpPos = Math.floor(Math.random() * colors.length);
        } while (tmpPos == tmpValuesB[1] || tmpCol == tmpValuesF[1]);

        levelArr[i] = [tmpCol,tmpPos]; 
      }
    }

    console.log (levelArr.join(', '));
}
  

/////////////////
// Click Tracking
// Track only when clicking on certain objects (id in this example)
//
//
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

  gamesquare[levelArr[x][1]].style.backgroundColor = colors[levelArr[x][0]];  // sets color and position for square
  x++;                                      // increments x on each loop iteration

  if(x > rounds){
    clearInterval(start); // stops engine after x is above rounds
  };  

};



// Callback routine for RequestAnimationFrame
function gameLoop() {
  // My idea here is to check the time value and when 2 seconds 
  // has passed we update the time variable and also update the
  // game board at the same time.
  //
  //
};


