const express = require("express");
const router = express.Router();

const db = require("../db/database");

router.get("/", (req, res) => {

    try {

        const meals = db.prepare(
            "SELECT * FROM MealPlans"
        ).all();

        res.json(meals);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve meal plan."
        });

    }

});

router.post("/", (req, res) => {

    try {

        const {
            day,
            meal_type,
            recipe_name
        } = req.body;

        // Check if this meal already exists
        const existingMeal = db.prepare(`
            SELECT meal_id
            FROM MealPlans
            WHERE day = ? AND meal_type = ?
        `).get(day, meal_type);

        if (existingMeal) {

            db.prepare(`
                UPDATE MealPlans
                SET recipe_name = ?
                WHERE meal_id = ?
            `).run(
                recipe_name,
                existingMeal.meal_id
            );

            return res.json({
                message: "Meal updated successfully!"
            });

        }

        // Otherwise create a new meal
        const result = db.prepare(`
            INSERT INTO MealPlans
            (day, meal_type, recipe_name)
            VALUES (?, ?, ?)
        `).run(
            day,
            meal_type,
            recipe_name
        );

        res.status(201).json({
            message: "Meal added successfully!",
            meal_id: result.lastInsertRowid
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to save meal."
        });

    }

});

router.delete("/:id", (req, res) => {

    try {

        const statement = db.prepare(
            "DELETE FROM MealPlans WHERE meal_id = ?"
        );

        const result = statement.run(req.params.id);

        if (result.changes === 0) {

            return res.status(404).json({
                error: "Meal not found."
            });

        }

        res.json({
            message: "Meal deleted."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to delete meal."
        });

    }

});

module.exports = router;