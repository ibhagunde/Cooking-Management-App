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