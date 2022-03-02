import Board from "./components/board.js";
import Player from "./lib/player.js";
import Game from "./lib/game.js";

window.onload = () => {
  const newGame = Game();
  const playerOne = Player("X");
  newGame.setCurrentPlayer(playerOne.marker);

  const boardComponent = Board(newGame);
  boardComponent.initialRender();
};
