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

loadRecipe();