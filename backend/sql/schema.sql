CREATE TABLE Recipes (
    recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    category TEXT,
    prep_time INTEGER,
    cook_time INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);