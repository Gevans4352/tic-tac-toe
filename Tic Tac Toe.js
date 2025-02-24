// get all the dom nodes needed for the project
const Submit = document.getElementById("Submit");
const enterPlayer = document.getElementById("enterPlayer");
const usernameInput = document.getElementById("username-2");
const gameBoxes = Array.from(document.querySelectorAll(".item"));
const playerForms = document.querySelectorAll(".Player-forms");
const form = document.getElementById("Players");
const userInput = document.getElementById("userInput");
const Results = document.getElementById("Results");
const resetButton = document.getElementById("resetButton");
const playerSelection = document.getElementById("playerSelection");
const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");
const countdown = document.getElementById("countdown");

let playerTurn = "";

//You will loop it
// const playerNames = {
//   first:"" ,
//   second:""
// }

let gameBoard = Array(9).fill(null); //["","",""]
let currentPlayer = "X";

let gameActive = true;

let winner = "";
// const TIE = "TIE";
timeLeft = 3;

function countdownTimer() {
  timeLeft--;
  countdown.innerHTML = String(timeLeft);
  if (timeLeft > 0) {
    setTimeout(countdownTimer, 1000);
  }
  if (timeLeft === 0) {
    countdown.style.display = "none";
  }
}

// the board

const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let firstPlayerName = "";
let secondPlayerName = "";
let fname = "";

function resetUsernameInput() {
  userInput.value = "";
}

Submit.addEventListener("click", function () {
  if (userInput.value == "" || userInput.value.trim() == "") {
    alert("Enter player name");
    return;
  }

  if (!firstPlayerName && !secondPlayerName) {
    firstPlayerName = userInput.value;
    alert("Select which team you want");
    enterPlayer.textContent = "Enter Player 2: ";
  } else if (!secondPlayerName && firstPlayerName) {
    secondPlayerName = userInput.value;
    document.getElementById("Players").style.display = "none";
  }
  resetUsernameInput();
});

gameBoxes.forEach((val, idx) => {
  val.addEventListener(
    "click",
    function () {
      if (!firstPlayerName || !secondPlayerName) {
        alert("2 player name needed");
      } else {
        debugger;
        val.textContent = playerTurn;
        gameBoard[idx] = val.textContent;
        if (checkWinner()) {
          Results.style.display = "block";
          setTimeout(() => {
            alert(`${winner} wins`);
          }, 10);
        }
        playerTurn = playerTurn == "X" ? "O" : "X";
      }
    },
    { once: true }
  );
});

function checkWinner() {
  return winningCondition.some(function (val) {
    const [pos1, pos2, pos3] = val;
    if (
      gameBoard[pos1] &&
      gameBoard[pos1] == gameBoard[pos2] &&
      gameBoard[pos1] == gameBoard[pos3]
    ) {
      debugger;
      winner = gameBoard[pos1] == "X" ? firstPlayerName : secondPlayerName;
      return true;
    } else {
      return false;
    }
  });
}

startButton.addEventListener("click", function () {
  countdown.style.display = "block";
  setTimeout(countdownTimer, 1000);
  document.getElementById("playerSelection").classList.remove("hidden");
  startButton.disabled = true;
});

playerX.addEventListener("click", function () {
  // playerTurn = "X";
  if (!playerTurn) {
    playerTurn = "X";
  } else {
    playerTurn === "X" ? "X" : !playerTurn ? "X" : "O";
  }
  playerSelection.classList.add("hidden");
  document.getElementById("playerX").style.display = "none";
});

playerO.addEventListener("click", function () {
  if (!playerTurn) {
    playerTurn = "O";
  } else {
    playerTurn === "O" ? "O" : !playerTurn ? "O" : "X";
  }
  playerSelection.classList.add("hidden");
  document.getElementById("playerO").style.display = "none";
});

resetButton.onclick = function reset() {
  document.getElementById("playerO").style.display = "block";
  document.getElementById("playerX").style.display = "block";
  gameBoxes.forEach((box) => (box.textContent = ""));
  debugger;
  document.getElementById("Players").style.display = "";
  Results.style.display = "none";
  window.location.reload();
};
