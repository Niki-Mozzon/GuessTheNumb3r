'use strict';
let guessCount = 0;
let guessTot = 0;
let guessAvailable = 10;
let guess;
let level = 1;
const difficulties = [5, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000];
let maxScore = (guessAvailable + 10) * difficulties.length;
let secretNum = Math.trunc(Math.random() * difficulties[level - 1]);
const history = document.querySelector('.history');
let highScore = 0;

loading();

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
    document.querySelector('.message').textContent = 'Nope, too high!';
    document.querySelector('.history').textContent += guess + ' -> Nope, too high!\r\n';
    document.querySelector('.score').textContent = guessAvailable - guessCount;
  } else if (guess < secretNum) {
    document.querySelector('.message').textContent = 'Nope, too low!';
    document.querySelector('.history').textContent += guess + ' -> Nope, too low!\r\n';
    document.querySelector('.score').textContent = guessAvailable - guessCount;
  }
}

function guessed() {
  document.querySelector('.message').textContent = 'Yeah! You got it after ' + guessCount + ' takes!';
  document.querySelector('.number').textContent = secretNum; //Unveil secret number
  document.getElementById('levelUp').style.display = 'unset';
  document.getElementById('guess').disabled = true;
  document.getElementsByClassName('check').disabled = true;
  document.querySelector('.highscore').textContent = highScoreCalculator() + '/' + maxScore; //Set score
}

function levelUp() {
  document.querySelector('.number').textContent = '?'; //Unveil secret number
  document.getElementById('guess').focus();
  document.querySelector('#guess').value = '';
  document.querySelector('.history').textContent = ''; //Reset history
  level++; //Increase level
  document.getElementById('levelUp').style.display = 'none';
  document.querySelector('.level').textContent = 'Level ' + level; //Set level
  document.querySelector('.difficulty').textContent = '(Between 1 and ' + difficulties[level - 1] + ')'; //Set difficolty label
  document.querySelector('.score').textContent = guessAvailable - guessCount;
  document.getElementById('guess').disabled = false;
  document.getElementsByClassName('check').disabled = false;
  document.querySelector('.message').textContent = 'Start guessing...';
}

function loading() {
  document.querySelector('.difficulty').textContent = '(Between 1 and ' + difficulties[level - 1] + ')'; //Display difficulty
  document.querySelector('.score').textContent = guessAvailable - guessCount;
}

function highScoreCalculator() {
  let res = guessAvailable - guessCount + 10;
  highScore += res;
  guessCount = 0;
  return highScore;
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
