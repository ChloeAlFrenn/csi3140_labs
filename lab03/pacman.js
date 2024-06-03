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
  gameBoard[ghostIndex] = "^.";

  // Generate a random number of fruits between 1 and n-2
  let numFruits = Math.floor(1 + Math.random() * (n - 2));

  // Place the fruits
  for (let i = 0; i < numFruits; i++) {
    let fruitIndex;
    do {
      fruitIndex = Math.floor(Math.random() * n);
    } while (
      fruitIndex === pacmanIndex ||
      fruitIndex === ghostIndex ||
      gameBoard[fruitIndex] === "@"
    );
    gameBoard[fruitIndex] = "@";
  }

  return gameBoard;
}

console.log(createGame(10));
