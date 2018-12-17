/** mastermind - 1 turn @bmoreini*/

/* Initialization */
// colors, code, guess, feedback -- all arrays
// II: Add turnRecords Array (20), boolean gameOver
var colors = ['r', 'c', 'w', 'g', 'b', 'y'];
var code=[];
var guess=[];
var feedback=[];
var turnRecords=new Array(20);
var gameOver=false;


/* Main Method */
turn=0;
turnRecords = populate(turnRecords);
code=setCode(code,colors);
alert("Enter a color by keying the first letter of red, cyan, white, green, black, yellow.");
while (gameOver==false && turn<3) {
	guess=getGuess(guess);
	feedback=testGuess(guess,code,feedback);
	if (feedback[3] == "b" || guess[1]=="q") {
		gameOver=true;
	}
	else {
		addTurn("g",turnRecords,turn,guess);	
		addTurn("f",turnRecords,turn,feedback);
		showTurn(turnRecords,turn);
		turn++;
	}
}
alert("Charlie? My boy, you've won!");


/* Functions */

/* Populate TurnRecords */
function populate (turnRecords) {
	for (var i = 0; i < 20; i++) {
		turnRow = new Array(8);
		turnRecords[i] = turnRow;
	}
	return turnRecords;
}


/* Add Turn (Guess, Feedback) to TurnRecords */
function addTurn(type,turnRecords,turn,arrayValues){
	if (type=="g") {
		start=0;
		stop=4;
	}
	else if (type=="f"){
		start=4;
		stop=arrayValues.length;
	}
	for (i=start;i<stop;i++) {
		turnRecords[turn].splice(i,arrayValues[1]);	
	}
return turnRecords;
}	

/* Provide User Feedback */
function showTurn(turnRecords,turn){
	var turnRow=[];
	for (i=0;i<turnRecords[turn].length;i++){
		turnRow[i]=turnRecords[turn][i];
		if (i==3) {
			turnRow[i+1]=" :: ";
			i++;
		}
	}
	console.log(turnRow[turn]);
}


/* Create the Secret Code */
function setCode(code,colors) {
	for (i=0;i<4;i++) {
		code[i]=colors[Math.floor(Math.random()*6)];
	}
	console.log(code);
	return code;
}

/* Get a Player's Guess */
function getGuess(guess) { 
	for (i=0;i<4;i++) {	
		guess[i]=prompt("Enter peg color "+(i+1)+":");
	}
	console.log(guess);
	return guess;
}

/* Analyze the Guess */
function testGuess(guess,code,feedback) {
	// create a temporary code
	var tempGuess=guess;
	var tempCode=code;
	// count the blacks and erase guess and tempcode as you go
	alert("Counting blacks....");
	for (g=0;g<4;g++) {	
		if (tempGuess[i]=="q") {
			alert("What's wrong?");
			gameOver=true;
		}
		if (tempGuess[g]!="" && guess[g]==tempCode[g]){
			feedback[g]="b";
			tempCode[g]="";	
			tempGuess[g]="";
		}
	}
	// count the whites and erase guess and tempcode as you go
	alert("Counting whites....");
	for (g=0;g<4;g++) {	
		for (c=0;c<4;c++) {
			if (tempGuess[g]!="" && tempGuess[g]==tempCode[c]) {
				feedback[g]="b";
				tempCode[g]="";	
				tempGuess[g]="";
			}
		}
	}
	// send the feeback to the formatter
	feedback=formatFeedback(guess,feedback);
	// console log the feedback
	console.log("Feedback: "+feedback);
	return feedback;
}

function formatFeedback(feedback) {
	// initialize the black and white counts
	var b=0, w=0;
	// count the blacks and whites
	for (i=0;i<4;i++) {
		if (feedback[i]=="b") {
			b++;
		}
		else if (feedback[i]=="w") {
			w++;
		}
	}
	// delete the blanks after
	var remainder = 4-(b+w);
	// write the black pegs
	for (i=0;i<b;i++) {
		feedback[i]="b";
	}
	// write the white pegs
	for (i=b;i<b+w;i++) {
		feedback[i]="w";
	}
	// delete the remainder with array.pop()
	for (i=0;i<remainder;i++) {
		feedback.pop();
	}
	// return the new array
	return feedback;
}