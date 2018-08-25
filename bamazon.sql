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
VALUES ("Fantastic Frozen Shoes", "Industrial", 171.00, 822), 
       ("Ergonomic Metal Bacon", "Electronics", 884.00, 191),
       ("Rustic Concrete Gloves", "Baby", 424.00, 75), 
       ("Awesome Cotton Chicken", "Sports", 319.00, 131), 
       ("Fantastic Fresh Table", "Outdoors", 620.00, 93), 
       ("Handcrafted Cotton Table", "Jewelery", 93.00, 493), 
       ("Licensed Steel Shoes", "Electronics", 992.00, 17), 
       ("Rustic Cotton Bike", "Outdoors", 245.00, 61), 
       ("Sleek Granite Pants", "Shoes", 965.00, 932), 
       ("Awesome Rubber Mouse", "Jewelery", 3.25, 105);
