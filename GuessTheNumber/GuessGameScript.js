"use strict";
let guessCount = 0;
let guessTot = 0;
let guess;
let level = 1;
const guessAvailable = 10;
const difficulties = [50, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 10000];
const maxLevel = difficulties.length;
//maxLevel =1;      //Testing congratulations form
let maxScore = (guessAvailable + 10) * maxLevel;
const levelBonus = 10;
let secretNum = getRandom();
const history = document.querySelector(".history");
let highScore = 0;
let mex;
let hint;

loading();
document.querySelector('.number').textContent = secretNum;                  //UNVEIL THE NUMBER


document.querySelector("#levelUp").addEventListener("click", function () {
    levelSwitched();
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        check();
    }
});

function notGuessed() {
    guessCount++;
    if (guess > secretNum) {
        hint = "---!";
        mex = "Nope, too high!";
        if (guess - secretNum < 10) {
            hint = "-!";
            mex = "Less, but damn, you are close!";
        } else if (level >= 3) {
            hint = "-----!";
            mex = "Way too high, you ain't even close!";
            if (guess - secretNum <= 30) {
                //Aggiustare il level 3 se non serve!!
                hint = "--";
                mex = "High, but you are getting close..";
            } else if (guess - secretNum <= 300 && level >= 6) {
                hint = "---!";
                mex = "Nope, too high!";
            } else if (guess - secretNum <= 1000 && level >= 9) {
                hint = "----!";
                mex = "Too high!";
            }
        }
    } else if (guess < secretNum) {
        mex = "Nope, too low!";
        hint = "+++!";
        if (secretNum - guess < 10) {
            mex = "More, but damn, you are close!";
            hint = "+!";
        } else if (level >= 3) {
            mex = "Way too low, you ain't even close!";
            hint = "+++++!";
            if (secretNum - guess <= 30 && level >= 3) {
                //Aggiustare il level 3 se non serve!!
                mex = "Low, but you are getting close..";
                hint = "++";
            } else if (secretNum - guess <= 300 && level >= 6) {
                mex = "Nope, too low!";
                hint = "+++!";
            } else if (secretNum - guess <= 1000 && level >= 9) {
                mex = "Too low!";
                hint = "++++!";
            }
        }
    }
    document.querySelector(".history").textContent += guess + " " + hint + "\r\n";
    document.querySelector(".message").textContent = mex;
    document.querySelector(".score").textContent = guessAvailable - guessCount;
}

let check = function () {
    if (!document.getElementsByClassName("check").disabled) {
        guess = Number(document.querySelector("#guess").value);

        if (!guess || guess > difficulties[level - 1] || guess < 1) {
            document.querySelector(".message").textContent =
                "The number must be between 1 and " + difficulties[level - 1] + "!";
        } else {
            if (guess == secretNum) {
                guessed();
                return;
            } else {
                //if it is not right
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
        document.getElementById("levelUp").textContent = "Try Again!";
        document.querySelector(".message").textContent = "Oops, you took " + guessCount + " takes out of " + guessAvailable + " before to get it, try again!";

    }
    else {
        document.getElementById("levelUp").textContent = "Next Level!";
        document.querySelector(".message").textContent = "Yeah! You got it after " + guessCount + " takes!";
    }
    document.querySelector(".highscore").textContent = highScoreCalculator() + "/" + maxScore; //Set score
    unveilNumber();
    if (guessCount > guessAvailable) {
        document.getElementById("levelUp").textContent = "Try Again!";
    } else {
        if (level == maxLevel) {
            document.getElementById("levelUp").textContent = "Score!";
        }
        else {
            document.getElementById("levelUp").textContent = "Next Level!";
        }
    }
    document.getElementById("levelUp").style.display = "unset";
    //document.getElementById('levelUp').focus();  //Non funziona se viene implementato con l'implementazione del check all'invio
    document.getElementById("guess").disabled = true;
    document.getElementsByClassName("check").disabled = true;
}

function levelSwitched() {
    if (!(guessCount > guessAvailable)) {
        //Level Up
        levelUp();
    }
    guessCount = 0;
    document.getElementById("guess").disabled = false;
    document.getElementsByClassName("check").disabled = false;
    secretNum = getRandom(); //calculate new secret number
    document.querySelector("#guess").value = "";
    document.querySelector(".history").textContent = ""; //Reset history
    document.getElementById("levelUp").style.display = "none";
    document.querySelector(".level").textContent = "Level " + level; //Set level
    document.querySelector(".difficulty").textContent =
        "(Between 1 and " + difficulties[level - 1] + ")"; //Set difficolty label
    document.querySelector(".score").textContent = guessAvailable - guessCount;
    veilNumber();
    document.querySelector(".message").textContent = "Start guessing...";
    document.getElementById("guess").focus();
}

function unveilNumber() {
    document.getElementById("number").style.width = "auto";
    document.getElementById("number").style.padding = "3rem 2.5rem";
    document.querySelector(".number").textContent = secretNum; //Unveil secret number
}


function veilNumber() {
    document.getElementById("number").style.width = "15rem";
    document.getElementById("number").style.padding = "3rem 0rem";
    document.querySelector(".number").textContent = "?"; //veil secret number
    document.querySelector(".number").textContent = secretNum; //Unveil secret number
}


function levelUp() {
    if (level == maxLevel) {
        setVisibleCongrats();
        return;
    }
    level++; //Increase level
}

function loading() {
    document.querySelector(".difficulty").textContent =
        "(Between 1 and " + difficulties[level - 1] + ")"; //Display difficulty
    document.querySelector(".score").textContent = guessAvailable - guessCount;
    document.getElementById("guess").focus();
}

function highScoreCalculator() {
    let res = guessAvailable - guessCount + levelBonus;
    if (!(guessCount > guessAvailable)) {
        highScore += res;
    } else {
        highScore -= guessCount;
    }

    if (highScore < 0) {
        highScore= 0;
    }
    return highScore;
}

function getRandom() {
    let res = Math.trunc(Math.random() * difficulties[level - 1] + 1);
    return res;
}

function setVisibleCongrats() {
    let hids = document.querySelectorAll(".hidden");
    for (var i = 0; i < hids.length; i++) {
        hids[i].style.display = "unset";
    }
    document.querySelector("#final-score").textContent = "Score: " + highScore + "/200";
    let comment = "cici";
    if (highScore == 200) {
        comment = "Seems incredible, too incredible to be true.."
    } else if (highScore > 150) {
        comment = "Bro, you are a monster.."
    }
    else if (highScore > 100) {
        comment = "That's a really good score!"
    }
    else if (highScore >= 50) {
        comment = "Not bad, boy!"
    }
    else if (highScore < 50) {
        comment = "You ain't really made for this game, dude!"
    }

    document.querySelector("#final-score").textContent = "Score: " + highScore + "/200";
    document.querySelector("#comment").textContent = comment;
}

/*


Quando si sale di livello la scritta in alto a sinistra lampeggia per qualche secondo e anche il messaggio


=============


*/
