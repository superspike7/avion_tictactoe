import Observable from "./observer.js";

export default function Game(p1, p2) {
  const observer = Observable();
  const players = [p1, p2];
  let currentBoard;
  let currentHistory = [];
  let copiedHistory = [];
  let head = 0;
  let historyLog;

  const currentPlayer = () => players[0];
  const getPreviousPlayer = () => players[1];
  const switchPlayer = () => players.reverse();
  const board = () => currentBoard;
  const getHead = () => head;
  const resetHead = () => (head = 0);
  const history = () => currentHistory;
  const cachedHistory = () => copiedHistory;
  const resetHistoryCopy = () => (copiedHistory = []);
  const resetHistory = (newHistory = []) => (currentHistory = newHistory);
  const checkoutHistory = () => (currentBoard = currentHistory[head]);
  const getHistoryLog = () => historyLog;

  const decHead = () => {
    if (currentHistory[head - 1] != undefined) {
      head--;
      return true;
    } else {
      return false;
    }
  };

  const incHead = () => {
    if (currentHistory[head + 1] != undefined) {
      head++;
      return true;
    } else {
      return false;
    }
  };

  const copyHistory = () => {
    copiedHistory = JSON.parse(JSON.stringify(currentHistory));
  };

  const updateHistory = () => {
    currentHistory.push(JSON.parse(JSON.stringify(currentBoard)));
    head = currentHistory.length - 1;
  };

  const spliceHistory = () => {
    const copy = [...copiedHistory];
    copy.splice(head + 1);
    currentHistory = copy;
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
      setHistoryLog({ winner: winner[0] });
      return `Winner is: ${winner[0]}!`;
    } else if (!winner && staleMate) {
      setHistoryLog({ draw: true });
      return "It's a Draw!";
    }

    return false;
  };

  const setHistoryLog = (status) => {
    const POSITION = [
      ["TOP-LEFT", "TOP", "TOP-RIGHT"],
      ["CENTER-LEFT", "CENTER", "CENTER-RIGHT"],
      ["BOTTOM-LEFT", "BOTTOM", "BOTTOM-RIGHT"],
    ];
    if (status.timeTravel) {
      historyLog = `${getPreviousPlayer().marker()} pressed ${
        status.timeTravel
      }`;
    }

    if (status.winner) {
      historyLog = `${status.winner} Won`;
    }

    if (status.draw) {
      historyLog = `Game Draw`;
    }

    if (status.move) {
      const [col, row] = status.move;
      historyLog = `${getPreviousPlayer().marker()} moved ${
        POSITION[col][row]
      }`;
    }
  };

  const resetBoard = () => {
    let initialBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    currentBoard = initialBoard;
  };

  // On Create
  resetBoard();
  return {
    ...observer,
    currentPlayer,
    switchPlayer,
    board,
    checkoutHistory,
    resetBoard,
    checkWinner,
    history,
    copyHistory,
    updateHistory,
    resetHistory,
    spliceHistory,
    getHead,
    incHead,
    decHead,
    resetHead,
    setHistoryLog,
    getHistoryLog,
    resetHistoryCopy,
    cachedHistory,
  };
}
