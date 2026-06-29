let items = [];

function renderList() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div>
                <input type="checkbox" ${item.checked ? "checked" : ""} onclick="toggleItem(${index})">
                <span>${item.name}</span>
            </div>
            <button class="edit-btn" onclick="editItem(${index})">Edit</button>
        `;

        list.appendChild(div);
    });
}

function addItem() {
    const newItem = document.getElementById("newItem").value.trim();
    const msg = document.getElementById("message");

    if (!newItem) {
        msg.innerText = "Enter an item.";
        return;
    }

    items.push({ name: newItem, checked: false });
    document.getElementById("newItem").value = "";
    msg.innerText = "";
    renderList();
}

function toggleItem(index) {
    items[index].checked = !items[index].checked;
    renderList();
}

function editItem(index) {
    const newName = prompt("Edit item:", items[index].name);
    if (newName !== null && newName.trim() !== "") {
        items[index].name = newName.trim();
        renderList();
    }
}
