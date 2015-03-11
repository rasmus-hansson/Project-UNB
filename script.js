document.addEventListener('click', clickTrack, false); // Capture all click events with event listener


var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

var levelArr = []; // Multidimensional array that will be used as the game level with parameters from config
var answerArr = []; // Keeping track of all the answers here
var x = 0; // Keep track of which round we're at
var rounds = 10; // Number of rounds in the game
var back = 1; // Difficulty modulator
var colors = ['Purple','Green','Orange','Yellow'];
var board = 9; // Number of pieces on the board (strangely from 0)

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
    var rndPos = Math.floor(Math.random() * board );

    // Insert both color and position at match location and match-back location
    levelArr[rndMatch] = [rndCol, rndPos];
    levelArr[rndMatch-back] = [rndCol, rndPos];

  } else { 
    i--;
  }

  // Increment iteration counter to keep track of efficiency
  iterationCounter ++;

  // Print out the current level array for debugging purpose
  //console.log (levelArr.join(', '));

}

console.log ('Total iterations after loop 1 ' + iterationCounter);
//console.log ('Iterations wasted ' + (iterationCounter-totalAllMatches));


// Next iterate over the amount of allPositions
for (i=0 ; i<totalPosMatches/2 ; i++) {

  // Try to find random position for a match
  var rndMatch = Math.floor(Math.random() * (rounds - back)) + back;

  if (levelArr[rndMatch] == null && levelArr[rndMatch-back] == null ) {

    // Generate random matching values
    var rndCol = Math.floor(Math.random() * colors.length);
    var rndPos = Math.floor(Math.random() * board);
    var secCol = 0;

    do {
      secCol = Math.floor(Math.random() * colors.length);
    } while (secCol != rndCol);    

    // Insert both color and position at match location and match-back location
    levelArr[rndMatch] = [rndCol, rndPos];
    levelArr[rndMatch-back] = [secCol, rndPos];

  } else { 
    i--; 
  }

  // Print out the current level array for debugging purpose
  //console.log (levelArr.join(', '));

  // Increment iteration counter to keep track of efficiency
  iterationCounter ++;

}

console.log ('Total iterations after loop 2 ' + iterationCounter);
//console.log ('Iterations wasted ' + (iterationCounter-totalAllMatches));


// Next iterate over the amount of allColors
for (i=0 ; i<totalColMatches/2 ; i++) {

  // Try to find random position for a match
  var rndMatch = Math.floor(Math.random() * (rounds - back)) + back;

  if (levelArr[rndMatch] == null && levelArr[rndMatch-back] == null ) {

    // Generate random matching values
    var rndCol = Math.floor(Math.random() * colors.length);    
    var rndPos = Math.floor(Math.random() * board );
    var secPos = 0;

    do {
      secCol = Math.floor(Math.random() * colors.length);
    } while (secCol != rndCol);

    // Insert both color and position at match location and match-back location
    levelArr[rndMatch] = [rndCol, rndPos];
    levelArr[rndMatch-back] = [rndCol, secPos];

  } else { 
    i--; 
  }

  // Print out the current level array for debugging purpose
  //console.log (levelArr.join(', '));

  // Increment iteration counter to keep track of efficiency
  iterationCounter ++;

  if (iterationCounter > 1000) {
    console.log ('Assuming no more matches, aborting...');
    break;
  }
}

console.log ('Total iterations after loop 3 ' + iterationCounter);
//console.log ('Iterations wasted ' + (iterationCounter-totalAllMatches));


// Now we want to create non-matching values for the rest of the level array
// We do this by looping the level array
for (i=0 ; i<levelArr.length ; i++) {
  if (levelArr[i] == null) {
    if (i <= back) { // If the empty slot is in the beginning we need to make sure there isn't a match forward (todo currently unsafe hack)
      var tmpValues = levelArr[i+back];

      do {
        var tmpCol = Math.floor(Math.random() * colors.length);
      } while (tmpCol == tmpValues[0]);

      do {
        var tmpPos = Math.floor(Math.random() * board); 
      } while (tmpPos == tmpValues[1]);

      levelArr[i] = [tmpCol,tmpPos];
    
    } else if (i >= (levelArr.length - back)) {

      var tmpValues = levelArr[i-back];

      do {
        var tmpCol = Math.floor(Math.random() * colors.length);
      } while (tmpCol == tmpValues[0]);

      do {
        var tmpPos = Math.floor(Math.random() * board); 
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
        var tmpPos = Math.floor(Math.random() * board);
      } while (tmpPos == tmpValuesB[1] || tmpPos == tmpValuesF[1]);

      levelArr[i] = [tmpCol,tmpPos]; 
    }
  }    
}

console.log (levelArr.join(', '));
  

/////////////////
// Click Tracking
// Track only when clicking on certain objects (id in this example)
//
//
function clickTrack (ev) {
  switch (ev.target.id) {
    case "trackposition":
      if (levelArr[x][1] == levelArr[x-back][1]) {
        alert('Matched Position!');
      }
      console.log('click pos at ' + x);
      answerArr[i] = ['pos',x];
      i++;

    break;
    case "trackcolor":
      if (levelArr[x][0] == levelArr[x-back][0]) {
        alert('Matched Color!');
      }
      console.log('click col at ' + x);
      answerArr[i] = ['col',x];
      i++;

    break;
    case "trackall":
      if (levelArr[x][1] == levelArr[x-back][1] && levelArr[x][0] == levelArr[x-back][0]) {
        alert('Matched all!');
      }
      console.log('click all at ' + x);
      answerArr[i] = ['all',x];
      i++;

    break;
  }
}





function setColor() {   //function to set color and position, called by var start

  var index;
  var gamesquare = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
  for (index = 0; index < gamesquare.length; index++) {
    gamesquare[index].style.backgroundColor = "white"; };  // resets square before start of loop  

  console.log ('Round count ' + (x+1));
  console.log ('Position ' + (levelArr[x][1]+1) + ' Color ' + colors[levelArr[x][0]]);
  gamesquare[levelArr[x][1]].style.backgroundColor = colors[levelArr[x][0]];  // sets color and position for square
  x++;                                      // increments x on each loop iteration


  if(x >= rounds){
    console.log('Level complete, stopping engine');
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




