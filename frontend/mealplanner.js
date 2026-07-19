const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["Breakfast", "Lunch", "Dinner"];

let plannerData = [];

// Load meal plan from backend
async function loadMeals() {

    try {

        const response = await fetch(
            "http://localhost:3000/mealplanner"
        );

        plannerData = await response.json();

        renderPlanner();

    }

    catch (error) {

        console.error(error);

    }

}

// Display the planner
function renderPlanner() {

    const planner = document.getElementById("planner");

    planner.innerHTML = "";

    days.forEach(day => {

        const dayDiv = document.createElement("div");

        dayDiv.className = "day";

        let html = `<h3>${day}</h3>`;

        meals.forEach(meal => {

            const existingMeal = plannerData.find(
                m => m.day === day &&
                     m.meal_type === meal
            );

            const mealName = existingMeal
                ? existingMeal.recipe_name
                : "Select meal";

            html += `
                <div class="meal-row">
                    <span>${meal}: ${mealName}</span>

                    <button onclick="editMeal('${day}', '${meal}')">
                        Edit
                    </button>
                </div>
            `;

        });

        dayDiv.innerHTML = html;

        planner.appendChild(dayDiv);

    });

}

// Choose and save a meal
async function editMeal(day, meal) {

    try {

        // Load only recipes for this meal category
        const recipeResponse = await fetch(
            `http://localhost:3000/recipes?category=${meal}`
        );

        const recipes = await recipeResponse.json();

        if (recipes.length === 0) {

            alert(`No ${meal} recipes available.`);

            return;

        }

        const menu = recipes
            .map((recipe, index) =>
                `${index + 1}. ${recipe.title}`
            )
            .join("\n");

        const choice = prompt(
            `Choose a ${meal} recipe:\n\n${menu}`
        );

        if (!choice) return;

        const recipe = recipes[parseInt(choice) - 1];

        if (!recipe) {

            alert("Invalid selection.");

            return;

        }

        const response = await fetch(
            "http://localhost:3000/mealplanner",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    day: day,
                    meal_type: meal,
                    recipe_name: recipe.title
                })
            }
        );

        const data = await response.json();

        document.getElementById("message").innerText =
            data.message;

        // Refresh planner
        loadMeals();

    }

    catch (error) {

        console.error(error);

    }

}

// Load everything when the page opens
loadMeals();
