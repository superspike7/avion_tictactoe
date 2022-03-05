export default function TimeTravel(gameState) {
  const initialRender = () => {
    const container = document.createElement("div");
    container.classList.add("flex", "gap-4", "justify-center", "mb-16");

    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.addEventListener("click", () => {
      gameState.decHead();
      gameState.setBoard(gameState.history()[gameState.getHead()]);
      console.log("history: ", gameState.history());
      console.log("current: ", gameState.board());
    });

    const reset = document.createElement("button");
    reset.addEventListener("click", () => {
      gameState.resetBoard();
      console.log("current: ", gameState.board());
    });
    reset.textContent = "Reset";

    const next = document.createElement("button");
    next.addEventListener("click", () => {
      gameState.incHead();
      gameState.setBoard(gameState.history()[gameState.getHead()]);
      console.log("history: ", gameState.history());
      console.log("current: ", gameState.board());
    });
    next.textContent = "Next";

    [prev, reset, next].forEach((button) => {
      button.classList.add("text-xl", "hover:text-gray-800", "hover:underline");
    });

    container.append(prev, reset, next);
    document.querySelector("#root").appendChild(container);
  };

  return {
    initialRender: initialRender,
  };
}
