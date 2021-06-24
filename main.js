//console.log("Hello, ding dong!");
/*
TODO list

For now, remove the logic that plays exactly five rounds.
Create three buttons, one for each selection. Add an event listener to the buttons that calls your playRound function with the correct playerSelection every time a button is clicked. (you can keep the console.logs for this step)
Add a div for displaying results and change all of your console.logs into DOM methods.
Display the running score, and announce a winner of the game once one player reaches 5 points.
*/
let moves = ['rock','paper','scissors']
let outcomes = ['win','lose','draw'];
let outcomeVerbs = ['crushes','covers','cuts'];

function computerPlay() {
    return Math.floor(Math.random()*3);
}

function formatMove(moveTxt) {
    return moveTxt.slice(0,1).toUpperCase()+moveTxt.substr(1);
}

function resolveRound(playerSelection,computerSelection) {
    let roundOutcome, roundVerb;

    switch (playerSelection) {
        case (moves[0]):
            switch (computerSelection) {
                case (moves[0]):
                    roundOutcome = outcomes[2];
                    break;
                case (moves[1]):
                    roundOutcome = outcomes[1];
                    roundVerb = outcomeVerbs[1];
                    break;
                case (moves[2]):
                    roundOutcome = outcomes[0];
                    roundVerb = outcomeVerbs[0];
                    break;
            }
        break;
        case (moves[1]):
            switch (computerSelection) {
                case (moves[0]):
                    roundOutcome = outcomes[0];
                    roundVerb = outcomeVerbs[1];
                    break;
                case (moves[1]):
                    roundOutcome = outcomes[2];
                    break;
                case (moves[2]):
                    roundOutcome = outcomes[1];
                    roundVerb = outcomeVerbs[2];
                    break;
            }
        break;
        case (moves[2]):
            switch (computerSelection) {
                case (moves[0]):
                    roundOutcome = outcomes[1];
                    roundVerb = outcomeVerbs[0];
                    break;
                case (moves[1]):
                    roundOutcome = outcomes[0];
                    roundVerb = outcomeVerbs[2];
                    break;
                case (moves[2]):
                    roundOutcome = outcomes[2];
                    break;
            }
        break;
    }
    
    let roundResult =``;

    if (roundOutcome == outcomes[0]) {
        roundResult = `${playerSelection} ${roundVerb} ${computerSelection}!`;
    } else if (roundOutcome == outcomes[1]) {
        roundResult = `${computerSelection} ${roundVerb} ${playerSelection}!`;
    }
    
    return roundOutcome + '. ' + roundResult.slice(0,1).toUpperCase() + roundResult.substr(1) + '\n';
}

function playRound(move) {
    let playerMove = moves[move];
    let computerMove = moves[computerPlay()];

    console.log(`You played:\t${playerMove}`);
    console.log(`CPU played:\t${computerMove}`);

    let roundMessage = `You ${resolveRound(playerMove,computerMove)}\n`;

    postRoundResult(playerMove, computerMove, roundMessage);

    let roundWin = roundMessage.indexOf('win');
    let roundDraw = roundMessage.indexOf('draw');

    if (roundWin !== -1) {
        return 1;
    } else if (roundDraw !== -1) {
        return 0;
    } else {
        return -1;
    }

}

function updateScore(result) {
    switch (result) {
        case -1:
            cpuWins++;
            break;
        case 1:
            playerWins++;
            break;
    }
    round++;
    postScores();

    if (cpuWins == maxWins || playerWins == maxWins) {
        declareWinner();
    }
}

function postScores() {
    playerScore.textContent = playerWins;
    cpuScore.textContent = cpuWins;
}


function postRoundResult(player, cpu, message) {
    const results = document.createElement("div");
    results.classList.add("results");

    const roundCount = document.createElement("div");
    roundCount.classList.add("bold");
    roundCount.textContent = `Round ${round}:`;

    const roundResultMessage = document.createElement("div");
    const move1 = document.createElement("div");
    const move2 = document.createElement("div");
    const msg = document.createElement("div");
    
    move1.textContent = `You played: ${player}.`;
    move2.textContent = `CPU played: ${cpu}.`;
    msg.textContent = `${message}`;
    msg.classList.add("bold");

    roundResultMessage.appendChild(roundCount);
    roundResultMessage.appendChild(move1);
    roundResultMessage.appendChild(move2);
    roundResultMessage.appendChild(msg);
    results.appendChild(roundResultMessage);

    roundResults.appendChild(results);
}

function declareWinner() {
    const winArea = document.querySelector(".winArea");
    const winner = document.createElement("div");
    winner.classList.add("gameWinner");
    let winMsg = (cpuWins > playerWins) ? "You lose! Better luck next time." : "You win! Congratulations!";
    winner.textContent = `${winMsg}`;
    winArea.appendChild(winner);
    gameOver = true;
    disableButtons();
}

function disableButtons() {
    const buttons = document.querySelectorAll(".playButtons .button");
    buttons.forEach( (button) => {
        button.classList.add("disabled");
    })
}


const buttonRock = document.querySelector("#btnRock");
buttonRock.addEventListener("click", function() {
    if (!gameOver) {
        let result = playRound(0);
        updateScore(result);
    }
});

const buttonPaper = document.querySelector("#btnPaper");
buttonPaper.addEventListener("click", function() {
    if (!gameOver) {
        let result = playRound(1);
        updateScore(result);
    }
});

const buttonScissors = document.querySelector("#btnScissors");
buttonScissors.addEventListener("click", function() {
    if (!gameOver) {
        let result = playRound(2);
        updateScore(result);
    }
});


let gameOver = false;
let round = 1;
let maxWins = 5;
let playerWins = 0;
let cpuWins = 0;

const playerScore = document.querySelector("#playerScore");
const cpuScore = document.querySelector("#cpuScore");
const roundResults = document.querySelector(".roundResults");
