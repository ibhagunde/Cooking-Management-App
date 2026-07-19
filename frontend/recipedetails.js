async function loadRecipe() {

    // Read the ?id= from the URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    try {

        const response = await fetch(
            `http://localhost:3000/recipes/${id}`
        );

        const recipe = await response.json();

        document.getElementById("title").innerText = recipe.title;
        document.getElementById("category").innerText = recipe.category;
        document.getElementById("description").innerText =
            recipe.description || "No description.";

        document.getElementById("ingredients").innerText =
            recipe.ingredients;

        document.getElementById("instructions").innerText =
            recipe.instructions;

    }

    catch (error) {

        console.error(error);

        document.getElementById("title").innerText =
            "Unable to load recipe.";

    }

}

async function addToGroceryList() {

    // Get the ingredients currently displayed
    const ingredientText =
        document.getElementById("ingredients").innerText;

    // Split them by commas
    const ingredients = ingredientText
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");

    try {

        const response = await fetch(
            "http://localhost:3000/grocery",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ingredients: ingredients
                })
            }
        );

        const data = await response.json();

        alert(data.message);

    }

    catch (error) {

        console.error(error);

        alert("Unable to add ingredients.");

    }

}

loadRecipe();