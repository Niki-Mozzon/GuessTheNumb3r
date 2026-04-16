"use strict";
let guessCount = 0;
let guessTot = 0;
let guess;
let level = 1;
const guessAvailable = 10;
const difficulties = [50, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000];
const maxLevel = difficulties.length;
//maxLevel =1;      //Testing congratulations form
const maxScore = (guessAvailable + 10) * maxLevel;
const levelBonus = 10;
let secretNum = getRandom();
const history = document.querySelector(".history");
let highScore = 0;

loading();

document.querySelector("#levelUp").addEventListener("click", function () {
    levelSwitched();
});

document.getElementById("guess").addEventListener("focusout", function () {
    if (!this.disabled) {
        this.focus();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        if (document.getElementById("levelUp").style.display === "unset") {
            levelSwitched();
        } else {
            check();
        }
    }
});

function getProximity(distance, range) {
    const ratio = distance / range;
    if (ratio < 0.02) return 'boiling';
    if (ratio < 0.05) return 'hot';
    if (ratio < 0.15) return 'warm';
    if (ratio < 0.40) return 'cold';
    return 'freezing';
}

function notGuessed() {
    guessCount++;
    const range = difficulties[level - 1];
    const distance = Math.abs(guess - secretNum);
    const proximity = getProximity(distance, range);
    const isHigh = guess > secretNum;
    const arrow = isHigh ? '\u2193' : '\u2191';

    const messages = {
        boiling:  isHigh ? 'SO close, barely too high!' : 'SO close, barely too low!',
        hot:      isHigh ? 'Too high, but you are close!' : 'Too low, but you are close!',
        warm:     isHigh ? 'Too high, getting there...' : 'Too low, getting there...',
        cold:     isHigh ? 'Too high, still far away' : 'Too low, still far away',
        freezing: isHigh ? 'Way too high!' : 'Way too low!',
    };

    const entry = document.createElement('div');
    entry.className = `history-entry ${isHigh ? 'too-high' : 'too-low'} ${proximity}`;
    entry.textContent = `${guess}  ${arrow}  ${proximity.toUpperCase()}`;
    history.appendChild(entry);

    document.querySelector('.message').textContent = messages[proximity];
    document.querySelector('.score').textContent = guessAvailable - guessCount;
    history.scrollTop = history.scrollHeight;
}

let check = function () {
    if (!document.querySelector(".check").disabled) {
        guess = Number(document.querySelector("#guess").value);

        if (!guess || guess > difficulties[level - 1] || guess < 1) {
            document.querySelector(".message").textContent =
                "The number must be between 1 and " + difficulties[level - 1] + "!";
        } else {
            if (guess == secretNum) {
                guessed();
                return;
            } else {
                notGuessed();
            }
        }
        document.querySelector("#guess").value = "";
        history.scrollTop = history.scrollHeight;
        document.getElementById("guess").focus();
    }
};
document.querySelector(".check").addEventListener("click", check);

function guessed() {
    if (guessCount > guessAvailable) {
        document.querySelector(".message").textContent = "Oops, you took " + guessCount + " takes out of " + guessAvailable + " before to get it, try again!";
    } else {
        document.querySelector(".message").textContent = "Yeah! You got it after " + guessCount + " takes!";
    }
    document.querySelector(".highscore").textContent = highScoreCalculator() + "/" + maxScore;
    unveilNumber();
    if (guessCount > guessAvailable) {
        document.getElementById("levelUp").textContent = "Try Again!";
        document.getElementById("number").classList.add("level-failed");
        document.getElementById("levelUp").classList.add("btn-danger");
    } else {
        if (level == maxLevel) {
            document.getElementById("levelUp").textContent = "Score!";
        } else {
            document.getElementById("levelUp").textContent = "Next Level!";
        }
    }
    document.getElementById("levelUp").style.display = "unset";
    document.getElementById("guess").disabled = true;
    document.querySelector(".check").disabled = true;
}

function levelSwitched() {
    if (!(guessCount > guessAvailable)) {
        levelUp();
    }
    guessCount = 0;
    document.getElementById("guess").disabled = false;
    document.querySelector(".check").disabled = false;
    secretNum = getRandom();
    document.querySelector("#guess").value = "";
    history.innerHTML = '';
    document.getElementById("levelUp").style.display = "none";
    document.querySelector(".level").textContent = "Level " + level;
    document.querySelector(".difficulty").textContent =
        "(Between 1 and " + difficulties[level - 1] + ")";
    document.querySelector(".score").textContent = guessAvailable - guessCount;
    veilNumber();
    document.getElementById("number").classList.remove("level-failed");
    document.getElementById("levelUp").classList.remove("btn-danger");
    document.querySelector(".message").textContent = "Start guessing...";
    document.getElementById("guess").focus();
}

function unveilNumber() {
    document.getElementById("number").style.width = "auto";
    document.getElementById("number").style.padding = "3rem 2.5rem";
    document.querySelector(".number").textContent = secretNum;
}

function veilNumber() {
    document.getElementById("number").style.width = "15rem";
    document.getElementById("number").style.padding = "3rem 0rem";
    document.querySelector(".number").textContent = "?";
}

function levelUp() {
    if (level == maxLevel) {
        setVisibleCongrats();
        return;
    }
    level++;
}

function loading() {
    document.querySelector(".difficulty").textContent =
        "(Between 1 and " + difficulties[level - 1] + ")";
    document.querySelector(".score").textContent = guessAvailable - guessCount;
    document.getElementById("guess").focus();
}

function highScoreCalculator() {
    const res = (guessAvailable - guessCount) + levelBonus;
    if (!(guessCount > guessAvailable)) {
        highScore += res;
    } else {
        highScore -= (guessCount - guessAvailable);
    }

    if (highScore < 0) {
        highScore = 0;
    }
    return highScore;
}

function getRandom() {
    const res = Math.trunc(Math.random() * difficulties[level - 1] + 1);
    return res;
}

function setVisibleCongrats() {
    document.querySelector(".modal").classList.remove("hidden");
    document.querySelector("#final-score").textContent = "Score: " + highScore + "/200";
    let comment = "";
    if (highScore == 200) {
        comment = "Seems incredible, too incredible to be true..";
    } else if (highScore > 150) {
        comment = "Bro, you are a monster..";
    } else if (highScore > 100) {
        comment = "That's a really good score!";
    } else if (highScore >= 50) {
        comment = "Not bad, boy!";
    } else {
        comment = "You ain't really made for this game, dude!";
    }
    document.querySelector("#comment").textContent = comment;
}
