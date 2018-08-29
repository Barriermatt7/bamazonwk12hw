DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BB Gun", "Sporting", 54.80, 177), 
       ("Round tent", "Sporting", 250.00, 277),
       ("Hand Drill", "Construction", 151.00, 120), 
       ("Red Apples", "Food", 4.12, 254), 
       ("Bow", "Sporting", 172.56, 56), 
       ("Arrow", "Sporting", 12.00, 820), 
       ("Purple Banannas", "Food", 3.50, 900), 
       ("Hatchet", "Construction", 28.23, 145), 
       ("Ladder", "Construction", 234.12, 245), 
       ("Hamburger", "Food", 5.55, 134);
