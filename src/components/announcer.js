export default function Announcer(gameState) {
  const announce = (el) => {
    if (gameState.checkWinner()) {
      el.textContent = gameState.checkWinner();
    } else {
      el.textContent =
        "current Player is: " + gameState.currentPlayer().marker();
    }
  };
  const initialRender = () => {
    const container = document.createElement("div");
    container.classList.add("flex", "justify-center", "mb-8");
    const h1 = document.createElement("h1");
    h1.classList.add("text-4xl");
    h1.setAttribute("id", "announcer");
    announce(h1);
    container.appendChild(h1);
    document.querySelector("#root").appendChild(container);
  };
  const render = () => {
    const h1 = document.querySelector("#announcer");
    announce(h1);
  };

  return { initialRender, render };
}
