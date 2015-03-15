// Forced matching if no matches at round 8 
// Möjlighet att växla stimuli, ändra antal positioner
// Settings controls
// Förfina databasen så den innehåller ALLT vi behöver, och displayar som vi vill
// Pause-knapp


// Monte carlo simulation
// graphics

var start;

var stimColor = ['Purple','Green','Orange','Yellow', 'Red', 'Pink','Aqua'];
//var stimPosition = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
var stimPosition = [];
var levelArray = [];    //Empty array to store the stimuli of each round
var matchPercent = document.getElementById("settingMatchPercent").value; //Desired percent matches
var answerArr = []; //contains players answers
var matchArr = []; //contains number of matches
var wrongArr = []; //contains number of wrong clicks
var playedGames = [];
var gameSquares = document.getElementById("settingSquares").value;

var stimPositionSetting = [];

var back = document.getElementById("settingNBack").value; //Number of N-back
var rounds = document.getElementById("settingRounds").value; //Number of rounds per game

var i; //Iterator for gameloop
var r; //Iterator for randomization
var synthMatch = null; // counts number of synthetic matches
var rndColor;
var rndPosition;
var progressCounter;

//localStorage.removeItem('playedgames');

var x;  //What round we are on
var rnd; //randomization number

function setupGame() {

  matchPercent = document.getElementById("settingMatchPercent").value;
  rounds = document.getElementById("settingRounds").value;
  gameSquares = document.getElementById("settingSquares").value;
  back = document.getElementById("settingNBack").value; 

  x=0;
  i=0;  
  r=0;
  matchArr.length = 0;
  levelArray.length = 0;
  answerArr.length = 0;
  matchArr.length = 0;
  wrongArr.length = 0;
  synthMatch = null;
  rndColor = 0;
  rndPosition = 0;
  stimPosition.length = 0;
  score.setAttribute("value", 0); 

  console.log('at beginning of function setupgame, matchArr is '+matchArr);
  console.log('at beginning of function setupgame, levelArray is '+levelArray);
  rnd=0;

  // This routine is supposed to generate game squares based on stimposition length
  //
  var squareshtml = "";
  for (i=0 ; i < gameSquares ; i++) {
    squareshtml += "<div class='gamesquare' id=\"" + 'gs'+i + "\"></div>"; 
    stimPosition.push('gs'+i);
    stimPositionSetting.push('gs'+stimPosition[i]);
    if(i === 2 || i === 5 || i === 8) {
      squareshtml += "<br>";
    }
  }
  console.log(squareshtml);

    console.log('this many stimpositions'+stimPosition);
  gamesquares.innerHTML = squareshtml;
  //


  for ( r=0 ; r<rounds ; r++ ) {       //Loop that enables percent matches per game to equal matchPercent, and 
                      //generates random stimuli in the other cases, then pushes those positions to levelArray
    rnd = Math.random();
    console.log('r is' + r + 'and rnd is ' + rnd);                    //generates random stimuli in the other cases, then pushes those positions to levelArray
    if ((rnd < matchPercent) && (r >= (back))) {    // ATT GÖRA: LÄGG TILL ELSE IFS FÖR ATT GENERERA FORCED MATCHING AV BARA COLOR ELLER POSITION
    
      levelArray[r] = levelArray[r-back];
      matchArr.push(1);
      console.log(levelArray[r-back]);
      synthMatch++;

    } else {        // ATT GÖRA: LÄGG IN TRACKING AV NATURLIGA MATCHES SOM PUSHAS TILL matchArr!!!!
      rndColor = Math.floor(Math.random() * ( stimColor.length));
      rndPosition = Math.floor(Math.random() * ( stimPosition.length));

      levelArray.push([rndPosition, rndColor]);
      //console.log(levelArray[i-back]);
        

        if((r >= (back)) && (rndColor === levelArray[r-back][1]) ){

          matchArr.push(2);

          console.log('A natural match!');
        }
        else if((r >= (back)) && (rndPosition === levelArray[r-back][0])){

          matchArr.push(3);

          console.log('A natural match!');
        }

          else if((r >= (back)) && (levelArray[r] ===  levelArray[r-back])){

            matchArr.push(4);

          console.log('A natural match!');
          };

    };


  };


    console.log('matchArr contains ' + matchArr);
    console.log('levelArray contains ' +levelArray);



  console.log (matchArr); //logs contents of matcharray
  console.log (matchArr.length + ' matches in this round. Whereof '+synthMatch+' are synthetic, and '+(matchArr.length-synthMatch)+' are natural!'); //logs number of synthetic matches

  // Handle the display of latest score
  //
  //
  var playedGames = JSON.parse(localStorage.getItem('playedgames')); // Try to get local storage item

  if (playedGames) {     // This conditional will display all your saved results in the gamescreen

    console.log (playedGames);

    game = "<table>";

    for (y=0 ; y < playedGames.length; y++) {
      game += "<tr>";
      game += "<td>" + y + "</td>";
      game += "<td>" + playedGames[y].time + "</td>";
      game += "<td>" + playedGames[y].scorepercent + "</td>";
      game += "<td>" + playedGames[y].config.nback + "</td>";
      game += "<td>" + playedGames[y].config.matchpercent + "</td>";
      game += "</tr>";
    }
    game += "</table>";
    console.log(game);
    result.innerHTML = game;
  } else {
    playedGames = [];
  }
}

