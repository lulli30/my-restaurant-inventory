const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant_inventory",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// ===== Category Routes =====

// Fetch all categories
app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch categories" });
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
    res.status(201).json({ message: "Category added", id: result.insertId });
  });
});

// ===== Ingredient Routes =====

// Fetch all ingredients
app.get("/api/ingredients", (req, res) => {
  db.query("SELECT * FROM ingredients", (err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch ingredients" });
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
      res
        .status(201)
        .json({ message: "Ingredient added", id: result.insertId });
    }
  );
});

// ===== Stock Ingredient Routes =====

// Fetch all stock ingredients
app.get("/api/stockingredients", (req, res) => {
  db.query("SELECT * FROM stockingredients", (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to fetch stock ingredients" });
    res.json(results);
  });
});

// Add new stock ingredient
app.post("/api/stockingredients", (req, res) => {
  const {
    IngredientsID,
    Container,
    Quantity,
    Container_Size,
    Container_Price,
    Total_Quantity,
    Total_Price,
    Unit_Price,
  } = req.body;

  // Validate required fields
  if (!IngredientsID || !Container || !Quantity) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const query = `
    INSERT INTO stockingredients 
    (IngredientsID, Container, Quantity, Container_Size, Container_Price, Total_Quantity, Total_Price, Unit_Price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      IngredientsID,
      Container,
      Quantity,
      Container_Size,
      Container_Price,
      Total_Quantity,
      Total_Price,
      Unit_Price,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting stock ingredient:", err);
        return res
          .status(500)
          .json({ error: "Failed to insert stock ingredient" });
      }
      res.status(201).json({
        message: "Stock item added successfully",
        id: result.insertId,
      });
    }
  );
});

// ===== Menu Item Routes =====

// Fetch all menu items
app.get("/api/menuitems", (req, res) => {
  db.query("SELECT * FROM menuitems", (err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch menu items" });
    res.json(results);
  });
});

// Add new menu item
app.post("/api/menuitems", (req, res) => {
  const { Menu, SellingPrice } = req.body;

  if (!Menu || !SellingPrice) {
    return res
      .status(400)
      .json({ error: "Menu name and selling price are required" });
  }

  const sql = "INSERT INTO menuitems (Menu, SellingPrice) VALUES (?, ?)";
  db.query(sql, [Menu, SellingPrice], (err, result) => {
    if (err) {
      console.error("Error inserting menu item:", err);
      return res.status(500).json({ error: "Failed to insert menu item" });
    }
    res.status(201).json({ message: "Menu item added", id: result.insertId });
  });
});

// ===== Recipes Routes =====

// Fetch all recipes
app.get("/api/recipes", (req, res) => {
  db.query("SELECT * FROM recipes", (err, results) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch menu items" });
    res.json(results);
  });
});

// Add new recipe
app.post("/api/recipes", (req, res) => {
  const { MenuID, IngredientsID, Quantity } = req.body;

  if (!MenuID || !IngredientsID || !Quantity) {
    return res
      .status(400)
      .json({ error: "Menu id, IngredientsId and quantity are required" });
  }

  const sql =
    "INSERT INTO recipes (MenuId, IngredientsID, Quantity) VALUES (?, ?, ?)";
  db.query(sql, [MenuID, IngredientsID, Quantity], (err, result) => {
    if (err) {
      console.error("Error inserting menu item:", err);
      return res.status(500).json({ error: "Failed to insert recipe" });
    }
    res.status(201).json({ message: "Recipe added", id: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
