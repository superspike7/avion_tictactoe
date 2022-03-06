import Board from "./components/board.js";
import TimeTravel from "./components/timeTravel.js";
import Announcer from "./components/announcer.js";

import Player from "./lib/player.js";
import Game from "./lib/game.js";
import Observable from "./lib/observer.js";

window.onload = () => {
  // Initial Objects/States
  const playerOne = Player("X");
  const playerTwo = Player("O");
  const newGame = Game(playerOne, playerTwo);
  const observer = Observable();

  // Lists of observer handlers
  const renderBoard = () => {
    boardComponent.render();
  };
  const renderTimeTravel = () => {
    timeTravelComponent.render();
  };
  const renderAnnouncer = () => {
    announcerComponent.render();
  };

  observer.subscribe(renderBoard);
  observer.subscribe(renderAnnouncer);
  observer.subscribe(renderTimeTravel);

  // View Components
  const announcerComponent = Announcer(newGame);
  const timeTravelComponent = TimeTravel(newGame, observer);
  const boardComponent = Board(newGame, observer);

  announcerComponent.initialRender();
  timeTravelComponent.initialRender();
  boardComponent.initialRender();
};
