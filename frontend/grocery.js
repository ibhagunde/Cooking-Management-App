let items = [];

async function loadItems() {

    try {

        const response = await fetch(
            "http://localhost:3000/grocery"
        );

        items = await response.json();

        renderList();

    }

    catch (error) {

        console.error(error);

    }

}

function renderList() {

    const list = document.getElementById("list");

    list.innerHTML = "";

    [...items].reverse().forEach(item => {

        const div = document.createElement("div");

        div.className = "item";

        div.innerHTML = `
            <div>

                <input
                    type="checkbox"
                    ${item.purchased ? "checked" : ""}
                    onclick="toggleItem(${item.item_id})">

                <span>${item.item_name}</span>

            </div>

            <button
                class="edit-btn"
                onclick="deleteItem(${item.item_id})">

                Delete

            </button>
        `;

        list.appendChild(div);

    });

}

async function addItem() {

    const newItem =
        document.getElementById("newItem").value.trim();

    if (!newItem) return;

    try {

        await fetch(
            "http://localhost:3000/grocery",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ingredients: [newItem]
                })
            }
        );

        document.getElementById("newItem").value = "";

        loadItems();

    }

    catch (error) {

        console.error(error);

    }

}

async function toggleItem(id) {

    try {

        // Find the current item
        const item = items.find(
            item => item.item_id === id
        );

        const response = await fetch(
            `http://localhost:3000/grocery/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    purchased: item.purchased ? 0 : 1
                })
            }
        );

        if (response.ok) {

            loadItems();

        }

    }

    catch (error) {

        console.error(error);

    }

}

async function deleteItem(id) {

    try {

        await fetch(
            `http://localhost:3000/grocery/${id}`,
            {
                method: "DELETE"
            }
        );

        loadItems();

    }

    catch (error) {

        console.error(error);

    }

}

function goBack() {
    window.location.href = "dashboard.html";
}

loadItems();