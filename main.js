//console.log("Hello, ding dong!");

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

function getPlayerInput() {
    let playerRawInput = prompt("Your move?", "Rock");
    let playerInput = playerRawInput.toLowerCase().trim(); 
    let playerMove = moves.indexOf(playerInput);
    if (playerMove >= 0 &&  playerMove < moves.length) {
        return playerMove;
    } else {
        console.log(`${playerRawInput} is not a valid move. Playing rock instead...`)
        return 0;
    }
}

function playRound(roundNumber) {
    let playerMove = moves[getPlayerInput()];
    let computerMove = moves[computerPlay()];

    console.log(`ROUND #${roundNumber}:`)
    console.log(`You played:\t${playerMove}`);
    console.log(`CPU played:\t${computerMove}`);

    let roundMessage = `You ${resolveRound(playerMove,computerMove)}\n`;
    console.log(roundMessage);

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

function game() {
    let cpuWonRounds = 0, playerWonRounds = 0;
    let numberOfRounds = 5;

    console.log(`~~~~~~~~~~~ Welcome friend, to Scissors, Rock, Paper! ~~~~~~~~~~~`);

    for (let i = 0; i < numberOfRounds; i++) {
        switch (playRound(i+1)) {
            case (-1):
                cpuWonRounds++;
                break;
            case (0):
                break;
            case (1):
                playerWonRounds++;
                break;
        }
    }

    console.log(`FINAL SCORE:\nYOU:\t${playerWonRounds}\nCPU:\t${cpuWonRounds}\n`);
    
    let results;
    if (playerWonRounds > cpuWonRounds) {
        results = `You win. Great job!`;
    } else if (cpuWonRounds > playerWonRounds) {
        results = `You lose. Better luck next time.`;
    } else {
        results = `How did that happen? Nobody wins!`;
    }

    console.log(results);
    console.log(`~~~~~~~~~~~ Game Over. Refresh (F5) to Play Again! ~~~~~~~~~~~`);
}

game();

