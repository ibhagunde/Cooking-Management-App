const express = require("express");
const router = express.Router();
const db = require("../db/database");

// REGISTER USER
router.post("/register", (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const statement = db.prepare(`
            INSERT INTO Users (username, email, password)
            VALUES (?, ?, ?)
        `);

        const result = statement.run(username, email, password);

        res.status(201).json({
            message: "User registered successfully",
            user_id: result.lastInsertRowid
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to register user"
        });
    }
});

//user login
router.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const user = db.prepare(
            "SELECT * FROM Users WHERE email = ? AND password = ?"
        ).get(email, password);

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        res.json({
            message: "Login successful",
            user_id: user.user_id,
            username: user.username,
            token: "demo-token" //placeholder for JWT or session token, to be implemented later
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Login failed"
        });
    }
});

module.exports = router;