const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const meals = ["Breakfast", "Lunch", "Dinner"];

let plannerData = {};

days.forEach(day => {
    plannerData[day] = {
        Breakfast: "Select meal",
        Lunch: "Select meal",
        Dinner: "Select meal"
    };
});

function renderPlanner() {
    const planner = document.getElementById("planner");
    planner.innerHTML = "";

    days.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        let html = `<h3>${day}</h3>`;

        meals.forEach(meal => {
            html += `
                <div class="meal-row">
                    <span>${meal}: ${plannerData[day][meal]}</span>
                    <button onclick="editMeal('${day}', '${meal}')">Edit</button>
                </div>
            `;
        });

        dayDiv.innerHTML = html;
        planner.appendChild(dayDiv);
    });
}

function editMeal(day, meal) {
    const newMeal = prompt(`Enter meal for ${meal} on ${day}:`, plannerData[day][meal]);
    if (newMeal && newMeal.trim() !== "") {
        plannerData[day][meal] = newMeal.trim();
        renderPlanner();
        document.getElementById("message").innerText = "Meal updated.";
    }
}

renderPlanner();
