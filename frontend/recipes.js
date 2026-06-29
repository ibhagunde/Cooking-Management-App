let recipes = [
    { title: "Chicken Alfredo", category: "Dinner" },
    { title: "Pancakes", category: "Breakfast" }
];

function renderRecipes() {
    const list = document.getElementById("recipeList");
    list.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>Category: ${recipe.category}</p>

            <div class="actions">
                <button onclick="viewRecipe(${index})">View</button>
                <button onclick="editRecipe(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `;

        list.appendChild(card);
    });
}

function goToAddRecipe() {
    window.location.href = "recipe.html";
}

function viewRecipe(index) {
    alert(`Viewing: ${recipes[index].title}`);
}

function editRecipe(index) {
    const newTitle = prompt("Edit title:", recipes[index].title);
    if (newTitle && newTitle.trim() !== "") {
        recipes[index].title = newTitle.trim();
        renderRecipes();
        document.getElementById("message").innerText = "Recipe updated.";
    }
}

function deleteRecipe(index) {
    if (confirm("Delete this recipe?")) {
        recipes.splice(index, 1);
        renderRecipes();
        document.getElementById("message").innerText = "Recipe deleted.";
    }
}

/* ⭐ SEARCH BAR UI FUNCTIONALITY ⭐ */
function searchRecipes() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query)
    );

    renderFilteredRecipes(filtered);
}

function renderFilteredRecipes(list) {
    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = "";

    list.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>Category: ${recipe.category}</p>

            <div class="actions">
                <button onclick="viewRecipe(${index})">View</button>
                <button onclick="editRecipe(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `;

        recipeList.appendChild(card);
    });
}

renderRecipes();

