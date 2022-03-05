export default function TimeTravel(gameState, observer) {
  const initialRender = () => {
    const container = document.createElement("div");
    container.classList.add("flex", "gap-4", "justify-center", "mb-16");

    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.addEventListener("click", () => {
      if (gameState.decHead()) {
        // gameState.decHead();
        gameState.setBoard(gameState.history()[gameState.getHead()]);
        observer.notify();
      }
    });

    const reset = document.createElement("button");
    reset.addEventListener("click", () => {
      gameState.resetHistory();
      gameState.resetBoard();
      observer.notify();
    });
    reset.textContent = "Reset";

    const next = document.createElement("button");
    next.addEventListener("click", () => {
      if (gameState.incHead()) {
        gameState.setBoard(gameState.history()[gameState.getHead()]);
        observer.notify();
      }
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
