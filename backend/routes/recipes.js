const express = require("express");
const router = express.Router();

const db = require("../db/database");

router.get("/", (req, res) => {
    try {
        const { category, search } = req.query;

        let recipes;

        if (search) {
            recipes = db.prepare(`
                SELECT *
                FROM Recipes
                WHERE title LIKE ?
                OR category LIKE ?
            `).all(
                `%${search}%`,
                `%${search}%`
            );

        } else if (category) {
            recipes = db.prepare(
                "SELECT * FROM Recipes WHERE category = ?"
            ).all(category);

        } else {
            recipes = db.prepare(
                "SELECT * FROM Recipes ORDER BY recipe_id DESC"
            ).all();
        }

        res.json(recipes);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve recipes."
        });
    }
});

//get recipe details by id
router.get("/:id", (req, res) => {

    try {

        const { id } = req.params;

        const recipe = db.prepare(
            "SELECT * FROM Recipes WHERE recipe_id = ?"
        ).get(id);

        if (!recipe) {
            return res.status(404).json({
                error: "Recipe not found."
            });
        }

        res.json(recipe);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve recipe."
        });

    }

});

router.put("/:id", (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            ingredients,
            instructions,
            category,
            prep_time,
            cook_time
        } = req.body;

        const statement = db.prepare(`
            UPDATE Recipes
            SET
                title = ?,
                description = ?,
                ingredients = ?,
                instructions = ?,
                category = ?,
                prep_time = ?,
                cook_time = ?
            WHERE recipe_id = ?
        `);

        const result = statement.run(
            title,
            description,
            ingredients,
            instructions,
            category,
            prep_time,
            cook_time,
            id
        );

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Recipe not found."
            });
        }

        res.json({
            message: "Recipe updated successfully!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to update recipe."
        });
    }
});

router.post("/", (req, res) => {
    try {
        const {
            title,
            description,
            ingredients,
            instructions,
            category,
            prep_time,
            cook_time
        } = req.body;

        const statement = db.prepare(`
            INSERT INTO Recipes
            (title, description, ingredients, instructions, category, prep_time, cook_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const result = statement.run(
            title,
            description,
            ingredients,
            instructions,
            category,
            prep_time,
            cook_time
        );

        res.status(201).json({
            message: "Recipe created successfully!",
            recipe_id: result.lastInsertRowid
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create recipe."
        });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;

        const statement = db.prepare(
            "DELETE FROM Recipes WHERE recipe_id = ?"
        );

        const result = statement.run(id);

        if (result.changes === 0) {
            return res.status(404).json({
                error: "Recipe not found."
            });
        }

        res.json({
            message: "Recipe deleted successfully!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to delete recipe."
        });
    }
});

module.exports = router;