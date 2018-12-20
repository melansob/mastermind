/* Class Mastermind */
// NOTE: This file stores the guess and turns in thisTurn, and stores thisTurn in turnRecords.  
// Test to ensure data is stored correctly.

/* Initializations */
// colors, code, guess, feedback (arrays) and turn (0);
// populate colors = r,b,g,w,c,y
var colors=[], code=[], guess=[], feedback=[];
var turn=0;
colors = ["r","b","g","w","c","y"];
// add arrays for thisTurn, turnRecords
var thisTurn = [], turnRecords = [];

/* Main Function */
// define Main function
function main() {
	// tell player the colors
	alert("Colors include [r]ed, [c]yan, [y]ellow, [w]hite, [b]lack, [g]reen.");
	// set the code
	code=setCode(colors); 
	// we're going to loop as long as the answer is wrong and the player didn't want to quit, so:
	// keep looping while fourth feedback is not a "b" and first guess is not a "q"
	while (feedback[3]!="b" && guess[0]!="q")  {
		// increment turn
		turn++;
		// set code = setCode(colors)
		code=setCode(colors); 
		// set guess = getGuess
		guess=getGuess();
		// set feedback = testGuess(guess)
		feedback=testGuess(code,guess); 
    // store guess and feedback in thisTurn
		thisTurn=addTurn(guess,feedback);
		// push thisTurn to turnRecords
		turnRecords.push(thisTurn);
    // alert the guess and feedback for all turns (ugly display)
		alert("Turn and Feedback "+turnRecords);
		//alert("Guess "+turn+" : "+guess+" returns: "+feedback); 
	}
	// alert "Charlie you've won" if while loop ended with first condition
	if (feedback[3]=="b") {
		alert ("Charlie, you've won!");
	}
	// alert "Quitter!" if while loop ended with section condition
	else if (guess[0]=="q"){
		alert("Quitter!");
	}
}
	
/* Functions */

/* Create the Secret Code */
// define function setCode to pull from six colors to randomly fill code with four values 0-5
function setCode(colors){
	for(var i=0; i<4; i++){
		code[i]=colors[Math.floor(Math.random()*6)];
	}
	console.log(code);
	return code;
}

/* Get a Player's Guess */
// define function getGuess to prompt player for each of four values and store in guess array
function getGuess(){
	for(var i=0; i<4; i++){
		guess[i]=prompt("Enter a color for position "+(i+1));
	}
	console.log(guess);
	return guess;
}

/* Analyze the Guess */
// define function testGuess to analyze guess against code and produces feedback
function testGuess(code,guess){
	// initialize b, w, as 0;
	var b=0, w=0;
	// initialize tempCode and tempGuess arrays, as copies with array.slice(0);
	var tempCode = code.slice(0);
	var tempGuess = guess.slice(0);
	// count the blacks and erase tempcode and tempguess as you go - one loop
	for (var g=0;g<4;g++){
		if (tempGuess[g]==tempCode[g]) {
			b++;
			tempGuess[g]="";
			tempCode[g]="";
		}
	}	
	// count the whites and erase tempcode and tempguess as you go - two nested loops
	for (g=0;g<4;g++){
		for (var c=0;c<4; c++){
			if (tempGuess[g]==tempCode[c] && tempGuess[g]!=""){
				w++;
				tempGuess[g]="";
				tempCode[c]="";
				// use "continue" once a match is found in the inner loop
				continue;
			}
		}
	}
	// console.log the feedback
	console.log("Blacks = "+b+" and Whites equals "+w);
	// call the feedback function, sending it black and white counts
	var feedback=formatFeedback(b,w);//local variable
	// return the feedback
	return feedback;
}

/* Define function addTurn to make an array thisTurn from Guess and Feedback */
function addTurn(guess,feedback){
	// initialize thisTurn;
	var thisTurn=[];
	// set turnValues = 4 + length of feedback
	var turnValues=4+feedback.length;
	for (var i=0;i<turnValues;i++) {
		// if index 0 - 3, write guess sub index
		if (i < 4) {
			thisTurn[i]=guess[i];
		} 
		// if index > 3, write feedback sub index-4 to correct for position
		if (i > 3) {
			thisTurn[i]=feedback[i-4];
		}
	} // end loop	
	// console log thisTurn
	console.log("thisTurn = "+thisTurn);
  // NOTE: Once you get thisTurn console logged, comment out ALL OTHER console.logs except the code
	// return thisTurn
	return thisTurn;
} // end function
function formatFeedback(b,w) {
// function over-writes feedback to put b's first, w's second, delete the rest
	// initialize the black and white count variables
	var b=0, w=0;
	// count the blacks and whites
	for (i=0;i<4;i++) {
    // write the black pegs
		if (feedback[i]=="b") {
			b++;
		}
    // write the white pegs
		else if (feedback[i]=="w") {
			w++;
		}
	}
	// write the black pegs
	for (i=0;i<b;i++) {
		feedback[i]="b";
	}
	// write the white pegs
	for (i=b;i<b+w;i++) {
		feedback[i]="w";
	}
	// define remainder as 4 - blacks + whites
	var remainder = 4-(b+w);
	// delete the blanks in the feedback remainder with array.pop
	for (i=0;i<remainder;i++) {
		feedback.pop();
	}
	// return the new feedback array
	return feedback;
}
function newFormatFeedback(){
	var turnRecords = 4+remandier.length//NOT EXACT
}
