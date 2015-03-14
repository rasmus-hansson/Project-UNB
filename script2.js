// Forced matching if no matches at round 8 
// M�jlighet att v�xla stimuli, �ndra antal positioner
// Settings controls
// F�rfina databasen s� den inneh�ller ALLT vi beh�ver, och displayar som vi vill
// Startknapp och restartknapp


// Monte carlo simulation
// graphics

document.addEventListener('click', clickTrack, false); // Capture all click events with event listener

var stimColor = ['Purple','Green','Orange','Yellow', 'Red', 'Pink','Aqua'];
//var stimPosition = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
var stimPosition = [];
var levelArray = [];    //Empty array to store the stimuli of each round
var matchPercent = 0.3; //Desired percent matches
var answerArr = []; //contains players answers
var matchArr = []; //contains number of matches
var wrongArr = []; //contains number of wrong clicks
var playedGames = [];
var gameSquares = 9;

var stimPositionSetting = []

var x = 0;  //What round we are on
var back = 3; //Number of N-back
var rounds = 20; //Number of rounds per game

var i = 0; //Iterator for gameloop
var synthMatch = null; // counts number of synthetic matches

//localStorage.removeItem('playedgames');

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


for ( i=0 ; i<rounds ; i++ ) {       //Loop that enables percent matches per game to equal matchPercent, and 
  console.log(i);                    //generates random stimuli in the other cases, then pushes those positions to levelArray
  var rnd = Math.random();
  if ((rnd < matchPercent) && (i >= (back))) {    // ATT G�RA: L�GG TILL ELSE IFS F�R ATT GENERERA FORCED MATCHING AV BARA COLOR ELLER POSITION
  
    levelArray[i] = levelArray[i-back];
    matchArr.push(1);
    console.log(levelArray[i-back]);
    synthMatch++;

  } else {        // ATT G�RA: L�GG IN TRACKING AV NATURLIGA MATCHES SOM PUSHAS TILL matchArr!!!!
    var rndColor = Math.floor(Math.random() * ( stimColor.length));
    var rndPosition = Math.floor(Math.random() * ( stimPosition.length));

    levelArray.push([rndPosition, rndColor]);
    //console.log(levelArray[i-back]);
      

      if((i >= (back)) && (rndColor === levelArray[i-back][1]) ){

        matchArr.push(2);

        console.log('A natural match!');
      }
      else if((i >= (back)) && (rndPosition === levelArray[i-back][0])){

        matchArr.push(3);

        console.log('A natural match!');
      }

        else if((i >= (back)) && (levelArray[i] ===  levelArray[i-back])){

          matchArr.push(4);

        console.log('A natural match!');
        };

  };

};

console.log (levelArray.join(', '));


console.log (matchArr); //logs contents of matcharray
console.log (matchArr.length + ' matches in this round. Whereof '+synthMatch+' are synthetic, and '+(matchArr.length-synthMatch)+' are natural!'); //logs number of synthetic matches

// Handle the display of latest score
//
//
var playedGames = JSON.parse(localStorage.getItem('playedgames')); // Try to get local storage item

if (playedGames) {     // This conditional will display all your saved results in the gamescreen

  console.log (playedGames);

  game = "<table>";

  for (i=0 ; i < playedGames.length; i++) {
    game += "<tr>";
    game += "<td>" + i + "</td>";
    game += "<td>" + playedGames[i].time + "</td>";
    game += "<td>" + playedGames[i].scorepercent + "</td>";
    game += "<td>" + playedGames[i].config.nback + "</td>";
    game += "<td>" + playedGames[i].config.matchpercent + "</td>";
    game += "</tr>";
  }
  game += "</table>";
  console.log(game);
  result.innerHTML = game;
} else {
  playedGames = [];
}




function setColor() {   //function to set color and position based on what's in levelArray, called by var start

   if (x <= rounds){ 

    console.log('x is now at' + x);
    
    for (z = 0; z < stimPosition.length; z++) {
      
      document.getElementById(stimPosition[z]).style.backgroundColor = "white"; 
      document.getElementById(stimPosition[z]).style.transitionDuration = "2.5s";  // resets square before start of loop 
}

    //console.log ('Round count ' + (x+1));
    //console.log ('Position ' + (levelArr[x][1]+1) + ' Color ' + colors[levelArr[x][0]]);
   if(x < rounds){  
    var progressCounter = (x+1) + '/' + rounds;
    roundscount.innerHTML = progressCounter;
    console.log(levelArray);
    document.getElementById(stimPosition[levelArray[x][0]]).style.backgroundColor = stimColor[levelArray[x][1]];  // sets color and position for square
      document.getElementById(stimPosition[levelArray[x][0]]).style.transitionDuration = "0.1s"; 
            };
                             
  }
  else{
    console.log('Level complete, stopping engine');
    console.log(answerArr);
    clearInterval(start); // stops engine after x is above rounds
    console.log('Your scored '+answerArr.length+' right, out of '+matchArr.length+' possible!\n You had '+wrongArr.length+' incorrect answers.');  //logs number of correct answers
      document.getElementById("result").innerHTML = 'Your scored '+answerArr.length+' right, out of '+matchArr.length+' possible! <br> You had '+wrongArr.length+' incorrect answers.';
      
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
      var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds
    break;
    case "restart":
      restartGame();
    break;
  }
};
