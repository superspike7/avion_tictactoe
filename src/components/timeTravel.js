export default function TimeTravel(gameState, observer) {
  const prevHandler = () => {
    if (gameState.decHead()) {
      gameState.switchPlayer();
      gameState.copyHistory();
      gameState.checkoutHistory();
      observer.notify();
    }
  };
  const resetHandler = () => {
    gameState.resetHistory();
    gameState.resetHead();
    gameState.resetBoard();
    observer.notify();
  };
  const nextHandler = () => {
    if (gameState.incHead()) {
      gameState.switchPlayer();
      gameState.checkoutHistory();
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
        "text-xl",
        "decoration-4",
        "decoration-red-500",
        "hover:decoration-red-200"
      );
    });

    [prev, next].forEach((button) => {
      button.classList.add("cursor-default");
    });

    enable(reset);

    container.append(prev, reset, next);
    document.querySelector("#root").appendChild(container);
  };

  const enable = (el) => {
    el.classList.add(
      "underline",
      "hover:text-gray-700",
      "text-gray-900",
      "curor-pointer"
    );
  };

  const disable = (el) => {
    el.classList.remove(
      "underline",
      "hover:text-gray-700",
      "text-gray-900",
      "curor-pointer"
    );
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
  };

  return {
    initialRender,
    render,
  };
}
