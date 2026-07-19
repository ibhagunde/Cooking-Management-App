const express = require("express");
const router = express.Router();

const db = require("../db/database");

router.get("/", (req, res) => {

    try {

        const items = db.prepare(
            "SELECT * FROM GroceryItems"
        ).all();

        res.json(items);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve grocery list."
        });

    }

});

router.post("/", (req, res) => {

    try {

        const { ingredients } = req.body;

        const insert = db.prepare(`
            INSERT INTO GroceryItems
            (item_name)
            VALUES (?)
        `);

        for (const ingredient of ingredients) {

            insert.run(ingredient.trim());

        }

        res.json({
            message: "Ingredients added to grocery list!"
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to add ingredients."
        });

    }

});

router.delete("/:id", (req, res) => {

    try {

        const result = db.prepare(
            "DELETE FROM GroceryItems WHERE item_id = ?"
        ).run(req.params.id);

        if (result.changes === 0) {

            return res.status(404).json({
                error: "Item not found."
            });

        }

        res.json({
            message: "Item deleted successfully!"
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to delete item."
        });

    }

});

router.put("/:id", (req, res) => {

    try {

        const { purchased } = req.body;

        const result = db.prepare(`
            UPDATE GroceryItems
            SET purchased = ?
            WHERE item_id = ?
        `).run(
            purchased,
            req.params.id
        );

        if (result.changes === 0) {

            return res.status(404).json({
                error: "Item not found."
            });

        }

        res.json({
            message: "Item updated successfully!"
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to update item."
        });

    }

});

module.exports = router;