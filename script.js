document.addEventListener('click', clickTrack, false); // Capture all click events


var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

var x = 1;
var rounds = 50;

// Track only when clicking on certain objects (id in this example)
function clickTrack (ev) {
  alert(ev.target.id);
}

function setColor() {   //function to set color and position, called by var start

var index;
var gamesquare = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
  for (index = 0; index < gamesquare.length; index++) {
    gamesquare[index].style.backgroundColor = "white"; };  // resets square before start of loop

var rand1 = Math.floor(Math.random() * 11);   // returns a random number between 0 and 3 for rand 1 and 0-8 for rand2 
var rand2 = Math.floor(Math.random() * 11);   // and saves them as var rand1(color) and rand2(position)

if((rand1 == Math.floor(0)) || (rand1 == Math.floor(1))) { //if statements for assigning color & position depending on what values returned by rand1 and rand2
  randcol = "green";
}

  else if ((rand1 == Math.floor(2)) || (rand1 == Math.floor(3))) {
    randcol = "yellow";
  }


    else if ((rand1 == Math.floor(4)) || (rand1 == Math.floor(5))) {
      randcol = "blue";
    }


      else if ((rand1 == Math.floor(6)) || (rand1 == Math.floor(7))) {
        randcol = "red";
      }



        else if ((rand1 == Math.floor(8)) || (rand1 == Math.floor(9))) {
          randcol = "gray";
        };


if(rand2 == Math.floor(0)) {
  randpos = gs1;
}

  else if (rand2 == Math.floor(1)) {
    randpos = gs2;
  }


    else if(rand2 == Math.floor(2)) {
      randpos= gs3;
    }


      else if (rand2 == Math.floor(3)) {
        randpos = gs4;
      }



        else if (rand2 == Math.floor(4)) {
          randpos = gs5;
        }


             else if (rand2 == Math.floor(5)) {
              randpos = gs6;
             }


               else if(rand2 == Math.floor(6)) {
                 randpos= gs7;
               }


                 else if (rand2 == Math.floor(7)) {
                   randpos = gs8;
                 }



                   else if (rand2 == Math.floor(8)) {
                     randpos = gs9;
                   }

                   else {
                      randpos = gs1;
                   };




  randpos.style.backgroundColor = randcol;  // sets color and position for square
  x++;                                      // increments x on each loop iteration

  if(x > rounds){
    clearInterval(start); // stops engine after x is above rounds
  }; 
};


/* switch (rand1) {   // I tried a switch-statement for setting color & position instead of if-statements, but couldn't get it to work

    case 0:

    "red";

    break;

    case 1:

    "green"

    break;

    case 2:

    "green"

    break;

    case 3:

    "blue"

    break;

    case 4:

    "green"

    break;

    case 5:

    "blue";

    break;

    case 6:

    "yellow"

    break;

    case 7:

    "yellow"

    break;
    
    case 8:

    "red"

    break;

    case 9:

    randcol = "yellow"

    break;

    default:

  } */

 


