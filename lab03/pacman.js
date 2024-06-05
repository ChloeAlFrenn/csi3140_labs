function createGame(n) {
  // Initialize an empty array of length n with pellets
  let gameBoard = new Array(n).fill(".");

  // Place Pacman
  let pacmanIndex = Math.floor(Math.random() * n);
  gameBoard[pacmanIndex] = "C";

  // Place the Ghost
  let ghostIndex;
  do {
    ghostIndex = Math.floor(Math.random() * n);
  } while (ghostIndex === pacmanIndex);
  gameBoard[ghostIndex] = "^";

  // Place the Fruit
  let fruitIndex;
  do {
    fruitIndex = Math.floor(Math.random() * n);
  } while (
    fruitIndex === pacmanIndex ||
    fruitIndex === ghostIndex ||
    gameBoard[fruitIndex] === "@"
  );
  gameBoard[fruitIndex] = "@";

  return {
    board: gameBoard,
    score: 0,
    pacmanIndex: pacmanIndex,
    ghostIndex: ghostIndex,
    intervalId: null
  };
}

function getPacmanIndex(game) {
  return game.board.indexOf("C");
}

function getGhostIndex(game) {
    return game.ghostIndex;
  }

function moveLeft(game) {
  let pacmanIndex = getPacmanIndex(game);
  if (pacmanIndex > 0) {
    if (game.board[pacmanIndex - 1] === ".") {
      game.score += 10;
    }
    game.board[pacmanIndex] = "-"; //removing the pellet
    game.board[pacmanIndex - 1] = "C";
    checkLevelCompletion(game);
  }
  return game;
}

function moveRight(game) {
  let pacmanIndex = getPacmanIndex(game);
  if (pacmanIndex < game.board.length - 1) {
    if (game.board[pacmanIndex + 1] === ".") {
      game.score += 10;
    }
    game.board[pacmanIndex] = "-";
    game.board[pacmanIndex + 1] = "C";
    checkLevelCompletion(game);
  }
  return game;
}

function checkLevelCompletion(game) {
  // Check if there are any pellets left on the board
  if (!game.board.includes(".")) {
    console.log("Level Completed!");
    resetBoard(game); // Reset the board for the next level
  }
}

function resetBoard(game) {
  let n = game.board.length;
  game.board = new Array(n).fill(".");

  // Place Pacman
  let pacmanIndex = Math.floor(Math.random() * n);
  game.board[pacmanIndex] = "C";

  // Place the Ghost
  let ghostIndex;
  do {
    ghostIndex = Math.floor(Math.random() * n);
  } while (ghostIndex === pacmanIndex);
  game.board[ghostIndex] = "^";

  // Place the Fruit
  let fruitIndex;
  do {
    fruitIndex = Math.floor(Math.random() * n);
  } while (
    fruitIndex === pacmanIndex ||
    fruitIndex === ghostIndex ||
    game.board[fruitIndex] === "@"
  );
  game.board[fruitIndex] = "@";

  console.log("New Level Started:", game.board);
}

function moveGhost(game) {
    let ghostIndex = getGhostIndex(game);
    let pacmanIndex = getPacmanIndex(game);
    let direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose to move left (-1) or right (1)
    let newGhostIndex = ghostIndex + direction;
  
    // Ensure the ghost stays within bounds and doesn't move into Pacman's position
    if (newGhostIndex >= 0 && newGhostIndex < game.board.length && newGhostIndex !== pacmanIndex) {
      game.board[ghostIndex] = "."; // Clear the ghost's previous position
      game.board[newGhostIndex] = "^"; // Move the ghost to the new position
      game.ghostIndex = newGhostIndex;
    }
  }
  
  function startGhostMovement(game) {
    game.intervalId = setInterval(() => moveGhost(game), 2000);
  }
  
  function stopGhostMovement(game) {
    clearInterval(game.intervalId);
  }

let game = createGame(10);
console.log("Initial Board:", game.board, "Score:", game.score);

startGhostMovement(game); // Start moving the ghost

game = moveLeft(game);
console.log("After moveLeft:", game.board, "Score:", game.score);

game = moveRight(game);
console.log("After moveRight:", game.board, "Score:", game.score);

// To stop the ghost movement after some time 
setTimeout(() => {
    stopGhostMovement(game);
    console.log("Stopped ghost movement.");
  }, 10000);