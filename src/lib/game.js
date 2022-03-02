export default function Game() {
  // let winner;
  let currentPlayer;
  let currentBoard;

  const getCurrentPlayer = () => currentPlayer;
  const getCurrentBoard = () => currentBoard;
  const setCurrentPlayer = (nextPlayer) => (currentPlayer = nextPlayer);
  const setCurrentBoard = (newBoard) => (currentBoard = newBoard);

  // On Create
  const resetBoard = (function setInitialBoard() {
    let initialBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    currentBoard = initialBoard;
  })();

  return {
    currentPlayer: getCurrentPlayer,
    setCurrentPlayer: setCurrentPlayer,
    board: getCurrentBoard(),
    setBoard: setCurrentBoard,
    resetBoard: resetBoard,
  };
}
