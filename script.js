const buttons = document.querySelectorAll(".button-image");

buttons.forEach(selectedBtn => 
    selectedBtn.addEventListener('click', event => {
        removeElements(".round-text");
        resetFist();
        game((event.target.id).toUpperCase());
    }));
        

let computerScore = 0, playerScore = 0;

function game(playerSelection) {

    if (computerScore < 5 && playerScore < 5) {
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);

        changeFistImage(result, computerSelection, playerSelection);

        const roundText = document.createElement("h2");
        roundText.setAttribute("class", "round-text");

        if (result === "lose") {
            roundText.textContent = `You lose! ${computerSelection} beats ${playerSelection}.`;
            computerScore++;
            updateScore("#computer_score", computerScore);
        } else if (result === "win") {
            roundText.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
            playerScore++;
            updateScore("#player_score", playerScore);
        } else {
            roundText.textContent = "It's a tie!";
        }

        appendChild("#text-result", roundText);
    }

    if (computerScore === 5 || playerScore === 5) {
        if (!document.querySelector(".playAgainButton")) {
            removeElements(".round-text");
            if (playerScore > computerScore) {
                updateScore("#player_score", playerScore);
            } else {
                updateScore("#computer_score", computerScore);
            }
            displayFinalResult(playerScore, computerScore);
        }
    }
}

function updateScore(query, score) {
    const selectedQuery = document.querySelector(query);
    selectedQuery.textContent = score;
}

function appendChild(element, AppendedElement) {
    const container = document.querySelector(element);
    container.appendChild(AppendedElement);
}

function removeElements(element) {
    if (document.querySelectorAll(element)) {
        const allElements = document.querySelectorAll(element);
        allElements.forEach(element => element.remove());
    }
}

function changeFistImage(roundResult, computerSelection, playerSelection) {
    removeElements(".fist");

    const handLeft = document.createElement("img");
    const handRight = document.createElement("img");

    handLeft.src = `./images/hand-${playerSelection.toLowerCase()}-left.png`;
    handRight.src = `./images/hand-${computerSelection.toLowerCase()}-right.png`;

    handLeft.setAttribute("class", "hand");
    handRight.setAttribute("class", "hand");

    if (roundResult === "win") {
        handLeft.classList.add("win");
        handRight.classList.add("lose");

    } else if (roundResult === "lose") {
        handLeft.classList.add("lose");
        handRight.classList.add("win");

    } else {
        handLeft.classList.add("tie");
        handRight.classList.add("tie");
    }
    
    appendChild(".selection", handLeft);
    appendChild(".selection", handRight);

    const selectionDiv = document.querySelector(".selection");
    selectionDiv.addEventListener('animationend', resetFist);
}

function resetFist() {
    removeElements(".hand");

    if (!document.querySelector(".fist")) {
    const fistLeft = document.createElement("img");
    const fistRight = document.createElement("img");

    fistLeft.src = `./images/fist-left.png`;
    fistRight.src = `./images/fist-right.png`;

    fistLeft.setAttribute("class", "fist");
    fistRight.setAttribute("class", "fist");

    appendChild(".selection", fistLeft);
    appendChild(".selection", fistRight);
    }
}

function playRound(playerSelection, computerSelection) {
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

function displayFinalResult(playerScore, computerScore) {
    let finalResult = "Defeat!"

    if (playerScore > computerScore) {
        finalResult = "Victory!";
    }

    const paragraph = document.createElement("p");
    paragraph.setAttribute("class", "finalResult");
    paragraph.textContent = "Victory!";

    const playAgain = document.createElement("button");
    playAgain.setAttribute("class", "playAgainButton");
    playAgain.textContent = "PLAY AGAIN";

    appendChild("#text-result", paragraph);
    appendChild("#text-result", playAgain);

    const resetButton = document.querySelector(".playAgainButton");
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    resetFist();
    computerScore = 0; playerScore = 0;
    updateScore("#computer_score", computerScore);
    updateScore("#player_score", playerScore);

    document.querySelector(".playAgainButton").remove();
    document.querySelector(".finalResult").remove();
}