function saveRecipe() {
    const title = document.getElementById("title").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const category = document.getElementById("category").value.trim();
    const msg = document.getElementById("message");

    if (!title || !ingredients || !instructions || !category) {
        msg.innerText = "Please fill out all fields.";
        return;
    }

    msg.style.color = "green";
    msg.innerText = "Recipe saved (frontend placeholder).";
}
