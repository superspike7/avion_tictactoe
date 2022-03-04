export default function Game(p1, p2) {
  // let winner;
  const players = [p1, p2];
  let currentBoard;

  const getCurrentPlayer = () => players[0];
  const getPreviousPlayer = () => players[1];
  const switchCurrentPlayer = () => players.reverse();
  const getCurrentBoard = () => currentBoard;
  const setCurrentBoard = (newBoard) => (currentBoard = newBoard);

  const checkWinner = () => {
    const board = currentBoard.flat();
    const winning_patterns = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    const winner = winning_patterns.find((pattern) =>
      pattern.every((cell) => cell === getPreviousPlayer().marker())
    );

    const staleMate = board.every((cell) => cell !== "");

    if (winner) {
      return winner;
    } else if (!winner && staleMate) {
      return "Draw";
    }

    return false;
  };

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
    switchPlayer: switchCurrentPlayer,
    board: getCurrentBoard(),
    setBoard: setCurrentBoard,
    resetBoard: resetBoard,
    checkWinner: checkWinner,
  };
}
