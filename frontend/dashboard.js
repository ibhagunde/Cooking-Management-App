
//check if user is logged in when the page loads
async function checkSession() { 

    try {

        const response = await fetch(
            "http://localhost:3000/auth/session",
            {
                credentials: "include"
            }
        );

        const data = await response.json();

        if (!data.loggedIn) {

            window.location.href = "login.html";

        }

        else {

            console.log("Logged in as:", data.user.username);

        }

    }

    catch (error) {

        console.error(error);

    }

}

async function loadRecentRecipes() {

    try {

        const response = await fetch("http://localhost:3000/recipes");

        const recipes = await response.json();

        const recentList = document.getElementById("recent");

        recentList.innerHTML = "";

        recipes.slice(0, 3).forEach(recipe => {

            const li = document.createElement("li");

            li.textContent = recipe.title;

            recentList.appendChild(li);

        });

    }

    catch (error) {

        console.error(error);

    }

}

function goToMealPlanner() {
    window.location.href = "mealplanner.html";
}

function goToRecipes() {
    window.location.href = "recipes.html";
}

function goToGrocery() {
    window.location.href = "grocery.html";
}

function goToProfile() {
    window.location.href = "profile.html"; // placeholder
}

function goHome() {
    window.location.href = "dashboard.html";
}

async function logout() {

    try {

        const response = await fetch(
            "http://localhost:3000/auth/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

        const data = await response.json();

        console.log(data);

        window.location.href = "login.html";

    }

    catch (error) {

        console.error(error);

    }

}

checkSession();
loadRecentRecipes();