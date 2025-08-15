const buttons = document.querySelectorAll(".choice-btn");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.id;
    const computerChoice = computerPlay();
    const result = playRound(playerChoice, computerChoice);
    resultEl.textContent = result;

    // Highlight choices
    highlightChoice(playerChoice, computerChoice, result);
  });
});

function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return `It's a tie! You both chose ${playerSelection}`;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    return `You win! ${playerSelection} beats ${computerSelection}`;
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

// Highlight winner's button briefly
function highlightChoice(playerChoice, computerChoice, result) {
  // Remove previous highlights
  buttons.forEach(btn => btn.classList.remove("winner", "loser"));

  const playerBtn = document.getElementById(playerChoice);
  const computerBtn = document.getElementById(computerChoice);

  if (result.includes("win")) {
    playerBtn.classList.add("winner");
    computerBtn.classList.add("loser");
  } else if (result.includes("lose")) {
    computerBtn.classList.add("winner");
    playerBtn.classList.add("loser");
  } else {
    playerBtn.classList.add("tie");
    computerBtn.classList.add("tie");
  }

  // Remove highlight after 1 second
  setTimeout(() => {
    buttons.forEach(btn => btn.classList.remove("winner", "loser", "tie"));
  }, 1000);
}

// Reset game
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultEl.textContent = "Game reset. Make your move!";
});
