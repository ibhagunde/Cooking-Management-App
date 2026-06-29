let recipes = [];

async function loadRecipes() {
    try {
        const response = await fetch("http://localhost:3000/recipes");
        recipes = await response.json();

        renderRecipes();

    } catch (error) {
        console.error(error);
        document.getElementById("message").innerText =
            "Failed to load recipes.";
    }
}

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
                <button onclick="viewRecipe(${recipe.recipe_id})">View</button>
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

function viewRecipe(recipeId) {
    window.location.href = `recipedetails.html?id=${recipeId}`;
}

function editRecipe(index) {
    const newTitle = prompt("Edit title:", recipes[index].title);
    if (newTitle && newTitle.trim() !== "") {
        recipes[index].title = newTitle.trim();
        renderRecipes();
        document.getElementById("message").innerText = "Recipe updated.";
    }
}

async function deleteRecipe(index) {

    if (!confirm("Delete this recipe?")) return;

    try {

        const recipe = recipes[index];

        const response = await fetch(
            `http://localhost:3000/recipes/${recipe.recipe_id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (response.ok) {

            document.getElementById("message").innerText =
                data.message;

            loadRecipes();

        } else {

            document.getElementById("message").innerText =
                data.error;

        }

    } catch (error) {

        console.error(error);

    }

}

/* ⭐ SEARCH BAR UI FUNCTIONALITY ⭐ */
async function searchRecipes() {

    const query =
        document.getElementById("searchInput").value;

    try {

        const response = await fetch(
            `http://localhost:3000/recipes?search=${query}`
        );

        const filtered =
            await response.json();

        recipes = filtered;

        renderRecipes();

    } catch (error) {

        console.error(error);

    }

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
                <button onclick="viewRecipe(${recipe.recipe_id})">View</button>
                <button onclick="editRecipe(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `;

        recipeList.appendChild(card);
    });
}

loadRecipes();