//setupGame();
//start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds
document.addEventListener('click', clickTrack, false); // Capture all click events with event listener


/////////////////////////////////////////////////////////////////////////////////////
//
//                     Here begins the function that sets color and position based on
//                     what's in levelArray
//
//


function setColor() {   //function to set color and position based on what's in levelArray, called by var start

   if (x <= rounds){ 

    console.log('x is now at' + x);
    
    for (z = 0; z < stimPosition.length; z++) {
      
      document.getElementById(stimPosition[z]).style.backgroundColor = "white"; 
      document.getElementById(stimPosition[z]).style.transitionDuration = "2s";  // resets square before start of loop 
    }

    //console.log ('Round count ' + (x+1));
    //console.log ('Position ' + (levelArr[x][1]+1) + ' Color ' + colors[levelArr[x][0]]);
   if(x < rounds){  
    progressCounter = (x+1) + '/' + rounds;
    roundscount.innerHTML = progressCounter;
    currentBack.innerHTML = back+'-back';
    //console.log(levelArray);
    document.getElementById(stimPosition[levelArray[x][0]]).style.backgroundColor = stimColor[levelArray[x][1]];  // sets color and position for square
      document.getElementById(stimPosition[levelArray[x][0]]).style.transitionDuration = "1ms"; 
            };
                             
    }else{
      console.log('Level complete, stopping engine');
      console.log(answerArr);
      console.log("interval "+ start);
      clearInterval(start); // stops engine after x is above rounds
      console.log('Your scored '+answerArr.length+' right, out of '+matchArr.length+' possible!\n You had '+wrongArr.length+' incorrect answers.');  //logs number of correct answers
        document.getElementById("showResult").innerHTML = 'Your scored '+answerArr.length+' right, out of '+matchArr.length+' possible! <br> You had '+wrongArr.length+' incorrect answers.';
      
       console.log('Your matchArr now contains '+matchArr); 
        var game = {
          time: Date(),
          scorepercent: answerArr.length,
          config: {
            nback: back,
            matchpercent: matchPercent
          }
        };     

        // Save this game in array of games for local storage
        playedGames.push(game);

        //console.log(playedGames);
        localStorage.setItem('playedgames', JSON.stringify(playedGames));  //stores number of correct answers in local file
    }
  x++;  // increments x on each run of the function setColor, called by setInterval in var start          
};





/////////////////
// Click Tracking
// Track only when clicking on certain objects (id in this example)
//

function clickTrack (ev) {
  switch (ev.target.id) {
    case "trackposition":
      if (levelArray[x-1][0] == levelArray[x-back-1][0]) {  //checks if your click was correct
        console.log('Matched Position!');
        answerArr.push(1); // pushes correct answers to answerArr
        score.setAttribute("value", (answerArr.length/matchArr.length)*100);
      }
      else {
        wrongArr.push(1);
      }
      console.log('click pos at ' + x);
      
      i++;

    break;
    case "trackcolor":
      if (levelArray[x-1][1] == levelArray[x-back-1][1]) {
        console.log('Matched Color!');
        answerArr.push(1);
        score.setAttribute("value", (answerArr.length/matchArr.length)*100); 
      }
      else {
        wrongArr.push(1);
      }
      console.log('click col at ' + x);
      console.log('round-back is' + (x-back));
      
      i++;

    break;
    case "trackall":
      if (levelArray[x-1][1] == levelArray[x-back-1][1] && levelArray[x-1][0] == levelArray[x-back-1][0]) {
        console.log('Matched all!');
        answerArr.push(1);
        score.setAttribute("value", (answerArr.length/matchArr.length)*100); 
      }
      else {
        wrongArr.push(1);
      }
      console.log('click all at ' + x);
      
      i++;

    break;
    case "play":

      clearInterval(start); // stops engine after x is above rounds
      document.getElementById("showResult").innerHTML = "";
      setupGame();  
      start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds
      
    break;
    case "restart":
      console.log('matchArr is '+matchArr);
      console.log(JSON.stringify(start));
      clearInterval(start); // stops engine after x is above rounds
      document.getElementById("showResult").innerHTML = "";
      setupGame();  
      start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds
      

    break;
    case "stop":
    clearInterval(start);

    break;
  }
};
