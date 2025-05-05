const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // default XAMPP user
  password: "", // leave blank if no password
  database: "restaurant_inventory", // your database name
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Fetch categories
app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add new category
app.post("/api/categories", (req, res) => {
  const { Category } = req.body;
  if (!Category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const sql = "INSERT INTO categories (Category) VALUES (?)";
  db.query(sql, [Category], (err, result) => {
    if (err) {
      console.error("Error inserting category:", err);
      return res.status(500).json({ error: "Failed to insert category" });
    }

    // Ensure the response is JSON
    res.status(201).json({ message: "Category added", id: result.insertId });
  });
});

// Fetch ingredients
app.get("/api/ingredients", (req, res) => {
  db.query("SELECT * FROM ingredients", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add new ingredient
app.post("/api/ingredients", (req, res) => {
  const { IngredientName, UnitOfMeasurement, CategoryID } = req.body;

  if (!IngredientName || !UnitOfMeasurement || !CategoryID) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO ingredients (IngredientName, UnitOfMeasurement, CategoryID) VALUES (?, ?, ?)";
  db.query(
    sql,
    [IngredientName, UnitOfMeasurement, CategoryID],
    (err, result) => {
      if (err) {
        console.error("Error inserting ingredient:", err);
        return res.status(500).json({ error: "Failed to insert ingredient" });
      }

      // Ensure the response is JSON
      res
        .status(201)
        .json({ message: "Ingredient added", id: result.insertId });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
