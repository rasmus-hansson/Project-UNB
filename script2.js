document.addEventListener('click', clickTrack, false); // Capture all click events with event listener

var stimColor = ['Purple','Green','Orange','Yellow', 'Red', 'Pink','Aqua'];
var stimPosition = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
var levelArray = [];    //Empty array to store the stimuli of each round
var matchPercent = 0.3; //Desired percent matches
var answerArr = []; //contains players answers
var matchArr = []; //contains number of matches
var wrongArr = []; //contains number of wrong clicks

var x = 0;  //What round we are on
var back = 2; //Number of N-back
var rounds = 10; //Number of rounds per game

var i = 0; //Iterator for gameloop

for ( i=0 ; i<rounds ; i++ ) {       //Loop that enables percent matches per game to equal matchPercent, and 
  console.log(i);                    //generates random stimuli in the other cases, then pushes those positions to levelArray
  var rnd = Math.random();
  if ((rnd < matchPercent) && (i >= (back))) {
  
    levelArray[i] = levelArray[i-back];
    matchArr.push(1);
    console.log(levelArray[i-back]);
  } else {
    var rndColor = Math.floor(Math.random() * ( stimColor.length));
    var rndPosition = Math.floor(Math.random() * ( stimPosition.length));

    levelArray.push([rndPosition, rndColor]);

  };

};



console.log (levelArray.join(', '));
console.log (matchArr);
console.log (matchArr.length + ' matches in this round.');

var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

function setColor() {   //function to set color and position based on what's in levelArray, called by var start

  var index;
  //var gamesquare = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
  for (index = 0; index < stimPosition.length; index++) {
    stimPosition[index].style.backgroundColor = "white"; };  // resets square before start of loop  

  //console.log ('Round count ' + (x+1));
  //console.log ('Position ' + (levelArr[x][1]+1) + ' Color ' + colors[levelArr[x][0]]);
  stimPosition[levelArray[x][0]].style.backgroundColor = stimColor[levelArray[x][1]];  // sets color and position for square
  x++;                                      // increments x on each loop iteration


  if(x >= rounds){
    console.log('Level complete, stopping engine');
    console.log(answerArr);
    clearInterval(start); // stops engine after x is above rounds
    console.log('Your scored '+answerArr.length+' right, out of '+matchArr.length+' possible!');
      
      localStorage.setItem('answers', answerArr.length);
      
  };  



if((x < rounds) && (x >= (back))){
      if((levelArray[x][0] === levelArray[x-back][0]) || (levelArray[x][1] === levelArray[x-back][1])){
        console.log(x);
        console.log(x-back);
        matchArr.push(2);
        console.log('A natural match!');
      };

};
};




/////////////////
// Click Tracking
// Track only when clicking on certain objects (id in this example)
//

function clickTrack (ev) {
  switch (ev.target.id) {
    case "trackposition":
      if (levelArray[x-1][0] == levelArray[x-back-1][0]) {
        console.log('Matched Position!');
        answerArr.push(1);
      }
      else {
        wrongArr[i] = 1;
      }
      console.log('click pos at ' + x);
      
      i++;

    break;
    case "trackcolor":
      if (levelArray[x-1][1] == levelArray[x-back-1][1]) {
        console.log('Matched Color!');
        answerArr.push(1);
      }
      else {
        wrongArr[i] = 1;
      }
      console.log('click col at ' + x);
      console.log('round-back is' + (x-back));
      
      i++;

    break;
    case "trackall":
      if (levelArray[x-1][1] == levelArray[x-back-1][1] && levelArray[x-1][0] == levelArray[x-back-1][0]) {
        console.log('Matched all!');
        answerArr.push(1);
      }
      else {
        wrongArr[i] = 1;
      }
      console.log('click all at ' + x);
      
      i++;

    break;
  }
};
