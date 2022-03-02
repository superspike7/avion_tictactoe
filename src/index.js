import Board from "./components/board.js";
import Player from "./lib/player.js";

const boardState = [
  ["", "", "O"],
  ["", "", ""],
  ["", "", ""],
];

const playerOne = Player("X");
const playerTwo = Player("O");

const boardComponent = Board(boardState);

window.onload = () => {
  boardComponent.render();
};

console.log(playerOne.score());
playerOne.addScore();
console.log(playerOne.score());
