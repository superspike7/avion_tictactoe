export default function Board(gameState) {
  const squareHandler = (e) => {
    const [row, col] = JSON.parse(e.target.dataset.position);
    gameState.board()[row][col] = gameState.currentPlayer().marker();
    gameState.switchPlayer();
    if (gameState.history().length - gameState.getHead() > 1) {
      gameState.spliceHistory();
    }
    gameState.updateHistory();
    gameState.checkWinner();
    gameState.setHistoryLog({ move: [row, col] });
    gameState.notify();
  };

  const initialRender = () => {
    const grid = document.createElement("div");
    grid.classList.add(
      "grid",
      "mx-auto",
      "w-[35%]",
      "h-3/5",
      "grid-cols-3",
      "grid-rows-3",
      "gap-8"
    );

    gameState.board().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const square = document.createElement("div");
        square.classList.add(
          "text-8xl",
          "flex",
          "justify-center",
          "items-center",
          "h-full",
          "w-full",
          "cursor-pointer",
          "font-bold",
          "nm-concave-slate-100-xs",
          "hover:nm-convex-red-500-sm",
          "rounded-full"
        );
        square.setAttribute("data-position", `[${rowIndex}, ${colIndex}]`);
        square.addEventListener("click", squareHandler);
        square.textContent = cell;
        grid.appendChild(square);
      });
    });

    const container = document.querySelector("#root");
    container.appendChild(grid);
  };

  const render = () => {
    document.querySelectorAll("[data-position]").forEach((square) => {
      const [row, col] = JSON.parse(square.dataset.position);
      square.textContent = gameState.board()[row][col];

      if (square.textContent != "" || gameState.checkWinner()) {
        square.removeEventListener("click", squareHandler);
        square.classList.remove("cursor-pointer", "hover:nm-convex-red-500-sm");
      } else {
        square.addEventListener("click", squareHandler);
        square.classList.add("cursor-pointer", "hover:nm-convex-red-500-sm");
      }
    });
  };

  return { initialRender, render };
}
