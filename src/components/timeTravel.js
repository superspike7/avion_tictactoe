export default function TimeTravel(gameState, observer) {
  const prevHandler = () => {
    if (gameState.decHead()) {
      gameState.switchPlayer();
      gameState.copyHistory();
      gameState.checkoutHistory();
      gameState.setHistoryLog("Undo", false);
      observer.notify();
    }
  };
  const resetHandler = () => {
    gameState.resetHistory();
    gameState.resetHead();
    gameState.resetBoard();
    gameState.setHistoryLog("Reset", false);
    observer.notify();
  };
  const nextHandler = () => {
    if (gameState.incHead()) {
      gameState.switchPlayer();
      gameState.checkoutHistory();
      gameState.setHistoryLog("Redo", false);
      observer.notify();
    }
  };
  const initialRender = () => {
    const container = document.createElement("div");
    container.classList.add("flex", "gap-4", "justify-center", "mb-16");

    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.setAttribute("id", "prev");
    prev.addEventListener("click", prevHandler);

    const reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.setAttribute("id", "reset");
    reset.addEventListener("click", resetHandler);

    const next = document.createElement("button");
    next.textContent = "Next";
    next.setAttribute("id", "next");
    next.addEventListener("click", nextHandler);

    [prev, reset, next].forEach((button) => {
      button.classList.add(
        "text-3xl",
        "font-light",
        "p-2",
        "px-8",
        "rounded-lg",
        "cursor-default"
      );
    });

    container.append(prev, reset, next);
    document.querySelector("#root").appendChild(container);
  };

  const enable = (el) => {
    el.classList.add("nm-flat-gray-100", "hover:nm-convex-red-400-sm");
    el.classList.remove("cursor-default");
  };

  const disable = (el) => {
    el.classList.remove("nm-flat-gray-100", "hover:nm-convex-red-400-sm");
    el.classList.add("cursor-default");
  };

  const render = () => {
    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");

    if (gameState.getHead() > 0) {
      enable(prev);
    } else {
      disable(prev);
    }

    if (gameState.history().length - gameState.getHead() > 1) {
      enable(next);
    } else {
      disable(next);
    }

    if (
      gameState
        .board()
        .flat()
        .some((cell) => cell !== "")
    ) {
      enable(reset);
    } else {
      disable(reset);
    }
  };

  return { initialRender, render };
}
