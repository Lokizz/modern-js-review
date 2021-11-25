// TODO Project Number Guesser

// Game Elements
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.getElementById('guess-input'),
      guessBtn = document.getElementById('guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Method 2 of Play again with event delegation
game.addEventListener('mousedown', function(e) {
  if(e.target.classList.contains('play-again')) {
    // Reload the page 
    window.location.reload();
  }
})

guessBtn.addEventListener('click', function() {
  let guessNum = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guessNum) || guessNum < min || guessNum > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Game over - won
  if(guessNum === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WON!`);
  } else {
    // Wrong number
    guessesLeft--;
  
    if(guessesLeft === 0) {
      // Game over - Lost
      gameOver(false, `Game over, YOU LOST. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong
      setMessage(`Wrong number, you now have ${guessesLeft} guesses left.`, 'red');
      // Clear the input
      guessInput.value = '';
    }
  }

});

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  
  // Disable input again
  guessInput.disabled = true; 

  // Set border color
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  // Method 1 of Play again
  // playAgain();

  // Method 2 of Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
  guessBtn.style.color = 'green';
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
  // Clear the message
  // setTimeout(clearMessage, 2000);
}

function clearMessage() {
  message.textContent = '';
}

// Method 1 of Play again
function playAgain() {
  const retryBtn = document.createElement('input');
  retryBtn.type = 'submit';
  retryBtn.value = 'Play Again';
  
  // Style
  retryBtn.style.borderColor = 'green';
  retryBtn.style.color = 'green';

  // Append next to the SUBMIT btn
  game.insertBefore(retryBtn, message);

  retryBtn.addEventListener('click', function() {
    // reset the game values
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessesLeft = 3;
    guessInput.value = '';
    message.textContent = '';

    // Hide the playAgain btn
    guessInput.style.borderColor ='#bbb';
    retryBtn.style.display = 'none';
  });
}

function getRandomNum(min, max) {
return Math.floor(Math.random()*(max - min + 1)) + min;
}