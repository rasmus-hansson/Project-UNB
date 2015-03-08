document.addEventListener('click', clickTrack, false); // Capture all click events


var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

var x = 1;
var rounds = 50;

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

switch (rand2) { 

    case 0:
      randpos = gs1;
    break;

    case 1:
      randpos = gs2;
    break;

    case 2:
      randpos = gs3;
    break;

    case 3:
      randpos = gs4;
    break;

    case 4:
      randpos = gs5;
    break;

    case 5:
      randpos = gs6;
    break;

    case 6:
      randpos = gs7;
    break;

    case 7:
      randpos = gs8;
    break;
    
    case 8:
      randpos = gs9;
    break;    

    default:

  }

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

  console.log('Position ' + randpos.id + ' Color ' + randcol);

  randpos.style.backgroundColor = randcol;  // sets color and position for square
  x++;                                      // increments x on each loop iteration

  if(x > rounds){
    clearInterval(start); // stops engine after x is above rounds
  }; 

};


