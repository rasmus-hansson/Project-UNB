// Snygga upp koden
// Förenkla hela spelet

// Minimera confusion, speciellet med variabler och arrayer
// Samla och strukturera koden
// Försöka hitta spelglädjen

// Player config
var playerParams = {
	name: "Rasmus",
	result: []
}

var gameConfig = {
	nBack: 9
}


var gameParams = {
	stimuli: ["green","blue","purple","black","orange","red"],
	stimuliShow: 1500,
	stimuliDelay: 550,
	boardSize: 1,
	nBack: 2,
	matchChance: 0.3,
	streaking: false,
	start: null
};

function showConfig () {
	var cells = "";
	for (i=2 ; i<=gameConfig.nBack ; i++) {
		cells += "<div id='" + i + " back' class='nback_select'>"+i+"</div>";
	}
	nback.innerHTML = cells;	
}

function setupBoard () {
	var cells = "";
	for (i=0 ; i<gameParams.boardSize ; i++) {
		cells += "<div id='stimtrack' class='cell'></div>";
	}
	gameboard.innerHTML = cells;
	stimtrack.innerHTML = "Tap to Start";
}


function genStimuli () {
	if (Math.random() < gameParams.matchChance && playerParams.result[0].trail.length > gameParams.nBack) {		
		//console.log (playerParams.result[0].trail[gameParams.nBack-1]);
		return playerParams.result[0].trail[gameParams.nBack-1];
	} else {
		// ensure non repeating stimuli
		var temp = null;
		do {
			temp = Math.floor(Math.random() * ( gameParams.stimuli.length ));
		} while (temp === playerParams.result[0].trail[0]);
		//console.log (temp);	
		return temp;
	}
}


function displayRound () {
	if (playerParams.result[0].trail[0] === playerParams.result[0].trail[gameParams.nBack] && !gameParams.streaking) {
		gameOver();
    }

	var currentStimuli = genStimuli();
	var currentPosition = document.getElementById("gameboard").childNodes[0];	
	currentPosition.style.backgroundColor = gameParams.stimuli[currentStimuli];
	currentPosition.innerHTML = playerParams.result[0].score;
	playerParams.result[0].trail.unshift(currentStimuli);
	//console.log(playerParams.result[0].trail);
	setTimeout(function(){ currentPosition.style.backgroundColor = '#d24e89' }, gameParams.stimuliDelay);
	gameParams.streaking = false;
}


function gameOver () {

	console.log("dead! current stimuli " + gameParams.stimuli[playerParams.result[0].trail[0]]);
	console.log("nback stimuli " + gameParams.stimuli[playerParams.result[0].trail[gameParams.nBack]]);
	
	var currentPosition = document.getElementById("gameboard").childNodes[0];
	currentPosition.innerHTML += "<br/>Tap to Restart";
	currentPosition.style.backgroundColor = '#d24e89';
	currentPosition.style.backgroundImage = 'url("assets/logo.png")';

	clearInterval(gameParams.start);
	
	gameParams.streaking = false;
	gameParams.start = null;
	console.log (playerParams.result);
	saveResult();
	loadResult();

	forceRedraw(window);
}

function loadResult () {
	//localStorage.removeItem('result');

	var storResult = localStorage.getItem('result');
	if (storResult) {
		playerParams.result = JSON.parse(storResult);
	}

	result.innerHTML = JSON.stringify(playerParams.result).length;
	result.innerHTML = JSON.stringify(playerParams.result);
}


function saveResult () {	
		localStorage.setItem('result', JSON.stringify(playerParams.result));
}


function startGame () {
	playerParams.result.unshift({
		game: playerParams.result.length,
		date: Date(),
		nback: gameParams.nBack,
		score: 0,
		trail: []
	});
	var currentPosition = document.getElementById("gameboard").childNodes[0];
	currentPosition.style.backgroundImage = 'none';

	gameParams.streaking = true;
	gameParams.start = setInterval(function(){ displayRound() }, gameParams.stimuliShow); // starts engine, runs it every 2 seconds
	console.log("Game Started");
}


function clickTrack (ev) {
    switch (ev.target.id) {
      case "stimtrack":
      	if (gameParams.start == null) {      		
      		startGame();
      		break;     		
      	}

      	if (playerParams.result[0].trail.length >= gameParams.nBack && playerParams.result[0].trail[0] === playerParams.result[0].trail[gameParams.nBack]) {
      		playerParams.result[0].score++;
      		gameParams.streaking = true;
      		document.getElementById("gameboard").childNodes[0].innerHTML = playerParams.result[0].score;
      		console.log("score!");
      	} else {
      		gameOver();
      	}
      break;
    }
 }


var forceRedraw = function(element){
  var disp = element.style.display;
  element.style.display = 'none';
  var trick = element.offsetHeight;
  element.style.display = disp;
};




document.addEventListener('click', clickTrack, false);
setupBoard();
showConfig();
loadResult();

function InitChart() {

	var vis = d3.select("#visualisation"),
	WIDTH = 250,
	HEIGHT = 250,
	MARGINS = {
		top: 50,
		right: 20,
		bottom: 50,
		left: 50
	},
	xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(playerParams.result, function(d) {
	return d.game;
	}), d3.max(playerParams.result, function(d) {
		return d.game;
	})]),
	yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(playerParams.result, function(d) {
	return d.score;
	}), d3.max(playerParams.result, function(d) {
		return d.score;
	})]),
	xAxis = d3.svg.axis()
	.scale(xScale),
	yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left");

	vis.append("svg:g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
		.call(xAxis);

	vis.append("svg:g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + (MARGINS.left) + ",0)")
		.call(yAxis);

	var lineGen = d3.svg.line()
		.x(function(d) {
			return xScale(d.game);
		})
		.y(function(d) {
			return yScale(d.score);
		})
	.interpolate("basis");

	vis.append('svg:path')
		.attr('d', lineGen(playerParams.result))
		.attr('stroke', 'white')
		.attr('stroke-width', 2)
		.attr('fill', 'none');	
}
InitChart();



	




