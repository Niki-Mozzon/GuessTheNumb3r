'use strict';
let guessCount = 0;
let guessTot = 0;
let guessAvailable = 10;
let guess;
let level = 1;
const difficulties = [50, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000];
let maxScore = (guessAvailable + 10) * difficulties.length;
let secretNum = getRadom();
const history = document.querySelector('.history');
let highScore = 0;
let hint = '';

loading();
//document.querySelector('.number').textContent = secretNum; //Unveil secret number

document.querySelector('#levelUp').addEventListener('click', function() {
  levelUp();
});

document.querySelector('.check').addEventListener('click', function() {
  if (!document.getElementsByClassName('check').disabled) {
    guess = document.querySelector('#guess').value;

    if (guess > difficulties[level - 1] || guess < 0) {
      document.querySelector('.message').textContent = 'The number is between 1 and ' + difficulties[level - 1] + '!';
    } else {
      if (guess == secretNum) {
        guessed();
        return;
      } else {
        //if it is not right
        notGuessed();
      }
    }
    document.querySelector('#guess').value = '';
    history.scrollTop = history.scrollHeight;
    document.getElementById('guess').focus();
  }
});

function notGuessed() {
  guessCount++;
  if (guess > secretNum) {
    hint = 'Nope, too high!';
    if (guess - secretNum < 10) {
      hint = 'Less, but damn, you are close!';
    } else if (level >= 3) {
      hint = "Way too high, you ain't even close!";
      if (guess - secretNum <= 30 && level >= 3) {
        //Aggiustare il level 3 se non serve!!
        hint = 'High, but you are getting close..';
      } else if (guess - secretNum <= 300 && level >= 6) {
        hint = 'Nope, too high!';
      } else if (guess - secretNum <= 1000 && level >= 9) {
        hint = 'Too high!';
      }
    }
  } else if (guess < secretNum) {
    hint = 'Nope, too low!';
    if (secretNum - guess < 10) {
      hint = 'More, but damn, you are close!';
    } else if (level >= 3) {
      hint = "Way too ow, you ain't even close!";
      if (secretNum - guess <= 30 && level >= 3) {
        //Aggiustare il level 3 se non serve!!
        hint = 'Low, but you are getting close..';
      } else if (secretNum - guess <= 300 && level >= 6) {
        hint = 'Nope, too low!';
      } else if (secretNum - guess <= 1000 && level >= 9) {
        hint = 'Too low!';
      }
    }
  }
  document.querySelector('.history').textContent += guess + ' -> ' + hint + '\r\n';
  document.querySelector('.message').textContent = hint;
  document.querySelector('.score').textContent = guessAvailable - guessCount;
}

function guessed() {
  document.querySelector('.message').textContent = 'Yeah! You got it after ' + guessCount + ' takes!';
  document.querySelector('.number').textContent = secretNum; //Unveil secret number
  document.getElementById('levelUp').style.display = 'unset';
  document.getElementById('guess').disabled = true;
  document.getElementsByClassName('check').disabled = true;
  document.querySelector('.highscore').textContent = highScoreCalculator() + '/' + maxScore; //Set score
  document.getElementById('levelUp').focus();
}

function levelUp() {
  level++; //Increase level
  document.getElementById('guess').disabled = false;
  secretNum = getRadom(); //calculate new secret number
  document.querySelector('.number').textContent = '?'; //veil secret number
  //document.querySelector('.number').textContent = secretNum; //Unveil secret number
  document.querySelector('#guess').value = '';
  document.querySelector('.history').textContent = ''; //Reset history
  document.getElementById('levelUp').style.display = 'none';
  document.querySelector('.level').textContent = 'Level ' + level; //Set level
  document.querySelector('.difficulty').textContent = '(Between 1 and ' + difficulties[level - 1] + ')'; //Set difficolty label
  document.querySelector('.score').textContent = guessAvailable - guessCount;
  document.getElementsByClassName('check').disabled = false;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.getElementById('guess').focus();
}

function loading() {
  document.querySelector('.difficulty').textContent = '(Between 1 and ' + difficulties[level - 1] + ')'; //Display difficulty
  document.querySelector('.score').textContent = guessAvailable - guessCount;
  document.getElementById('guess').focus();
}

function highScoreCalculator() {
  let res = guessAvailable - guessCount + 10;
  highScore += res;
  guessCount = 0;
  return highScore;
}

function getRadom() {
  let res = Math.trunc(Math.random() * (difficulties[level - 1] + 1));
  return res;
}

/*
Prendo il numero in input
Controllo che non abbiano operatori o virgole
Creo uno span per avvertire l'utente

Creo uno storico con i tentativi

Quando si sale di livello la scritta in alto a sinistra lampeggia per qualche secondo e anche il messaggio

Quando i tentativi sono sotto i 5 l'indicatore dei tentativi si fa sempre pi? rosso

=============


*/
