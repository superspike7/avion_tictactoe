export default function HistoryLog(gameState) {
  const initialRender = () => {
    const container = document.createElement("div");
    container.classList.add(
      "rounded-[50px]",
      "nm-flat-slate-200-lg",
      "h-[85vh]",
      "w-[20%]",
      "absolute",
      "left-16"
    );
    const title = document.createElement("h2");
    title.textContent = "History Log";
    title.classList.add(
      "text-center",
      "text-4xl",
      "mt-6",
      "font-bold",
      "text-gray-900",
      "w-[60%]",
      "p-2",
      "rounded-xl",
      "mx-auto",
      "text-slate-500"
    );

    const list = document.createElement("ul");
    list.setAttribute("id", "history");
    list.classList.add(
      "nm-inset-slate-200",
      "rounded-xl",
      "w-[90%]",
      "mx-auto",
      "h-[80%]",
      "mt-8",
      "list-disc",
      "p-5",
      "px-10",
      "overflow-y-auto",
      "snap-y",
      "scrollbar-color"
    );

    container.appendChild(title);
    container.appendChild(list);
    document.querySelector("#root").appendChild(container);
  };

  const render = () => {
    const list = document.querySelector("#history");
    list.scroll({ top: list.scrollHeight, behavior: "smooth" });

    const li = document.createElement("li");
    li.classList.add("text-xl", "font-light", "text-slate-600");
    li.textContent = gameState.getHistoryLog();

    document.querySelector("#history").appendChild(li);
  };
  return { initialRender, render };
}
