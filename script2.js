var stimColor = ['Purple','Green','Orange','Yellow'];
var stimPosition = [gs1, gs2, gs3, gs4, gs5, gs6, gs7, gs8, gs9];
var levelArray = [];
var matchPercent = 0.3;

var x = 0;
var back = 2;
var rounds = 10;

var i = 0;

for ( i=0 ; i<rounds ; i++ ) { 
  console.log(i);
  var rnd = Math.random();
  if ((rnd < matchPercent) && (i >= (back))) {
  
    levelArray[i] = levelArray[i-back];
    //console.log(levelArray[i]);
  } else {
    var rndColor = Math.floor(Math.random() * ( stimColor.length + 1));
    var rndPosition = Math.floor(Math.random() * ( stimPosition.length + 1));

    levelArray.push([rndPosition, rndColor]);
  }

}
console.log (levelArray.join(', '));


var start = setInterval(function(){ setColor() }, 2000); // starts engine, runs it every 2 seconds

function setColor() {   //function to set color and position, called by var start

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
    clearInterval(start); // stops engine after x is above rounds
  };  

};