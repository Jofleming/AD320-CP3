"use strict";

const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

module.exports = app;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Database connection
const db = new sqlite3.Database("./database/ecommerce.db", (err) => {
  if (err) console.error("Error opening database: ", err);
});

// Routes
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ products: rows });
  });
});

app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce App!');
});

app.post("/api/orders", (req, res) => {
  const { productId, quantity } = req.body;
  db.get("SELECT stock FROM products WHERE id = ?", [productId], (err, product) => {
    if (err || !product) {
      res.status(400).json({ error: "Invalid product ID" });
    } else if (product.stock < quantity) {
      res.status(400).json({ error: "Insufficient stock" });
    } else {
      db.run("UPDATE products SET stock = stock - ? WHERE id = ?", [quantity, productId], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ message: "Order placed successfully!" });
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
