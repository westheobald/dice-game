"use strict";

let playerCount;

let playerTurn;
let roundScore;
let totalScore;

let player1Score;
let player2Score;
let player3Score;
let player4Score;

// SELECT AMOUNT OF PLAYERS
document.querySelector("#twoPlayers").addEventListener("click", function () {
  document.getElementById("title").classList.add("hidden");
  selectPlayers(2);
  playerCount = 2;
  document.getElementById("gameWindow").style.maxWidth = "600px";
  turnIndicator();
});

document.querySelector("#threePlayers").addEventListener("click", function () {
  document.getElementById("title").classList.add("hidden");
  selectPlayers(3);
  playerCount = 3;
  document.getElementById("gameWindow").style.maxWidth = "1000px";
  turnIndicator();
});

document.querySelector("#fourPlayers").addEventListener("click", function () {
  document.getElementById("title").classList.add("hidden");
  selectPlayers(4);
  playerCount = 4;
  document.getElementById("gameWindow").style.maxWidth = "1400px";
  turnIndicator();
});

function selectPlayers(amountOfPlayers) {
  playerTurn = 1;
  roundScore = 0;
  totalScore;

  player1Score = 0;
  player2Score = 0;
  player3Score = 0;
  player4Score = 0;

  let gameWindow = document.querySelector("#gameWindow");
  while (gameWindow.getElementsByTagName("div")[2]) {
    gameWindow.removeChild(gameWindow.getElementsByTagName("div")[2]);
  }
  for (let i = 0; i < amountOfPlayers; i++) {
    let div = document.createElement("div");
    div.setAttribute("id", `player${i + 1}`);
    document.getElementById("gameWindow").appendChild(div);

    let playerBarBackground = document.createElement("div");
    playerBarBackground.classList.add("playerBar");

    document.getElementById(`player${i + 1}`).appendChild(playerBarBackground);

    let eachPlayerBar = document.createElement("div");
    eachPlayerBar.classList.add("scores");
    eachPlayerBar.setAttribute("id", `player${i + 1}Score`);
    playerBarBackground.appendChild(eachPlayerBar);
  }
  document.querySelector("#choosePlayers").classList.add("hidden");
  document.getElementById("gameWindow").classList.remove("hidden");
}

document.querySelector("#changePlayers").addEventListener("click", function () {
  document.querySelector("#choosePlayers").classList.remove("hidden");
  document.getElementById("gameWindow").classList.add("hidden");
    document.getElementById("title").classList.remove("hidden");

});

function turnIndicator() {
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById(
    "turnIndicator"
  ).textContent = `Player ${playerTurn}'s turn.`;
  document.getElementById("turnIndicator").classList.remove("hidden");
  document.getElementById("turnIndicator").style.zIndex = "3";
  document.getElementById("gameWindow").style.zIndex = "-1";

  document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("turnIndicator").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("gameWindow").style.zIndex = "";
    return;
  });

  setTimeout(function () {
    document.getElementById("turnIndicator").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("gameWindow").style.zIndex = "";
  }, 1500);
}

document.querySelector("#roll").addEventListener("click", function () {
  let diceRoll = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  console.log(diceRoll);
  document
    .getElementById("dice")
    .setAttribute("src", `img/dice-${diceRoll}.png`);
  document.getElementById("dice").classList.remove("hidden");

  switch (playerTurn) {
    case 1:
      totalScore = player1Score;
      break;
    case 2:
      totalScore = player2Score;
      break;
    case 3:
      totalScore = player3Score;
      break;
    case 4:
      totalScore = player4Score;
      break;
  }

  if (diceRoll != 1) {
    roundScore += diceRoll;

    if (totalScore + roundScore >= 100) {
      victory();
    } else {
      document.getElementById(`player${playerTurn}Score`).style.height = `${
        roundScore + totalScore
      }%`;
      document.getElementById(`player${playerTurn}Score`).textContent =
        roundScore + totalScore;
    }
  } else {
    let audioObj = new Audio("audio/Bad.mp3");
    audioObj.play();
    roundScore = 0;
    document.getElementById(
      `player${playerTurn}Score`
    ).style.height = `${totalScore}%`;
    document.getElementById(
      `player${playerTurn}Score`
    ).textContent = totalScore;
    playerTurn != playerCount ? playerTurn++ : (playerTurn = 1);
    turnIndicator();
  }
});

document.querySelector("#hold").addEventListener("click", function () {
  switch (playerTurn) {
    case 1:
      player1Score += roundScore;
      document.getElementById(
        `player${playerTurn}Score`
      ).style.height = `${player1Score}%`;
      document.getElementById(
        `player${playerTurn}Score`
      ).textContent = player1Score;
      break;
    case 2:
      player2Score += roundScore;
      document.getElementById(
        `player${playerTurn}Score`
      ).style.height = `${player2Score}%`;
      break;
    case 3:
      player3Score += roundScore;
      document.getElementById(
        `player${playerTurn}Score`
      ).style.height = `${player3Score}%`;
      break;
    case 4:
      player4Score += roundScore;
      document.getElementById(
        `player${playerTurn}Score`
      ).style.height = `${player4Score}%`;
      break;
  }
  playerTurn != playerCount ? playerTurn++ : (playerTurn = 1);
  turnIndicator();

  roundScore = 0;
});

function victory() {
  let audioObj = new Audio("audio/victory.mp3");
  audioObj.play();
  document.getElementById(`player${playerTurn}Score`).style.height = "100%";
  document.getElementById(`player${playerTurn}Score`).textContent = 100;
  document.getElementById(
    `player${playerTurn}Score`
  ).style.borderTopLeftRadius = "10px";
  document.getElementById(
    `player${playerTurn}Score`
  ).style.borderTopRightRadius = "10px";

  document.getElementById("controls").classList.add("hidden");

  document.getElementById("victory").classList.remove("hidden");
  document.getElementById(
    "victorySpeech"
  ).textContent = `Player ${playerTurn} is the winner`;
}

document.querySelector("#newGame").addEventListener("click", function () {
  console.log("clicked");
  playerTurn = 1;
  roundScore = 0;
  totalScore;

  player1Score = 0;
  player2Score = 0;
  player3Score = 0;
  player4Score = 0;

  for (let i = 0; i < playerCount; i++) {
    document.getElementById(`player${i + 1}Score`).style.height = "0%";
    document.getElementById(`player${i + 1}Score`).textContent = "";
  }
  document.getElementById(
    "turnIndicator"
  ).textContent = `Player ${playerTurn}'s turn.`;
  document.getElementById("controls").classList.remove("hidden");
  document.getElementById("dice").classList.add("hidden");
  document.getElementById("victorySpeech").classList.add("hidden");
  document.getElementById("victory").classList.add("hidden");
});

document
  .getElementById("instructionButton")
  .addEventListener("click", function () {
    document.getElementById("instructions").classList.remove("hidden");
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("gameWindow").style.zIndex = "-1";
  });

document.querySelector(".closeWindow").addEventListener("click", function () {
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("gameWindow").style.zIndex = "";
});

document.querySelector("#closeVictory").addEventListener("click", function () {
  document.getElementById("victory").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("gameWindow").style.zIndex = "";
});

document.querySelector("#overlay").addEventListener("click", function () {
  document.getElementById("instructions").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("gameWindow").style.zIndex = "";
});
