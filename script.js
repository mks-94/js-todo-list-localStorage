const ITEMS_CONTAINER = document.getElementById("items");
const ITEMS_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();

function getItems() {
  let value = localStorage.getItem("todo") || "[]";

  return JSON.parse(value);
}

function setItems(items) {
  let itemsObj = JSON.stringify(items);

  localStorage.setItem("todo", itemsObj);
}

function addItem() {
  items.unshift({
    description: "",
    completed: false,
  });

  setItems(items);
  refreshList();
}

function updateItem(item, key, value) {
  item[key] = value;
  setItems(items);
  refreshList();
}

function refreshList() {
  //TODO: sort items
  items.sort((a, b) => {
    if (a.completed) {
      return 1;
    }

    if (b.completed) {
      return -1;
    }

    return a.description < b.description ? -1 : 1;
  });

  ITEMS_CONTAINER.innerHTML = "";

  for (const item of items) {
    const itemElement = ITEMS_TEMPLATE.content.cloneNode(true);
    const descriptionInput = itemElement.querySelector(".item-description");
    const completedInput = itemElement.querySelector(".item-completed");

    descriptionInput.value = item.description;
    completedInput.checked = item.completed;

    descriptionInput.addEventListener("change", () => {
      updateItem(item, "description", descriptionInput.value);
    });

    completedInput.addEventListener("change", () => {
      updateItem(item, "completed", completedInput.checked);
    });

    ITEMS_CONTAINER.append(itemElement);
  }
}

ADD_BUTTON.addEventListener("click", () => {
  addItem();
});

refreshList();
