const express = require("express");

const app = express();
const PORT = 3000;

// Allow the server to read JSON from requests
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Import recipe routes
const recipeRoutes = require("./routes/recipes");

// Any request starting with /recipes goes to recipes.js
app.use("/recipes", recipeRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Recipe Management API is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});