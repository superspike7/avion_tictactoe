import Board from "./components/board.js";
import Player from "./lib/player.js";
import Game from "./lib/game.js";
import TimeTravel from "./components/timeTravel.js";
import Observable from "./lib/observer.js";

window.onload = () => {
  const playerOne = Player("X");
  const playerTwo = Player("O");
  const newGame = Game(playerOne, playerTwo);

  const observer = Observable();
  const renderHandler = () => {
    boardComponent.render();
  };
  observer.subscribe(renderHandler);

  const timeTravelComponent = TimeTravel(newGame, observer);
  timeTravelComponent.initialRender();

  const boardComponent = Board(newGame);
  boardComponent.initialRender();
};
