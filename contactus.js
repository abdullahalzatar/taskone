const form = document.querySelector("#inviteForm");
const input = document.querySelector("input");
const main = document.querySelector(".main");
const ul = document.querySelector("#invitedList");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const li = createLi();

  if (input.value === "") {
    alert("Enter the name please!!!");
  } else {
    ul.appendChild(li);
  }
});

function createLi() {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = input.value;
  const editBtn = document.createElement("button");
  editBtn.textContent = "edit";
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "remove";

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  return li;
}

ul.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const li = button.parentNode;
    const ul = li.parentNode;

    if (button.textContent === "remove") {
      ul.removeChild(li);
    } else if (button.textContent === "edit") {
      const span = li.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = "save";
    } else if (button.textContent === "save") {
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.textContent = "edit";
    }
  }
});
