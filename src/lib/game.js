export default function Game(p1, p2) {
  // let winner;
  const players = [p1, p2];
  let currentBoard;
  let history = [];
  let head;
  // let future;

  const getCurrentPlayer = () => players[0];
  const getPreviousPlayer = () => players[1];
  const switchCurrentPlayer = () => players.reverse();
  const getCurrentBoard = () => currentBoard;
  const setCurrentBoard = (newBoard) => (currentBoard = newBoard);
  const getHistory = () => history;
  const decHead = () => {
    if (history[head - 1] != undefined) {
      head--;
    }
  };
  const incHead = () => {
    if (history[head + 1] != undefined) {
      head++;
    }
  };
  const getHead = () => head;
  const addToHistory = () => {
    history.push(JSON.parse(JSON.stringify(currentBoard)));
    head = history.length - 1;
  };

  const checkWinner = () => {
    const board = currentBoard.flat();
    const WINNING_PATTERNS = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    const winner = WINNING_PATTERNS.find((pattern) =>
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

  function setInitialBoard() {
    let initialBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    currentBoard = initialBoard;
  }

  // On Create
  setInitialBoard();
  return {
    currentPlayer: getCurrentPlayer,
    switchPlayer: switchCurrentPlayer,
    board: getCurrentBoard,
    setBoard: setCurrentBoard,
    resetBoard: setInitialBoard,
    checkWinner: checkWinner,
    history: getHistory,
    updateHistory: addToHistory,
    getHead: getHead,
    incHead: incHead,
    // LOL Dickhead! hahaha
    decHead: decHead,
  };
}
