document.addEventListener('click', clickTrack, false); // Capture all click events with event listener


//var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

var x = 0; // Keep track of which round we're at
var rounds = 50;
var matches = 20;
var back = 3;
var levelArr = [];
var colors = ['red','green','orange','yellow'];
var board = 9;

// The idea of this section is to improve the level generator to include
// color matching, position matching and a match of all Stimuli 
// (in this case a combination of color and position)
// If we decide to use it, we will need to replace the
// above matches var and modify the routine below accordingly
//
//
var colMatches = 0.3;
var posMatches = 0.4;
var allMatches = 0.2;

var totalPosMatches = Math.round(rounds * posMatches);
var totalColMatches = Math.round(rounds * colMatches);
var totalAllMatches = Math.round(rounds * allMatches);
var totalMatches = Math.round(rounds * (colMatches + posMatches + allMatches));
  
  console.log ('Color matches ' + totalColMatches);
  console.log ('Position matches ' + totalPosMatches);
  console.log ('All matches ' + totalAllMatches);
  console.log ('Total matches ' + totalMatches);
//
//
////////////////////////////////////////////////////////////////////////////////


// This routine attempts to build a level with params from above.
// Todo: Check that number of matches is actually what we say
// Todo: It would be nice to see or track how many iterations were necessary to generate the level
// Todo: Test edge cases and attempt to break (for example, what to do when adding more or equal matches to rounds)
// 
//
var i = 0;

// First create an array full of nulls
for (i=0 ; i<rounds ; i++) {
  levelArr[i] = null;
}

// Next, create all the matches
for (i=0 ; i<matches ; i++) {

  var templevelArr = Math.floor(Math.random() * (rounds - back)) + back; // Random position between back and total rounds
  if ( levelArr[templevelArr] == null && levelArr[templevelArr-back] == null ) {
    tempValue = Math.floor(Math.random() * colors.length );
    
    // Create the match
    levelArr[templevelArr] = tempValue;
    levelArr[templevelArr-back] = tempValue; 

  } else {

    i--; // Don't count this iteration if we didn't find a possible match position (this is wasteful stuff tho)

  }

  // Create some output in the console for debugging purposes and fun
  console.log (levelArr.join(', '));  

}

// Last, iterate the level and create all the non-matches as "levelfillers"
for (i=0 ; i<rounds ; i++) {
  if ( levelArr[i] == null) { // only work with the empty 0 positions
    tempValue = Math.floor(Math.random() * colors.length );
    if ( tempValue != levelArr[i-back] && tempValue != levelArr[i+back] ) {
      
      // Create the filler
      levelArr[i] = tempValue;

    } else {

      i--; // Don't count this iteration if we didn't find a possible match position (this is wasteful stuff tho)

    }
  }
}

// Create some output in the console for debugging purposes and fun
  console.log (levelArr.join(', '));
  console.log (levelArr.length);

//////////////////////// Level Routine End /////////////////////////


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

  var rand2 = Math.floor(Math.random() * 9);   // returns a random number between 0 and 8 for position

  console.log('Position ' + gamesquare[rand2].id + ' Color ' + colors[levelArr[x]]);

  gamesquare[rand2].style.backgroundColor = colors[levelArr[x]];  // sets color and position for square
  x++;                                      // increments x on each loop iteration

  if(x > rounds){
    clearInterval(start); // stops engine after x is above rounds
  }; 

  // Callback routine for RequestAnimationFrame
  function gameLoop() {
    // My idea here is to check the time value and when 2 seconds 
    // has passed we update the time variable and also update the
    // game board at the same time.
    //
    //
  };

};


