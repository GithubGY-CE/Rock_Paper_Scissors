

function game() {
    let win = 0, lose = 0 , tie = 0;

    while (win < 5 && lose <  5) {
        const playerSelection = prompt("Enter Rock, Paper, or Scissors", "").toUpperCase();
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);

        if (result === "lose") {
            console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
            lose++;
        } else if (result === "win") {
            console.log(`You win! ${playerSelection} beats ${computerSelection}`);
            win++;
        } else {
            console.log("It's a tie!");
            tie++;
        }
        
    }

    displayResult(win, lose, tie);
}

function playRound(playerSelection, computerSelection) {
    
    playerSelection.toLowerCase(); 

    if (playerSelection === computerSelection) {
        return "tie";
    } else if (
        (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (playerSelection === "PAPER" && computerSelection === "ROCK") ||
        (playerSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        return "win";
    } else {
        return "lose";
    }
}

function getComputerChoice() {
    let choices = ["ROCK", "PAPER", "SCISSORS"];
    return choices[Math.floor(Math.random() * choices.length)]; 
} 

function displayResult(win, lose, tie) {

        if (win > lose) {
            finalResult = "You win!";
        } else {
            finalResult = "You lose!";
        }

    console.log(
        `${finalResult}
         Ties: ${tie}
         Wins: ${win}
         Losses: ${lose}`
        )
}