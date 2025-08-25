const arr = ["A", "B", "C"];

const wrapperId = "DOM-wrapper";

export const DOM = () => {
  const handleFillList = () => {
    handleClearList();

    const wrapper = document.getElementById(wrapperId);

    if (!wrapper) {
      return;
    }

    const list = document.createElement("ul");
    wrapper.append(list);

    arr.forEach((value) => {
      const elem = document.createElement("li");
      elem.textContent = value;

      elem.addEventListener("click", (e) => {
        const currentElem = e.target;

        if (currentElem instanceof HTMLLIElement) {
          currentElem.remove();
        }
      });

      list.appendChild(elem);
    });
  };

  const handleClearList = () => {
    const wrapper = document.getElementById(wrapperId);

    if (!wrapper) {
      return;
    }

    const list = wrapper.getElementsByTagName("ul")[0];

    if (!list) {
      return;
    }

    list.remove();
  };

  return (
    <div id={wrapperId}>
      <div>
        <button onClick={handleFillList}>Fill List</button>
      </div>
      <div>
        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  );
};
