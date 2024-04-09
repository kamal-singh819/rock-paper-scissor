const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const quitButton = document.querySelector('.quit');
const playerPoints = document.querySelector('.player-points');
const computerPoints = document.querySelector('.computer-points');
const playerChoice = document.querySelector('.player-box');
const computerChoice = document.querySelector('.computer-box');
const playerOutcome = document.querySelector('.player-outcome');
const computerOutcome = document.querySelector('.computer-outcome');
const whoWin = document.querySelector('.who-win');

const computerOptions = ['rock', 'paper', 'scissor'];
const choices = { rock: "./images/rock.png", paper: "./images/paper.png", scissor: "./images/scissor.png" };
let gameStart = false;

function pointIncrement(playerOutcome, playerSelectURL, computerOutcome, computerSelectURL, whosePoint) {
    playerOutcome.src = playerSelectURL;
    computerOutcome.src = computerSelectURL;
    playerOutcome.style.display = "block";
    computerOutcome.style.display = "block";
    if (whosePoint) whosePoint.innerText = Number(whosePoint.innerText) + 1;
}

function resetGame(whichButton, computerPoints, playerPoints, noOfPoints, whoWin, computerOutcome, playerOutcome) {
    computerPoints.innerText = noOfPoints;
    playerPoints.innerText = noOfPoints;
    if (whichButton === 'restart' || whichButton === 'quit') {
        computerOutcome.style.display = "none";
        playerOutcome.style.display = "none";
    }
    whoWin.style.visibility = "hidden";
}

function decide(playerSelect) {
    const randomNumber = Math.floor(Math.random() * 3);
    const computerSelect = computerOptions[randomNumber];
    const computerSelectURL = choices[computerSelect];
    const playerSelectURL = choices[playerSelect];

    if (Number(computerPoints.innerText) < 5 && Number(playerPoints.innerText) < 5) {
        if ((playerSelect === 'paper' && computerSelect === 'rock') || (playerSelect === 'scissor' && computerSelect === 'paper') || (playerSelect === 'rock' && computerSelect === 'scissor')) {
            pointIncrement(playerOutcome, playerSelectURL, computerOutcome, computerSelectURL, playerPoints);
        }
        else if ((computerSelect === 'paper' && playerSelect === 'rock') || (computerSelect === 'scissor' && playerSelect === 'paper') || (computerSelect === 'rock' && playerSelect === 'scissor')) {
            pointIncrement(playerOutcome, playerSelectURL, computerOutcome, computerSelectURL, computerPoints);
        }
        else {
            pointIncrement(playerOutcome, playerSelectURL, computerOutcome, computerSelectURL, null);
        }

        if (Number(computerPoints.innerText) === 5 && Number(playerPoints.innerText) < 5) {
            whoWin.innerText = "Computer Won!!!";
            whoWin.style.visibility = "visible";
        }
        else if (Number(playerPoints.innerText) === 5 && Number(computerPoints.innerText) < 5) {
            whoWin.innerText = "Hurrahh! You Won!!!";
            whoWin.style.visibility = "visible";
        }
        else if (Number(playerPoints.innerText) === 5 && Number(computerPoints.innerText) === 5) {
            whoWin.innerText = "Tied";
            whoWin.style.visibility = "visible";
        }
    }
}


startButton.addEventListener('click', () => {
    gameStart = true;
    const noOfPoints = '0';
    resetGame('start', computerPoints, playerPoints, noOfPoints, whoWin);
});

restartButton.addEventListener('click', () => {
    if (gameStart) {
        const noOfPoints = '0';
        resetGame('restart', computerPoints, playerPoints, noOfPoints, whoWin, computerOutcome, playerOutcome);
    }
});

quitButton.addEventListener('click', () => {
    gameStart = false;
    const noOfPoints = '_';
    resetGame('quit', computerPoints, playerPoints, noOfPoints, whoWin, computerOutcome, playerOutcome);
});

playerChoice.addEventListener('click', (e) => {
    if (gameStart && computerOptions.includes(e.target.className)) {
        decide(e.target.className);
    }
});