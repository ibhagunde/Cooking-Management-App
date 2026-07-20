const express = require("express");
const router = express.Router();
const db = require("../db/database");
const bcrypt = require("bcrypt");

//user registration route
router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {

            return res.status(400).json({
                error: "All fields are required"
            });

        }

        //check if email already exists
        const existingUser = db.prepare(
            "SELECT * FROM Users WHERE email = ?"
        ).get(email);

        if (existingUser) {

            return res.status(409).json({
                error: "Email already registered"
            });

        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //insert new user into database
        const statement = db.prepare(`
            INSERT INTO Users (username, email, password)
            VALUES (?, ?, ?)
        `);

        const result = statement.run(
            username,
            email,
            hashedPassword
        );

        res.status(201).json({
            message: "User registered successfully",
            user_id: result.lastInsertRowid
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to register user"
        });

    }

});

//user login route
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                error: "Email and password are required"
            });

        }

        //find user by email
        const user = db.prepare(
            "SELECT * FROM Users WHERE email = ?"
        ).get(email);

        if (!user) {

            return res.status(401).json({
                error: "Invalid credentials"
            });

        }

        //compare entered password with hashed password
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {

            return res.status(401).json({
                error: "Invalid credentials"
            });

        }

        req.session.user = {
        user_id: user.user_id,
        username: user.username
        };

        res.json({
            message: "Login successful",
            user_id: user.user_id,
            username: user.username
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Login failed"
        });

    }

});

//session route to check if user is logged in
router.get("/session", (req, res) => {

    if (req.session.user) {

        res.json({
            loggedIn: true,
            user: req.session.user
        });

    }

    else {

        res.json({
            loggedIn: false
        });

    }

});

//get current logged-in user's profile
router.get("/profile", (req, res) => {

    if (!req.session.user) {

        return res.status(401).json({
            error: "Not logged in"
        });

    }

    const user = db.prepare(`
        SELECT username, email
        FROM Users
        WHERE user_id = ?
    `).get(req.session.user.user_id);

    if (!user) {

        return res.status(404).json({
            error: "User not found"
        });

    }

    res.json(user);

});

//logout route
router.post("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {

            return res.status(500).json({
                error: "Failed to logout"
            });

        }

        res.json({
            message: "Logout successful"
        });

    });

});

module.exports = router;