
/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/


//Game values
let min = 7,
	max = 18,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

//UI vriables
const game = document.querySelector('#game'),
	  minNum = document.querySelector('.min-num'),
	  maxNum = document.querySelector('.max-num'),
	  guessBtn = document.querySelector('#guess-btn'),
	  guessInput = document.querySelector('#guess-input'),
	  message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


//play again listener

guessBtn.addEventListener('mousedown', function(e) {
	if(e.target.className === 'play-again') {
		window.location.reload();
	}
});

//liten for a guess
guessBtn.addEventListener('click', function (){
	let guess = parseInt(guessInput.value);

	//validate input
	if (isNaN(guess) || guess < min || guess > max) {
		//clear input
		guessInput.value = '';
		//tell the user to check the input
		showMessage(`Please choose a number between ${min} and ${max}`, 'red');

	}else{
		//check if won
		if (guess === winningNum) {            //game over , won
			
			gameOver(true, `${guess} is correct, YOU WIN!.`);

		} else {
			guessesLeft -= 1;

			if (guessesLeft === 0) {           //game over , lost
			
			gameOver(false, `Game over!, the correct answer was ${winningNum}`);

			} else {                         //game continious, answer wrong

			//clear input
			guessInput.value = '';	
			//border color
			guessInput.style.borderColor = 'red';
			//tell the user it's wrong number
			showMessage(`${guess} is wrong!, ${guessesLeft} guesses Left.` ,'red');
			}
		}
	}

});	

function gameOver(won, msg) {
		let color;
		won === true ? color = 'green' : color = 'red';
		//disable input
		guessInput.disabled = true;
		//border color
		guessInput.style.borderColor = color;
		//set message
		showMessage(msg, color);

		guessBtn.value = 'Play again';
		guessBtn.className = 'play-again';

}

function getRandomNum(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}


function showMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}