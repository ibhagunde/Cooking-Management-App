async function importRecipe() {

    const url = document.getElementById("recipeUrl").value.trim();

    const msg = document.getElementById("message");
    msg.style.color = "black";
    msg.innerText = "Importing recipe...";

    if (!url) {

        msg.style.color = "red";
        msg.innerText = "Please enter a recipe URL.";
        return;

    }


    try {

        const response = await fetch(
            "http://localhost:3000/importRecipe",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    url: url
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            document.getElementById("title").value =
                data.title || "";


            document.getElementById("ingredients").value =
                formatIngredients(data.ingredients);


            document.getElementById("instructions").value =
                formatInstructions(data.instructions);


            msg.style.color = "green";
            msg.innerText = "Recipe imported! Review and save.";

        }

        else {

            msg.style.color = "red";
            msg.innerText = data.error;

        }


    }

    catch (error) {

        console.error(error);

        msg.style.color = "red";
        msg.innerText = "Unable to import recipe.";

    }

}

async function saveRecipe() {

    const title = document.getElementById("title").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const category = document.getElementById("category").value;

    const msg = document.getElementById("message");

    msg.style.color = "red";

    if (!title || !ingredients || !instructions || !category) {
        msg.innerText = "Please fill out all fields.";
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/recipes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                title: title,

                description: "",

                ingredients: ingredients,

                instructions: instructions,

                category: category,

                prep_time: 0,

                cook_time: 0

            })

        });

        const data = await response.json();

        if (response.ok) {

            msg.style.color = "green";
            msg.innerText = data.message;

            // Clear the form
            document.getElementById("title").value = "";
            document.getElementById("ingredients").value = "";
            document.getElementById("instructions").value = "";
            document.getElementById("category").value = "";

        }

        else {

            msg.innerText = data.error;

        }

    }

    catch (error) {

        console.error(error);

        msg.innerText = "Unable to connect to server.";

    }

}

function goBack() {
    window.location.href = "recipes.html";
}

function formatIngredients(ingredients) {

    if (!ingredients) {
        return "";
    }

    return ingredients.join(", ");

}


function formatInstructions(instructions) {

    if (!instructions) {
        return "";
    }


    if (typeof instructions === "string") {

        return instructions;

    }


    return instructions
        .map(step => step.text)
        .join("\n\n");

}