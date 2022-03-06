import Board from "./components/board.js";
import TimeTravel from "./components/timeTravel.js";
import Announcer from "./components/announcer.js";
import HistoryLog from "./components/historyLog.js";

import Player from "./lib/player.js";
import Game from "./lib/game.js";
import Observable from "./lib/observer.js";

window.onload = () => {
  // Initial Objects/States
  const playerOne = Player("X");
  const playerTwo = Player("O");
  const newGame = Game(playerOne, playerTwo);
  const observer = Observable();

  const componentRenderHandlers = () => {
    boardComponent.render();
    timeTravelComponent.render();
    announcerComponent.render();
    historyLogComponent.render();
  };

  observer.subscribe(componentRenderHandlers);

  // View Components
  const announcerComponent = Announcer(newGame);
  const historyLogComponent = HistoryLog(newGame);
  const timeTravelComponent = TimeTravel(newGame, observer);
  const boardComponent = Board(newGame, observer);

  announcerComponent.initialRender();
  historyLogComponent.initialRender();
  timeTravelComponent.initialRender();
  boardComponent.initialRender();
};
