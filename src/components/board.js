export default function Board(board) {
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

  function squareHandler(e, player) {
    console.log("e: ", e.target, "player: ", player);
  }

  board.forEach((row) => {
    row.forEach((cell) => {
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
      square.addEventListener("click", squareHandler);
      square.textContent = cell;
      grid.appendChild(square);
    });
  });

  const render = () => {
    const selectedContainer = document.querySelector("#root");
    selectedContainer.innerHTML = "";
    selectedContainer.appendChild(grid);
  };
  return { render };
}
