const Database = require("better-sqlite3");

const db = new Database("./database/recipes.db");

module.exports = db;