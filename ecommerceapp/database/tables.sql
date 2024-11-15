CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO categories (name) VALUES 
("Electronics"), 
("Books"), 
("Clothing"), 
("Home & Kitchen"), 
("Sports");

INSERT INTO products (name, price, stock, category_id) VALUES
("Phone", 699.99, 10, 1),
("Laptop", 999.99, 5, 1),
("Tablet", 399.99, 8, 1),
("Novel", 19.99, 20, 2),
("Cookbook", 29.99, 15, 2),
("T-shirt", 9.99, 50, 3), 
("Jeans", 39.99, 25, 3),  
("Blender", 49.99, 12, 4),
("Vacuum", 99.99, 7, 4),
("Tennis Racket", 59.99, 10, 5),
("Soccer Ball", 29.99, 20, 5);

INSERT INTO orders (product_id, quantity) VALUES
(1, 2),
(4, 1),
(6, 5), 
(3, 3),
(10, 2);
