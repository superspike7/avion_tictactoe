export default function Game(p1, p2) {
  const players = [p1, p2];
  let currentBoard;
  let history = [];
  let copiedHistory = [];
  let head = 0;

  const getCurrentPlayer = () => players[0];
  const getPreviousPlayer = () => players[1];
  const switchCurrentPlayer = () => players.reverse();
  const getCurrentBoard = () => currentBoard;
  const decHead = () => {
    if (history[head - 1] != undefined) {
      head--;
      return true;
    } else {
      return false;
    }
  };
  const incHead = () => {
    if (history[head + 1] != undefined) {
      head++;
      return true;
    } else {
      return false;
    }
  };
  const getHead = () => head;
  const resetHead = () => (head = 0);
  const getHistory = () => history;
  const copyHistory = () => {
    copiedHistory = JSON.parse(JSON.stringify(history));
  };
  const resetHistory = () => (history = []);
  const checkoutHistory = () => (currentBoard = history[head]);
  const addToHistory = () => {
    history.push(JSON.parse(JSON.stringify(currentBoard)));
    head = history.length - 1;
  };
  const spliceHistory = () => {
    const copy = [...copiedHistory];
    copy.splice(head + 1);
    history = copy;
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
      return winner[0];
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
    checkoutHistory: checkoutHistory,
    resetBoard: setInitialBoard,
    checkWinner: checkWinner,
    history: getHistory,
    copyHistory: copyHistory,
    updateHistory: addToHistory,
    resetHistory: resetHistory,
    spliceHistory: spliceHistory,
    getHead: getHead,
    incHead: incHead,
    // LOL Dickhead! hahaha
    decHead: decHead,
    resetHead: resetHead,
  };
}
