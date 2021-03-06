import Board from "./components/board.js";
import TimeTravel from "./components/timeTravel.js";
import Announcer from "./components/announcer.js";
import HistoryLog from "./components/historyLog.js";

import Player from "./lib/player.js";
import Game from "./lib/game.js";

window.onload = () => {
  // Initial Objects/States
  const playerOne = Player("X");
  const playerTwo = Player("O");
  const newGame = Game(playerOne, playerTwo);
  const websocket = new WebSocket("ws://127.0.0.1:8080/", "game");

  websocket.onopen = function () {
    websocket.send("open");
  };

  websocket.onmessage = function (event) {
    console.log("websocket: ", event.data);
  };

  const componentRenderHandlers = () => {
    boardComponent.render();
    timeTravelComponent.render();
    announcerComponent.render();
    historyLogComponent.render();
  };

  newGame.subscribe(componentRenderHandlers);

  // View Components
  const announcerComponent = Announcer(newGame);
  const historyLogComponent = HistoryLog(newGame);
  const timeTravelComponent = TimeTravel(newGame);
  const boardComponent = Board(newGame);

  announcerComponent.initialRender();
  historyLogComponent.initialRender();
  timeTravelComponent.initialRender();
  boardComponent.initialRender();
};
