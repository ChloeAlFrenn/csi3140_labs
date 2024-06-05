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
  };
}

function getPacmanIndex(game) {
  return game.board.indexOf("C");
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

let game = createGame(10);
console.log("Initial Board:", game.board, "Score:", game.score);

game = moveLeft(game);
console.log("After moveLeft:", game.board, "Score:", game.score);

game = moveRight(game);
console.log("After moveRight:", game.board, "Score:", game.score);
