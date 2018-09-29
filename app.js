console.log('connected');
//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//ui elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

////assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})
//listen for btn click
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  console.log(guess);
  //validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //check if won
  if(guess===winningNum){
    // //disable guessInput
    // guessInput.disabled = true;
    // //border color
    // guessInput.style.borderColor='green';
    // setMessage(`You got it! ${winningNum} is the Winning Number`, 'green');
    gameOver(true, `You got it! ${winningNum} is the Winning Number`);
  }else{
    guessesLeft --;
  if(guessesLeft === 0){
    // guessInput.disabled = true;
    // guessInput.style.borderColor='red';
    // setMessage(`Game Over, you lost. The correct answer was ${winningNum}`, 'red');
    gameOver(false, `Game Over, you lost. The correct answer was ${winningNum}`);
  }else{
    guessInput.style.borderColor='red';
    guessInput.value='';
    setMessage(`${guess} is incorrect, you have ${guessesLeft} guesses left`, 'red');
  }
}
});

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  //disable input
  guessInput.disabled = true;
  //border color
  guessInput.style.borderColor=color;
  //message color
  message.style.color=color;
  setMessage(msg);

  guessBtn.value='Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//set message
function setMessage(msg, color){
  message.style.color=color;
  message.textContent=msg;
}
