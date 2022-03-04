import Board from "./components/board.js";
import Player from "./lib/player.js";
import Game from "./lib/game.js";

window.onload = () => {
  const playerOne = Player("X");
  const playerTwo = Player("O");
  const newGame = Game(playerOne, playerTwo);

  const boardComponent = Board(newGame);
  boardComponent.initialRender();
};
