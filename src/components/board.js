export default function Board(gameState) {
  const initialRender = () => {
    const grid = document.createElement("div");
    grid.classList.add(
      "grid",
      "mx-auto",
      "bg-gray-900",
      "w-[35%]",
      "h-3/5",
      "grid-cols-3",
      "grid-rows-3",
      "gap-1"
    );

    gameState.board().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const square = document.createElement("div");
        square.classList.add(
          "bg-gray-100",
          "text-8xl",
          "flex",
          "justify-center",
          "items-center",
          "h-full",
          "w-full",
          "cursor-pointer"
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

  function squareHandler(e) {
    const [row, col] = JSON.parse(e.target.dataset.position);
    // e.target.removeEventListener;
    // e.target.classList.remove("cursor-pointer");
    gameState.board()[row][col] = gameState.currentPlayer().marker();
    gameState.switchPlayer();
    gameState.updateHistory();
    render();
    console.log(gameState.checkWinner());
  }

  const render = () => {
    document.querySelectorAll("[data-position]").forEach((square) => {
      const [row, col] = JSON.parse(square.dataset.position);
      square.textContent = gameState.board()[row][col];
    });
  };

  return { initialRender, render };
}
