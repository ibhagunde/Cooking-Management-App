async function loadRecipe() {

    // Read the ?id= from the URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    try {

        const response = await fetch(
            `http://localhost:3000/recipes/${id}`
        );

        const recipe = await response.json();
        console.log(recipe.ingredients);

        document.getElementById("title").innerText = recipe.title;
        document.getElementById("category-info").innerText = recipe.category;
        document.getElementById("prep-time").innerText =
            recipe.prep_time > 0
                ? recipe.prep_time + " minutes"
                : "Not available";

        document.getElementById("cook-time").innerText =
            recipe.cook_time > 0
                ? recipe.cook_time + " minutes"
                : "Not available";

        const ingredientList =
            recipe.ingredients
                .split(/,(?=\s*\d|\s*(?:more|piece|use))/)
                .map(item =>
                    item
                        .replace(/\n/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()
                )
                .filter(item => item !== "")
                .map(item => `<li>${item}</li>`)
                .join("");

        document.getElementById("ingredients").innerHTML =
            ingredientList;

        const instructionList =
            recipe.instructions
                .split(/\n+/)
                .map(step =>
                    step
                        .replace(/\s+/g, " ")
                        .trim()
                )
                .filter(step => step !== "")
                .map(step => `<li>${step}</li>`)
                .join("");

        document.getElementById("instructions").innerHTML =
            instructionList;

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
        .split("\n")
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