const express = require("express");
const app = express();

const PORT = 3000;

//enable cors (Cross-Origin Resource Sharing) to allow requests from frontend
const cors = require("cors");
app.use(cors());

// Allow the server to read JSON from requests
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Import recipe routes
const recipeRoutes = require("./routes/recipes");

const mealPlannerRoutes = require("./routes/mealplanner"); //importing meal planner routes
app.use("/mealplanner", mealPlannerRoutes); //using meal planner routes

// Any request starting with /recipes goes to recipes.js
app.use("/recipes", recipeRoutes);

const groceryRoutes = require("./routes/grocery");
app.use("/grocery", groceryRoutes); //using grocery routes

// Test route
app.get("/", (req, res) => {
    res.send("Recipe Management API is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});